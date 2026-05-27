import { Link } from "wouter";
import { Check, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COURSE_BONUSES, TOURIST_COURSE } from "@/data/touristCourse";

const FREE_FEATURES = [
  "שני שיעורי ניסיון (ברכות + אוכל)",
  "שמע הגייה של כל משפט",
  "שמירת התקדמות",
  "תצוגה של כל מסלול הקורס",
];

export function FreePaidComparison() {
  return (
    <section className="bg-[oklch(0.97_0.015_80)] py-20" dir="rtl">
      <div className="container">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-stone-950 md:text-5xl">
            התחילו חינם, פתחו כשזה עוזר
          </h2>
          <p className="mt-3 text-lg text-stone-600">
            שני שיעורים בחינם ללא הרשמה. תשלום חד פעמי לקורס המלא — ללא מנוי.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {/* Free tier */}
          <div className="rounded-2xl border border-stone-200 bg-white p-7">
            <h3 className="text-2xl font-bold text-stone-950">חשבון חינמי</h3>
            <p className="mt-1.5 text-sm text-stone-500">ללא כרטיס אשראי</p>
            <ul className="mt-6 space-y-3">
              {FREE_FEATURES.map(f => (
                <li key={f} className="flex items-start gap-3 text-stone-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span className="text-sm leading-5">{f}</span>
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" className="mt-8 w-full rounded-xl border-stone-300 font-bold">
              <Link href="/login">התחילו חינם</Link>
            </Button>
          </div>

          {/* Paid tier */}
          <div className="relative rounded-2xl border-2 border-stone-950 bg-stone-950 p-7 text-white">
            {/* "Best value" badge */}
            <span className="absolute -top-3 right-7 rounded-full bg-amber-400 px-3 py-0.5 text-xs font-black text-stone-950">
              הכי שווה
            </span>

            <h3 className="text-2xl font-bold">הקורס המלא</h3>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-4xl font-black text-amber-400">
                ₪{TOURIST_COURSE.priceIls}
              </span>
              <span className="text-sm text-stone-400 line-through">
                ₪{TOURIST_COURSE.originalPriceIls}
              </span>
              <span className="text-sm text-stone-400">תשלום חד פעמי</span>
            </div>

            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3 text-stone-200">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span className="text-sm leading-5">כל 7 שיעורי הדיבור</span>
              </li>
              <li className="flex items-start gap-3 text-stone-200">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span className="text-sm leading-5">
                  תרגול שמע + חזרה מהירה
                </span>
              </li>
              {COURSE_BONUSES.map(bonus => (
                <li
                  key={bonus.titleEn}
                  className="flex items-start gap-3 text-stone-200"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <span className="text-sm leading-5">{bonus.titleHe}</span>
                </li>
              ))}
              <li className="flex items-start gap-3 text-stone-400">
                <Lock className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="text-sm leading-5 line-through">
                  ללא הגבלת זמן לתוכן
                </span>
              </li>
            </ul>

            <Button
              asChild
              className="mt-8 w-full rounded-xl bg-amber-400 font-bold text-stone-950 hover:bg-amber-300"
            >
              <Link href="/welcome-kit">פתחו את הקורס</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
