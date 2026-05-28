# Thailand Hayom v2 — Design Spec

**Date:** 2026-05-28
**Status:** Approved by user
**Brainstorm session:** `.superpowers/brainstorm/76185-1779977668/`

---

## Core Principle

> "לומדים תאית שאפשר להשתמש בה מחר בבוקר בשוק"
> (Learning Thai you can actually use tomorrow morning at the market)

Every lesson is anchored to a real situation. Authentic dialogue, not textbook Thai. Success = functional fluency for travelers, not test scores. This principle governs all content and UX decisions.

---

## Product Vision

**"Best Thai language course for Israeli travelers"** — course-first platform where everything else supports the course.

- Primary audience: Israeli travelers planning or on a Thailand trip
- Primary language: Hebrew (RTL). English expansion in v2.
- Approach: Build the lesson player first (Course-In), then wrap with homepage and marketing.

---

## User Journey

```
Land on homepage → Demo lesson (no signup required) → Sign up free
→ Chapters 1–3 free → Unlock all with one-time payment → Daily habit loop
```

---

## Course Architecture

### 3 Parallel Tracks — 150+ Lessons

Users take a 10-question placement quiz on arrival and are routed to their level. Level can be changed at any time.

| Track | Emoji | Lessons | Chapters | Free tier |
|-------|-------|---------|----------|-----------|
| Beginner (מתחיל) | 🌱 | 50 | 5 × 10 | Chapters 1–3 |
| Intermediate (בינוני) | 📈 | 50 | 5 × 10 | Chapter 1 |
| Advanced (מתקדם) | 🎯 | 50+ | 5 × 10 | Chapter 1 |

### Chapter Topics (Beginner track — same structure for all tracks)

| Chapter | Theme | Situation |
|---------|-------|-----------|
| 1 | 🏖 הגעה (Arrival) | Airport, taxi, hotel check-in |
| 2 | 🍜 אוכל רחוב (Street Food) | Order food, handle spice levels, pay |
| 3 | 🛺 להסתובב (Getting Around) | Tuk-tuks, directions, bargaining |
| 4 | 🏪 שוק וקניות (Markets) | Haggling, compliments, numbers |
| 5 | 🤝 תרבות וחברים (Culture) | Respect, emergencies, making friends |

**Chapter finale:** After all 10 lessons, a full simulated dialogue challenge. Must pass to unlock next chapter. Examples: complete a market negotiation from start to finish, order a full meal with spice preferences, navigate from hotel to temple by tuk-tuk.

---

## Lesson Format — 3 Phases (~7 minutes total)

Each lesson is anchored to a specific real-life sub-situation within its chapter. Authentic Thai spoken by native speakers.

### Phase 1 — הקשיבו (Listen) · ~2 min
- Full dialogue between two characters in a real scenario
- User taps ▶ to hear each line
- Thai script shown after hearing (not before)
- No translation visible until user taps to reveal
- Pimsleur-style immersion: comprehension before analysis

### Phase 2 — תרגלו (Drill) · ~3 min
- 8 key phrases extracted from the dialogue
- Audio card per phrase: hear → repeat aloud → continue
- User guesses meaning before translation is revealed
- Repeat mode available for any card

### Phase 3 — מבחן קצר (Quiz) · ~2 min
- 5 questions: match translation / listen-and-choose / complete the dialogue
- ❤️❤️❤️ lives system — lose a life per wrong answer
- XP awarded on completion (more XP for no mistakes)
- Score screen with celebration animation on completion

---

## Gamification System

| Element | Mechanic |
|---------|----------|
| 🔥 רצף (Streak) | Daily practice maintains streak. Miss a day = streak resets. Gems can freeze streak. |
| ⚡ XP | Earned by completing each phase. Bonus XP for perfect quiz (no hearts lost). |
| 💎 אבנים (Gems) | Earned via XP milestones. Spendable to freeze a streak for 1 day. |
| 🏅 לוח מובילים (Leaderboard) | Hebrew-speaker-only weekly leaderboard. Resets every Monday. Top 10 shown. |
| 📅 לוח שבועי (Weekly calendar) | Visual heatmap of practice days this week. |

**Note:** The Hebrew-speaker-only leaderboard is a unique retention mechanic. Israelis competing against Israelis in Thai — no other platform offers this.

---

## Homepage — Interactive Demo Hero

The homepage IS the first lesson. No login required to start.

1. User lands → sees demo lesson player (Phase 1 fragment, ~3 phrases from Beginner Ch 1)
2. User hears authentic Thai, sees Thai script, taps to advance
3. After completing the fragment (first win) → CTA appears: "המשיכו — פתחו חשבון חינם"
4. Social proof counter visible: "X ישראלים לומדים תאית עכשיו 🔥"

**No static marketing hero above the fold.** The product sells itself by being experienced.

---

## Pricing Model

