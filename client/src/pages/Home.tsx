import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";
import { Mail, Check, Crown, Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import ThailandMap from "@/components/ThailandMap";
import ScrollReveal from "@/components/ScrollReveal";
import ContentCarousel from "@/components/ContentCarousel";
import ThaiTextAnimation from "@/components/ThaiTextAnimation";

export default function Home() {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Newsletter subscribe mutation
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
    onError: () => {
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
        heroRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* ============================================================
          Section 1: Hero (~70vh)
          ============================================================ */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Parallax background image */}
        <div
          ref={heroRef}
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage: "url('/images/hero-beach.png')",
            willChange: "transform",
          }}
        />
        {/* Heavy bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto py-20">
          {/* Bold headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-white">
            {t({ he: "תאילנד היום", en: "Thailand Hayom" })}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-2xl mb-10 text-white/90">
            {t({
              he: "המדריך שלך לתאילנד — חדשות, שיעורים וטיפים מקומיים בעברית",
              en: "Your guide to Thailand — news, lessons, and local tips in Hebrew",
            })}
          </p>

          {/* Two CTAs side-by-side */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/interactive-lessons">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-white text-gray-900 hover:bg-gray-100 font-semibold rounded-xl shadow-lg transition-all"
              >
                {t({ he: "התחל ללמוד תאילנדית", en: "Start Learning Thai" })}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/articles">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-white/60 text-white hover:bg-white/10 font-semibold rounded-xl transition-all"
              >
                {t({ he: "קרא מדריכים", en: "Read Guides" })}
              </Button>
            </Link>
          </div>

          {/* Compact inline stat pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-sm text-white border border-white/20">
              {t({ he: "30 שיעורים", en: "30 Lessons" })}
            </span>
            <span className="px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-sm text-white border border-white/20">
              {t({ he: "150+ מאמרים", en: "150+ Articles" })}
            </span>
            <span className="px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-sm text-white border border-white/20">
              {t({ he: "עדכונים שבועיים", en: "Weekly Updates" })}
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================
          Section 2: Content Carousel
          ============================================================ */}
      <ContentCarousel />

      {/* ============================================================
          Section 3: Interactive Thailand Map (dark bg)
          ============================================================ */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {t({ he: "חקור את תאילנד", en: "Explore Thailand" })}
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                {t({
                  he: "בחר עיר במפה כדי לגלות מדריכים, מאמרים ואירועים",
                  en: "Click on a city to discover guides, articles and events",
                })}
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <ThailandMap />
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          Section 4: Learn Thai CTA
          ============================================================ */}
      <section className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left: Thai Text Animation */}
            <ScrollReveal>
              <ThaiTextAnimation />
            </ScrollReveal>

            {/* Right: Copy + CTA */}
            <ScrollReveal delay={0.15}>
              <div
                className={language === "he" ? "text-right" : "text-left"}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  {t({
                    he: "למד תאילנדית לפני הטיסה",
                    en: "Learn Thai Before You Fly",
                  })}
                </h2>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  {t({
                    he: "30 שיעורים אינטראקטיביים שיכינו אותך לתקשורת בסיסית בתאילנדית. למד ביטויים חיוניים, הזמנת אוכל, מיקוח ועוד.",
                    en: "30 interactive lessons to prepare you for basic Thai communication. Learn essential phrases, ordering food, bargaining and more.",
                  })}
                </p>
                <Link href="/lesson/1">
                  <Button
                    size="lg"
                    className="px-10 py-6 text-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    {t({ he: "התחל שיעור 1", en: "Start Lesson 1" })}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================================================
          Section 5: Newsletter + Pricing (dark)
          ============================================================ */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          {/* --- Newsletter portion --- */}
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {t({ he: "הישאר מעודכן", en: "Stay Updated" })}
              </h2>
              <p className="text-lg text-gray-400 mb-8">
                {t({
                  he: "קבל חדשות, טיפים ומדריכים ישירות למייל שלך",
                  en: "Get news, tips, and guides delivered straight to your inbox",
                })}
              </p>

              {/* Inline email input + subscribe button */}
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-4"
              >
                <Input
                  type="email"
                  placeholder={t({
                    he: "הכנס את המייל שלך",
                    en: "Enter your email",
                  })}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 rounded-xl"
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={subscribeMutation.isPending}
                  className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  {subscribeMutation.isPending
                    ? t({ he: "שולח...", en: "Sending..." })
                    : t({ he: "הרשם", en: "Subscribe" })}
                </Button>
              </form>

              {/* Success message */}
              {subscribed && (
                <p className="text-green-400 font-semibold flex items-center justify-center gap-2 mb-4">
                  <Check className="h-5 w-5" />
                  {t({ he: "נרשמת בהצלחה!", en: "Successfully subscribed!" })}
                </p>
              )}

              {/* Social proof */}
              <p className="text-sm text-gray-500">
                {t({
                  he: "הצטרף ל-5,000+ מנויים",
                  en: "Join 5,000+ subscribers",
                })}
              </p>
            </div>
          </ScrollReveal>

          {/* --- Divider --- */}
          <div className="flex items-center gap-4 max-w-md mx-auto mb-16">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-sm text-gray-500">
              {t({ he: "— או שדרג —", en: "— or upgrade —" })}
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* --- Pricing cards --- */}
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {t({ he: "חינם", en: "Free" })}
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-white">₪0</span>
                  <span className="text-gray-400">
                    {t({ he: "/חודש", en: "/month" })}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    t({
                      he: "ניוזלטר שבועי עם טיפים כלליים",
                      en: "Weekly newsletter with general tips",
                    }),
                    t({
                      he: "גישה למאמרים ותוכן",
                      en: "Access to articles & content",
                    }),
                    t({
                      he: "לוח אירועים בסיסי",
                      en: "Basic event calendar",
                    }),
                    t({
                      he: "שיעורי תאילנדית חינם",
                      en: "Free Thai language lessons",
                    }),
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full py-5 text-base border-white/20 text-white hover:bg-white/10 rounded-xl"
                >
                  {t({ he: "התוכנית הנוכחית", en: "Current Plan" })}
                </Button>
              </div>

              {/* Premium card */}
              <div className="bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl p-8 relative overflow-hidden">
                {/* Popular badge */}
                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5" />
                  {t({ he: "מומלץ", en: "Popular" })}
                </div>

                <h3 className="text-2xl font-bold mb-2 text-white">
                  {t({ he: "פרימיום", en: "Premium" })}
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-white">₪49</span>
                  <span className="text-white/80">
                    {t({ he: "/חודש", en: "/month" })}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    t({
                      he: "כל מה שיש בחינם +",
                      en: "Everything in Free +",
                    }),
                    t({
                      he: "התראות בזמן אמת על אירועים",
                      en: "Real-time event alerts",
                    }),
                    t({
                      he: "הנחות בלעדיות במסעדות ומלונות",
                      en: "Exclusive restaurant & hotel discounts",
                    }),
                    t({
                      he: "מדריכים מפורטים עם כתובות ומחירים",
                      en: "Detailed guides with addresses & prices",
                    }),
                    t({
                      he: "גישה למקומות נסתרים וטיפים פנימיים",
                      en: "Hidden gems & insider tips",
                    }),
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          i === 0 ? "text-yellow-400" : "text-white"
                        }`}
                      />
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full py-5 text-base bg-white text-blue-600 hover:bg-gray-100 font-bold rounded-xl shadow-lg transition-all">
                  <Sparkles className="mr-2 h-5 w-5" />
                  {t({ he: "שדרג לפרימיום", en: "Upgrade to Premium" })}
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
