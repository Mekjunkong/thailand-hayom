import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PhrasePracticePreview() {
  const play = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance("ไม่เผ็ดครับ");
    utterance.lang = "th-TH";
    utterance.rate = 0.72;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section className="border-y border-stone-200 bg-white py-16" dir="rtl">
      <div className="container grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <div>
          <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">נסו משפט אחד עכשיו</h2>
          <p className="mt-3 text-stone-600">
            הקורס בנוי ממשפטים קצרים שתשתמשו בהם באותו יום בטיול.
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-[oklch(0.98_0.012_85)] p-6">
          <p className="text-sm font-bold text-stone-500">במסעדה</p>
          <p className="mt-4 text-5xl font-black text-stone-950" lang="th">
            ไม่เผ็ดครับ
          </p>
          <p className="mt-3 text-xl text-stone-700">mai phet khrap</p>
          <p className="mt-1 text-lg font-semibold text-stone-950">לא חריף בבקשה (גבר)</p>
          <Button onClick={play} className="mt-5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800">
            <Volume2 className="ml-2 h-4 w-4" />
            שמע הגייה
          </Button>
        </div>
      </div>
    </section>
  );
}
