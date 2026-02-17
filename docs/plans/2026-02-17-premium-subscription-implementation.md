# Premium Subscription Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement a real Stripe-powered subscription system with soft paywall content gating, monthly (₪29) and annual (₪199) plans.

**Architecture:** Stripe Checkout (mode: subscription) for payment, Stripe Customer Portal for management, webhook-driven subscription state in existing `subscriptions` table, soft paywall on premium articles (200-word preview + blur + CTA). All endpoints build on existing tRPC + Drizzle ORM stack.

**Tech Stack:** Stripe API (subscriptions + Customer Portal), tRPC 11, Drizzle ORM, React 19, Wouter, TailwindCSS v4

---

### Task 1: Add Premium Product Definitions

**Files:**
- Modify: `shared/products.ts`

**Context:** This file currently defines `SMART_TOURIST_PACK` (₪20 one-time) and `BULK_PRICING`. We need to add subscription product definitions that both frontend and backend can reference.

**Step 1: Add subscription product constants**

Add after the existing `PRODUCTS` object in `shared/products.ts`:

```typescript
export const SUBSCRIPTION_PLANS = {
  MONTHLY: {
    name: "Thailand Hayom Premium",
    description: "Monthly premium subscription — exclusive articles, guides, and insider tips",
    price: 29,
    currency: "ils",
    interval: "month" as const,
    priceInAgorot: 2900,
  },
  ANNUAL: {
    name: "Thailand Hayom Premium (Annual)",
    description: "Annual premium subscription — save 41% compared to monthly",
    price: 199,
    currency: "ils",
    interval: "year" as const,
    priceInAgorot: 19900,
    savingsPercent: 41,
    monthlyEquivalent: 17,
  },
} as const;

export type SubscriptionPlan = keyof typeof SUBSCRIPTION_PLANS;
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | grep -v newsletterRouter`
Expected: No new errors

**Step 3: Commit**

```bash
git add shared/products.ts
git commit -m "feat: add premium subscription plan definitions"
```

---

### Task 2: Add Subscription Checkout & Portal Endpoints

**Files:**
- Modify: `server/stripeRouter.ts`

**Context:** The existing `stripeRouter` has `createCheckoutSession` (one-time payments) and `verifyPayment`. We add 3 new endpoints: `createSubscriptionCheckout`, `createCustomerPortalSession`, and `getSubscriptionStatus`.

The router is at `server/stripeRouter.ts`. It imports from `"./_core/trpc"` for `publicProcedure`, `protectedProcedure`, and `router`. It uses a local `getStripe()` helper. Auth is via Manus OAuth — `protectedProcedure` ensures `ctx.user` exists.

The `subscriptions` table in `drizzle/schema.ts` has: `id`, `userId`, `subscriberId`, `tier`, `status`, `stripeSubscriptionId`, `stripeCustomerId`, `currentPeriodStart`, `currentPeriodEnd`, `canceledAt`, `createdAt`, `updatedAt`.

**Step 1: Add imports and new endpoints**

At the top of `server/stripeRouter.ts`, add the import:
```typescript
import { SUBSCRIPTION_PLANS } from "@shared/products";
import { getDb } from "./db";
import { subscriptions } from "../drizzle/schema";
import { eq, and } from "drizzle-orm";
```

Then add these 3 endpoints inside the existing `router({})` call, after `verifyPayment`:

