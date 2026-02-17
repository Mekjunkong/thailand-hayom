import { Button } from "@/components/ui/button";
import { Crown, ArrowRight, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";

export default function SubscriptionSuccess() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-16">
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        {/* Success icon */}
        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-teal-500">
          <Crown className="w-10 h-10 text-yellow-400" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          {t({ he: "ברוכים הבאים לפרימיום!", en: "Welcome to Premium!" })}
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
          {t({
            he: "המנוי שלך פעיל. עכשיו יש לך גישה לכל התכנים הבלעדיים",
            en: "Your subscription is active. You now have access to all exclusive content",
          })}
        </p>

        {/* Benefits list */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 text-left max-w-md mx-auto">
          {[
            t({ he: "מאמרים בלעדיים", en: "Exclusive articles" }),
            t({ he: "מדריכים מפורטים", en: "Detailed guides" }),
            t({ he: "טיפים פנימיים", en: "Insider tips" }),
            t({ he: "הנחות במסעדות ומלונות", en: "Restaurant & hotel discounts" }),
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-3 border-b last:border-0">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href="/articles?premium=true">
          <Button
            size="lg"
            className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold rounded-xl shadow-lg"
          >
            {t({ he: "צפה בתוכן פרימיום", en: "Browse Premium Content" })}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
