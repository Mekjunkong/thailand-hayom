# Newsletter Subscriber Tiers Reference

This document explains the subscriber tier system for Thailand Hayom newsletters.

## Tier System Overview

Thailand Hayom has a two-tier subscription model:

1. **Free Tier** - Basic content and updates
2. **Premium Tier** - Premium content + all free content (₪49/month)

## Database Schema

### newsletterSubscribers Table

```typescript
{
  id: number
  email: string  // Unique
  tier: 'free' | 'premium'
  status: 'active' | 'unsubscribed' | 'bounced'
  subscribedAt: Date
  lastEmailSent?: Date
  unsubscribedAt?: Date
  metadata?: string  // JSON
}
```

### Key Fields

**tier**:
- `'free'` - Free tier subscriber, receives basic content
- `'premium'` - Premium subscriber, receives all content including premium articles/events

**status**:
- `'active'` - Receives newsletters
- `'unsubscribed'` - User unsubscribed, do not send
- `'bounced'` - Email bounced, may need verification

## Sending to Specific Tiers

### Newsletter Router Options

When sending via `newsletter.sendNewsletter`:

```typescript
await trpc.newsletter.sendNewsletter.mutate({
  subject: "...",
  subjectHe: "...",
  articleIds: [1, 2, 3],
  eventIds: [4, 5],
  tier: 'all' | 'free' | 'premium',  // <-- Tier filter
});
```

### Tier Filter Options

**`tier: 'all'`** (default)
- Sends to all active subscribers (free + premium)
- Use for: General announcements, important updates, regular newsletters
- Example query:
  ```sql
  SELECT * FROM newsletterSubscribers
  WHERE status = 'active'
  ```

**`tier: 'free'`**
- Sends only to free tier subscribers
- Use for: Free-specific promotions, upgrade offers
- Example query:
  ```sql
  SELECT * FROM newsletterSubscribers
  WHERE status = 'active' AND tier = 'free'
  ```

**`tier: 'premium'`**
- Sends only to premium subscribers
- Use for: Premium-only content, exclusive updates, early access
- Example query:
  ```sql
  SELECT * FROM newsletterSubscribers
  WHERE status = 'active' AND tier = 'premium'
  ```

## Content Access by Tier

### Free Tier Access

Free subscribers have access to:
- ✅ Free articles (isPremium = false)
- ✅ Free events (isPremium = false)
- ✅ General announcements
- ❌ Premium articles (isPremium = true)
- ❌ Premium events (isPremium = true)

### Premium Tier Access

Premium subscribers have access to:
- ✅ All free content
- ✅ Premium articles (isPremium = true)
- ✅ Premium events (isPremium = true)
- ✅ Exclusive updates
- ✅ Early access to content

## Newsletter Content Strategy

### When to Send to All Tiers

Use `tier: 'all'` for:
- Weekly/monthly newsletters with mixed content
- Important visa updates or safety alerts
- Major event announcements (Songkran, festivals)
- Platform updates or new features
- Holiday greetings

**Content guidelines:**
- Include both free and premium content
- Mark premium items with badges
- Provide value to both tiers
- Include upgrade CTA for free users

### When to Send to Free Tier Only

Use `tier: 'free'` for:
- Premium upgrade promotions ("Unlock premium content!")
- Free trial offers
- Welcome series for new free subscribers
- Re-engagement campaigns

**Content guidelines:**
- Showcase premium content value
- Include testimonials from premium users
- Highlight exclusive benefits
- Clear upgrade path with pricing

### When to Send to Premium Tier Only

Use `tier: 'premium'` for:
- Exclusive premium content releases
- Early access to events or guides
- Premium subscriber perks
- "Thank you" messages with special offers

**Content guidelines:**
- Emphasize exclusivity
- Provide exceptional value
- Show appreciation for subscription
- Offer premium-only discounts

## Tier Migration

### Free to Premium Upgrade

When a user upgrades from free to premium:

```typescript
// Via Stripe webhook after successful payment
await db
  .update(newsletterSubscribers)
  .set({ tier: 'premium' })
  .where(eq(newsletterSubscribers.email, customerEmail));
```

**Automatic triggers:**
- Stripe subscription created
- One-time premium payment processed
- Manual admin upgrade

### Premium to Free Downgrade

When a premium subscription ends or is cancelled:

```typescript
// Via Stripe webhook after subscription cancelled
await db
  .update(newsletterSubscribers)
  .set({ tier: 'free' })
  .where(eq(newsletterSubscribers.email, customerEmail));
```

**Automatic triggers:**
- Stripe subscription cancelled
- Subscription payment failed (after grace period)
- Manual admin downgrade

## Subscriber Statistics

### Query Subscriber Counts

