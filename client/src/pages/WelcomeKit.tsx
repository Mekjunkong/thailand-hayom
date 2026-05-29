import { Link, useLocation } from "wouter";
import { Check, ShieldCheck, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  COURSE_BONUSES,
  TOURIST_COURSE,
  TOURIST_COURSE_MODULES,
} from "@/data/touristCourse";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQ_ITEMS = [
  {
    question: {
      he: "האם זה עדיין חבילת PDF?",
      en: "Is this still a PDF pack?",
    },
    answer: {
      he: "לא. זה עמוד פתיחת הקורס: 7 שיעורי דיבור לתיירים, עם בונוסים להורדה כחלק מהקורס.",
      en: "No. This is the course unlock page: 7 speaking lessons for tourists, with downloadable bonuses included.",
    },
  },
  {
    question: {
      he: "צריך לדעת תאית לפני שמתחילים?",
      en: "Do I need to know Thai before starting?",
    },
    answer: {
      he: "לא. הקורס מתחיל ממשפטים קצרים למצבים אמיתיים בטיול.",
      en: "No. The course starts with short phrases for real travel situations.",
    },
  },
  {
    question: { he: "זה מנוי חודשי?", en: "Is this a monthly subscription?" },
    answer: {
      he: "לא. זה תשלום חד פעמי לקורס המלא.",
      en: "No. It's a one-time payment for the full course.",
    },
  },
];

