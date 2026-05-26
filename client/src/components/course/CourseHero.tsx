import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { TOURIST_COURSE } from "@/data/touristCourse";

export function CourseHero() {
  return (
    <section className="course-hero" dir="rtl">
      <div className="container grid min-h-[calc(100vh-56px)] gap-10 py-24 md:grid-cols-[1fr_420px] md:items-center">
        <div>
          <p className="mb-5 text-sm font-bold tracking-[0.08em] text-emerald-800">
            קורס תאית מעשי לישראלים שטסים לתאילנד
          </p>
          <h1 className="max-w-4xl text-5xl font-black leading-[1.05] text-stone-950 md:text-7xl">
            לדבר תאית בסיסית לטיול בתאילנד תוך 7 ימים
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700 md:text-xl">
            תלמדו את המשפטים שבאמת צריך: מונית, אוכל, מלון, שוק, עזרה, וחיוך מכבד מול מקומיים.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/login">
              <Button className="h-13 rounded-xl bg-stone-950 px-7 text-base font-bold text-white hover:bg-stone-800">
                התחילו שיעור חינם
              </Button>
            </Link>
            <Link href="/welcome-kit">
              <Button variant="outline" className="h-13 rounded-xl border-stone-300 px-7 text-base font-bold">
                פתחו את הקורס המלא ₪{TOURIST_COURSE.priceIls}
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-stone-500">
            בלי מנוי חודשי. שיעורי ניסיון בחינם, תשלום חד פעמי לקורס המלא.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <div className="aspect-[4/5] rounded-xl bg-[url('/images/hero-beach.png')] bg-cover bg-center" />
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-stone-600">
            <span className="rounded-lg bg-stone-100 px-2 py-2">אוכל</span>
            <span className="rounded-lg bg-stone-100 px-2 py-2">מוניות</span>
            <span className="rounded-lg bg-stone-100 px-2 py-2">חירום</span>
          </div>
        </div>
      </div>
    </section>
  );
}
