import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useState, lazy, Suspense } from "react";
import { Mail, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// Lazy load heavy components for better performance
const TrendingUp = lazy(() => import("lucide-react").then(mod => ({ default: mod.TrendingUp })));
const MapPin = lazy(() => import("lucide-react").then(mod => ({ default: mod.MapPin })));
const Calendar = lazy(() => import("lucide-react").then(mod => ({ default: mod.Calendar })));

export default function Home() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();
  const { language, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setSubscribed(true);
        setEmail("");
        toast.success(t({ he: "נרשמת בהצלחה!", en: "Successfully subscribed!" }));
        setTimeout(() => setSubscribed(false), 3000);
      } else {
        toast.info(t({ he: "כבר רשום", en: "Already subscribed" }));
      }
    },
    onError: (error) => {
      toast.error(t({ he: "שגיאה בהרשמה", en: "Subscription failed" }));
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    subscribeMutation.mutate({ email });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Language Toggle */}
      <LanguageToggle />

      {/* Hero Section - Newsletter Focus */}
      <section 
        className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-beach.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-800/60 to-blue-900/70" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto py-20">
          <div className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-blue-500/90 to-teal-500/90 rounded-full text-sm font-semibold tracking-wide backdrop-blur-sm">
            {t({ he: "🇮🇱 חדשות תאילנד בעברית 🇹🇭", en: "🇮🇱 Thailand News in Hebrew 🇹🇭" })}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{fontFamily: language === 'he' ? 'Assistant, sans-serif' : 'Playfair Display, serif'}}>
            {t({ he: "תאילנד היום", en: "Thailand Hayom" })}
          </h1>
          
          <p className="text-xl md:text-2xl mb-4 font-light" style={{fontFamily: language === 'he' ? 'Assistant, sans-serif' : 'Poppins, sans-serif'}}>
            {t({ 
              he: "חדשות, טיפים ומדריכים שבועיים למטיילים ישראלים בתאילנד",
              en: "Weekly Hebrew newsletter with travel tips, visa updates, events, and local guides"
            })}
          </p>

          {/* Newsletter Signup Form */}
          <div className="max-w-md mx-auto mt-12">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder={t({ he: "הכנס את המייל שלך", en: "Enter your email" })}
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
                {t({ he: "הרשם חינם", en: "Subscribe Free" })}
              </Button>
            </form>
            {subscribed && (
              <p className="mt-4 text-green-300 font-semibold animate-fade-in">
                {t({ he: "✓ נרשמת בהצלחה!", en: "✓ Successfully subscribed!" })}
              </p>
            )}
            <p className="mt-4 text-sm opacity-75">
              {t({ he: "הצטרף ל-5,000+ מטיילים ישראלים", en: "Join 5,000+ Israeli travelers" })}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
              <span className="text-2xl">📰</span>
              <span className="font-medium">{t({ he: "ניוזלטר שבועי", en: "Weekly Newsletter" })}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
              <span className="text-2xl">🗺️</span>
              <span className="font-medium">{t({ he: "מדריכים מקומיים", en: "Local Guides" })}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
              <span className="text-2xl">🎉</span>
              <span className="font-medium">{t({ he: "התראות אירועים", en: "Event Alerts" })}</span>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t({ he: "מה תקבל בניוזלטר?", en: "What's Included in the Newsletter?" })}
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            {t({ he: "תוכן שבועי מותאם למטיילים ישראלים", en: "Weekly content tailored for Israeli travelers" })}
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-2xl" />}>
              <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {t({ he: "חדשות ועדכונים", en: "News & Updates" })}
                </h3>
                <p className="text-gray-700">
                  {t({ 
                    he: "עדכוני ויזה, כניסה למדינה, אזהרות בטיחות",
                    en: "Visa updates, entry requirements, safety alerts"
                  })}
                </p>
              </div>
            </Suspense>

            <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-2xl" />}>
              <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {t({ he: "מדריכים מקומיים", en: "Local Guides" })}
                </h3>
                <p className="text-gray-700">
                  {t({ 
                    he: "לאן ללכת, מה לראות, מסעדות טבעוניות",
                    en: "Where to go, what to see, vegan restaurants"
                  })}
                </p>
              </div>
            </Suspense>

            <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-2xl" />}>
              <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {t({ he: "אירועים ופסטיבלים", en: "Events & Festivals" })}
                </h3>
                <p className="text-gray-700">
                  {t({ 
                    he: "קונצרטים, פסטיבלים, אירועים מיוחדים",
                    en: "Concerts, festivals, special events"
                  })}
                </p>
              </div>
            </Suspense>
          </div>
        </div>
      </section>

      {/* Subscription Tiers */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t({ he: "בחר את התוכנית שלך", en: "Choose Your Plan" })}
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            {t({ he: "תוכניות גמישות לכל סוג מטייל", en: "Flexible plans for every traveler" })}
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold mb-2">{t({ he: "חינם", en: "Free" })}</h3>
                <div className="text-5xl font-bold my-6 text-gray-900">₪0</div>
                <p className="text-gray-600">{t({ he: "לחודש", en: "per month" })}</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>{t({ he: "ניוזלטר שבועי עם טיפים כלליים", en: "Weekly newsletter with general tips" })}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>{t({ he: "גישה לתוכן נצחי", en: "Access to evergreen content" })}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>{t({ he: "לוח אירועים בסיסי", en: "Basic event calendar" })}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>{t({ he: "שיעורי תאילנדית חינם", en: "Free Thai lessons" })}</span>
                </li>
              </ul>

              <Button className="w-full py-6 text-lg" variant="outline">
                {t({ he: "התחל חינם", en: "Start Free" })}
              </Button>
            </div>

            {/* Premium Tier */}
            <div className="bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl shadow-2xl p-8 border-2 border-blue-400 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold">
                {t({ he: "מומלץ", en: "Popular" })}
              </div>
              
              <div className="text-center mb-6 text-white">
                <h3 className="text-3xl font-bold mb-2">{t({ he: "פרימיום", en: "Premium" })}</h3>
                <div className="text-5xl font-bold my-6">₪49</div>
                <p className="opacity-90">{t({ he: "לחודש", en: "per month" })}</p>
                <p className="text-sm opacity-75 mt-2">
                  {t({ he: "או ₪490/שנה (חסוך 2 חודשים)", en: "or ₪490/year (save 2 months)" })}
                </p>
              </div>
              
              <ul className="space-y-4 mb-8 text-white">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                  <span className="font-semibold">{t({ he: "כל מה שיש בחינם +", en: "Everything in Free +" })}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                  <span>{t({ he: "התראות בזמן אמת על אירועים", en: "Real-time event alerts" })}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                  <span>{t({ he: "הנחות בלעדיות במסעדות ומלונות", en: "Exclusive discounts at restaurants & hotels" })}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                  <span>{t({ he: "לוח אירועים מלא (מעודכן יומי)", en: "Full event calendar (updated daily)" })}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                  <span>{t({ he: "מדריכים מפורטים עם כתובות ומחירים", en: "Detailed guides with addresses & prices" })}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                  <span>{t({ he: "גישה למקומות נסתרים", en: "Access to hidden gems" })}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                  <span>{t({ he: "הזמנות VIP לאירועים", en: "VIP event invitations" })}</span>
                </li>
              </ul>

              <Button className="w-full py-6 text-lg bg-white text-blue-600 hover:bg-gray-100 font-bold">
                {t({ he: "שדרג לפרימיום", en: "Upgrade to Premium" })}
              </Button>
            </div>
          </div>

          {/* À La Carte Mention */}
          <div className="text-center mt-12">
            <p className="text-gray-600 text-lg mb-4">
              {t({ he: "מעדיפים לקנות מדריכים בודדים? ₪15-29 למדריך", en: "Prefer individual guides? ₪15-29 per guide" })}
            </p>
            <Link href="/guides">
              <Button variant="outline" size="lg">
                {t({ he: "צפה במדריכים", en: "View Guides" })}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Local Guides Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            {t({ he: "מדריכים מקומיים", en: "Local Guides" })}
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            {t({ he: "גלה את הטוב ביותר בצ'אנג מאי ותאילנד", en: "Discover the best of Chiang Mai & Thailand" })}
          </p>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Link href="/guides/vegan-restaurants">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="text-4xl mb-3">🥗</div>
                <h3 className="font-bold text-lg mb-2">{t({ he: "מסעדות טבעוניות", en: "Vegan Restaurants" })}</h3>
                <p className="text-sm text-gray-600">{t({ he: "המקומות הטובים ביותר", en: "Best plant-based dining" })}</p>
              </div>
            </Link>

            <Link href="/guides/where-to-go">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="text-4xl mb-3">🏛️</div>
                <h3 className="font-bold text-lg mb-2">{t({ he: "לאן ללכת", en: "Where to Go" })}</h3>
                <p className="text-sm text-gray-600">{t({ he: "מקדשים ואטרקציות", en: "Temples & attractions" })}</p>
              </div>
            </Link>

            <Link href="/guides/what-to-see">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="text-4xl mb-3">👀</div>
                <h3 className="font-bold text-lg mb-2">{t({ he: "מה לראות", en: "What to See" })}</h3>
                <p className="text-sm text-gray-600">{t({ he: "נקודות תצפית ושווקים", en: "Viewpoints & markets" })}</p>
              </div>
            </Link>

            <Link href="/guides/food-scene">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="text-4xl mb-3">🍜</div>
                <h3 className="font-bold text-lg mb-2">{t({ he: "אוכל", en: "Food Scene" })}</h3>
                <p className="text-sm text-gray-600">{t({ he: "מסעדות ואוכל רחוב", en: "Restaurants & street food" })}</p>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link href="/guides">
              <Button size="lg" className="px-8 py-6 text-lg">
                {t({ he: "צפה בכל המדריכים", en: "View All Guides" })}
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
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              {t({ he: "רוצה ללמוד תאילנדית?", en: "Want to Learn Thai?" })}
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              {t({ 
                he: "שיעורים אינטראקטיביים חינם ללמידת תאילנדית",
                en: "Free interactive lessons to learn Thai before you fly"
              })}
            </p>
            <Link href="/interactive-lessons">
              <Button size="lg" className="px-10 py-6 text-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                {t({ he: "התחל ללמוד חינם", en: "Start Learning Free" })}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t({ he: "מוכנים להצטרף?", en: "Ready to Join?" })}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t({ he: "הצטרף ל-5,000+ מטיילים ישראלים", en: "Join 5,000+ Israeli travelers getting weekly updates" })}
          </p>
          
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder={t({ he: "המייל שלך", en: "Your email" })}
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
                {t({ he: "הרשם עכשיו", en: "Subscribe Now" })}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
