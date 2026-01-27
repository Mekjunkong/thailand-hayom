# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Thailand Hayom** (תאילנד היום) is a bilingual (Hebrew/English) travel platform for Israeli travelers in Thailand. It combines:
- Newsletter system with articles about Thailand (travel tips, visa updates, events, food)
- Interactive Thai language lessons (30 lessons with audio pronunciation)
- Premium subscription content (₪49/month)
- AI-powered travel concierge chatbot
- Stripe payment integration (Israeli Shekels - ILS)
- Event calendar and guide packages

## Tech Stack

- **Frontend**: React 19 + Vite + TailwindCSS v4 + Wouter (routing)
- **Backend**: Express + tRPC + Drizzle ORM
- **Database**: PostgreSQL (Supabase)
- **Payments**: Stripe (ILS currency)
- **Email**: Resend API (bilingual templates)
- **Auth**: Manus OAuth (optional, can be disabled for local dev)
- **Package Manager**: pnpm

## Development Commands

```bash
# Install dependencies
pnpm install

# Run development server (with hot reload)
pnpm dev
# Runs: NODE_ENV=development tsx watch server/_core/index.ts
# Server starts on http://localhost:3000 (or next available port)

# Type checking (without building)
pnpm check

# Format code with Prettier
pnpm format

# Run tests
pnpm test

# Build for production
pnpm build
# Creates: dist/public (frontend) + dist/index.js (backend)

# Start production server
pnpm start
# Runs: NODE_ENV=production node dist/index.js

# Database: Generate and apply migrations
pnpm db:push
# Runs: drizzle-kit generate && drizzle-kit migrate

# View database in Drizzle Studio (optional)
npx drizzle-kit studio
```

## Database Setup

The app uses **PostgreSQL** via Supabase (migrated from MySQL). Connection is configured via `DATABASE_URL` environment variable.

**Schema location**: `drizzle/schema.ts`

### Key Tables
- `users` - User accounts with Manus OAuth, role (user/admin), reputation
- `articles` - Newsletter articles (bilingual: title/titleHe, content/contentHe)
- `newsletterSubscribers` - Email subscribers with tier (free/premium)
- `events` - Thailand events calendar (bilingual)
- `eventPackages` - Purchasable event guides (₪15-29 each)
- `subscriptions` - Premium subscriptions via Stripe
- `purchases` - One-time purchases (Welcome Kit, event packages)
- `chatLogs` - AI concierge conversation history
- `userProgress` - Thai lesson completion tracking
- `quizPerformance` - Spaced repetition system (SM-2 algorithm)
- `bookmarkedPhrases` - User's saved phrases
- `forumCategories`, `forumPosts`, `forumComments`, `forumLikes` - Community forum (currently disabled but schema kept)

### Database Commands
```bash
# Push schema changes to database
pnpm db:push

# Database connection is lazy-loaded in server/db.ts
# Access via: const db = await getDb()
```

## Project Structure

```
thailand-hayom/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/         # Route components (Home, Articles, InteractiveLessons, etc.)
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React contexts (Theme, Progress, Language)
│   │   ├── _core/         # Core client utilities (useAuth, tRPC client)
│   │   ├── App.tsx        # Main app with routing
│   │   └── main.tsx       # Entry point
│   └── public/            # Static assets
├── server/                # Backend (Express + tRPC)
│   ├── _core/             # Core server setup (index.ts, trpc.ts, oauth.ts)
│   ├── routers.ts         # Main tRPC router (combines all sub-routers)
│   ├── chatRouter.ts      # AI concierge endpoints
│   ├── stripeRouter.ts    # Payment endpoints
│   ├── adminRouter.ts     # Admin dashboard endpoints
│   ├── userRouter.ts      # User profile endpoints
│   ├── newsletterRouter.ts # Newsletter subscription endpoints
│   ├── progressRouter.ts  # Lesson progress API (Express router)
│   ├── phraseCardsRouter.ts # PDF phrase cards generator
│   ├── emailService.ts    # Resend email integration
│   ├── pdfGenerator.ts    # Welcome Kit PDF generator
│   ├── webhookHandler.ts  # Stripe webhook handler
│   └── db.ts              # Database utilities (getDb, upsertUser)
├── shared/                # Shared types and constants
│   ├── const.ts           # Constants (COOKIE_NAME, error messages)
│   ├── products.ts        # Product definitions (prices, features)
│   └── types.ts           # Shared TypeScript types
├── drizzle/               # Database schema and migrations
│   ├── schema.ts          # PostgreSQL schema (Drizzle ORM)
│   └── *.sql              # Migration files
└── vite.config.ts         # Vite configuration
```

