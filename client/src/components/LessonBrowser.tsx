import { useState, useMemo } from "react";
import { CheckCircle2, BookOpen, FileText } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lesson } from "@/components/InteractiveLessonPlayer";

interface LessonBrowserProps {
  lessons: Lesson[];
  completedLessons: Set<number>;
  onSelectLesson: (lessonId: number) => void;
}

interface Category {
  id: string;
  nameEn: string;
  nameHe: string;
  lessonIds: number[];
  accent: string;
}

const CATEGORIES: Category[] = [
  {
    id: "all",
    nameEn: "All",
    nameHe: "\u05D4\u05DB\u05DC",
    lessonIds: [],
    accent: "bg-gray-900",
  },
  {
    id: "essentials",
    nameEn: "Essentials",
    nameHe: "\u05D9\u05E1\u05D5\u05D3\u05D5\u05EA",
    lessonIds: [1, 2, 10],
    accent: "bg-amber-300",
  },
  {
    id: "food",
    nameEn: "Food & Dining",
    nameHe: "\u05D0\u05D5\u05DB\u05DC \u05D5\u05DE\u05E1\u05E2\u05D3\u05D5\u05EA",
    lessonIds: [3],
    accent: "bg-rose-300",
  },
  {
    id: "shopping",
    nameEn: "Shopping & Money",
    nameHe: "\u05E7\u05E0\u05D9\u05D5\u05EA \u05D5\u05DB\u05E1\u05E3",
    lessonIds: [4, 21],
    accent: "bg-sky-300",
  },
  {
    id: "getting-around",
    nameEn: "Getting Around",
    nameHe: "\u05D4\u05EA\u05E0\u05D9\u05D9\u05D3\u05D5\u05EA",
    lessonIds: [5, 13],
    accent: "bg-emerald-300",
  },
  {
    id: "places",
    nameEn: "Places & Culture",
    nameHe: "\u05DE\u05E7\u05D5\u05DE\u05D5\u05EA \u05D5\u05EA\u05E8\u05D1\u05D5\u05EA",
    lessonIds: [6, 8, 27, 30],
    accent: "bg-violet-300",
  },
  {
    id: "health",
    nameEn: "Health & Safety",
    nameHe: "\u05D1\u05E8\u05D9\u05D0\u05D5\u05EA \u05D5\u05D1\u05D8\u05D9\u05D7\u05D5\u05EA",
    lessonIds: [7, 12],
    accent: "bg-orange-300",
  },
  {
    id: "social",
    nameEn: "Social & Leisure",
    nameHe: "\u05D7\u05D1\u05E8\u05EA\u05D9 \u05D5\u05E4\u05E0\u05D0\u05D9",
    lessonIds: [9, 17, 18, 19, 24, 25, 26],
    accent: "bg-teal-300",
  },
  {
    id: "advanced",
    nameEn: "Advanced",
    nameHe: "\u05DE\u05EA\u05E7\u05D3\u05DD",
    lessonIds: [14, 15, 16, 20, 22, 23, 28, 29],
    accent: "bg-slate-400",
  },
];

/** Map from lesson ID to the accent color of its first matching category. */
function buildLessonAccentMap(): Record<number, string> {
  const map: Record<number, string> = {};
  for (const cat of CATEGORIES) {
    if (cat.id === "all") continue;
    for (const id of cat.lessonIds) {
      if (!map[id]) {
        map[id] = cat.accent;
      }
    }
  }
  return map;
}

const LESSON_ACCENT_MAP = buildLessonAccentMap();

function getAccentForLesson(lessonId: number): string {
  return LESSON_ACCENT_MAP[lessonId] ?? "bg-gray-200";
}

