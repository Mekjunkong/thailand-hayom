import { Link } from "wouter";
import { Download, Gift, Headphones } from "lucide-react";
import { CourseHero } from "@/components/course/CourseHero";
import { CoursePath } from "@/components/course/CoursePath";
import { FreePaidComparison } from "@/components/course/FreePaidComparison";
import { PhrasePracticePreview } from "@/components/course/PhrasePracticePreview";
import ContentFeed from "@/components/ContentFeed";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function Home() {
  const { language, t } = useLanguage();
  const dir = language === "he" ? "rtl" : "ltr";
  usePageTitle(
    language === "he"
      ? "תאילנד היום — המדריך לישראלים בתאילנד"
      : "Thailand Hayom — Guide for Israelis in Thailand"
  );

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <CourseHero />
      <section className="bg-[oklch(98%_0.016_88)] py-14" dir={dir}>
        <div className="container">
          <div className="grid gap-6 rounded-[2rem] border border-[oklch(88%_0.025_82)] bg-white p-6 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[oklch(94%_0.055_48)] px-3 py-1 text-sm font-bold text-[oklch(67%_0.19_42)]">
                <Gift className="h-4 w-4" />
                {t({ he: "חינם לפני הטיסה", en: "Free before your flight" })}
              </div>
              <h2 className="text-3xl font-black text-stone-950">
                {t({
                  he: "קבלו 50 ביטויים בתאית לשמירה בטלפון",
                  en: "Get 50 Thai phrases to save on your phone",
                })}
              </h2>
              <p className="mt-3 max-w-2xl text-stone-700">
                {t({
                  he: "עמוד /free החדש כולל הורדה, תרגול שמיעה בדפדפן וביטויים מעשיים לנחיתה, מוניות, אוכל, מלון וחירום.",
                  en: "The new /free page includes a download, browser audio practice, and practical phrases for arrival, taxis, food, hotels, and emergencies.",
                })}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Link
                href="/free"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[oklch(67%_0.19_42)] px-6 text-base font-bold text-white shadow-md transition-transform hover:-translate-y-0.5"
              >
                <Download className="h-5 w-5" />
                {t({ he: "פתחו את החבילה", en: "Open the free pack" })}
              </Link>
              <Link
                href="/articles/thai-airport-phrases-israeli-travelers"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[oklch(88%_0.025_82)] px-6 text-base font-bold text-stone-950 hover:bg-stone-50"
              >
                <Headphones className="h-5 w-5" />
                {t({ he: "קראו מדריך נחיתה", en: "Read the airport guide" })}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <PhrasePracticePreview />
      <CoursePath />
      <FreePaidComparison />
      <section className="bg-[#F8FAFC] py-20" dir={dir}>
        <div className="container">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-stone-950">
              {t({
                he: "מדריכי טיול שתומכים בקורס",
                en: "Travel guides that support the course",
              })}
            </h2>
            <p className="mt-3 text-stone-700">
              {t({
                he: "מאמרים על תאילנד נשארים באתר, אבל המטרה שלהם היא לעזור לכם להשתמש בתאית בטיול אמיתי.",
                en: "Articles about Thailand stay on the site, but their purpose is to help you use Thai on a real trip.",
              })}
            </p>
          </div>
        </div>
        <ContentFeed />
      </section>
    </main>
  );
}
