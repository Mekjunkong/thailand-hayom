import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";
import InteractiveLessonPlayer from "@/components/InteractiveLessonPlayer";
import { lessonsData } from "@/data/lessonsData";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import CategoryHeader from "@/components/CategoryHeader";
import ContentCard from "@/components/ContentCard";
import { getCategoryById } from "@/data/categories";

export default function InteractiveLessons() {
  const { isAuthenticated } = useAuth();
  const { language, t } = useLanguage();
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(
    new Set(),
  );
  const [loading, setLoading] = useState(true);

  // Load progress from database on mount
  useEffect(() => {
    const loadProgress = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/progress");
        if (response.ok) {
          const data = await response.json();
          const completed = new Set<number>();
          data.progress.forEach((p: any) => {
            if (p.completed) {
              completed.add(p.lessonId);
            }
          });
          setCompletedLessons(completed);
        }
      } catch (error) {
        console.error("Failed to load progress:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [isAuthenticated]);

  // Save progress to database
  const saveProgress = async (lessonId: number, completed: boolean) => {
    if (!isAuthenticated) return;

    try {
      await fetch("/api/progress/lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, completed }),
      });
    } catch (error) {
      console.error("Failed to save progress:", error);
    }
  };

  const selectedLesson = lessonsData.find(l => l.id === selectedLessonId);
  const totalProgress = (completedLessons.size / lessonsData.length) * 100;

  const handleLessonComplete = () => {
    if (selectedLessonId) {
      const newCompleted = new Set(completedLessons);
      newCompleted.add(selectedLessonId);
      setCompletedLessons(newCompleted);
      // Save to database
      saveProgress(selectedLessonId, true);
    }
  };

  const handleNextLesson = () => {
    if (selectedLessonId) {
      const currentIndex = lessonsData.findIndex(
        l => l.id === selectedLessonId,
      );
      if (currentIndex < lessonsData.length - 1) {
        setSelectedLessonId(lessonsData[currentIndex + 1].id);
      } else {
        // Completed all lessons
        setSelectedLessonId(null);
      }
    }
  };

  const handleBackToLessons = () => {
    setSelectedLessonId(null);
  };

  // If a lesson is selected, show the player
  if (selectedLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-16 py-12 px-4">
        <InteractiveLessonPlayer
          lesson={selectedLesson}
          onComplete={handleLessonComplete}
          onNext={handleNextLesson}
          onPrevious={handleBackToLessons}
        />
      </div>
    );
  }

  // Otherwise, show the lesson selection page
  return (
    <div className="min-h-screen bg-gray-50">
      <CategoryHeader
        category={getCategoryById("lessons")!}
        count={lessonsData.length}
      />

      {/* Progress Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1 w-full">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-gray-900">
                  {t({ he: "ההתקדמות שלך", en: "Your Progress" })}
                </h2>
                <span className="text-sm text-gray-500">
                  {completedLessons.size} / {lessonsData.length}
                </span>
              </div>
              <Progress value={totalProgress} className="h-3" />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() =>
                  window.open("/api/phrase-cards/generate", "_blank")
                }
                variant="outline"
                size="sm"
              >
                {t({ he: "כרטיסי ביטויים", en: "Phrase Cards" })}
              </Button>
              <Link href="/quiz">
                <Button variant="outline" size="sm">
                  {t({ he: "חידון", en: "Quiz" })}
                </Button>
              </Link>
            </div>
          </div>
          {completedLessons.size === lessonsData.length && (
            <div className="text-center p-3 mt-4 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle2 className="inline-block mr-2 h-5 w-5 text-green-600" />
              <span className="text-green-700 font-semibold">
                {t({
                  he: "מזל טוב! סיימת את כל השיעורים!",
                  en: "Congratulations! All lessons complete!",
                })}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Lessons Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessonsData.map(lesson => (
              <ContentCard
                key={lesson.id}
                variant="lesson"
                id={lesson.id}
                title={lesson.title}
                titleHe={lesson.titleHebrew}
                icon={lesson.icon}
                phraseCount={lesson.phrases.length}
                progress={completedLessons.has(lesson.id) ? 100 : 0}
                isCompleted={completedLessons.has(lesson.id)}
                onClick={() => setSelectedLessonId(lesson.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
