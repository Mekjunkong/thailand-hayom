import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Trophy, Calendar, Brain } from "lucide-react";
import { lessonsData } from "@/data/lessonsData";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";

interface QuizPhrase {
  id: number;
  thai: string;
  phonetic: string;
  english: string;
  hebrew: string;
  lessonTitle: string;
}

interface QuizStats {
  correct: number;
  incorrect: number;
  streak: number;
}

export default function Quiz() {
  const { isAuthenticated } = useAuth();
  const [quizPhrases, setQuizPhrases] = useState<QuizPhrase[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [stats, setStats] = useState<QuizStats>({ correct: 0, incorrect: 0, streak: 0 });
  const [quizComplete, setQuizComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dueCount, setDueCount] = useState(0);

  // Load phrases due for review
  useEffect(() => {
    const loadQuizPhrases = async () => {
      if (!isAuthenticated) {
        // If not logged in, use all phrases
        const allPhrases: QuizPhrase[] = [];
        lessonsData.forEach((lesson) => {
          lesson.phrases.forEach((phrase) => {
            allPhrases.push({
              id: lesson.id * 100 + phrase.id,
              thai: phrase.thai,
              phonetic: phrase.phonetic,
              english: phrase.english,
              hebrew: phrase.hebrew,
              lessonTitle: lesson.title,
            });
          });
        });
        // Shuffle and take first 10
        const shuffled = allPhrases.sort(() => Math.random() - 0.5).slice(0, 10);
        setQuizPhrases(shuffled);
        setLoading(false);
        return;
      }

      try {
        // Get phrases due for review
        const response = await fetch("/api/progress/quiz/due");
        if (response.ok) {
          const data = await response.json();
          setDueCount(data.count);

          // If no phrases due, use random phrases
          if (data.count === 0) {
            const allPhrases: QuizPhrase[] = [];
            lessonsData.forEach((lesson) => {
              lesson.phrases.forEach((phrase) => {
                allPhrases.push({
                  id: lesson.id * 100 + phrase.id,
                  thai: phrase.thai,
                  phonetic: phrase.phonetic,
                  english: phrase.english,
                  hebrew: phrase.hebrew,
                  lessonTitle: lesson.title,
                });
              });
            });
            const shuffled = allPhrases.sort(() => Math.random() - 0.5).slice(0, 10);
            setQuizPhrases(shuffled);
          } else {
            // Use phrases due for review
            const duePhrases = data.due.map((d: any) => {
              const lessonId = Math.floor(d.phraseId / 100);
              const phraseId = d.phraseId % 100;
              const lesson = lessonsData.find(l => l.id === lessonId);
              const phrase = lesson?.phrases.find(p => p.id === phraseId);
              
              if (!lesson || !phrase) return null;

              return {
                id: d.phraseId,
                thai: phrase.thai,
                phonetic: phrase.phonetic,
                english: phrase.english,
                hebrew: phrase.hebrew,
                lessonTitle: lesson.title,
              };
            }).filter(Boolean);
            
            setQuizPhrases(duePhrases);
          }
        }
      } catch (error) {
        console.error("Failed to load quiz phrases:", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuizPhrases();
  }, [isAuthenticated]);

  const currentPhrase = quizPhrases[currentIndex];

  const handleAnswer = async (correct: boolean) => {
    if (!currentPhrase) return;

    // Update stats
    setStats(prev => ({
      correct: correct ? prev.correct + 1 : prev.correct,
      incorrect: correct ? prev.incorrect : prev.incorrect + 1,
      streak: correct ? prev.streak + 1 : 0,
    }));

    // Save to database if authenticated
    if (isAuthenticated) {
      try {
        await fetch("/api/progress/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phraseId: currentPhrase.id,
            correct,
          }),
        });
      } catch (error) {
        console.error("Failed to save quiz result:", error);
      }
    }

    // Move to next phrase
    setTimeout(() => {
      if (currentIndex < quizPhrases.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowAnswer(false);
      } else {
        setQuizComplete(true);
      }
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center pt-16">
        <div className="text-center">
          <Brain className="w-16 h-16 animate-pulse text-purple-500 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const accuracy = stats.correct + stats.incorrect > 0
      ? Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100)
      : 0;

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-20 py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="border-4 border-purple-400 shadow-2xl">
            <CardHeader className="text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <Trophy className="w-20 h-20 mx-auto mb-4" />
              <CardTitle className="text-4xl">Quiz Complete!</CardTitle>
            </CardHeader>
            <CardContent className="pt-8 space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-green-100 rounded-lg">
                  <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-green-700">{stats.correct}</div>
                  <div className="text-sm text-gray-600">Correct</div>
                </div>
                <div className="p-4 bg-red-100 rounded-lg">
                  <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-red-700">{stats.incorrect}</div>
                  <div className="text-sm text-gray-600">Incorrect</div>
                </div>
                <div className="p-4 bg-purple-100 rounded-lg">
                  <Brain className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-purple-700">{accuracy}%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
              </div>

              {stats.streak >= 5 && (
                <div className="text-center p-4 bg-yellow-100 rounded-lg border-2 border-yellow-400">
                  <span className="text-2xl">🔥</span>
                  <p className="text-yellow-800 font-semibold">
                    Amazing! You had a {stats.streak}-phrase streak!
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <Button
                  onClick={() => window.location.reload()}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 text-lg"
                >
                  🔄 Take Another Quiz
                </Button>
                <Link href="/interactive-lessons">
                  <Button variant="outline" className="w-full py-6 text-lg">
                    📚 Back to Lessons
                  </Button>
                </Link>
              </div>

              {isAuthenticated && (
                <div className="text-center text-sm text-gray-600 p-4 bg-blue-50 rounded-lg">
                  <Calendar className="inline-block w-4 h-4 mr-2" />
                  Your progress is saved. Phrases will be scheduled for review based on your performance.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!currentPhrase || quizPhrases.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-20 py-12 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <Card>
            <CardContent className="pt-12 pb-12">
              <Brain className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">No Phrases Available</h2>
              <p className="text-gray-600 mb-6">
                Complete some lessons first to unlock quiz mode!
              </p>
              <Link href="/interactive-lessons">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  Start Learning
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const progress = ((currentIndex + 1) / quizPhrases.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-20 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header Stats */}
        <div className="mb-8 flex justify-between items-center">
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-700">{stats.correct}</span>
            </div>
            <div className="flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full">
              <XCircle className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-red-700">{stats.incorrect}</span>
            </div>
            {stats.streak >= 3 && (
              <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
                <span className="text-xl">🔥</span>
                <span className="font-semibold text-yellow-700">{stats.streak}</span>
              </div>
            )}
          </div>
          <div className="text-sm text-gray-600">
            {currentIndex + 1} / {quizPhrases.length}
          </div>
        </div>

        {/* Progress Bar */}
        <Progress value={progress} className="h-3 mb-8" />

        {/* Quiz Card */}
        <Card className="border-4 border-purple-400 shadow-2xl">
          <CardHeader className="text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <div className="text-sm opacity-90">{currentPhrase.lessonTitle}</div>
            <CardTitle className="text-2xl">What does this mean?</CardTitle>
          </CardHeader>
          <CardContent className="pt-12 pb-12">
            <div className="text-center space-y-6">
              {/* Thai Text */}
              <div className="text-6xl font-bold text-purple-600 mb-4">
                {currentPhrase.thai}
              </div>

              {/* Phonetic */}
              <div className="text-2xl text-gray-600 italic mb-8">
                {currentPhrase.phonetic}
              </div>

              {/* Answer (hidden until revealed) */}
              {showAnswer ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-300">
                    <div className="text-2xl font-semibold text-gray-900 mb-2">
                      {currentPhrase.english}
                    </div>
                    <div className="text-xl text-gray-700 hebrew-text" dir="rtl">
                      {currentPhrase.hebrew}
                    </div>
                  </div>

                  {/* Feedback Buttons */}
                  <div className="flex gap-4 justify-center mt-8">
                    <Button
                      onClick={() => handleAnswer(false)}
                      variant="outline"
                      className="px-8 py-6 text-lg border-2 border-red-400 hover:bg-red-50"
                    >
                      <XCircle className="w-6 h-6 mr-2 text-red-600" />
                      I was wrong
                    </Button>
                    <Button
                      onClick={() => handleAnswer(true)}
                      className="px-8 py-6 text-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    >
                      <CheckCircle2 className="w-6 h-6 mr-2" />
                      I was right!
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => setShowAnswer(true)}
                  className="px-12 py-6 text-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Show Answer
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        {isAuthenticated && dueCount > 0 && (
          <div className="mt-6 text-center text-sm text-gray-600 p-4 bg-blue-50 rounded-lg">
            <Calendar className="inline-block w-4 h-4 mr-2" />
            {dueCount} phrases are due for review today
          </div>
        )}
      </div>
    </div>
  );
}
