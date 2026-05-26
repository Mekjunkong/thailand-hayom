import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { TOURIST_COURSE } from "@/data/touristCourse";

export function UnlockCoursePanel() {
  return (
    <aside
      className="rounded-2xl border-2 border-stone-950 bg-stone-950 p-5 text-white"
      dir="rtl"
    >
      <p className="text-sm font-bold text-amber-300">הקורס המלא</p>
      <h2 className="mt-2 text-2xl font-black">פתחו את כל 7 השיעורים</h2>
      <p className="mt-3 text-sm leading-6 text-stone-200">
        כולל תרגול שמע, PDF ביטויים, תסריטי חירום וצ'יט שיט לטלפון.
      </p>
      <Link href="/welcome-kit">
        <Button className="mt-5 w-full rounded-xl bg-amber-400 font-bold text-stone-950 hover:bg-amber-300">
          פתחו ב-₪{TOURIST_COURSE.priceIls}
        </Button>
      </Link>
    </aside>
  );
}
