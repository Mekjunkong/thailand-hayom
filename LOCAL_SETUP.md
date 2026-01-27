# Local Development Setup Guide

This guide explains how to run **Thailand Hayom** on your local machine.

## Prerequisites

- Node.js 22+ installed
- pnpm installed (`npm install -g pnpm`)
- MySQL database (or compatible service)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Mekjunkong/thailand-hayom.git
cd thailand-hayom
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# Minimum required for local development
DATABASE_URL=mysql://user:password@localhost:3306/thailand_hayom
JWT_SECRET=your-random-secret-min-32-characters-long
NODE_ENV=development
```

**Where to get a database:**
- **PlanetScale** (recommended): https://planetscale.com - Free tier available
- **Railway**: https://railway.app - Easy MySQL setup
- **Local MySQL**: Install MySQL locally

### 4. Push Database Schema

```bash
pnpm db:push
```

This creates all necessary tables (users, articles, subscribers, events, etc.)

### 5. Run Development Server

```bash
pnpm dev
```

Visit: http://localhost:3000

---

## Optional Features

### Stripe Payments (Premium Subscriptions)

Get test keys from https://dashboard.stripe.com/test/apikeys

Add to `.env`:
```bash
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... # From Stripe CLI or dashboard
```

### Email Newsletter (Resend)

Sign up at https://resend.com (free tier: 100 emails/day)

Add to `.env`:
```bash
RESEND_API_KEY=re_...
```

### Authentication

**Option 1: Disable Auth (for local testing)**

Comment out auth checks in `server/routers.ts` - replace `protectedProcedure` with `publicProcedure`

**Option 2: Use Manus OAuth (requires Manus platform)**

Contact Manus support for OAuth credentials

---

## Environment Variables Reference

### Required
- `DATABASE_URL` - MySQL connection string
- `JWT_SECRET` - Random string (min 32 chars) for session cookies

### Optional (Stripe)
- `STRIPE_SECRET_KEY` - From Stripe dashboard
- `VITE_STRIPE_PUBLISHABLE_KEY` - From Stripe dashboard  
- `STRIPE_WEBHOOK_SECRET` - From Stripe webhook settings

### Optional (Email)
- `RESEND_API_KEY` - From Resend dashboard

### Optional (Manus Platform Features)
- `VITE_APP_ID` - Manus OAuth app ID
- `OAUTH_SERVER_URL` - Manus OAuth server
- `VITE_OAUTH_PORTAL_URL` - Manus login portal
- `OWNER_OPEN_ID` - Your Manus user ID
- `OWNER_NAME` - Your name
- `BUILT_IN_FORGE_API_KEY` - Manus LLM API key
- `BUILT_IN_FORGE_API_URL` - Manus LLM API endpoint
- `VITE_FRONTEND_FORGE_API_KEY` - Frontend LLM key
- `VITE_FRONTEND_FORGE_API_URL` - Frontend LLM endpoint

### Optional (Analytics)
- `VITE_ANALYTICS_WEBSITE_ID` - Analytics site ID
- `VITE_ANALYTICS_ENDPOINT` - Analytics endpoint

### Optional (Branding)
- `VITE_APP_TITLE` - Website title (default: "Thailand Hayom")
- `VITE_APP_LOGO` - Logo path (default: "/logo.png")

---

## Database Commands

```bash
# Generate migration
pnpm db:push

# View database in Drizzle Studio
pnpm drizzle-kit studio
```

---

## Troubleshooting

### "Cannot connect to database"
- Check `DATABASE_URL` is correct
- Ensure database server is running
- Verify firewall allows connection

### "Stripe webhook failed"
- Use Stripe CLI for local testing: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
- Get webhook secret from CLI output

### "Authentication failed"
- For local dev, you can bypass auth by using `publicProcedure` instead of `protectedProcedure`
- Or set up Manus OAuth credentials

---

## Production Deployment

The app is designed to run on Manus platform, but you can deploy elsewhere:

1. **Vercel/Netlify** - May need adjustments for serverless
2. **Railway/Render** - Works out of the box
3. **VPS** - Use PM2 or Docker

Build command: `pnpm build`
Start command: `node dist/index.js`

---

## Need Help?

- Check `README.md` for architecture overview
- Review `server/routers.ts` for API endpoints
- See `drizzle/schema.ts` for database structure

Happy coding! 🚀
