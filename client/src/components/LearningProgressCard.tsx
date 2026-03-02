import { Link } from "wouter";
import { Flame, GraduationCap, ArrowRight, Trophy } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProgress } from "@/contexts/ProgressContext";
import { lessonsData } from "@/data/lessonsData";
import { Progress } from "@/components/ui/progress";

export default function LearningProgressCard() {
  const { language, t } = useLanguage();
  const { progress, getCompletionPercentage } = useProgress();

  const percentage = getCompletionPercentage();
  const completedCount = progress.completedLessons.length;
  const totalLessons = lessonsData.length;

  // Find the next incomplete lesson
  const nextLesson = lessonsData.find(
    lesson => !progress.completedLessons.includes(lesson.id),
  );

  const allComplete = completedCount >= totalLessons;

  return (
    <section className="px-4 py-2">
      <div className="max-w-lg mx-auto">
        <Link href="/interactive-lessons">
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-5 cursor-pointer">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-500" />
                <h3 className="text-sm font-semibold text-gray-900">
                  {t({
                    he: allComplete ? "כל הכבוד!" : "המשך ללמוד",
                    en: allComplete ? "Well done!" : "Continue Learning",
                  })}
                </h3>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 rtl:rotate-180" />
            </div>

            {allComplete ? (
              /* All complete state */
              <div className="flex items-center gap-3">
                <Trophy className="h-8 w-8 text-amber-500" />
                <p className="text-sm text-gray-600">
                  {t({
                    he: `סיימת את כל ${totalLessons} השיעורים! חזור לתרגל.`,
                    en: `You've completed all ${totalLessons} lessons! Review anytime.`,
                  })}
                </p>
              </div>
            ) : nextLesson ? (
              /* In-progress or new user */
              <>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl" role="img">
                    {nextLesson.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {language === "he"
                        ? nextLesson.titleHebrew
                        : nextLesson.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t({
                        he: `שיעור ${nextLesson.id} מתוך ${totalLessons}`,
                        en: `Lesson ${nextLesson.id} of ${totalLessons}`,
                      })}
                    </p>
                  </div>

                  {/* Streak badge */}
                  {progress.streak > 0 && (
                    <div className="flex items-center gap-1 bg-orange-50 px-2.5 py-1 rounded-full">
                      <Flame className="h-3.5 w-3.5 text-orange-500" />
                      <span className="text-xs font-semibold text-orange-600">
                        {progress.streak}
                      </span>
                    </div>
                  )}
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-3">
                  <Progress value={percentage} className="h-2 flex-1" />
                  <span className="text-xs font-medium text-gray-500 w-10 text-end">
                    {percentage}%
                  </span>
                </div>
              </>
            ) : (
              /* Fallback -- start learning */
              <p className="text-sm text-gray-600">
                {t({
                  he: "התחל ללמוד תאילנדית עכשיו!",
                  en: "Start learning Thai now!",
                })}
              </p>
            )}
          </div>
        </Link>
      </div>
    </section>
  );
}
