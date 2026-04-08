# Thailand Hayom → Railway Migration Guide

**Status:** Code changes done. Ready for deployment.
**Estimated hands-on time:** 1–2 hours

---

## ✅ Phase 1: Code Changes (Already Done)

| File | What Changed |
|------|-------------|
| `vite.config.ts` | Removed `vite-plugin-manus-runtime`, removed Manus allowedHosts |
| `server/_core/llm.ts` | Switched LLM to use `OPENAI_API_KEY` + `OPENAI_API_BASE_URL`, model → `gpt-4o-mini`, removed `thinking` param |
| `server/_core/env.ts` | Added `openaiApiKey` field for clarity |
| `server/_core/localAuth.ts` | **NEW** — email/password auth fallback (replaces Manus OAuth) |
| `server/_core/index.ts` | Registers `registerLocalAuthRoutes(app)` |
| `drizzle/schema.ts` | Added `passwordHash` + `passwordSalt` columns to `users` table |
| `client/src/_core/hooks/useAuth.ts` | Removed Manus-specific `localStorage.setItem` |
| `package.json` | Removed `vite-plugin-manus-runtime` dependency |
| `railway.json` | **NEW** — Railway deployment config |
| `.env.railway.example` | **NEW** — all env vars documented with comments |

---

## 🔐 Phase 2: Environment Variables

Copy these into **Railway Dashboard → Project → Variables**:

### Required
```
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=your-random-32-char-secret
NODE_ENV=production
```

### AI / LLM
```
OPENAI_API_KEY=sk-...           # From platform.openai.com/api-keys
OPENAI_API_BASE_URL=             # Leave blank for default OpenAI
OPENAI_MODEL=gpt-4o-mini         # Optional, default is fine
```

### Payments
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Email
```
RESEND_API_KEY=re_...
```

### Optional (for first admin)
```
# Leave blank initially. After registering your account,
# find your openId in the DB, then set this to grant admin.
OWNER_OPEN_ID=
```

---

## 🚀 Phase 3: Deploy Steps

### Step 1: Push code to GitHub
```bash
cd ~/workspace/thailand-hayom
git add .
git commit -m "migrate to Railway — remove Manus, add local auth"
git push origin main
```

### Step 2: Create Railway project
1. Go to [railway.app](https://railway.app) → Sign in with GitHub
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your `thailand-hayom` repo
4. Railway auto-detects Nixpacks — should work out of the box

### Step 3: Add PostgreSQL plugin
1. In your Railway project → **Plugins** → **Add PostgreSQL**
2. Railway auto-sets `DATABASE_URL` — copy it if needed

### Step 4: Set environment variables
1. Project → **Variables** tab
2. Add all variables from the list above (Step 2 of this guide)
3. **Important:** Set `JWT_SECRET` to a random string:
   ```bash
   # Run this locally to generate one:
   openssl rand -hex 32
   ```

### Step 5: Deploy
1. Railway triggers deploy automatically on push
2. Watch the **Deployments** tab — should take ~2–3 min
3. Note the Railway-provided URL (e.g. `thailand-hayom.up.railway.app`)

### Step 6: Test
1. Open the Railway URL — does the app load?
2. Register a new account at `/api/auth/register`
3. Try the AI chat — does it respond?

### Step 7: Custom domain (optional)
1. Project → **Settings** → **Domains**
2. Add your custom domain
3. Add the DNS records Railway shows you

### Step 8: Stripe webhook (if using payments)
1. Stripe Dashboard → Webhooks → your endpoint
2. Update the endpoint URL to your new Railway URL:
   ```
   https://your-domain.up.railway.app/api/stripe/webhook
   ```
3. Copy the new **Signing Secret** into Railway `STRIPE_WEBHOOK_SECRET`

---

## 📁 File Summary

```
Modified:
  vite.config.ts                          — remove Manus plugin + hosts
  server/_core/llm.ts                     — use OPENAI_API_KEY directly
  server/_core/env.ts                     — document env fields
  server/_core/index.ts                   — register local auth routes
  server/_core/localAuth.ts               — NEW: email/password auth
  drizzle/schema.ts                       — add passwordHash/Salt columns
  client/src/_core/hooks/useAuth.ts       — remove Manus localStorage
  package.json                            — remove vite-plugin-manus-runtime

New:
  railway.json                            — Railway deployment config
  .env.railway.example                    — env var documentation
  MIGRATION.md                            — this file
```

---

## ⚠️ DB Migration Note

After first deploy, run the DB migration to add the new columns:
```bash
cd ~/workspace/thailand-hayom
pnpm db:push
```
Or Railway has a migration runner in the project shell.

---

## Troubleshooting

**App crashes on startup?**
→ Check Railway logs. Most likely: missing `JWT_SECRET` or `DATABASE_URL`

**AI chat not working?**
→ Verify `OPENAI_API_KEY` is set and has credits

**Auth not working?**
→ Check that `JWT_SECRET` matches what was used when you registered

**Can't register?**
→ Database might not have the new columns yet — run `pnpm db:push`

---

Questions? Ask Eli. 🚀