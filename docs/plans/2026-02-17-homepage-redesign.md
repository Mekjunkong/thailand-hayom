# Homepage Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the Thailand Hayom homepage from 7 generic sections to 5 bold, modern, content-first sections.

**Architecture:** Replace the monolithic `home.tsx` with a clean component composition. Create 3 new components (ContentCarousel, ThaiTextAnimation, NewsletterPricing) and modify the existing ThailandMap. The homepage fetches articles dynamically via tRPC and lesson data from `lessonsData.ts`.

**Tech Stack:** React 19, TailwindCSS v4, Framer Motion, tRPC (article.list), Wouter, shadcn/ui (Button, Input), CSS scroll-snap for carousel.

---

### Task 1: Create the ContentCarousel component

**Files:**
- Create: `client/src/components/ContentCarousel.tsx`

**Step 1: Create the ContentCarousel component file**

This is a CSS scroll-snap horizontal carousel that displays a mix of articles and lessons. It fetches articles from tRPC and gets lesson data from the static import.

```tsx
import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { lessonsData } from "@/data/lessonsData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

interface CarouselItem {
  type: "article" | "lesson";
  id: number;
  title: string;
  titleHe: string;
  subtitle: string;
  subtitleHe: string;
  tag: string;
  tagColor: string;
  image?: string | null;
  href: string;
}

const categoryColors: Record<string, string> = {
  Food: "bg-green-500",
  "Travel Tips": "bg-blue-500",
  "Visa Updates": "bg-red-500",
  Events: "bg-purple-500",
  Safety: "bg-orange-500",
  Deals: "bg-pink-500",
  Vegan: "bg-emerald-500",
  Attractions: "bg-cyan-500",
  Lesson: "bg-amber-500",
};

export default function ContentCarousel() {
  const { language, t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: articleData } = trpc.article.list.useQuery({
    page: 1,
    limit: 8,
    isPublished: true,
  });

  // Build carousel items: articles + first few lessons
  const items: CarouselItem[] = [];

  if (articleData?.articles) {
    for (const article of articleData.articles.slice(0, 6)) {
      items.push({
        type: "article",
        id: article.id,
        title: article.title,
        titleHe: article.titleHe ?? article.title,
        subtitle: article.excerpt ?? "",
        subtitleHe: article.excerptHe ?? "",
        tag: article.category,
        tagColor: categoryColors[article.category] ?? "bg-gray-500",
        image: article.coverImage,
        href: `/articles/${article.slug}`,
      });
    }
  }

  // Interleave 2 lessons
  const lessonSlice = lessonsData.slice(0, 2);
  for (const lesson of lessonSlice) {
    items.push({
      type: "lesson",
      id: lesson.id,
      title: lesson.title,
      titleHe: lesson.titleHebrew,
      subtitle: `${lesson.phrases.length} phrases`,
      subtitleHe: `${lesson.phrases.length} ביטויים`,
      tag: "Lesson",
      tagColor: categoryColors.Lesson,
      image: null,
      href: `/lesson/${lesson.id}`,
    });
  }

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate active dot index
    const cardWidth = scrollRef.current.firstElementChild
      ? (scrollRef.current.firstElementChild as HTMLElement).offsetWidth + 16
      : 300;
    setActiveIndex(Math.round(scrollLeft / cardWidth));
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [items.length]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild
      ? (scrollRef.current.firstElementChild as HTMLElement).offsetWidth + 16
      : 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  if (items.length === 0) return null;

  const totalDots = Math.min(items.length, 6);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-10 max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                {t({ he: "גלה את תאילנד", en: "Discover Thailand" })}
              </h2>
              <p className="text-lg text-gray-600 mt-2">
                {t({
                  he: "מאמרים, מדריכים ושיעורים אחרונים",
                  en: "Latest articles, guides and lessons",
                })}
              </p>
            </div>
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Right fade hint */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          )}

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {items.map(item => (
              <Link key={`${item.type}-${item.id}`} href={item.href}>
                <div
                  className="flex-shrink-0 w-72 md:w-80 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer bg-white"
                  style={{ scrollSnapAlign: "start" }}
                >
                  {/* Image or gradient placeholder */}
                  <div className="h-44 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={language === "he" ? item.titleHe : item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                        <span className="text-5xl">
                          {item.type === "lesson" ? "🎓" : "📄"}
                        </span>
                      </div>
                    )}
                    {/* Category tag */}
                    <span
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${item.tagColor}`}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-lg leading-snug line-clamp-2">
                      {language === "he" ? item.titleHe : item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {language === "he" ? item.subtitleHe : item.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 mt-6">
            {Array.from({ length: totalDots }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-gray-900 w-6"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* View All link */}
          <div className="text-center mt-8">
            <Link href="/articles">
              <span className="text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors">
                {t({ he: "צפה בהכל →", en: "View All →" })}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify the component compiles**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && pnpm check`
Expected: No type errors related to ContentCarousel.

**Step 3: Commit**

```bash
git add client/src/components/ContentCarousel.tsx
git commit -m "feat: add ContentCarousel component for homepage"
```

---

### Task 2: Create the ThaiTextAnimation component

**Files:**
- Create: `client/src/components/ThaiTextAnimation.tsx`

**Step 1: Create the ThaiTextAnimation component**

This component cycles through Thai phrases with a fade animation using Framer Motion's AnimatePresence.

```tsx
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const phrases = [
  { thai: "สวัสดี", phonetic: "sa-wat-dee", meaning: "Hello" },
  { thai: "ขอบคุณ", phonetic: "khop-khun", meaning: "Thank you" },
  { thai: "เท่าไหร่", phonetic: "tao-rai", meaning: "How much?" },
  { thai: "อร่อย", phonetic: "a-roi", meaning: "Delicious" },
  { thai: "ไม่เป็นไร", phonetic: "mai-pen-rai", meaning: "No worries" },
];

export default function ThaiTextAnimation() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const phrase = phrases[index];

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[280px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="text-6xl md:text-7xl font-bold text-gray-900 mb-4">
            {phrase.thai}
          </div>
          <div className="text-xl text-gray-600 font-medium">
            {phrase.phonetic}
          </div>
          <div className="text-lg text-gray-500 mt-1">
            {phrase.meaning}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="flex gap-2 mt-8">
        {phrases.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              i === index ? "bg-amber-600 w-6" : "bg-amber-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Verify the component compiles**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && pnpm check`
Expected: No type errors related to ThaiTextAnimation.

**Step 3: Commit**

```bash
git add client/src/components/ThaiTextAnimation.tsx
git commit -m "feat: add ThaiTextAnimation component with cycling phrases"
```

---

### Task 3: Polish the ThailandMap component (dark bg + pulsing glow)

**Files:**
- Modify: `client/src/components/ThailandMap.tsx`

**Step 1: Add pulsing glow animation to ALL city dots (not just selected)**

In `ThailandMap.tsx`, update the city pin rendering. Find the `{cities.map((city) => {` block (around line 101). Add a permanent subtle pulse animation to every city dot, and change the container background to be transparent (the dark background will come from the parent section in the homepage).

Change the map container div (line 79) from:
```tsx
<div className="relative bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-8 shadow-xl">
```
to:
```tsx
<div className="relative bg-white/5 rounded-3xl p-8">
```

Add a pulsing glow circle to EVERY city pin (not just selected). Inside the `<g>` for each city, after the pin circle and BEFORE the `{isSelected && (` block, add:

```tsx
{/* Subtle pulsing glow on all pins */}
<circle
  cx={city.x}
  cy={city.y}
  r="6"
  fill="none"
  stroke={isActive ? "#f59e0b" : "#3b82f6"}
  strokeWidth="1"
  opacity="0"
>
  <animate attributeName="r" from="6" to="16" dur="2s" repeatCount="indefinite" />
  <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
</circle>
```

Also update the SVG gradient fill from light blue/teal to darker tones for the dark-bg context. Change the gradient stops:
```tsx
<stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5" />
<stop offset="100%" stopColor="#14b8a6" stopOpacity="0.7" />
```

Update the map stroke from `stroke="#2563eb"` to `stroke="#60a5fa"`.

Update the legend text color (line 183) from `text-gray-600` to `text-gray-400` and MapPin from `text-blue-500` to `text-blue-400`.

Update city label text fill (line 169) from `fill="#1e293b"` to `fill="white"`.

**Step 2: Verify the component compiles**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && pnpm check`
Expected: No type errors.

**Step 3: Commit**

```bash
git add client/src/components/ThailandMap.tsx
git commit -m "feat: polish ThailandMap with pulsing glow and dark-bg support"
```

---

### Task 4: Rewrite the Homepage (home.tsx)

**Files:**
- Modify: `client/src/pages/home.tsx` (full rewrite)

**Step 1: Rewrite home.tsx with the 5-section design**

Replace the entire contents of `client/src/pages/home.tsx` with:

```tsx
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";
import { Mail, Check, Crown, Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import ThailandMap from "@/components/ThailandMap";
import ScrollReveal from "@/components/ScrollReveal";
import ContentCarousel from "@/components/ContentCarousel";
import ThaiTextAnimation from "@/components/ThaiTextAnimation";

export default function Home() {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: data => {
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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* ─── Section 1: Hero ─── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          ref={heroRef}
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage: "url('/images/hero-beach.png')",
            willChange: "transform",
          }}
        />
        {/* Heavy bottom gradient for sharp text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-24">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 text-white leading-tight">
            {t({ he: "תאילנד היום", en: "Thailand Hayom" })}
          </h1>

          <p className="text-lg md:text-2xl mb-10 text-white/90 font-light max-w-2xl mx-auto">
            {t({
              he: "המדריך שלך לתאילנד — חדשות, שיעורים וטיפים מקומיים בעברית",
              en: "Your guide to Thailand — news, lessons, and local tips in Hebrew",
            })}
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link href="/interactive-lessons">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-white text-gray-900 hover:bg-gray-100 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                {t({ he: "התחל ללמוד תאילנדית", en: "Start Learning Thai" })}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/articles">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-2 border-white/60 text-white hover:bg-white/10 font-semibold rounded-xl backdrop-blur-sm transition-all"
              >
                {t({ he: "קרא מדריכים", en: "Read Guides" })}
              </Button>
            </Link>
          </div>

          {/* Inline stat pills */}
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20">
              {t({ he: "30 שיעורים", en: "30 Lessons" })}
            </span>
            <span className="px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20">
              {t({ he: "150+ מאמרים", en: "150+ Articles" })}
            </span>
            <span className="px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20">
              {t({ he: "עדכונים שבועיים", en: "Weekly Updates" })}
            </span>
          </div>
        </div>
      </section>

      {/* ─── Section 2: Content Carousel ─── */}
      <ContentCarousel />

      {/* ─── Section 3: Interactive Thailand Map (dark bg) ─── */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {t({ he: "חקור את תאילנד", en: "Explore Thailand" })}
              </h2>
              <p className="text-lg text-gray-400">
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

      {/* ─── Section 4: Learn Thai CTA ─── */}
      <section className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Animated Thai text */}
              <ThaiTextAnimation />

              {/* Right: Copy + CTA */}
              <div className={language === "he" ? "text-right" : "text-left"}>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  {t({
                    he: "למד תאילנדית לפני הטיסה",
                    en: "Learn Thai Before You Fly",
                  })}
                </h2>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  {t({
                    he: "30 שיעורים אינטראקטיביים מ'שלום' ועד מיקוח בשוק. חינם לגמרי.",
                    en: "30 interactive lessons from 'hello' to bargaining at the market. Completely free.",
                  })}
                </p>
                <Link href="/lesson/1">
                  <Button
                    size="lg"
                    className="px-10 py-6 text-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all rounded-xl font-semibold"
                  >
                    {t({ he: "התחל שיעור 1", en: "Start Lesson 1" })}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Section 5: Newsletter + Pricing (dark) ─── */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          {/* Newsletter */}
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {t({ he: "הישאר מעודכן", en: "Stay Updated" })}
              </h2>
              <p className="text-lg text-gray-400 mb-8">
                {t({
                  he: "ניוזלטר שבועי למטיילים ישראלים",
                  en: "Weekly newsletter for Israeli travelers",
                })}
              </p>

              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              >
                <Input
                  type="email"
                  placeholder={t({
                    he: "הכנס את המייל שלך",
                    en: "Enter your email",
                  })}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 px-5 py-5 text-base bg-white/10 border-white/20 text-white placeholder:text-gray-500 rounded-xl focus:border-blue-400"
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={subscribeMutation.isPending}
                  className="px-6 py-5 text-base bg-blue-500 hover:bg-blue-600 shadow-lg font-semibold whitespace-nowrap rounded-xl transition-all"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {subscribeMutation.isPending
                    ? t({ he: "שולח...", en: "Sending..." })
                    : t({ he: "הרשם חינם", en: "Subscribe Free" })}
                </Button>
              </form>

              {subscribed && (
                <p className="mt-4 text-green-400 font-semibold flex items-center justify-center gap-2">
                  <Check className="h-5 w-5" />
                  {t({ he: "נרשמת בהצלחה!", en: "Successfully subscribed!" })}
                </p>
              )}
              <p className="mt-4 text-sm text-gray-500">
                {t({
                  he: "הצטרף ל-5,000+ מטיילים ישראלים",
                  en: "Join 5,000+ Israeli travelers",
                })}
              </p>
            </div>
          </ScrollReveal>

          {/* Divider */}
          <div className="flex items-center gap-4 max-w-lg mx-auto mb-16">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-500 text-sm font-medium">
              {t({ he: "או שדרג", en: "or upgrade" })}
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Pricing cards */}
          <ScrollReveal delay={0.1}>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              {/* Free */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {t({ he: "חינם", en: "Free" })}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">₪0</span>
                    <span className="text-gray-400">
                      {t({ he: "/חודש", en: "/month" })}
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    { he: "ניוזלטר שבועי", en: "Weekly newsletter" },
                    { he: "מאמרים ומדריכים", en: "Articles & guides" },
                    { he: "לוח אירועים בסיסי", en: "Basic event calendar" },
                    { he: "שיעורי תאילנדית חינם", en: "Free Thai lessons" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full py-5 rounded-xl border-white/20 text-white hover:bg-white/10 transition-all"
                >
                  {t({ he: "התוכנית הנוכחית", en: "Current Plan" })}
                </Button>
              </div>

              {/* Premium */}
              <div className="bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  {t({ he: "מומלץ", en: "Popular" })}
                </div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {t({ he: "פרימיום", en: "Premium" })}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">₪49</span>
                    <span className="text-white/70">
                      {t({ he: "/חודש", en: "/month" })}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm mt-1">
                    {t({
                      he: "או ₪490/שנה (חסוך 2 חודשים)",
                      en: "or ₪490/year (save 2 months)",
                    })}
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    { he: "הכל בחינם +", en: "Everything in Free +" },
                    { he: "התראות בזמן אמת", en: "Real-time alerts" },
                    { he: "הנחות בלעדיות", en: "Exclusive discounts" },
                    { he: "מדריכים מפורטים", en: "Detailed guides" },
                    { he: "טיפים פנימיים", en: "Insider tips" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white">
                      <Check
                        className={`w-4 h-4 flex-shrink-0 ${i === 0 ? "text-yellow-400" : "text-white/70"}`}
                      />
                      <span className={i === 0 ? "font-semibold" : ""}>
                        {t(item)}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full py-5 rounded-xl bg-white text-blue-600 hover:bg-gray-50 font-bold shadow-lg transition-all">
                  <Sparkles className="mr-2 h-4 w-4" />
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

**Step 2: Verify the full homepage compiles**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && pnpm check`
Expected: No type errors.

**Step 3: Commit**

```bash
git add client/src/pages/home.tsx
git commit -m "feat: redesign homepage — 5 sections, content-first, bold modern aesthetic"
```

---

### Task 5: Update ThailandMap city info panel for dark theme

**Files:**
- Modify: `client/src/components/ThailandMap.tsx`

**Step 1: Update the city info panel and quick-links for dark background context**

The city info panel (right side of the map grid, line 190+) needs to work against the dark section background. Update:

- Selected city card (line 192): Change `bg-white` to `bg-white/10 backdrop-blur-sm`, `border-2 border-blue-100` to `border border-white/20`, text colors to white variants.
- Empty state (line 224): Change `bg-gradient-to-br from-gray-50 to-blue-50` to `bg-white/5`, `border-gray-300` to `border-white/20`, text to gray-400/gray-500.
- Quick city links (line 244): Change `bg-white` to `bg-white/5`, borders to `border-white/10` / `border-blue-500`, text to white variants.
- City name `text-gray-900` → `text-white`, description `text-gray-600` → `text-gray-400` throughout the info panel.
- CTA button: Keep the gradient, it works on dark.

**Step 2: Verify it compiles**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && pnpm check`
Expected: No type errors.

**Step 3: Commit**

```bash
git add client/src/components/ThailandMap.tsx
git commit -m "feat: adapt ThailandMap info panel for dark background"
```

---

### Task 6: Visual verification and cleanup

**Files:**
- Modify: `client/src/pages/home.tsx` (if tweaks needed)
- Modify: `client/src/components/ContentCarousel.tsx` (if tweaks needed)

**Step 1: Start the dev server and visually verify**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && pnpm dev`

Open http://localhost:3000 and verify:
1. Hero: Photo with parallax, bold white text, 2 CTAs, stat pills
2. Carousel: Horizontal scrollable cards with articles/lessons
3. Map: Dark background, glowing city dots, city info panel works
4. Learn Thai: Two-column layout with animated Thai text
5. Newsletter + Pricing: Dark section, inline form, 2 pricing cards
6. Mobile: Test at 375px width — all sections stack properly

**Step 2: Fix any visual issues found**

Common adjustments:
- Padding/spacing tweaks
- Font size adjustments on mobile
- Scroll-snap alignment
- RTL layout for Hebrew mode (test by toggling language)

**Step 3: Remove now-unused component import**

In `home.tsx`, verify that `AnimatedCounter` is no longer imported (it was used in the old stats section that's been removed). The `AnimatedCounter.tsx` component file can stay in the codebase — it may be used elsewhere.

**Step 4: Commit**

```bash
git add -u
git commit -m "fix: visual polish and cleanup for homepage redesign"
```

---

### Task 7: Hide scrollbar CSS for carousel

**Files:**
- Modify: `client/src/index.css` (or equivalent global CSS)

**Step 1: Add scrollbar-hide utility**

The carousel uses `scrollbarWidth: "none"` in inline styles, but for WebKit browsers we also need the pseudo-element. Check if a scrollbar-hiding style already exists. If not, add to the global CSS:

```css
/* Hide scrollbar for carousel */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

Then update `ContentCarousel.tsx` to use `className="... scrollbar-hide"` on the scroll container instead of inline styles for scrollbar hiding.

**Step 2: Verify**

Run dev server and confirm no visible scrollbar on the carousel in Chrome/Safari.

**Step 3: Commit**

```bash
git add client/src/index.css client/src/components/ContentCarousel.tsx
git commit -m "fix: add scrollbar-hide utility for carousel"
```

---

## Task Dependency Graph

```
[Task 1, Task 2, Task 3] → [Task 4] → [Task 5] → [Task 6, Task 7]
```

- Tasks 1, 2, 3 are independent (new components + map polish)
- Task 4 depends on 1, 2, 3 (homepage rewrite imports them)
- Task 5 depends on 4 (ThailandMap dark-theme panel needs the dark section context)
- Tasks 6, 7 are independent cleanup/polish
