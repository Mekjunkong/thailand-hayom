# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Thailand Hayom** (תאילנד היום) is a bilingual Hebrew/English travel platform for Israeli travelers in Thailand. The core product is the **Tourist Survival Thai Course** — a 7-lesson interactive language course with gamification, sold as a ₪79 one-time purchase. The platform also includes newsletter articles, an AI travel concierge (OpenAI), Stripe payments in ILS, an event calendar, and premium subscriptions (₪29/month or ₪199/year).

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

- **Frontend**: React 19, Vite 7, TailwindCSS v4, Wouter (routing), Radix UI, Framer Motion v12
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

### Design Token System (OKLCH)

All new pages and components use OKLCH colors via an inline `C` token object. Never use raw hex or Tailwind color names in new components — define a `C` const at the top of each file:

```typescript
const C = {
  bg: "oklch(97% 0.005 264)",        // page background (warm near-white)
  surface: "oklch(100% 0 0)",         // card background
  border: "oklch(88% 0.01 264)",      // card/input borders
  text: "oklch(20% 0.01 264)",        // primary text
  muted: "oklch(55% 0.01 264)",       // secondary text
  orange: "oklch(68% 0.19 40)",       // primary accent (CTAs, streaks)
  orangeLight: "oklch(94% 0.06 40)",  // orange tint bg
  indigo: "oklch(52% 0.24 264)",      // secondary accent (progress, XP)
  indigoLight: "oklch(94% 0.06 264)", // indigo tint bg
  green: "oklch(58% 0.18 145)",       // success, revenue
  greenLight: "oklch(94% 0.06 145)",  // green tint bg
};
// Lesson player uses a dark variant: bg "oklch(12% 0.01 264)"
```

Framer Motion v12 note: `ease` arrays must be typed as `[number, number, number, number]`.

### Course System

#### Lesson Player (`client/src/pages/LessonPlayer.tsx`)

Full-screen 3-phase experience mounted at `/lesson/:id`. Phases:
1. **Listen** — dialogue cards with Thai/romanization/translation, Web Speech API audio, +10 XP
2. **Drill** — phrase practice with audio playback, +20 XP
3. **Quiz** — 5 MCQ, heart lives system, +30 XP (+10 bonus for perfect)
4. **Score** — summary screen, XP earned, continue button

All 7 lessons are defined in the `LESSONS` map inside `LessonPlayer.tsx`:
| Slug | Lesson | Access |
|------|--------|--------|
| `airport-arrival` | Day 1: Airport Arrival | **Free** |
| `taxi-transport` | Day 2: Taxi & Directions | Paid |
| `food-restaurant` | Day 3: Food & Restaurants | **Free** |
| `shopping-market` | Day 4: Shopping & Bargaining | Paid |
| `hotel-checkin` | Day 5: Hotel Check-in | Paid |
| `emergency-health` | Day 6: Emergency & Health | Paid |
| `small-talk` | Day 7: Small Talk | Paid |

Free slugs are enforced by `FREE_SLUGS = new Set(["airport-arrival", "food-restaurant"])` in `LessonPlayer.tsx`. Non-paid users see a paywall overlay for paid lessons.

#### Course Access Gating

`client/src/lib/courseAccess.ts` is the single source of truth:
- `hasCourseAccess(purchases)` — true if user has a completed course purchase
- `canAccessLesson({ lessonId, hasPaidAccess })` — checks against `TOURIST_COURSE.freeLessonIds` / `paidLessonIds`
- `getCourseAccessState({ user, purchases })` — returns `kind: "visitor" | "free" | "paid"`

Free lesson IDs and paid lesson IDs are defined in `client/src/data/touristCourse.ts` under `TOURIST_COURSE`.

#### Course Dashboard (`client/src/pages/CourseDashboard.tsx`)

Mounted at `/course`. Shows:
- Placement quiz (3 questions, stored in `localStorage` key `th_placement_v1`, shown once)
- 7-day chapter map — `DayCard` components with states: `"free" | "paid-locked" | "coming-soon" | "done"`
- `LESSON_SLUG` map routes each day to its lesson slug (days 1, 3–7, 9)
- Stats strip: streak, total XP, gems from `GamificationContext`
- Paywall CTA at bottom for non-paid users

#### Gamification (`client/src/contexts/GamificationContext.tsx`)

