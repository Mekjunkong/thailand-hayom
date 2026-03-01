# Thailand Hayom — Super-App UI Redesign

**Date:** 2026-03-01
**Status:** Approved
**Approach:** Super-App Hub (Grab/LINE-inspired)

## Problem

The current UI is a newspaper-style editorial layout (Israel Hayom style) that feels cluttered, doesn't match the travel platform brand, and performs poorly on mobile. The platform serves pre-trip planners, on-the-ground tourists, and expats — all of whom need fast access to tools more than long editorial scrolls.

## Design Direction

Transform the homepage into an **app-like dashboard** with quick-action tools at the top, learning progress front and center, and a unified content feed below. Simplify the top navbar to a minimal utility bar (logo, search, language toggle, profile).

## Scope

Only the **homepage** (`Home.tsx`) and **navbar** (`Navbar.tsx`) are redesigned. All other pages (Articles, Lessons, Emergency, etc.) remain unchanged.

## Color Palette

- Primary: warm Thai gold (#F59E0B) + deep navy (#1E293B)
- Background: soft warm gray (#F8FAFC)
- Cards: white with subtle shadow, rounded-xl corners
- Accent: teal (#14B8A6) for interactive elements

## Navigation (Top Bar)

```
┌─────────────────────────────────────────────────┐
│  Thailand Hayom           [search] [HE|EN] [avatar] │
└─────────────────────────────────────────────────┘
```

- No page links in the top bar — navigation is via page content
- Logo left: Thai flag emoji + brand name (bilingual)
- Right: search icon (opens overlay), HE/EN pill toggle, profile avatar
- Sticky, shrinks on scroll with shadow
- Mobile and desktop identical — no hamburger menu

## Homepage Sections (top to bottom)

### 1. Quick Actions Grid (2x3)

Six cards linking to key tools:

| Card | Icon | Route | Tint Color |
|------|------|-------|------------|
| Emergency | ShieldAlert | /emergency | red-50 |
| Phrases | MessageCircle | /pronunciation | amber-50 |
| Map | MapPin | /trips/chiang-mai-one-day | teal-50 |
| Lessons | GraduationCap | /interactive-lessons | blue-50 |
| Visa | FileText | /articles?cat=visa | indigo-50 |
| Events | Calendar | /articles?cat=events | violet-50 |

- Card: ~110x100px, rounded-2xl, pastel background, centered icon + bilingual label
- Grid: `grid grid-cols-3 gap-3` mobile, `gap-4` desktop, max-width constrained

### 2. Learning Progress Card

Full-width card showing:
- Current lesson name (bilingual)
- Progress bar with percentage
- Streak counter (fire icon + day count)
- "Continue" CTA button

**States:**
- Has progress: show current lesson + progress + streak
- New user: "Start Learning Thai" invitation + "Begin" CTA
- All complete: congratulations + "Review" CTA

**Data:** existing `/api/progress` endpoints + `ProgressContext`

### 3. Content Feed

Unified feed replacing NewsTicker + LeadStoryBlock + CategorySections.

**Category filter pills:** horizontal scrollable row
`[All] [Travel] [Food] [Visa] [Safety] [Events] [Premium]`

**Card variants:**
- Image card: image left (120x90) + title/meta right
- Text-only card: full-width title + excerpt + category badge

**Data:** `trpc.article.list` with category filter, infinite scroll via `useInfiniteQuery`

**Premium:** articles with `isPremium: true` show lock badge. Tap triggers existing `PremiumPaywall`.

### 4. Newsletter CTA (compact)

Single-row form: email input + subscribe button. "Join 5,000+ subscribers" social proof. Reuse existing newsletter mutation.

### 5. Premium Banner (slim, conditional)

Only shown if user is not a premium subscriber. One-line CTA with price and "See plans" link.

### 6. AI Concierge

Floating button (bottom-right), unchanged from current implementation.

## Components Removed

| Component | Replacement |
|-----------|-------------|
| NewsTicker | Removed (clutter) |
| LeadStoryBlock | Top item in content feed |
| CategoryPillNav | Filter pills in feed section |
| CategorySection (x3) | Merged into unified feed |
| ThailandMap section | Accessible via Map quick-action |
| CompactPremiumBanner | Slimmer conditional banner |

## Components Created

| Component | Purpose |
|-----------|---------|
| QuickActionGrid | 2x3 icon card grid |
| QuickActionCard | Single action card (icon + label + route) |
| LearningProgressCard | Lesson progress + streak + CTA |
| ContentFeed | Infinite scroll article/event feed |
| ContentFeedCard | Feed card (image or text-only variant) |
| SearchOverlay | Full-screen search (triggered from navbar) |

## Components Modified

| Component | Changes |
|-----------|---------|
| Navbar | Remove nav links, add search icon + profile avatar, simplify |
| Home | Replace all sections with new layout |

## Data Requirements

No new API endpoints needed. All data comes from:
- `trpc.article.list` (content feed with category filter)
- `/api/progress` (learning progress)
- `trpc.newsletter.subscribe` (newsletter)
- Existing auth context (premium status, profile)

## Mobile Behavior

- Quick actions: 3-column grid, cards shrink proportionally
- Learning card: full-width, stacks vertically
- Content feed: full-width cards, single column
- Filter pills: horizontal scroll with overflow
- No bottom tab bar — all navigation through quick actions

## Animations

Keep Framer Motion but use subtly:
- Cards: fade-in on mount, no parallax
- Quick actions: staggered entrance animation
- Feed: fade-in as cards enter viewport
- No scroll-triggered parallax effects
