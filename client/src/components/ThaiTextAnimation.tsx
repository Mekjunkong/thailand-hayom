import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ThaiPhrase {
  thai: string;
  phonetic: string;
  meaning: string;
}

const phrases: ThaiPhrase[] = [
  { thai: "สวัสดี", phonetic: "sa-wat-dee", meaning: "Hello" },
  { thai: "ขอบคุณ", phonetic: "khop-khun", meaning: "Thank you" },
  { thai: "เท่าไหร่", phonetic: "tao-rai", meaning: "How much?" },
  { thai: "อร่อย", phonetic: "a-roi", meaning: "Delicious" },
  { thai: "ไม่เป็นไร", phonetic: "mai-pen-rai", meaning: "No worries" },
];

export default function ThaiTextAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[280px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-6xl md:text-7xl font-bold text-gray-900">
            {phrases[currentIndex].thai}
          </span>
          <span className="text-xl text-gray-600 mt-3">
            {phrases[currentIndex].phonetic}
          </span>
          <span className="text-lg text-gray-500 mt-1">
            {phrases[currentIndex].meaning}
          </span>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-2 mt-8">
        {phrases.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-6 bg-amber-600"
                : "w-2 bg-amber-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
