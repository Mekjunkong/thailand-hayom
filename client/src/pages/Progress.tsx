import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Target, CheckCircle2, BookOpen } from "lucide-react";
import { lessonsData } from "@/data/lessonsData";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Progress() {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(
    new Set(),
  );

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
  const completionPercentage =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

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
            <div className="text-sm text-gray-500">
              {t({ he: "השלמה", en: "Completion" })}
            </div>
          </div>
          <div className="border-2 border-black rounded-xl p-6">
            <CheckCircle2 className="w-6 h-6 mb-2" />
            <div className="text-3xl font-bold">
              {completedCount}/{totalLessons}
            </div>
            <div className="text-sm text-gray-500">
              {t({ he: "שיעורים", en: "Lessons" })}
            </div>
          </div>
          <div className="border-2 border-black rounded-xl p-6">
            <BookOpen className="w-6 h-6 mb-2" />
            <div className="text-3xl font-bold">
              {lessonsData.reduce((sum, l) => sum + l.phrases.length, 0)}
            </div>
            <div className="text-sm text-gray-500">
              {t({ he: "ביטויים", en: "Total phrases" })}
            </div>
          </div>
        </div>

        {/* Lesson list */}
        <h2 className="text-2xl font-bold mb-4">
          {t({ he: "שיעורים", en: "Lessons" })}
        </h2>
        <div className="space-y-3">
          {lessonsData.map((lesson) => {
            const completed = completedLessons.has(lesson.id);
            return (
              <div
                key={lesson.id}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 ${
                  completed ? "border-green-400 bg-green-50" : "border-gray-200"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    completed
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {completed ? "\u2713" : lesson.id}
                </div>
                <div className="flex-1">
                  <div className="font-medium">
                    {lesson.icon} {lesson.title}
                  </div>
                  <div className="text-sm text-gray-500" dir="rtl">
                    {lesson.titleHebrew}
                  </div>
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
