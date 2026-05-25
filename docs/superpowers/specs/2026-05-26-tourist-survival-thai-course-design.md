# Tourist Survival Thai Course Redesign Spec

Date: 2026-05-26
Project: Thailand Hayom
Status: Draft approved for review

## Product Direction

Thailand Hayom should become a practical Thai speaking course for Israeli tourists.

Primary promise:

> Speak enough Thai for your Thailand trip in 7 days.

The site should stop presenting itself as a broad Thailand blog first. Travel articles, guides, and the existing welcome kit become supporting material around the main course offer.

## Audience

Primary audience:

- Israeli tourists preparing for a short Thailand trip, usually 1-4 weeks.
- Hebrew-first learners who want practical speaking confidence, not academic Thai.
- People who need quick phrases for taxis, food, hotels, shopping, emergencies, and polite daily interaction.

Secondary audience:

- Israelis already in Thailand who need quick help in common travel situations.
- Friends or family recommending a simple Thai survival course before a trip.

## Business Model

Use a free-account plus paid-unlock model.

Free account:

- Lets users create an account before purchase.
- Saves lesson progress.
- Unlocks 2-3 sample lessons.
- Shows the course dashboard with locked lessons visible.
- Captures leads for future offers.

Paid unlock:

- Unlocks the full 7-day speaking course.
- Unlocks audio for every phrase.
- Unlocks listen/repeat practice and mini quizzes.
- Includes downloadable PDF phrasebook.
- Includes emergency scripts and a travel Thai cheat sheet.

Initial monetization should be a one-time course purchase. Subscription can wait until there is evidence that users want ongoing content.

Suggested first price range:

- Launch test: ₪49-₪99.
- Lower-price tripwire option: ₪20-₪49 for a smaller phrase pack if needed.

## Course Structure

The course should be short, practical, and situation-based.

Modules:

1. Greetings and respect
2. Taxi, Grab, and directions
3. Food, restaurants, allergies, and spice level
4. Shopping, markets, and bargaining
5. Hotel, check-in, and accommodation problems
6. Emergency, doctor, police, and asking for help
7. Friendly small talk and review practice

Each lesson should include:

- Situation title in Hebrew.
- Thai phrase.
- Hebrew meaning.
- Simple pronunciation for Hebrew speakers.
- Audio playback.
- Repeat/practice action.
- Short quiz or check.
- Completion state.

## Site Information Architecture

Primary public routes:

- `/` Homepage
- `/interactive-lessons` Course dashboard or sample lessons
- `/lesson/:id` Lesson experience, or current lesson detail route if reused
- `/welcome-kit` Paid unlock / course purchase page
- `/articles` SEO/support articles
- `/emergency` Emergency scripts and quick phrases
- `/profile` Account, progress, and purchases

Homepage role:

- Sell the course clearly.
- Explain who it is for.
- Show the 7-day course path.
- Let users start free or unlock the full course.

Course dashboard role:

- Show lesson progress.
- Show free lessons unlocked.
- Show paid lessons locked with a clear unlock CTA.

Welcome kit role:

- Become the paid course unlock page.
- Present the PDF phrasebook and travel guide as bonuses, not the main product.

Articles role:

- Support SEO and trust.
- Keep travel guide content, but do not compete with the main course offer.

## Navigation

The public nav should make the product obvious.

Recommended nav items:

- Course
- Free lesson
- Articles
- Emergency
- Login

When logged in:

- Course
- Progress
- Articles
- Emergency
- Profile

Primary nav CTA:

- Logged out: Start free
- Logged in, not paid: Unlock course
- Paid: Continue lesson

## Homepage Content Model

Recommended homepage sections:

1. Hero: Thai Speaking Course for Israeli Tourists
2. First free practice: one visible useful phrase with audio-style UI
3. Seven-day course path
4. What you will be able to say
5. Free vs paid comparison
6. Course bonuses: PDF phrasebook, emergency scripts, cheat sheet
7. Final CTA

Avoid:

- Generic trust stats unless verified.
- Fake testimonials.
- Repeated emoji-heavy cards.
- Large unrelated travel blog blocks above the course.
- Multiple competing purchase products.

## Visual Direction

Tone:

- Trustworthy
- Warm
- Practical
- Hebrew-first
- Travel-learning product, not generic tourism blog

Design should feel like a compact course platform:

- Clear course path.
- Strong lesson progress.
- Calm but warm palette.
- Real Thailand imagery used sparingly.
- Less orange gradient sales styling.
- Fewer badges, emojis, and fake proof elements.

Recommended visual system:

- Background: soft warm neutral, not pure white.
- Primary accent: warm amber or saffron used deliberately.
- Secondary accent: deep green or teal for learning/progress.
- Text: high-contrast dark neutral.
- Cards: restrained, flat, functional.
- Buttons: clear state hierarchy, primary CTA always obvious.

## Authentication and Access

Login exists to support course progress and paid access.

Required states:

- Logged out visitor.
- Logged in free user.
- Logged in paid user.
- Payment success.
- Locked lesson.
- Completed lesson.

Access rules:

- Free users can access sample lessons.
- Paid lessons are visible but locked.
- Paid users can access all course modules and bonuses.
- Profile should show purchase status and progress.

## Core User Flows

Visitor to free account:

1. User lands on homepage.
2. User clicks Start free.
3. User creates account or logs in.
4. User lands on course dashboard.
5. User starts sample lesson.

Free user to paid unlock:

1. User reaches locked lesson or paid CTA.
2. User opens unlock page.
3. User pays.
4. User returns to success page.
5. Course dashboard shows all lessons unlocked.

Paid user returning:

1. User logs in.
2. Dashboard shows progress.
3. User clicks Continue lesson.

## Implementation Boundaries

Preserve existing deployment fixes and serverless routing changes.

Likely frontend files to modify:

- `client/src/index.css`
- `client/src/components/Navbar.tsx`
- `client/src/pages/Home.tsx`
- `client/src/pages/WelcomeKit.tsx`
- `client/src/pages/InteractiveLessons.tsx`
- `client/src/pages/LessonDetail.tsx`
- `client/src/pages/Profile.tsx`

Potential supporting components:

- Course hero component.
- Lesson preview/practice component.
- Course module list.
- Locked lesson card.
- Pricing/unlock block.

Do not rebuild backend auth unless existing login cannot support the required states.

## Risks and Open Checks

- Existing TypeScript check has known unrelated errors; do not mix those fixes into the redesign unless needed.
- Current article route may show empty content. Redesign should include a useful empty state.
- Existing paid product naming may conflict with the new course offer. Rename carefully so Stripe/product copy stays coherent.
- Claims like 5,000 users or 4.9 rating should be removed unless verified.

## Acceptance Criteria

The redesign is successful when:

- Homepage immediately communicates Thai speaking course for Israeli tourists.
- A new user can understand the free account and paid unlock model.
- Login is visible and connected to progress.
- Course dashboard clearly shows free, locked, and completed lessons.
- Paid course page sells one main product.
- Articles and travel guide content support the course instead of competing with it.
- Desktop and mobile layouts have no overlap, clipping, or confusing text hierarchy.
- Build succeeds.
- Browser verification covers homepage, course dashboard, paid unlock page, login/profile state where practical, and one mobile viewport.
