import { Link } from "wouter";
import { Check, Lock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COURSE_BONUSES, TOURIST_COURSE } from "@/data/touristCourse";
import { useLanguage } from "@/contexts/LanguageContext";

const FREE_FEATURES = [
  {
    he: "שני שיעורי ניסיון (ברכות + אוכל)",
    en: "Two trial lessons (greetings + food)",
  },
  {
    he: "שמע הגייה של כל משפט",
    en: "Audio pronunciation for every phrase",
  },
  {
    he: "שמירת התקדמות",
    en: "Progress saved",
  },
  {
    he: "תצוגה של כל מסלול הקורס",
    en: "View the full course path",
  },
];

export function FreePaidComparison() {
  const { language, t } = useLanguage();
  const dir = language === "he" ? "rtl" : "ltr";

  return (
    <section className="bg-[#F8FAFC] py-20" dir={dir}>
      <div className="container">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-stone-950 md:text-5xl">
            {t({
              he: "בחרו איך תאילנד היום יכול לעזור",
              en: "Choose how Thailand Hayom can help",
            })}
          </h2>
          <p className="mt-3 text-lg text-stone-600">
            {t({
              he: "הביטויים והקורס עוזרים בשטח. שיחת התכנון עוזרת לכם לקבל החלטות לפני שמוציאים כסף על הטיול.",
              en: "Phrases and the course help on the ground. The planning call helps you make decisions before spending trip money.",
            })}
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {/* Free tier */}
          <div className="rounded-2xl border border-stone-200 bg-white p-7">
            <h3 className="text-2xl font-bold text-stone-950">
              {t({ he: "חשבון חינמי", en: "Free account" })}
            </h3>
            <p className="mt-1.5 text-sm text-stone-500">
              {t({ he: "ללא כרטיס אשראי", en: "No credit card required" })}
            </p>
            <ul className="mt-6 space-y-3">
              {FREE_FEATURES.map(f => (
                <li
                  key={f.en}
                  className="flex items-start gap-3 text-stone-700"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span className="text-sm leading-5">
                    {language === "he" ? f.he : f.en}
                  </span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              variant="outline"
              className="mt-8 w-full rounded-xl border-stone-300 font-bold"
            >
              <Link href="/login">
                {t({ he: "התחילו חינם", en: "Start for free" })}
              </Link>
            </Button>
          </div>

          {/* Planning call tier */}
          <div className="relative rounded-2xl border-2 border-emerald-600 bg-white p-7 shadow-xl">
            <span className="absolute -top-3 right-7 rounded-full bg-emerald-500 px-3 py-0.5 text-xs font-black text-white">
              {t({ he: "הכי חשוב", en: "Most useful" })}
            </span>

            <h3 className="text-2xl font-bold text-stone-950">
              {t({ he: "שיחת תכנון טיול", en: "Trip planning call" })}
            </h3>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-4xl font-black text-emerald-600">₪149</span>
              <span className="text-sm text-stone-500">
                {t({ he: "45 דקות", en: "45 minutes" })}
              </span>
            </div>

            <ul className="mt-6 space-y-3">
              {[
                t({ he: "מסלול ברור לפי הזמן והתקציב", en: "Clear route for your time and budget" }),
                t({ he: "איים, תחבורה, טעויות והונאות", en: "Islands, transport, mistakes, and scams" }),
                t({ he: "סיכום קצר בוואטסאפ אחרי השיחה", en: "Short WhatsApp summary after the call" }),
                t({ he: "אפשרות למסלול כתוב בתשלום נפרד", en: "Optional written itinerary separately" }),
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-stone-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span className="text-sm leading-5">{item}</span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              className="mt-8 w-full rounded-xl bg-emerald-600 font-bold text-white hover:bg-emerald-500"
            >
              <Link href="/planning-call">
                <MessageCircle className="h-4 w-4" />
                {t({ he: "קבעו שיחה", en: "Book a call" })}
              </Link>
            </Button>
          </div>

          {/* Paid tier */}
          <div className="relative rounded-2xl border-2 border-stone-950 bg-stone-950 p-7 text-white">
            {/* "Best value" badge */}
            <span className="absolute -top-3 right-7 rounded-full bg-amber-400 px-3 py-0.5 text-xs font-black text-stone-950">
              {t({ he: "הכי שווה", en: "Best value" })}
            </span>

            <h3 className="text-2xl font-bold">
              {t({ he: "הקורס המלא", en: "Full course" })}
            </h3>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-4xl font-black text-amber-400">
                ₪{TOURIST_COURSE.priceIls}
              </span>
              <span className="text-sm text-stone-400 line-through">
                ₪{TOURIST_COURSE.originalPriceIls}
              </span>
              <span className="text-sm text-stone-400">
                {t({ he: "תשלום חד פעמי", en: "one-time payment" })}
              </span>
            </div>

            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3 text-stone-200">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span className="text-sm leading-5">
                  {t({
                    he: "כל 7 שיעורי הדיבור",
                    en: "All 7 speaking lessons",
                  })}
                </span>
              </li>
              <li className="flex items-start gap-3 text-stone-200">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span className="text-sm leading-5">
                  {t({
                    he: "תרגול שמע + חזרה מהירה",
                    en: "Audio practice + quick review",
                  })}
                </span>
              </li>
              {COURSE_BONUSES.map(bonus => (
                <li
                  key={bonus.titleEn}
                  className="flex items-start gap-3 text-stone-200"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <span className="text-sm leading-5">
                    {language === "he" ? bonus.titleHe : bonus.titleEn}
                  </span>
                </li>
              ))}
              <li className="flex items-start gap-3 text-stone-400">
                <Lock className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="text-sm leading-5 line-through">
                  {t({
                    he: "ללא הגבלת זמן לתוכן",
                    en: "No time limit on content",
                  })}
                </span>
              </li>
            </ul>

            <Button
              asChild
              className="mt-8 w-full rounded-xl bg-amber-400 font-bold text-stone-950 hover:bg-amber-300"
            >
              <Link href="/welcome-kit">
                {t({ he: "פתחו את הקורס", en: "Unlock the course" })}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
