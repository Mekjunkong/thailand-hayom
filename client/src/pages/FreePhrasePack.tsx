import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Download, Headphones, ShieldCheck, Sparkles, Volume2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageTitle } from "@/hooks/usePageTitle";
import {
  buildPhrasePackText,
  leadMagnetPhrases,
  phraseCategoryLabels,
  type PhraseCategory,
} from "@/data/leadMagnet";

const C = {
  bg: "oklch(98% 0.016 88)",
  surface: "oklch(100% 0 0)",
  border: "oklch(88% 0.025 82)",
  text: "oklch(20% 0.02 265)",
  muted: "oklch(47% 0.02 265)",
  orange: "oklch(67% 0.19 42)",
  orangeLight: "oklch(94% 0.055 48)",
  indigo: "oklch(50% 0.20 265)",
  indigoLight: "oklch(94% 0.045 265)",
  green: "oklch(54% 0.16 145)",
  greenLight: "oklch(95% 0.05 145)",
};

const categoryOrder: PhraseCategory[] = ["arrival", "transport", "food", "shopping", "hotel", "emergency", "polite"];

export default function FreePhrasePack() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<PhraseCategory | "all">("all");
  const he = language === "he";
  const dir = he ? "rtl" : "ltr";

  usePageTitle(he ? "50 ביטויים בתאית בחינם למטיילים ישראלים" : "Free 50 Thai Phrases for Israeli Travelers");

  const downloadText = useMemo(() => buildPhrasePackText(language), [language]);
  const downloadHref = useMemo(() => `data:text/plain;charset=utf-8,${encodeURIComponent(downloadText)}`, [downloadText]);
  const phrases = activeCategory === "all" ? leadMagnetPhrases : leadMagnetPhrases.filter((phrase) => phrase.category === activeCategory);

  function playPhrase(thai: string) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(thai);
    utterance.lang = "th-TH";
    utterance.rate = 0.82;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <main className="min-h-screen pt-20" dir={dir} style={{ background: C.bg, color: C.text }}>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold" style={{ background: C.orangeLight, color: C.orange }}>
            <Sparkles className="h-4 w-4" />
            {t({ he: "מתנה לפני הטיסה", en: "Free before your flight" })}
          </div>
          <h1 className="text-4xl font-black leading-tight md:text-6xl">
            {t({ he: "50 ביטויים בתאית שמצילים רגעים אמיתיים בטיול", en: "50 Thai phrases for real travel moments" })}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8" style={{ color: C.muted }}>
            {t({
              he: "חבילת ביטויים פשוטה לשמירה בטלפון: נחיתה, מוניות, אוכל, מלון, קניות וחירום. בלי הבטחות קסם — רק משפטים שימושיים לישראלים בתאילנד.",
              en: "A simple phrase pack to save on your phone: arrival, taxis, food, hotels, shopping, and emergencies. No magic promises — just useful sentences for Israelis in Thailand.",
            })}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={downloadHref} download="thailand-hayom-50-thai-phrases.txt" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-6 text-base font-bold text-white shadow-md transition-transform hover:-translate-y-0.5" style={{ background: C.orange }}>
              <Download className="h-5 w-5" />
              {t({ he: "הורידו את 50 הביטויים", en: "Download the 50 phrases" })}
            </a>
            <Link href="/course" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border px-6 text-base font-bold" style={{ borderColor: C.border, background: C.surface }}>
              <Headphones className="h-5 w-5" />
              {t({ he: "המשיכו לשיעורים החינמיים", en: "Continue to free lessons" })}
            </Link>
          </div>
        </div>
        <div className="rounded-[2rem] border p-5 shadow-sm" style={{ background: C.surface, borderColor: C.border }}>
          <div className="rounded-[1.5rem] p-5" style={{ background: C.indigoLight }}>
            <p className="text-sm font-bold" style={{ color: C.indigo }}>{t({ he: "מה בפנים", en: "What is inside" })}</p>
            <ul className="mt-4 space-y-3 text-base font-semibold">
              {[t({ he: "50 משפטים עם תאית, תעתיק ותרגום", en: "50 phrases with Thai, romanization, and translation" }), t({ he: "סינון לפי סיטואציה בטיול", en: "Filter by travel situation" }), t({ he: "כפתור שמע בדפדפן לתרגול מהיר", en: "Browser audio button for quick practice" })].map((item) => (
                <li key={item} className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-5 w-5" style={{ color: C.green }} />{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-6 flex flex-wrap gap-2">
          <button type="button" onClick={() => setActiveCategory("all")} className="rounded-full px-4 py-2 text-sm font-bold" style={{ background: activeCategory === "all" ? C.text : C.surface, color: activeCategory === "all" ? "white" : C.text, border: `1px solid ${C.border}` }}>
            {t({ he: "הכול", en: "All" })}
          </button>
          {categoryOrder.map((category) => (
            <button key={category} type="button" onClick={() => setActiveCategory(category)} className="rounded-full px-4 py-2 text-sm font-bold" style={{ background: activeCategory === category ? C.text : C.surface, color: activeCategory === category ? "white" : C.text, border: `1px solid ${C.border}` }}>
              {phraseCategoryLabels[category][language]}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {phrases.map((phrase) => (
            <article key={phrase.id} className="rounded-3xl border p-5 shadow-sm" style={{ background: C.surface, borderColor: C.border }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold" style={{ color: C.orange }}>{phraseCategoryLabels[phrase.category][language]}</p>
                  <h2 className="mt-2 text-2xl font-black leading-relaxed" lang="th">{phrase.thai}</h2>
                  <p className="font-semibold" style={{ color: C.indigo }}>{phrase.romanization}</p>
                </div>
                <span className="rounded-full px-3 py-1 text-sm font-black" style={{ background: C.greenLight, color: C.green }}>#{phrase.id}</span>
              </div>
              <p className="mt-4 text-lg font-bold">{language === "he" ? phrase.he : phrase.en}</p>
              <p className="mt-1 text-sm" style={{ color: C.muted }}>{language === "he" ? phrase.whenToUse.he : phrase.whenToUse.en}</p>
              <button type="button" onClick={() => playPhrase(phrase.thai)} className="mt-4 inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-bold text-white" style={{ background: C.indigo }}>
                <Volume2 className="h-4 w-4" />
                {t({ he: "השמע ביטוי", en: "Play phrase" })}
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
