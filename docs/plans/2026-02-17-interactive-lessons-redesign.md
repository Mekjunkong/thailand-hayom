# Interactive Lessons Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete overhaul of the Thai language learning experience — new Diia-inspired UI, bug fixes, content generation for all 29 lessons, legacy system removal.

**Architecture:** Hybrid approach — new UI components for lesson browser and flashcard player, reuse/fix existing `lessonsData.ts` data structure and backend APIs. Remove legacy `/lessons` system. Keep SM-2 spaced repetition backend.

**Tech Stack:** React 19, TailwindCSS v4, Wouter, Web Speech API, CSS 3D transforms, existing tRPC/Express APIs.

---

## Dependency Graph

```
[T1] → [T2, T3] → [T4] → [T5] → [T6, T7] → [T8] → [T9]
```

- **T1:** Backend bug fixes (foundation for everything)
- **T2, T3:** New UI components (browser + player) — parallel, no interdependency
- **T4:** Rewrite `InteractiveLessons.tsx` to use new components
- **T5:** Update Quiz page for new phraseId scheme
- **T6, T7:** Content generation (exercises + dialogues) + lesson dedup — parallel
- **T8:** Legacy removal (delete old files, update App.tsx + Progress.tsx)
- **T9:** Visual verification and polish

---

### Task 1: Fix Backend Bugs

Three bugs in `server/progressRouter.ts` and the client-side `saveProgress` call.

**Files:**
- Modify: `server/progressRouter.ts:250-277` (due-phrases SQL filter)
- Modify: `client/src/pages/InteractiveLessons.tsx:59,82` (type mismatch fix)

**Step 1: Fix the `saveProgress` type mismatch**

In `client/src/pages/InteractiveLessons.tsx`, the `saveProgress` function sends `completed` as a number (`1`), but the server at line 61 validates `typeof completed !== "boolean"`. Fix:

```typescript
// Line 59: Change parameter type from number to boolean
const saveProgress = async (lessonId: number, completed: boolean) => {

// Line 82: Change the call to send true instead of 1
saveProgress(selectedLessonId, true);
```

Also fix the progress loading check at line 42 — server stores `completed` as boolean, not integer:

```typescript
// Line 42: Change from p.completed === 1 to p.completed === true or just p.completed
if (p.completed) {
```

**Step 2: Fix due-phrases SQL query**

In `server/progressRouter.ts`, the `/api/progress/quiz/due` endpoint (line 250-277) fetches ALL quiz records then filters in JavaScript. Replace with SQL `WHERE` clause using `lte` from drizzle-orm:

```typescript
// Line 2: Add lte to imports
import { eq, and, lte } from "drizzle-orm";

// Lines 264-270: Replace the JS filter with SQL WHERE
const now = new Date();
const due = await db
  .select()
  .from(quizPerformance)
  .where(
    and(
      eq(quizPerformance.userId, user.id),
      lte(quizPerformance.nextReview, now)
    )
  );

res.json({ due, count: due.length });
```

Remove the old JavaScript filter lines (268-270).

**Step 3: Verify**

Run: `pnpm check`
Expected: No new type errors from these changes.

**Step 4: Commit**

```bash
git add server/progressRouter.ts client/src/pages/InteractiveLessons.tsx
git commit -m "fix: resolve progress save type mismatch and optimize due-phrases query"
```

---

### Task 2: Create Lesson Browser Component

New Diia-inspired lesson browser with category filters and progress tracking.

**Files:**
- Create: `client/src/components/LessonBrowser.tsx`

**Context:** This component replaces the lesson grid in `InteractiveLessons.tsx`. It receives lessons data, completed lesson IDs, and an `onSelectLesson` callback. It renders a category filter bar and a responsive card grid.

**Step 1: Create the component**