```typescript
  // Create subscription checkout session
  createSubscriptionCheckout: protectedProcedure
    .input(
      z.object({
        plan: z.enum(["MONTHLY", "ANNUAL"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const planConfig = SUBSCRIPTION_PLANS[input.plan];
      const origin = ctx.req.headers.origin || "http://localhost:3000";
      const stripe = getStripe();

      // Find or create Stripe customer
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      let stripeCustomerId: string | undefined;

      // Check if user already has a subscription record with a Stripe customer ID
      const existing = await db
        .select({ stripeCustomerId: subscriptions.stripeCustomerId })
        .from(subscriptions)
        .where(eq(subscriptions.userId, ctx.user.id))
        .limit(1);

      if (existing.length > 0 && existing[0].stripeCustomerId) {
        stripeCustomerId = existing[0].stripeCustomerId;
      }

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer: stripeCustomerId,
        customer_email: stripeCustomerId ? undefined : (ctx.user.email || undefined),
        line_items: [
          {
            price_data: {
              currency: planConfig.currency,
              product_data: {
                name: planConfig.name,
                description: planConfig.description,
              },
              unit_amount: planConfig.priceInAgorot,
              recurring: {
                interval: planConfig.interval,
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          user_id: ctx.user.id.toString(),
          plan: input.plan,
        },
        success_url: `${origin}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/#pricing`,
        allow_promotion_codes: true,
      });

      return {
        sessionId: session.id,
        url: session.url || "",
      };
    }),

  // Create Stripe Customer Portal session for subscription management
  createCustomerPortalSession: protectedProcedure
    .mutation(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

      const sub = await db
        .select({ stripeCustomerId: subscriptions.stripeCustomerId })
        .from(subscriptions)
        .where(
          and(
            eq(subscriptions.userId, ctx.user.id),
            eq(subscriptions.status, "active")
          )
        )
        .limit(1);

      if (sub.length === 0 || !sub[0].stripeCustomerId) {
        throw new TRPCError({ code: "NOT_FOUND", message: "No active subscription found" });
      }

      const origin = ctx.req.headers.origin || "http://localhost:3000";
      const stripe = getStripe();

      const portalSession = await stripe.billingPortal.sessions.create({
        customer: sub[0].stripeCustomerId,
        return_url: `${origin}/profile`,
      });

      return { url: portalSession.url };
    }),

  // Get current user's subscription status
  getSubscriptionStatus: protectedProcedure
    .query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return { tier: "free" as const, status: null, currentPeriodEnd: null };

      const sub = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, ctx.user.id))
        .limit(1);

      if (sub.length === 0) {
        return { tier: "free" as const, status: null, currentPeriodEnd: null };
      }

      return {
        tier: sub[0].tier,
        status: sub[0].status,
        currentPeriodEnd: sub[0].currentPeriodEnd,
      };
    }),
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | grep -v newsletterRouter`
Expected: No new errors

**Step 3: Commit**

```bash
git add server/stripeRouter.ts
git commit -m "feat: add subscription checkout, portal, and status endpoints"
```

---

### Task 3: Handle Subscription Webhook Events

**Files:**
- Modify: `server/webhookHandler.ts`

**Context:** The existing webhook handler at `server/webhookHandler.ts` handles `checkout.session.completed` and `payment_intent.succeeded`. It imports `getDb`, `purchases`, and email/PDF generators. We need to add subscription lifecycle event handlers.

The webhook is registered in `server/_core/index.ts` at `/api/stripe/webhook` with `express.raw()` before `express.json()`. Stripe signature verification uses `STRIPE_WEBHOOK_SECRET` env var.

**Step 1: Add subscription imports and event handlers**

Add import at the top:
```typescript
import { subscriptions } from "../drizzle/schema";
import { eq } from "drizzle-orm";
```

Add new cases in the `switch (event.type)` block, before the `default:` case:

```typescript
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionChange(subscription);
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionDeleted(subscription);
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      if (invoice.subscription) {
        await handlePaymentFailed(invoice.subscription as string);
      }
      break;
    }
```

Add the handler functions after `handleSuccessfulPayment`:

```typescript
async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const db = await getDb();
  if (!db) {
    console.error("Database not available for subscription update");
    return;
  }

  const userId = subscription.metadata?.user_id;
  if (!userId) {
    console.error("No user_id in subscription metadata");
    return;
  }

  const status = subscription.status === "active" ? "active" as const
    : subscription.status === "past_due" ? "past_due" as const
    : subscription.status === "canceled" ? "canceled" as const
    : "expired" as const;

  const tier = status === "active" ? "premium" as const : "free" as const;

  // Upsert subscription record
  const existing = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, parseInt(userId)))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(subscriptions)
      .set({
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        tier,
        status,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.userId, parseInt(userId)));
  } else {
    await db.insert(subscriptions).values({
      userId: parseInt(userId),
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer as string,
      tier,
      status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    });
  }

  console.log(`Subscription ${subscription.id} updated: status=${status}, tier=${tier}`);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const db = await getDb();
  if (!db) return;

  const userId = subscription.metadata?.user_id;
  if (!userId) return;

  await db
    .update(subscriptions)
    .set({
      status: "canceled",
      tier: "free",
      canceledAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.userId, parseInt(userId)));

  console.log(`Subscription ${subscription.id} canceled for user ${userId}`);
}

