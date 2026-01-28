# Stripe Integration - Remaining Improvements

## ✅ FIXED: Webhook Endpoint Registration
**Status**: COMPLETE (Commit 2262e94)
- Webhook now processes payments correctly
- PDF delivery and database records working

---

## Priority Issues to Address

### 🔴 HIGH PRIORITY

#### 1. Add Idempotency Check for Webhooks
**Problem**: If Stripe sends the same webhook event multiple times, we'll create duplicate purchase records and send multiple emails.

**Solution**: Check if purchase already exists before processing
```typescript
// In webhookHandler.ts - handleSuccessfulPayment()
const existingPurchase = await db
  .select()
  .from(purchases)
  .where(eq(purchases.stripeSessionId, session.id))
  .limit(1);

if (existingPurchase.length > 0) {
  console.log("Purchase already processed:", session.id);
  return; // Already processed, skip
}
```

**File**: `server/webhookHandler.ts:45`

---

#### 2. Wrap Webhook in Database Transaction
**Problem**: If email fails after database insert, we have inconsistent state (purchase recorded but no email sent).

**Solution**: Use database transactions
```typescript
await db.transaction(async (tx) => {
  // Insert purchase
  await tx.insert(purchases).values({...});

  // Generate PDF
  const pdfBuffer = await generateWelcomeKitPDF();

  // Send email (if this fails, transaction rolls back)
  const emailResult = await sendWelcomeKitEmail(...);
  if (!emailResult.success) {
    throw new Error("Email delivery failed");
  }
});
```

**File**: `server/webhookHandler.ts:45`

---

#### 3. Populate Missing Database Fields
**Problem**: Some fields are defined but never populated:
- `completedAt` - Never set (should be set when payment completes)
- `stripePaymentIntentId` - Never populated
- `userId` - Only for logged-in users

**Solution**:
```typescript
await db.insert(purchases).values({
  stripeSessionId: session.id,
  stripePaymentIntentId: session.payment_intent as string, // ADD THIS
  completedAt: new Date(), // ADD THIS
  userId: session.metadata?.user_id ? parseInt(session.metadata.user_id) : null,
  // ... rest of fields
});
```

**File**: `server/webhookHandler.ts:60-69`

---

### 🟡 MEDIUM PRIORITY

#### 4. Fix Invoice PDF Currency Symbol
**Problem**: Invoice PDF uses Thai Baht symbol (฿) but payments are in Israeli Shekels (₪)

**Solution**: Update PDF template to use ILS symbol
**File**: `server/pdfGenerator.ts` (search for ฿ and replace with ₪)

---

#### 5. Add Hebrew Version to Invoice PDF
**Problem**: Bulk order invoices are English-only, but platform is bilingual

**Solution**: Add Hebrew content to invoice template
**File**: `server/pdfGenerator.ts` - `generateInvoicePDF()` function

---

#### 6. Add Email Retry Mechanism
**Problem**: If Resend API fails temporarily, email is lost forever

