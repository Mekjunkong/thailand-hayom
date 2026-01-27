import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { APP_TITLE } from "@/const";
import { useState } from "react";
import { Mail, Calendar, MapPin, Utensils, TrendingUp, Lock, Check } from "lucide-react";

export default function Home() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Hero Section - Newsletter Focus */}
      <section 
        className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-beach.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-800/60 to-blue-900/70" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto py-20">
          <div className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-blue-500/90 to-teal-500/90 rounded-full text-sm font-semibold tracking-wide backdrop-blur-sm">
            🇮🇱 חדשות תאילנד בעברית 🇹🇭
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" dir="rtl" style={{fontFamily: 'Assistant, sans-serif'}}>
            תאילנד היום
          </h1>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight" style={{fontFamily: 'Playfair Display, serif'}}>
            Thailand Hayom
          </h2>
          
          <p className="text-xl md:text-2xl mb-4 font-light" dir="rtl" style={{fontFamily: 'Assistant, sans-serif'}}>
            חדשות, טיפים ומדריכים שבועיים למטיילים ישראלים בתאילנד
          </p>
          
          <p className="text-lg md:text-xl mb-12 font-light opacity-90">
            Weekly Hebrew newsletter with travel tips, visa updates, events, and local guides
          </p>

          {/* Newsletter Signup Form */}
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="הכנס את המייל שלך / Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-6 text-lg bg-white/95 backdrop-blur-sm border-2 border-white/50 focus:border-blue-400"
                required
              />
              <Button 
                type="submit"
                size="lg" 
                className="px-8 py-6 text-lg bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold whitespace-nowrap"
              >
                <Mail className="mr-2 h-5 w-5" />
                הרשם חינם
              </Button>
            </form>
            {subscribed && (
              <p className="mt-4 text-green-300 font-semibold animate-fade-in">
                ✓ נרשמת בהצלחה! / Successfully subscribed!
              </p>
            )}
            <p className="mt-4 text-sm opacity-75">
              הצטרף ל-5,000+ מטיילים ישראלים • Join 5,000+ Israeli travelers
            </p>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
              <span className="text-2xl">📰</span>
              <span className="font-medium">Weekly Newsletter</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
              <span className="text-2xl">🗺️</span>
              <span className="font-medium">Local Guides</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
              <span className="text-2xl">🎉</span>
              <span className="font-medium">Event Alerts</span>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900" dir="rtl">
            מה תקבל בניוזלטר?
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">What's included in the newsletter</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900" dir="rtl">חדשות ועדכונים</h3>
              <p className="text-gray-700 mb-2">Visa updates, entry requirements, safety alerts</p>
              <p className="text-gray-700" dir="rtl">עדכוני ויזה, כניסה למדינה, אזהרות בטיחות</p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900" dir="rtl">מדריכים מקומיים</h3>
              <p className="text-gray-700 mb-2">Where to go, what to see, vegan restaurants</p>
              <p className="text-gray-700" dir="rtl">לאן ללכת, מה לראות, מסעדות טבעוניות</p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900" dir="rtl">אירועים ופסטיבלים</h3>
              <p className="text-gray-700 mb-2">Concerts, festivals, special events</p>
              <p className="text-gray-700" dir="rtl">קונצרטים, פסטיבלים, אירועים מיוחדים</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Tiers */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900" dir="rtl">
            בחר את התוכנית שלך
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Choose your plan</p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold mb-2" dir="rtl">חינם</h3>
                <p className="text-gray-600">Free</p>
                <div className="text-5xl font-bold my-6 text-gray-900">₪0</div>
                <p className="text-gray-600">לחודש / per month</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span dir="rtl">ניוזלטר שבועי עם טיפים כלליים</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span dir="rtl">גישה לתוכן נצחי (מדריכי ויזה, בטיחות)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span dir="rtl">לוח אירועים בסיסי</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span dir="rtl">שיעורי תאילנדית חינם</span>
                </li>
              </ul>

              <Button className="w-full py-6 text-lg" variant="outline">
                התחל חינם / Start Free
              </Button>
            </div>

            {/* Premium Tier */}
            <div className="bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl shadow-2xl p-8 border-2 border-blue-400 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold">
                מומלץ / Popular
              </div>
              
              <div className="text-center mb-6 text-white">
                <h3 className="text-3xl font-bold mb-2" dir="rtl">פרימיום</h3>
                <p className="opacity-90">Premium</p>
                <div className="text-5xl font-bold my-6">₪49</div>
                <p className="opacity-90">לחודש / per month</p>
                <p className="text-sm opacity-75 mt-2">או ₪490/שנה (חסוך 2 חודשים)</p>
              </div>
              
              <ul className="space-y-4 mb-8 text-white">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                  <span dir="rtl" className="font-semibold">כל מה שיש בחינם +</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                  <span dir="rtl">התראות בזמן אמת על אירועים</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                  <span dir="rtl">הנחות בלעדיות במסעדות ומלונות</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                  <span dir="rtl">לוח אירועים מלא (מעודכן יומי)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                  <span dir="rtl">מדריכים מפורטים עם כתובות ומחירים</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                  <span dir="rtl">גישה למקומות נסתרים וטיפים פנימיים</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                  <span dir="rtl">הזמנות VIP לאירועים ומפגשים</span>
                </li>
              </ul>

              <Button className="w-full py-6 text-lg bg-white text-blue-600 hover:bg-gray-100 font-bold">
                שדרג לפרימיום / Upgrade to Premium
              </Button>
            </div>
          </div>

          {/* À La Carte Mention */}
          <div className="text-center mt-12">
            <p className="text-gray-600 text-lg mb-4" dir="rtl">
              מעדיפים לקנות מדריכים בודדים? ₪15-29 למדריך
            </p>
            <Link href="/guides">
              <Button variant="outline" size="lg">
                צפה במדריכים / View Guides
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Local Guides Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900" dir="rtl">
            מדריכים מקומיים
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Local Guides for Chiang Mai & Thailand</p>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Link href="/guides/vegan-restaurants">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="text-4xl mb-3">🥗</div>
                <h3 className="font-bold text-lg mb-2" dir="rtl">מסעדות טבעוניות</h3>
                <p className="text-sm text-gray-600">Vegan Restaurants</p>
              </div>
            </Link>

            <Link href="/guides/where-to-go">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="text-4xl mb-3">🏛️</div>
                <h3 className="font-bold text-lg mb-2" dir="rtl">לאן ללכת</h3>
                <p className="text-sm text-gray-600">Where to Go</p>
              </div>
            </Link>

            <Link href="/guides/what-to-see">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="text-4xl mb-3">👀</div>
                <h3 className="font-bold text-lg mb-2" dir="rtl">מה לראות</h3>
                <p className="text-sm text-gray-600">What to See</p>
              </div>
            </Link>

            <Link href="/guides/food-scene">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="text-4xl mb-3">🍜</div>
                <h3 className="font-bold text-lg mb-2" dir="rtl">אוכל</h3>
                <p className="text-sm text-gray-600">Food Scene</p>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link href="/guides">
              <Button size="lg" className="px-8 py-6 text-lg">
                צפה בכל המדריכים / View All Guides
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Thai Lessons CTA */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl mb-6">🎓</div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900" dir="rtl">
              רוצה ללמוד תאילנדית?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Learn Thai before you fly with our free interactive lessons
            </p>
            <Link href="/interactive-lessons">
              <Button size="lg" className="px-10 py-6 text-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                התחל ללמוד חינם / Start Learning Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" dir="rtl">
            מוכנים להצטרף?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 5,000+ Israeli travelers getting weekly updates
          </p>
          
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="המייל שלך / Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-6 text-lg text-gray-900"
                required
              />
              <Button 
                type="submit"
                size="lg" 
                className="px-8 py-6 text-lg bg-white text-blue-600 hover:bg-gray-100 font-bold"
              >
                הרשם עכשיו
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