```tsx
import { useState } from "react";
import { Link } from "wouter";
import { CheckCircle2, BookOpen, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Lesson } from "@/components/InteractiveLessonPlayer";

interface LessonBrowserProps {
  lessons: Lesson[];
  completedLessons: Set<number>;
  onSelectLesson: (lessonId: number) => void;
}

// Category definitions with pastel accent colors
const categories = [
  { id: "all", label: "All", labelHe: "הכל", color: "bg-gray-200" },
  { id: "essentials", label: "Essentials", labelHe: "בסיסי", color: "bg-amber-200", lessonIds: [1, 2, 10] },
  { id: "food", label: "Food & Dining", labelHe: "אוכל", color: "bg-rose-200", lessonIds: [3] },
  { id: "shopping", label: "Shopping & Money", labelHe: "קניות", color: "bg-emerald-200", lessonIds: [4, 21] },
  { id: "transport", label: "Getting Around", labelHe: "תחבורה", color: "bg-sky-200", lessonIds: [5, 13] },
  { id: "places", label: "Places & Culture", labelHe: "תרבות", color: "bg-violet-200", lessonIds: [6, 8, 27, 30] },
  { id: "health", label: "Health & Safety", labelHe: "בריאות", color: "bg-orange-200", lessonIds: [7, 12] },
  { id: "social", label: "Social & Leisure", labelHe: "חברתי", color: "bg-teal-200", lessonIds: [9, 17, 18, 19, 24, 25, 26] },
  { id: "advanced", label: "Advanced", labelHe: "מתקדם", color: "bg-slate-200", lessonIds: [14, 15, 16, 20, 22, 23, 28, 29] },
];

// Map lesson IDs to their category color
function getCategoryColor(lessonId: number): string {
  for (const cat of categories) {
    if (cat.lessonIds?.includes(lessonId)) return cat.color;
  }
  return "bg-gray-200";
}

export default function LessonBrowser({ lessons, completedLessons, onSelectLesson }: LessonBrowserProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const { language, t } = useLanguage();

  const filteredLessons = activeCategory === "all"
    ? lessons
    : lessons.filter(l => {
        const cat = categories.find(c => c.id === activeCategory);
        return cat?.lessonIds?.includes(l.id);
      });

  const totalProgress = Math.round((completedLessons.size / lessons.length) * 100);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <div className="border-b-2 border-black">
        <div className="container mx-auto px-4 py-10 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight">
                {t({ he: "למדו תאילנדית", en: "Learn Thai" })}
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                {t({
                  he: "שיעורים אינטראקטיביים עם הגייה ותרחישים אמיתיים",
                  en: "Interactive lessons with pronunciation and real scenarios",
                })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">
                  {t({ he: "התקדמות", en: "Progress" })}
                </div>
                <div className="text-2xl font-bold text-black">
                  {completedLessons.size}/{lessons.length}
                </div>
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black rounded-full transition-all duration-500"
                  style={{ width: `${totalProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Action pills */}
          <div className="flex gap-3 mt-6">
            <Link href="/quiz">
              <button className="px-4 py-2 border-2 border-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors">
                {t({ he: "תרגול חידון", en: "Practice Quiz" })}
              </button>
            </Link>
            <button
              onClick={() => window.open("/api/phrase-cards/generate", "_blank")}
              className="px-4 py-2 border-2 border-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors"
            >
              {t({ he: "כרטיסי ביטויים", en: "Phrase Cards" })}
            </button>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="border-b border-gray-200 sticky top-16 bg-white z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border-2 ${
                  activeCategory === cat.id
                    ? "border-black bg-black text-white"
                    : "border-gray-300 text-gray-700 hover:border-black"
                }`}
              >
                {language === "he" ? cat.labelHe : cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lesson grid */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLessons.map(lesson => {
            const isCompleted = completedLessons.has(lesson.id);
            const accentColor = getCategoryColor(lesson.id);
            const exerciseCount = lesson.exercises?.length ?? 0;

            return (
              <button
                key={lesson.id}
                onClick={() => onSelectLesson(lesson.id)}
                className={`text-left p-0 rounded-xl border-2 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5 ${
                  isCompleted
                    ? "border-gray-300 opacity-80"
                    : "border-black"
                }`}
              >
                {/* Accent strip */}
                <div className={`h-1.5 ${accentColor}`} />

                <div className="p-5">
                  {/* Top row: number + completed badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-gray-400">
                      #{String(lesson.id).padStart(2, "0")}
                    </span>
                    {isCompleted && (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    )}
                  </div>

                  {/* Icon + title */}
                  <div className="text-3xl mb-2">{lesson.icon}</div>
                  <h3 className="text-lg font-bold text-black leading-tight">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1" dir="rtl">
                    {lesson.titleHebrew}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 mt-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      {lesson.phrases.length} {t({ he: "ביטויים", en: "phrases" })}
                    </span>
                    {exerciseCount > 0 && (
                      <span className="flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" />
                        {exerciseCount} {t({ he: "תרגילים", en: "exercises" })}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Verify it compiles**

Run: `pnpm check`
Expected: No errors (component is self-contained).

**Step 3: Commit**

```bash
git add client/src/components/LessonBrowser.tsx
git commit -m "feat: add Diia-inspired LessonBrowser component"
```

---

### Task 3: Create Flashcard Lesson Player Component

New flashcard-based lesson player with flip animation, swipe navigation, exercises, dialogues, and completion tracking.

**Files:**
- Create: `client/src/components/FlashcardPlayer.tsx`

**Context:** This replaces `InteractiveLessonPlayer.tsx`. It receives a `Lesson` and callbacks. Features: flip card animation (CSS 3D), swipe/arrow navigation, "I practiced this" button that drives progress, exercise mode, dialogue mode, and completion screen. Uses the same Web Speech API pattern for pronunciation (Thai voice at 0.7x rate).

**Step 1: Create the component**

```tsx
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Volume2,
  ArrowLeft,
  ArrowRight,
  X,
  Check,
  RotateCcw,
  MessageSquare,
  FileText,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { Lesson, Phrase } from "@/components/InteractiveLessonPlayer";

