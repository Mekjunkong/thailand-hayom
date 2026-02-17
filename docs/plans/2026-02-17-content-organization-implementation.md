# Content Organization Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform Thailand Hayom into a category-first content hub with unified card components, color-coded categories, and consistent listing pages.

**Architecture:** Create a shared category data module, then build reusable components (ContentCard, CategoryGrid, CategoryHeader, FilterBar) bottom-up. Refactor pages (Home, Articles, Lessons) to use the new components. No backend changes needed.

**Tech Stack:** React 19, TailwindCSS v4, Wouter, Lucide icons, Framer Motion, tRPC (existing queries)

---

### Task 1: Create Category Data Module

**Files:**
- Create: `client/src/data/categories.ts`

**Step 1: Create the category definitions file**

This is the single source of truth for all category metadata — colors, icons, names, routes.

```typescript
import {
  BookOpen,
  Map,
  UtensilsCrossed,
  FileText,
  Calendar,
  Shield,
  Crown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Category {
  id: string;
  nameEn: string;
  nameHe: string;
  descriptionEn: string;
  descriptionHe: string;
  color: string; // Tailwind bg class
  textColor: string; // Tailwind text class
  borderColor: string; // Tailwind border class
  gradientFrom: string;
  gradientTo: string;
  icon: LucideIcon;
  route: string;
  articleCategory?: string; // Maps to DB article.category value
}

export const categories: Category[] = [
  {
    id: "lessons",
    nameEn: "Thai Lessons",
    nameHe: "שיעורי תאילנדית",
    descriptionEn: "30 interactive lessons with audio pronunciation",
    descriptionHe: "30 שיעורים אינטראקטיביים עם הגייה אודיו",
    color: "bg-amber-500",
    textColor: "text-amber-500",
    borderColor: "border-amber-500",
    gradientFrom: "from-amber-500",
    gradientTo: "to-yellow-400",
    icon: BookOpen,
    route: "/interactive-lessons",
  },
  {
    id: "travel",
    nameEn: "Travel Guides",
    nameHe: "מדריכי טיולים",
    descriptionEn: "Destination guides, tips, and hidden gems",
    descriptionHe: "מדריכים ליעדים, טיפים ומקומות מוסתרים",
    color: "bg-teal-500",
    textColor: "text-teal-500",
    borderColor: "border-teal-500",
    gradientFrom: "from-teal-500",
    gradientTo: "to-emerald-400",
    icon: Map,
    route: "/articles?category=attractions",
    articleCategory: "attractions",
  },
  {
    id: "food",
    nameEn: "Food & Dining",
    nameHe: "אוכל ומסעדות",
    descriptionEn: "Restaurant guides, street food, and recipes",
    descriptionHe: "מדריכי מסעדות, אוכל רחוב ומתכונים",
    color: "bg-rose-500",
    textColor: "text-rose-500",
    borderColor: "border-rose-500",
    gradientFrom: "from-rose-500",
    gradientTo: "to-pink-400",
    icon: UtensilsCrossed,
    route: "/articles?category=food",
    articleCategory: "food",
  },
  {
    id: "visa",
    nameEn: "Visa & Practical",
    nameHe: "ויזה ומידע מעשי",
    descriptionEn: "Visa updates, banking, SIM cards, and logistics",
    descriptionHe: "עדכוני ויזה, בנקאות, כרטיסי סים ולוגיסטיקה",
    color: "bg-blue-500",
    textColor: "text-blue-500",
    borderColor: "border-blue-500",
    gradientFrom: "from-blue-500",
    gradientTo: "to-sky-400",
    icon: FileText,
    route: "/articles?category=visa",
    articleCategory: "visa",
  },
  {
    id: "events",
    nameEn: "Events",
    nameHe: "אירועים",
    descriptionEn: "Local events, festivals, and community gatherings",
    descriptionHe: "אירועים מקומיים, פסטיבלים ומפגשים קהילתיים",
    color: "bg-violet-500",
    textColor: "text-violet-500",
    borderColor: "border-violet-500",
    gradientFrom: "from-violet-500",
    gradientTo: "to-purple-400",
    icon: Calendar,
    route: "/articles?category=events",
    articleCategory: "events",
  },
  {
    id: "safety",
    nameEn: "Safety",
    nameHe: "בטיחות",
    descriptionEn: "Emergency info, scam alerts, and safety tips",
    descriptionHe: "מידע חירום, התראות הונאה וטיפים לבטיחות",
    color: "bg-orange-500",
    textColor: "text-orange-500",
    borderColor: "border-orange-500",
    gradientFrom: "from-orange-500",
    gradientTo: "to-amber-400",
    icon: Shield,
    route: "/articles?category=safety",
    articleCategory: "safety",
  },
  {
    id: "premium",
    nameEn: "Premium",
    nameHe: "פרימיום",
    descriptionEn: "Exclusive guides, insider tips, and discounts",
    descriptionHe: "מדריכים בלעדיים, טיפים פנימיים והנחות",
    color: "bg-gradient-to-r from-amber-500 to-yellow-400",
    textColor: "text-amber-600",
    borderColor: "border-amber-400",
    gradientFrom: "from-amber-500",
    gradientTo: "to-yellow-400",
    icon: Crown,
    route: "/articles?premium=true",
  },
];

/** Look up a category by its id */
export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id);
}

/** Look up a category by its article DB category value */
export function getCategoryByArticleCategory(
  articleCategory: string,
): Category | undefined {
  return categories.find(c => c.articleCategory === articleCategory);
}
```