```typescript
// Total active subscribers
const totalActive = await db
  .select({ count: sql`count(*)` })
  .from(newsletterSubscribers)
  .where(eq(newsletterSubscribers.status, 'active'));

// Free tier count
const freeCount = await db
  .select({ count: sql`count(*)` })
  .from(newsletterSubscribers)
  .where(
    and(
      eq(newsletterSubscribers.status, 'active'),
      eq(newsletterSubscribers.tier, 'free')
    )
  );

// Premium tier count
const premiumCount = await db
  .select({ count: sql`count(*)` })
  .from(newsletterSubscribers)
  .where(
    and(
      eq(newsletterSubscribers.status, 'active'),
      eq(newsletterSubscribers.tier, 'premium')
    )
  );
```

### Typical Distribution

Expected subscriber distribution:
- **Free**: 80-90% of total subscribers
- **Premium**: 10-20% of total subscribers
- **Conversion rate**: 5-15% free → premium

## Best Practices

### Content Segmentation

**Do:**
- ✅ Send mixed content to 'all' regularly
- ✅ Occasionally send premium-only exclusives
- ✅ Test subject lines by tier
- ✅ Personalize content based on tier
- ✅ Track open rates by tier

**Don't:**
- ❌ Send only premium content to 'all'
- ❌ Spam free users with upgrade offers
- ❌ Neglect free tier subscribers
- ❌ Send identical content to both tiers

### Upgrade Conversion

To improve free → premium conversion:

1. **Show value**: Include 1 premium article preview in 'all' newsletters
2. **Exclusivity**: Send premium-only newsletters occasionally
3. **Social proof**: Feature testimonials in newsletters
4. **Time-limited offers**: Early bird pricing, seasonal discounts
5. **Content teasers**: "Premium subscribers get full access..."

### Retention Strategies

**Free tier retention:**
- Consistent value in every newsletter
- Responsive to feedback
- Clear unsubscribe option
- Quality over quantity

**Premium tier retention:**
- Deliver on premium promises
- Exclusive content regularly
- Responsive support
- Special perks and discounts

## Email Frequency Guidelines

### Recommended Frequency

**All tiers:**
- Weekly newsletter: Thursday or Friday
- Monthly digest: First week of month
- Event alerts: As needed (max 1/week)
- Important updates: As needed (rare)

**Free tier specific:**
- Upgrade offers: Max 1/month
- Welcome series: Day 0, 3, 7, 14, 30

**Premium tier specific:**
- Exclusive updates: 2-4/month
- Early access: Before public release

### Avoid Over-sending

**Warning signs:**
- Unsubscribe rate > 2% per send
- Open rate < 15%
- Multiple bounces per send
- Complaints or spam reports

**Remedies:**
- Reduce frequency
- Improve content quality
- Better subject lines
- Clean subscriber list

## Integration with Subscriptions

### Syncing with Stripe

The newsletter tier should always match the Stripe subscription status:

```typescript
// When subscription created
webhookHandler → set tier = 'premium'

// When subscription cancelled
webhookHandler → set tier = 'free'

// When payment fails
webhookHandler → wait grace period → set tier = 'free'
```

### Database Consistency

Regular sync check (run daily via cron):

```typescript
// Find subscribers with active Stripe subscription but free tier
const mismatched = await db
  .select()
  .from(newsletterSubscribers)
  .innerJoin(subscriptions, ...)
  .where(
    and(
      eq(newsletterSubscribers.tier, 'free'),
      eq(subscriptions.status, 'active')
    )
  );

// Update to premium
for (const sub of mismatched) {
  await db
    .update(newsletterSubscribers)
    .set({ tier: 'premium' })
    .where(eq(newsletterSubscribers.id, sub.id));
}
```

## Testing Tier Filters

### Test Newsletter Sends

Before mass sending, test with known subscribers:

```bash
# Test free tier
tsx send-test-newsletter.ts --tier free --test-email your@email.com

# Test premium tier
tsx send-test-newsletter.ts --tier premium --test-email your@email.com

# Test all tiers
tsx send-test-newsletter.ts --tier all --test-email your@email.com
```

Verify:
- [ ] Correct tier receives email
- [ ] Content appropriate for tier
- [ ] Premium badges display correctly
- [ ] Upgrade CTAs appear for free tier
- [ ] No upgrade CTAs for premium tier

## Summary

| Tier | Count | Access | Send Frequency | Best Use |
|------|-------|--------|----------------|----------|
| Free | 80-90% | Free content only | Weekly | General updates |
| Premium | 10-20% | All content | 2-4x/month extra | Exclusive content |
| All | 100% | Mixed | Weekly | Regular newsletters |

Choose tier based on content type and audience. Default to 'all' for general newsletters, 'premium' for exclusives, 'free' for upgrades.
