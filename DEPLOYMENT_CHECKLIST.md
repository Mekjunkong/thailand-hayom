# Railway Deployment Checklist ✅

**Project:** thailand-hayom (AI Thai Learning Platform)  
**Status:** Migration from Manus AI → Railway (completed)  
**Last Updated:** 2026-04-08

---

## ✅ Code Changes (All Done)

### Files Modified
- [x] `vite.config.ts` — Removed `vite-plugin-manus-runtime`, cleaned allowedHosts
- [x] `server/_core/llm.ts` — Replaced Manus Forge with OPENAI_API_KEY, model → `gpt-4o-mini`
- [x] `server/_core/index.ts` — Registered `registerLocalAuthRoutes(app)`
- [x] `drizzle/schema.ts` — Added `passwordHash` + `passwordSalt` columns to users table
- [x] `client/src/_core/hooks/useAuth.ts` — Removed Manus localStorage sync
- [x] `package.json` — Removed `vite-plugin-manus-runtime` dependency

### Files Created
- [x] `server/_core/localAuth.ts` — Email/password JWT auth (replaces Manus OAuth)
- [x] `railway.json` — Railway deployment config
- [x] `.env.railway.example` — Environment variable template with docs
- [x] `MIGRATION.md` — Full migration guide
- [x] `DEPLOYMENT_CHECKLIST.md` — This file

### Scripts Ready
- [x] `pnpm build` — Builds client (Vite) + server (esbuild)
- [x] `pnpm start` — Runs `node dist/index.js` in production
- [x] `pnpm dev` — Dev mode with tsx watch + Vite HMR

---

## 🔐 Environment Variables Required

Copy these into **Railway Dashboard → Your Project → Variables**:

```
# Database
DATABASE_URL=postgresql://...

# Auth
JWT_SECRET=<random-32-char-hex>
NODE_ENV=production

# AI/LLM
OPENAI_API_KEY=sk-...
OPENAI_API_BASE_URL=           # (optional, leave blank for default)
OPENAI_MODEL=gpt-4o-mini       # (optional, already default)

# Payments
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
RESEND_API_KEY=re_...

# Admin (optional, set after first user registers)
# OWNER_OPEN_ID=local_xxxxx
```

**Generate JWT_SECRET:**
```bash
openssl rand -hex 32
```

---

## 🚀 Railway Deploy Steps

### 1. Commit & Push Code
```bash
cd ~/workspace/thailand-hayom
git add .
git commit -m "feat: migrate to Railway (remove Manus, add local auth)"
git push origin main
```

### 2. Create Railway Account & Project
- Go to [railway.app](https://railway.app)
- Sign in with GitHub
- Click **New Project** → **Deploy from GitHub repo**
- Select `thailand-hayom` repository
- Railway auto-detects Nixpacks

### 3. Add PostgreSQL Plugin
- In your Railway project dashboard
- Click **Plugins** → **Add PostgreSQL**
- Railway auto-sets `DATABASE_URL` environment variable

### 4. Set Environment Variables
- Project → **Variables** tab
- Add all variables from the checklist above
- Critical: `JWT_SECRET` (generate with `openssl rand -hex 32`)
- Critical: `OPENAI_API_KEY` (from openai.com)
- Critical: `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET`

### 5. Deploy
- Push to `main` branch (Railway triggers auto-deploy)
- OR manually trigger in **Deployments** tab
- Wait 2–3 minutes for build + deploy
- Watch logs for errors

### 6. Test Deployment
```bash
# Get your Railway URL from project dashboard
curl https://<railway-url>/api/system/health

# Register a test account
# POST https://<railway-url>/api/auth/register
# { "email": "test@example.com", "password": "test123456" }

# Try logging in + using the AI chat
```

### 7. Run DB Migration
```bash
# In Railway project shell:
pnpm db:push
```

### 8. Update Stripe Webhook
- Stripe Dashboard → **Webhooks**
- Update endpoint URL to: `https://<railway-url>/api/stripe/webhook`
- Copy new **Signing Secret** into Railway `STRIPE_WEBHOOK_SECRET`

### 9. Add Custom Domain (Optional)
- Railway Project → **Settings** → **Domains**
- Add your domain (e.g., `thailand-hayom.com`)
- Add DNS records Railway provides

---

## 🧠 Key Architecture Changes

### Before (Manus AI)
- Vite build → served via Manus runtime
- OAuth via Manus Auth server
- LLM via Manus Forge API (`forge.manus.im`)
- Session = Manus JWT only

### After (Railway)
- Vite + esbuild build → `dist/` folder
- Express.js server handles auth + API
- JWT session created by SDK (unchanged)
- LLM via OpenAI API directly
- Local email/password auth fallback
- Payments via Stripe (webhooks on Railway)

---

## 🛠️ Local Dev Setup

```bash
# Install deps
pnpm install

# Create .env.local (copy from .env.railway.example)
cp .env.railway.example .env.local
# Edit .env.local with your local values

# Run dev server
pnpm dev

# Build for production
pnpm build

# Start production locally
NODE_ENV=production node dist/index.js
```

---

## 🔍 Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check Railway logs. Missing Node.js deps? Run `pnpm install` |
| Auth not working | Verify `JWT_SECRET` is set. Check DB has password columns (`pnpm db:push`) |
| AI chat 500 error | Check `OPENAI_API_KEY` is valid. Check Railway logs for API errors |
| Database connection fails | Verify `DATABASE_URL` is correct, PostgreSQL plugin is added |
| Stripe webhook fails | Verify `STRIPE_WEBHOOK_SECRET` matches current signing secret |
| CORS errors | Check that `allowedHosts` in vite.config.ts includes your Railway domain |

---

## 📋 Post-Deploy Checklist

- [ ] App loads on Railway URL
- [ ] Can register new account via `/api/auth/register`
- [ ] Can login via `/api/auth/login`
- [ ] AI chat works (check OpenAI API key)
- [ ] Payments work (test Stripe webhook)
- [ ] Database migrations applied (`pnpm db:push`)
- [ ] Set `OWNER_OPEN_ID` for first admin user
- [ ] Custom domain configured (if applicable)
- [ ] Monitoring/alerts set up (Railway settings)

---

## 📞 Support

For issues:
1. Check Railway project logs (Deployments tab)
2. Check Express/Node errors in logs
3. Verify all environment variables are set
4. Run `pnpm db:push` to apply schema changes
5. Verify OpenAI API key has credits

---

**Ready to deploy?** Follow steps 1–9 above. Estimated time: 30–60 minutes. 🚀