Persisted to `localStorage` key `th_gamification_v1`. State:
- `streak` — consecutive days practiced
- `xp` — total experience points
- `gems` — currency for streak freezes
- `weeklyActivity` — 7-element boolean array (Sun–Sat)
- `weeklyXp` — XP earned per day this week
- `frozenUntil` — ISO date string when freeze expires

Methods:
- `recordPractice(earnedXp)` — call at lesson score screen; updates streak, XP, gems
- `spendGemForFreeze()` — spends 1 gem to protect streak for 24h

The `GamificationBar` component (`client/src/components/GamificationBar.tsx`) is shown in the Navbar (desktop only, hidden on mobile) — displays streak flame, XP total, and gem count.

### Stripe Webhook Ordering

The webhook route **must** be registered before `express.json()` middleware because Stripe signature verification requires the raw request body. This is handled in `server/_core/index.ts`.

### Premium Subscription System

**Products:** Tourist Survival Thai Course (₪79 one-time), Premium Monthly (₪29/month), Premium Annual (₪199/year). Defined in `shared/products.ts`.

**Flow:** User clicks upgrade → `trpc.stripe.createCheckoutSession` (one-time) or `trpc.stripe.createSubscriptionCheckout` (subscription) → Stripe Checkout → webhook `checkout.session.completed` → `purchases` table updated → content unlocked.

**Content gating (soft paywall):** Premium articles (`isPremium: true`) show 200-word preview + blur overlay + upgrade CTA for non-premium users. Gating logic in `server/articleRouter.ts` `getBySlug` endpoint — returns `gated: boolean`.

**Subscription management:** Stripe Customer Portal via `trpc.stripe.createCustomerPortalSession`. Self-service cancel/update/invoices.

**Webhook events handled** (in `server/webhookHandler.ts`): `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`.

**DB table:** `subscriptions` — `userId`, `tier` (free/premium), `status` (active/canceled/expired/past_due), `stripeSubscriptionId`, `stripeCustomerId`, `currentPeriodStart/End`.

### Admin Panel (`client/src/pages/Admin.tsx`)

Routes: `/admin`, `/admin/content`, `/admin/financial`. Requires `role === "admin"`.

`Admin.tsx` uses the OKLCH design token system and shows:
- KPI cards: revenue, course purchasers, registered users, AI conversations, transactions, active learners
- **Lesson completion bar chart** — per-lesson completions from DB via `trpc.admin.getCourseAnalytics`
- Recent purchases table
- Registered users table
- AI chat log viewer

`getCourseAnalytics` in `server/adminRouter.ts` queries `userProgress` for per-lesson completion counts and `purchases` for total course purchasers.

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
- Context providers: `GamificationProvider` → `ProgressProvider` → `TooltipProvider` (see `App.tsx` — order matters)
- New pages/components use OKLCH `C` token objects, not Tailwind color classes
- Thai audio uses Web Speech API (`utterance.lang = "th-TH"`, `utterance.rate = 0.72`)
- Gamification state lives in `GamificationContext` — call `recordPractice(xp)` at lesson completion
- Course access is checked via `hasCourseAccess(purchases)` from `courseAccess.ts` — do not duplicate this logic
- `FREE_SLUGS` in `LessonPlayer.tsx` controls which lessons are free — keep in sync with `TOURIST_COURSE.freeLessonIds` in `touristCourse.ts`
- Article detail fetches from DB via `trpc.article.getBySlug` (not hardcoded data)

## Deprecated / Disabled

- **Forum**: Schema tables exist (`forumPosts`, `forumComments`, etc.) but no routes in `App.tsx`
- **Old lessons route**: `/lessons` kept for backward compat; primary route is `/interactive-lessons`
- **ContentCarousel**: Removed, replaced by `CategoryGrid` + `FeaturedStrip`
- **ArticleCard / ArticleCardSkeleton**: Removed, replaced by `ContentCard` with variants
- **InteractiveLessons**: Legacy lesson list at `/interactive-lessons` — superseded by `/course` + `/lesson/:id`

## Known Issues

- `server/newsletterRouter.ts:231` has a pre-existing TypeScript error (`.where()` on Drizzle query) — unrelated to course system
- Premium subscription requires `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` env vars to function — buttons will error without them
- Gamification (`GamificationContext`) is client-only localStorage — not synced to DB; streaks reset if localStorage is cleared