export default function LessonBrowser({
  lessons,
  completedLessons,
  onSelectLesson,
}: LessonBrowserProps) {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredLessons = useMemo(() => {
    if (activeCategory === "all") return lessons;
    const category = CATEGORIES.find(c => c.id === activeCategory);
    if (!category) return lessons;
    return lessons.filter(l => category.lessonIds.includes(l.id));
  }, [lessons, activeCategory]);

  const completedCount = completedLessons.size;
  const totalCount = lessons.length;
  const progressPercent =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* ── Header bar ── */}
      <header className="pt-20 pb-8 px-4 border-b-2 border-black/10">
        <div className="max-w-6xl mx-auto">
          {/* Title row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
                {t({ en: "Learn Thai", he: "\u05DC\u05DE\u05D3\u05D5 \u05EA\u05D0\u05D9\u05DC\u05E0\u05D3\u05D9\u05EA" })}
              </h1>
            </div>

            {/* Progress inline */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-black/70">
                {completedCount}/{totalCount}
              </span>
              <div className="w-32 h-1.5 bg-black/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Action pills */}
          <div className="flex flex-wrap gap-3">
            <Link href="/quiz">
              <span className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer">
                <BookOpen className="w-4 h-4" />
                {t({ en: "Practice Quiz", he: "\u05EA\u05E8\u05D2\u05D5\u05DC \u05D7\u05D9\u05D3\u05D5\u05DF" })}
              </span>
            </Link>
            <a
              href="/api/phrase-cards/generate"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer">
                <FileText className="w-4 h-4" />
                {t({ en: "Phrase Cards", he: "\u05DB\u05E8\u05D8\u05D9\u05E1\u05D9 \u05D1\u05D9\u05D8\u05D5\u05D9\u05D9\u05DD" })}
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* ── Category filter row ── */}
      <nav className="sticky top-16 z-30 bg-white border-b-2 border-black/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 px-4 py-1.5 text-sm font-medium rounded-full border-2 transition-colors ${
                    isActive
                      ? "border-black bg-black text-white"
                      : "border-black/20 text-black/70 hover:border-black/50"
                  }`}
                >
                  {t({ en: cat.nameEn, he: cat.nameHe })}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ── Lesson grid ── */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map(lesson => {
            const isCompleted = completedLessons.has(lesson.id);
            const accent = getAccentForLesson(lesson.id);
            const phraseCount = lesson.phrases.length;
            const exerciseCount = lesson.exercises?.length ?? 0;
            const paddedNum = String(lesson.id).padStart(2, "0");

            return (
              <button
                key={lesson.id}
                onClick={() => onSelectLesson(lesson.id)}
                className={`group relative text-left bg-white border-2 border-black rounded-xl overflow-hidden transition-all duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-black/30 ${
                  isCompleted ? "opacity-75" : ""
                }`}
              >
                {/* Pastel accent strip */}
                <div className={`h-[3px] ${accent}`} />

                <div className="p-5">
                  {/* Top row: badge + completion icon */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold tracking-widest text-black/40 uppercase">
                      #{paddedNum}
                    </span>
                    {isCompleted && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    )}
                  </div>

                  {/* Emoji icon */}
                  <div className="text-4xl mb-3">{lesson.icon}</div>

                  {/* Title (English) */}
                  <h3 className="text-base font-bold text-black leading-snug mb-1">
                    {lesson.title}
                  </h3>

                  {/* Hebrew subtitle */}
                  <p
                    className="text-sm text-black/50 leading-snug mb-3"
                    dir="rtl"
                  >
                    {lesson.titleHebrew}
                  </p>

                  {/* Meta */}
                  <p className="text-xs text-black/40">
                    {phraseCount}{" "}
                    {t({ en: "phrases", he: "\u05D1\u05D9\u05D8\u05D5\u05D9\u05D9\u05DD" })}
                    {exerciseCount > 0 && (
                      <>
                        {" \u00B7 "}
                        {exerciseCount}{" "}
                        {t({ en: "exercises", he: "\u05EA\u05E8\u05D2\u05D9\u05DC\u05D9\u05DD" })}
                      </>
                    )}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredLessons.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-black/40">
              {t({
                en: "No lessons in this category yet.",
                he: "\u05D0\u05D9\u05DF \u05E2\u05D3\u05D9\u05D9\u05DF \u05E9\u05D9\u05E2\u05D5\u05E8\u05D9\u05DD \u05D1\u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4 \u05D6\u05D5.",
              })}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
