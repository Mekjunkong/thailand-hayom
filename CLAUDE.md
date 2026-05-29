# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Thailand Hayom** (תאילנד היום) is a bilingual Hebrew/English travel platform for Israeli travelers in Thailand. Features: newsletter articles, 30 interactive Thai language lessons with audio, AI travel concierge (OpenAI), Stripe payments in ILS, event calendar, premium subscriptions (₪29/month or ₪199/year), and a category-first content hub inspired by Diia Education.

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Dev server with hot reload (tsx watch, http://localhost:3000)
pnpm build            # Production build → dist/public (frontend) + dist/index.js (backend) + dist/api.js (Vercel)
pnpm start            # Run production build
pnpm check            # TypeScript type-check (tsc --noEmit)
pnpm format           # Prettier format all files
pnpm test             # Run all tests (vitest)
pnpm test -- server/stripe-currency.test.ts   # Run a single test file
pnpm db:push          # Generate + apply DB migrations (drizzle-kit generate && drizzle-kit migrate)
npx drizzle-kit studio  # Visual DB browser
```

Tests run files matching `server/**/*.test.ts`, `server/**/*.spec.ts`, `client/src/**/*.test.ts`, `client/src/**/*.spec.ts`.

## Tech Stack

- **Frontend**: React 19, Vite 7, TailwindCSS v4, Wouter (routing), Radix UI, Framer Motion
- **Backend**: Express 4, tRPC 11 (SuperJSON transformer), Drizzle ORM
- **Database**: PostgreSQL (Supabase), schema at `drizzle/schema.ts`
- **Payments**: Stripe (ILS currency), one-time products + subscriptions defined in `shared/products.ts`
- **Email**: Resend API (`server/emailService.ts`)
- **Auth**: Manus OAuth (optional — when `OAUTH_SERVER_URL` is absent, `protectedProcedure` auto-falls back to a local admin user; no manual procedure swapping needed)
- **Package Manager**: pnpm (with patched wouter)

## Path Aliases

```
@/       → client/src/
@shared/ → shared/
@assets/ → attached_assets/
```

Configured in both `vite.config.ts` and `tsconfig.json`.

## Architecture

### Monorepo, Single Process

Client and server run in the same Node.js process. In dev, Vite dev server is embedded in Express (`server/_core/vite.ts`). In production, Express serves the static build from `dist/public`. For Vercel deployments, `server/vercelHandler.ts` is compiled separately as `dist/api.js`.

### Shared Code (`shared/`)

Imported by both client and server — keep free of browser-only or Node-only APIs:
- `shared/products.ts` — `PRODUCTS`, `SUBSCRIPTION_PLANS` (prices, Stripe metadata)
- `shared/tripRoutes.ts` — curated trip itinerary data
- `shared/types.ts` — cross-boundary TypeScript types
- `shared/const.ts` — shared error messages and constants

### API Layer: Mixed tRPC + Express

**tRPC routes** (mounted at `/api/trpc`) handle most endpoints. Defined in `server/routers.ts`:
- `auth`, `chat`, `stripe`, `admin`, `user`, `newsletter`, `article`, `event`, `financial`

**Plain Express routes** exist alongside tRPC for specific needs:
- `progressRouter` — lesson progress tracking (`server/progressRouter.ts`)
- `phraseCardsRouter` — PDF phrase card generation (`server/phraseCardsRouter.ts`)
- Stripe webhook at `/api/stripe/webhook` (raw body, registered before `express.json()`)
- OAuth callback at `/api/oauth/callback`
- Local JWT auth at `/api/auth/*` for email/password login (`server/_core/localAuth.ts`) — used for Railway deployment

### tRPC Procedure Types

Defined in `server/_core/trpc.ts`:
- `publicProcedure` — no auth required
- `protectedProcedure` — requires logged-in user (`ctx.user`). **When `OAUTH_SERVER_URL` is not set, automatically uses `DEV_FALLBACK_USER` (admin role) — no code changes needed for local dev.**
- `adminProcedure` — requires `ctx.user.role === 'admin'`

### Database Access

Always lazy-loaded and nullable. Every DB call must handle the null case:

```typescript
const db = await getDb();
if (!db) return; // DB unavailable
```

Schema uses camelCase columns. Types are exported from `drizzle/schema.ts` as `$inferSelect` / `$inferInsert`.

### Bilingual Content Pattern

All user-facing content has dual columns: `title`/`titleHe`, `content`/`contentHe`, etc. Hebrew is RTL. Language toggle uses `LanguageContext` from `client/src/contexts/LanguageContext.tsx`.

**In components**, always use the `useLanguage` hook — never hardcode `dir="rtl"` or raw Hebrew strings in JSX:
```tsx
const { language, t } = useLanguage();
const dir = language === "he" ? "rtl" : "ltr";
// Simple strings:
t({ he: "שלום", en: "Hello" })
// Bilingual data fields (titleHe/titleEn, etc.):
language === "he" ? item.titleHe : item.titleEn
```

### Course Access Gating

`client/src/lib/courseAccess.ts` is the single source of truth for lesson access:
- `hasCourseAccess(purchases)` — true if user has a completed course purchase
- `canAccessLesson({ lessonId, hasPaidAccess })` — checks against `TOURIST_COURSE.freeLessonIds` / `paidLessonIds`
- `getCourseAccessState({ user, purchases })` — returns `kind: "visitor" | "free" | "paid"`

Free lesson IDs and paid lesson IDs are defined in `client/src/data/touristCourse.ts` under `TOURIST_COURSE`.

### Stripe Webhook Ordering

The webhook route **must** be registered before `express.json()` middleware because Stripe signature verification requires the raw request body. This is handled in `server/_core/index.ts`.

### Premium Subscription System

**Products:** Tourist Survival Thai Course (₪79 one-time), Premium Monthly (₪29/month), Premium Annual (₪199/year). Defined in `shared/products.ts`.

**Flow:** User clicks upgrade → `trpc.stripe.createSubscriptionCheckout` → Stripe Checkout (mode: subscription) → webhook `customer.subscription.created` → `subscriptions` table updated → content unlocked.

**Content gating (soft paywall):** Premium articles (`isPremium: true`) show 200-word preview + blur overlay + upgrade CTA for non-premium users. Gating logic in `server/articleRouter.ts` `getBySlug` endpoint — returns `gated: boolean`.

**Subscription management:** Stripe Customer Portal via `trpc.stripe.createCustomerPortalSession`. Self-service cancel/update/invoices.

**Webhook events handled** (in `server/webhookHandler.ts`): `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`.

**DB table:** `subscriptions` — `userId`, `tier` (free/premium), `status` (active/canceled/expired/past_due), `stripeSubscriptionId`, `stripeCustomerId`, `currentPeriodStart/End`.

### Curated Trip Routes

Pre-built trip itineraries displayed as horizontal sliding card carousels. Data defined in `shared/tripRoutes.ts`, components in `client/src/components/trips/`.

**Adding a new trip:** Define a new `TripRoute` object in `shared/tripRoutes.ts`, add it to the `tripRoutes` registry, create a page that imports it and passes it to the carousel, and register the route in `App.tsx`.

### Content Organization (Category-First Hub)

Seven content categories defined in `client/src/data/categories.ts`: Thai Lessons (amber), Travel (teal), Food (rose), Visa (blue), Events (violet), Safety (orange), Premium (gold gradient).

**Shared components:**
- `ContentCard.tsx` — unified card with `article`/`lesson`/`event` variants
- `CategoryGrid.tsx` — homepage category hub
- `FeaturedStrip.tsx` — editor's picks row
- `CategoryHeader.tsx` — listing page gradient header
- `FilterBar.tsx` — search + filter pills
- `PremiumPaywall.tsx` — soft paywall blur + upgrade CTA

## Environment Variables

**Required**: `DATABASE_URL` (PostgreSQL), `JWT_SECRET` (min 32 chars)

**Optional**: `STRIPE_SECRET_KEY`, `VITE_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `VITE_APP_ID`, `OAUTH_SERVER_URL`, `OWNER_OPEN_ID`

See `LOCAL_SETUP.md` for full reference.

## Code Style

Prettier: double quotes, semicolons, 2-space indent, es5 trailing commas, `arrowParens: "avoid"`. Config in `.prettierrc`.

## Key Conventions

- Client routing uses **Wouter** (not React Router): `import { useLocation } from "wouter"`
- Routes registered in `client/src/App.tsx` inside a `<Switch>`
- UI components use shadcn/ui pattern in `client/src/components/ui/`
- Context providers: `ThemeProvider`, `ProgressProvider`, `TooltipProvider` (see `App.tsx`)
- Thai pronunciation uses Web Speech API in `InteractiveLessons.tsx`
- Quiz system uses SM-2 spaced repetition algorithm (`quizPerformance` table)
- Category data centralized in `client/src/data/categories.ts` — all components import from there
- Article detail fetches from DB via `trpc.article.getBySlug` (not hardcoded data)

## Deprecated / Disabled

- **Forum**: Schema tables exist (`forumPosts`, `forumComments`, etc.) but no routes in `App.tsx`
- **Old lessons route**: `/lessons` kept for backward compat; primary route is `/interactive-lessons`
- **ContentCarousel**: Removed, replaced by `CategoryGrid` + `FeaturedStrip`
- **ArticleCard / ArticleCardSkeleton**: Removed, replaced by `ContentCard` with variants

## Known Issues

- `server/newsletterRouter.ts:231` has a pre-existing TypeScript error (`.where()` on Drizzle query) — unrelated to recent changes
- Premium subscription requires `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` env vars to function — buttons will error without them
