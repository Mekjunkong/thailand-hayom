import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useProgress } from "@/contexts/ProgressContext";
import { Trophy, Target, Flame, Award, BookOpen, CheckCircle2 } from "lucide-react";
import { lessons } from "@/data/lessons";

export default function Progress() {
  const { progress, getCompletionPercentage, isLessonCompleted } = useProgress();
  const completionPercentage = getCompletionPercentage();
  const totalLessons = 10;
  const completedCount = progress.completedLessons.length;
  const averageQuizScore = Object.values(progress.quizScores).length > 0
    ? Math.round(Object.values(progress.quizScores).reduce((a, b) => a + b, 0) / Object.values(progress.quizScores).length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 shadow-2xl">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{fontFamily: 'Playfair Display, serif'}}>
            Your Learning Progress
          </h1>
          <p className="text-xl md:text-2xl mb-2">Track your journey to mastering Thai</p>
          <p className="text-lg md:text-xl hebrew-text" dir="rtl">עקבו אחר המסע שלכם לשליטה בתאילנדית</p>
        </div>
      </header>

      {/* Stats Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Completion Percentage */}
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Target className="w-8 h-8 text-blue-600" />
                  <span className="text-3xl font-bold text-blue-600">{completionPercentage}%</span>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg mb-1">Completion</CardTitle>
                <CardDescription className="hebrew-text" dir="rtl">השלמה</CardDescription>
                <div className="mt-3 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Completed Lessons */}
            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                  <span className="text-3xl font-bold text-green-600">{completedCount}/{totalLessons}</span>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg mb-1">Lessons Completed</CardTitle>
                <CardDescription className="hebrew-text" dir="rtl">שיעורים שהושלמו</CardDescription>
              </CardContent>
            </Card>

            {/* Learning Streak */}
            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Flame className="w-8 h-8 text-orange-600" />
                  <span className="text-3xl font-bold text-orange-600">{progress.streak}</span>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg mb-1">Day Streak</CardTitle>
                <CardDescription className="hebrew-text" dir="rtl">רצף ימים</CardDescription>
              </CardContent>
            </Card>

            {/* Average Quiz Score */}
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Trophy className="w-8 h-8 text-purple-600" />
                  <span className="text-3xl font-bold text-purple-600">{averageQuizScore}%</span>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg mb-1">Avg Quiz Score</CardTitle>
                <CardDescription className="hebrew-text" dir="rtl">ציון ממוצע</CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card className="mb-12 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Award className="w-8 h-8 text-amber-600" />
                Achievements
              </CardTitle>
              <CardDescription className="text-lg hebrew-text" dir="rtl">הישגים</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {/* Achievement Badges */}
                <div className={`p-6 rounded-lg text-center ${completedCount >= 3 ? 'bg-gradient-to-br from-amber-100 to-yellow-100 border-2 border-amber-400' : 'bg-gray-100 opacity-50'}`}>
                  <div className="text-4xl mb-2">🥉</div>
                  <h3 className="font-bold text-lg">Bronze Learner</h3>
                  <p className="text-sm text-gray-600">Complete 3 lessons</p>
                  <p className="text-xs text-gray-500 hebrew-text mt-1" dir="rtl">השלימו 3 שיעורים</p>
                </div>

                <div className={`p-6 rounded-lg text-center ${completedCount >= 6 ? 'bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-gray-400' : 'bg-gray-100 opacity-50'}`}>
                  <div className="text-4xl mb-2">🥈</div>
                  <h3 className="font-bold text-lg">Silver Speaker</h3>
                  <p className="text-sm text-gray-600">Complete 6 lessons</p>
                  <p className="text-xs text-gray-500 hebrew-text mt-1" dir="rtl">השלימו 6 שיעורים</p>
                </div>

                <div className={`p-6 rounded-lg text-center ${completedCount >= 10 ? 'bg-gradient-to-br from-yellow-200 to-amber-300 border-2 border-yellow-500' : 'bg-gray-100 opacity-50'}`}>
                  <div className="text-4xl mb-2">🥇</div>
                  <h3 className="font-bold text-lg">Gold Master</h3>
                  <p className="text-sm text-gray-600">Complete all 10 lessons</p>
                  <p className="text-xs text-gray-500 hebrew-text mt-1" dir="rtl">השלימו את כל 10 השיעורים</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lesson Progress List */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <BookOpen className="w-8 h-8 text-blue-600" />
                Lesson Progress
              </CardTitle>
              <CardDescription className="text-lg hebrew-text" dir="rtl">התקדמות שיעורים</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lessons.map((lesson) => {
                  const completed = isLessonCompleted(lesson.id);
                  const quizScore = progress.quizScores[lesson.id];
                  
                  return (
                    <div key={lesson.id} className={`p-4 rounded-lg border-2 ${completed ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${completed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                            {completed ? '✓' : lesson.id}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{lesson.title}</h3>
                            <p className="text-sm text-gray-600 hebrew-text" dir="rtl">{lesson.titleHebrew}</p>
                            {quizScore !== undefined && (
                              <p className="text-sm text-green-600 font-semibold mt-1">Quiz Score: {quizScore}%</p>
                            )}
                          </div>
                        </div>
                        <Link href={`/lesson/${lesson.id}`}>
                          <Button variant={completed ? "outline" : "default"}>
                            {completed ? 'Review' : 'Start'}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
            Keep Learning!
          </h2>
          <p className="text-xl text-gray-700 mb-2">Continue your Thai language journey</p>
          <p className="text-lg text-gray-600 mb-8 hebrew-text" dir="rtl">המשיכו במסע לימוד התאילנדית שלכם</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/lessons">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-xl">
                📚 Continue Lessons
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="border-2">
                🏠 Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
