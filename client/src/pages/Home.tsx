import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { APP_TITLE } from "@/const";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-beach.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto py-20">
          <div className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-amber-500/90 to-yellow-500/90 rounded-full text-sm font-semibold tracking-wide backdrop-blur-sm">
            🌴 FOR ISRAELI TRAVELERS 🌴
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in leading-tight" style={{fontFamily: 'Playfair Display, serif'}}>
            Learn Thai<br/>Before You Fly
          </h1>
          <p className="text-xl md:text-3xl mb-4 font-light" style={{fontFamily: 'Poppins, sans-serif'}}>
            Simple lessons for Israeli travelers to Thailand
          </p>
          <p className="text-lg md:text-2xl mb-12 font-light hebrew-text" dir="rtl">
            שיעורים פשוטים למטיילים ישראלים לתאילנד
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/lessons">
              <Button size="lg" className="text-base md:text-xl px-8 md:px-12 py-6 md:py-8 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 shadow-2xl hover:shadow-amber-500/50 transition-all duration-500 hover:scale-105 rounded-full font-semibold">
                🎓 Start Learning Free
              </Button>
            </Link>
            <Link href="/welcome-kit">
              <Button size="lg" className="text-base md:text-xl px-8 md:px-12 py-6 md:py-8 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-2xl hover:shadow-green-500/50 transition-all duration-500 hover:scale-105 rounded-full font-semibold">
                ✈️ Welcome Kit (1,000 THB)
              </Button>
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
              <span className="text-2xl">✓</span>
              <span className="font-medium">10 Lessons</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
              <span className="text-2xl">🎧</span>
              <span className="font-medium">Native Audio</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
              <span className="text-2xl">📱</span>
              <span className="font-medium">Mobile Friendly</span>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/emergency">
              <Button variant="outline" size="lg" className="bg-red-500 hover:bg-red-600 text-white border-0 shadow-lg">
                🆘 Emergency Contacts
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" size="lg" className="bg-purple-500 hover:bg-purple-600 text-white border-0 shadow-lg">
                📝 Travel Blog
              </Button>
            </Link>
            <Link href="/progress">
              <Button variant="outline" size="lg" className="bg-blue-500 hover:bg-blue-600 text-white border-0 shadow-lg">
                📈 My Progress
              </Button>
            </Link>
            <Link href="/downloads">
              <Button variant="outline" size="lg" className="bg-indigo-500 hover:bg-indigo-600 text-white border-0 shadow-lg">
                📥 Downloads
              </Button>
            </Link>
            <Link href="/pronunciation">
              <Button variant="outline" size="lg" className="bg-pink-500 hover:bg-pink-600 text-white border-0 shadow-lg">
                🗣️ Pronunciation
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" size="lg" className="bg-teal-500 hover:bg-teal-600 text-white border-0 shadow-lg">
                👤 My Profile
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white via-orange-50/30 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Why Learn Thai with Us?
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Everything you need for your Thai adventure</p>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-amber-100">
              <div className="text-5xl md:text-6xl mb-6">🎧</div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">Native Audio</h3>
              <p className="text-gray-600">Learn authentic pronunciation from native Thai speakers</p>
              <p className="text-gray-600 mt-2 hebrew-text" dir="rtl">למד הגייה אותנטית מדוברי תאילנדית שפת אם</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-amber-100">
              <div className="text-5xl md:text-6xl mb-6">🌍</div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">Travel-Focused</h3>
              <p className="text-gray-600">Practical phrases for real travel situations</p>
              <p className="text-gray-600 mt-2 hebrew-text" dir="rtl">ביטויים מעשיים למצבי נסיעה אמיתיים</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-amber-100">
              <div className="text-5xl md:text-6xl mb-6">✨</div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">Interactive</h3>
              <p className="text-gray-600">Engaging exercises and quizzes to test your knowledge</p>
              <p className="text-gray-600 mt-2 hebrew-text" dir="rtl">תרגילים וחידונים מרתקים לבדיקת הידע שלך</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-gray-900">
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
              <div key={index} className="flex items-center p-5 bg-white rounded-xl hover:bg-amber-50 transition-all duration-300 hover:shadow-lg border border-gray-100 hover:border-amber-200">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-5 shadow-md">
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
              <Button size="lg" className="text-base md:text-lg px-6 md:px-10 py-5 md:py-7 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-full font-semibold">
                📚 View All Lessons / צפה בכל השיעורים
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cultural Tips Section */}
      <section className="py-24 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Thai Cultural Tips
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Essential etiquette for your Thailand journey</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-5xl mb-4">🙏</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">The Wai Greeting</h3>
              <p className="text-gray-600 leading-relaxed">Press your palms together at chest level and bow slightly. The higher your hands, the more respect you show. Always return a wai when greeted.</p>
              <p className="text-gray-800 mt-4 hebrew-text font-semibold text-lg" dir="rtl">לחץ את כפות הידיים יחד וקוד קל - ידיים גבוהות יותר = יותר כבוד</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-5xl mb-4">👟</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Remove Your Shoes</h3>
              <p className="text-gray-600 leading-relaxed">Always remove shoes before entering homes, temples, and some shops. Look for shoes at the entrance as a sign. This shows respect for sacred and clean spaces.</p>
              <p className="text-gray-800 mt-4 hebrew-text font-semibold text-lg" dir="rtl">הסר נעליים לפני כניסה לבתים ומקדשים - זה מראה כבוד</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-5xl mb-4">👑</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Respect the Head</h3>
              <p className="text-gray-600 leading-relaxed">Never touch someone's head - it's considered the most sacred part of the body. Don't point your feet at people or Buddha images, as feet are seen as the lowest.</p>
              <p className="text-gray-800 mt-4 hebrew-text font-semibold text-lg" dir="rtl">אל תיגע בראש - זה חלק הגוף הקדוש ביותר</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-5xl mb-4">👗</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Dress Modestly</h3>
              <p className="text-gray-600 leading-relaxed">Cover shoulders and knees when visiting temples. Wear respectful clothing in religious sites. Beachwear is only for the beach!</p>
              <p className="text-gray-800 mt-4 hebrew-text font-semibold text-lg" dir="rtl">כסה כתפיים וברכיים במקדשים</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-5xl mb-4">🤫</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Keep Noise Down at Night</h3>
              <p className="text-gray-600 leading-relaxed">Thai culture values peace and quiet, especially at night. Avoid yelling, talking loudly, or making excessive noise after 10 PM. Be respectful in hotels, guesthouses, and residential areas. Thais appreciate considerate behavior.</p>
              <p className="text-gray-800 mt-4 hebrew-text font-semibold text-lg" dir="rtl">אל תצעק או תדבר בקול רם בלילה - תרבות תאילנדית מעריכה שקט</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-5xl mb-4">👑</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Respect the Royal Family</h3>
              <p className="text-gray-600 leading-relaxed">The Thai Royal Family is deeply revered. Never speak negatively about them. Stand respectfully during the national anthem played in public places.</p>
              <p className="text-gray-800 mt-4 hebrew-text font-semibold text-lg" dir="rtl">המשפחה המלכותית מוערכת מאוד - הראה כבוד</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-5xl mb-4">🏍️</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Motorbike & Parking Rules</h3>
              <p className="text-gray-600 leading-relaxed">To rent a motorbike, you MUST have an International Driving Permit (IDP) along with your regular license. Never park in the middle of the road or block traffic. Look for designated parking areas. Police actively check for proper licenses and can fine you heavily.</p>
              <p className="text-gray-800 mt-4 hebrew-text font-semibold text-lg" dir="rtl">להשכרת אופנוע דרוש רישיון נהיגה בינלאומי - אל תחנה באמצע הדרך</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-5xl mb-4">😊</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Smile & Stay Calm</h3>
              <p className="text-gray-600 leading-relaxed">Thailand is the "Land of Smiles." A friendly smile opens doors and diffuses tension. Never lose your temper or raise your voice in public - it's seen as losing face. Stay patient and polite, even when frustrated.</p>
              <p className="text-gray-800 mt-4 hebrew-text font-semibold text-lg" dir="rtl">חיוך ושמירה על רוגע - אל תאבד עשתונות בפומבי</p>
            </div>
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
