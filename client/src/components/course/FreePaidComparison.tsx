import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { COURSE_BONUSES, TOURIST_COURSE } from "@/data/touristCourse";

export function FreePaidComparison() {
  return (
    <section className="bg-white py-18" dir="rtl">
      <div className="container">
        <h2 className="text-3xl font-bold text-stone-950 md:text-5xl">התחילו חינם, פתחו כשזה עוזר</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-stone-200 p-6">
            <h3 className="text-2xl font-bold text-stone-950">חשבון חינמי</h3>
            <ul className="mt-5 space-y-3 text-stone-700">
              <li>שני שיעורי ניסיון</li>
              <li>שמירת התקדמות</li>
              <li>תצוגה של כל מסלול הקורס</li>
            </ul>
            <Button asChild variant="outline" className="mt-6 rounded-xl">
              <Link href="/login">
                התחילו חינם
              </Link>
            </Button>
          </div>
          <div className="rounded-2xl border-2 border-stone-950 bg-stone-950 p-6 text-white">
            <h3 className="text-2xl font-bold">הקורס המלא ₪{TOURIST_COURSE.priceIls}</h3>
            <ul className="mt-5 space-y-3 text-stone-200">
              <li>כל 7 שיעורי הדיבור</li>
              <li>תרגול שמע וחזרה</li>
              {COURSE_BONUSES.map(bonus => (
                <li key={bonus.titleEn}>{bonus.titleHe}</li>
              ))}
            </ul>
            <Button asChild className="mt-6 rounded-xl bg-amber-400 text-stone-950 hover:bg-amber-300">
              <Link href="/welcome-kit">
                פתחו את הקורס
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
