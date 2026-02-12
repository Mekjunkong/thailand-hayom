import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { lessons } from "@/data/lessons";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function LessonList() {
  const handleLessonClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pt-16">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-8 shadow-2xl">
        <div className="container mx-auto px-4">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-amber-600/50 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-5xl font-bold">All Lessons</h1>
          <p className="text-xl mt-2" dir="rtl">כל השיעורים</p>
        </div>
      </header>

      {/* Lessons Grid */}
      <main className="container mx-auto px-4 py-16" style={{background: 'linear-gradient(to bottom, oklch(0.98 0.01 75), white)'}}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson) => (
            <Link key={lesson.id} href={`/lesson/${lesson.id}`} onClick={handleLessonClick}>
              <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden border-2 border-transparent hover:border-amber-200">
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url('${lesson.image}')` }}
                >
                  <div className="h-full bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg">
                      {lesson.id}
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-gray-900">{lesson.title}</CardTitle>
                  <CardDescription className="text-lg mt-1" dir="rtl">{lesson.titleHebrew}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
                  <p className="text-sm text-gray-600" dir="rtl">{lesson.descriptionHebrew}</p>
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-sm text-amber-600 font-bold">
                    <span>{lesson.phrases.length} phrases</span>
                    <span className="mx-2">•</span>
                    <span>{lesson.exercises.length} exercises</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
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
