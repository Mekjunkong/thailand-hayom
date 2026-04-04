import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Check,
  Crown,
  Sparkles,
  MapPin,
  Shield,
  BookOpen,
  Star,
  ChevronRight,
  Users,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Link } from "wouter";
import QuickActionGrid from "@/components/QuickActionGrid";
import ContentFeed from "@/components/ContentFeed";

export default function Home() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const { data: user } = trpc.auth.me.useQuery();
  const { data: subStatus } = trpc.stripe.getSubscriptionStatus.useQuery(
    undefined,
    { enabled: !!user },
  );
  const isPremium = subStatus?.tier === "premium";

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: data => {
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

  const subscriptionCheckout = trpc.stripe.createSubscriptionCheckout.useMutation({
    onSuccess: data => {
      if (data.url) window.location.href = data.url;
    },
    onError: error => {
      if (error.message.includes("UNAUTHORIZED")) {
        toast.error(t({ he: "יש להתחבר כדי להירשם", en: "Please log in to subscribe" }));
      } else {
        toast.error(t({ he: "שגיאה", en: "Error creating subscription" }));
      }
    },
  });

  const checkoutMutation = trpc.stripe.createCheckoutSession.useMutation({
    onSuccess: data => {
      if (data.url) window.location.href = data.url;
    },
    onError: () => {
      toast.error(t({ he: "שגיאה בתשלום", en: "Checkout error" }));
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    subscribeMutation.mutate({ email });
  };

  const isRTL = language === "he";

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 pt-16">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "url('/images/hero-beach.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative container mx-auto px-4 py-16 md:py-24 text-center">
          {/* Thai flag emoji badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-amber-200 text-amber-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6 shadow-sm">
            <span>🇹🇭</span>
            <span>{t({ he: "המדריך מספר 1 לישראלים בתאילנד", en: "#1 Guide for Israelis in Thailand" })}</span>
          </div>

          {/* Main headline — Hebrew RTL */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight" dir="rtl">
            כל מה שצריך לדעת על תאילנד
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-3" dir="rtl">
            מדריך שלם לישראלים — ויזה, בטיחות, תרבות ועוד
          </p>
          <p className="text-base text-gray-500 mb-10">
            {t({ he: "Everything you need to know before landing in Thailand", en: "Everything you need to know before landing in Thailand" })}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link href="/welcome-kit">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg px-10 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                🎁 {t({ he: "קנה את חבילת התייר החכם ₪20", en: "Get Smart Tourist Pack ₪20" })}
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline"
                className="border-2 border-amber-400 text-amber-700 hover:bg-amber-50 text-lg px-8 py-6 rounded-2xl">
                {t({ he: "גלה עוד", en: "Learn More" })} ↓
              </Button>
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-amber-500" />
              <span>{t({ he: "5,000+ ישראלים מנויים", en: "5,000+ Israeli subscribers" })}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-amber-500" />
              <span>{t({ he: "מדורג 4.9 כוכבים", en: "Rated 4.9 stars" })}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-amber-500" />
              <span>{t({ he: "תשלום מאובטח", en: "Secure payment" })}</span>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 10C1200 50 960 0 720 20C480 40 240 0 0 10L0 40Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Value Propositions ── */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3" dir="rtl">
              למה תאילנד היום?
            </h2>
            <p className="text-gray-500 text-lg">{t({ he: "הכל במקום אחד, בעברית", en: "Everything in one place, in Hebrew" })}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Shield className="h-8 w-8 text-amber-500" />,
                titleHe: "נסיעה בטוחה",
                titleEn: "Travel Safely",
                descHe: "מידע על בטיחות, חירום ואנשי קשר שחייבים להכיר",
                descEn: "Safety info, emergency contacts, and what to know",
              },
              {
                icon: <MapPin className="h-8 w-8 text-amber-500" />,
                titleHe: "ניווט קל",
                titleEn: "Navigate Easily",
                descHe: "תחבורה, מקומות לאכול, ויזה — הכל בעברית",
                descEn: "Transport, food, visa — all in Hebrew",
              },
              {
                icon: <BookOpen className="h-8 w-8 text-amber-500" />,
                titleHe: "למד תאי",
                titleEn: "Learn Thai",
                descHe: "שיעורים אינטראקטיביים להישרדות בתאילנד",
                descEn: "Interactive lessons for survival Thai",
              },
            ].map((item, i) => (
              <div key={i} className="bg-amber-50 rounded-2xl p-8 text-center hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm mb-5">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1" dir="rtl">{item.titleHe}</h3>
                <p className="text-sm text-gray-500 mb-3">{item.titleEn}</p>
                <p className="text-gray-700 text-sm leading-relaxed" dir="rtl">{item.descHe}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Product: Smart Tourist Pack ── */}
      <section className="py-16 bg-gradient-to-br from-amber-500 to-orange-500">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-400 to-yellow-400 px-8 py-6 text-center">
              <span className="inline-block bg-white text-amber-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                {t({ he: "המוצר המומלץ שלנו", en: "Our Best Product" })}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-1" dir="rtl">
                חבילת התייר החכם 🇹🇭
              </h2>
              <p className="text-white/90 text-lg">Smart Tourist Pack</p>
            </div>

            <div className="px-8 py-8">
              {/* Price */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="text-center">
                  <span className="text-5xl font-bold text-gray-900">₪20</span>
                  <p className="text-sm text-gray-500 mt-1">{t({ he: "תשלום חד פעמי", en: "One-time payment" })}</p>
                </div>
                <div className="text-gray-300 text-2xl">/</div>
                <div className="text-center text-gray-500">
                  <span className="text-2xl">~$5.50</span>
                  <p className="text-sm mt-1">USD</p>
                </div>
              </div>

              {/* Included items */}
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {[
                  { he: "מדריך ויזה מקיף 2025", en: "Complete Visa Guide 2025" },
                  { he: "ביטויים חיוניים בתאי", en: "Essential Thai Phrases" },
                  { he: "מפות ואזורים מומלצים", en: "Maps & Recommended Areas" },
                  { he: "מספרי חירום חשובים", en: "Emergency Numbers" },
                  { he: "מדריך אוכל ומסעדות", en: "Food & Restaurant Guide" },
                  { he: "טיפים לחיסכון בכסף", en: "Money-Saving Tips" },
                  { he: "תרבות ומנהגים", en: "Culture & Customs" },
                  { he: "עדכונים שנתיים", en: "Yearly Updates" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-900" dir="rtl">{item.he}</span>
                      <span className="text-xs text-gray-400 ml-2">{item.en}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/welcome-kit">
                <Button
                  size="lg"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xl py-7 rounded-2xl shadow-lg transition-all"
                >
                  🎁 {t({ he: "קנה עכשיו ₪20", en: "Buy Now ₪20" })} →
                </Button>
              </Link>
              <p className="text-center text-xs text-gray-400 mt-3">
                {t({ he: "הורדה מיידית • תשלום מאובטח • ללא סיכון", en: "Instant download • Secure payment • Risk-free" })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-500 mb-1">5,000+</div>
              <div className="text-gray-600 font-medium" dir="rtl">ישראלים מנויים</div>
              <div className="text-gray-400 text-sm">Israeli subscribers</div>
            </div>
            <div className="hidden md:block h-12 w-px bg-gray-200" />
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-500 mb-1">150+</div>
              <div className="text-gray-600 font-medium" dir="rtl">מאמרים בעברית</div>
              <div className="text-gray-400 text-sm">Articles in Hebrew</div>
            </div>
            <div className="hidden md:block h-12 w-px bg-gray-200" />
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-500 mb-1">4.9★</div>
              <div className="text-gray-600 font-medium" dir="rtl">דירוג משתמשים</div>
              <div className="text-gray-400 text-sm">User rating</div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            {[
              {
                name: "דניאל כ.",
                text: "החבילה הזו חסכה לי המון כסף וצרות. הכל ברור ובעברית!",
                stars: 5,
              },
              {
                name: "מיכל ש.",
                text: "הכי טוב שעשיתי לפני הנסיעה לתאילנד. מומלץ בחום!",
                stars: 5,
              },
              {
                name: "רון א.",
                text: "המדריך לוויזה לבד שווה את הכסף. מידע עדכני ומדויק.",
                stars: 5,
              },
            ].map((review, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 text-right" dir="rtl">
                <div className="flex gap-0.5 justify-end mb-3">
                  {[...Array(review.stars)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">"{review.text}"</p>
                <p className="text-gray-500 text-xs font-medium">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Thai Language Lessons Teaser ── */}
      <section className="py-14 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-5xl mb-4">🗣️</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3" dir="rtl">
              תרגל תאי חינם
            </h2>
            <p className="text-gray-600 mb-2">{t({ he: "שיעורים אינטראקטיביים לישראלים", en: "Interactive lessons for Israelis" })}</p>
            <p className="text-gray-500 text-sm mb-8" dir="rtl">
              למד לבטא נכון, לקרוא תפריטים ולתקשר עם המקומיים
            </p>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
              {[
                { th: "สวัสดี", he: "שלום", roman: "Sawadee" },
                { th: "ขอบคุณ", he: "תודה", roman: "Khob khun" },
                { th: "เท่าไหร่", he: "כמה?", roman: "Tao rai" },
                { th: "ช่วยด้วย", he: "עזרה!", roman: "Chuay duay" },
                { th: "อร่อย", he: "טעים", roman: "Aroy" },
                { th: "ห้องน้ำ", he: "שירותים", roman: "Hong nam" },
              ].map((phrase, i) => (
                <div key={i} className="bg-white rounded-xl p-3 shadow-sm text-center">
                  <div className="text-lg font-semibold text-indigo-600" lang="th">{phrase.th}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{phrase.roman}</div>
                  <div className="text-xs text-gray-800 font-medium mt-1" dir="rtl">{phrase.he}</div>
                </div>
              ))}
            </div>

            <Link href="/interactive-lessons">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-5 rounded-2xl font-semibold">
                {t({ he: "התחל ללמוד חינם", en: "Start Learning Free" })}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Quick Actions (existing component) ── */}
      <section className="pt-8">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center" dir="rtl">
            {t({ he: "מה תרצה לעשות?", en: "What would you like to do?" })}
          </h2>
        </div>
        <QuickActionGrid />
      </section>

      {/* ── Content Feed (existing component) ── */}
      <ContentFeed />

      {/* ── Newsletter CTA ── */}
      <section className="py-12 px-4">
        <div className="max-w-lg mx-auto bg-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-1 text-center" dir="rtl">
            {t({ he: "הישאר מעודכן", en: "Stay Updated" })}
          </h3>
          <p className="text-gray-400 text-xs text-center mb-4" dir="rtl">
            {t({ he: "חדשות, טיפים ועדכוני ויזה ישירות למייל", en: "News, tips, and visa updates direct to your inbox" })}
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <Input
              type="email"
              placeholder={t({ he: "המייל שלך", en: "Your email" })}
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 px-3 py-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-xl text-sm"
              required
            />
            <Button
              type="submit"
              size="sm"
              disabled={subscribeMutation.isPending}
              className="px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm"
            >
              {subscribeMutation.isPending ? "..." : <Mail className="h-4 w-4" />}
            </Button>
          </form>
          {subscribed && (
            <p className="text-green-400 text-xs mt-2 text-center flex items-center justify-center gap-1">
              <Check className="h-3 w-3" />
              {t({ he: "נרשמת!", en: "Subscribed!" })}
            </p>
          )}
          <p className="text-[10px] text-gray-500 text-center mt-2">
            {t({ he: "הצטרף ל-5,000+ מנויים", en: "Join 5,000+ subscribers" })}
          </p>
        </div>
      </section>

      {/* ── Premium Upsell Banner ── */}
      {!isPremium && (
        <section className="px-4 pb-12">
          <div className="max-w-lg mx-auto">
            <button
              onClick={() => subscriptionCheckout.mutate({ plan: "MONTHLY" })}
              disabled={subscriptionCheckout.isPending}
              className="w-full flex items-center justify-between bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl px-5 py-4 hover:opacity-95 transition-opacity"
            >
              <div className="flex items-center gap-3">
                <Crown className="h-5 w-5 text-white" />
                <div className="text-start">
                  <p className="text-sm font-semibold text-white" dir="rtl">
                    {t({ he: "שדרג לפרימיום", en: "Unlock Premium" })}
                  </p>
                  <p className="text-xs text-white/80" dir="rtl">
                    {t({ he: "₪29/חודש — 150+ מאמרים בלעדיים", en: "₪29/month — 150+ exclusive articles" })}
                  </p>
                </div>
              </div>
              <Sparkles className="h-5 w-5 text-white" />
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
