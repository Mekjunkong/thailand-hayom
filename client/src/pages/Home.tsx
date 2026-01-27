import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useState, lazy, Suspense, useEffect, useRef } from "react";
import { Mail, Check, Crown, Sparkles } from "lucide-react";
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

  // Parallax effect
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Language Toggle */}
      <LanguageToggle />

      {/* Hero Section - Clear Sea View with Parallax */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div 
          ref={heroRef}
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: "url('/images/hero-beach.png')", willChange: 'transform' }}
        />
        {/* Subtle gradient for text readability without blocking view */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white/40" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto py-20">
          {/* Elegant badge */}
          <div className="inline-block mb-8 px-8 py-3 bg-white/95 backdrop-blur-md rounded-full shadow-lg">
            <p className="text-gray-800 font-semibold text-sm tracking-wide">
              {t({ he: "🇮🇱 חדשות תאילנד בעברית 🇹🇭", en: "🇮🇱 Thailand News in Hebrew 🇹🇭" })}
            </p>
          </div>
          
          {/* Main heading with elegant typography */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight text-white drop-shadow-2xl" style={{fontFamily: language === 'he' ? 'Assistant, sans-serif' : 'Playfair Display, serif', textShadow: '0 4px 20px rgba(0,0,0,0.3)'}}>
            {t({ he: "תאילנד היום", en: "Thailand Hayom" })}
          </h1>
          
          <p className="text-xl md:text-3xl mb-12 font-light text-white drop-shadow-lg" style={{fontFamily: language === 'he' ? 'Assistant, sans-serif' : 'Poppins, sans-serif', textShadow: '0 2px 10px rgba(0,0,0,0.3)'}}>
            {t({ 
              he: "חדשות, טיפים ומדריכים שבועיים למטיילים ישראלים",
              en: "Weekly news, tips & guides for Israeli travelers"
            })}
          </p>

          {/* Newsletter Signup - Elegant white card */}
          <div className="max-w-xl mx-auto">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t({ he: "הצטרף לניוזלטר החינמי", en: "Join Free Newsletter" })}
              </h3>
              <p className="text-gray-600 mb-6">
                {t({ he: "קבל עדכונים שבועיים ישירות למייל", en: "Get weekly updates directly to your inbox" })}
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder={t({ he: "הכנס את המייל שלך", en: "Enter your email" })}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-6 text-lg border-2 border-gray-200 focus:border-blue-400 rounded-xl"
                  required
                />
                <Button 
                  type="submit"
                  size="lg" 
                  disabled={subscribeMutation.isPending}
                  className="px-8 py-6 text-lg bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold whitespace-nowrap rounded-xl"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  {subscribeMutation.isPending ? t({ he: "שולח...", en: "Sending..." }) : t({ he: "הרשם חינם", en: "Subscribe Free" })}
                </Button>
              </form>
              {subscribed && (
                <p className="mt-4 text-green-600 font-semibold animate-fade-in flex items-center justify-center gap-2">
                  <Check className="h-5 w-5" />
                  {t({ he: "נרשמת בהצלחה!", en: "Successfully subscribed!" })}
                </p>
              )}
              <p className="mt-4 text-sm text-gray-500">
                {t({ he: "הצטרף ל-5,000+ מטיילים ישראלים", en: "Join 5,000+ Israeli travelers" })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              {t({ he: "מה תקבל בניוזלטר?", en: "What's in the Newsletter?" })}
            </h2>
            <p className="text-xl text-gray-600">
              {t({ he: "תוכן שבועי מותאם למטיילים ישראלים", en: "Weekly content for Israeli travelers" })}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Suspense fallback={<div className="h-72 bg-gray-100 animate-pulse rounded-3xl" />}>
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">
                  {t({ he: "חדשות ועדכונים", en: "News & Updates" })}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {t({ 
                    he: "עדכוני ויזה, כניסה למדינה, אזהרות בטיחות ועוד",
                    en: "Visa updates, entry requirements, safety alerts & more"
                  })}
                </p>
              </div>
            </Suspense>

            <Suspense fallback={<div className="h-72 bg-gray-100 animate-pulse rounded-3xl" />}>
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">
                  {t({ he: "מדריכים מקומיים", en: "Local Guides" })}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {t({ 
                    he: "לאן ללכת, מה לראות, מסעדות טבעוניות ועוד",
                    en: "Where to go, what to see, vegan restaurants & more"
                  })}
                </p>
              </div>
            </Suspense>

            <Suspense fallback={<div className="h-72 bg-gray-100 animate-pulse rounded-3xl" />}>
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Calendar className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">
                  {t({ he: "אירועים ופסטיבלים", en: "Events & Festivals" })}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {t({ 
                    he: "קונצרטים, פסטיבלים, אירועים מיוחדים ועוד",
                    en: "Concerts, festivals, special events & more"
                  })}
                </p>
              </div>
            </Suspense>
          </div>
        </div>
      </section>

      {/* Local Guides Preview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              {t({ he: "מדריכים מקומיים", en: "Local Guides" })}
            </h2>
            <p className="text-xl text-gray-600">
              {t({ he: "גלה את הטוב ביותר בצ'אנג מאי ותאילנד", en: "Discover the best of Chiang Mai & Thailand" })}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Link href="/guides/vegan-restaurants">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-green-100">
                <div className="text-5xl mb-4 text-center">🥗</div>
                <h3 className="font-bold text-xl mb-3 text-center text-gray-900">{t({ he: "מסעדות טבעוניות", en: "Vegan Restaurants" })}</h3>
                <p className="text-sm text-gray-600 text-center">{t({ he: "המקומות הטובים ביותר", en: "Best plant-based dining" })}</p>
              </div>
            </Link>

            <Link href="/guides/where-to-go">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-blue-100">
                <div className="text-5xl mb-4 text-center">🏛️</div>
                <h3 className="font-bold text-xl mb-3 text-center text-gray-900">{t({ he: "לאן ללכת", en: "Where to Go" })}</h3>
                <p className="text-sm text-gray-600 text-center">{t({ he: "מקדשים ואטרקציות", en: "Temples & attractions" })}</p>
              </div>
            </Link>

            <Link href="/guides/what-to-see">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-purple-100">
                <div className="text-5xl mb-4 text-center">👀</div>
                <h3 className="font-bold text-xl mb-3 text-center text-gray-900">{t({ he: "מה לראות", en: "What to See" })}</h3>
                <p className="text-sm text-gray-600 text-center">{t({ he: "נקודות תצפית ושווקים", en: "Viewpoints & markets" })}</p>
              </div>
            </Link>

            <Link href="/guides/food-scene">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-orange-100">
                <div className="text-5xl mb-4 text-center">🍜</div>
                <h3 className="font-bold text-xl mb-3 text-center text-gray-900">{t({ he: "אוכל", en: "Food Scene" })}</h3>
                <p className="text-sm text-gray-600 text-center">{t({ he: "מסעדות ואוכל רחוב", en: "Restaurants & street food" })}</p>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link href="/guides">
              <Button size="lg" className="px-10 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                {t({ he: "צפה בכל המדריכים", en: "View All Guides" })}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Thai Lessons CTA */}
      <section className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-7xl mb-8">🎓</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {t({ he: "רוצה ללמוד תאילנדית?", en: "Want to Learn Thai?" })}
            </h2>
            <p className="text-xl text-gray-700 mb-10 leading-relaxed">
              {t({ 
                he: "שיעורים אינטראקטיביים חינם ללמידת תאילנדית לפני הטיסה",
                en: "Free interactive lessons to learn Thai before you fly"
              })}
            </p>
            <Link href="/interactive-lessons">
              <Button size="lg" className="px-12 py-7 text-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-xl hover:shadow-2xl transition-all rounded-xl">
                {t({ he: "התחל ללמוד חינם", en: "Start Learning Free" })}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Subscription Tiers Comparison - Bottom Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              {t({ he: "בחר את התוכנית המתאימה לך", en: "Choose Your Plan" })}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t({ he: "תוכניות גמישות לכל סוג מטייל - מחדשות בסיסיות ועד גישה בלעדית", en: "Flexible plans for every traveler - from basic news to exclusive access" })}
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Free Tier */}
              <div className="bg-white rounded-3xl shadow-xl p-10 border-2 border-gray-200 hover:border-gray-300 transition-all duration-300">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-4">
                    <Mail className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-3xl font-bold mb-3 text-gray-900">{t({ he: "חינם", en: "Free" })}</h3>
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-6xl font-bold text-gray-900">₪0</span>
                    <span className="text-xl text-gray-500">{t({ he: "/חודש", en: "/month" })}</span>
                  </div>
                  <p className="text-gray-600">{t({ he: "מושלם למטיילים מזדמנים", en: "Perfect for casual travelers" })}</p>
                </div>
                
                <ul className="space-y-5 mb-10">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 leading-relaxed">{t({ he: "ניוזלטר שבועי עם טיפים כלליים", en: "Weekly newsletter with general tips" })}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 leading-relaxed">{t({ he: "גישה לתוכן נצחי ומאמרים", en: "Access to evergreen content & articles" })}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 leading-relaxed">{t({ he: "לוח אירועים בסיסי", en: "Basic event calendar" })}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 leading-relaxed">{t({ he: "שיעורי תאילנדית חינם", en: "Free Thai language lessons" })}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 leading-relaxed">{t({ he: "מדריכים מקומיים בסיסיים", en: "Basic local guides" })}</span>
                  </li>
                </ul>

                <Button className="w-full py-7 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all" variant="outline" size="lg">
                  {t({ he: "כבר רשום? התחבר", en: "Already Subscribed? Login" })}
                </Button>
              </div>

              {/* Premium Tier */}
              <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-teal-500 rounded-3xl shadow-2xl p-10 relative overflow-hidden transform hover:scale-105 transition-all duration-300">
                {/* Popular badge */}
                <div className="absolute top-6 right-6 bg-yellow-400 text-yellow-900 px-5 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  {t({ he: "מומלץ", en: "Popular" })}
                </div>
                
                <div className="text-center mb-8 text-white">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-3">{t({ he: "פרימיום", en: "Premium" })}</h3>
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-6xl font-bold">₪49</span>
                    <span className="text-xl opacity-90">{t({ he: "/חודש", en: "/month" })}</span>
                  </div>
                  <p className="opacity-90">{t({ he: "או ₪490/שנה (חסוך 2 חודשים)", en: "or ₪490/year (save 2 months)" })}</p>
                  <p className="mt-3 text-white/90 font-medium">{t({ he: "למטיילים רציניים ותושבי קבע", en: "For serious travelers & expats" })}</p>
                </div>
                
                <ul className="space-y-5 mb-10 text-white">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-yellow-900" />
                    </div>
                    <span className="font-semibold leading-relaxed">{t({ he: "כל מה שיש בחינם +", en: "Everything in Free +" })}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-white/30 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="leading-relaxed">{t({ he: "התראות בזמן אמת על אירועים חמים", en: "Real-time alerts for hot events" })}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-white/30 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="leading-relaxed">{t({ he: "הנחות בלעדיות במסעדות ומלונות", en: "Exclusive discounts at restaurants & hotels" })}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-white/30 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="leading-relaxed">{t({ he: "לוח אירועים מלא (מעודכן יומי)", en: "Full event calendar (updated daily)" })}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-white/30 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="leading-relaxed">{t({ he: "מדריכים מפורטים עם כתובות ומחירים", en: "Detailed guides with addresses & prices" })}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-white/30 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="leading-relaxed">{t({ he: "גישה למקומות נסתרים וטיפים פנימיים", en: "Access to hidden gems & insider tips" })}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-white/30 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="leading-relaxed">{t({ he: "הזמנות VIP לאירועים בלעדיים", en: "VIP invitations to exclusive events" })}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-white/30 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="leading-relaxed">{t({ he: "תמיכה עדיפות במייל", en: "Priority email support" })}</span>
                  </li>
                </ul>

                <Button className="w-full py-7 text-lg bg-white text-blue-600 hover:bg-gray-50 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all">
                  {t({ he: "שדרג לפרימיום", en: "Upgrade to Premium" })}
                </Button>
              </div>
            </div>

            {/* À La Carte Mention */}
            <div className="text-center mt-16 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-10 border border-purple-100">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t({ he: "מעדיפים לקנות מדריכים בודדים?", en: "Prefer Individual Guides?" })}
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                {t({ he: "קנה מדריכים ספציפיים לפי צורך - ₪15-29 למדריך", en: "Buy specific guides as needed - ₪15-29 per guide" })}
              </p>
              <Link href="/guides">
                <Button variant="outline" size="lg" className="px-10 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                  {t({ he: "צפה במדריכים זמינים", en: "View Available Guides" })}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
