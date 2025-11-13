import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { APP_TITLE } from "@/const";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto py-20">
          <div className="inline-block mb-6 px-6 py-2 bg-orange-500/90 rounded-full text-sm font-semibold tracking-wide">
            🇹🇭 FOR ISRAELI TRAVELERS
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in leading-tight">
            Learn Thai,<br/>Travel Confidently
          </h1>
          <p className="text-xl md:text-3xl mb-4 font-light">
            Master Essential Thai Phrases for Your Journey
          </p>
          <p className="text-lg md:text-2xl mb-12 font-light" dir="rtl">
            שלטו בביטויים תאילנדיים חיוניים למסע שלכם
          </p>
          <Link href="/lessons">
            <Button size="lg" className="text-xl px-12 py-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105">
              🎓 Start Learning Now
            </Button>
          </Link>
          <div className="mt-12 flex justify-center gap-8 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>10 Lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>Native Audio</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>100% Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white via-orange-50/30 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-4 text-gray-900">
            Why Learn Thai with Us?
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Everything you need for your Thai adventure</p>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-orange-100">
              <div className="text-6xl mb-6">🎧</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Native Audio</h3>
              <p className="text-gray-600">Learn authentic pronunciation from native Thai speakers</p>
              <p className="text-gray-600 mt-2" dir="rtl">למד הגייה אותנטית מדוברי תאילנדית שפת אם</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-orange-100">
              <div className="text-6xl mb-6">🌍</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Travel-Focused</h3>
              <p className="text-gray-600">Practical phrases for real travel situations</p>
              <p className="text-gray-600 mt-2" dir="rtl">ביטויים מעשיים למצבי נסיעה אמיתיים</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-orange-100">
              <div className="text-6xl mb-6">✨</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Interactive</h3>
              <p className="text-gray-600">Engaging exercises and quizzes to test your knowledge</p>
              <p className="text-gray-600 mt-2" dir="rtl">תרגילים וחידונים מרתקים לבדיקת הידע שלך</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-4 text-gray-900">
            10 Comprehensive Lessons
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">From greetings to emergencies - everything you need</p>
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
              <div key={index} className="flex items-center p-5 bg-white rounded-xl hover:bg-orange-50 transition-all duration-300 hover:shadow-lg border border-gray-100 hover:border-orange-200">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-5 shadow-md">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{lesson.en}</p>
                  <p className="text-sm text-gray-600" dir="rtl">{lesson.he}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link href="/lessons">
              <Button size="lg" className="text-lg px-10 py-7 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                📚 View All Lessons / צפה בכל השיעורים
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2024 {APP_TITLE}. Made with ❤️ for travelers.</p>
          <p dir="rtl">נוצר באהבה למטיילים</p>
        </div>
      </footer>
    </div>
  );
}
