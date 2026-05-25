# Tourist Survival Thai Course Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign Thailand Hayom into a Hebrew-first Thai speaking course for Israeli tourists, with free account signup, sample lessons, paid course unlock, progress, and a clearer course-led public site.

**Architecture:** Keep the current React/Vite/Express/tRPC app and preserve the existing deployment fixes. Add a small course product layer on the frontend, reuse existing local email/password auth endpoints, reuse existing progress APIs, and derive paid access from existing completed purchase history. The redesign is mostly client-side: homepage, nav, auth page, course dashboard, lesson player, unlock page, and profile states.

**Tech Stack:** React 19, Vite, TypeScript, Wouter, tRPC, Express, Drizzle, Stripe Checkout, Tailwind CSS v4, shadcn/Radix UI components, Vitest.

---

## Scope Check

This plan covers one shippable product slice: turn the public site and lesson experience into a course-led funnel with login and paid unlock. It does not rebuild backend auth, rewrite the database schema, create a subscription product, or replace the full article CMS.

Existing uncommitted deployment fixes must be preserved. Do not revert or overwrite:

- `api/index.js`
- `server/vercelHandler.ts`
- `vercel.json`
- server import fixes
- package build script fixes

## File Structure

Create:

- `client/src/data/touristCourse.ts`: Product/course constants, 7-day module mapping, free lesson IDs, pricing copy, bonus copy.
- `client/src/lib/courseAccess.ts`: Pure helpers for free/paid lesson access and purchase-derived unlock state.
- `client/src/lib/courseAccess.test.ts`: Unit tests for access helpers.
- `client/src/lib/authApi.ts`: Small REST client for `/api/auth/login` and `/api/auth/register`.
- `client/src/pages/Auth.tsx`: Login/signup page for free account creation.
- `client/src/components/course/CourseHero.tsx`: Homepage hero for the speaking course.
- `client/src/components/course/PhrasePracticePreview.tsx`: Homepage sample phrase/audio-style preview.
- `client/src/components/course/CoursePath.tsx`: 7-day course path component.
- `client/src/components/course/FreePaidComparison.tsx`: Free account vs paid unlock comparison.
- `client/src/components/course/UnlockCoursePanel.tsx`: Shared unlock CTA panel for dashboard/profile/lesson lock.
- `client/src/components/course/LockedLessonCard.tsx`: Lesson card state for locked paid lessons.

Modify:

- `vitest.config.ts`: Include pure client unit tests.
- `shared/products.ts`: Rename one-time product from Smart Tourist Pack to Tourist Survival Thai Course and set launch pricing.
- `server/stripeRouter.ts`: Keep checkout flow but ensure single product metadata names course access.
- `server/stripe-currency.test.ts`: Replace hardcoded `/home/ubuntu` paths with repo-relative paths and assert the course product stays ILS.
- `client/src/const.ts`: Make `getLoginUrl()` return `/login` when OAuth config is absent.
- `client/src/App.tsx`: Add `/login` route.
- `client/src/components/Navbar.tsx`: Course-first nav with auth-aware CTA.
- `client/src/pages/Home.tsx`: Replace broad travel homepage with course funnel.
- `client/src/pages/InteractiveLessons.tsx`: Use course access helper, purchase history, locked lessons, and clear dashboard states.
- `client/src/components/LessonBrowser.tsx`: Render the 7-day course path and locked/free/completed states.
- `client/src/components/FlashcardPlayer.tsx`: Polish lesson experience and route locked users back to unlock CTA when needed.
- `client/src/pages/WelcomeKit.tsx`: Reframe as course unlock page with bonuses.
- `client/src/pages/Profile.tsx`: Show course access, progress, purchases, and continue lesson CTA.
- `client/src/pages/Articles.tsx`: Add useful empty state and course-support positioning.

---

### Task 1: Course Data And Access Helpers

**Files:**

- Create: `client/src/data/touristCourse.ts`
- Create: `client/src/lib/courseAccess.ts`
- Create: `client/src/lib/courseAccess.test.ts`
- Modify: `vitest.config.ts`

- [ ] **Step 1: Write failing tests for access rules**

Create `client/src/lib/courseAccess.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { TOURIST_COURSE } from "@/data/touristCourse";
import {
  COURSE_PRODUCT_TYPES,
  canAccessLesson,
  getCourseAccessState,
  isCoursePurchase,
} from "./courseAccess";

const completedPurchase = {
  productType: COURSE_PRODUCT_TYPES[0],
  status: "completed",
};

describe("courseAccess", () => {
  it("allows free lessons without a paid purchase", () => {
    expect(canAccessLesson({ lessonId: 1, hasPaidAccess: false })).toBe(true);
    expect(canAccessLesson({ lessonId: 3, hasPaidAccess: false })).toBe(true);
    expect(canAccessLesson({ lessonId: 5, hasPaidAccess: false })).toBe(false);
  });

  it("allows all mapped course lessons for paid users", () => {
    for (const lessonId of TOURIST_COURSE.paidLessonIds) {
      expect(canAccessLesson({ lessonId, hasPaidAccess: true })).toBe(true);
    }
  });

  it("treats completed course-compatible product purchases as paid access", () => {
    expect(isCoursePurchase(completedPurchase)).toBe(true);
    expect(isCoursePurchase({ productType: "single", status: "completed" })).toBe(true);
    expect(isCoursePurchase({ productType: "single", status: "pending" })).toBe(false);
    expect(isCoursePurchase({ productType: "monthly", status: "completed" })).toBe(false);
  });

  it("returns visitor, free, and paid access states", () => {
    expect(getCourseAccessState({ user: null, purchases: [] }).kind).toBe("visitor");
    expect(getCourseAccessState({ user: { id: 1 }, purchases: [] }).kind).toBe("free");
    expect(getCourseAccessState({ user: { id: 1 }, purchases: [completedPurchase] }).kind).toBe("paid");
  });
});
```

- [ ] **Step 2: Make Vitest include the new pure client test**

