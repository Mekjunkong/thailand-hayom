# Premium Subscription Design

## Goal

Implement a real Stripe-powered subscription system for Thailand Hayom. Users can subscribe to Premium (₪29/month or ₪199/year) to unlock gated content, with a soft paywall for non-subscribers and Stripe Customer Portal for self-service management.

## Decisions

- **Pricing:** ₪29/month, ₪199/year (41% savings)
- **Content gating:** Soft paywall — show 200-word preview + blur overlay + upgrade CTA
- **Auth:** Build on existing Manus OAuth (users must be logged in to subscribe)
- **Checkout:** Stripe-hosted Checkout (mode: subscription), not embedded Elements
- **Management:** Stripe Customer Portal for cancel/update/invoices

## Architecture

### Stripe Products

| Product | Amount | Interval | Currency |
|---------|--------|----------|----------|
| Thailand Hayom Premium (Monthly) | ₪29 (2900 agorot) | month | ILS |
| Thailand Hayom Premium (Annual) | ₪199 (19900 agorot) | year | ILS |

Products created via Stripe API on first use (or pre-created in dashboard). Price IDs stored in `shared/products.ts`.

### Checkout Flow

```
User clicks "Upgrade to Premium"
  → trpc.stripe.createSubscriptionCheckout({ plan: 'monthly' | 'annual' })
  → Backend creates Stripe Checkout Session (mode: 'subscription')
  → User redirected to Stripe Checkout
  → Payment completed → redirected to /subscription-success?session_id=...
  → Webhook: customer.subscription.created
  → Backend inserts into subscriptions table (status: active, tier: premium)
  → Frontend queries subscription status → UI updates
```

### New tRPC Endpoints (in stripeRouter)

- `createSubscriptionCheckout` — creates subscription Checkout Session
- `createCustomerPortalSession` — creates Stripe billing portal session
- `getSubscriptionStatus` — returns user's current tier + subscription details

### Webhook Events (in webhookHandler.ts)

| Event | Action |
|-------|--------|
| `customer.subscription.created` | Insert subscription record, set tier=premium |
| `customer.subscription.updated` | Update period dates, status |
| `customer.subscription.deleted` | Set status=canceled, tier=free |
| `invoice.payment_failed` | Set status=past_due |

### Premium Context

New middleware approach in `server/_core/trpc.ts`:
- Add `ctx.isPremium: boolean` derived from subscription lookup
- Not a hard gate — available for conditional logic in any endpoint

### Content Gating

**Article list endpoint:** Returns all articles with `isPremium` flag. No content restriction on lists.

**Article detail endpoint:** For premium articles:
- Non-premium users: return first ~200 words + `{ gated: true }`
- Premium users: return full content + `{ gated: false }`

### Soft Paywall UI (ArticleDetail.tsx)

When `gated: true`:
1. Render 200-word preview
2. Apply gradient blur overlay on last paragraph
3. Show upgrade CTA card with both pricing options
4. "Upgrade to Premium" buttons link to subscription checkout

### Subscription Management

Premium users access Stripe Customer Portal via "Manage Subscription" button. Portal handles: cancel, update payment method, view invoices, resubscribe.

### UI Changes

**Homepage pricing cards:**
- Update from ₪49 to ₪29/month
- Add annual option (₪199/year with "Save 41%" badge)
- Wire buttons to createSubscriptionCheckout
- If already premium: show "Manage Subscription" instead

**Navbar:** Premium users see Crown badge next to name

**New page:** `/subscription-success` — confirmation after checkout

## Visibility Matrix

| Content | Anonymous | Free User | Premium User |
|---------|-----------|-----------|--------------|
| Free articles | Full | Full | Full |
| Premium articles (listing) | Title + badge | Title + badge | Title + badge |
| Premium articles (detail) | Preview + paywall | Preview + paywall | Full |
| Premium events | Visible | Visible | Visible |

## Database

The `subscriptions` table already exists with all needed columns:
- `userId`, `tier`, `status`, `stripeSubscriptionId`, `stripeCustomerId`
- `currentPeriodStart`, `currentPeriodEnd`, `canceledAt`

No schema changes needed.

## Files

### Create:
- `client/src/pages/SubscriptionSuccess.tsx` — post-checkout confirmation
- `client/src/components/PremiumPaywall.tsx` — soft paywall overlay component

### Modify:
- `shared/products.ts` — add PREMIUM_MONTHLY and PREMIUM_ANNUAL definitions
- `server/stripeRouter.ts` — add subscription checkout + portal endpoints
- `server/webhookHandler.ts` — handle subscription lifecycle events
- `server/_core/trpc.ts` — add isPremium context
- `server/articleRouter.ts` — gate premium article content
- `client/src/pages/Home.tsx` — update pricing cards + wire buttons
- `client/src/pages/ArticleDetail.tsx` — integrate PremiumPaywall
- `client/src/App.tsx` — add /subscription-success route

## Out of Scope

- Free trial period
- Coupon/promo codes (Stripe supports this natively, can add later)
- Premium-only Thai lessons
- Premium events with exclusive content
- Email notifications for subscription changes
- Admin dashboard for subscription management
