# Homepage Redesign — Design Document

**Date:** 2026-02-17
**Status:** Approved
**Goal:** Comprehensive homepage overhaul — bold/modern aesthetic, engagement-first, reduced section count, de-generic-ified.

## Context

The current homepage has 7 sections, leads with a newsletter signup, uses generic travel imagery with text shadows, and doesn't showcase real content. The redesign reduces to 5 focused sections, prioritizes content exploration over email capture, and adopts a bold/modern visual language (Stripe/Linear/Vercel polish).

## Design Decisions

- **Primary CTA:** Drive visitors to explore articles and Thai lessons (not newsletter signup)
- **Visual vibe:** Bold & modern — strong contrast, clean typography, sharp interactions
- **Background image:** Keep a real Thailand photo in the hero (with parallax) for soul
- **Content showcase:** Horizontal carousel (CSS scroll-snap) instead of static cards
- **Section reduction:** 7 sections → 5 sections — newsletter + pricing merged, stats integrated into hero, feature cards eliminated

## Section-by-Section Design

### Section 1: Hero (~70vh)

**Layout:** Full-bleed Thailand photo with parallax effect, heavy bottom gradient overlay (transparent top → dark bottom).

**Content:**
- Bold headline: "Thailand Hayom" (Hebrew: "תאילנד היום")
- Subtitle: "Your guide to Thailand — news, lessons, and local tips in Hebrew"
- Two CTAs side-by-side: "Start Learning Thai" (primary, filled) + "Read Guides" (ghost/outline)
- Compact inline stat pills below CTAs: "30 Lessons • 150+ Articles • Weekly Updates"

**Removed from current:** Newsletter signup form, badge/chip, text-shadow hacks.

**Typography:** Large bold white text. Hebrew: modern Hebrew font (Heebo/Assistant). English: geometric sans (Inter/Geist). Contrast via gradient overlay, not text-shadow.

**Animation:** Parallax scroll on background image (kept from current).

### Section 2: Content Carousel

**Layout:** Full-width horizontal scrollable carousel with CSS scroll-snap.

**Content:**
- Section heading: "Discover Thailand" + subtitle
- ~3.5 cards visible on desktop (partial card hints scrollability)
- Each card: image, category tag pill, title, subtitle
- Mix of articles and lessons, fetched dynamically via tRPC (`article.list` + lesson data)
- Dot indicators for scroll position
- "View All" link

**Interactions:** Drag/swipe on mobile, horizontal scroll on desktop. Right-edge fade for scroll hint.

**Mobile:** Cards stack vertically or remain carousel (single card visible + swipe).

### Section 3: Interactive Thailand Map

**Layout:** Keep existing `ThailandMap` component. Apply polish.

**Changes:**
- Dark background (navy/charcoal) — map SVG pops against it
- Pulsing glow animation on city dots
- Tooltip on hover: "X articles about [City]" (connect map to real content count)
- ScrollReveal entrance animation (already exists, keep)

**Mobile:** Zoomable map or fallback to city list.

### Section 4: Learn Thai CTA

**Layout:** Two-column — visual left, copy + CTA right. Warm amber/orange gradient background.

**Left column:** Animated Thai characters cycling through key phrases (สวัสดี, ขอบคุณ, เท่าไหร่) with typewriter or fade effect.

**Right column:**
- Heading: "Learn Thai Before You Fly"
- Body: "30 interactive lessons from hello to bargaining."
- CTA: "Start Lesson 1" (specific, actionable)

**Removed:** Giant emoji (🎓). The animated Thai script IS the visual.

### Section 5: Newsletter + Pricing (Bottom)

**Layout:** Single dark section (navy/charcoal) combining newsletter signup and pricing comparison.

**Newsletter portion:**
- Heading: "Stay Updated"
- Inline email input + "Subscribe Free" button (single row, not a card)
- Social proof: "Join 5,000+ subscribers"

**Pricing portion:**
- "— or upgrade —" divider
- Two cards side-by-side: Free (₪0/mo) vs Premium (₪49/mo)
- Simplified bullet points (5 max per card)
- Clear CTA per card: "Current Plan" / "Upgrade"

**Removed:** Separate stats section, separate newsletter section, separate pricing section, "A La Carte" mention.

## Visual System Notes

**Color rhythm:** Light hero → light carousel → dark map → warm CTA → dark bottom. This creates visual breathing and prevents monotony.

**Typography scale:**
- Section headings: 4xl–5xl (bold)
- Body: lg–xl
- Stats/tags: sm–base

**Animations:**
- Parallax on hero image
- ScrollReveal on each section entrance
- Hover: scale + shadow on cards
- Thai character typing/fading animation
- Pulsing glow on map city dots

**Bilingual:** All text uses the existing `t({ he: "...", en: "..." })` pattern. Hebrew remains RTL with proper `dir` handling via `LanguageContext`.

## What's Removed

| Current Section | Action |
|---|---|
| Hero newsletter card | Removed — newsletter moves to bottom |
| Animated Statistics section | Removed — stats compressed into hero pills |
| "What's in the Newsletter" 3 cards | Removed — replaced by content carousel |
| Local Guides 4 category cards | Removed — absorbed into content carousel |
| Learn Thai giant emoji CTA | Redesigned — two-column with animated Thai text |
| Separate pricing section | Merged — combined with newsletter at bottom |
| "A La Carte" mention | Removed |

## Technical Notes

- Content carousel uses CSS `scroll-snap-type: x mandatory` — no carousel library needed
- Dynamic content from existing tRPC endpoints (`article.list`, lesson data from `lessonsData`)
- Thai character animation: CSS keyframes or Framer Motion `AnimatePresence`
- Map tooltips: existing `ThailandMap` component + Radix Tooltip or custom hover state
- All components use existing shadcn/ui primitives where possible