**Step 2: Verify the file compiles**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: no errors related to `categories.ts`

**Step 3: Commit**

```bash
git add client/src/data/categories.ts
git commit -m "feat: add category data module with colors, icons, and routes"
```

---

### Task 2: Create ContentCard Component

**Files:**
- Create: `client/src/components/ContentCard.tsx`

**Step 1: Create the unified content card**

This replaces `ArticleCard` and the lesson cards from `InteractiveLessons.tsx`. It has three variants: article, lesson, event.

```tsx
import { Link } from "wouter";
import { Calendar, Eye, BookOpen, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Progress } from "@/components/ui/progress";
import { getCategoryByArticleCategory, type Category } from "@/data/categories";

interface ContentCardArticle {
  variant: "article";
  id: number;
  title: string;
  titleHe: string;
  excerpt?: string | null;
  excerptHe?: string | null;
  category: string;
  coverImage?: string | null;
  isPremium?: boolean;
  publishedAt?: Date | null;
  createdAt?: Date;
  views?: number | null;
  slug: string;
}

interface ContentCardLesson {
  variant: "lesson";
  id: number;
  title: string;
  titleHe: string;
  icon: string;
  phraseCount: number;
  progress?: number; // 0-100
  isCompleted?: boolean;
}

interface ContentCardEvent {
  variant: "event";
  id: number;
  title: string;
  titleHe: string;
  excerpt?: string | null;
  excerptHe?: string | null;
  coverImage?: string | null;
  date: Date;
  location?: string;
  isOpen?: boolean;
}

type ContentCardProps = ContentCardArticle | ContentCardLesson | ContentCardEvent;

function CategoryBadge({ category }: { category: Category | undefined }) {
  const { language } = useLanguage();
  if (!category) return null;

  return (
    <span
      className={`absolute top-3 left-3 ${category.color} text-white text-xs font-semibold px-3 py-1 rounded-full z-10`}
    >
      {language === "he" ? category.nameHe : category.nameEn}
    </span>
  );
}

function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      <div className="aspect-video bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-20" />
        <div className="h-5 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}

export { CardSkeleton };

export default function ContentCard(props: ContentCardProps) {
  const { language, t } = useLanguage();

  if (props.variant === "article") {
    return <ArticleVariant {...props} />;
  }
  if (props.variant === "lesson") {
    return <LessonVariant {...props} />;
  }
  return <EventVariant {...props} />;
}

function ArticleVariant(props: ContentCardArticle) {
  const { language, t } = useLanguage();
  const category = getCategoryByArticleCategory(props.category);

  const title = language === "he" ? props.titleHe : props.title;
  const excerpt =
    language === "he" ? (props.excerptHe ?? props.excerpt) : props.excerpt;

  return (
    <Link href={`/articles/${props.slug}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden cursor-pointer group">
        {/* Image */}
        <div className="relative aspect-video bg-gray-100 overflow-hidden">
          <CategoryBadge category={category} />
          {props.isPremium && (
            <span className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
              {t({ he: "פרימיום", en: "Premium" })}
            </span>
          )}
          {props.coverImage ? (
            <img
              src={props.coverImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${category?.gradientFrom ?? "from-blue-400"} ${category?.gradientTo ?? "to-teal-400"}`}
            />
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-gray-700 transition-colors">
            {title}
          </h3>
          {excerpt && (
            <p className="text-sm text-gray-500 line-clamp-2 mb-3">
              {excerpt}
            </p>
          )}
          <div className="flex items-center gap-3 text-xs text-gray-400">
            {props.publishedAt && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(props.publishedAt).toLocaleDateString(
                  language === "he" ? "he-IL" : "en-US",
                  { month: "short", day: "numeric" },
                )}
              </span>
            )}
            {props.views != null && props.views > 0 && (
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {props.views.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

function LessonVariant(props: ContentCardLesson) {
  const { language, t } = useLanguage();

  const title = language === "he" ? props.titleHe : props.title;

  return (
    <Link href={`/lesson/${props.id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden cursor-pointer group">
        {/* Icon header */}
        <div className="relative aspect-video bg-gradient-to-br from-amber-50 to-yellow-50 flex items-center justify-center overflow-hidden">
          <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
            {t({ he: "שיעור", en: "Lesson" })} {props.id}
          </span>
          {props.isCompleted && (
            <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
              {t({ he: "הושלם", en: "Done" })}
            </span>
          )}
          <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
            {props.icon}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-gray-700 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mb-3">
            {props.phraseCount} {t({ he: "ביטויים", en: "phrases" })}
          </p>
          {props.progress != null && props.progress > 0 && (
            <Progress value={props.progress} className="h-2" />
          )}
        </div>
      </div>
    </Link>
  );
}

function EventVariant(props: ContentCardEvent) {
  const { language, t } = useLanguage();

  const title = language === "he" ? props.titleHe : props.title;
  const excerpt =
    language === "he" ? (props.excerptHe ?? props.excerpt) : props.excerpt;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden cursor-pointer group">
      {/* Image */}
      <div className="relative aspect-video bg-gradient-to-br from-violet-100 to-purple-50 overflow-hidden">
        <span className="absolute top-3 left-3 bg-violet-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
          {t({ he: "אירוע", en: "Event" })}
        </span>
        {props.isOpen && (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            {t({ he: "הרשמה פתוחה", en: "Open" })}
          </span>
        )}
        {props.coverImage ? (
          <img
            src={props.coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Calendar className="w-16 h-16 text-violet-300" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-gray-700 transition-colors">
          {title}
        </h3>
        {excerpt && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">{excerpt}</p>
        )}
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {new Date(props.date).toLocaleDateString(
              language === "he" ? "he-IL" : "en-US",
              { month: "short", day: "numeric", year: "numeric" },
            )}
          </span>
          {props.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {props.location}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Verify the file compiles**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: no errors related to `ContentCard.tsx`

**Step 3: Commit**

```bash
git add client/src/components/ContentCard.tsx
git commit -m "feat: add unified ContentCard component with article, lesson, event variants"
```

---

### Task 3: Create CategoryGrid Component (Homepage Hub)

**Files:**
- Create: `client/src/components/CategoryGrid.tsx`

**Step 1: Create the category grid hub for the homepage**

This is the main navigation surface — a 2x3 grid of color-coded category cards.

```tsx
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { categories } from "@/data/categories";
import ScrollReveal from "@/components/ScrollReveal";

export default function CategoryGrid() {
  const { language } = useLanguage();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {categories.map((cat, index) => (
            <ScrollReveal key={cat.id} delay={index * 0.05}>
              <Link href={cat.route}>
                <div
                  className={`${cat.color} rounded-2xl p-6 md:p-8 cursor-pointer group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[160px] md:min-h-[200px] flex flex-col justify-between`}
                >
                  <div>
                    <cat.icon className="w-8 h-8 md:w-10 md:h-10 text-white mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                      {language === "he" ? cat.nameHe : cat.nameEn}
                    </h3>
                  </div>
                  <p className="text-sm text-white/80 line-clamp-2">
                    {language === "he"
                      ? cat.descriptionHe
                      : cat.descriptionEn}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify compilation**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: no errors

**Step 3: Commit**

```bash
git add client/src/components/CategoryGrid.tsx
git commit -m "feat: add CategoryGrid homepage hub component"
```

---

### Task 4: Create FeaturedStrip Component

**Files:**
- Create: `client/src/components/FeaturedStrip.tsx`

**Step 1: Create the featured content strip**

Horizontal row of 3-4 editor's pick cards for the homepage, mixing articles and lessons.

```tsx
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { lessonsData } from "@/data/lessonsData";
import ContentCard, { CardSkeleton } from "@/components/ContentCard";
import ScrollReveal from "@/components/ScrollReveal";

export default function FeaturedStrip() {
  const { t } = useLanguage();

  const { data, isLoading } = trpc.article.list.useQuery({
    page: 1,
    limit: 3,
    isPublished: true,
  });

  const articles = data?.articles || [];

  // Pick one lesson to feature alongside articles
  const featuredLesson = lessonsData[0];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">
              {t({ he: "מומלצים", en: "Featured" })}
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Featured lesson */}
          <ScrollReveal delay={0}>
            <ContentCard
              variant="lesson"
              id={featuredLesson.id}
              title={featuredLesson.title}
              titleHe={featuredLesson.titleHebrew}
              icon={featuredLesson.icon}
              phraseCount={featuredLesson.phrases.length}
            />
          </ScrollReveal>

          {/* Featured articles */}
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <ScrollReveal key={i} delay={(i + 1) * 0.05}>
                  <CardSkeleton />
                </ScrollReveal>
              ))
            : articles.slice(0, 3).map((article, i) => (
                <ScrollReveal key={article.id} delay={(i + 1) * 0.05}>
                  <ContentCard
                    variant="article"
                    id={article.id}
                    title={article.title}
                    titleHe={article.titleHe}
                    excerpt={article.excerpt}
                    excerptHe={article.excerptHe}
                    category={article.category}
                    coverImage={article.coverImage}
                    isPremium={article.isPremium}
                    publishedAt={article.publishedAt}
                    createdAt={article.createdAt}
                    slug={article.slug}
                  />
                </ScrollReveal>
              ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify compilation**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: no errors

**Step 3: Commit**

```bash
git add client/src/components/FeaturedStrip.tsx
git commit -m "feat: add FeaturedStrip component for homepage editor picks"
```

---

### Task 5: Create CategoryHeader and FilterBar Components

**Files:**
- Create: `client/src/components/CategoryHeader.tsx`
- Create: `client/src/components/FilterBar.tsx`

**Step 1: Create CategoryHeader — reusable page header for listing pages**

```tsx
import { useLanguage } from "@/contexts/LanguageContext";
import type { Category } from "@/data/categories";

interface CategoryHeaderProps {
  category: Category;
  count?: number;
}

export default function CategoryHeader({
  category,
  count,
}: CategoryHeaderProps) {
  const { language, t } = useLanguage();

  return (
    <section
      className={`bg-gradient-to-r ${category.gradientFrom} ${category.gradientTo} text-white py-16 pt-32`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <category.icon className="w-12 h-12 mx-auto mb-4 text-white/90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {language === "he" ? category.nameHe : category.nameEn}
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            {language === "he"
              ? category.descriptionHe
              : category.descriptionEn}
          </p>
          {count != null && (
            <p className="mt-3 text-sm text-white/70">
              {count} {t({ he: "פריטים", en: "items" })}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Create FilterBar — search + sort + sub-category pills**

```tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FilterOption {
  id: string;
  nameEn: string;
  nameHe: string;
}

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters?: FilterOption[];
  selectedFilter?: string;
  onFilterChange?: (filterId: string | undefined) => void;
  searchPlaceholderEn?: string;
  searchPlaceholderHe?: string;
}

export default function FilterBar({
  searchQuery,
  onSearchChange,
  filters,
  selectedFilter,
  onFilterChange,
  searchPlaceholderEn = "Search...",
  searchPlaceholderHe = "חיפוש...",
}: FilterBarProps) {
  const { language, t } = useLanguage();

  return (
    <section className="py-8 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder={t({
                he: searchPlaceholderHe,
                en: searchPlaceholderEn,
              })}
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              className="pl-12 pr-4 py-5 text-base rounded-xl border-2 border-gray-200 focus:border-gray-400"
            />
          </div>

          {/* Filter pills */}
          {filters && filters.length > 0 && onFilterChange && (
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                onClick={() => onFilterChange(undefined)}
                variant={!selectedFilter ? "default" : "outline"}
                size="sm"
                className="rounded-full px-5"
              >
                {t({ he: "הכל", en: "All" })}
              </Button>
              {filters.map(filter => (
                <Button
                  key={filter.id}
                  onClick={() => onFilterChange(filter.id)}
                  variant={selectedFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  className="rounded-full px-5"
                >
                  {language === "he" ? filter.nameHe : filter.nameEn}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Verify compilation**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: no errors

**Step 4: Commit**

```bash
git add client/src/components/CategoryHeader.tsx client/src/components/FilterBar.tsx
git commit -m "feat: add CategoryHeader and FilterBar reusable listing page components"
```

---

### Task 6: Refactor Homepage

**Files:**
- Modify: `client/src/pages/Home.tsx`

**Step 1: Replace the current homepage layout**

The new homepage has: compact hero (30vh) → CategoryGrid → FeaturedStrip → Thailand Map → Newsletter+Pricing.

Replace the current `Home.tsx` content entirely. Keep the newsletter form logic, ThailandMap, and ThaiTextAnimation imports that are still used.

Key changes:
- Hero shrinks from 70vh to 30vh, remove CTA buttons
- `ContentCarousel` import removed, replaced with `CategoryGrid` and `FeaturedStrip`
- "Learn Thai" CTA section removed (category grid handles this)
- ThailandMap section stays
- Newsletter + Pricing section stays

The full replacement file:

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { Mail, Check, Crown, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import ThailandMap from "@/components/ThailandMap";
import ScrollReveal from "@/components/ScrollReveal";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedStrip from "@/components/FeaturedStrip";

export default function Home() {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setSubscribed(true);
        setEmail("");
        toast.success(t({ he: "נרשמת בהצלחה!", en: "Successfully subscribed!" }));
        setTimeout(() => setSubscribed(false), 3000);
      } else {
        toast.info(t({ he: "כבר רשום", en: "Already subscribed" }));
      }
    },
    onError: () => {
      toast.error(t({ he: "שגיאה בהרשמה", en: "Subscription failed" }));
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    subscribeMutation.mutate({ email });
  };

  // Parallax effect
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Section 1: Compact Hero (~30vh) */}
      <section className="relative min-h-[30vh] flex items-center justify-center overflow-hidden">
        <div
          ref={heroRef}
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage: "url('/images/hero-beach.png')",
            willChange: "transform",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto py-14">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight text-white">
            {t({ he: "תאילנד היום", en: "Thailand Hayom" })}
          </h1>
          <p className="text-base md:text-xl mb-6 text-white/90">
            {t({
              he: "המדריך שלך לתאילנד — חדשות, שיעורים וטיפים מקומיים בעברית",
              en: "Your guide to Thailand — news, lessons, and local tips in Hebrew",
            })}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-sm text-white border border-white/20">
              {t({ he: "30 שיעורים", en: "30 Lessons" })}
            </span>
            <span className="px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-sm text-white border border-white/20">
              {t({ he: "150+ מאמרים", en: "150+ Articles" })}
            </span>
            <span className="px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-sm text-white border border-white/20">
              {t({ he: "עדכונים שבועיים", en: "Weekly Updates" })}
            </span>
          </div>
        </div>
      </section>

      {/* Section 2: Category Grid Hub */}
      <CategoryGrid />

      {/* Section 3: Featured Content */}
      <FeaturedStrip />

      {/* Section 4: Interactive Thailand Map */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {t({ he: "חקור את תאילנד", en: "Explore Thailand" })}
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                {t({
                  he: "בחר עיר במפה כדי לגלות מדריכים, מאמרים ואירועים",
                  en: "Click on a city to discover guides, articles and events",
                })}
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <ThailandMap />
          </ScrollReveal>
        </div>
      </section>

      {/* Section 5: Newsletter + Pricing */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {t({ he: "הישאר מעודכן", en: "Stay Updated" })}
              </h2>
              <p className="text-lg text-gray-400 mb-8">
                {t({
                  he: "קבל חדשות, טיפים ומדריכים ישירות למייל שלך",
                  en: "Get news, tips, and guides delivered straight to your inbox",
                })}
              </p>

              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-4"
              >
                <Input
                  type="email"
                  placeholder={t({
                    he: "הכנס את המייל שלך",
                    en: "Enter your email",
                  })}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 rounded-xl"
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={subscribeMutation.isPending}
                  className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  {subscribeMutation.isPending
                    ? t({ he: "שולח...", en: "Sending..." })
                    : t({ he: "הרשם", en: "Subscribe" })}
                </Button>
              </form>

              {subscribed && (
                <p className="text-green-400 font-semibold flex items-center justify-center gap-2 mb-4">
                  <Check className="h-5 w-5" />
                  {t({ he: "נרשמת בהצלחה!", en: "Successfully subscribed!" })}
                </p>
              )}

              <p className="text-sm text-gray-500">
                {t({
                  he: "הצטרף ל-5,000+ מנויים",
                  en: "Join 5,000+ subscribers",
                })}
              </p>
            </div>
          </ScrollReveal>

          <div className="flex items-center gap-4 max-w-md mx-auto mb-16">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-sm text-gray-500">
              {t({ he: "— או שדרג —", en: "— or upgrade —" })}
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                    t({
                      he: "ניוזלטר שבועי עם טיפים כלליים",
                      en: "Weekly newsletter with general tips",
                    }),
                    t({
                      he: "גישה למאמרים ותוכן",
                      en: "Access to articles & content",
                    }),
                    t({
                      he: "לוח אירועים בסיסי",
                      en: "Basic event calendar",
                    }),
                    t({
                      he: "שיעורי תאילנדית חינם",
                      en: "Free Thai language lessons",
                    }),
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

              {/* Premium card */}
              <div className="bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5" />
                  {t({ he: "מומלץ", en: "Popular" })}
                </div>

                <h3 className="text-2xl font-bold mb-2 text-white">
                  {t({ he: "פרימיום", en: "Premium" })}
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-white">₪49</span>
                  <span className="text-white/80">
                    {t({ he: "/חודש", en: "/month" })}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    t({ he: "כל מה שיש בחינם +", en: "Everything in Free +" }),
                    t({
                      he: "התראות בזמן אמת על אירועים",
                      en: "Real-time event alerts",
                    }),
                    t({
                      he: "הנחות בלעדיות במסעדות ומלונות",
                      en: "Exclusive restaurant & hotel discounts",
                    }),
                    t({
                      he: "מדריכים מפורטים עם כתובות ומחירים",
                      en: "Detailed guides with addresses & prices",
                    }),
                    t({
                      he: "גישה למקומות נסתרים וטיפים פנימיים",
                      en: "Hidden gems & insider tips",
                    }),
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          i === 0 ? "text-yellow-400" : "text-white"
                        }`}
                      />
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full py-5 text-base bg-white text-blue-600 hover:bg-gray-100 font-bold rounded-xl shadow-lg transition-all">
                  <Sparkles className="mr-2 h-5 w-5" />
                  {t({ he: "שדרג לפרימיום", en: "Upgrade to Premium" })}
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
```

**Step 2: Verify compilation**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: no errors. Warnings about unused imports from old code are acceptable and will be cleaned up.

**Step 3: Verify dev server renders correctly**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && pnpm dev`
Open: `http://localhost:3000`
Expected: Compact hero → 7 colored category cards in a grid → featured content strip → Thailand map → newsletter/pricing

**Step 4: Commit**

```bash
git add client/src/pages/Home.tsx
git commit -m "feat: refactor homepage to category-hub layout with CategoryGrid and FeaturedStrip"
```

---

### Task 7: Refactor Articles Page

**Files:**
- Modify: `client/src/pages/Articles.tsx`

**Step 1: Rewrite Articles page using new components**

Replace the current page with CategoryHeader + FilterBar + ContentCard grid. Read the URL query params (`?category=food`) to pre-select filters.

```tsx
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import ContentCard, { CardSkeleton } from "@/components/ContentCard";
import CategoryHeader from "@/components/CategoryHeader";
import FilterBar from "@/components/FilterBar";
import { getCategoryById, categories } from "@/data/categories";

const articleFilters = [
  { id: "food", nameEn: "Food", nameHe: "אוכל" },
  { id: "visa", nameEn: "Visa", nameHe: "ויזה" },
  { id: "attractions", nameEn: "Attractions", nameHe: "אטרקציות" },
  { id: "events", nameEn: "Events", nameHe: "אירועים" },
  { id: "lifestyle", nameEn: "Lifestyle", nameHe: "אורח חיים" },
  { id: "safety", nameEn: "Safety", nameHe: "בטיחות" },
];

export default function Articles() {
  const { language, t } = useLanguage();

  // Read initial category from URL query param
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get("category") || undefined;

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    initialCategory,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = trpc.article.list.useQuery({
    page: 1,
    limit: 100,
    category: selectedCategory,
    search: searchQuery || undefined,
    isPublished: true,
  });

  const articles = data?.articles || [];

  // Use the "travel" category as the header, unless filtering to a specific one
  const headerCategory =
    (selectedCategory &&
      categories.find(c => c.articleCategory === selectedCategory)) ||
    getCategoryById("travel")!;

  return (
    <div className="min-h-screen bg-gray-50">
      <CategoryHeader category={headerCategory} count={articles.length} />

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={articleFilters}
        selectedFilter={selectedCategory}
        onFilterChange={setSelectedCategory}
        searchPlaceholderEn="Search articles..."
        searchPlaceholderHe="חפש מאמרים..."
      />

      {/* Articles Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-400">
                  {t({ he: "לא נמצאו מאמרים", en: "No articles found" })}
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map(article => (
                  <ContentCard
                    key={article.id}
                    variant="article"
                    id={article.id}
                    title={article.title}
                    titleHe={article.titleHe}
                    excerpt={article.excerpt}
                    excerptHe={article.excerptHe}
                    category={article.category}
                    coverImage={article.coverImage}
                    isPremium={article.isPremium}
                    publishedAt={article.publishedAt}
                    createdAt={article.createdAt}
                    slug={article.slug}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
```

**Step 2: Verify compilation and dev server**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: no errors

**Step 3: Commit**

```bash
git add client/src/pages/Articles.tsx
git commit -m "feat: refactor Articles page to use CategoryHeader, FilterBar, and ContentCard"
```

---

### Task 8: Refactor Interactive Lessons Page

**Files:**
- Modify: `client/src/pages/InteractiveLessons.tsx`

**Step 1: Rewrite lesson selection view using new components**

Keep the lesson player logic (`selectedLesson` state, `InteractiveLessonPlayer`, progress tracking). Replace only the lesson selection grid view to use `CategoryHeader`, `ContentCard` with `variant="lesson"`, and the progress bar section.

The full replacement code should:
- Import `CategoryHeader` with the lessons category
- Import `ContentCard` for lesson cards
- Keep ALL existing state, effects, and handler functions (progress loading, saving, handleLessonComplete, handleNextLesson, handleBackToLessons)
- Keep the `if (selectedLesson)` early return that shows `InteractiveLessonPlayer`
- Replace the lesson selection JSX with: CategoryHeader → progress section → ContentCard grid
- Remove the "Why Interactive Lessons?" and "Want More Resources?" sections (these become unnecessary with the hub design)

Key details for the implementer:
- `getCategoryById("lessons")` provides the header category
- Each lesson card: `variant="lesson"`, progress = `completedLessons.has(lesson.id) ? 100 : 0`
- The "Your Progress" card section stays but uses the new styling (white bg, clean)
- `onClick` to select a lesson should remain (use `setSelectedLessonId(lesson.id)`)
- Since `ContentCard` lesson variant links to `/lesson/:id`, and the current page handles lesson selection via state, you'll need to intercept: wrap ContentCard in a `div` with `onClick` and `e.preventDefault()` behavior, OR change the lesson variant to accept an `onClick` prop. **Preferred approach:** Add an optional `onClick` prop to the lesson variant in `ContentCard.tsx` that, when provided, prevents default link navigation.

**Step 2: Add onClick prop to ContentCard lesson variant**

In `client/src/components/ContentCard.tsx`, modify the `ContentCardLesson` interface to include:
```typescript
onClick?: () => void;
```

And in `LessonVariant`, change the wrapper from `<Link>` to either use `onClick` or `Link`:
```tsx
function LessonVariant(props: ContentCardLesson) {
  // ... existing code
  const Wrapper = props.onClick ? 'div' : Link;
  const wrapperProps = props.onClick
    ? { onClick: props.onClick }
    : { href: `/lesson/${props.id}` };

  return (
    <Wrapper {...wrapperProps as any}>
      {/* ... rest of card JSX unchanged */}
    </Wrapper>
  );
}
```

**Step 3: Verify compilation and test**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && npx tsc --noEmit --pretty 2>&1 | head -20`
Navigate to `/interactive-lessons` and verify:
- Amber category header appears
- Lesson cards render with icons and progress
- Clicking a lesson opens the player
- Progress tracking still works

**Step 4: Commit**

```bash
git add client/src/pages/InteractiveLessons.tsx client/src/components/ContentCard.tsx
git commit -m "feat: refactor InteractiveLessons page to use CategoryHeader and ContentCard"
```

---

### Task 9: Clean Up Replaced Components

**Files:**
- Delete: `client/src/components/ContentCarousel.tsx`
- Delete: `client/src/components/ArticleCardSkeleton.tsx`
- Modify: `client/src/components/ArticleCard.tsx` — keep but mark as deprecated (still used by ArticleDetail for "related articles" if applicable)

**Step 1: Check that nothing imports ContentCarousel or ArticleCardSkeleton**

Run: `grep -r "ContentCarousel\|ArticleCardSkeleton" client/src/ --include="*.tsx" --include="*.ts"`

Expected: Only the files themselves should match. If Home.tsx or Articles.tsx still import them, fix those imports first.

**Step 2: Delete the files**

```bash
rm client/src/components/ContentCarousel.tsx
rm client/src/components/ArticleCardSkeleton.tsx
```

**Step 3: Verify build**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: no errors

**Step 4: Commit**

```bash
git add -u client/src/components/ContentCarousel.tsx client/src/components/ArticleCardSkeleton.tsx
git commit -m "chore: remove ContentCarousel and ArticleCardSkeleton (replaced by new components)"
```

---

### Task 10: Final Visual QA and Polish

**Files:**
- Potentially tweak: any of the new components for spacing/color issues

**Step 1: Run dev server and check each page**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && pnpm dev`

Check the following pages at `http://localhost:3000`:

1. **Homepage (`/`):**
   - Compact hero (should be ~30vh, not 70vh)
   - Category grid: 7 colored cards, responsive (3-col desktop, 2-col mobile)
   - Featured strip: 4 cards (1 lesson + 3 articles)
   - Thailand map section
   - Newsletter + pricing section

2. **Articles (`/articles`):**
   - Teal category header
   - Filter bar with search and category pills
   - ContentCard grid
   - Clicking a card navigates to article detail

3. **Articles with category (`/articles?category=food`):**
   - Rose-colored header
   - Food filter pre-selected

4. **Interactive Lessons (`/interactive-lessons`):**
   - Amber category header
   - Progress section
   - Lesson cards with icons and progress indicators
   - Clicking a card opens the lesson player

5. **RTL mode:** Toggle to Hebrew and verify all pages look correct in RTL

**Step 2: Fix any visual issues found**

Common fixes: spacing, font sizes, overflow on mobile, category color contrast.

**Step 3: Run type-check one final time**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && pnpm check`
Expected: 0 errors

**Step 4: Final commit (if any fixes)**

```bash
git add -A
git commit -m "fix: visual polish for content redesign"
```

---

## Dependency Graph

```
[Task 1] → [Task 2, Task 3, Task 4, Task 5] → [Task 6, Task 7, Task 8] → [Task 9] → [Task 10]
```

- **Task 1** (categories data): no dependencies, everything else depends on it
- **Tasks 2-5** (components): depend on Task 1, independent of each other
- **Tasks 6-8** (page refactors): depend on Tasks 2-5, independent of each other
- **Task 9** (cleanup): depends on Tasks 6-8
- **Task 10** (QA): depends on everything
