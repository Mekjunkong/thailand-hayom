# Super-App UI Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform Thailand Hayom's homepage from a newspaper editorial layout into a Grab/LINE-style super-app dashboard with quick-action grid, learning progress card, and unified content feed.

**Architecture:** Only the homepage (`Home.tsx`) and navbar (`Navbar.tsx`) are rewritten. Six new components are created. Existing API endpoints and context providers are reused. No backend changes required.

**Tech Stack:** React 19, TailwindCSS v4, Framer Motion, Wouter, tRPC, Radix UI (shadcn), lucide-react icons.

**Design doc:** `docs/plans/2026-03-01-super-app-ui-redesign-design.md`

---

## Task 1: QuickActionCard Component

**Files:**
- Create: `client/src/components/QuickActionCard.tsx`

**Step 1: Create the component**

```tsx
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import type { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  href: string;
  icon: LucideIcon;
  labelEn: string;
  labelHe: string;
  tintBg: string;    // e.g. "bg-red-50"
  tintText: string;  // e.g. "text-red-500"
}

export default function QuickActionCard({
  href,
  icon: Icon,
  labelEn,
  labelHe,
  tintBg,
  tintText,
}: QuickActionCardProps) {
  const { language } = useLanguage();

  return (
    <Link href={href}>
      <div
        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer ${tintBg}`}
      >
        <Icon className={`h-7 w-7 ${tintText}`} />
        <span className="text-xs font-medium text-gray-700 text-center leading-tight">
          {language === "he" ? labelHe : labelEn}
        </span>
      </div>
    </Link>
  );
}
```

**Step 2: Verify no TypeScript errors**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && pnpm check`

**Step 3: Commit**

```bash
git add client/src/components/QuickActionCard.tsx
git commit -m "feat: add QuickActionCard component for super-app dashboard"
```

---

## Task 2: QuickActionGrid Component

**Files:**
- Create: `client/src/components/QuickActionGrid.tsx`

**Step 1: Create the grid component**

```tsx
import {
  ShieldAlert,
  MessageCircle,
  MapPin,
  GraduationCap,
  FileText,
  Calendar,
} from "lucide-react";
import QuickActionCard from "./QuickActionCard";

const actions = [
  {
    href: "/emergency",
    icon: ShieldAlert,
    labelEn: "Emergency",
    labelHe: "חירום",
    tintBg: "bg-red-50",
    tintText: "text-red-500",
  },
  {
    href: "/pronunciation",
    icon: MessageCircle,
    labelEn: "Phrases",
    labelHe: "ביטויים",
    tintBg: "bg-amber-50",
    tintText: "text-amber-500",
  },
  {
    href: "/trips/chiang-mai-one-day",
    icon: MapPin,
    labelEn: "Map",
    labelHe: "מפה",
    tintBg: "bg-teal-50",
    tintText: "text-teal-500",
  },
  {
    href: "/interactive-lessons",
    icon: GraduationCap,
    labelEn: "Lessons",
    labelHe: "שיעורים",
    tintBg: "bg-blue-50",
    tintText: "text-blue-500",
  },
  {
    href: "/articles?category=visa",
    icon: FileText,
    labelEn: "Visa",
    labelHe: "ויזה",
    tintBg: "bg-indigo-50",
    tintText: "text-indigo-500",
  },
  {
    href: "/articles?category=events",
    icon: Calendar,
    labelEn: "Events",
    labelHe: "אירועים",
    tintBg: "bg-violet-50",
    tintText: "text-violet-500",
  },
];

export default function QuickActionGrid() {
  return (
    <section className="px-4 pt-6 pb-2">
      <div className="max-w-lg mx-auto grid grid-cols-3 gap-3 md:gap-4">
        {actions.map(action => (
          <QuickActionCard key={action.href} {...action} />
        ))}
      </div>
    </section>
  );
}
```

**Step 2: Verify no TypeScript errors**

Run: `pnpm check`

**Step 3: Commit**

```bash
git add client/src/components/QuickActionGrid.tsx
git commit -m "feat: add QuickActionGrid with 6 quick-action cards"
```

---

## Task 3: LearningProgressCard Component

**Files:**
- Create: `client/src/components/LearningProgressCard.tsx`

