import { Lock } from "lucide-react";
import type { Lesson } from "@/components/InteractiveLessonPlayer";

export function LockedLessonCard({
  lesson,
  onUnlock,
}: {
  lesson: Lesson;
  onUnlock: () => void;
}) {
  return (
    <button
      onClick={onUnlock}
      className="group relative w-full rounded-xl border border-stone-200 bg-stone-100 p-5 text-right opacity-90 transition hover:border-stone-400"
      dir="rtl"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black text-stone-500">נעול בקורס המלא</p>
          <h3 className="mt-2 text-xl font-bold text-stone-950">
            {lesson.titleHebrew}
          </h3>
          <p className="mt-1 text-sm text-stone-600">{lesson.title}</p>
        </div>
        <span className="rounded-full bg-white p-3 text-stone-700">
          <Lock className="h-5 w-5" />
        </span>
      </div>
    </button>
  );
}
