import { Button } from "@/components/ui/button";
import { Crown, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function PremiumPaywall() {
  const { t } = useLanguage();

  const subscriptionCheckout = trpc.stripe.createSubscriptionCheckout.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      if (error.message.includes("UNAUTHORIZED")) {
        toast.error(t({ he: "יש להתחבר כדי להירשם לפרימיום", en: "Please log in to subscribe to Premium" }));
      } else {
        toast.error(t({ he: "שגיאה ביצירת מנוי", en: "Error creating subscription" }));
      }
    },
  });

  return (
    <div className="relative mt-8">
      {/* Gradient blur overlay */}
      <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none z-10" />

      {/* CTA Card */}
      <div className="relative z-20 bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl">
        <Crown className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          {t({ he: "תוכן פרימיום", en: "Premium Content" })}
        </h3>
        <p className="text-white/90 mb-8 max-w-lg mx-auto text-lg">
          {t({
            he: "שדרג לפרימיום כדי לקרוא את המאמר המלא ולקבל גישה לכל התכנים הבלעדיים",
            en: "Upgrade to Premium to read the full article and access all exclusive content",
          })}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => subscriptionCheckout.mutate({ plan: "MONTHLY" })}
            disabled={subscriptionCheckout.isPending}
            className="px-8 py-6 text-lg bg-white text-blue-600 hover:bg-gray-100 font-bold rounded-xl shadow-lg"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            {t({ he: "₪29/חודש", en: "₪29/month" })}
          </Button>

          <Button
            onClick={() => subscriptionCheckout.mutate({ plan: "ANNUAL" })}
            disabled={subscriptionCheckout.isPending}
            variant="outline"
            className="px-8 py-6 text-lg border-2 border-white text-white hover:bg-white/10 font-bold rounded-xl"
          >
            {t({ he: "₪199/שנה (חסוך 41%)", en: "₪199/year (Save 41%)" })}
          </Button>
        </div>
      </div>
    </div>
  );
}