**Context:** Uses `useProgress()` from `client/src/contexts/ProgressContext.tsx`. The context stores `completedLessons: number[]`, `streak: number`, and provides `getCompletionPercentage()`. The `lessonsData` array from `client/src/data/lessonsData.ts` has 30 lessons, each with `id`, `title`, `titleHebrew`, `icon`.

**Step 1: Create the component**

```tsx
import { Link } from "wouter";
import { Flame, GraduationCap, ArrowRight, Trophy } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProgress } from "@/contexts/ProgressContext";
import { lessonsData } from "@/data/lessonsData";
import { Progress } from "@/components/ui/progress";

export default function LearningProgressCard() {
  const { language, t } = useLanguage();
  const { progress, getCompletionPercentage } = useProgress();

  const percentage = getCompletionPercentage();
  const completedCount = progress.completedLessons.length;
  const totalLessons = lessonsData.length;

  // Find the next incomplete lesson
  const nextLesson = lessonsData.find(
    lesson => !progress.completedLessons.includes(lesson.id),
  );

  const allComplete = completedCount >= totalLessons;

  return (
    <section className="px-4 py-2">
      <div className="max-w-lg mx-auto">
        <Link href="/interactive-lessons">
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-5 cursor-pointer">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-500" />
                <h3 className="text-sm font-semibold text-gray-900">
                  {t({
                    he: allComplete ? "כל הכבוד!" : "המשך ללמוד",
                    en: allComplete ? "Well done!" : "Continue Learning",
                  })}
                </h3>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </div>

            {allComplete ? (
              /* All complete state */
              <div className="flex items-center gap-3">
                <Trophy className="h-8 w-8 text-amber-500" />
                <p className="text-sm text-gray-600">
                  {t({
                    he: `סיימת את כל ${totalLessons} השיעורים! חזור לתרגל.`,
                    en: `You've completed all ${totalLessons} lessons! Review anytime.`,
                  })}
                </p>
              </div>
            ) : nextLesson ? (
              /* In-progress or new user */
              <>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl" role="img">
                    {nextLesson.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {language === "he"
                        ? nextLesson.titleHebrew
                        : nextLesson.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t({
                        he: `שיעור ${nextLesson.id} מתוך ${totalLessons}`,
                        en: `Lesson ${nextLesson.id} of ${totalLessons}`,
                      })}
                    </p>
                  </div>

                  {/* Streak badge */}
                  {progress.streak > 0 && (
                    <div className="flex items-center gap-1 bg-orange-50 px-2.5 py-1 rounded-full">
                      <Flame className="h-3.5 w-3.5 text-orange-500" />
                      <span className="text-xs font-semibold text-orange-600">
                        {progress.streak}
                      </span>
                    </div>
                  )}
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-3">
                  <Progress value={percentage} className="h-2 flex-1" />
                  <span className="text-xs font-medium text-gray-500 w-10 text-right">
                    {percentage}%
                  </span>
                </div>
              </>
            ) : (
              /* Fallback — start learning */
              <p className="text-sm text-gray-600">
                {t({
                  he: "התחל ללמוד תאילנדית עכשיו!",
                  en: "Start learning Thai now!",
                })}
              </p>
            )}
          </div>
        </Link>
      </div>
    </section>
  );
}
```

**Step 2: Verify no TypeScript errors**

Run: `pnpm check`

**Step 3: Commit**

```bash
git add client/src/components/LearningProgressCard.tsx
git commit -m "feat: add LearningProgressCard with progress, streak, and 3 states"
```

---

## Task 4: ContentFeedCard Component

**Files:**
- Create: `client/src/components/ContentFeedCard.tsx`

**Context:** Displays a single article in a compact horizontal layout (image left, text right). Used inside the ContentFeed. Article data shape comes from `trpc.article.list` which returns `{ id, title, titleHe, slug, excerpt, excerptHe, category, coverImage, isPremium, views, publishedAt, createdAt }`.

**Step 1: Create the component**

```tsx
import { Link } from "wouter";
import { Lock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCategoryByArticleCategory } from "@/data/categories";

