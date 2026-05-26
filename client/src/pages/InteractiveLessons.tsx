import { useState, useEffect } from "react";
import { lessonsData } from "@/data/lessonsData";
import { useAuth } from "@/_core/hooks/useAuth";
import LessonBrowser from "@/components/LessonBrowser";
import FlashcardPlayer from "@/components/FlashcardPlayer";
import { TOURIST_COURSE_MODULES } from "@/data/touristCourse";
import { canAccessLesson, getCourseAccessState } from "@/lib/courseAccess";
import { trpc } from "@/lib/trpc";

export default function InteractiveLessons() {
  const { user, isAuthenticated } = useAuth();
  const { data: purchases = [] } = trpc.user.getPurchaseHistory.useQuery(
    undefined,
    {
      enabled: Boolean(user),
    }
  );
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
  const access = getCourseAccessState({ user, purchases });
  const courseLessonIds = TOURIST_COURSE_MODULES.map(module => module.lessonId);
  const courseLessons = courseLessonIds
    .map(lessonId => lessonsData.find(lesson => lesson.id === lessonId))
    .filter((lesson): lesson is NonNullable<typeof lesson> => Boolean(lesson));

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

  const selectedLesson = courseLessons.find(l => l.id === selectedLessonId);

  const handleSelectLesson = (lessonId: number) => {
    if (!isAuthenticated) {
      window.location.href = "/login?redirect=/interactive-lessons";
      return;
    }
    if (!canAccessLesson({ lessonId, hasPaidAccess: access.hasPaidAccess })) {
      window.location.href = "/welcome-kit";
      return;
    }
    setSelectedLessonId(lessonId);
  };

  const handleComplete = () => {
    if (!selectedLessonId) return;
    const updated = new Set(completedLessons);
    updated.add(selectedLessonId);
    setCompletedLessons(updated);
    saveProgress(selectedLessonId);
  };

  const handleNext = () => {
    if (!selectedLessonId) return;
    const accessibleCourseLessons = courseLessons.filter(lesson =>
      canAccessLesson({ lessonId: lesson.id, hasPaidAccess: access.hasPaidAccess })
    );
    const idx = accessibleCourseLessons.findIndex(l => l.id === selectedLessonId);
    if (idx >= 0 && idx < accessibleCourseLessons.length - 1) {
      setSelectedLessonId(accessibleCourseLessons[idx + 1].id);
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
      lessons={courseLessons}
      completedLessons={completedLessons}
      onSelectLesson={handleSelectLesson}
      hasPaidAccess={access.hasPaidAccess}
      accessKind={access.kind}
    />
  );
}
