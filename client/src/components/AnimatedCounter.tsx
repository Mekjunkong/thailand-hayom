import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  labelHe: string;
  language: string;
}

export default function AnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
  label,
  labelHe,
  language,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } // Trigger when 30% visible
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const startCount = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        // Easing function for smooth animation
        const easeOutQuad = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOutQuad * end));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div
      ref={counterRef}
      className="text-center p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
    >
      <div className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-lg md:text-xl text-gray-700 font-semibold">
        {language === 'he' ? labelHe : label}
      </div>
    </div>
  );
}