Modify `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  root: path.resolve(import.meta.dirname),
  test: {
    environment: "node",
    include: [
      "server/**/*.test.ts",
      "server/**/*.spec.ts",
      "client/src/**/*.test.ts",
      "client/src/**/*.spec.ts",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client/src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },
});
```

- [ ] **Step 3: Run tests and confirm they fail**

Run:

```bash
pnpm test -- client/src/lib/courseAccess.test.ts
```

Expected: FAIL because `client/src/lib/courseAccess.ts` does not exist.

- [ ] **Step 4: Create course product constants**

Create `client/src/data/touristCourse.ts`:

```ts
import { lessonsData } from "@/data/lessonsData";

export const TOURIST_COURSE = {
  productName: "Tourist Survival Thai Course",
  productNameHe: "קורס תאית הישרדות לתיירים",
  headlineHe: "לדבר תאית בסיסית לטיול בתאילנד תוך 7 ימים",
  headlineEn: "Speak enough Thai for your Thailand trip in 7 days",
  priceIls: 79,
  originalPriceIls: 129,
  currency: "ils",
  freeLessonIds: [1, 3],
  paidLessonIds: [1, 5, 3, 4, 6, 7, 9],
  checkoutProductType: "single",
  whatsAppUrl:
    "https://wa.me/66929894495?text=Hi!%20I%20want%20the%20Tourist%20Survival%20Thai%20Course",
} as const;

export type TouristCourseModule = {
  day: number;
  lessonId: number;
  titleHe: string;
  titleEn: string;
  outcomeHe: string;
  outcomeEn: string;
  situation: "arrival" | "taxi" | "food" | "shopping" | "hotel" | "emergency" | "social";
};

export const TOURIST_COURSE_MODULES: TouristCourseModule[] = [
  {
    day: 1,
    lessonId: 1,
    titleHe: "ברכות ונימוס",
    titleEn: "Greetings and respect",
    outcomeHe: "להגיד שלום, תודה וסליחה בצורה מכבדת",
    outcomeEn: "Say hello, thank you, and sorry respectfully",
    situation: "arrival",
  },
  {
    day: 2,
    lessonId: 5,
    titleHe: "מונית, Grab וכיוונים",
    titleEn: "Taxi, Grab, and directions",
    outcomeHe: "להסביר לאן לנסוע, לעצור כאן, ולשאול מחיר",
    outcomeEn: "Give directions, stop here, and ask the price",
    situation: "taxi",
  },
  {
    day: 3,
    lessonId: 3,
    titleHe: "אוכל ומסעדות",
    titleEn: "Food and restaurants",
    outcomeHe: "להזמין אוכל, לבקש לא חריף, ולדבר על אלרגיות",
    outcomeEn: "Order food, ask for not spicy, and handle allergies",
    situation: "food",
  },
  {
    day: 4,
    lessonId: 4,
    titleHe: "שוק וקניות",
    titleEn: "Shopping and bargaining",
    outcomeHe: "לשאול כמה עולה, לבקש הנחה, ולקנות בביטחון",
    outcomeEn: "Ask prices, request a discount, and buy confidently",
    situation: "shopping",
  },
  {
    day: 5,
    lessonId: 6,
    titleHe: "מלון וצ'ק-אין",
    titleEn: "Hotel and check-in",
    outcomeHe: "לבקש חדר, מגבת, עזרה או פתרון לבעיה",
    outcomeEn: "Ask for a room, towel, help, or a fix",
    situation: "hotel",
  },
  {
    day: 6,
    lessonId: 7,
    titleHe: "חירום ובריאות",
    titleEn: "Emergency and health",
    outcomeHe: "לבקש עזרה, רופא, משטרה או בית חולים",
    outcomeEn: "Ask for help, a doctor, police, or a hospital",
    situation: "emergency",
  },
  {
    day: 7,
    lessonId: 9,
    titleHe: "שיחה קצרה וחזרה",
    titleEn: "Small talk and review",
    outcomeHe: "לפתוח שיחה קצרה ולהרגיש יותר נוח עם מקומיים",
    outcomeEn: "Start a short conversation and feel more comfortable",
    situation: "social",
  },
];

export const COURSE_BONUSES = [
  {
    titleHe: "PDF ביטויים לטיול",
    titleEn: "Trip phrasebook PDF",
    descriptionHe: "כל המשפטים החשובים בעברית, תאית והגייה פשוטה",
    descriptionEn: "All key phrases in Hebrew, Thai, and simple pronunciation",
  },
  {
    titleHe: "תסריטי חירום",
    titleEn: "Emergency scripts",
    descriptionHe: "מה להגיד לרופא, משטרה, נהג או מלון כשיש בעיה",
    descriptionEn: "What to say to a doctor, police, driver, or hotel when something goes wrong",
  },
  {
    titleHe: "דף צ'יט לטלפון",
    titleEn: "Phone cheat sheet",
    descriptionHe: "גרסה קצרה לשמירה בטלפון לפני שיוצאים מהמלון",
    descriptionEn: "A short version to keep on your phone before leaving the hotel",
  },
] as const;

export function getTouristCourseLessons() {
  return TOURIST_COURSE_MODULES.map(module => {
    const lesson = lessonsData.find(item => item.id === module.lessonId);
    return { module, lesson };
  }).filter(item => Boolean(item.lesson));
}
```

- [ ] **Step 5: Create access helper implementation**

Create `client/src/lib/courseAccess.ts`:

```ts
import { TOURIST_COURSE } from "@/data/touristCourse";

export const COURSE_PRODUCT_TYPES = [
  "tourist_survival_thai_course",
  "smart_tourist_pack",
  "single",
] as const;

export type CourseAccessKind = "visitor" | "free" | "paid";

export type PurchaseLike = {
  productType?: string | null;
  status?: string | null;
};

export type UserLike = {
  id?: number | string | null;
} | null;

export function isCoursePurchase(purchase: PurchaseLike): boolean {
  return (
    purchase.status === "completed" &&
    COURSE_PRODUCT_TYPES.includes(purchase.productType as (typeof COURSE_PRODUCT_TYPES)[number])
  );
}

export function hasCourseAccess(purchases: PurchaseLike[] = []): boolean {
  return purchases.some(isCoursePurchase);
}

export function getCourseAccessState({
  user,
  purchases,
}: {
  user: UserLike;
  purchases: PurchaseLike[];
}): { kind: CourseAccessKind; hasPaidAccess: boolean } {
  if (!user) return { kind: "visitor", hasPaidAccess: false };
  const paid = hasCourseAccess(purchases);
  return { kind: paid ? "paid" : "free", hasPaidAccess: paid };
}

export function canAccessLesson({
  lessonId,
  hasPaidAccess,
}: {
  lessonId: number;
  hasPaidAccess: boolean;
}): boolean {
  if (hasPaidAccess) return TOURIST_COURSE.paidLessonIds.includes(lessonId as never);
  return TOURIST_COURSE.freeLessonIds.includes(lessonId as never);
}

export function isFreeLesson(lessonId: number): boolean {
  return TOURIST_COURSE.freeLessonIds.includes(lessonId as never);
}
```

- [ ] **Step 6: Run tests and confirm they pass**

Run:

```bash
pnpm test -- client/src/lib/courseAccess.test.ts
```

Expected: PASS for all `courseAccess` tests.

- [ ] **Step 7: Commit**

Run:

```bash
git add vitest.config.ts client/src/data/touristCourse.ts client/src/lib/courseAccess.ts client/src/lib/courseAccess.test.ts
git commit -m "feat: add tourist course access model"
```

---

### Task 2: Payment Product Copy And Checkout Safety

**Files:**

- Modify: `shared/products.ts`
- Modify: `server/stripeRouter.ts`
- Modify: `server/stripe-currency.test.ts`

- [ ] **Step 1: Replace brittle Stripe tests**

Replace `server/stripe-currency.test.ts` with repo-relative checks:

```ts
import { describe, expect, it } from "vitest";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => readFile(path.join(root, relativePath), "utf-8");

describe("Stripe product and currency configuration", () => {
  it("uses ILS currency in the Stripe router", async () => {
    const stripeRouterContent = await read("server/stripeRouter.ts");

    expect(stripeRouterContent).toContain('currency: "ils"');
    expect(stripeRouterContent).not.toContain('currency: "thb"');
  });

  it("uses ILS as default currency in webhook handler", async () => {
    const webhookContent = await read("server/webhookHandler.ts");

    expect(webhookContent).toContain('|| "ils"');
    expect(webhookContent).not.toContain('|| "thb"');
  });

  it("names the one-time product as the Thai speaking course", async () => {
    const productsContent = await read("shared/products.ts");

    expect(productsContent).toContain("Tourist Survival Thai Course");
    expect(productsContent).toContain("Hebrew-first Thai speaking course");
  });

  it("still displays shekel symbol in admin and profile pages", async () => {
    const adminContent = await read("client/src/pages/Admin.tsx");
    const profileContent = await read("client/src/pages/Profile.tsx");

    expect(adminContent).toContain("₪");
    expect(profileContent).toContain("₪");
  });
});
```

- [ ] **Step 2: Run Stripe tests and confirm the new product test fails**

Run:

```bash
pnpm test -- server/stripe-currency.test.ts
```

Expected: FAIL because `shared/products.ts` still names Smart Tourist Pack.

- [ ] **Step 3: Rename the one-time product**

Modify `shared/products.ts` so `SMART_TOURIST_PACK` keeps the same key for compatibility but changes the product content:

```ts
export const PRODUCTS = {
  SMART_TOURIST_PACK: {
    name: "Tourist Survival Thai Course",
    description:
      "Hebrew-first Thai speaking course for Israeli tourists, with survival phrases, audio practice, PDF phrasebook, and emergency scripts",
    price: 79,
    priceUSD: 22,
    currency: "ils",
    features: [
      "7-day practical Thai speaking course",
      "Hebrew explanations for Israeli tourists",
      "Thai phrases for taxis, food, hotels, shopping, and emergencies",
      "Audio practice and listen-repeat flow",
      "Downloadable PDF phrasebook",
      "Emergency scripts and phone cheat sheet",
      "Lifetime access to the course materials",
    ],
  },
  BULK_PRICING: {
    "10_PACKS": {
      quantity: 10,
      price: 690,
      pricePerPack: 69,
      savings: 100,
    },
    "20_PACKS": {
      quantity: 20,
      price: 1180,
      pricePerPack: 59,
      savings: 400,
    },
  },
} as const;
```

- [ ] **Step 4: Add checkout metadata compatibility**

In `server/stripeRouter.ts`, keep `productType: "single"` accepted, but add course metadata inside the initial metadata object:

```ts
let metadata: Record<string, string> = {
  product_type: productType,
  course_access: productType === "single" ? "tourist_survival_thai_course" : "bulk_course_access",
};
```

Expected behavior: existing callers still pass `{ productType: "single" }`, and new frontend copy sells it as the course.

- [ ] **Step 5: Run tests**

Run:

```bash
pnpm test -- server/stripe-currency.test.ts
```

Expected: PASS.

- [ ] **Step 6: Commit**

Run:

```bash
git add shared/products.ts server/stripeRouter.ts server/stripe-currency.test.ts
git commit -m "feat: rename one-time product to tourist Thai course"
```

---

### Task 3: Free Account Login And Signup UI

**Files:**

- Create: `client/src/lib/authApi.ts`
- Create: `client/src/pages/Auth.tsx`
- Modify: `client/src/const.ts`
- Modify: `client/src/App.tsx`
- Modify: `client/src/components/Navbar.tsx`

- [ ] **Step 1: Create REST auth helper**

Create `client/src/lib/authApi.ts`:

```ts
export type AuthMode = "login" | "register";

export type AuthPayload = {
  email: string;
  password: string;
  name?: string;
};

export async function submitAuth(mode: AuthMode, payload: AuthPayload) {
  const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Authentication failed");
  }

  return data as { success: true; name?: string };
}
```

- [ ] **Step 2: Make login URL local by default**

Modify `client/src/const.ts` so the fallback is `/login`:

```ts
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  if (!oauthPortalUrl || !appId) return "/login";
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};
```

- [ ] **Step 3: Create Auth page**

Create `client/src/pages/Auth.tsx` with:

```tsx
import { FormEvent, useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitAuth, type AuthMode } from "@/lib/authApi";

export default function Auth() {
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<AuthMode>("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const redirect = params.get("redirect") || "/interactive-lessons";
  const isRegister = mode === "register";

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await submitAuth(mode, {
        email,
        password,
        name: isRegister ? name : undefined,
      });
      toast.success(isRegister ? "החשבון נוצר בהצלחה" : "התחברת בהצלחה");
      setLocation(redirect);
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Authentication failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[oklch(0.97_0.015_80)] px-4 pt-24 pb-16" dir="rtl">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_420px] md:items-center">
        <section>
          <Link href="/" className="text-sm font-semibold text-stone-600 hover:text-stone-950">
            חזרה לעמוד הבית
          </Link>
          <h1 className="mt-6 text-4xl font-bold leading-tight text-stone-950 md:text-6xl">
            התחילו לתרגל תאית לטיול שלכם
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-stone-700">
            חשבון חינמי שומר את ההתקדמות שלכם ופותח שיעורי ניסיון. אחרי זה תוכלו לפתוח את הקורס המלא.
          </p>
        </section>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="mb-6 grid grid-cols-2 rounded-xl bg-stone-100 p-1 text-sm font-semibold">
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`rounded-lg px-4 py-2 ${isRegister ? "bg-stone-950 text-white" : "text-stone-600"}`}
            >
              הרשמה
            </button>
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`rounded-lg px-4 py-2 ${!isRegister ? "bg-stone-950 text-white" : "text-stone-600"}`}
            >
              כניסה
            </button>
          </div>

          <h2 className="text-2xl font-bold text-stone-950">
            {isRegister ? "צרו חשבון חינמי" : "כניסה לחשבון"}
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            {isRegister ? "שני שיעורי ניסיון מחכים לכם בפנים." : "חזרו לשיעור הבא שלכם."}
          </p>

          {isRegister && (
            <label className="mt-6 block text-sm font-semibold text-stone-700">
              שם
              <Input value={name} onChange={event => setName(event.target.value)} className="mt-2" autoComplete="name" />
            </label>
          )}

          <label className="mt-5 block text-sm font-semibold text-stone-700">
            אימייל
            <Input
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              className="mt-2"
              autoComplete="email"
              required
            />
          </label>

          <label className="mt-5 block text-sm font-semibold text-stone-700">
            סיסמה
            <Input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              className="mt-2"
              autoComplete={isRegister ? "new-password" : "current-password"}
              minLength={8}
              required
            />
          </label>

          <Button type="submit" className="mt-6 h-12 w-full rounded-xl bg-stone-950 text-base font-bold text-white hover:bg-stone-800" disabled={isSubmitting}>
            {isSubmitting ? "שולח..." : isRegister ? "התחילו חינם" : "כניסה לקורס"}
          </Button>

          <p className="mt-4 text-center text-xs text-stone-500">
            בלי מנוי חודשי. אפשר לפתוח את הקורס המלא רק אם תרצו.
          </p>
        </form>
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Add `/login` route**

Modify `client/src/App.tsx`:

```tsx
import Auth from "./pages/Auth";
```

Add route before `/profile`:

```tsx
<Route path="/login">
  <AnimatedRoute component={Auth} />
</Route>
```

- [ ] **Step 5: Update navbar routes and CTA**

In `client/src/components/Navbar.tsx`, keep search/language/profile support but add:

```tsx
const { data: user } = trpc.auth.me.useQuery(undefined, {
  retry: false,
  refetchOnWindowFocus: false,
});
const { data: purchases = [] } = trpc.user.getPurchaseHistory.useQuery(undefined, {
  enabled: Boolean(user),
});
const hasPaidAccess = hasCourseAccess(purchases);
```

Add imports:

```tsx
import { trpc } from "@/lib/trpc";
import { hasCourseAccess } from "@/lib/courseAccess";
```

Use visible nav links:

```tsx
<Link href="/interactive-lessons">Course</Link>
<Link href="/interactive-lessons?sample=1">Free lesson</Link>
<Link href="/articles">Articles</Link>
<Link href="/emergency">Emergency</Link>
```

Use CTA target:

```tsx
const cta = !user
  ? { href: "/login", label: t({ he: "התחילו חינם", en: "Start free" }) }
  : hasPaidAccess
  ? { href: "/interactive-lessons", label: t({ he: "המשך שיעור", en: "Continue lesson" }) }
  : { href: "/welcome-kit", label: t({ he: "פתח קורס", en: "Unlock course" }) };
```

- [ ] **Step 6: Build**

Run:

```bash
pnpm build
```

Expected: build completes with no new TypeScript or bundling errors.

- [ ] **Step 7: Commit**

Run:

```bash
git add client/src/lib/authApi.ts client/src/pages/Auth.tsx client/src/const.ts client/src/App.tsx client/src/components/Navbar.tsx
git commit -m "feat: add free account login flow"
```

---

### Task 4: Homepage Course Funnel Redesign

**Files:**

- Create: `client/src/components/course/CourseHero.tsx`
- Create: `client/src/components/course/PhrasePracticePreview.tsx`
- Create: `client/src/components/course/CoursePath.tsx`
- Create: `client/src/components/course/FreePaidComparison.tsx`
- Modify: `client/src/pages/Home.tsx`
- Modify: `client/src/index.css`

- [ ] **Step 1: Create course hero component**

Create `client/src/components/course/CourseHero.tsx`:

```tsx
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { TOURIST_COURSE } from "@/data/touristCourse";