## Architecture Patterns

### 1. Monorepo Structure
- **Client** and **server** share the same Node.js process in development
- Vite dev server is integrated into Express in `server/_core/vite.ts`
- Production build creates separate frontend (`dist/public`) and backend (`dist/index.js`)

### 2. tRPC API Layer
All API endpoints use tRPC for type-safe client-server communication:

```typescript
// Define route in server/routers.ts
export const appRouter = router({
  chat: chatRouter,
  stripe: stripeRouter,
  admin: adminRouter,
  // ...
});

// Use in client with full type safety
const result = await trpc.chat.sendMessage.mutate({ message: "Hello" });
```

**Procedure types**:
- `publicProcedure` - No authentication required
- `protectedProcedure` - Requires logged-in user (checks `ctx.user`)
- `adminProcedure` - Requires admin role (checks `ctx.user.role === 'admin'`)

**Context**: Each tRPC request has access to `ctx.user` (from session cookie) and `ctx.req`/`ctx.res` (Express)

### 3. Authentication Flow
Uses **Manus OAuth** (optional for local dev):
- OAuth callback: `/api/oauth/callback` (in `server/_core/oauth.ts`)
- Session stored in httpOnly cookie (name: `COOKIE_NAME` from `shared/const.ts`)
- Auth state: `const { data: user } = trpc.auth.me.useQuery()` (React hook)
- Logout: `trpc.auth.logout.useMutation()`

**For local dev without auth**: Replace `protectedProcedure` with `publicProcedure` in router definitions.

### 4. Bilingual Content Pattern
All user-facing content supports Hebrew (RTL) and English:
- Database: Separate columns (`title` + `titleHe`, `content` + `contentHe`)
- Components: Use `LanguageContext` from `client/src/contexts/LanguageContext.tsx`
- Display: Toggle with flag icons (🇮🇱/🇬🇧) in UI

### 5. Payment Integration
- **Currency**: Israeli Shekels (ILS) - configured in `shared/products.ts`
- **Products**: Smart Tourist Pack (₪20), Premium Subscription (₪49/month)
- **Stripe Setup**:
  - Checkout session creation: `stripeRouter.ts` → `createCheckoutSession`
  - Webhook handler: `server/webhookHandler.ts` → processes payment events
  - Test mode: Use Stripe test keys (`STRIPE_SECRET_KEY`, `VITE_STRIPE_PUBLISHABLE_KEY`)

### 6. Database Access Pattern
```typescript
// Always use lazy-loaded database instance
import { getDb } from "./db";

const db = await getDb();
if (!db) {
  console.warn("Database not available");
  return;
}

// Use Drizzle ORM queries
const articles = await db.select().from(articles).where(eq(articles.isPublished, true));
```

### 7. Progressive Enhancement Features
- **Lesson Progress**: Stored in `userProgress` table, synced across devices
- **Quiz System**: Spaced repetition (SM-2 algorithm) in `quizPerformance` table
- **AI Concierge**: OpenAI API integration in `chatRouter.ts`, saves conversations to `chatLogs`
- **Email Automation**: Resend API in `emailService.ts`, sends Welcome Kit PDF after payment