| Tier | Price | What's included |
|------|-------|-----------------|
| Free | ₪0 | Beginner Ch 1–3 (30 lessons) + Intermediate Ch 1 + Advanced Ch 1 + Leaderboard + Streak/XP |
| 🌱 Beginner unlock | ₪79 | Full Beginner track (50 lessons) |
| 📈 Intermediate unlock | ₪99 | Full Intermediate track (50 lessons) |
| 🎁 All tracks bundle | ₪149 | All 3 tracks (150+ lessons) — shown as "most popular", crossed-out ₪307 |

Pricing is one-time, no subscription. The bundle is anchored by showing the combined individual price (₪307) crossed out.

---

## Design System

**Skill requirements at implementation time:**
- Run `/ui-ux-pro-max` with `--design-system` before any page design
- Run `/impeccable teach` to create PRODUCT.md and DESIGN.md
- Use `/impeccable shape` before implementing each feature
- Use `/impeccable craft` to build each page/component

### Design System Baseline (from ui-ux-pro-max)

| Token | Value | Notes |
|-------|-------|-------|
| Style | Vibrant & Block-based | Bold, energetic, geometric — matches gamified course |
| Primary | `oklch(52% 0.24 264)` | Learning indigo (converted from #2563EB) |
| Secondary | `oklch(60% 0.21 264)` | |
| CTA | `oklch(68% 0.19 40)` | Orange — all primary action buttons |
| Background | `oklch(97% 0.005 264)` | Tinted off-white, never pure #fff |
| Text | `oklch(20% 0.015 264)` | Near-black, never pure #000 |
| Heading font | Noto Sans Hebrew | RTL-first, weights 300/400/500/700 |
| Body font | Noto Sans Hebrew | Same family, consistent across RTL/LTR |
| Spacing | 4pt/8pt grid | Consistent rhythm throughout |
| Animation | 150–300ms ease-out-quart | No bounce, no elastic, no layout props |

### Impeccable Design Laws (enforced on every component)

- **OKLCH only.** No `#000`, no `#fff`. Every neutral tinted toward the brand hue.
- **No gradient text.** Single solid color, emphasis via weight/size.
- **No side-stripe borders.** Use full borders, background tints, or nothing.
- **No glassmorphism by default.** Only if functionally justified.
- **No identical card grids.** Vary layout — lesson cards, chapter cards, and progress cards each have distinct affordances.
- **No hero-metric template.** Dashboard stats use custom layouts, not "big number + small label".
- **Dark theme for lesson player.** Scene: learner on a phone at night in their hotel room, ambient glow, focused mode. This forces dark. Homepage is light.
- **Motion is meaningful.** Every animation expresses cause-effect. Phase transitions use directional slides (Phase 1→2→3 moves left). Chapter unlock uses a celebratory scale + fade.

### AI Slop Avoidance

- First-order reflex: "language learning app → green/blue bubbly Duolingo clone." Rejected. Use bold indigo + orange with block geometry.
- Second-order reflex: "Hebrew education → clean white with Star of David motifs." Rejected. This is a travel product, not a school. The visual language is Thailand + travel energy.

---

## Technical Architecture

**No stack change.** Existing stack is solid:
- React 19 + Vite 7 + TailwindCSS v4 + Wouter (routing)
- Express 4 + tRPC 11 + Drizzle ORM + PostgreSQL (Supabase)
- Stripe (ILS) + Resend + existing auth

**New DB tables required:**
- `placement_results` — user placement quiz score + assigned track
- `lesson_phases` — track completion of each phase per lesson per user (not just lesson-level progress)
- `streaks` — current streak, last practice date, gem freezes used
- `xp_log` — XP events per user
- `leaderboard_weekly` — materialized weekly rankings
- `gem_transactions` — gem earn/spend log

**Content schema change:**
- Lessons need `track` (beginner/intermediate/advanced) + `chapter` + `phase_1_dialogue` + `phase_2_phrases[]` + `phase_3_quiz[]`
- All phrase audio needs native speaker recordings (upgrade from current TTS)

---

## Build Sequence (Course-In approach)

Build from the inside out. Each phase is complete and shippable before moving to the next.

1. **Lesson player** — 3-phase UX with audio, lives, XP. Single lesson, end-to-end.
2. **Gamification layer** — streak, XP, gems, weekly calendar, leaderboard.
3. **Course dashboard** — placement quiz, track selection, chapter map, progress state.
4. **Freemium gates** — lock/unlock logic, Stripe checkout for each tier + bundle.
5. **Homepage** — interactive demo hero, sign-up flow, social proof.
6. **Content migration** — restructure existing 30 lessons into new schema, add remaining 120+ lessons.
7. **Admin tooling** — lesson/phase/audio management for content at scale.

---

## Out of Scope (v1)

- English UI (v2)
- Mobile app (v2)
- Community features / forum
- AI concierge (deprioritized — course is the product)
- Blog / articles (kept as-is, not rebuilt in v1)
