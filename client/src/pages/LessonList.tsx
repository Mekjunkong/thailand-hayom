import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { lessons } from "@/data/lessons";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function LessonList() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="bg-orange-500 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-orange-600 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold">All Lessons</h1>
          <p className="text-lg opacity-90" dir="rtl">כל השיעורים</p>
        </div>
      </header>

      {/* Lessons Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <Link key={lesson.id} href={`/lesson/${lesson.id}`}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url('${lesson.image}')` }}
                >
                  <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                      {lesson.id}
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{lesson.title}</CardTitle>
                  <CardDescription className="text-base" dir="rtl">{lesson.titleHebrew}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
                  <p className="text-sm text-gray-600" dir="rtl">{lesson.descriptionHebrew}</p>
                  <div className="mt-4 flex items-center text-sm text-orange-600 font-semibold">
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
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Learn Thai for Israeli Travelers</p>
        </div>
      </footer>
    </div>
  );
}
