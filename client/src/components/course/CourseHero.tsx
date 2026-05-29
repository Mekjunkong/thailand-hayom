import { useState } from "react";
import { Link } from "wouter";
import { Volume2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TOURIST_COURSE } from "@/data/touristCourse";
import { useLanguage } from "@/contexts/LanguageContext";

const SAMPLE_PHRASES = [
  {
    thai: "ไม่เผ็ดครับ",
    roman: "mai phet khrap",
    he: "לא חריף בבקשה (גבר)",
    en: "Not spicy please (male)",
    contextHe: "במסעדה",
    contextEn: "At a restaurant",
  },
  {
    thai: "เท่าไหร่ครับ",
    roman: "thao rai khrap",
    he: "כמה זה עולה?",
    en: "How much is this?",
    contextHe: "בשוק",
    contextEn: "At the market",
  },
  {
    thai: "ไปสนามบินครับ",
    roman: "pai sanam bin khrap",
    he: "לשדה התעופה בבקשה",
    en: "To the airport, please",
    contextHe: "במונית",
    contextEn: "In a taxi",
  },
];

const MODULE_LABELS = [
  { he: "ברכות", en: "Greetings" },
  { he: "מוניות", en: "Taxis" },
  { he: "אוכל", en: "Food" },
  { he: "קניות", en: "Shopping" },
  { he: "מלון", en: "Hotel" },
  { he: "חירום", en: "Emergency" },
  { he: "שיחה", en: "Conversation" },
];

export function CourseHero() {
  const { language, t } = useLanguage();
  const [phraseIdx, setPhraseIdx] = useState(0);
  const phrase = SAMPLE_PHRASES[phraseIdx];
  const dir = language === "he" ? "rtl" : "ltr";

  const play = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(phrase.thai);
    utterance.lang = "th-TH";
    utterance.rate = 0.72;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section className="course-hero bg-[oklch(0.97_0.015_80)]" dir={dir}>
      <div className="container grid min-h-[calc(100vh-56px)] gap-12 py-20 md:grid-cols-[1fr_400px] md:items-center">
        {/* Left: copy */}
        <div>
          <p className="mb-5 text-sm font-bold tracking-[0.08em] text-emerald-700 uppercase">
            {t({
              he: "קורס תאית מעשי לישראלים שטסים לתאילנד",
              en: "Practical Thai course for Israelis traveling to Thailand",
            })}
          </p>
          <h1 className="max-w-3xl text-5xl font-black leading-[1.05] text-stone-950 md:text-7xl">
            {t({
              he: "לדבר תאית בסיסית לטיול בתאילנד תוך 7 ימים",
              en: "Speak basic Thai for your Thailand trip in 7 days",
            })}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600 md:text-xl">
            {t({
              he: "המשפטים שבאמת צריך: מונית, אוכל, מלון, שוק, עזרה וחיוך מכבד מול מקומיים.",
              en: "The phrases you actually need: taxis, food, hotels, markets, help, and a respectful smile with locals.",
            })}
          </p>

          {/* Social proof */}
          <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-stone-500">
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              {t({ he: "7 שיעורים", en: "7 lessons" })}
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              {t({ he: "50+ משפטים", en: "50+ phrases" })}
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              {t({ he: "הגייה בשמע", en: "Audio pronunciation" })}
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              {t({ he: "ללא מנוי", en: "No subscription" })}
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="h-12 rounded-xl bg-stone-950 px-7 text-base font-bold text-white hover:bg-stone-800"
            >
              <Link href="/lesson/airport-arrival">
                {t({ he: "התחילו שיעור חינם", en: "Start free lesson" })}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-xl border-stone-300 px-7 text-base font-bold"
            >
              <Link href="/course">
                {t({
                  he: "ראו את כל הקורס",
                  en: "See the full course",
                })}
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-stone-400">
            {t({ he: "תשלום חד פעמי ·", en: "One-time payment ·" })}{" "}
            <s className="text-stone-400">₪{TOURIST_COURSE.originalPriceIls}</s>{" "}
            ₪{TOURIST_COURSE.priceIls}{" "}
            {t({ he: "עד סוף החודש", en: "until end of month" })}
          </p>
        </div>

        {/* Right: live lesson sample card */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-md">
          {/* Card header */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold tracking-wide text-stone-400 uppercase">
              {t({ he: "נסו משפט עכשיו", en: "Try a phrase now" })}
            </p>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
              {language === "he" ? phrase.contextHe : phrase.contextEn}
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
            {language === "he" ? phrase.he : phrase.en}
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-2">
            <Button
              onClick={play}
              size="sm"
              className="rounded-lg bg-emerald-700 text-white hover:bg-emerald-800"
            >
              <Volume2 className="me-1.5 h-3.5 w-3.5" />
              {t({ he: "שמע הגייה", en: "Hear pronunciation" })}
            </Button>
            <Button
              onClick={() => setPhraseIdx(i => (i + 1) % SAMPLE_PHRASES.length)}
              size="sm"
              variant="outline"
              className="rounded-lg border-stone-200 text-stone-600"
            >
              {t({ he: "משפט הבא", en: "Next phrase" })}
            </Button>
          </div>

          {/* Course module pills */}
          <div className="mt-6 border-t border-stone-100 pt-5">
            <p className="mb-2.5 text-xs font-medium text-stone-400">
              {t({ he: "7 שיעורים בקורס", en: "7 lessons in the course" })}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {MODULE_LABELS.map(label => (
                <span
                  key={label.en}
                  className="rounded-md bg-stone-100 px-2 py-1 text-xs text-stone-600"
                >
                  {language === "he" ? label.he : label.en}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
