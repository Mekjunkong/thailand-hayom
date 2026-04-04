import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { welcomeKitModules } from "@/data/welcomeKit";
import {
  Check, ShieldCheck, Download, Clock, Star,
  ChevronDown, ChevronUp, FileText,
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQ_ITEMS = [
  {
    q: { he: "מה מקבלים בחבילה?", en: "What's included in the pack?" },
    a: {
      he: "החבילה כוללת 8 פרקים מלאים: ויזה, כשרות, SIM, בנקאות, בטיחות, תחבורה, קהילה ישראלית, ומילון שרידות — הכל בעברית ובאנגלית.",
      en: "The pack includes 8 full sections: visa, kosher, SIM cards, banking, safety, transportation, Israeli community, and survival Thai — all in Hebrew and English.",
    },
  },
  {
    q: { he: "איך מקבלים את החבילה?", en: "How do I receive the pack?" },
    a: {
      he: "לאחר התשלום תקבל הורדה מיידית למייל שלך. הגישה היא לכל החיים.",
      en: "After payment you get an instant download link to your email. Access is lifetime.",
    },
  },
  {
    q: { he: "האם יש החזר כספי?", en: "Is there a refund?" },
    a: {
      he: "כן! אם אינך מרוצה בתוך 7 ימים נחזיר לך את הכסף במלואו, ללא שאלות.",
      en: "Yes! If you're not satisfied within 7 days we give a full refund, no questions asked.",
    },
  },
  {
    q: { he: "האם המידע מעודכן?", en: "Is the information up to date?" },
    a: {
      he: "כן, אנחנו מעדכנים את החבילה מדי שנה ולקוחות קיימים מקבלים עדכונים בחינם.",
      en: "Yes, we update the pack annually and existing customers get free updates.",
    },
  },
  {
    q: { he: "האם אפשר לשלם בכרטיס אשראי ישראלי?", en: "Can I pay with an Israeli credit card?" },
    a: {
      he: "כן! אנחנו מקבלים כל כרטיס אשראי ישראלי. המחיר הוא ₪20 כולל מע\"מ.",
      en: "Yes! We accept all Israeli credit cards. The price is ₪20 inclusive of VAT.",
    },
  },
];

// What each section covers — shown on the product page
const SECTION_PREVIEWS = [
  {
    id: 1,
    icon: "📋",
    he: "ויזה ועניינים משפטיים",
    en: "Visa & Legal",
    bullets: [
      { he: "30 יום ללא ויזה לישראלים — איך להאריך", en: "30-day visa-free for Israelis — how to extend" },
      { he: "הארכת ויזה בצ'יאנג מאי: כתובת, שעות, מסמכים", en: "Chiang Mai extension: address, hours, documents" },
      { he: "שגרירות ישראל בבנגקוק + קו חירום 24/7", en: "Israeli Embassy Bangkok + 24/7 emergency line" },
      { he: "קנסות על חריגה ומה לעשות במקרה חירום", en: "Overstay fines and emergency procedures" },
    ],
  },
  {
    id: 2,
    icon: "✡️",
    he: "כשרות בתאילנד",
    en: "Kosher in Thailand",
    bullets: [
      { he: "בתי חב\"ד בכל עיר: כתובות, טלפונים", en: "Chabad houses in every city: addresses, phones" },
      { he: "מסעדות כשרות: בנגקוק, צ'יאנג מאי, פוקט, קוה סמוי", en: "Kosher restaurants: Bangkok, Chiang Mai, Phuket, Koh Samui" },
      { he: "מה בטוח לאכול + איך לבקש ללא חזיר", en: "Safe food list + how to ask for no pork in Thai" },
      { he: "סופרמרקטים עם מוצרים כשרים", en: "Supermarkets with kosher products" },
    ],
  },
  {
    id: 3,
    icon: "📱",
    he: "תקשורת ואינטרנט",
    en: "SIM Cards & Internet",
    bullets: [
      { he: "השוואה: AIS vs DTAC vs True — מחירים ל-2025", en: "Comparison: AIS vs DTAC vs True — 2025 prices" },
      { he: "היכן לקנות בנמל התעופה צ'יאנג מאי", en: "Where to buy at Chiang Mai airport" },
      { he: "איך להתקשר לישראל: 00-972-XX-XXXXXXX", en: "How to call Israel: 00-972-XX-XXXXXXX" },
      { he: "WhatsApp, Telegram — עובד! ללא VPN", en: "WhatsApp, Telegram — works! No VPN needed" },
    ],
  },
  {
    id: 4,
    icon: "💰",
    he: "בנקאות וכסף",
    en: "Banking & Money",
    bullets: [
      { he: "שערי חליפין: איפה הכי כדאי להחליף כסף", en: "Exchange rates: best places to change money" },
      { he: "עמלות כספומט: 220 בהט — אסטרטגיית משיכה", en: "ATM fees: 220 THB — smart withdrawal strategy" },
      { he: "Wise / Revolut — חיסכון של 200–300 ₪", en: "Wise / Revolut — save 200-300 ILS" },
      { he: "טבלת מחירים: כמה עולה כל דבר בתאילנד", en: "Price guide: how much everything costs in Thailand" },
    ],
  },
  {
    id: 5,
    icon: "🏥",
    he: "בטיחות ובריאות",
    en: "Safety & Health",
    bullets: [
      { he: "מספרי חירום: 191, 1669, 1155, שגרירות", en: "Emergency numbers: 191, 1669, 1155, embassy" },
      { he: "בתי חולים דוברי אנגלית בצ'יאנג מאי ובנגקוק", en: "English-speaking hospitals in Chiang Mai & Bangkok" },
      { he: "ביטוח נסיעות — מה חייב לכסות, ספקים ישראלים", en: "Travel insurance — what's required, Israeli providers" },
      { he: "הונאות נפוצות: ג'ט סקי, אבני חן, מונה שבור", en: "Common scams: jet ski, gems, broken meter" },
    ],
  },
  {
    id: 6,
    icon: "🚕",
    he: "תחבורה",
    en: "Transportation",
    bullets: [
      { he: "Grab — האובר של תאילנד: איך להשתמש", en: "Grab — Thailand's Uber: how to use" },
      { he: "סונגתאו (משאיות אדומות) — מחירים ומסלולים", en: "Songthaew (red trucks) — prices and routes" },
      { he: "שדה תעופה צ'יאנג מאי לעיר: כל האפשרויות", en: "Chiang Mai airport to city: all options" },
      { he: "בס, רכבת, טיסה — צ'יאנג מאי לבנגקוק", en: "Bus, train, flight — Chiang Mai to Bangkok" },
    ],
  },
  {
    id: 7,
    icon: "🇮🇱",
    he: "ישראלים בתאילנד",
    en: "Israeli Community",
    bullets: [
      { he: "קבוצות פייסבוק שחייבים להצטרף לפני הנסיעה", en: "Facebook groups to join before you go" },
      { he: "מקומות ישראלים בצ'יאנג מאי, בנגקוק, פוקט", en: "Israeli spots in Chiang Mai, Bangkok, Phuket" },
      { he: "שעות שבת מדויקות לצ'יאנג מאי 2025", en: "Exact Shabbat times for Chiang Mai 2025" },
      { he: "כפר פאי — המקום הכי ישראלי בתאילנד", en: "Pai village — the most Israeli place in Thailand" },
    ],
  },
  {
    id: 8,
    icon: "🗣️",
    he: "מילון שרידות תאי",
    en: "Survival Thai Phrases",
    bullets: [
      { he: "20 ביטויים חיוניים עם הגייה בעברית", en: "20 essential phrases with Hebrew pronunciation" },
      { he: "מספרים 1–10 בתאי", en: "Numbers 1-10 in Thai" },
      { he: "ביטויים לאוכל: ללא חריף, ללא חזיר, צמחוני", en: "Food phrases: no spicy, no pork, vegetarian" },
      { he: "ניווט: פנה שמאלה, ישר, עצור כאן", en: "Navigation: turn left, straight, stop here" },
    ],
  },
];

export default function WelcomeKit() {
  const { t, language } = useLanguage();
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const createCheckout = trpc.stripe.createCheckoutSession.useMutation();
  const isRTL = language === "he";

  const handlePurchase = async () => {
    try {
      toast.info(t({ he: "מעביר לדף תשלום מאובטח...", en: "Redirecting to secure checkout..." }));
      const result = await createCheckout.mutateAsync({ productType: "single" });
      if (result.url) window.location.href = result.url;
    } catch {
      toast.error(t({ he: "שגיאה. נסה דרך WhatsApp.", en: "Failed. Please try via WhatsApp." }));
    }
  };

  const expandedModule = expandedSection
    ? welcomeKitModules.find(m => m.id === expandedSection)
    : null;

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>

      {/* ── Hero Header ── */}
      <header className="bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 text-white pt-20 pb-12">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Star className="h-4 w-4 fill-white" />
            <span dir="rtl">{t({ he: "הנמכר ביותר ← מעל 5,000 ישראלים", en: "Best Seller ← 5,000+ Israelis" })}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-3" dir="rtl">
            חבילת התייר החכם 🇹🇭
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-2">Smart Tourist Pack — Israel's #1 Thailand Guide</p>
          <p className="text-lg text-white/80 mb-8" dir="rtl">
            8 פרקים מלאים • ויזה • כשרות • בטיחות • תחבורה • קהילה • ועוד
          </p>

          {/* Price display */}
          <div className="inline-flex items-center gap-6 bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-5 mb-8">
            <div className="text-center">
              <div className="text-5xl font-bold">₪20</div>
              <div className="text-sm text-white/80 mt-1" dir="rtl">תשלום חד פעמי</div>
            </div>
            <div className="text-white/40 text-2xl">=</div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-white/90">~$5.50</div>
              <div className="text-sm text-white/60 mt-1">USD</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-xl px-12 py-8 bg-white text-amber-600 hover:bg-gray-50 shadow-2xl rounded-2xl font-bold"
              onClick={handlePurchase}
              disabled={createCheckout.isPending}
            >
              💳 {createCheckout.isPending
                ? t({ he: "מעבד...", en: "Processing..." })
                : t({ he: "קנה עכשיו — ₪20", en: "Buy Now — ₪20" })}
            </Button>
            <a href="https://wa.me/66929894495?text=Hi!%20I%20want%20the%20Smart%20Tourist%20Pack%20(%E2%82%AA20)"
              target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="text-xl px-12 py-8 bg-green-500 text-white hover:bg-green-600 shadow-2xl rounded-2xl font-bold">
                💬 {t({ he: "רכוש דרך WhatsApp", en: "Purchase via WhatsApp" })}
              </Button>
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-white/80">
            <span className="flex items-center gap-1.5"><Download className="h-4 w-4" /> {t({ he: "הורדה מיידית", en: "Instant download" })}</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" /> {t({ he: "תשלום מאובטח", en: "Secure payment" })}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {t({ he: "גישה לכל החיים", en: "Lifetime access" })}</span>
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4" /> {t({ he: "החזר כסף 7 ימים", en: "7-day refund" })}</span>
            <span className="flex items-center gap-1.5"><FileText className="h-4 w-4" /> {t({ he: "PDF להורדה", en: "PDF download" })}</span>
          </div>
        </div>
      </header>

      {/* ── 8 Sections Overview — the main sales block ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3" dir="rtl">
              מה כלול? 8 פרקים מלאים
            </h2>
            <p className="text-gray-500 text-lg">What's inside — 8 complete sections</p>
            <p className="text-gray-400 text-sm mt-2" dir="rtl">
              לחצו על כל פרק לפירוט המלא
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-3">
            {SECTION_PREVIEWS.map(sec => (
              <div key={sec.id}
                className={`border rounded-2xl overflow-hidden transition-all ${expandedSection === sec.id ? "border-amber-400 shadow-lg" : "border-gray-200 hover:border-amber-300"}`}>
                {/* Header row */}
                <button
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-amber-50 transition-colors"
                  onClick={() => setExpandedSection(expandedSection === sec.id ? null : sec.id)}
                >
                  <span className="text-2xl flex-shrink-0">{sec.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-bold text-gray-900 text-base" dir="rtl">{sec.he}</span>
                      <span className="text-gray-400 text-sm">{sec.en}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-gray-400">
                    {expandedSection === sec.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>
                </button>

                {/* Expanded bullet list */}
                {expandedSection === sec.id && (
                  <div className="px-5 pb-5 bg-amber-50 border-t border-amber-100">
                    <div className="grid sm:grid-cols-2 gap-2 mt-3">
                      {sec.bullets.map((b, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-sm font-medium text-gray-900" dir="rtl">{b.he}</span>
                            <span className="text-xs text-gray-400 block">{b.en}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Preview of actual content */}
                    {expandedModule && expandedModule.id === sec.id && (
                      <div className="mt-4 space-y-3">
                        <div className="bg-white rounded-xl p-4 border border-amber-200">
                          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">English Preview</p>
                          <pre className="text-xs text-gray-700 whitespace-pre-wrap font-sans leading-relaxed max-h-48 overflow-y-auto">
                            {expandedModule.content.substring(0, 600)}...
                          </pre>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-amber-200" dir="rtl">
                          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">תצוגה מקדימה בעברית</p>
                          <pre className="text-xs text-gray-700 whitespace-pre-wrap font-sans leading-relaxed max-h-48 overflow-y-auto">
                            {expandedModule.contentHebrew.substring(0, 600)}...
                          </pre>
                        </div>
                      </div>
                    )}

                    <button
                      className="mt-3 text-xs text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
                      onClick={() =>
                        setExpandedSection(
                          expandedModule?.id === sec.id
                            ? sec.id  // keep section open, toggle content
                            : sec.id
                        )
                      }
                    >
                      {t({ he: "← קנה לצפייה מלאה", en: "← Buy for full content" })}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mid-page CTA ── */}
      <section className="py-10 bg-gradient-to-r from-amber-500 to-yellow-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4" dir="rtl">
            מוכן? קנה את החבילה עכשיו ב-₪20
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg"
              className="px-10 py-6 bg-white text-amber-600 hover:bg-gray-50 rounded-2xl font-bold text-lg shadow-xl"
              onClick={handlePurchase} disabled={createCheckout.isPending}>
              💳 {t({ he: "קנה עכשיו ₪20", en: "Buy Now ₪20" })}
            </Button>
          </div>
        </div>
      </section>

      {/* ── Module Cards (existing data) ── */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8" dir="rtl">
            תצוגה מקדימה — לחצו לפרטים
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {welcomeKitModules.map(mod => (
              <Card key={mod.id}
                className="hover:shadow-lg transition-all cursor-pointer border hover:border-amber-300"
                onClick={() => setExpandedSection(expandedSection === mod.id ? null : mod.id)}
              >
                <CardHeader className="pb-2">
                  <div className="text-4xl mb-2 text-center">{mod.icon}</div>
                  <CardTitle className="text-sm text-center">{mod.title}</CardTitle>
                  <CardDescription className="text-center text-xs" dir="rtl">{mod.titleHebrew}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-500 text-center">{mod.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Expanded content preview */}
          {expandedModule && (
            <div className="mt-8 max-w-4xl mx-auto">
              <Card className="border-2 border-amber-300 shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{expandedModule.icon}</span>
                      <div>
                        <CardTitle className="text-xl">{expandedModule.title}</CardTitle>
                        <CardDescription className="text-base mt-1" dir="rtl">{expandedModule.titleHebrew}</CardDescription>
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => setExpandedSection(null)}>
                      {t({ he: "סגור", en: "Close" })}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white p-5 rounded-xl border">
                    <h3 className="text-sm font-bold mb-2 text-amber-700">English</h3>
                    <pre className="whitespace-pre-wrap text-xs text-gray-700 font-sans leading-relaxed">{expandedModule.content}</pre>
                  </div>
                  <div className="bg-amber-50 p-5 rounded-xl border border-amber-100" dir="rtl">
                    <h3 className="text-sm font-bold mb-2 text-amber-700">עברית</h3>
                    <pre className="whitespace-pre-wrap text-xs text-gray-700 font-sans leading-relaxed">{expandedModule.contentHebrew}</pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* ── Why you need this ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10" dir="rtl">
            למה תצטרך את זה?
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: "💸", he: "חסכו כסף", en: "Save Money", desc: "Avoid scams, bad exchange rates, and tourist traps" },
              { icon: "🛡️", he: "הישארו בטוחים", en: "Stay Safe", desc: "Know emergency numbers, hospitals, and insurance" },
              { icon: "🧭", he: "נווטו בקלות", en: "Navigate Easily", desc: "Transport, Grab app, tuk-tuks, and getting around" },
              { icon: "🙏", he: "כבדו את התרבות", en: "Respect Culture", desc: "Temple etiquette, customs, and avoiding mistakes" },
              { icon: "✡️", he: "אוכלו בנוח", en: "Eat Comfortably", desc: "Find kosher, halal-friendly, and vegetarian options" },
              { icon: "📱", he: "הישארו מחוברים", en: "Stay Connected", desc: "SIM cards, calling Israel, and no VPN hassle" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="text-3xl flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900" dir="rtl">{item.he}</h3>
                  <p className="text-sm text-gray-500 mb-1">{item.en}</p>
                  <p className="text-gray-700 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10" dir="rtl">
            שאלות נפוצות
          </h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="border border-gray-200 bg-white rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-gray-900 text-sm" dir="rtl">{t(item.q)}</span>
                  {openFaq === i
                    ? <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    : <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 bg-amber-50 border-t border-amber-100">
                    <p className="text-gray-700 text-sm leading-relaxed mt-3" dir="rtl">{t(item.a)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-yellow-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-5xl mb-6">🇹🇭</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" dir="rtl">
            מוכן לנסיעה המושלמת לתאילנד?
          </h2>
          <p className="text-white/90 text-lg mb-2">Ready for the perfect Thailand trip?</p>
          <p className="text-white/80 mb-8 text-sm" dir="rtl">
            8 פרקים מלאים • ₪20 בלבד • הורדה מיידית • גישה לכל החיים
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg"
              className="text-xl px-12 py-8 bg-white text-amber-600 hover:bg-gray-50 shadow-2xl rounded-2xl font-bold"
              onClick={handlePurchase} disabled={createCheckout.isPending}>
              💳 {t({ he: "קנה עכשיו — ₪20", en: "Buy Now — ₪20" })}
            </Button>
            <a href="https://wa.me/66929894495?text=Hi!%20I%20want%20the%20Smart%20Tourist%20Pack%20(%E2%82%AA20)"
              target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="text-xl px-12 py-8 bg-green-500 text-white hover:bg-green-600 shadow-2xl rounded-2xl font-bold">
                💬 WhatsApp
              </Button>
            </a>
            <Link href="/">
              <Button size="lg" variant="outline"
                className="text-xl px-12 py-8 bg-transparent border-2 border-white text-white hover:bg-white/20 rounded-2xl font-semibold">
                🏠 {t({ he: "עמוד הבית", en: "Home" })}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
