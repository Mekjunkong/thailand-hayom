import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Lock, Play } from "lucide-react";
import InteractiveLessonPlayer from "@/components/InteractiveLessonPlayer";
import { lessonsData } from "@/data/lessonsData";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";

export default function InteractiveLessons() {
  const { isAuthenticated } = useAuth();
  const { language, t } = useLanguage();
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(
    new Set(),
  );
  const [loading, setLoading] = useState(true);

  // Load progress from database on mount
  useEffect(() => {
    const loadProgress = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/progress");
        if (response.ok) {
          const data = await response.json();
          const completed = new Set<number>();
          data.progress.forEach((p: any) => {
            if (p.completed) {
              completed.add(p.lessonId);
            }
          });
          setCompletedLessons(completed);
        }
      } catch (error) {
        console.error("Failed to load progress:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [isAuthenticated]);

  // Save progress to database
  const saveProgress = async (lessonId: number, completed: boolean) => {
    if (!isAuthenticated) return;

    try {
      await fetch("/api/progress/lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, completed }),
      });
    } catch (error) {
      console.error("Failed to save progress:", error);
    }
  };

  const selectedLesson = lessonsData.find(l => l.id === selectedLessonId);
  const totalProgress = (completedLessons.size / lessonsData.length) * 100;

  const handleLessonComplete = () => {
    if (selectedLessonId) {
      const newCompleted = new Set(completedLessons);
      newCompleted.add(selectedLessonId);
      setCompletedLessons(newCompleted);
      // Save to database
      saveProgress(selectedLessonId, true);
    }
  };

  const handleNextLesson = () => {
    if (selectedLessonId) {
      const currentIndex = lessonsData.findIndex(
        l => l.id === selectedLessonId,
      );
      if (currentIndex < lessonsData.length - 1) {
        setSelectedLessonId(lessonsData[currentIndex + 1].id);
      } else {
        // Completed all lessons
        setSelectedLessonId(null);
      }
    }
  };

  const handleBackToLessons = () => {
    setSelectedLessonId(null);
  };

  // If a lesson is selected, show the player
  if (selectedLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-16 py-12 px-4">
        <InteractiveLessonPlayer
          lesson={selectedLesson}
          onComplete={handleLessonComplete}
          onNext={handleNextLesson}
          onPrevious={handleBackToLessons}
        />
      </div>
    );
  }

  // Otherwise, show the lesson selection page
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-16">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-16 shadow-2xl">
        <div className="container mx-auto px-4 text-center">
          <h1
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {t({
              he: "שיעורי תאילנדית אינטראקטיביים",
              en: "Interactive Thai Lessons",
            })}
          </h1>
          <p className="text-xl md:text-2xl">
            {t({
              he: "למדו תאית עם הגייה אודיו ותרחישים אמיתיים",
              en: "Learn Thai with audio pronunciation and real scenarios",
            })}
          </p>
        </div>
      </header>

      {/* Overall Progress */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {t({ he: "ההתקדמות שלך", en: "Your Progress" })}
                  </h2>
                  <span className="text-lg text-gray-600">
                    {completedLessons.size} / {lessonsData.length}{" "}
                    {t({
                      he: "שיעורים הושלמו",
                      en: "lessons completed",
                    })}
                  </span>
                </div>
                <Progress value={totalProgress} className="h-4" />
                <div className="flex justify-center gap-4 mt-4">
                  <Button
                    onClick={() =>
                      window.open("/api/phrase-cards/generate", "_blank")
                    }
                    variant="outline"
                    className="bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600"
                  >
                    {t({
                      he: "הורד כרטיסי ביטויים",
                      en: "Download Phrase Cards",
                    })}
                  </Button>
                  <Link href="/quiz">
                    <Button
                      variant="outline"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                    >
                      {t({ he: "תרגול חידון", en: "Practice Quiz" })}
                    </Button>
                  </Link>
                </div>
                {completedLessons.size === lessonsData.length && (
                  <div className="text-center p-4 bg-green-100 rounded-lg border-2 border-green-400">
                    <CheckCircle2 className="inline-block mr-2 h-6 w-6 text-green-600" />
                    <span className="text-green-800 font-semibold text-lg">
                      {t({
                        he: "מזל טוב! סיימת את כל השיעורים!",
                        en: "Congratulations! You've completed all lessons!",
                      })}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Lessons Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessonsData.map((lesson, index) => {
              const isCompleted = completedLessons.has(lesson.id);
              const isLocked = false; // All lessons unlocked

              return (
                <ScrollReveal key={lesson.id} delay={index * 0.03}>
                  <Card
                    className={`transition-all hover:shadow-xl ${
                      isCompleted
                        ? "border-green-400 bg-green-50"
                        : isLocked
                          ? "border-gray-300 bg-gray-100 opacity-60"
                          : "border-blue-300 hover:border-blue-500"
                    }`}
                  >
                    <CardHeader>
                      <div className="text-center mb-4">
                        <div className="text-6xl mb-2">{lesson.icon}</div>
                        {isCompleted && (
                          <CheckCircle2 className="inline-block h-8 w-8 text-green-600" />
                        )}
                        {isLocked && (
                          <Lock className="inline-block h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <CardTitle className="text-center text-xl">
                        {lesson.title}
                      </CardTitle>
                      <CardDescription
                        className="text-center hebrew-text text-base"
                        dir="rtl"
                      >
                        {lesson.titleHebrew}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center space-y-4">
                        <p className="text-gray-600">
                          {lesson.phrases.length}{" "}
                          {t({
                            he: "ביטויים ללמוד",
                            en: "phrases to learn",
                          })}
                        </p>

                        <Button
                          onClick={() => setSelectedLessonId(lesson.id)}
                          className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                        >
                          <Play className="mr-2 h-4 w-4" />
                          {t({
                            he: "תרגול הגייה",
                            en: "Practice Pronunciation",
                          })}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-blue-100 to-teal-100">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-gray-900">
              {t({
                he: "למה שיעורים אינטראקטיביים?",
                en: "Why Interactive Lessons?",
              })}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1}>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-5xl mb-4">🔊</div>
                <h3 className="text-xl font-bold mb-2">
                  {t({ he: "הגייה אודיו", en: "Audio Pronunciation" })}
                </h3>
                <p className="text-gray-600">
                  {t({
                    he: "שמע הגייה תאילנדית מקורית לכל ביטוי",
                    en: "Hear native Thai pronunciation for every phrase",
                  })}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2">
                  {t({ he: "תרחישים אמיתיים", en: "Real Scenarios" })}
                </h3>
                <p className="text-gray-600">
                  {t({
                    he: "למד ביטויים שתשתמש בהם באמת בתאילנד",
                    en: "Learn phrases you'll actually use in Thailand",
                  })}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-5xl mb-4">📈</div>
                <h3 className="text-xl font-bold mb-2">
                  {t({ he: "מעקב התקדמות", en: "Track Progress" })}
                </h3>
                <p className="text-gray-600">
                  {t({
                    he: "ראה את ההתקדמות שלך ככל שאתה משלים שיעורים",
                    en: "See your improvement as you complete lessons",
                  })}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {t({
              he: "רוצה עוד משאבים?",
              en: "Want More Resources?",
            })}
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            {t({
              he: "קבל את ערכת הקבלה המלאה שלנו עם מדריכי טיולים, טיפים לבטיחות ועצות תרבותיות",
              en: "Get our complete Welcome Kit with travel guides, safety tips, and cultural advice",
            })}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/welcome-kit">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700"
              >
                {t({
                  he: "ערכת קבלה (₪20)",
                  en: "Get Welcome Kit (₪20)",
                })}
              </Button>
            </Link>
            <Link href="/downloads">
              <Button size="lg" variant="outline">
                {t({ he: "הורדות חינם", en: "Free Downloads" })}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
