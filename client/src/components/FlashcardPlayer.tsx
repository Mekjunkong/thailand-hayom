import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  X,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Check,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lesson } from "@/components/InteractiveLessonPlayer";

interface FlashcardPlayerProps {
  lesson: Lesson;
  onComplete: () => void;
  onNext?: () => void;
  onBack: () => void;
}

type Phase = "phrases" | "exercises" | "dialogue" | "complete";

export default function FlashcardPlayer({
  lesson,
  onComplete,
  onNext,
  onBack,
}: FlashcardPlayerProps) {
  const { t } = useLanguage();

  // --- State ---
  const [phase, setPhase] = useState<Phase>("phrases");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [practicedPhrases, setPracticedPhrases] = useState<Set<number>>(
    new Set()
  );
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Exercise state
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [exerciseScore, setExerciseScore] = useState(0);
  const [exercisesAnswered, setExercisesAnswered] = useState(0);

  // Touch/swipe state
  const touchStartX = useRef<number | null>(null);

  const currentPhrase = lesson.phrases[currentPhraseIndex];
  const progress = (practicedPhrases.size / lesson.phrases.length) * 100;

  const hasExercises = lesson.exercises && lesson.exercises.length > 0;
  const hasDialogue = lesson.dialogue && lesson.dialogue.length > 0;

  // --- Speech API ---
  useEffect(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const playPronunciation = useCallback(
    (text: string) => {
      if (!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const thaiVoice = voices?.find(v => v.lang?.startsWith("th"));
      if (thaiVoice) utterance.voice = thaiVoice;
      utterance.lang = "th-TH";
      utterance.rate = 0.7;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    },
    []
  );

  // --- Navigation ---
  const goToPhrase = useCallback(
    (index: number) => {
      if (index >= 0 && index < lesson.phrases.length) {
        setCurrentPhraseIndex(index);
        setIsFlipped(false);
      }
    },
    [lesson.phrases.length]
  );

  const nextPhrase = useCallback(() => {
    goToPhrase(currentPhraseIndex + 1);
  }, [currentPhraseIndex, goToPhrase]);

  const prevPhrase = useCallback(() => {
    goToPhrase(currentPhraseIndex - 1);
  }, [currentPhraseIndex, goToPhrase]);

  // --- Keyboard navigation ---
  useEffect(() => {
    if (phase !== "phrases") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevPhrase();
      if (e.key === "ArrowRight") nextPhrase();
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setIsFlipped(f => !f);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, prevPhrase, nextPhrase]);

  // --- Touch swipe ---
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prevPhrase();
      else nextPhrase();
    }
    touchStartX.current = null;
  };

  // --- Practice tracking ---
  const markPracticed = () => {
    const newSet = new Set(practicedPhrases);
    newSet.add(currentPhrase.id);
    setPracticedPhrases(newSet);

    if (newSet.size < lesson.phrases.length) {
      toast.success(
        t({ en: "Phrase practiced!", he: "\u05EA\u05D5\u05E8\u05D2\u05DC!" })
      );
      return;
    }

    // All phrases practiced - transition
    toast.success(
      t({
        en: "All phrases practiced!",
        he: "\u05DB\u05DC \u05D4\u05DE\u05E9\u05E4\u05D8\u05D9\u05DD \u05EA\u05D5\u05E8\u05D2\u05DC\u05D5!",
      })
    );

    if (hasExercises) {
      setPhase("exercises");
    } else if (hasDialogue) {
      setPhase("dialogue");
    } else {
      onComplete();
      setPhase("complete");
    }
  };

  // --- Exercise logic ---
  const handleAnswerSelect = (optionIndex: number) => {
    if (selectedAnswer !== null) return; // Already answered
    setSelectedAnswer(optionIndex);
    const exercises = lesson.exercises!;
    const isCorrect = optionIndex === exercises[currentExerciseIndex].correctAnswer;
    if (isCorrect) {
      setExerciseScore(s => s + 1);
    }
    setExercisesAnswered(a => a + 1);
  };

  const handleExerciseContinue = () => {
    const exercises = lesson.exercises!;
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(i => i + 1);
      setSelectedAnswer(null);
    } else {
      // All exercises done
      if (hasDialogue) {
        setPhase("dialogue");
      } else {
        onComplete();
        setPhase("complete");
      }
    }
  };

  // --- Phase tab switching ---
  const switchPhase = (newPhase: Phase) => {
    setPhase(newPhase);
  };

  const isPracticed = practicedPhrases.has(currentPhrase?.id);

  // ========================
  // RENDER
  // ========================

  // --- Phrases Phase ---
  if (phase === "phrases") {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-lg mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center flex-1 mx-4">
              <h1 className="text-lg font-bold text-black truncate">
                {lesson.icon} {lesson.title}
              </h1>
            </div>
            <span className="text-sm font-medium text-gray-500 tabular-nums">
              {currentPhraseIndex + 1}/{lesson.phrases.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full mb-4" style={{ height: "1.5px" }}>
            <div
              className="bg-black rounded-full transition-all duration-300"
              style={{ height: "1.5px", width: `${progress}%` }}
            />
          </div>

          {/* Phase tabs */}
          <div className="flex gap-2 justify-center mb-6">
            <button
              onClick={() => switchPhase("phrases")}
              className="px-3 py-1 text-xs font-medium rounded-full bg-black text-white"
            >
              {t({ en: "Phrases", he: "\u05DE\u05E9\u05E4\u05D8\u05D9\u05DD" })}
            </button>
            {hasDialogue && (
              <button
                onClick={() => switchPhase("dialogue")}
                className="px-3 py-1 text-xs font-medium rounded-full border-2 border-black text-black hover:bg-gray-100 transition-colors"
              >
                {t({ en: "Dialogue", he: "\u05D3\u05D9\u05D0\u05DC\u05D5\u05D2" })}
              </button>
            )}
            {hasExercises && (
              <button
                onClick={() => switchPhase("exercises")}
                className="px-3 py-1 text-xs font-medium rounded-full border-2 border-black text-black hover:bg-gray-100 transition-colors"
              >
                {t({ en: "Exercises", he: "\u05EA\u05E8\u05D2\u05D9\u05DC\u05D9\u05DD" })}
              </button>
            )}
          </div>

          {/* Flashcard */}
          <div
            className="perspective-1000 mb-6"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={`preserve-3d relative transition-transform duration-500 cursor-pointer ${
                isFlipped ? "rotate-y-180" : ""
              }`}
              style={{ minHeight: "360px" }}
              onClick={() => setIsFlipped(f => !f)}
            >
              {/* Front */}
              <div className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-2xl border-2 border-black bg-white p-8">
                <span
                  className="text-4xl sm:text-5xl font-bold text-black mb-4 leading-tight text-center"
                  lang="th"
                >
                  {currentPhrase.thai}
                </span>
                <span className="text-lg sm:text-xl text-gray-500 mb-6 text-center">
                  {currentPhrase.phonetic}
                </span>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    playPronunciation(currentPhrase.thai);
                  }}
                  disabled={isPlaying}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-black text-sm font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  <Volume2 className="w-4 h-4" />
                  {isPlaying
                    ? t({ en: "Playing...", he: "\u05DE\u05E9\u05DE\u05D9\u05E2..." })
                    : t({ en: "Listen", he: "\u05D4\u05D0\u05D6\u05E0\u05D4" })}
                </button>
                <span className="mt-6 text-xs text-gray-400">
                  {t({ en: "Tap to flip", he: "\u05DC\u05D7\u05E5 \u05DC\u05D4\u05E4\u05D5\u05DA" })}
                </span>
              </div>

              {/* Back */}
              <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col rounded-2xl border-2 border-black bg-white p-8 overflow-y-auto">
                <span
                  className="text-lg font-bold text-black mb-2 text-center"
                  lang="th"
                >
                  {currentPhrase.thai}
                </span>
                <span className="text-2xl font-bold text-black mb-1 text-center">
                  {currentPhrase.english}
                </span>
                <span
                  className="text-2xl text-gray-700 mb-4 text-center hebrew-text"
                  dir="rtl"
                >
                  {currentPhrase.hebrew}
                </span>

                {/* When to use */}
                <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mb-3">
                  <h4 className="text-sm font-bold text-amber-900 mb-1">
                    {t({ en: "When to use", he: "\u05DE\u05EA\u05D9 \u05DC\u05D4\u05E9\u05EA\u05DE\u05E9" })}
                  </h4>
                  <p className="text-sm text-amber-800">
                    {currentPhrase.scenario}
                  </p>
                </div>

                {/* Cultural tip */}
                {currentPhrase.culturalTip && (
                  <div className="bg-violet-50 border-2 border-violet-200 rounded-xl p-4">
                    <h4 className="text-sm font-bold text-violet-900 mb-1">
                      {t({ en: "Cultural tip", he: "\u05D8\u05D9\u05E4 \u05EA\u05E8\u05D1\u05D5\u05EA\u05D9" })}
                    </h4>
                    <p className="text-sm text-violet-800">
                      {currentPhrase.culturalTip}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* "I practiced this" button */}
          <div className="flex justify-center mb-6">
            {isPracticed ? (
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium border-2 border-green-300">
                <Check className="w-4 h-4" />
                {t({ en: "Practiced", he: "\u05EA\u05D5\u05E8\u05D2\u05DC" })}
              </span>
            ) : (
              <button
                onClick={markPracticed}
                className="px-6 py-2.5 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                {t({ en: "I practiced this", he: "\u05EA\u05E8\u05D2\u05DC\u05EA\u05D9 \u05D0\u05EA \u05D6\u05D4" })}
              </button>
            )}
          </div>

          {/* Navigation arrows + dots */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevPhrase}
              disabled={currentPhraseIndex === 0}
              className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:hover:bg-white"
              aria-label="Previous phrase"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-1.5">
              {lesson.phrases.map((phrase, i) => (
                <button
                  key={phrase.id}
                  onClick={() => goToPhrase(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === currentPhraseIndex
                      ? "bg-black scale-125"
                      : practicedPhrases.has(phrase.id)
                        ? "bg-green-500"
                        : "bg-gray-300"
                  }`}
                  aria-label={`Go to phrase ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextPhrase}
              disabled={currentPhraseIndex === lesson.phrases.length - 1}
              className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:hover:bg-white"
              aria-label="Next phrase"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Exercises Phase ---
  if (phase === "exercises" && lesson.exercises) {
    const exercises = lesson.exercises;
    const exercise = exercises[currentExerciseIndex];

    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-lg mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-black">
              {t({ en: "Exercises", he: "\u05EA\u05E8\u05D2\u05D9\u05DC\u05D9\u05DD" })}
            </h1>
            <span className="text-sm font-medium text-gray-500 tabular-nums">
              {currentExerciseIndex + 1}/{exercises.length}
            </span>
          </div>

          {/* Exercise card */}
          <div className="rounded-2xl border-2 border-black p-6 mb-6">
            <p className="text-lg font-bold text-black mb-1">
              {exercise.question}
            </p>
            <p className="text-xl text-gray-600 hebrew-text mb-6" dir="rtl">
              {exercise.questionHebrew}
            </p>

            <div className="space-y-3">
              {exercise.options.map((option, i) => {
                let btnClass =
                  "w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-colors ";
                if (selectedAnswer === null) {
                  btnClass +=
                    "border-black hover:bg-gray-100";
                } else if (i === exercise.correctAnswer) {
                  btnClass +=
                    "border-green-500 bg-green-50 text-green-900";
                } else if (i === selectedAnswer) {
                  btnClass +=
                    "border-red-500 bg-red-50 text-red-900";
                } else {
                  btnClass += "border-gray-200 text-gray-400";
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswerSelect(i)}
                    disabled={selectedAnswer !== null}
                    className={btnClass}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {selectedAnswer !== null && (
              <div className="mt-4 p-4 rounded-xl bg-gray-50 border-2 border-gray-200">
                <p className="text-sm text-gray-700">
                  {exercise.explanation}
                </p>
                <p
                  className="text-base text-gray-500 mt-1 hebrew-text"
                  dir="rtl"
                >
                  {exercise.explanationHebrew}
                </p>
              </div>
            )}
          </div>

          {/* Continue button */}
          {selectedAnswer !== null && (
            <button
              onClick={handleExerciseContinue}
              className="w-full py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-colors"
            >
              {t({ en: "Continue", he: "\u05D4\u05DE\u05E9\u05DA" })}
            </button>
          )}
        </div>
      </div>
    );
  }

  // --- Dialogue Phase ---
  if (phase === "dialogue" && lesson.dialogue) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-lg mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-black">
              {t({ en: "Dialogue", he: "\u05D3\u05D9\u05D0\u05DC\u05D5\u05D2" })}
            </h1>
            <div className="w-10" />
          </div>

          {/* Dialogue lines */}
          <div className="space-y-4 mb-8">
            {lesson.dialogue.map((line, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`flex ${isLeft ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 border-2 ${
                      isLeft
                        ? "border-black bg-white rounded-tl-none"
                        : "border-gray-300 bg-gray-50 rounded-tr-none"
                    }`}
                  >
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      {line.speaker}
                    </span>
                    <p className="text-lg font-bold text-black mt-1" lang="th">
                      {line.thai}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {line.phonetic}
                    </p>
                    <p
                      className="text-base text-gray-600 mt-1 hebrew-text"
                      dir="rtl"
                    >
                      {line.hebrew}
                    </p>
                    <button
                      onClick={() => playPronunciation(line.thai)}
                      className="mt-2 flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-black transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      {t({ en: "Listen", he: "\u05D4\u05D0\u05D6\u05E0\u05D4" })}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Finish button */}
          <button
            onClick={() => {
              onComplete();
              setPhase("complete");
            }}
            className="w-full py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-colors"
          >
            {t({ en: "Finish", he: "\u05E1\u05D9\u05D5\u05DD" })}
          </button>
        </div>
      </div>
    );
  }

  // --- Complete Phase ---
  if (phase === "complete") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          {/* Checkmark */}
          <div className="w-20 h-20 rounded-full border-2 border-black flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-black" />
          </div>

          <h2 className="text-3xl font-bold text-black mb-1">
            {t({ en: "Well Done!", he: "\u05DB\u05DC \u05D4\u05DB\u05D1\u05D5\u05D3!" })}
          </h2>
          <p className="text-lg text-gray-500 mb-2">
            {lesson.icon} {lesson.title}
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-6 my-8">
            <div className="text-center">
              <span className="text-3xl font-bold text-black">
                {lesson.phrases.length}
              </span>
              <p className="text-sm text-gray-500">
                {t({ en: "Phrases", he: "\u05DE\u05E9\u05E4\u05D8\u05D9\u05DD" })}
              </p>
            </div>
            {hasExercises && (
              <div className="text-center">
                <span className="text-3xl font-bold text-black">
                  {exerciseScore}/{lesson.exercises!.length}
                </span>
                <p className="text-sm text-gray-500">
                  {t({ en: "Score", he: "\u05E6\u05D9\u05D5\u05DF" })}
                </p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            {onNext && (
              <button
                onClick={onNext}
                className="w-full py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                {t({ en: "Next Lesson", he: "\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D4\u05D1\u05D0" })}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onBack}
              className="w-full py-3 rounded-full border-2 border-black text-black font-medium hover:bg-gray-100 transition-colors"
            >
              {t({ en: "Back to Lessons", he: "\u05D7\u05D6\u05E8\u05D4 \u05DC\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9\u05DD" })}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fallback - should not reach here, but render back button in case
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Button onClick={onBack} variant="outline">
        {t({ en: "Back to Lessons", he: "\u05D7\u05D6\u05E8\u05D4 \u05DC\u05E9\u05D9\u05E2\u05D5\u05E8\u05D9\u05DD" })}
      </Button>
    </div>
  );
}
