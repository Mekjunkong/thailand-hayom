# Stripe Webhook Fix Summary

## Problem
The Stripe webhook handler (`handleStripeWebhook`) existed but was never registered as an Express route, causing payments to succeed but not trigger:
- Database purchase records
- Welcome Kit PDF email delivery
- Bulk order invoice generation

## Solution Implemented

### Changes to `server/_core/index.ts`

1. **Added import**: `import { handleStripeWebhook } from "../webhookHandler"`

2. **Registered webhook endpoint** at `/api/stripe/webhook` with:
   - `express.raw()` middleware (preserves raw body for signature verification)
   - Proper placement BEFORE `express.json()` middleware
   - Error handling for missing signatures
   - Body conversion from Buffer to string for Stripe signature verification

3. **Key implementation details**:
   ```typescript
   app.post(
     "/api/stripe/webhook",
     express.raw({ type: "application/json" }),
     async (req: Request, res: Response) => {
       const signature = req.headers["stripe-signature"];
       const body = req.body.toString("utf8");
       await handleStripeWebhook(body, signature);
       res.json({ received: true });
     }
   );
   ```

## Testing the Fix

### Local Testing with Stripe CLI

1. **Install Stripe CLI** (if not already installed):
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe

   # Or download from: https://stripe.com/docs/stripe-cli
   ```

2. **Login to Stripe**:
   ```bash
   stripe login
   ```

3. **Forward webhooks to your local server**:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

   This will output a webhook signing secret like:
   ```
   > Ready! Your webhook signing secret is whsec_xxxxx
   ```

4. **Update `.env` file** with the webhook secret:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   ```

5. **Start your dev server**:
   ```bash
   pnpm dev
   ```

6. **Trigger a test payment**:
   ```bash
   stripe trigger checkout.session.completed
   ```

   Or use a test card on your checkout page:
   - Card number: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits

7. **Verify the webhook works**:
   - Check terminal for "Payment processed successfully" logs
   - Check database for new purchase record
   - Check email inbox for Welcome Kit PDF

### Production Setup

1. **In Stripe Dashboard**:
   - Go to: Developers → Webhooks
   - Click "Add endpoint"
   - URL: `https://your-domain.com/api/stripe/webhook`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`

2. **Copy the production webhook secret** and add to production environment variables:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_prod_xxxxx
   ```

## What the Webhook Does

When a payment succeeds, the webhook automatically:

1. Saves purchase record to `purchases` table with:
   - Stripe session ID
   - Customer email and name
   - Amount and currency (ILS)
   - Product type (single/bulk_10/bulk_20)

2. Generates 38-page Welcome Kit PDF with:
   - Arrival survival guide
   - Common scams to avoid
   - SIM card comparisons
   - Transportation rules
   - Temple etiquette
   - Emergency contacts
   - 3-day itineraries

3. Sends bilingual (Hebrew/English) email with PDF attachment

4. For bulk orders (qty > 1):
   - Also generates and sends invoice PDF

## Environment Variables Required

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (for PDF delivery)
RESEND_API_KEY=re_...

# Database
DATABASE_URL=postgresql://...
```

## Commit This Fix

To save these changes:
```bash
git add server/_core/index.ts
git commit -m "Fix: Register Stripe webhook endpoint for payment processing

- Add POST /api/stripe/webhook endpoint with raw body parsing
- Ensures payments trigger PDF delivery and database records
- Proper signature verification with STRIPE_WEBHOOK_SECRET
- Error handling for missing signatures

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```
