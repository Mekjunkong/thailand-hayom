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
