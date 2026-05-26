import { CheckCircle2, PlayCircle } from "lucide-react";
import type { Lesson } from "@/components/InteractiveLessonPlayer";
import { LockedLessonCard } from "@/components/course/LockedLessonCard";
import { UnlockCoursePanel } from "@/components/course/UnlockCoursePanel";
import { TOURIST_COURSE_MODULES } from "@/data/touristCourse";
import { canAccessLesson, isFreeLesson } from "@/lib/courseAccess";

interface LessonBrowserProps {
  lessons: Lesson[];
  completedLessons: Set<number>;
  onSelectLesson: (lessonId: number) => void;
  hasPaidAccess: boolean;
  accessKind: "visitor" | "free" | "paid";
}

const situationAccent: Record<string, string> = {
  arrival: "bg-amber-300",
  taxi: "bg-sky-300",
  food: "bg-rose-300",
  shopping: "bg-emerald-300",
  hotel: "bg-indigo-300",
  emergency: "bg-orange-300",
  social: "bg-teal-300",
};

export default function LessonBrowser({
  lessons,
  completedLessons,
  onSelectLesson,
  hasPaidAccess,
  accessKind,
}: LessonBrowserProps) {
  const lessonsById = new Map(lessons.map(lesson => [lesson.id, lesson]));
  const courseItems = TOURIST_COURSE_MODULES.map(module => ({
    module,
    lesson: lessonsById.get(module.lessonId),
  })).filter((item): item is typeof item & { lesson: Lesson } =>
    Boolean(item.lesson)
  );
  const completedCount = courseItems.filter(({ lesson }) =>
    completedLessons.has(lesson.id)
  ).length;
  const totalCount = courseItems.length;
  const progressPercent =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b-2 border-black/10 px-4 pb-8 pt-24" dir="rtl">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black text-amber-600">
                קורס תאית הישרדות לתיירים
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-black md:text-4xl">
                7 שיעורים לדבר תאית בטיול
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-black/60">
                התחילו מהשיעורים החינמיים, עקבו אחרי ההתקדמות, ופתחו את
                הקורס המלא כשאתם מוכנים לתרגל את כל המצבים החשובים.
              </p>
            </div>

            <div className="min-w-48">
              <div className="flex items-center justify-between text-sm font-bold text-black/70">
                <span>{completedCount}/{totalCount}</span>
                <span>התקדמות</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/10">
                <div
                  className="h-full rounded-full bg-black transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_320px]">
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {courseItems.map(({ module, lesson }) => {
            const locked = !canAccessLesson({
              lessonId: lesson.id,
              hasPaidAccess,
            });
            const completed = completedLessons.has(lesson.id);
            const accent = situationAccent[module.situation] ?? "bg-gray-200";

            if (locked) {
              return (
                <LockedLessonCard
                  key={lesson.id}
                  lesson={lesson}
                  onUnlock={() => {
                    window.location.href =
                      accessKind === "visitor"
                        ? "/login?redirect=/welcome-kit"
                        : "/welcome-kit";
                  }}
                />
              );
            }

            return (
              <button
                key={lesson.id}
                onClick={() => onSelectLesson(lesson.id)}
                className={`group relative overflow-hidden rounded-xl border-2 border-black bg-white text-right transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-black/30 ${
                  completed ? "opacity-75" : ""
                }`}
                dir="rtl"
              >
                <div className={`h-[3px] ${accent}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black tracking-widest text-black/40">
                        יום {module.day}
                      </p>
                      <h3 className="mt-2 text-xl font-black text-black">
                        {module.titleHe}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-black/50" dir="ltr">
                        {module.titleEn}
                      </p>
                    </div>
                    {completed ? (
                      <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-500" />
                    ) : (
                      <PlayCircle className="h-6 w-6 shrink-0 text-black/40 transition group-hover:text-black" />
                    )}
                  </div>

                  <p className="mt-4 text-sm leading-6 text-black/65">
                    {module.outcomeHe}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-black/40">
                      {lesson.phrases.length} ביטויים
                    </span>
                    {isFreeLesson(lesson.id) && !hasPaidAccess && (
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800">
                        חינם
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </section>

        {accessKind !== "paid" && <UnlockCoursePanel />}
      </main>
    </div>
  );
}
