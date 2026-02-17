# Interactive Lessons Redesign — Design Document

**Date:** 2026-02-17
**Status:** Approved
**Goal:** Complete overhaul of the Thai language learning experience — new Diia-inspired UI, fix all bugs, generate missing content, consolidate legacy systems.

## Context

The current Interactive Lessons feature has two parallel systems (`/lessons` legacy + `/interactive-lessons` modern), critical bugs that prevent progress from ever saving, exercises/dialogues only for lesson 1 of 30, and a dated UI. This redesign unifies everything into a single polished experience.

## Approach: Hybrid (New UI Shell + Reuse/Fix Data Layer)

- Build new UI components for the lesson browser and flashcard player
- Reuse the existing `lessonsData.ts` data structure (add exercises/dialogues)
- Fix backend bugs (type mismatch, phraseId encoding, SQL query)
- Remove legacy system entirely
- Keep SM-2 spaced repetition (it's well-built)

## Design Decisions

- **Visual vibe:** Diia.Education-inspired — minimalist, white/light base, black text, 2px borders, pastel category accents, generous whitespace
- **Lesson player:** Clean flashcard flow — one phrase at a time, large Thai text, flip to reveal, swipe to advance
- **Legacy:** Remove `/lessons` route + all associated files. Keep `/pronunciation` as standalone.
- **Content:** Generate exercises + dialogues for all lessons. Merge duplicate lesson topics (30 → 29 lessons).

## Section 1: Lesson Browser Page

**Route:** `/interactive-lessons`

**Layout:** White/light background, black text, clean borders, pastel accents.

**Structure:**

1. **Header bar** — "Learn Thai" title (bold, large) + Hebrew subtitle. Inline progress: "12/30 completed" with thin progress bar. Two action pills: "Practice Quiz" + "Download Cards".

2. **Category filter** — Horizontal scrollable pills:
   - Essentials (Greetings, Numbers, Survival Phrases)
   - Food & Dining
   - Shopping & Money
   - Getting Around
   - Places & Culture
   - Health & Safety
   - Social & Leisure
   - Advanced Topics

3. **Lesson grid** — 3 columns desktop, 2 tablet, 1 mobile. Each card:
   - White background, 2px black border, rounded corners
   - Pastel accent strip on top edge (color from category)
   - Lesson number badge (top-left)
   - Emoji icon
   - Title (English) + Hebrew subtitle
   - "5 phrases · 3 exercises" meta text
   - Thin progress bar at bottom
   - Completed: checkmark badge, muted styling

4. **No marketing sections** — the page is the product.

## Section 2: Flashcard Lesson Player

**Trigger:** Click any lesson card.

**Layout:** Dedicated page, minimal chrome.

**Header:** Lesson title + emoji, thin progress bar (phrase 3/5), close/back button.

**Flashcard (center, ~60% viewport):**

- **Front:** Large Thai script (6xl-7xl, bold, black), phonetic (2xl, gray), "Listen" button (Web Speech API TTS). Tap to flip.
- **Back:** Thai (smaller), English translation (large), Hebrew (RTL), "When to use" scenario (pastel amber box), cultural tip (pastel purple box, if present).
- **Flip animation:** CSS 3D rotateY, 0.4s ease.

**Navigation:**
- Swipe (touch) or arrow keys (desktop) to advance
- Dot indicators at bottom
- "I practiced this" button → marks phrase complete (fixes the bug)
- After all phrases → exercises

**Exercise mode:**
- Multiple choice, card-style, 4 options per question
- Immediate green/red feedback + bilingual explanation

**Dialogue mode (if present):**
- Alternating speaker bubbles
- Thai + phonetic + Hebrew per line
- "Listen" button per line

**Completion screen:**
- Checkmark animation
- Stats: phrases practiced, exercise score
- "Next Lesson" + "Back to Lessons" buttons
- Progress saves to database

## Section 3: Bug Fixes & Backend Cleanup

### Bugs to Fix

1. **Progress chain:** Add "I practiced this" button calling `markPhraseComplete()`. Fix `saveProgress()` to send `completed: true` (boolean, not integer `1`). Auto-complete lesson when all phrases practiced + exercises scored.

2. **Phrase ID encoding:** Change from `lessonIndex * 100 + phraseIndex` to `lessonId * 100 + phrase.id` (stable IDs based on lesson/phrase IDs, not array position).

3. **Due-phrases SQL:** Move `nextReview <= now` filter from JavaScript into the SQL `WHERE` clause.

### Legacy Removal

- Delete: `LessonList.tsx`, `LessonDetail.tsx`, `lessons.ts` (data), `ProgressContext.tsx`
- Remove: `/lessons` route, `/lesson/:id` route, `ProgressProvider` from `App.tsx`

### Keep

- `/pronunciation` route (separate improvement later)
- `/quiz` route (fix phraseId encoding to match new scheme)
- SM-2 implementation in `progressRouter.ts`
- `bookmarkedPhrases` table (future use)

## Section 4: Content Generation

### Exercises (lessons 2-29)

- 3-5 multiple choice questions per lesson
- Test: phrase recognition, usage scenarios, cultural knowledge
- 4 options, 1 correct, bilingual explanation (English + Hebrew)
- Match the specific phrases in each lesson

### Dialogues (lessons 2-29)

- 4-8 lines of scripted conversation per lesson
- Practical scenarios matching lesson topic
- Speaker + Thai + phonetic + Hebrew per line
- Contextual speakers: "You" + "Waiter", "You" + "Vendor", etc.

### Deduplication

- Merge lessons 4 and 11 (both "Shopping & Bargaining") → single lesson
- Differentiate overlapping number/time lessons: lesson 2 "Numbers & Time", lesson 15 "Counting & Math" (prices/quantities), lesson 16 "Time & Dates"
- Final count: 29 lessons

## Visual System

**Color palette:**
- Base: white (#ffffff) backgrounds, black (#000) text
- Borders: 2px solid black/gray
- Category accents (pastel): amber, rose, sky, emerald, violet, orange, teal, slate

**Typography:**
- Lesson titles: 2xl-3xl bold
- Thai script in player: 6xl-7xl bold
- Phonetic: 2xl gray
- Body: lg

**Animations:**
- Card flip: CSS 3D rotateY, 0.4s ease
- Swipe transitions: translateX with spring easing
- Progress bar fill: 0.3s ease
- Completion checkmark: scale + fade-in

**Bilingual:** All text uses `t({ he: "...", en: "..." })` pattern via `useLanguage()`.

## Technical Notes

- Flashcard swipe: CSS transforms + touch event handlers (no library)
- Web Speech API: keep existing Thai voice detection + 0.7x rate
- Content in `lessonsData.ts`: static file, no API needed
- Progress: existing `/api/progress` endpoints (with bug fixes)
- Quiz: existing `/quiz` page + SM-2 backend (with phraseId fix)
- All components use existing shadcn/ui primitives

## What's Removed

| Item | Action |
|---|---|
| `/lessons` route | Deleted |
| `/lesson/:id` route | Deleted |
| `LessonList.tsx` | Deleted |
| `LessonDetail.tsx` | Deleted |
| `client/src/data/lessons.ts` | Deleted |
| `ProgressContext.tsx` | Deleted |
| `ProgressProvider` wrapper | Removed from App.tsx |
| "Why Interactive Lessons" marketing section | Removed |
| Welcome kit / downloads CTA in lessons page | Removed |
| WhatsApp QR / email CTA in lesson detail | Removed |
