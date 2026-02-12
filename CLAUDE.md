# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Thailand Hayom** (תאילנד היום) is a bilingual Hebrew/English travel platform for Israeli travelers in Thailand. Features: newsletter articles, 30 interactive Thai language lessons with audio, AI travel concierge (OpenAI), Stripe payments in ILS, event calendar, and premium subscriptions.

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Dev server with hot reload (tsx watch, http://localhost:3000)
pnpm build            # Production build → dist/public (frontend) + dist/index.js (backend)
pnpm start            # Run production build
pnpm check            # TypeScript type-check (tsc --noEmit)
pnpm format           # Prettier format all files
pnpm test             # Run tests (vitest)
pnpm db:push          # Generate + apply DB migrations (drizzle-kit generate && drizzle-kit migrate)
npx drizzle-kit studio  # Visual DB browser
```

Tests are server-side only: `vitest` runs files matching `server/**/*.test.ts` and `server/**/*.spec.ts`.

## Tech Stack

- **Frontend**: React 19, Vite 7, TailwindCSS v4, Wouter (routing), Radix UI, Framer Motion
- **Backend**: Express 4, tRPC 11 (SuperJSON transformer), Drizzle ORM
- **Database**: PostgreSQL (Supabase), schema at `drizzle/schema.ts`
- **Payments**: Stripe (ILS currency), products defined in `shared/products.ts`
- **Email**: Resend API (`server/emailService.ts`)
- **Auth**: Manus OAuth (optional — bypass for local dev by swapping `protectedProcedure` → `publicProcedure`)
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

Client and server run in the same Node.js process. In dev, Vite dev server is embedded in Express (`server/_core/vite.ts`). In production, Express serves the static build from `dist/public`.

### API Layer: Mixed tRPC + Express

**tRPC routes** (mounted at `/api/trpc`) handle most endpoints. Defined in `server/routers.ts`:
- `auth`, `chat`, `stripe`, `admin`, `user`, `newsletter`, `article`, `event`, `financial`

**Plain Express routes** exist alongside tRPC for specific needs:
- `progressRouter` — lesson progress tracking
- `phraseCardsRouter` — PDF phrase card generation
- Stripe webhook at `/api/stripe/webhook` (raw body, registered before `express.json()`)
- OAuth callback at `/api/oauth/callback`

### tRPC Procedure Types

Defined in `server/_core/trpc.ts`:
- `publicProcedure` — no auth required
- `protectedProcedure` — requires logged-in user (`ctx.user`)
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

### Stripe Webhook Ordering

The webhook route **must** be registered before `express.json()` middleware because Stripe signature verification requires the raw request body. This is handled in `server/_core/index.ts`.

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

## Deprecated / Disabled

- **Forum**: Schema tables exist (`forumPosts`, `forumComments`, etc.) but no routes in `App.tsx`
- **Old lessons route**: `/lessons` kept for backward compat; primary route is `/interactive-lessons`