## Environment Variables

See `LOCAL_SETUP.md` for full reference. Key variables:

**Required**:
- `DATABASE_URL` - PostgreSQL connection string (Supabase)
- `JWT_SECRET` - Min 32 characters for session cookies

**Optional (Stripe)**:
- `STRIPE_SECRET_KEY`, `VITE_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`

**Optional (Email)**:
- `RESEND_API_KEY` - For sending newsletters and Welcome Kit PDFs

**Optional (Manus Platform)**:
- `VITE_APP_ID`, `OAUTH_SERVER_URL`, `OWNER_OPEN_ID` - For OAuth authentication

## Important Notes

### Routing
- Client-side routing uses **Wouter** (not React Router)
- Routes defined in `client/src/App.tsx`
- Navigation: `import { useLocation } from "wouter"` → `const [, setLocation] = useLocation()`

### Styling
- **TailwindCSS v4** (newer syntax, imported in Vite config)
- UI components: Radix UI primitives in `client/src/components/ui/`
- Theme: Light mode default, switchable via `ThemeProvider` (currently disabled)

### Audio Pronunciation
- Uses **Web Speech API** for Thai pronunciation in lessons
- Implementation: `client/src/pages/InteractiveLessons.tsx`
- Fallback: Works in real browsers, not headless environments

### Deprecated Features
- **Forum**: Schema exists (`forumPosts`, `forumComments`) but routes disabled in `App.tsx`
- **Old Lessons Page**: `/lessons` route kept for backward compatibility, new route is `/interactive-lessons`

### Git Workflow
- Main branch: `main`
- Recent changes: Converted from MySQL to Supabase PostgreSQL (see commit `d8fd342`)

## Common Development Tasks

### Adding a New tRPC Route
1. Create router file in `server/` (e.g., `newRouter.ts`)
2. Import and add to `server/routers.ts`:
   ```typescript
   import { newRouter } from "./newRouter";
   export const appRouter = router({
     // ...
     new: newRouter,
   });
   ```
3. Use in client: `trpc.new.myProcedure.useQuery()`

### Adding Database Tables
1. Define table in `drizzle/schema.ts` using Drizzle PostgreSQL syntax
2. Run `pnpm db:push` to generate and apply migration
3. Export types: `export type MyTable = typeof myTable.$inferSelect;`

### Creating New Pages
1. Add component in `client/src/pages/`
2. Register route in `client/src/App.tsx`:
   ```typescript
   <Route path="/my-page" component={MyPage} />
   ```
3. Add navigation link in relevant parent components

### Bilingual Content
Always create both English and Hebrew versions:
```typescript
{
  title: "Travel Tips",
  titleHe: "טיפים לטיול",
  content: "English content...",
  contentHe: "תוכן בעברית..."
}
```

### Testing Stripe Locally
1. Use Stripe CLI: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
2. Copy webhook secret to `.env`: `STRIPE_WEBHOOK_SECRET=whsec_...`
3. Use test card: 4242 4242 4242 4242 (any future date, any CVV)

## Known Issues & Workarounds

- **Port Conflicts**: Server auto-finds available port starting from 3000
- **Stripe Currency**: Changed from THB to ILS - old test data may have wrong currency
- **Authentication**: For local dev, use `publicProcedure` instead of `protectedProcedure` to bypass OAuth
- **Hebrew Text**: Ensure RTL support using `dir="rtl"` and `text-right` classes

## Key Files for Understanding Architecture

1. `server/_core/index.ts` - Express server setup, integrates Vite and tRPC
2. `server/routers.ts` - Main API router definition
3. `drizzle/schema.ts` - Complete database schema
4. `client/src/App.tsx` - Frontend routing and providers
5. `server/_core/trpc.ts` - tRPC setup with auth middleware
6. `shared/products.ts` - Product pricing and features
7. `LOCAL_SETUP.md` - Detailed setup instructions for new developers
