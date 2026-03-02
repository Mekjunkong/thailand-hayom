import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check, Crown, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import QuickActionGrid from "@/components/QuickActionGrid";
import LearningProgressCard from "@/components/LearningProgressCard";
import ContentFeed from "@/components/ContentFeed";

export default function Home() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Premium status check
  const { data: user } = trpc.auth.me.useQuery();
  const { data: subStatus } = trpc.stripe.getSubscriptionStatus.useQuery(
    undefined,
    { enabled: !!user },
  );
  const isPremium = subStatus?.tier === "premium";

  // Newsletter subscribe
  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: data => {
      if (data.success) {
        setSubscribed(true);
        setEmail("");
        toast.success(
          t({ he: "נרשמת בהצלחה!", en: "Successfully subscribed!" }),
        );
        setTimeout(() => setSubscribed(false), 3000);
      } else {
        toast.info(t({ he: "כבר רשום", en: "Already subscribed" }));
      }
    },
    onError: () => {
      toast.error(t({ he: "שגיאה בהרשמה", en: "Subscription failed" }));
    },
  });

  // Premium checkout
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    subscribeMutation.mutate({ email });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-14">
      {/* Quick Actions */}
      <QuickActionGrid />

      {/* Learning Progress */}
      <LearningProgressCard />

      {/* Content Feed */}
      <ContentFeed />

      {/* Compact Newsletter CTA */}
      <section className="px-4 py-6">
        <div className="max-w-lg mx-auto bg-slate-800 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white mb-2 text-center">
            {t({ he: "הישאר מעודכן", en: "Stay Updated" })}
          </h3>
          <form
            onSubmit={handleSubscribe}
            className="flex gap-2"
          >
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
              className="px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm"
            >
              <Mail className="h-4 w-4" />
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

      {/* Slim Premium Banner (conditional) */}
      {!isPremium && (
        <section className="px-4 pb-8">
          <div className="max-w-lg mx-auto">
            <button
              onClick={() =>
                subscriptionCheckout.mutate({ plan: "MONTHLY" })
              }
              disabled={subscriptionCheckout.isPending}
              className="w-full flex items-center justify-between bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl px-5 py-4 hover:opacity-95 transition-opacity"
            >
              <div className="flex items-center gap-3">
                <Crown className="h-5 w-5 text-white" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">
                    {t({ he: "שדרג לפרימיום", en: "Unlock Premium" })}
                  </p>
                  <p className="text-xs text-white/80">
                    {t({
                      he: "₪29/חודש — 150+ מאמרים בלעדיים",
                      en: "₪29/month — 150+ exclusive articles",
                    })}
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