export default function WelcomeKit() {
  const [, setLocation] = useLocation();
  const { language, t } = useLanguage();
  const { data: user, isLoading: isUserLoading } = trpc.auth.me.useQuery(
    undefined,
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  const createCheckout = trpc.stripe.createCheckoutSession.useMutation();
  const dir = language === "he" ? "rtl" : "ltr";

  const handlePurchase = async () => {
    if (isUserLoading) return;
    if (!user) {
      setLocation("/login?redirect=/welcome-kit");
      return;
    }

    try {
      const result = await createCheckout.mutateAsync({
        productType: TOURIST_COURSE.checkoutProductType,
      });
      if (result.url) window.location.href = result.url;
    } catch {
      toast.error(
        t({
          he: "לא הצלחנו לפתוח תשלום מאובטח. נסו שוב בעוד רגע.",
          en: "Could not open secure payment. Please try again.",
        })
      );
    }
  };

  return (
    <main
      className="min-h-screen bg-[oklch(0.97_0.015_80)] text-stone-950"
      dir={dir}
    >
      <section className="course-hero pt-24 pb-16">
        <div className="container grid gap-10 md:grid-cols-[1fr_380px] md:items-center">
          <div>
            <Link
              href="/"
              className="text-sm font-bold text-emerald-800 hover:text-emerald-950"
            >
              {t({ he: "חזרה לעמוד הבית", en: "Back to home" })}
            </Link>
            <p className="mt-8 text-sm font-bold tracking-[0.08em] text-emerald-800">
              {t({
                he: TOURIST_COURSE.productNameHe,
                en: TOURIST_COURSE.productName,
              })}
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[1.05] md:text-7xl">
              {t({
                he: "פתחו את קורס התאית המלא לטיול בתאילנד",
                en: "Unlock the full Thai course for your trip to Thailand",
              })}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700 md:text-xl">
              {t({
                he: "7 שיעורי דיבור קצרים למצבים שתפגשו באמת: מונית, אוכל, שוק, מלון, חירום ושיחה בסיסית עם מקומיים.",
                en: "7 short speaking lessons for situations you'll actually face: taxi, food, market, hotel, emergency, and basic conversation with locals.",
              })}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={handlePurchase}
                disabled={isUserLoading || createCheckout.isPending}
                className="h-13 rounded-xl bg-stone-950 px-8 text-base font-bold text-white hover:bg-stone-800"
              >
                {createCheckout.isPending
                  ? t({ he: "פותח תשלום...", en: "Opening payment..." })
                  : t({
                      he: `פתחו את הקורס ₪${TOURIST_COURSE.priceIls}`,
                      en: `Unlock the course ₪${TOURIST_COURSE.priceIls}`,
                    })}
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-13 rounded-xl border-stone-300 px-8 text-base font-bold"
              >
                <Link href="/lesson/airport-arrival">
                  {t({ he: "ראו שיעורי ניסיון", en: "Try free lessons" })}
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-stone-500">
              {t({
                he: "התחברות נדרשת לפני תשלום כדי לשייך את הגישה לחשבון שלכם.",
                en: "Login is required before payment to link access to your account.",
              })}
            </p>
          </div>

          <aside className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold text-stone-500">
              {t({ he: "מה מקבלים", en: "What you get" })}
            </p>
            <p className="mt-3 text-4xl font-black">
              ₪{TOURIST_COURSE.priceIls}
            </p>
            <p className="mt-1 text-sm text-stone-500">
              {t({
                he: "תשלום חד פעמי לקורס המלא",
                en: "One-time payment for the full course",
              })}
            </p>
            <div className="mt-6 space-y-3 text-sm text-stone-700">
              <div className="flex gap-3">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-700" />
                <span>
                  {t({
                    he: "כל 7 שיעורי הדיבור של הקורס",
                    en: "All 7 speaking lessons",
                  })}
                </span>
              </div>
              <div className="flex gap-3">
                <Volume2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-700" />
                <span>
                  {t({
                    he: "תרגול ביטויים עם הגייה תאית",
                    en: "Phrase practice with Thai pronunciation",
                  })}
                </span>
              </div>
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-700" />
                <span>
                  {t({
                    he: "גישה דרך החשבון שלכם לאחר התשלום",
                    en: "Access via your account after payment",
                  })}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold md:text-5xl">
              {t({ he: "מסלול הקורס", en: "Course path" })}
            </h2>
            <p className="mt-4 text-lg leading-8 text-stone-700">
              {t({
                he: "כל יום בנוי סביב סיטואציה אחת מהטיול, כדי שתוכלו לתרגל לפני הטיסה ולשלוף משפטים בזמן אמת.",
                en: "Each day is built around one real travel situation, so you can practice before your flight and pull phrases out in the moment.",
              })}
            </p>
          </div>
          <div className="mt-10 grid gap-3 md:grid-cols-7">
            {TOURIST_COURSE_MODULES.map(module => (
              <article
                key={module.day}
                className="rounded-xl border border-stone-200 bg-stone-50 p-4"
              >
                <p className="text-sm font-black text-emerald-800">
                  {t({ he: "יום", en: "Day" })} {module.day}
                </p>
                <h3 className="mt-3 text-lg font-bold leading-tight">
                  {language === "he" ? module.titleHe : module.titleEn}
                </h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">
                  {language === "he" ? module.outcomeHe : module.outcomeEn}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div>
            <h2 className="text-3xl font-bold md:text-5xl">
              {t({ he: "בונוסים כלולים", en: "Included bonuses" })}
            </h2>
            <p className="mt-4 text-lg leading-8 text-stone-700">
              {t({
                he: "לצד שיעורי הדיבור תקבלו חומרי עזר קצרים לשמירה בטלפון לפני ובמהלך הטיול.",
                en: "Alongside the speaking lessons you'll get short reference materials to keep on your phone before and during your trip.",
              })}
            </p>
          </div>
          <div className="grid gap-3">
            {COURSE_BONUSES.map(bonus => (
              <article
                key={bonus.titleEn}
                className="rounded-xl border border-stone-200 bg-white p-5"
              >
                <h3 className="text-xl font-bold">
                  {language === "he" ? bonus.titleHe : bonus.titleEn}
                </h3>
                <p className="mt-2 leading-7 text-stone-600">
                  {language === "he"
                    ? bonus.descriptionHe
                    : bonus.descriptionEn}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold md:text-5xl">
              {t({ he: "שאלות קצרות", en: "Quick questions" })}
            </h2>
            <div className="mt-8 space-y-3">
              {FAQ_ITEMS.map(item => (
                <article
                  key={item.question.en}
                  className="rounded-xl border border-stone-200 p-5"
                >
                  <h3 className="font-bold">{item.question[language]}</h3>
                  <p className="mt-2 leading-7 text-stone-600">
                    {item.answer[language]}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border-2 border-stone-950 bg-stone-950 p-6 text-white md:self-start">
            <h2 className="text-3xl font-bold">
              {t({
                he: "מוכנים לפתוח את הקורס?",
                en: "Ready to unlock the course?",
              })}
            </h2>
            <p className="mt-4 leading-8 text-stone-200">
              {t({
                he: "התחילו מהשיעורים החינמיים, או פתחו עכשיו את כל מסלול 7 הימים והבונוסים.",
                en: "Start with the free lessons, or unlock the full 7-day path and bonuses now.",
              })}
            </p>
            <Button
              onClick={handlePurchase}
              disabled={isUserLoading || createCheckout.isPending}
              className="mt-6 h-13 rounded-xl bg-amber-400 px-8 text-base font-bold text-stone-950 hover:bg-amber-300"
            >
              {createCheckout.isPending
                ? t({ he: "פותח תשלום...", en: "Opening payment..." })
                : t({
                    he: `פתחו את הקורס ₪${TOURIST_COURSE.priceIls}`,
                    en: `Unlock the course ₪${TOURIST_COURSE.priceIls}`,
                  })}
            </Button>
            <p className="mt-4 text-sm text-stone-400">
              {t({
                he: "אם אינכם מחוברים, נעביר אתכם קודם ליצירת חשבון חינמי.",
                en: "If you're not logged in, we'll take you to create a free account first.",
              })}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
