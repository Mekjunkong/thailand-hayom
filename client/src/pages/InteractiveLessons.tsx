import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Lock, Play } from "lucide-react";
import InteractiveLessonPlayer from "@/components/InteractiveLessonPlayer";
import { lessonsData } from "@/data/lessonsData";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";

export default function InteractiveLessons() {
  const { isAuthenticated } = useAuth();
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
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
            if (p.completed === 1) {
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
  const saveProgress = async (lessonId: number, completed: number) => {
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
      saveProgress(selectedLessonId, 1);
    }
  };

  const handleNextLesson = () => {
    if (selectedLessonId) {
      const currentIndex = lessonsData.findIndex(l => l.id === selectedLessonId);
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
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-16 shadow-2xl">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{fontFamily: 'Playfair Display, serif'}}>
            Interactive Thai Lessons
          </h1>
          <p className="text-xl md:text-2xl mb-2">Learn Thai with audio pronunciation and real scenarios</p>
          <p className="text-lg md:text-xl hebrew-text" dir="rtl">למדו תאית עם הגייה אודיו ותרחישים אמיתיים</p>
        </div>
      </header>

      {/* Overall Progress */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Your Progress</h2>
                  <span className="text-lg text-gray-600">
                    {completedLessons.size} / {lessonsData.length} lessons completed
                  </span>
                </div>
                <Progress value={totalProgress} className="h-4" />
                <div className="flex justify-center gap-4 mt-4">
                  <Button
                    onClick={() => window.open('/api/phrase-cards/generate', '_blank')}
                    variant="outline"
                    className="bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600"
                  >
                    📥 Download Phrase Cards
                  </Button>
                  <Link href="/quiz">
                    <Button
                      variant="outline"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                    >
                      🧠 Practice Quiz
                    </Button>
                  </Link>
                </div>
                {completedLessons.size === lessonsData.length && (
                  <div className="text-center p-4 bg-green-100 rounded-lg border-2 border-green-400">
                    <CheckCircle2 className="inline-block mr-2 h-6 w-6 text-green-600" />
                    <span className="text-green-800 font-semibold text-lg">
                      Congratulations! You've completed all lessons! 🎉
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
              const isLocked = index > 0 && !completedLessons.has(lessonsData[index - 1].id);

              return (
                <Card
                  key={lesson.id}
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
                    <CardDescription className="text-center hebrew-text text-base" dir="rtl">
                      {lesson.titleHebrew}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <p className="text-gray-600">
                        {lesson.phrases.length} phrases to learn
                      </p>
                      
                      {isLocked ? (
                        <Button disabled className="w-full">
                          <Lock className="mr-2 h-4 w-4" />
                          Complete Previous Lesson
                        </Button>
                      ) : (
                        <Button
                          onClick={() => setSelectedLessonId(lesson.id)}
                          className={`w-full ${
                            isCompleted
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                          }`}
                        >
                          {isCompleted ? (
                            <>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Review Lesson
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              Start Lesson
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-blue-100 to-teal-100">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-gray-900">
            Why Interactive Lessons?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-5xl mb-4">🔊</div>
              <h3 className="text-xl font-bold mb-2">Audio Pronunciation</h3>
              <p className="text-gray-600">Hear native Thai pronunciation for every phrase</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Real Scenarios</h3>
              <p className="text-gray-600">Learn phrases you'll actually use in Thailand</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-2">Track Progress</h3>
              <p className="text-gray-600">See your improvement as you complete lessons</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Want More Resources?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Get our complete Welcome Kit with travel guides, safety tips, and cultural advice
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/welcome-kit">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700">
                Get Welcome Kit (₪20)
              </Button>
            </Link>
            <Link href="/downloads">
              <Button size="lg" variant="outline">
                Free Downloads
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Learn Thai Before You Fly. Made with ❤️ for travelers.</p>
          <p className="mt-2 text-gray-400">Contact: Pasuthunjunkong@gmail.com</p>
        </div>
      </footer>
    </div>
  );
}