interface ContentFeedCardProps {
  slug: string;
  title: string;
  titleHe: string;
  excerpt?: string | null;
  excerptHe?: string | null;
  category: string;
  coverImage?: string | null;
  isPremium?: boolean;
  publishedAt?: string | Date | null;
  createdAt: string | Date;
}

export default function ContentFeedCard({
  slug,
  title,
  titleHe,
  excerpt,
  excerptHe,
  category,
  coverImage,
  isPremium,
  publishedAt,
  createdAt,
}: ContentFeedCardProps) {
  const { language } = useLanguage();
  const cat = getCategoryByArticleCategory(category);

  const displayTitle = language === "he" ? titleHe : title;
  const displayExcerpt = language === "he" ? excerptHe : excerpt;

  const dateStr = new Date(publishedAt || createdAt).toLocaleDateString(
    language === "he" ? "he-IL" : "en-US",
    { month: "short", day: "numeric" },
  );

  return (
    <Link href={`/articles/${slug}`}>
      <div className="flex gap-4 p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
        {/* Thumbnail */}
        <div className="flex-shrink-0 w-[100px] h-[75px] rounded-lg overflow-hidden">
          {coverImage ? (
            <img
              src={coverImage}
              alt={displayTitle}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${cat?.gradientFrom ?? "from-blue-400"} ${cat?.gradientTo ?? "to-teal-400"}`}
            />
          )}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {cat && (
              <span className={`text-[10px] font-semibold ${cat.textColor}`}>
                {language === "he" ? cat.nameHe : cat.nameEn}
              </span>
            )}
            <span className="text-[10px] text-gray-400">{dateStr}</span>
            {isPremium && (
              <Lock className="h-3 w-3 text-amber-500" />
            )}
          </div>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
            {displayTitle}
          </h3>
          {displayExcerpt && (
            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
              {displayExcerpt}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
```

**Step 2: Verify no TypeScript errors**

Run: `pnpm check`

**Step 3: Commit**

```bash
git add client/src/components/ContentFeedCard.tsx
git commit -m "feat: add ContentFeedCard for compact article display in feed"
```

---

## Task 5: ContentFeed Component

**Files:**
- Create: `client/src/components/ContentFeed.tsx`

**Context:** Fetches articles via `trpc.article.list` with page-based pagination. Uses category filter pills. The article list endpoint accepts `{ page, limit, category, search, isPremium, isPublished }` and returns `{ articles, total, page, limit }`. Categories available from `client/src/data/categories.ts`.

**Step 1: Create the component**

```tsx
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { categories } from "@/data/categories";
import ContentFeedCard from "./ContentFeedCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function ContentFeed() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Map category ID → articleCategory value for the query
  const articleCategory = activeCategory
    ? categories.find(c => c.id === activeCategory)?.articleCategory
    : undefined;

  const { data, isLoading } = trpc.article.list.useQuery({
    page,
    limit,
    category: articleCategory,
    isPublished: true,
    isPremium: activeCategory === "premium" ? true : undefined,
  });

  const filterPills = [
    { id: null, labelEn: "All", labelHe: "הכל" },
    ...categories
      .filter(c => c.id !== "lessons") // lessons aren't in the article feed
      .map(c => ({ id: c.id, labelEn: c.nameEn, labelHe: c.nameHe })),
  ];

  const handleCategoryChange = (catId: string | null) => {
    setActiveCategory(catId);
    setPage(1);
  };

  const totalPages = data ? Math.ceil(data.total / limit) : 1;

  return (
    <section className="px-4 py-4">
      <div className="max-w-lg mx-auto">
        {/* Category filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
          {filterPills.map(pill => (
            <button
              key={pill.id ?? "all"}
              onClick={() => handleCategoryChange(pill.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeCategory === pill.id
                  ? "bg-slate-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {language === "he" ? pill.labelHe : pill.labelEn}
            </button>
          ))}
        </div>

        {/* Feed cards */}
        <div className="space-y-2">
          {isLoading ? (
            Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="flex gap-4 p-3">
                <Skeleton className="w-[100px] h-[75px] rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            ))
          ) : data?.articles?.length ? (
            data.articles.map(article => (
              <ContentFeedCard
                key={article.id}
                slug={article.slug}
                title={article.title}
                titleHe={article.titleHe}
                excerpt={article.excerpt}
                excerptHe={article.excerptHe}
                category={article.category}
                coverImage={article.coverImage}
                isPremium={article.isPremium}
                publishedAt={article.publishedAt}
                createdAt={article.createdAt}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-400 text-sm">
              {t({ he: "אין מאמרים עדיין", en: "No articles yet" })}
            </div>
          )}
        </div>

        {/* Load more */}
        {data && totalPages > 1 && page < totalPages && (
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage(p => p + 1)}
              className="text-sm text-gray-500"
            >
              {t({ he: "טען עוד", en: "Load more" })}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
```

**Step 2: Verify no TypeScript errors**

Run: `pnpm check`

**Step 3: Commit**

```bash
git add client/src/components/ContentFeed.tsx
git commit -m "feat: add ContentFeed with category filter pills and article list"
```

---

## Task 6: SearchOverlay Component

**Files:**
- Create: `client/src/components/SearchOverlay.tsx`

**Context:** Full-screen overlay triggered from the navbar search icon. Uses `trpc.article.list` with the `search` parameter. Closes on escape key or clicking the X button.

**Step 1: Create the component**

```tsx
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Search, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { data } = trpc.article.list.useQuery(
    { page: 1, limit: 8, search: query, isPublished: true },
    { enabled: query.length >= 2 },
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex flex-col">
      {/* Search bar */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t({ he: "חפש מאמרים...", en: "Search articles..." })}
          className="flex-1 text-lg bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
        />
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {query.length < 2 ? (
          <p className="text-center text-gray-400 text-sm mt-8">
            {t({
              he: "הקלד לפחות 2 תווים לחיפוש",
              en: "Type at least 2 characters to search",
            })}
          </p>
        ) : data?.articles?.length ? (
          <div className="space-y-1 max-w-lg mx-auto">
            {data.articles.map(article => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                onClick={onClose}
              >
                <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {language === "he" ? article.titleHe : article.title}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {article.category}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-sm mt-8">
            {t({ he: "לא נמצאו תוצאות", en: "No results found" })}
          </p>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Verify no TypeScript errors**

Run: `pnpm check`

**Step 3: Commit**

```bash
git add client/src/components/SearchOverlay.tsx
git commit -m "feat: add SearchOverlay for full-screen article search"
```

---

## Task 7: Redesign Navbar

**Files:**
- Modify: `client/src/components/Navbar.tsx`

**Context:** Currently has desktop nav links, a language toggle, and a mobile hamburger menu via Sheet. The redesign removes all nav links and the hamburger, keeping: logo (left), search icon, HE/EN toggle, and profile avatar (right). Adds search overlay integration.

**Step 1: Rewrite the navbar**

Replace the entire file content of `client/src/components/Navbar.tsx` with:

```tsx
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Search, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SearchOverlay from "./SearchOverlay";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-1.5 cursor-pointer">
                <span className="text-lg">🇹🇭</span>
                <span
                  className="text-lg font-bold text-gray-900"
                  style={{
                    fontFamily:
                      language === "he"
                        ? "Assistant, sans-serif"
                        : "Playfair Display, serif",
                  }}
                >
                  {t({ he: "תאילנד היום", en: "Thailand Hayom" })}
                </span>
              </div>
            </Link>

            {/* Right cluster */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label={t({ he: "חיפוש", en: "Search" })}
              >
                <Search className="h-5 w-5 text-gray-600" />
              </button>

              {/* Language Toggle */}
              <div className="flex gap-0.5 bg-gray-100 rounded-full p-0.5">
                <button
                  onClick={() => setLanguage("he")}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
                    language === "he"
                      ? "bg-slate-800 text-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  title="עברית"
                >
                  HE
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
                    language === "en"
                      ? "bg-slate-800 text-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  title="English"
                >
                  EN
                </button>
              </div>

              {/* Profile */}
              <Link href="/profile">
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label={t({ he: "פרופיל", en: "Profile" })}
                >
                  <User className="h-5 w-5 text-gray-600" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Search overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
```

**Step 2: Verify no TypeScript errors**

Run: `pnpm check`

**Step 3: Commit**

```bash
git add client/src/components/Navbar.tsx
git commit -m "feat: redesign navbar to minimal utility bar (logo, search, lang, profile)"
```

---

## Task 8: Redesign Homepage

**Files:**
- Modify: `client/src/pages/Home.tsx`

**Context:** Currently imports: NewsTicker, LeadStoryBlock, CategoryPillNav, CategorySection, ThailandMap, ScrollReveal, CompactPremiumBanner. Redesign replaces all of those with: QuickActionGrid, LearningProgressCard, ContentFeed, and slim newsletter + premium sections.

**Important:** The `ProgressProvider` must wrap the homepage for `LearningProgressCard` to work. Check `App.tsx` — if it's not already in the provider tree, it needs to be added. Currently `ProgressProvider` is NOT in `App.tsx`, it's only used inside the `InteractiveLessons` page. We need to lift it to `App.tsx`.

**Step 1: Add ProgressProvider to App.tsx**

In `client/src/App.tsx`, add the ProgressProvider import and wrap it around the Router:

```tsx
// Add import at top:
import { ProgressProvider } from "./contexts/ProgressContext";

// Wrap in the App function — add ProgressProvider inside ThemeProvider:
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <ProgressProvider>
          <TooltipProvider>
            <Toaster />
            <ScrollToTop />
            <Navbar />
            <Router />
            <AIConcierge />
          </TooltipProvider>
        </ProgressProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
```

**Step 2: Rewrite Home.tsx**

Replace the entire content of `client/src/pages/Home.tsx`:

```tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check, Crown, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import QuickActionGrid from "@/components/QuickActionGrid";
import LearningProgressCard from "@/components/LearningProgressCard";
import ContentFeed from "@/components/ContentFeed";

export default function Home() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Premium status check
  const { data: user } = trpc.auth.me.useQuery();
  const { data: subStatus } = trpc.stripe.getSubscriptionStatus.useQuery(
    undefined,
    { enabled: !!user },
  );
  const isPremium = subStatus?.tier === "premium";

  // Newsletter subscribe
  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: data => {
      if (data.success) {
        setSubscribed(true);
        setEmail("");
        toast.success(
          t({ he: "נרשמת בהצלחה!", en: "Successfully subscribed!" }),
        );
        setTimeout(() => setSubscribed(false), 3000);
      } else {
        toast.info(t({ he: "כבר רשום", en: "Already subscribed" }));
      }
    },
    onError: () => {
      toast.error(t({ he: "שגיאה בהרשמה", en: "Subscription failed" }));
    },
  });

  // Premium checkout
  const subscriptionCheckout =
    trpc.stripe.createSubscriptionCheckout.useMutation({
      onSuccess: data => {
        if (data.url) window.location.href = data.url;
      },
      onError: error => {
        if (error.message.includes("UNAUTHORIZED")) {
          toast.error(
            t({
              he: "יש להתחבר כדי להירשם",
              en: "Please log in to subscribe",
            }),
          );
        } else {
          toast.error(
            t({ he: "שגיאה", en: "Error creating subscription" }),
          );
        }
      },
    });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    subscribeMutation.mutate({ email });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-14">
      {/* Quick Actions */}
      <QuickActionGrid />

      {/* Learning Progress */}
      <LearningProgressCard />

      {/* Content Feed */}
      <ContentFeed />

      {/* Compact Newsletter CTA */}
      <section className="px-4 py-6">
        <div className="max-w-lg mx-auto bg-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white mb-2 text-center">
            {t({ he: "הישאר מעודכן", en: "Stay Updated" })}
          </h3>
          <form
            onSubmit={handleSubscribe}
            className="flex gap-2"
          >
            <Input
              type="email"
              placeholder={t({ he: "המייל שלך", en: "Your email" })}
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 px-3 py-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-xl text-sm"
              required
            />
            <Button
              type="submit"
              size="sm"
              disabled={subscribeMutation.isPending}
              className="px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm"
            >
              <Mail className="h-4 w-4" />
            </Button>
          </form>
          {subscribed && (
            <p className="text-green-400 text-xs mt-2 text-center flex items-center justify-center gap-1">
              <Check className="h-3 w-3" />
              {t({ he: "נרשמת!", en: "Subscribed!" })}
            </p>
          )}
          <p className="text-[10px] text-gray-500 text-center mt-2">
            {t({ he: "הצטרף ל-5,000+ מנויים", en: "Join 5,000+ subscribers" })}
          </p>
        </div>
      </section>

      {/* Slim Premium Banner (conditional) */}
      {!isPremium && (
        <section className="px-4 pb-8">
          <div className="max-w-lg mx-auto">
            <button
              onClick={() =>
                subscriptionCheckout.mutate({ plan: "MONTHLY" })
              }
              disabled={subscriptionCheckout.isPending}
              className="w-full flex items-center justify-between bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl px-5 py-4 hover:opacity-95 transition-opacity"
            >
              <div className="flex items-center gap-3">
                <Crown className="h-5 w-5 text-white" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">
                    {t({ he: "שדרג לפרימיום", en: "Unlock Premium" })}
                  </p>
                  <p className="text-xs text-white/80">
                    {t({
                      he: "₪29/חודש — 150+ מאמרים בלעדיים",
                      en: "₪29/month — 150+ exclusive articles",
                    })}
                  </p>
                </div>
              </div>
              <Sparkles className="h-5 w-5 text-white" />
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
```

**Step 3: Verify no TypeScript errors**

Run: `pnpm check`

**Step 4: Commit**

```bash
git add client/src/pages/Home.tsx client/src/App.tsx
git commit -m "feat: redesign homepage as super-app dashboard with quick actions, learning card, and feed"
```

---

## Task 9: Verify & Adjust RTL Support

**Files:**
- Possibly modify: any of the new components if RTL layout breaks

**Context:** The app supports Hebrew (RTL) via `document.documentElement.dir` set in `LanguageContext.tsx`. Tailwind's RTL support means `flex-row` becomes `flex-row-reverse` in RTL mode. Check that the new layout works in both directions.

**Step 1: Visual check**

Run: `pnpm dev`

1. Open `http://localhost:3000` in the browser
2. Toggle between HE and EN using the navbar
3. Verify:
   - Quick action grid renders correctly in both directions
   - Learning progress card text alignment is correct
   - Content feed cards (image left, text right) flip properly in RTL
   - Search overlay input aligns correctly
   - Navbar logo/controls are on correct sides
   - Filter pills scroll correctly

**Step 2: Fix any RTL issues found**

Common fixes:
- Replace `mr-*` with `me-*` (margin-end) and `ml-*` with `ms-*` (margin-start)
- Replace `text-left` with `text-start` and `text-right` with `text-end`
- Check flex `gap` is working (it's direction-agnostic, which is good)

**Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: adjust RTL layout for super-app dashboard components"
```

---

## Task 10: Clean Up Unused Imports

**Files:**
- Check: `client/src/pages/Home.tsx` — ensure no old imports remain
- Check: `client/src/components/Navbar.tsx` — ensure Sheet/navLinks imports are removed
- Verify: `NewsTicker.tsx`, `LeadStoryBlock.tsx`, `CategoryPillNav.tsx`, `CategorySection.tsx`, `CompactPremiumBanner.tsx`, `ThailandMap.tsx` are no longer imported anywhere critical (they're still used in other pages or can be kept for reference)

**Step 1: Verify no unused imports cause build warnings**

Run: `pnpm build`

Expected: Build succeeds with no errors.

**Step 2: Commit if any cleanup was needed**

```bash
git add -A
git commit -m "chore: clean up unused imports after homepage redesign"
```

---

## Summary

| Task | Component | Action |
|------|-----------|--------|
| 1 | QuickActionCard | Create |
| 2 | QuickActionGrid | Create |
| 3 | LearningProgressCard | Create |
| 4 | ContentFeedCard | Create |
| 5 | ContentFeed | Create |
| 6 | SearchOverlay | Create |
| 7 | Navbar | Rewrite |
| 8 | Home + App.tsx | Rewrite + modify |
| 9 | RTL verification | Test + fix |
| 10 | Cleanup | Verify build |

**Total new files:** 6
**Modified files:** 3 (Navbar.tsx, Home.tsx, App.tsx)
**Deleted files:** 0 (old components kept for other pages)