async function handlePaymentFailed(subscriptionId: string) {
  const db = await getDb();
  if (!db) return;

  await db
    .update(subscriptions)
    .set({
      status: "past_due",
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.stripeSubscriptionId, subscriptionId));

  console.log(`Payment failed for subscription ${subscriptionId}`);
}
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | grep -v newsletterRouter`
Expected: No new errors

**Step 3: Commit**

```bash
git add server/webhookHandler.ts
git commit -m "feat: handle subscription lifecycle webhook events"
```

---

### Task 4: Gate Premium Article Content

**Files:**
- Modify: `server/articleRouter.ts`

**Context:** The existing `getBySlug` endpoint at `server/articleRouter.ts:95-130` returns the full article to everyone. We need to check subscription status and truncate content for non-premium users viewing premium articles.

The endpoint is a `publicProcedure` (no auth required). We need to optionally check `ctx.user` — if the user is logged in, look up their subscription; if not, they're definitely not premium.

**Step 1: Add subscription import**

Add to imports at top of `server/articleRouter.ts`:
```typescript
import { subscriptions } from "../drizzle/schema";
```

**Step 2: Modify `getBySlug` to gate premium content**

Replace the return statement in `getBySlug` (the block starting with `// Get author info`) with:

```typescript
      // Get author info
      const author = await db
        .select({ id: users.id, name: users.name })
        .from(users)
        .where(eq(users.id, article[0].authorId))
        .limit(1);

      // Check if user has premium access
      let isPremiumUser = false;
      if (ctx.user) {
        const sub = await db
          .select({ tier: subscriptions.tier, status: subscriptions.status })
          .from(subscriptions)
          .where(and(
            eq(subscriptions.userId, ctx.user.id),
            eq(subscriptions.status, "active")
          ))
          .limit(1);
        isPremiumUser = sub.length > 0 && sub[0].tier === "premium";
      }

      // Gate premium content for non-premium users
      const articleData = article[0];
      if (articleData.isPremium && !isPremiumUser) {
        // Truncate content to ~200 words
        const truncate = (text: string) => {
          const words = text.split(/\s+/);
          if (words.length <= 200) return text;
          return words.slice(0, 200).join(" ") + "...";
        };

        return {
          ...articleData,
          content: truncate(articleData.content),
          contentHe: truncate(articleData.contentHe),
          gated: true,
          author: author[0] || null,
        };
      }

      return {
        ...articleData,
        gated: false,
        author: author[0] || null,
      };
```

Note: The `ctx` already has `user: User | null` from the context creator. `publicProcedure` still populates `ctx.user` if authenticated — it just doesn't throw if not. So we can use `ctx.user` here.

**Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | grep -v newsletterRouter`
Expected: No new errors

**Step 4: Commit**

```bash
git add server/articleRouter.ts
git commit -m "feat: gate premium article content with 200-word truncation"
```

---

### Task 5: Create PremiumPaywall Component

**Files:**
- Create: `client/src/components/PremiumPaywall.tsx`

**Context:** This component renders a blur overlay with upgrade CTA when an article is gated. It will be used in `ArticleDetail.tsx`. The app uses `useLanguage()` for bilingual text, `trpc` for API calls, Wouter for navigation, Tailwind for styling, and Lucide icons.

**Step 1: Create the component**

Create `client/src/components/PremiumPaywall.tsx`:

```tsx
import { Button } from "@/components/ui/button";
import { Crown, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function PremiumPaywall() {
  const { t } = useLanguage();

  const subscriptionCheckout = trpc.stripe.createSubscriptionCheckout.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      if (error.message.includes("UNAUTHORIZED")) {
        toast.error(t({ he: "יש להתחבר כדי להירשם לפרימיום", en: "Please log in to subscribe to Premium" }));
      } else {
        toast.error(t({ he: "שגיאה ביצירת מנוי", en: "Error creating subscription" }));
      }
    },
  });

  return (
    <div className="relative mt-8">
      {/* Gradient blur overlay */}
      <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none z-10" />

      {/* CTA Card */}
      <div className="relative z-20 bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl">
        <Crown className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          {t({ he: "תוכן פרימיום", en: "Premium Content" })}
        </h3>
        <p className="text-white/90 mb-8 max-w-lg mx-auto text-lg">
          {t({
            he: "שדרג לפרימיום כדי לקרוא את המאמר המלא ולקבל גישה לכל התכנים הבלעדיים",
            en: "Upgrade to Premium to read the full article and access all exclusive content",
          })}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => subscriptionCheckout.mutate({ plan: "MONTHLY" })}
            disabled={subscriptionCheckout.isPending}
            className="px-8 py-6 text-lg bg-white text-blue-600 hover:bg-gray-100 font-bold rounded-xl shadow-lg"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            {t({ he: "₪29/חודש", en: "₪29/month" })}
          </Button>

          <Button
            onClick={() => subscriptionCheckout.mutate({ plan: "ANNUAL" })}
            disabled={subscriptionCheckout.isPending}
            variant="outline"
            className="px-8 py-6 text-lg border-2 border-white text-white hover:bg-white/10 font-bold rounded-xl"
          >
            {t({ he: "₪199/שנה (חסוך 41%)", en: "₪199/year (Save 41%)" })}
          </Button>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | grep -v newsletterRouter`
Expected: No new errors

**Step 3: Commit**

```bash
git add client/src/components/PremiumPaywall.tsx
git commit -m "feat: add PremiumPaywall soft paywall component"
```

---

### Task 6: Integrate Paywall into ArticleDetail

**Files:**
- Modify: `client/src/pages/ArticleDetail.tsx`

**Context:** The current `ArticleDetail.tsx` uses hardcoded sample data in `articlesData` (only 1 article). It does NOT fetch from the database. We need to:
1. Rewrite it to fetch from the `article.getBySlug` tRPC endpoint (which now returns `gated: boolean`)
2. Show `PremiumPaywall` when `gated === true`

The page uses Wouter's `useRoute` to get the slug param, and `useLanguage()` for bilingual content. The article content is rendered via `dangerouslySetInnerHTML` with basic markdown-to-HTML conversion.

**Step 1: Rewrite ArticleDetail to use tRPC + paywall**

Replace the entire contents of `client/src/pages/ArticleDetail.tsx` with:

```tsx
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, Tag, Clock, ArrowLeft, Crown, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { trpc } from "@/lib/trpc";
import PremiumPaywall from "@/components/PremiumPaywall";
import { getCategoryByArticleCategory } from "@/data/categories";