export function CourseHero() {
  return (
    <section className="course-hero" dir="rtl">
      <div className="container grid min-h-[calc(100vh-56px)] gap-10 py-24 md:grid-cols-[1fr_420px] md:items-center">
        <div>
          <p className="mb-5 text-sm font-bold tracking-[0.08em] text-emerald-800">
            קורס תאית מעשי לישראלים שטסים לתאילנד
          </p>
          <h1 className="max-w-4xl text-5xl font-black leading-[1.05] text-stone-950 md:text-7xl">
            לדבר תאית בסיסית לטיול בתאילנד תוך 7 ימים
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700 md:text-xl">
            תלמדו את המשפטים שבאמת צריך: מונית, אוכל, מלון, שוק, עזרה, וחיוך מכבד מול מקומיים.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/login">
              <Button className="h-13 rounded-xl bg-stone-950 px-7 text-base font-bold text-white hover:bg-stone-800">
                התחילו שיעור חינם
              </Button>
            </Link>
            <Link href="/welcome-kit">
              <Button variant="outline" className="h-13 rounded-xl border-stone-300 px-7 text-base font-bold">
                פתחו את הקורס המלא ₪{TOURIST_COURSE.priceIls}
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-stone-500">
            בלי מנוי חודשי. שיעורי ניסיון בחינם, תשלום חד פעמי לקורס המלא.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <div className="aspect-[4/5] rounded-xl bg-[url('/images/hero-beach.png')] bg-cover bg-center" />
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-stone-600">
            <span className="rounded-lg bg-stone-100 px-2 py-2">אוכל</span>
            <span className="rounded-lg bg-stone-100 px-2 py-2">מוניות</span>
            <span className="rounded-lg bg-stone-100 px-2 py-2">חירום</span>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create phrase practice preview**

Create `client/src/components/course/PhrasePracticePreview.tsx`:

```tsx
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PhrasePracticePreview() {
  const play = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance("ไม่เผ็ดครับ");
    utterance.lang = "th-TH";
    utterance.rate = 0.72;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section className="border-y border-stone-200 bg-white py-16" dir="rtl">
      <div className="container grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <div>
          <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">נסו משפט אחד עכשיו</h2>
          <p className="mt-3 text-stone-600">
            הקורס בנוי ממשפטים קצרים שתשתמשו בהם באותו יום בטיול.
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-[oklch(0.98_0.012_85)] p-6">
          <p className="text-sm font-bold text-stone-500">במסעדה</p>
          <p className="mt-4 text-5xl font-black text-stone-950" lang="th">ไม่เผ็ดครับ</p>
          <p className="mt-3 text-xl text-stone-700">mai phet khrap</p>
          <p className="mt-1 text-lg font-semibold text-stone-950">לא חריף בבקשה (גבר)</p>
          <Button onClick={play} className="mt-5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800">
            <Volume2 className="ml-2 h-4 w-4" />
            שמע הגייה
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create course path component**

Create `client/src/components/course/CoursePath.tsx`:

```tsx
import { TOURIST_COURSE_MODULES } from "@/data/touristCourse";

export function CoursePath() {
  return (
    <section className="bg-[oklch(0.97_0.015_80)] py-18" dir="rtl">
      <div className="container">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-stone-950 md:text-5xl">מסלול של 7 ימים</h2>
          <p className="mt-4 text-lg leading-8 text-stone-700">
            כל יום מתמקד בסיטואציה אחת אמיתית מהטיול. פחות דקדוק, יותר לדבר.
          </p>
        </div>
        <div className="mt-10 grid gap-3 md:grid-cols-7">
          {TOURIST_COURSE_MODULES.map(module => (
            <article key={module.day} className="rounded-xl border border-stone-200 bg-white p-4">
              <p className="text-sm font-black text-emerald-800">יום {module.day}</p>
              <h3 className="mt-3 min-h-12 text-lg font-bold leading-tight text-stone-950">{module.titleHe}</h3>
              <p className="mt-3 text-sm leading-6 text-stone-600">{module.outcomeHe}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create free/paid comparison component**

Create `client/src/components/course/FreePaidComparison.tsx`:

```tsx
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { TOURIST_COURSE, COURSE_BONUSES } from "@/data/touristCourse";

export function FreePaidComparison() {
  return (
    <section className="bg-white py-18" dir="rtl">
      <div className="container">
        <h2 className="text-3xl font-bold text-stone-950 md:text-5xl">התחילו חינם, פתחו כשזה עוזר</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-stone-200 p-6">
            <h3 className="text-2xl font-bold text-stone-950">חשבון חינמי</h3>
            <ul className="mt-5 space-y-3 text-stone-700">
              <li>שני שיעורי ניסיון</li>
              <li>שמירת התקדמות</li>
              <li>תצוגה של כל מסלול הקורס</li>
            </ul>
            <Link href="/login">
              <Button variant="outline" className="mt-6 rounded-xl">התחילו חינם</Button>
            </Link>
          </div>
          <div className="rounded-2xl border-2 border-stone-950 bg-stone-950 p-6 text-white">
            <h3 className="text-2xl font-bold">הקורס המלא ₪{TOURIST_COURSE.priceIls}</h3>
            <ul className="mt-5 space-y-3 text-stone-200">
              <li>כל 7 שיעורי הדיבור</li>
              <li>תרגול שמע וחזרה</li>
              {COURSE_BONUSES.map(bonus => (
                <li key={bonus.titleEn}>{bonus.titleHe}</li>
              ))}
            </ul>
            <Link href="/welcome-kit">
              <Button className="mt-6 rounded-xl bg-amber-400 text-stone-950 hover:bg-amber-300">
                פתחו את הקורס
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Replace homepage composition**

Replace `client/src/pages/Home.tsx` with a shorter course funnel that imports and renders:

```tsx
import { CourseHero } from "@/components/course/CourseHero";
import { CoursePath } from "@/components/course/CoursePath";
import { FreePaidComparison } from "@/components/course/FreePaidComparison";
import { PhrasePracticePreview } from "@/components/course/PhrasePracticePreview";
import ContentFeed from "@/components/ContentFeed";

export default function Home() {
  return (
    <main className="min-h-screen bg-[oklch(0.97_0.015_80)]">
      <CourseHero />
      <PhrasePracticePreview />
      <CoursePath />
      <FreePaidComparison />
      <section className="bg-[oklch(0.97_0.015_80)] py-16" dir="rtl">
        <div className="container">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-stone-950">מדריכי טיול שתומכים בקורס</h2>
            <p className="mt-3 text-stone-700">
              מאמרים על תאילנד נשארים באתר, אבל המטרה שלהם היא לעזור לכם להשתמש בתאית בטיול אמיתי.
            </p>
          </div>
        </div>
        <ContentFeed />
      </section>
    </main>
  );
}
```

- [ ] **Step 6: Add stable course CSS utilities**

Append to `client/src/index.css`:

```css
@layer components {
  .course-hero {
    background:
      linear-gradient(135deg, oklch(0.985 0.012 82), oklch(0.94 0.035 82)),
      oklch(0.97 0.015 80);
  }

  .h-13 {
    height: 3.25rem;
  }

  .py-18 {
    padding-top: 4.5rem;
    padding-bottom: 4.5rem;
  }
}
```

- [ ] **Step 7: Build**

Run:

```bash
pnpm build
```

Expected: build succeeds.

- [ ] **Step 8: Commit**

Run:

```bash
git add client/src/pages/Home.tsx client/src/index.css client/src/components/course
git commit -m "feat: redesign homepage around Thai speaking course"
```

---

### Task 5: Course Dashboard With Locked And Free Lessons

**Files:**

- Create: `client/src/components/course/LockedLessonCard.tsx`
- Create: `client/src/components/course/UnlockCoursePanel.tsx`
- Modify: `client/src/pages/InteractiveLessons.tsx`
- Modify: `client/src/components/LessonBrowser.tsx`

- [ ] **Step 1: Create unlock panel**

Create `client/src/components/course/UnlockCoursePanel.tsx`:

```tsx
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { TOURIST_COURSE } from "@/data/touristCourse";

export function UnlockCoursePanel() {
  return (
    <aside className="rounded-2xl border-2 border-stone-950 bg-stone-950 p-5 text-white" dir="rtl">
      <p className="text-sm font-bold text-amber-300">הקורס המלא</p>
      <h2 className="mt-2 text-2xl font-black">פתחו את כל 7 השיעורים</h2>
      <p className="mt-3 text-sm leading-6 text-stone-200">
        כולל תרגול שמע, PDF ביטויים, תסריטי חירום וצ'יט שיט לטלפון.
      </p>
      <Link href="/welcome-kit">
        <Button className="mt-5 w-full rounded-xl bg-amber-400 font-bold text-stone-950 hover:bg-amber-300">
          פתחו ב-₪{TOURIST_COURSE.priceIls}
        </Button>
      </Link>
    </aside>
  );
}
```

- [ ] **Step 2: Create locked lesson card**

Create `client/src/components/course/LockedLessonCard.tsx`:

```tsx
import { Lock } from "lucide-react";
import type { Lesson } from "@/components/InteractiveLessonPlayer";

export function LockedLessonCard({
  lesson,
  onUnlock,
}: {
  lesson: Lesson;
  onUnlock: () => void;
}) {
  return (
    <button
      onClick={onUnlock}
      className="group relative w-full rounded-xl border border-stone-200 bg-stone-100 p-5 text-right opacity-90 transition hover:border-stone-400"
      dir="rtl"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black text-stone-500">נעול בקורס המלא</p>
          <h3 className="mt-2 text-xl font-bold text-stone-950">{lesson.titleHebrew}</h3>
          <p className="mt-1 text-sm text-stone-600">{lesson.title}</p>
        </div>
        <span className="rounded-full bg-white p-3 text-stone-700">
          <Lock className="h-5 w-5" />
        </span>
      </div>
    </button>
  );
}
```

- [ ] **Step 3: Update InteractiveLessons access state**

In `client/src/pages/InteractiveLessons.tsx`, add purchase and access queries:

```tsx
const { user, isAuthenticated } = useAuth();
const { data: purchases = [] } = trpc.user.getPurchaseHistory.useQuery(undefined, {
  enabled: Boolean(user),
});
const access = getCourseAccessState({ user, purchases });
```

Add imports:

```tsx
import { getCourseAccessState, canAccessLesson } from "@/lib/courseAccess";
import { TOURIST_COURSE_MODULES } from "@/data/touristCourse";
```

Gate lesson selection:

```tsx
const handleSelectLesson = (lessonId: number) => {
  if (!isAuthenticated) {
    window.location.href = "/login?redirect=/interactive-lessons";
    return;
  }
  if (!canAccessLesson({ lessonId, hasPaidAccess: access.hasPaidAccess })) {
    window.location.href = "/welcome-kit";
    return;
  }
  setSelectedLessonId(lessonId);
};
```

Pass access props to `LessonBrowser`:

```tsx
<LessonBrowser
  lessons={lessonsData.filter(lesson =>
    TOURIST_COURSE_MODULES.some(module => module.lessonId === lesson.id)
  )}
  completedLessons={completedLessons}
  onSelectLesson={handleSelectLesson}
  hasPaidAccess={access.hasPaidAccess}
  accessKind={access.kind}
/>
```

- [ ] **Step 4: Update LessonBrowser props and rendering**

In `client/src/components/LessonBrowser.tsx`, extend props:

```ts
interface LessonBrowserProps {
  lessons: Lesson[];
  completedLessons: Set<number>;
  onSelectLesson: (lessonId: number) => void;
  hasPaidAccess: boolean;
  accessKind: "visitor" | "free" | "paid";
}
```

Remove the old category row and render the course dashboard:

```tsx
const isLocked = !canAccessLesson({ lessonId: lesson.id, hasPaidAccess });
```

For locked lessons:

```tsx
if (isLocked) {
  return (
    <LockedLessonCard
      key={lesson.id}
      lesson={lesson}
      onUnlock={() => {
        window.location.href = accessKind === "visitor"
          ? "/login?redirect=/welcome-kit"
          : "/welcome-kit";
      }}
    />
  );
}
```

Keep completed visual state for accessible lessons.

- [ ] **Step 5: Build**

Run:

```bash
pnpm build
```

Expected: build succeeds.

- [ ] **Step 6: Commit**

Run:

```bash
git add client/src/pages/InteractiveLessons.tsx client/src/components/LessonBrowser.tsx client/src/components/course/LockedLessonCard.tsx client/src/components/course/UnlockCoursePanel.tsx
git commit -m "feat: add course dashboard access states"
```

---

### Task 6: Lesson Player Course Polish

**Files:**

- Modify: `client/src/components/FlashcardPlayer.tsx`

- [ ] **Step 1: Update lesson player header copy**

In phrase phase header, change the title area to emphasize speaking practice:

```tsx
<div className="text-center flex-1 mx-4">
  <p className="text-xs font-bold text-emerald-700">תרגול דיבור</p>
  <h1 className="truncate text-lg font-bold text-stone-950">
    {lesson.icon} {lesson.titleHebrew}
  </h1>
</div>
```

- [ ] **Step 2: Add Hebrew-first phrase card layout**

In the phrase card JSX, show this hierarchy:

```tsx
<p className="text-sm font-bold text-stone-500">אמרו בקול</p>
<div className="mt-4 text-5xl font-black text-stone-950" lang="th">
  {currentPhrase.thai}
</div>
<div className="mt-4 text-2xl font-semibold text-emerald-800">
  {currentPhrase.phonetic}
</div>
<div className="mt-2 text-xl font-bold text-stone-950" dir="rtl">
  {currentPhrase.hebrew}
</div>
```

- [ ] **Step 3: Rename completion action**

Replace generic practiced copy with:

```tsx
{isPracticed
  ? t({ en: "Practiced", he: "תורגל" })
  : t({ en: "I said it out loud", he: "אמרתי בקול" })}
```

- [ ] **Step 4: Build**

Run:

```bash
pnpm build
```

Expected: build succeeds.

- [ ] **Step 5: Commit**

Run:

```bash
git add client/src/components/FlashcardPlayer.tsx
git commit -m "feat: polish lesson player for speaking practice"
```

---

### Task 7: Course Unlock Page

**Files:**

- Modify: `client/src/pages/WelcomeKit.tsx`

- [ ] **Step 1: Require login before checkout**

In `WelcomeKit`, query user:

```tsx
const { data: user } = trpc.auth.me.useQuery(undefined, {
  retry: false,
  refetchOnWindowFocus: false,
});
```

Update purchase handler:

```tsx
const handlePurchase = async () => {
  if (!user) {
    window.location.href = "/login?redirect=/welcome-kit";
    return;
  }

  try {
    toast.info(t({ he: "מעביר לדף תשלום מאובטח...", en: "Redirecting to secure checkout..." }));
    const result = await createCheckout.mutateAsync({ productType: "single" });
    if (result.url) window.location.href = result.url;
  } catch {
    toast.error(t({ he: "שגיאה. נסה דרך WhatsApp.", en: "Failed. Please try via WhatsApp." }));
  }
};
```

- [ ] **Step 2: Replace hero copy**

Use course unlock copy:

```tsx
<h1 className="text-4xl md:text-6xl font-black leading-tight" dir="rtl">
  פתחו את קורס התאית לטיול שלכם
</h1>
<p className="mx-auto mt-4 max-w-2xl text-xl text-white/90" dir="rtl">
  7 שיעורי דיבור קצרים, תרגול שמע, PDF ביטויים ותסריטי חירום לישראלים בתאילנד.
</p>
```

Use price from `TOURIST_COURSE.priceIls`.

- [ ] **Step 3: Replace old 8-section sales list with 7 course modules**

Import:

```tsx
import { TOURIST_COURSE, TOURIST_COURSE_MODULES, COURSE_BONUSES } from "@/data/touristCourse";
```

Render modules:

```tsx
{TOURIST_COURSE_MODULES.map(module => (
  <article key={module.day} className="rounded-xl border border-stone-200 bg-white p-5">
    <p className="text-sm font-black text-emerald-800">יום {module.day}</p>
    <h3 className="mt-2 text-xl font-bold text-stone-950">{module.titleHe}</h3>
    <p className="mt-2 text-sm leading-6 text-stone-600">{module.outcomeHe}</p>
  </article>
))}
```

Render bonuses:

```tsx
{COURSE_BONUSES.map(bonus => (
  <article key={bonus.titleEn} className="rounded-xl bg-stone-100 p-5">
    <h3 className="text-lg font-bold text-stone-950">{bonus.titleHe}</h3>
    <p className="mt-2 text-sm leading-6 text-stone-600">{bonus.descriptionHe}</p>
  </article>
))}
```

- [ ] **Step 4: Remove unverified claims**

Remove visible copy that says:

- `5,000+`
- `4.9`
- `Best Seller`
- fabricated reviews

Replace with specific product reassurance:

- `גישה לכל החיים`
- `תשלום חד פעמי`
- `שיעורי ניסיון לפני רכישה`
- `מתאים לטיול ראשון בתאילנד`

- [ ] **Step 5: Build**

Run:

```bash
pnpm build
```

Expected: build succeeds.

- [ ] **Step 6: Commit**

Run:

```bash
git add client/src/pages/WelcomeKit.tsx
git commit -m "feat: reframe welcome kit as course unlock page"
```

---

### Task 8: Profile Course Status

**Files:**

- Modify: `client/src/pages/Profile.tsx`

- [ ] **Step 1: Add course access state**

Import:

```tsx
import { getCourseAccessState } from "@/lib/courseAccess";
import { TOURIST_COURSE, TOURIST_COURSE_MODULES } from "@/data/touristCourse";
```

After purchases query:

```tsx
const access = getCourseAccessState({ user, purchases });
const courseProgress = progress.filter(item =>
  TOURIST_COURSE_MODULES.some(module => module.lessonId === item.lessonId)
);
const completedLessons = courseProgress.filter(p => p.completed === true).length;
const totalLessons = TOURIST_COURSE_MODULES.length;
const completionPercentage = Math.round((completedLessons / totalLessons) * 100);
```

- [ ] **Step 2: Replace purchase empty copy**

Change the empty purchase message to:

```tsx
<p className="text-gray-500 text-center py-4">
  עדיין לא פתחת את הקורס המלא.{" "}
  <Link href="/welcome-kit" className="text-amber-700 font-semibold hover:underline">
    פתח את כל השיעורים ב-₪{TOURIST_COURSE.priceIls}
  </Link>
</p>
```

- [ ] **Step 3: Add top course status card**

Add below user info:

```tsx
<Card className="mb-6 border-2 border-stone-200">
  <CardHeader>
    <CardTitle dir="rtl">סטטוס הקורס</CardTitle>
  </CardHeader>
  <CardContent dir="rtl">
    <p className="text-lg font-bold text-stone-950">
      {access.kind === "paid" ? "הקורס המלא פתוח" : "חשבון חינמי"}
    </p>
    <p className="mt-2 text-stone-600">
      {access.kind === "paid"
        ? "כל השיעורים והבונוסים זמינים לך."
        : "שיעורי ניסיון פתוחים. אפשר לפתוח את הקורס המלא בכל רגע."}
    </p>
    <div className="mt-5 flex gap-3">
      <Link href="/interactive-lessons">
        <Button className="rounded-xl bg-stone-950 text-white hover:bg-stone-800">המשך ללמוד</Button>
      </Link>
      {access.kind !== "paid" && (
        <Link href="/welcome-kit">
          <Button variant="outline" className="rounded-xl">פתח קורס</Button>
        </Link>
      )}
    </div>
  </CardContent>
</Card>
```

- [ ] **Step 4: Build**

Run:

```bash
pnpm build
```

Expected: build succeeds.

- [ ] **Step 5: Commit**

Run:

```bash
git add client/src/pages/Profile.tsx
git commit -m "feat: show course access in profile"
```

---

### Task 9: Articles Support State

**Files:**

- Modify: `client/src/pages/Articles.tsx`

- [ ] **Step 1: Update articles page headline**

Change the page heading to support the course:

```tsx
<h1 className="text-4xl font-black text-white md:text-6xl" dir="rtl">
  מדריכי טיול שעוזרים לדבר בתאילנד
</h1>
<p className="mt-4 text-lg text-white/85" dir="rtl">
  אוכל, תחבורה, ויזה ובטיחות, עם דגש על מה להגיד בפועל כשאתם שם.
</p>
```

- [ ] **Step 2: Add empty state**

When filtered articles are empty, render:

```tsx
<div className="mx-auto max-w-xl rounded-2xl border border-stone-200 bg-white p-8 text-center" dir="rtl">
  <h2 className="text-2xl font-bold text-stone-950">אין מאמרים בקטגוריה הזאת כרגע</h2>
  <p className="mt-3 text-stone-600">
    אפשר להתחיל מהקורס ולחזור למדריכים כשנוסיף תוכן חדש.
  </p>
  <Link href="/interactive-lessons">
    <Button className="mt-5 rounded-xl bg-stone-950 text-white hover:bg-stone-800">
      התחילו שיעור חינם
    </Button>
  </Link>
</div>
```

- [ ] **Step 3: Build**

Run:

```bash
pnpm build
```

Expected: build succeeds.

- [ ] **Step 4: Commit**

Run:

```bash
git add client/src/pages/Articles.tsx
git commit -m "feat: align articles with course funnel"
```

---

### Task 10: Full Verification And Deploy Prep

**Files:**

- No planned source edits unless verification finds regressions.

- [ ] **Step 1: Run unit tests**

Run:

```bash
pnpm test
```

Expected: PASS for `courseAccess` and Stripe product/currency tests.

- [ ] **Step 2: Run production build**

Run:

```bash
pnpm build
```

Expected: build succeeds. Existing Vite token-replacement warnings are acceptable only if unchanged from before this plan.

- [ ] **Step 3: Run TypeScript check and record known debt**

Run:

```bash
pnpm check
```

Expected: existing TypeScript errors may remain. Do not fix unrelated TypeScript debt in this task. Record whether this plan introduced any new errors in touched files.

- [ ] **Step 4: Start local dev server**

Run:

```bash
PORT=3016 npm run dev
```

Expected: server prints `Server running on http://localhost:3016/`.

- [ ] **Step 5: Browser smoke test desktop**

Open `http://localhost:3016/` and verify:

- Homepage says Thai speaking course for Israeli tourists.
- Primary CTA goes to `/login`.
- Unlock CTA goes to `/welcome-kit`.
- Sample phrase audio button triggers browser speech or fails gracefully.
- No framework error overlay.

- [ ] **Step 6: Browser smoke test course flow**

Open `http://localhost:3016/interactive-lessons` and verify:

- Logged-out user clicking a lesson is sent to `/login?redirect=/interactive-lessons`.
- Free lessons are visually available.
- Paid lessons are visually locked.
- Unlock panel links to `/welcome-kit`.

- [ ] **Step 7: Browser smoke test auth flow**

Use a unique test email:

```text
course-test+<timestamp>@example.com
```

Verify:

- Register with password of at least 8 characters.
- After signup, user lands on `/interactive-lessons`.
- Profile page shows free account state.
- Logout still works if surfaced by existing UI.

- [ ] **Step 8: Browser smoke test unlock page**

Open `http://localhost:3016/welcome-kit` and verify:

- Page sells one product: Tourist Survival Thai Course.
- No unverified `5,000+`, `4.9`, fake testimonial, or best-seller copy remains.
- Logged-out purchase sends user to `/login?redirect=/welcome-kit`.
- Logged-in purchase starts Stripe checkout when Stripe env is configured; if local Stripe env is absent, the UI shows the existing error toast.

- [ ] **Step 9: Mobile viewport check**

At 375px width, verify:

- Homepage headline wraps without clipping.
- Navbar controls do not overlap.
- Course cards do not cause horizontal scroll.
- Auth form fits the viewport.
- Unlock page CTAs fit on one or two clean lines.

- [ ] **Step 10: Final git status**

Run:

```bash
git status --short
```

Expected: only intentional commits from this plan plus pre-existing deployment-fix changes remain.

Do not commit unrelated pre-existing deployment-fix changes unless the user explicitly asks.
