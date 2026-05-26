import { CourseHero } from "@/components/course/CourseHero";
import { CoursePath } from "@/components/course/CoursePath";
import { FreePaidComparison } from "@/components/course/FreePaidComparison";
import { PhrasePracticePreview } from "@/components/course/PhrasePracticePreview";
import ContentFeed from "@/components/ContentFeed";

export default function Home() {
  return (
    <main className="min-h-screen bg-[oklch(0.97_0.015_80)]">
      <CourseHero />
      <PhrasePracticePreview />
      <CoursePath />
      <FreePaidComparison />
      <section className="bg-[oklch(0.97_0.015_80)] py-16" dir="rtl">
        <div className="container">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-stone-950">מדריכי טיול שתומכים בקורס</h2>
            <p className="mt-3 text-stone-700">
              מאמרים על תאילנד נשארים באתר, אבל המטרה שלהם היא לעזור לכם להשתמש בתאית בטיול אמיתי.
            </p>
          </div>
        </div>
        <ContentFeed />
      </section>
    </main>
  );
}
