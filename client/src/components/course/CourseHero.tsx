import { useState } from "react";
import { Link } from "wouter";
import { Volume2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TOURIST_COURSE } from "@/data/touristCourse";

const SAMPLE_PHRASES = [
  {
    thai: "ไม่เผ็ดครับ",
    roman: "mai phet khrap",
    hebrew: "לא חריף בבקשה (גבר)",
    context: "במסעדה",
  },
  {
    thai: "เท่าไหร่ครับ",
    roman: "thao rai khrap",
    hebrew: "כמה זה עולה?",
    context: "בשוק",
  },
  {
    thai: "ไปสนามบินครับ",
    roman: "pai sanam bin khrap",
    hebrew: "לשדה התעופה בבקשה",
    context: "במונית",
  },
];

export function CourseHero() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const phrase = SAMPLE_PHRASES[phraseIdx];

  const play = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(phrase.thai);
    utterance.lang = "th-TH";
    utterance.rate = 0.72;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section className="course-hero bg-[oklch(0.97_0.015_80)]" dir="rtl">
      <div className="container grid min-h-[calc(100vh-56px)] gap-12 py-20 md:grid-cols-[1fr_400px] md:items-center">
        {/* Left: copy */}
        <div>
          <p className="mb-5 text-sm font-bold tracking-[0.08em] text-emerald-700 uppercase">
            קורס תאית מעשי לישראלים שטסים לתאילנד
          </p>
          <h1 className="max-w-3xl text-5xl font-black leading-[1.05] text-stone-950 md:text-7xl">
            לדבר תאית בסיסית לטיול בתאילנד תוך 7 ימים
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600 md:text-xl">
            המשפטים שבאמת צריך: מונית, אוכל, מלון, שוק, עזרה וחיוך מכבד מול
            מקומיים.
          </p>

          {/* Social proof */}
          <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-stone-500">
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-600" />7 שיעורים
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              50+ משפטים
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              הגייה בשמע
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              ללא מנוי
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="h-12 rounded-xl bg-stone-950 px-7 text-base font-bold text-white hover:bg-stone-800"
            >
              <Link href="/login">התחילו שיעור חינם</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-xl border-stone-300 px-7 text-base font-bold"
            >
              <Link href="/welcome-kit">
                פתחו את הקורס המלא ₪{TOURIST_COURSE.priceIls}
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-stone-400">
            תשלום חד פעמי ·{" "}
            <s className="text-stone-400">₪{TOURIST_COURSE.originalPriceIls}</s>{" "}
            ₪{TOURIST_COURSE.priceIls} עד סוף החודש
          </p>
        </div>

        {/* Right: live lesson sample card */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-md">
          {/* Card header */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold tracking-wide text-stone-400 uppercase">
              נסו משפט עכשיו
            </p>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
              {phrase.context}
            </span>
          </div>

          {/* Thai phrase */}
          <p
            className="mt-5 text-5xl font-black leading-none text-stone-950"
            lang="th"
          >
            {phrase.thai}
          </p>
          <p className="mt-2.5 text-base text-stone-500 tracking-wide">
            {phrase.roman}
          </p>
          <p className="mt-1.5 text-xl font-semibold text-stone-800">
            {phrase.hebrew}
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-2">
            <Button
              onClick={play}
              size="sm"
              className="rounded-lg bg-emerald-700 text-white hover:bg-emerald-800"
            >
              <Volume2 className="ml-1.5 h-3.5 w-3.5" />
              שמע הגייה
            </Button>
            <Button
              onClick={() =>
                setPhraseIdx(i => (i + 1) % SAMPLE_PHRASES.length)
              }
              size="sm"
              variant="outline"
              className="rounded-lg border-stone-200 text-stone-600"
            >
              משפט הבא
            </Button>
          </div>

          {/* Course module pills */}
          <div className="mt-6 border-t border-stone-100 pt-5">
            <p className="mb-2.5 text-xs font-medium text-stone-400">
              7 שיעורים בקורס
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["ברכות", "מוניות", "אוכל", "קניות", "מלון", "חירום", "שיחה"].map(
                label => (
                  <span
                    key={label}
                    className="rounded-md bg-stone-100 px-2 py-1 text-xs text-stone-600"
                  >
                    {label}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
