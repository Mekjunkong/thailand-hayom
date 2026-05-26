import { Link, useLocation } from "wouter";
import { Check, ShieldCheck, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { COURSE_BONUSES, TOURIST_COURSE, TOURIST_COURSE_MODULES } from "@/data/touristCourse";
import { trpc } from "@/lib/trpc";

const FAQ_ITEMS = [
  {
    question: "האם זה עדיין חבילת PDF?",
    answer: "לא. זה עמוד פתיחת הקורס: 7 שיעורי דיבור לתיירים, עם בונוסים להורדה כחלק מהקורס.",
  },
  {
    question: "צריך לדעת תאית לפני שמתחילים?",
    answer: "לא. הקורס מתחיל ממשפטים קצרים למצבים אמיתיים בטיול.",
  },
  {
    question: "זה מנוי חודשי?",
    answer: "לא. זה תשלום חד פעמי לקורס המלא.",
  },
];

export default function WelcomeKit() {
  const [, setLocation] = useLocation();
  const { data: user, isLoading: isUserLoading } = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });
  const createCheckout = trpc.stripe.createCheckoutSession.useMutation();

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
      toast.error("לא הצלחנו לפתוח תשלום מאובטח. נסו שוב בעוד רגע.");
    }
  };

  return (
    <main className="min-h-screen bg-[oklch(0.97_0.015_80)] text-stone-950" dir="rtl">
      <section className="course-hero pt-24 pb-16">
        <div className="container grid gap-10 md:grid-cols-[1fr_380px] md:items-center">
          <div>
            <Link href="/" className="text-sm font-bold text-emerald-800 hover:text-emerald-950">
              חזרה לעמוד הבית
            </Link>
            <p className="mt-8 text-sm font-bold tracking-[0.08em] text-emerald-800">
              {TOURIST_COURSE.productNameHe}
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[1.05] md:text-7xl">
              פתחו את קורס התאית המלא לטיול בתאילנד
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700 md:text-xl">
              7 שיעורי דיבור קצרים למצבים שתפגשו באמת: מונית, אוכל, שוק, מלון, חירום ושיחה בסיסית עם מקומיים.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={handlePurchase}
                disabled={isUserLoading || createCheckout.isPending}
                className="h-13 rounded-xl bg-stone-950 px-8 text-base font-bold text-white hover:bg-stone-800"
              >
                {createCheckout.isPending ? "פותח תשלום..." : `פתחו את הקורס ₪${TOURIST_COURSE.priceIls}`}
              </Button>
              <Button asChild variant="outline" className="h-13 rounded-xl border-stone-300 px-8 text-base font-bold">
                <Link href="/interactive-lessons">
                  ראו שיעורי ניסיון
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-stone-500">
              התחברות נדרשת לפני תשלום כדי לשייך את הגישה לחשבון שלכם.
            </p>
          </div>

          <aside className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold text-stone-500">מה מקבלים</p>
            <p className="mt-3 text-4xl font-black">₪{TOURIST_COURSE.priceIls}</p>
            <p className="mt-1 text-sm text-stone-500">תשלום חד פעמי לקורס המלא</p>
            <div className="mt-6 space-y-3 text-sm text-stone-700">
              <div className="flex gap-3">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-700" />
                <span>כל 7 שיעורי הדיבור של הקורס</span>
              </div>
              <div className="flex gap-3">
                <Volume2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-700" />
                <span>תרגול ביטויים עם הגייה תאית</span>
              </div>
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-700" />
                <span>גישה דרך החשבון שלכם לאחר התשלום</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold md:text-5xl">מסלול הקורס</h2>
            <p className="mt-4 text-lg leading-8 text-stone-700">
              כל יום בנוי סביב סיטואציה אחת מהטיול, כדי שתוכלו לתרגל לפני הטיסה ולשלוף משפטים בזמן אמת.
            </p>
          </div>
          <div className="mt-10 grid gap-3 md:grid-cols-7">
            {TOURIST_COURSE_MODULES.map(module => (
              <article key={module.day} className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                <p className="text-sm font-black text-emerald-800">יום {module.day}</p>
                <h3 className="mt-3 text-lg font-bold leading-tight">{module.titleHe}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">{module.outcomeHe}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div>
            <h2 className="text-3xl font-bold md:text-5xl">בונוסים כלולים</h2>
            <p className="mt-4 text-lg leading-8 text-stone-700">
              לצד שיעורי הדיבור תקבלו חומרי עזר קצרים לשמירה בטלפון לפני ובמהלך הטיול.
            </p>
          </div>
          <div className="grid gap-3">
            {COURSE_BONUSES.map(bonus => (
              <article key={bonus.titleEn} className="rounded-xl border border-stone-200 bg-white p-5">
                <h3 className="text-xl font-bold">{bonus.titleHe}</h3>
                <p className="mt-2 leading-7 text-stone-600">{bonus.descriptionHe}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold md:text-5xl">שאלות קצרות</h2>
            <div className="mt-8 space-y-3">
              {FAQ_ITEMS.map(item => (
                <article key={item.question} className="rounded-xl border border-stone-200 p-5">
                  <h3 className="font-bold">{item.question}</h3>
                  <p className="mt-2 leading-7 text-stone-600">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border-2 border-stone-950 bg-stone-950 p-6 text-white md:self-start">
            <h2 className="text-3xl font-bold">מוכנים לפתוח את הקורס?</h2>
            <p className="mt-4 leading-8 text-stone-200">
              התחילו מהשיעורים החינמיים, או פתחו עכשיו את כל מסלול 7 הימים והבונוסים.
            </p>
            <Button
              onClick={handlePurchase}
              disabled={isUserLoading || createCheckout.isPending}
              className="mt-6 h-13 rounded-xl bg-amber-400 px-8 text-base font-bold text-stone-950 hover:bg-amber-300"
            >
              {createCheckout.isPending ? "פותח תשלום..." : `פתחו את הקורס ₪${TOURIST_COURSE.priceIls}`}
            </Button>
            <p className="mt-4 text-sm text-stone-400">אם אינכם מחוברים, נעביר אתכם קודם ליצירת חשבון חינמי.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