**Solution**: Create email queue table and retry failed emails
```sql
CREATE TABLE email_queue (
  id SERIAL PRIMARY KEY,
  purchase_id INT REFERENCES purchases(id),
  email_type VARCHAR(50), -- 'welcome_kit' | 'invoice'
  recipient_email VARCHAR(320),
  status VARCHAR(50), -- 'pending' | 'sent' | 'failed'
  retry_count INT DEFAULT 0,
  last_error TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Files**:
- `drizzle/schema.ts` - Add table
- `server/emailService.ts` - Add queue logic
- Create background job to retry failed emails

---

#### 7. Verify Stripe API Version
**Problem**: Using API version `"2025-10-29.clover"` which appears to be a test/mock version

**Solution**: Check Stripe dashboard for correct API version
```typescript
// server/webhookHandler.ts:7-9
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia", // Update to latest stable
});
```

**File**: `server/webhookHandler.ts:7-9`

---

### 🟢 LOW PRIORITY (Future Enhancements)

#### 8. Implement Premium Subscriptions
**Problem**: Database has `subscriptions` table but no implementation

**Solution**: Add recurring subscription flow
- Create checkout session with `mode: "subscription"`
- Handle `customer.subscription.created` webhook event
- Handle `customer.subscription.updated` for renewals
- Handle `customer.subscription.deleted` for cancellations

**Files**:
- `server/stripeRouter.ts` - Add `createSubscriptionSession` procedure
- `server/webhookHandler.ts` - Add subscription event handlers
- `shared/products.ts` - Define subscription products (₪49/month Premium)

---

#### 9. Add Payment Status Dashboard
**Problem**: No admin view to see payment status and failures

**Solution**: Add to Admin dashboard
- Recent payments list
- Failed webhook events
- Email delivery status
- Revenue analytics

**Files**:
- `server/adminRouter.ts` - Add payment queries
- `client/src/pages/AdminContent.tsx` - Add Payments tab

---

#### 10. Cache Welcome Kit PDF
**Problem**: Identical PDF generated for every purchase (wasteful)

**Solution**: Generate once, store in S3 or local cache
```typescript
let cachedWelcomeKit: Buffer | null = null;

export async function getWelcomeKitPDF(): Promise<Buffer> {
  if (!cachedWelcomeKit) {
    cachedWelcomeKit = await generateWelcomeKitPDF();
  }
  return cachedWelcomeKit;
}
```

**File**: `server/pdfGenerator.ts`

---

## Testing Checklist

### Local Testing (Test Mode)
- [ ] Install Stripe CLI: `brew install stripe/stripe-cli/stripe`
- [ ] Login: `stripe login`
- [ ] Forward webhooks: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
- [ ] Copy webhook secret to `.env`: `STRIPE_WEBHOOK_SECRET=whsec_...`
- [ ] Test payment with card `4242 4242 4242 4242`
- [ ] Verify purchase saved to database
- [ ] Verify Welcome Kit email received
- [ ] Test bulk order (10 packs): verify invoice email
- [ ] Test webhook idempotency: trigger same event twice
- [ ] Test email failure handling

### Production Testing
- [ ] Add webhook endpoint in Stripe Dashboard
- [ ] Update production `STRIPE_WEBHOOK_SECRET`
- [ ] Test with real payment in production
- [ ] Monitor logs for webhook processing
- [ ] Verify email delivery
- [ ] Check database records

---

## Environment Variables Checklist

```bash
# Required
STRIPE_SECRET_KEY=sk_test_... # or sk_live_... for production
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_... # or pk_live_... for production
STRIPE_WEBHOOK_SECRET=whsec_... # Different for local vs production
RESEND_API_KEY=re_...
DATABASE_URL=postgresql://...

# Optional
NODE_ENV=development # or production
PORT=3000
```

---

## Quick Start Testing

```bash
# Terminal 1: Start dev server
pnpm dev

# Terminal 2: Forward webhooks
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Terminal 3: Trigger test payment
stripe trigger checkout.session.completed

# Or test via UI with test card:
# Card: 4242 4242 4242 4242
# Expiry: 12/34 (any future date)
# CVC: 123 (any 3 digits)
```

---

## Implementation Order

1. ✅ **Webhook endpoint** (DONE)
2. 🔴 **Idempotency check** (30 min) - Prevent duplicate processing
3. 🔴 **Database transaction** (45 min) - Ensure consistency
4. 🔴 **Populate missing fields** (15 min) - Complete database records
5. 🟡 **Fix invoice currency** (10 min) - Use ₪ instead of ฿
6. 🟡 **Hebrew invoice** (60 min) - Add bilingual support
7. 🟡 **Email retry** (2 hours) - Queue failed emails
8. 🟡 **API version** (5 min) - Update to stable version

**Total estimated time for HIGH + MEDIUM priorities: ~4 hours**
