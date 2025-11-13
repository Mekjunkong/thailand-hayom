import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { lessons } from "@/data/lessons";
import { Link, useParams } from "wouter";
import { ArrowLeft, Volume2, CheckCircle2, XCircle } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

export default function LessonDetail() {
  const { id } = useParams();
  const lesson = lessons.find((l) => l.id === parseInt(id || "1"));
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Lesson not found</p>
      </div>
    );
  }

  const playAudio = (audioPath: string) => {
    if (!audioRefs.current[audioPath]) {
      audioRefs.current[audioPath] = new Audio(audioPath);
    }
    audioRefs.current[audioPath].play().catch((error) => {
      console.error("Audio playback failed:", error);
      toast.error("Could not play audio");
    });
  };

  const handleAnswerSelect = (exerciseIndex: number, answerIndex: number) => {
    if (!showResults) {
      setSelectedAnswers({ ...selectedAnswers, [exerciseIndex]: answerIndex });
    }
  };

  const checkAnswers = () => {
    setShowResults(true);
    const correctCount = lesson.exercises.filter(
      (ex, idx) => selectedAnswers[idx] === ex.correctAnswer
    ).length;
    
    if (correctCount === lesson.exercises.length) {
      toast.success("Perfect! All answers correct! 🎉");
    } else {
      toast.info(`You got ${correctCount} out of ${lesson.exercises.length} correct`);
    }
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const nextLessonId = lesson.id < lessons.length ? lesson.id + 1 : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header 
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: `url('${lesson.image}')` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4 py-6 text-white h-full flex flex-col justify-between">
          <Link href="/lessons">
            <Button variant="ghost" className="text-white hover:bg-white/20 w-fit">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Lessons
            </Button>
          </Link>
          <div>
            <div className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full font-bold mb-4">
              Lesson {lesson.id}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{lesson.title}</h1>
            <p className="text-xl" dir="rtl">{lesson.titleHebrew}</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Description */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About This Lesson</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-2">{lesson.description}</p>
            <p className="text-gray-700" dir="rtl">{lesson.descriptionHebrew}</p>
          </CardContent>
        </Card>

        {/* Phrases Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Phrases to Learn</h2>
          <div className="space-y-4">
            {lesson.phrases.map((phrase, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="text-4xl font-bold text-orange-600 mb-3">
                        {phrase.thai}
                      </div>
                      <div className="text-xl text-gray-500 mb-2 italic font-light">
                        {phrase.phonetic}
                      </div>
                      <div className="text-xl font-semibold text-gray-900 mb-1">
                        {phrase.english}
                      </div>
                      <div className="text-xl text-gray-700" dir="rtl">
                        {phrase.hebrew}
                      </div>
                    </div>
                    <Button
                      size="lg"
                      variant="outline"
                      className="shrink-0 hover:bg-orange-50 border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:scale-110"
                      onClick={() => playAudio(phrase.audio)}
                    >
                      <Volume2 className="h-7 w-7 text-orange-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Cultural Note */}
        {lesson.culturalNote && (
          <Card className="mb-12 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>💡</span>
                <span>Cultural Note</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-2">{lesson.culturalNote}</p>
              <p className="text-gray-700" dir="rtl">{lesson.culturalNoteHebrew}</p>
            </CardContent>
          </Card>
        )}

        {/* Exercises Section */}
        {lesson.exercises.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Practice Exercises</h2>
            <div className="space-y-6">
              {lesson.exercises.map((exercise, exerciseIndex) => (
                <Card key={exerciseIndex}>
                  <CardHeader>
                    <CardTitle className="text-xl">Question {exerciseIndex + 1}</CardTitle>
                    <CardDescription className="text-base">
                      <p className="mb-1">{exercise.question}</p>
                      <p dir="rtl">{exercise.questionHebrew}</p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {exercise.options?.map((option, optionIndex) => {
                        const isSelected = selectedAnswers[exerciseIndex] === optionIndex;
                        const isCorrect = exercise.correctAnswer === optionIndex;
                        const showCorrect = showResults && isCorrect;
                        const showIncorrect = showResults && isSelected && !isCorrect;

                        return (
                          <button
                            key={optionIndex}
                            onClick={() => handleAnswerSelect(exerciseIndex, optionIndex)}
                            disabled={showResults}
                            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                              showCorrect
                                ? "border-green-500 bg-green-50"
                                : showIncorrect
                                ? "border-red-500 bg-red-50"
                                : isSelected
                                ? "border-orange-500 bg-orange-50"
                                : "border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                            } ${showResults ? "cursor-not-allowed" : "cursor-pointer"}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-lg">{option}</span>
                              {showCorrect && <CheckCircle2 className="h-6 w-6 text-green-600" />}
                              {showIncorrect && <XCircle className="h-6 w-6 text-red-600" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 flex gap-4">
              {!showResults ? (
                <Button
                  size="lg"
                  onClick={checkAnswers}
                  disabled={Object.keys(selectedAnswers).length !== lesson.exercises.length}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Check Answers
                </Button>
              ) : (
                <Button size="lg" onClick={resetQuiz} variant="outline">
                  Try Again
                </Button>
              )}
            </div>
          </section>
        )}

        {/* Contact Section */}
        <Card className="mb-12 bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 border-2 border-green-300 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <span>📚</span>
              <span>Want to Learn More?</span>
            </CardTitle>
            <CardDescription className="text-base">
              <p className="mb-1">Get personalized Thai lessons and advanced courses!</p>
              <p dir="rtl">קבל שיעורי תאילנדית מותאמים אישית וקורסים מתקדמים!</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl">📱</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">WhatsApp</p>
                  <a href="https://wa.me/66929894495" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 font-medium text-lg">
                    +66 92 989 4495
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl">✉️</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Email</p>
                  <a href="mailto:Pasuthunjunkong@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium text-lg break-all">
                    Pasuthunjunkong@gmail.com
                  </a>
                </div>
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                <p className="text-center text-gray-700 font-medium">
                  💡 Available for private lessons, group classes, and corporate training
                </p>
                <p className="text-center text-gray-600 text-sm mt-2" dir="rtl">
                  זמין לשיעורים פרטיים, שיעורי קבוצה והדרכות לחברות
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link href="/lessons">
            <Button size="lg" variant="outline" className="border-2 hover:bg-orange-50 hover:border-orange-300">
              <ArrowLeft className="mr-2 h-5 w-5" />
              All Lessons
            </Button>
          </Link>
          {nextLessonId && (
            <Link href={`/lesson/${nextLessonId}`}>
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Next Lesson →
              </Button>
            </Link>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Learn Thai for Israeli Travelers</p>
        </div>
      </footer>
    </div>
  );
}