export default function ArticleDetail() {
  const [, params] = useRoute("/articles/:slug");
  const { language, t } = useLanguage();
  const slug = params?.slug || "";

  const { data: article, isLoading, error } = trpc.article.getBySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  // Set page title for SEO
  useEffect(() => {
    if (article) {
      const title = language === "he" ? article.titleHe : article.title;
      document.title = `${title} | Thailand Hayom`;
    }
  }, [article, language]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-16">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {t({ he: "המאמר לא נמצא", en: "Article Not Found" })}
          </h1>
          <Link href="/articles">
            <Button>{t({ he: "חזרה למאמרים", en: "Back to Articles" })}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const title = language === "he" ? article.titleHe : article.title;
  const content = language === "he" ? article.contentHe : article.content;
  const excerpt = language === "he" ? (article.excerptHe || article.excerpt) : article.excerpt;
  const category = getCategoryByArticleCategory(article.category);

  return (
    <div className="min-h-screen bg-white pt-16">
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Button */}
        <Link href="/articles">
          <Button variant="ghost" className="mb-8 hover:bg-gray-100">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t({ he: "חזרה למאמרים", en: "Back to Articles" })}
          </Button>
        </Link>

        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-5 h-5 text-blue-500" />
          <span className="text-lg font-semibold text-blue-600">
            {category
              ? (language === "he" ? category.nameHe : category.nameEn)
              : article.category}
          </span>
          {article.isPremium && (
            <div className="ml-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
              <Crown className="w-4 h-4" />
              {t({ he: "פרימיום", en: "Premium" })}
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
          {title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
          {article.publishedAt && (
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>
                {new Date(article.publishedAt).toLocaleDateString(
                  language === "he" ? "he-IL" : "en-US",
                  { year: "numeric", month: "long", day: "numeric" }
                )}
              </span>
            </div>
          )}
          {article.views !== null && (
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>
                {article.views} {t({ he: "צפיות", en: "views" })}
              </span>
            </div>
          )}
        </div>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-xl text-gray-600 mb-8 italic leading-relaxed">
            {excerpt}
          </p>
        )}

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
            prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:border-b prose-h2:pb-2
            prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
            prose-strong:text-gray-900 prose-strong:font-bold
            prose-ul:my-6 prose-li:my-2
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{
            __html: content
              .replace(/\n/g, "<br />")
              .replace(/^# (.*$)/gim, "<h1>$1</h1>")
              .replace(/^## (.*$)/gim, "<h2>$1</h2>")
              .replace(/^### (.*$)/gim, "<h3>$1</h3>")
              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
          }}
        />

        {/* Premium Paywall (shown when content is gated) */}
        {article.gated && <PremiumPaywall />}
      </article>

      {/* CTA Section — only show for non-gated articles */}
      {!article.gated && (
        <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-500 to-teal-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t({ he: "אהבת את המאמר?", en: "Enjoyed This Article?" })}
              </h2>
              <p className="text-xl mb-10 opacity-90">
                {t({
                  he: "הצטרף לניוזלטר שלנו וקבל מאמרים חדשים ישירות למייל",
                  en: "Join our newsletter and get new articles directly to your inbox",
                })}
              </p>
              <Link href="/#newsletter">
                <Button
                  size="lg"
                  className="px-12 py-7 text-xl bg-white text-blue-600 hover:bg-gray-50 font-bold rounded-xl shadow-2xl"
                >
                  {t({ he: "הצטרף לניוזלטר", en: "Join Newsletter" })}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | grep -v newsletterRouter`
Expected: No new errors (the `gated` field will be inferred from the tRPC return type)

**Step 3: Commit**

```bash
git add client/src/pages/ArticleDetail.tsx
git commit -m "feat: rewrite ArticleDetail with tRPC fetch and premium paywall"
```

---

### Task 7: Create SubscriptionSuccess Page + Route

**Files:**
- Create: `client/src/pages/SubscriptionSuccess.tsx`
- Modify: `client/src/App.tsx`

**Context:** After Stripe Checkout, users are redirected to `/subscription-success?session_id=...`. This page confirms their subscription is active.

Routes are defined in `client/src/App.tsx` inside a `<Switch>` from Wouter. Each route wraps its component in `<AnimatedRoute>`. The `AnimatedPage` component provides enter/exit animations.

**Step 1: Create the success page**

Create `client/src/pages/SubscriptionSuccess.tsx`:

```tsx
import { Button } from "@/components/ui/button";
import { Crown, ArrowRight, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";

export default function SubscriptionSuccess() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-16">
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        {/* Success icon */}
        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-teal-500">
          <Crown className="w-10 h-10 text-yellow-400" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          {t({ he: "ברוכים הבאים לפרימיום!", en: "Welcome to Premium!" })}
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
          {t({
            he: "המנוי שלך פעיל. עכשיו יש לך גישה לכל התכנים הבלעדיים",
            en: "Your subscription is active. You now have access to all exclusive content",
          })}
        </p>

        {/* Benefits list */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 text-left max-w-md mx-auto">
          {[
            t({ he: "מאמרים בלעדיים", en: "Exclusive articles" }),
            t({ he: "מדריכים מפורטים", en: "Detailed guides" }),
            t({ he: "טיפים פנימיים", en: "Insider tips" }),
            t({ he: "הנחות במסעדות ומלונות", en: "Restaurant & hotel discounts" }),
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-3 border-b last:border-0">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href="/articles?premium=true">
          <Button
            size="lg"
            className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold rounded-xl shadow-lg"
          >
            {t({ he: "צפה בתוכן פרימיום", en: "Browse Premium Content" })}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
```

**Step 2: Add route to App.tsx**

In `client/src/App.tsx`, add the import at the top with the other page imports:

```typescript
import SubscriptionSuccess from "./pages/SubscriptionSuccess";
```

Add the route inside the `<Switch>`, after the `/payment-success` route:

```tsx
      <Route path="/subscription-success">
        <AnimatedRoute component={SubscriptionSuccess} />
      </Route>
```

**Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | grep -v newsletterRouter`
Expected: No new errors

**Step 4: Commit**

```bash
git add client/src/pages/SubscriptionSuccess.tsx client/src/App.tsx
git commit -m "feat: add subscription success page and route"
```

---

### Task 8: Update Homepage Pricing Cards

**Files:**
- Modify: `client/src/pages/Home.tsx`

**Context:** The homepage at `client/src/pages/Home.tsx` has pricing cards in Section 5 (around line 208-310). Currently shows ₪0/month (Free) and ₪49/month (Premium) with a non-functional "Upgrade to Premium" button. We need to:
1. Update price from ₪49 to ₪29
2. Add annual option
3. Wire "Upgrade" buttons to `createSubscriptionCheckout` mutation
4. Show "Manage Subscription" if user is already premium

The file already imports `trpc`, `toast`, `Crown`, `Sparkles`, `Button` — all needed.

**Step 1: Add subscription hooks**

Near the top of the `Home` component function (after the existing `subscribeMutation`), add:

```typescript
  // Subscription
  const { data: user } = trpc.auth.me.useQuery();
  const { data: subStatus } = trpc.stripe.getSubscriptionStatus.useQuery(undefined, {
    enabled: !!user,
  });
  const isPremium = subStatus?.tier === "premium";

  const subscriptionCheckout = trpc.stripe.createSubscriptionCheckout.useMutation({
    onSuccess: (data) => {
      if (data.url) window.location.href = data.url;
    },
    onError: (error) => {
      if (error.message.includes("UNAUTHORIZED")) {
        toast.error(t({ he: "יש להתחבר כדי להירשם", en: "Please log in to subscribe" }));
      } else {
        toast.error(t({ he: "שגיאה", en: "Error creating subscription" }));
      }
    },
  });

  const portalSession = trpc.stripe.createCustomerPortalSession.useMutation({
    onSuccess: (data) => {
      if (data.url) window.location.href = data.url;
    },
    onError: () => {
      toast.error(t({ he: "שגיאה", en: "Error opening portal" }));
    },
  });
```

**Step 2: Replace the pricing cards section**

Replace the entire `{/* --- Pricing cards --- */}` block (from the `<ScrollReveal>` containing the grid with Free and Premium cards) with:

```tsx
          <ScrollReveal>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {t({ he: "חינם", en: "Free" })}
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-white">₪0</span>
                  <span className="text-gray-400">
                    {t({ he: "/חודש", en: "/month" })}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    t({ he: "ניוזלטר שבועי עם טיפים כלליים", en: "Weekly newsletter with general tips" }),
                    t({ he: "גישה למאמרים ותוכן", en: "Access to articles & content" }),
                    t({ he: "לוח אירועים בסיסי", en: "Basic event calendar" }),
                    t({ he: "שיעורי תאילנדית חינם", en: "Free Thai language lessons" }),
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full py-5 text-base border-white/20 text-white hover:bg-white/10 rounded-xl"
                >
                  {t({ he: "התוכנית הנוכחית", en: "Current Plan" })}
                </Button>
              </div>

              {/* Monthly Premium card */}
              <div className="bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5" />
                  {t({ he: "מומלץ", en: "Popular" })}
                </div>

                <h3 className="text-2xl font-bold mb-2 text-white">
                  {t({ he: "פרימיום", en: "Premium" })}
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-white">₪29</span>
                  <span className="text-white/80">
                    {t({ he: "/חודש", en: "/month" })}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    t({ he: "כל מה שיש בחינם +", en: "Everything in Free +" }),
                    t({ he: "מאמרים בלעדיים ומדריכים מפורטים", en: "Exclusive articles & detailed guides" }),
                    t({ he: "הנחות במסעדות ומלונות", en: "Restaurant & hotel discounts" }),
                    t({ he: "גישה למקומות נסתרים וטיפים פנימיים", en: "Hidden gems & insider tips" }),
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${i === 0 ? "text-yellow-400" : "text-white"}`} />
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
                {isPremium ? (
                  <Button
                    onClick={() => portalSession.mutate()}
                    className="w-full py-5 text-base bg-white text-blue-600 hover:bg-gray-100 font-bold rounded-xl shadow-lg"
                  >
                    {t({ he: "נהל מנוי", en: "Manage Subscription" })}
                  </Button>
                ) : (
                  <Button
                    onClick={() => subscriptionCheckout.mutate({ plan: "MONTHLY" })}
                    disabled={subscriptionCheckout.isPending}
                    className="w-full py-5 text-base bg-white text-blue-600 hover:bg-gray-100 font-bold rounded-xl shadow-lg"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    {subscriptionCheckout.isPending
                      ? t({ he: "טוען...", en: "Loading..." })
                      : t({ he: "שדרג לפרימיום", en: "Upgrade to Premium" })}
                  </Button>
                )}
              </div>

              {/* Annual Premium card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-green-400 text-green-900 px-4 py-1.5 rounded-full text-xs font-bold">
                  {t({ he: "חסוך 41%", en: "Save 41%" })}
                </div>

                <h3 className="text-2xl font-bold mb-2 text-white">
                  {t({ he: "שנתי", en: "Annual" })}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">₪199</span>
                  <span className="text-gray-400">
                    {t({ he: "/שנה", en: "/year" })}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-6">
                  {t({ he: "₪17/חודש בלבד", en: "Only ₪17/month" })}
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    t({ he: "הכל בתוכנית הפרימיום", en: "Everything in Premium" }),
                    t({ he: "חיסכון של 41% לעומת חודשי", en: "41% savings vs. monthly" }),
                    t({ he: "תשלום אחד לשנה שלמה", en: "One payment for the full year" }),
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                {isPremium ? (
                  <Button
                    onClick={() => portalSession.mutate()}
                    variant="outline"
                    className="w-full py-5 text-base border-white/20 text-white hover:bg-white/10 rounded-xl"
                  >
                    {t({ he: "נהל מנוי", en: "Manage Subscription" })}
                  </Button>
                ) : (
                  <Button
                    onClick={() => subscriptionCheckout.mutate({ plan: "ANNUAL" })}
                    disabled={subscriptionCheckout.isPending}
                    variant="outline"
                    className="w-full py-5 text-base border-white/20 text-white hover:bg-white/10 font-bold rounded-xl"
                  >
                    {subscriptionCheckout.isPending
                      ? t({ he: "טוען...", en: "Loading..." })
                      : t({ he: "שדרג לשנתי", en: "Get Annual Plan" })}
                  </Button>
                )}
              </div>
            </div>
          </ScrollReveal>
```

**Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | grep -v newsletterRouter`
Expected: No new errors

**Step 4: Commit**

```bash
git add client/src/pages/Home.tsx
git commit -m "feat: update pricing cards with subscription checkout integration"
```

---

### Task 9: QA — Build Check & Manual Verification

**Files:** None (read-only verification)

**Step 1: Run TypeScript check**

Run: `npx tsc --noEmit 2>&1 | grep -v newsletterRouter`
Expected: No new errors

**Step 2: Run build**

Run: `pnpm build`
Expected: Build succeeds with no errors

**Step 3: Manual verification checklist**

Start dev server: `source .env && export DATABASE_URL JWT_SECRET NODE_ENV && pnpm dev`

Verify:
- [ ] Homepage loads, pricing section shows 3 cards (Free / ₪29 Monthly / ₪199 Annual)
- [ ] "Upgrade to Premium" button calls API (will fail without Stripe key — expected)
- [ ] Articles page shows articles with premium badges
- [ ] Clicking a premium article shows truncated content + paywall (needs a premium article in DB)
- [ ] `/subscription-success` page renders correctly
- [ ] Non-premium articles show full content without paywall

**Step 4: Commit any fixes if needed**

```bash
git add -A
git commit -m "fix: QA fixes for premium subscription"
```

**Step 5: Push to GitHub**

```bash
git push origin main
```
