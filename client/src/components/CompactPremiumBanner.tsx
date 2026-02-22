import { Button } from "@/components/ui/button";
import { Crown, Sparkles, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function CompactPremiumBanner() {
  const { t } = useLanguage();

  const { data: user } = trpc.auth.me.useQuery();
  const { data: subStatus } = trpc.stripe.getSubscriptionStatus.useQuery(
    undefined,
    { enabled: !!user },
  );
  const isPremium = subStatus?.tier === "premium";

  const subscriptionCheckout =
    trpc.stripe.createSubscriptionCheckout.useMutation({
      onSuccess: data => {
        if (data.url) window.location.href = data.url;
      },
      onError: error => {
        if (error.message.includes("UNAUTHORIZED")) {
          toast.error(
            t({
              he: "יש להתחבר כדי להירשם",
              en: "Please log in to subscribe",
            }),
          );
        } else {
          toast.error(
            t({ he: "שגיאה", en: "Error creating subscription" }),
          );
        }
      },
    });

  const portalSession = trpc.stripe.createCustomerPortalSession.useMutation({
    onSuccess: data => {
      if (data.url) window.location.href = data.url;
    },
    onError: () => {
      toast.error(t({ he: "שגיאה", en: "Error opening portal" }));
    },
  });

  return (
    <div className="bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full">
      <Crown className="h-10 w-10 text-white mb-4" />
      <h3 className="text-xl font-bold text-white mb-2">
        {t({ he: "תוכן פרימיום", en: "Premium Content" })}
      </h3>

      {isPremium ? (
        <>
          <p className="text-white/90 mb-4 flex items-center gap-2">
            <Check className="h-5 w-5" />
            {t({ he: "אתה מנוי פרימיום", en: "You're a premium member" })}
          </p>
          <Button
            onClick={() => portalSession.mutate()}
            disabled={portalSession.isPending}
            variant="secondary"
            className="bg-white text-amber-700 hover:bg-gray-100 font-semibold"
          >
            {t({ he: "ניהול מנוי", en: "Manage" })}
          </Button>
        </>
      ) : (
        <>
          <p className="text-white/90 mb-4 text-sm">
            {t({
              he: "150+ מאמרים בלעדיים — ₪29/חודש",
              en: "Unlock 150+ premium articles — ₪29/month",
            })}
          </p>
          <Button
            onClick={() =>
              subscriptionCheckout.mutate({ plan: "MONTHLY" })
            }
            disabled={subscriptionCheckout.isPending}
            className="bg-white text-amber-700 hover:bg-gray-100 font-semibold"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {t({ he: "שדרג לפרימיום", en: "Upgrade" })}
          </Button>
        </>
      )}
    </div>
  );
}
