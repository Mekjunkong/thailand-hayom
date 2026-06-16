import { Link } from "wouter";
import {
  AlertTriangle,
  ArrowLeft,
  CalendarCheck,
  Check,
  Clock,
  Map,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageTitle } from "@/hooks/usePageTitle";
import { getPlanningWhatsAppHref, PLANNING_OFFER } from "@/data/planningOffer";

const C = {
  bg: "oklch(98% 0.018 88)",
  surface: "oklch(100% 0 0)",
  ink: "oklch(18% 0.018 255)",
  muted: "oklch(48% 0.02 255)",
  border: "oklch(88% 0.026 82)",
  orange: "oklch(67% 0.19 42)",
  orangeLight: "oklch(94% 0.06 48)",
  green: "oklch(55% 0.16 145)",
  greenLight: "oklch(94% 0.06 145)",
  amber: "oklch(86% 0.15 86)",
  dark: "oklch(16% 0.02 255)",
};

const INCLUDED = [
  {
    icon: Map,
    he: "מסלול שמתאים לזמן, לתקציב ולאופי שלכם",
    en: "A route that fits your time, budget, and travel style",
  },
  {
    icon: Wallet,
    he: "הערכת תקציב ריאלית — איפה לחסוך ואיפה לא",
    en: "Realistic budget guidance — where to save and where not to",
  },
  {
    icon: AlertTriangle,
    he: "טעויות והונאות שכדאי להכיר לפני הנחיתה",
    en: "Mistakes and scams to know before landing",
  },
  {
    icon: MessageCircle,
    he: "ביטויים בתאית שיעזרו במוניות, אוכל, מלון וחירום",
    en: "Thai phrases for taxis, food, hotels, and emergencies",
  },
  {
    icon: ShieldCheck,
    he: "סיכום קצר בוואטסאפ אחרי השיחה כדי שתדעו מה לעשות",
    en: "A short WhatsApp summary after the call so you know what to do",
  },
];

const PAINS = [
  {
    he: "לא יודעים אם לבחור צפון, איים, בנגקוק או שילוב",
    en: "You do not know whether to choose the north, islands, Bangkok, or a mix",
  },
  {
    he: "מפחדים לבזבז כסף על מסלול לא נכון",
    en: "You are worried about wasting money on the wrong route",
  },
  {
    he: "רוצים עצה אנושית ולא עוד רשימת המלצות כללית",
    en: "You want human advice, not another generic recommendation list",
  },
];

const FAQ = [
  {
    qHe: "זו סוכנות נסיעות?",
    qEn: "Is this a travel agency?",
    aHe: "לא. זו שיחת ייעוץ אישית עם הכוונה מעשית. אתם מחליטים מה להזמין ואיפה, ואני עוזר לעשות סדר ולהימנע מטעויות.",
    aEn: "No. This is a personal advice call with practical direction. You decide what and where to book; I help you make sense of the options and avoid mistakes.",
  },
  {
    qHe: "למי זה מתאים?",
    qEn: "Who is this for?",
    aHe: "לזוגות, משפחות, מטיילים לבד וכל ישראלי שמרגיש מבולבל לפני תאילנד ורוצה כיוון ברור בעברית.",
    aEn: "Couples, families, solo travelers, and any Israeli who feels confused before Thailand and wants clear Hebrew-friendly guidance.",
  },
  {
    qHe: "אפשר לקבל מסלול כתוב?",
    qEn: "Can I get a written itinerary?",
    aHe: `כן. אחרי השיחה אפשר להזמין מסלול מותאם בתשלום נפרד של ₪${PLANNING_OFFER.itineraryPriceRangeIls}, לפי מורכבות הטיול.`,
    aEn: `Yes. After the call you can order a custom itinerary separately for ₪${PLANNING_OFFER.itineraryPriceRangeIls}, depending on trip complexity.`,
  },
];

