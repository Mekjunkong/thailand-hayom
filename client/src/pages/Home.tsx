import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { APP_TITLE } from "@/const";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            {APP_TITLE}
          </h1>
          <p className="text-xl md:text-2xl mb-4 opacity-90">
            Master Essential Thai Phrases for Your Journey
          </p>
          <p className="text-lg md:text-xl mb-8 opacity-90" dir="rtl">
            שלטו בביטויים תאילנדיים חיוניים למסע שלכם
          </p>
          <Link href="/lessons">
            <Button size="lg" className="text-lg px-8 py-6 bg-orange-500 hover:bg-orange-600">
              Start Learning / התחל ללמוד
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Why Learn Thai with Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🎧</div>
              <h3 className="text-xl font-bold mb-3">Native Audio</h3>
              <p className="text-gray-600">Learn authentic pronunciation from native Thai speakers</p>
              <p className="text-gray-600 mt-2" dir="rtl">למד הגייה אותנטית מדוברי תאילנדית שפת אם</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-3">Travel-Focused</h3>
              <p className="text-gray-600">Practical phrases for real travel situations</p>
              <p className="text-gray-600 mt-2" dir="rtl">ביטויים מעשיים למצבי נסיעה אמיתיים</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-3">Interactive</h3>
              <p className="text-gray-600">Engaging exercises and quizzes to test your knowledge</p>
              <p className="text-gray-600 mt-2" dir="rtl">תרגילים וחידונים מרתקים לבדיקת הידע שלך</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            10 Comprehensive Lessons
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { en: "Greetings & Introductions", he: "ברכות והיכרות" },
              { en: "Numbers & Time", he: "מספרים ושעות" },
              { en: "Ordering Food", he: "הזמנת אוכל" },
              { en: "Shopping & Bargaining", he: "קניות ומיקוח" },
              { en: "Transportation & Directions", he: "תחבורה וכיוונים" },
              { en: "Accommodation", he: "לינה" },
              { en: "Emergencies & Help", he: "מצבי חירום ועזרה" },
              { en: "Culture & Etiquette", he: "תרבות ונימוסים" },
              { en: "Practice Dialogues", he: "תרגול דיאלוגים" },
              { en: "Review & Survival Phrases", he: "סיכום וביטויי הישרדות" }
            ].map((lesson, index) => (
              <div key={index} className="flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{lesson.en}</p>
                  <p className="text-sm text-gray-600" dir="rtl">{lesson.he}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/lessons">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                View All Lessons / צפה בכל השיעורים
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2024 {APP_TITLE}. Made with ❤️ for travelers.</p>
          <p dir="rtl">נוצר באהבה למטיילים</p>
        </div>
      </footer>
    </div>
  );
}
