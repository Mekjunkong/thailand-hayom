import { Lock } from "lucide-react";
import { TOURIST_COURSE, TOURIST_COURSE_MODULES } from "@/data/touristCourse";

const SITUATION_META: Record<
  string,
  { icon: string; bg: string; accent: string; label: string }
> = {
  arrival: {
    icon: "✈️",
    bg: "bg-amber-50",
    accent: "text-amber-700",
    label: "הגעה",
  },
  taxi: {
    icon: "🛺",
    bg: "bg-sky-50",
    accent: "text-sky-700",
    label: "תחבורה",
  },
  food: {
    icon: "🍜",
    bg: "bg-orange-50",
    accent: "text-orange-700",
    label: "אוכל",
  },
  shopping: {
    icon: "🛍️",
    bg: "bg-violet-50",
    accent: "text-violet-700",
    label: "קניות",
  },
  hotel: {
    icon: "🏨",
    bg: "bg-teal-50",
    accent: "text-teal-700",
    label: "מלון",
  },
  emergency: {
    icon: "🆘",
    bg: "bg-red-50",
    accent: "text-red-700",
    label: "חירום",
  },
  social: {
    icon: "💬",
    bg: "bg-emerald-50",
    accent: "text-emerald-700",
    label: "שיחה",
  },
};

export function CoursePath() {
  const freeSet = new Set<number>(TOURIST_COURSE.freeLessonIds);

  return (
    <section className="bg-[oklch(0.97_0.015_80)] py-20" dir="rtl">
      <div className="container">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-stone-950 md:text-5xl">
            מסלול של 7 ימים
          </h2>
          <p className="mt-4 text-lg leading-8 text-stone-700">
            כל יום מתמקד בסיטואציה אחת אמיתית מהטיול. פחות דקדוק, יותר לדבר.
          </p>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7">
          {TOURIST_COURSE_MODULES.map(module => {
            const meta =
              SITUATION_META[module.situation] ?? SITUATION_META["arrival"];
            const isFree = freeSet.has(module.lessonId);

            return (
              <article
                key={module.day}
                className={`relative flex flex-col rounded-2xl border border-stone-100 ${meta.bg} p-5 shadow-sm transition-shadow hover:shadow-md`}
              >
                {/* Day badge */}
                <span
                  className={`mb-3 inline-flex w-fit rounded-full border border-current/20 px-2.5 py-0.5 text-xs font-black tracking-wider ${meta.accent}`}
                >
                  יום {module.day}
                </span>

                {/* Situation icon */}
                <span
                  className="mb-3 text-3xl leading-none"
                  aria-label={meta.label}
                  role="img"
                >
                  {meta.icon}
                </span>

                {/* Title */}
                <h3 className="min-h-10 text-base font-bold leading-snug text-stone-950">
                  {module.titleHe}
                </h3>

                {/* Outcome */}
                <p className="mt-2 text-xs leading-5 text-stone-600">
                  {module.outcomeHe}
                </p>

                {/* Free / Locked badge */}
                <div className="mt-4 flex items-center gap-1">
                  {isFree ? (
                    <span className="rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
                      חינם
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 rounded-md bg-stone-200 px-2 py-0.5 text-[10px] font-medium text-stone-500">
                      <Lock className="h-2.5 w-2.5" />
                      קורס מלא
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
