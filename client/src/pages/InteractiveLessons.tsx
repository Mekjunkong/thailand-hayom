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