interface FlashcardPlayerProps {
  lesson: Lesson;
  onComplete: () => void;
  onNext?: () => void;
  onBack: () => void;
}

type PlayerPhase = "phrases" | "exercises" | "dialogue" | "complete";

export default function FlashcardPlayer({
  lesson,
  onComplete,
  onNext,
  onBack,
}: FlashcardPlayerProps) {
  const { language, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [practicedPhrases, setPracticedPhrases] = useState<Set<number>>(new Set());
  const [phase, setPhase] = useState<PlayerPhase>("phrases");
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [exerciseScore, setExerciseScore] = useState({ correct: 0, total: 0 });
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const currentPhrase = lesson.phrases[currentIndex];
  const progress = (practicedPhrases.size / lesson.phrases.length) * 100;
  const allPhrasesPracticed = practicedPhrases.size === lesson.phrases.length;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase !== "phrases") return;
      if (e.key === "ArrowRight") nextPhrase();
      if (e.key === "ArrowLeft") prevPhrase();
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setIsFlipped(f => !f);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, currentIndex]);

  // Reset flip on phrase change
  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextPhrase();
      else prevPhrase();
    }
  };

  const nextPhrase = useCallback(() => {
    if (currentIndex < lesson.phrases.length - 1) {
      setCurrentIndex(i => i + 1);
    }
  }, [currentIndex, lesson.phrases.length]);

  const prevPhrase = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
  }, [currentIndex]);

  const markPracticed = () => {
    const newSet = new Set(practicedPhrases);
    newSet.add(currentPhrase.id);
    setPracticedPhrases(newSet);

    if (newSet.size === lesson.phrases.length) {
      // All phrases practiced
      if (lesson.exercises && lesson.exercises.length > 0) {
        setPhase("exercises");
      } else if (lesson.dialogue && lesson.dialogue.length > 0) {
        setPhase("dialogue");
      } else {
        onComplete();
        setPhase("complete");
      }
    } else {
      // Auto-advance to next unpracticed phrase
      if (currentIndex < lesson.phrases.length - 1) {
        setCurrentIndex(i => i + 1);
      }
    }
  };

  const playPronunciation = (text: string) => {
    if (!("speechSynthesis" in window)) {
      toast.info(t({ he: "אודיו לא נתמך בדפדפן זה", en: "Audio not supported in this browser" }));
      return;
    }
    setIsPlaying(true);
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const thaiVoice = voices?.find(v => v.lang?.startsWith("th"));
    if (thaiVoice) utterance.voice = thaiVoice;
    utterance.lang = "th-TH";
    utterance.rate = 0.7;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => {
      setIsPlaying(false);
      toast.error(currentPhrase.phonetic);
    };
    window.speechSynthesis.speak(utterance);
  };

  const handleExerciseAnswer = (exerciseId: number, optionIndex: number, correctAnswer: number) => {
    if (selectedAnswers[exerciseId] !== undefined) return; // Already answered
    setSelectedAnswers(prev => ({ ...prev, [exerciseId]: optionIndex }));
    setExerciseScore(prev => ({
      correct: optionIndex === correctAnswer ? prev.correct + 1 : prev.correct,
      total: prev.total + 1,
    }));
  };

  const finishExercises = () => {
    if (lesson.dialogue && lesson.dialogue.length > 0) {
      setPhase("dialogue");
    } else {
      onComplete();
      setPhase("complete");
    }
  };

  const finishDialogue = () => {
    if (!allPhrasesPracticed) {
      setPhase("phrases");
    } else {
      onComplete();
      setPhase("complete");
    }
  };

  // --- RENDER: Completion Screen ---
  if (phase === "complete") {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-6">✓</div>
          <h2 className="text-3xl font-bold text-black mb-2">
            {t({ he: "כל הכבוד!", en: "Well Done!" })}
          </h2>
          <p className="text-gray-600 mb-2">
            {lesson.icon} {lesson.title}
          </p>
          <div className="flex justify-center gap-8 my-8">
            <div>
              <div className="text-2xl font-bold">{lesson.phrases.length}</div>
              <div className="text-sm text-gray-500">{t({ he: "ביטויים", en: "phrases" })}</div>
            </div>
            {exerciseScore.total > 0 && (
              <div>
                <div className="text-2xl font-bold">
                  {exerciseScore.correct}/{exerciseScore.total}
                </div>
                <div className="text-sm text-gray-500">{t({ he: "תרגילים", en: "exercises" })}</div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            {onNext && (
              <button
                onClick={onNext}
                className="w-full py-3 px-6 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                {t({ he: "שיעור הבא", en: "Next Lesson" })} →
              </button>
            )}
            <button
              onClick={onBack}
              className="w-full py-3 px-6 border-2 border-black rounded-xl font-medium hover:bg-gray-100 transition-colors"
            >
              {t({ he: "חזרה לשיעורים", en: "Back to Lessons" })}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER: Exercises ---
  if (phase === "exercises" && lesson.exercises) {
    const allAnswered = lesson.exercises.every(ex => selectedAnswers[ex.id] !== undefined);
    return (
      <div className="min-h-screen bg-white pt-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold">
              {lesson.icon} {t({ he: "תרגילים", en: "Exercises" })}
            </h2>
            <div className="text-sm text-gray-500">
              {exerciseScore.correct}/{exerciseScore.total}
            </div>
          </div>

          <div className="space-y-6">
            {lesson.exercises.map(exercise => {
              const answered = selectedAnswers[exercise.id] !== undefined;
              const isCorrect = selectedAnswers[exercise.id] === exercise.correctAnswer;
              return (
                <div key={exercise.id} className="border-2 border-black rounded-xl p-6">
                  <p className="text-lg font-bold mb-1">{exercise.question}</p>
                  <p className="text-sm text-gray-500 mb-4" dir="rtl">{exercise.questionHebrew}</p>
                  <div className="space-y-2">
                    {exercise.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleExerciseAnswer(exercise.id, idx, exercise.correctAnswer)}
                        disabled={answered}
                        className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                          answered
                            ? idx === exercise.correctAnswer
                              ? "border-green-500 bg-green-50"
                              : idx === selectedAnswers[exercise.id]
                                ? "border-red-500 bg-red-50"
                                : "border-gray-200 opacity-50"
                            : "border-gray-200 hover:border-black"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {answered && (
                    <div className={`mt-3 p-3 rounded-lg text-sm ${isCorrect ? "bg-green-50" : "bg-amber-50"}`}>
                      <p>{exercise.explanation}</p>
                      <p className="text-gray-500 mt-1" dir="rtl">{exercise.explanationHebrew}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {allAnswered && (
            <div className="mt-8 mb-12">
              <button
                onClick={finishExercises}
                className="w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                {t({ he: "המשך", en: "Continue" })} →
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- RENDER: Dialogue ---
  if (phase === "dialogue" && lesson.dialogue) {
    return (
      <div className="min-h-screen bg-white pt-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold">
              {lesson.icon} {t({ he: "דו-שיח", en: "Dialogue" })}
            </h2>
            <div />
          </div>

          <div className="space-y-4">
            {lesson.dialogue.map((line, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border-2 ${
                  idx % 2 === 0 ? "border-black ml-0 mr-8" : "border-gray-300 ml-8 mr-0"
                }`}
              >
                <div className="text-xs font-medium text-gray-400 mb-1">
                  {line.speaker} / {line.speakerHebrew}
                </div>
                <div className="text-2xl font-bold mb-1">{line.thai}</div>
                <div className="text-sm text-gray-500 italic">{line.phonetic}</div>
                <div className="text-sm text-gray-700 mt-1" dir="rtl">{line.hebrew}</div>
                <button
                  onClick={() => playPronunciation(line.thai)}
                  className="mt-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Volume2 className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 mb-12">
            <button
              onClick={finishDialogue}
              className="w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              {t({ he: "סיום", en: "Finish" })} →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER: Phrases (Flashcard) ---
  return (
    <div className="min-h-screen bg-white pt-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-500">
              {lesson.icon} {lesson.title}
            </div>
          </div>
          <div className="text-sm text-gray-400">
            {currentIndex + 1}/{lesson.phrases.length}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-gray-200 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-black rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Phase tabs */}
        <div className="flex gap-2 mb-6 justify-center">
          <button
            onClick={() => setPhase("phrases")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all ${
              phase === "phrases" ? "border-black bg-black text-white" : "border-gray-200 text-gray-500"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            {t({ he: "ביטויים", en: "Phrases" })}
          </button>
          {lesson.dialogue && lesson.dialogue.length > 0 && (
            <button
              onClick={() => setPhase("dialogue")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all ${
                phase === "dialogue" ? "border-black bg-black text-white" : "border-gray-200 text-gray-500"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              {t({ he: "דו-שיח", en: "Dialogue" })}
            </button>
          )}
          {lesson.exercises && lesson.exercises.length > 0 && (
            <button
              onClick={() => setPhase("exercises")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all ${
                phase === "exercises" ? "border-black bg-black text-white" : "border-gray-200 text-gray-500"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              {t({ he: "תרגילים", en: "Exercises" })}
            </button>
          )}
        </div>

        {/* Flashcard */}
        <div
          className="perspective-1000 mb-8"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            onClick={() => setIsFlipped(f => !f)}
            className={`relative w-full min-h-[360px] cursor-pointer transition-transform duration-500 preserve-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            {/* Front */}
            <div className="absolute inset-0 backface-hidden border-2 border-black rounded-2xl p-8 flex flex-col items-center justify-center">
              <div className="text-6xl md:text-7xl font-bold text-black mb-4 text-center">
                {currentPhrase.thai}
              </div>
              <div className="text-xl md:text-2xl text-gray-400 mb-6">
                {currentPhrase.phonetic}
              </div>
              <button
                onClick={e => {
                  e.stopPropagation();
                  playPronunciation(currentPhrase.thai);
                }}
                disabled={isPlaying}
                className="flex items-center gap-2 px-5 py-2.5 border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors"
              >
                <Volume2 className="w-5 h-5" />
                {isPlaying
                  ? t({ he: "מנגן...", en: "Playing..." })
                  : t({ he: "האזן", en: "Listen" })}
              </button>
              <div className="mt-6 text-sm text-gray-400">
                {t({ he: "הקש להפוך", en: "Tap to flip" })}
              </div>
            </div>

            {/* Back */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 border-2 border-black rounded-2xl p-8 overflow-y-auto">
              <div className="text-2xl text-gray-400 mb-2 text-center">
                {currentPhrase.thai}
              </div>
              <div className="text-2xl font-bold text-black text-center mb-1">
                {currentPhrase.english}
              </div>
              <div className="text-xl text-gray-600 text-center mb-6" dir="rtl">
                {currentPhrase.hebrew}
              </div>

              {/* Scenario */}
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mb-4">
                <div className="text-sm font-bold text-amber-800 mb-1">
                  {t({ he: "מתי להשתמש", en: "When to use" })}
                </div>
                <p className="text-sm text-gray-700">{currentPhrase.scenario}</p>
              </div>

              {/* Cultural tip */}
              {currentPhrase.culturalTip && (
                <div className="bg-violet-50 border-2 border-violet-200 rounded-xl p-4">
                  <div className="text-sm font-bold text-violet-800 mb-1">
                    {t({ he: "טיפ תרבותי", en: "Cultural tip" })}
                  </div>
                  <p className="text-sm text-gray-700">{currentPhrase.culturalTip}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* "I practiced this" button */}
        <div className="flex justify-center mb-6">
          {practicedPhrases.has(currentPhrase.id) ? (
            <div className="flex items-center gap-2 px-5 py-2.5 text-green-700 bg-green-50 rounded-full border-2 border-green-200">
              <Check className="w-5 h-5" />
              {t({ he: "תורגל", en: "Practiced" })}
            </div>
          ) : (
            <button
              onClick={markPracticed}
              className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium"
            >
              <Check className="w-5 h-5" />
              {t({ he: "תירגלתי את זה", en: "I practiced this" })}
            </button>
          )}
        </div>

        {/* Dot navigation + arrows */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevPhrase}
            disabled={currentIndex === 0}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-1.5">
            {lesson.phrases.map((phrase, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? "bg-black scale-125"
                    : practicedPhrases.has(phrase.id)
                      ? "bg-green-400"
                      : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextPhrase}
            disabled={currentIndex === lesson.phrases.length - 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Add CSS for 3D card flip**

In `client/src/index.css`, add the following utilities:

```css
/* 3D card flip utilities */
.perspective-1000 {
  perspective: 1000px;
}
.preserve-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
```

**Step 3: Verify**

Run: `pnpm check`
Expected: No type errors.

**Step 4: Commit**

```bash
git add client/src/components/FlashcardPlayer.tsx client/src/index.css
git commit -m "feat: add FlashcardPlayer component with 3D flip and swipe navigation"
```

---

### Task 4: Rewrite InteractiveLessons Page

Replace the current `InteractiveLessons.tsx` with the new `LessonBrowser` and `FlashcardPlayer` components.

**Files:**
- Modify: `client/src/pages/InteractiveLessons.tsx` (full rewrite)

**Step 1: Rewrite the page**

```tsx
import { useState, useEffect } from "react";
import { lessonsData } from "@/data/lessonsData";
import { useAuth } from "@/_core/hooks/useAuth";
import LessonBrowser from "@/components/LessonBrowser";
import FlashcardPlayer from "@/components/FlashcardPlayer";

export default function InteractiveLessons() {
  const { isAuthenticated } = useAuth();
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

  // Load progress from database
  useEffect(() => {
    if (!isAuthenticated) return;
    const load = async () => {
      try {
        const res = await fetch("/api/progress");
        if (res.ok) {
          const data = await res.json();
          const completed = new Set<number>();
          data.progress.forEach((p: any) => {
            if (p.completed) completed.add(p.lessonId);
          });
          setCompletedLessons(completed);
        }
      } catch (e) {
        console.error("Failed to load progress:", e);
      }
    };
    load();
  }, [isAuthenticated]);

  const saveProgress = async (lessonId: number) => {
    if (!isAuthenticated) return;
    try {
      await fetch("/api/progress/lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, completed: true }),
      });
    } catch (e) {
      console.error("Failed to save progress:", e);
    }
  };

  const selectedLesson = lessonsData.find(l => l.id === selectedLessonId);

  const handleComplete = () => {
    if (!selectedLessonId) return;
    const updated = new Set(completedLessons);
    updated.add(selectedLessonId);
    setCompletedLessons(updated);
    saveProgress(selectedLessonId);
  };

  const handleNext = () => {
    if (!selectedLessonId) return;
    const idx = lessonsData.findIndex(l => l.id === selectedLessonId);
    if (idx < lessonsData.length - 1) {
      setSelectedLessonId(lessonsData[idx + 1].id);
    } else {
      setSelectedLessonId(null);
    }
  };

  if (selectedLesson) {
    return (
      <FlashcardPlayer
        lesson={selectedLesson}
        onComplete={handleComplete}
        onNext={handleNext}
        onBack={() => setSelectedLessonId(null)}
      />
    );
  }

  return (
    <LessonBrowser
      lessons={lessonsData}
      completedLessons={completedLessons}
      onSelectLesson={setSelectedLessonId}
    />
  );
}
```

**Step 2: Verify**

Run: `pnpm check`
Expected: No type errors.

Run: `pnpm dev` and navigate to `/interactive-lessons`
Expected: See the new Diia-style lesson browser. Click a lesson → flashcard player opens.

**Step 3: Commit**

```bash
git add client/src/pages/InteractiveLessons.tsx
git commit -m "feat: rewrite InteractiveLessons with LessonBrowser and FlashcardPlayer"
```

---

### Task 5: Fix Quiz PhraseId Encoding

Update the Quiz page to use stable `lessonId * 100 + phrase.id` encoding instead of fragile `lessonIndex * 100 + phraseIndex`.

**Files:**
- Modify: `client/src/pages/Quiz.tsx:41-51,69-81,86-101`

**Step 1: Fix the phraseId encoding**

In `Quiz.tsx`, find all three places where `lessonIndex * 100 + phraseIndex` is used and change to `lesson.id * 100 + phrase.id`:

```typescript
// Lines 41-51 (unauthenticated path): Change encoding
lessonsData.forEach((lesson) => {
  lesson.phrases.forEach((phrase) => {
    allPhrases.push({
      id: lesson.id * 100 + phrase.id,
      thai: phrase.thai,
      phonetic: phrase.phonetic,
      english: phrase.english,
      hebrew: phrase.hebrew,
      lessonTitle: lesson.title,
    });
  });
});

// Lines 69-81 (authenticated fallback): Same change
lessonsData.forEach((lesson) => {
  lesson.phrases.forEach((phrase) => {
    allPhrases.push({
      id: lesson.id * 100 + phrase.id,
      thai: phrase.thai,
      phonetic: phrase.phonetic,
      english: phrase.english,
      hebrew: phrase.hebrew,
      lessonTitle: lesson.title,
    });
  });
});

// Lines 86-101 (due phrases decoding): Fix decoder
const duePhrases = data.due.map((d: any) => {
  const lessonId = Math.floor(d.phraseId / 100);
  const phraseId = d.phraseId % 100;
  const lesson = lessonsData.find(l => l.id === lessonId);
  const phrase = lesson?.phrases.find(p => p.id === phraseId);

  if (!phrase || !lesson) return null;

  return {
    id: d.phraseId,
    thai: phrase.thai,
    phonetic: phrase.phonetic,
    english: phrase.english,
    hebrew: phrase.hebrew,
    lessonTitle: lesson.title,
  };
}).filter(Boolean);
```

Key change in decoder: use `lessonsData.find(l => l.id === lessonId)` instead of `lessonsData[lessonIndex]`, and `lesson.phrases.find(p => p.id === phraseId)` instead of `lesson.phrases[phraseIndex]`.

**Step 2: Verify**

Run: `pnpm check`
Expected: No type errors.

**Step 3: Commit**

```bash
git add client/src/pages/Quiz.tsx
git commit -m "fix: use stable lesson.id-based phraseId encoding in Quiz"
```

---

### Task 6: Generate Exercises and Dialogues for All Lessons

Add exercises (3-5 per lesson) and dialogues (4-8 lines per lesson) for lessons 2-30 in `lessonsData.ts`.

**Files:**
- Modify: `client/src/data/lessonsData.ts`

**Context:** Currently only lesson 1 has exercises and dialogue. Lessons 2-30 have only phrases. Each lesson needs:
- `exercises`: Array of `Exercise` objects matching the `Exercise` interface from `InteractiveLessonPlayer.tsx`
- `dialogue`: Array of `DialogueLine` objects matching the `DialogueLine` interface

The exercises should test the specific phrases in each lesson — phrase recognition ("What does X mean?"), usage scenarios ("What would you say when..."), and cultural knowledge. The dialogues should be practical conversations matching the lesson topic with contextual speaker names.

**Important interfaces** (from `InteractiveLessonPlayer.tsx`):

```typescript
interface Exercise {
  id: number;
  question: string;
  questionHebrew: string;
  options: string[];
  correctAnswer: number; // index into options array
  explanation: string;
  explanationHebrew: string;
}

interface DialogueLine {
  speaker: string;
  speakerHebrew: string;
  thai: string;
  phonetic: string;
  hebrew: string;
}
```

**Step 1:** Add exercises and dialogue arrays to each of the 29 lessons (2-30, skipping merged lesson 11). Each lesson gets 3-5 exercises and 4-6 dialogue lines.

Exercise IDs should be unique across all lessons. Lesson 1 already uses exercise IDs 1-3. Start lesson 2 exercises at ID 4, and increment sequentially.

Speaker names should be contextual: "You"/"אתה" paired with "Waiter"/"מלצר" (food), "Vendor"/"מוכר" (shopping), "Driver"/"נהג" (transport), "Receptionist"/"פקיד קבלה" (accommodation), "Doctor"/"רופא" (medical), "Monk"/"נזיר" (temples), etc.

**Step 2:** Verify the file still compiles.

Run: `pnpm check`
Expected: No type errors.

**Step 3: Commit**

```bash
git add client/src/data/lessonsData.ts
git commit -m "feat: add exercises and dialogues for all 29 lessons"
```

---

### Task 7: Deduplicate Lessons

Merge duplicate lesson topics in `lessonsData.ts`.

**Files:**
- Modify: `client/src/data/lessonsData.ts`

**Step 1:** Remove lesson 11 ("Shopping & Bargaining" duplicate)

Lesson 4 (id: 4) and lesson 11 (id: 11) are both "Shopping & Bargaining" with `🛍️` icon. Merge lesson 11's unique phrases into lesson 4 (keep phrases that aren't duplicated), then delete the lesson 11 entry entirely.

**Step 2:** Differentiate overlapping number/time lessons

- Lesson 2 (id: 2): Keep as "Numbers & Time" — basic numbers 1-100, how much, what time
- Lesson 15 (id: 15): Rename to "Counting & Math" / "ספירה ומתמטיקה" — prices, quantities, bargaining numbers
- Lesson 16 (id: 16): Keep as "Time & Dates" — days, months, scheduling

**Step 3:** Update category mappings in `LessonBrowser.tsx`

After deleting lesson 11, remove ID 11 from the "shopping" category `lessonIds` array. Lesson count goes from 30 → 29.

**Step 4:** Verify

Run: `pnpm check`
Expected: No type errors.

**Step 5: Commit**

```bash
git add client/src/data/lessonsData.ts client/src/components/LessonBrowser.tsx
git commit -m "fix: deduplicate lessons — merge Shopping duplicates, differentiate number lessons"
```

---

### Task 8: Remove Legacy System

Delete all legacy lesson files and update references.

**Files:**
- Delete: `client/src/pages/LessonList.tsx`
- Delete: `client/src/pages/LessonDetail.tsx`
- Delete: `client/src/data/lessons.ts`
- Delete: `client/src/contexts/ProgressContext.tsx`
- Modify: `client/src/App.tsx` (remove imports, routes, ProgressProvider)
- Modify: `client/src/pages/Progress.tsx` (remove ProgressContext dependency, use database-backed progress)

**Step 1: Remove files**

```bash
rm client/src/pages/LessonList.tsx
rm client/src/pages/LessonDetail.tsx
rm client/src/data/lessons.ts
rm client/src/contexts/ProgressContext.tsx
```

**Step 2: Update App.tsx**

Remove these imports:
```typescript
// DELETE these lines:
import { ProgressProvider } from "./contexts/ProgressContext";
import LessonList from "./pages/LessonList";
import LessonDetail from "./pages/LessonDetail";
```

Remove these routes:
```tsx
// DELETE these route blocks:
<Route path={"/lessons"}>
  <AnimatedRoute component={LessonList} />
</Route>
<Route path="/lesson/:id" component={LessonDetail} />
```

Remove `ProgressProvider` wrapper from the App component — replace:
```tsx
<ProgressProvider>
  <TooltipProvider>
    ...
  </TooltipProvider>
</ProgressProvider>
```
with just:
```tsx
<TooltipProvider>
  ...
</TooltipProvider>
```

**Step 3: Rewrite Progress.tsx**

The current `Progress.tsx` depends on `useProgress()` (localStorage) and `lessons` (legacy data). Rewrite it to use the database-backed `lessonsData` and fetch progress from `/api/progress`:

```tsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Trophy, Target, Flame, BookOpen, CheckCircle2 } from "lucide-react";
import { lessonsData } from "@/data/lessonsData";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Progress() {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!isAuthenticated) return;
    const load = async () => {
      try {
        const res = await fetch("/api/progress");
        if (res.ok) {
          const data = await res.json();
          const completed = new Set<number>();
          data.progress.forEach((p: any) => {
            if (p.completed) completed.add(p.lessonId);
          });
          setCompletedLessons(completed);
        }
      } catch (e) {
        console.error("Failed to load progress:", e);
      }
    };
    load();
  }, [isAuthenticated]);

  const completedCount = completedLessons.size;
  const totalLessons = lessonsData.length;
  const completionPercentage = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-4 max-w-4xl py-12">
        <h1 className="text-4xl font-bold text-black mb-2">
          {t({ he: "התקדמות הלמידה", en: "Learning Progress" })}
        </h1>
        <p className="text-gray-600 mb-8">
          {t({ he: "מעקב אחר המסע שלך", en: "Track your journey" })}
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          <div className="border-2 border-black rounded-xl p-6">
            <Target className="w-6 h-6 mb-2" />
            <div className="text-3xl font-bold">{completionPercentage}%</div>
            <div className="text-sm text-gray-500">{t({ he: "השלמה", en: "Completion" })}</div>
          </div>
          <div className="border-2 border-black rounded-xl p-6">
            <CheckCircle2 className="w-6 h-6 mb-2" />
            <div className="text-3xl font-bold">{completedCount}/{totalLessons}</div>
            <div className="text-sm text-gray-500">{t({ he: "שיעורים", en: "Lessons" })}</div>
          </div>
          <div className="border-2 border-black rounded-xl p-6">
            <BookOpen className="w-6 h-6 mb-2" />
            <div className="text-3xl font-bold">{totalLessons * 5}</div>
            <div className="text-sm text-gray-500">{t({ he: "ביטויים", en: "Total phrases" })}</div>
          </div>
        </div>

        {/* Lesson list */}
        <h2 className="text-2xl font-bold mb-4">{t({ he: "שיעורים", en: "Lessons" })}</h2>
        <div className="space-y-3">
          {lessonsData.map(lesson => {
            const completed = completedLessons.has(lesson.id);
            return (
              <div
                key={lesson.id}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 ${
                  completed ? "border-green-400 bg-green-50" : "border-gray-200"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  completed ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
                }`}>
                  {completed ? "✓" : lesson.id}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{lesson.icon} {lesson.title}</div>
                  <div className="text-sm text-gray-500" dir="rtl">{lesson.titleHebrew}</div>
                </div>
                <Link href="/interactive-lessons">
                  <button className="px-4 py-1.5 border-2 border-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors">
                    {completed
                      ? t({ he: "סקירה", en: "Review" })
                      : t({ he: "התחל", en: "Start" })}
                  </button>
                </Link>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link href="/interactive-lessons">
            <button className="px-8 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
              {t({ he: "המשך ללמוד", en: "Continue Learning" })}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
```

**Step 4: Verify**

Run: `pnpm check`
Expected: No type errors. No imports of deleted files remain.

**Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove legacy lesson system (LessonList, LessonDetail, ProgressContext)"
```

---

### Task 9: Visual Verification and Polish

Final pass to verify everything works together.

**Files:**
- Potentially modify: any file that needs CSS tweaks

**Step 1: Run the app**

```bash
pnpm dev
```

**Step 2: Verify these flows**

1. Navigate to `/interactive-lessons` — should see Diia-style browser with category filters
2. Click a lesson — should see flashcard player with flip animation
3. Practice all phrases in a lesson — "I practiced this" should work, progress should advance
4. After all phrases → exercises should appear (if present)
5. After exercises → dialogue should appear (if present)
6. Completion screen should show with stats
7. Navigate to `/quiz` — should work with new phraseId encoding
8. Navigate to `/progress` — should show database-backed progress
9. Verify `/lessons` returns 404 (legacy route removed)
10. Verify `/pronunciation` still works

**Step 3: Fix any visual issues**

- Check mobile responsiveness (category pills horizontal scroll, card grid stacking)
- Check RTL text rendering for Hebrew
- Check flashcard flip animation smoothness
- Check that the `scrollbar-hide` class works on category filter

**Step 4: Run type check**

```bash
pnpm check
```

**Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: visual polish and responsive adjustments"
```