export default function PlanningCall() {
  const { language, t } = useLanguage();
  const he = language === "he";
  const dir = he ? "rtl" : "ltr";
  const whatsappHref = getPlanningWhatsAppHref(language);

  usePageTitle(
    he
      ? "שיחת תכנון טיול לתאילנד לישראלים | Thailand Hayom"
      : "Thailand Planning Call for Israelis | Thailand Hayom"
  );

  return (
    <main dir={dir} style={{ background: C.bg, color: C.ink }}>
      <section className="pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black"
              style={{ background: C.orangeLight, color: C.orange }}
            >
              <Sparkles className="h-4 w-4" />
              {t({
                he: "ההצעה המרכזית של תאילנד היום",
                en: "Thailand Hayom's main paid help offer",
              })}
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
              {t({
                he: "טסים לתאילנד? נעשה סדר במסלול — בלי בלבול, טעויות ושריפת כסף.",
                en: "Flying to Thailand? Get a clear plan — without confusion, mistakes, or wasted money.",
              })}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8" style={{ color: C.muted }}>
              {t({
                he: "שיחת ייעוץ אישית לישראלים לפני הטיול: לאן ללכת, כמה זמן בכל מקום, איך לחשוב על תקציב, מה לא לעשות, ואילו ביטויים בתאית באמת יעזרו לכם בשטח.",
                en: "A personal planning call for Israelis before the trip: where to go, how long to stay, how to think about budget, what not to do, and which Thai phrases actually help on the ground.",
              })}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="min-h-14 rounded-2xl px-7 text-base font-black text-white shadow-xl hover:opacity-90"
                style={{ background: C.green }}
              >
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  {t({
                    he: `קבעו שיחה ב-₪${PLANNING_OFFER.priceIls}`,
                    en: `Book a call — ₪${PLANNING_OFFER.priceIls}`,
                  })}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-h-14 rounded-2xl border-2 bg-white px-7 text-base font-black"
                style={{ borderColor: C.border, color: C.ink }}
              >
                <Link href="/free">
                  {t({ he: "קודם קבלו 50 ביטויים בחינם", en: "First get 50 free phrases" })}
                </Link>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold" style={{ color: C.muted }}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2">
                <Clock className="h-4 w-4" />
                {PLANNING_OFFER.callMinutes} {t({ he: "דקות", en: "minutes" })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2">
                <CalendarCheck className="h-4 w-4" />
                {t({ he: "סיכום בוואטסאפ", en: "WhatsApp summary" })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2">
                <ShieldCheck className="h-4 w-4" />
                {t({ he: "עברית פשוטה", en: "Simple Hebrew-friendly help" })}
              </span>
            </div>
          </div>

          <aside
            className="rounded-[2rem] border bg-white p-6 shadow-2xl md:p-8"
            style={{ borderColor: C.border }}
          >
            <p className="text-sm font-black" style={{ color: C.orange }}>
              {t({ he: "מה מקבלים בשיחה", en: "What you get on the call" })}
            </p>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-5xl font-black">₪{PLANNING_OFFER.priceIls}</span>
              <span className="pb-2 text-sm font-bold" style={{ color: C.muted }}>
                {t({ he: "תשלום לשיחת תכנון", en: "for a planning call" })}
              </span>
            </div>
            <ul className="mt-7 space-y-4">
              {INCLUDED.map(item => {
                const Icon = item.icon;
                return (
                  <li key={item.en} className="flex gap-3">
                    <span
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                      style={{ background: C.greenLight, color: C.green }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="pt-1 text-sm font-bold leading-6">
                      {he ? item.he : item.en}
                    </span>
                  </li>
                );
              })}
            </ul>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl text-base font-black text-white shadow-lg transition-transform hover:-translate-y-0.5"
              style={{ background: C.green }}
            >
              <MessageCircle className="h-5 w-5" />
              {t({ he: "שלחו לי וואטסאפ עכשיו", en: "Message me on WhatsApp" })}
            </a>
            <p className="mt-3 text-center text-xs leading-5" style={{ color: C.muted }}>
              {t({
                he: "בלי מנוי ובלי התחייבות. אם צריך מסלול כתוב — נציע אותו רק אחרי שנבין את הטיול.",
                en: "No subscription and no obligation. If you need a written itinerary, we offer it only after understanding the trip.",
              })}
            </p>
          </aside>
        </div>
      </section>

      <section className="py-12">
        <div className="container grid gap-5 md:grid-cols-3">
          {PAINS.map(item => (
            <div key={item.en} className="rounded-3xl border bg-white p-6" style={{ borderColor: C.border }}>
              <Check className="mb-4 h-6 w-6" style={{ color: C.green }} />
              <p className="text-lg font-black leading-7">{he ? item.he : item.en}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-black md:text-5xl">
              {t({ he: "זה לא עוד קורס. זה עזרה לקבל החלטות.", en: "This is not another course. It is help making decisions." })}
            </h2>
            <p className="mt-4 leading-8" style={{ color: C.muted }}>
              {t({
                he: "הקורס והביטויים עדיין חשובים, אבל רוב הכסף בתאילנד הולך לאיבוד בהחלטות: מסלול לא מתאים, יותר מדי מעברים, אזורים לא נכונים, או הזמנות בלי להבין את השטח.",
                en: "The course and phrases still matter, but most Thailand money is lost in decisions: the wrong route, too many transfers, unsuitable areas, or booking without understanding the ground reality.",
              })}
            </p>
          </div>
          <div className="rounded-[2rem] p-6 md:p-8" style={{ background: C.dark, color: "white" }}>
            <p className="text-sm font-black" style={{ color: C.amber }}>
              {t({ he: "אפשרות המשך אחרי השיחה", en: "Optional next step after the call" })}
            </p>
            <h3 className="mt-3 text-3xl font-black">
              {t({ he: "מסלול מותאם אישית", en: "Custom written itinerary" })}
            </h3>
            <p className="mt-3 leading-7 text-white/75">
              {t({
                he: `אם אחרי השיחה תרצו שאבנה לכם מסלול כתוב ומסודר — ימים, אזורים, מעברים, נקודות זהירות והמלצות — המחיר מתחיל סביב ₪${PLANNING_OFFER.itineraryPriceRangeIls}.`,
                en: `If after the call you want a clear written itinerary — days, areas, transfers, warnings, and recommendations — pricing starts around ₪${PLANNING_OFFER.itineraryPriceRangeIls}.`,
              })}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-8">
        <div className="container">
          <h2 className="text-3xl font-black md:text-4xl">
            {t({ he: "שאלות נפוצות", en: "FAQ" })}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {FAQ.map(item => (
              <article key={item.qEn} className="rounded-3xl border bg-white p-6" style={{ borderColor: C.border }}>
                <h3 className="text-lg font-black">{he ? item.qHe : item.qEn}</h3>
                <p className="mt-3 text-sm leading-7" style={{ color: C.muted }}>
                  {he ? item.aHe : item.aEn}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] p-7 text-center md:p-10" style={{ background: C.orangeLight }}>
            <h2 className="text-3xl font-black md:text-5xl">
              {t({ he: "רוצים שאעשה לכם סדר?", en: "Want me to make the trip clear?" })}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl leading-8" style={{ color: C.muted }}>
              {t({
                he: "שלחו וואטסאפ עכשיו. נתחיל מהמצב שלכם, התאריכים והחלום — ואז נקבע שיחת תכנון פשוטה.",
                en: "Send a WhatsApp now. We start with your situation, dates, and dream — then book a simple planning call.",
              })}
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl px-8 text-base font-black text-white shadow-lg transition-transform hover:-translate-y-0.5"
                style={{ background: C.green }}
              >
                <MessageCircle className="h-5 w-5" />
                {t({ he: "קבעו שיחת תכנון", en: "Book the planning call" })}
              </a>
              <Link
                href="/"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-white px-8 text-base font-black"
              >
                <ArrowLeft className="h-5 w-5" />
                {t({ he: "חזרה לאתר", en: "Back to site" })}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
