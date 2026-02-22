import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import ThailandMap from "@/components/ThailandMap";
import ScrollReveal from "@/components/ScrollReveal";
import NewsTicker from "@/components/NewsTicker";
import LeadStoryBlock from "@/components/LeadStoryBlock";
import CategoryPillNav from "@/components/CategoryPillNav";
import CategorySection from "@/components/CategorySection";
import CompactPremiumBanner from "@/components/CompactPremiumBanner";

export default function Home() {
  const { t } = useLanguage();
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

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* ============================================================
          Breaking news ticker
          ============================================================ */}
      <NewsTicker />

      {/* ============================================================
          Lead story block (newspaper hero)
          ============================================================ */}
      <LeadStoryBlock />

      {/* ============================================================
          Category pill navigation
          ============================================================ */}
      <CategoryPillNav />

      {/* ============================================================
          Category sections
          ============================================================ */}
      <CategorySection categoryId="travel" />
      <CategorySection categoryId="lessons" />
      <CategorySection categoryId="food" />

      {/* ============================================================
          Map + Premium banner side by side
          ============================================================ */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Map */}
            <ScrollReveal>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                  {t({ he: "חקור את תאילנד", en: "Explore Thailand" })}
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                  {t({
                    he: "בחר עיר במפה כדי לגלות מדריכים ומאמרים",
                    en: "Click a city to discover guides and articles",
                  })}
                </p>
                <ThailandMap />
              </div>
            </ScrollReveal>

            {/* Premium banner */}
            <ScrollReveal delay={0.1}>
              <CompactPremiumBanner />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================================================
          Compact newsletter
          ============================================================ */}
      <section className="py-16 bg-gradient-to-b from-slate-800 to-slate-950">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
                {t({ he: "הישאר מעודכן", en: "Stay Updated" })}
              </h2>
              <p className="text-gray-400 mb-6">
                {t({
                  he: "קבל חדשות, טיפים ומדריכים ישירות למייל שלך",
                  en: "Get news, tips, and guides delivered straight to your inbox",
                })}
              </p>

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

              {subscribed && (
                <p className="text-green-400 font-semibold flex items-center justify-center gap-2 mb-4">
                  <Check className="h-5 w-5" />
                  {t({ he: "נרשמת בהצלחה!", en: "Successfully subscribed!" })}
                </p>
              )}

              <p className="text-sm text-gray-500">
                {t({
                  he: "הצטרף ל-5,000+ מנויים",
                  en: "Join 5,000+ subscribers",
                })}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
