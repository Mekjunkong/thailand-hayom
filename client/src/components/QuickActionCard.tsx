import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import type { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  href: string;
  icon: LucideIcon;
  labelEn: string;
  labelHe: string;
  bgClass: string;
}

export default function QuickActionCard({
  href,
  icon: Icon,
  labelEn,
  labelHe,
  bgClass,
}: QuickActionCardProps) {
  const { language } = useLanguage();

  return (
    <Link href={href}>
      <div
        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer ${bgClass}`}
      >
        <Icon className="h-6 w-6 text-white" />
        <span className="text-[11px] font-semibold text-white text-center leading-tight">
          {language === "he" ? labelHe : labelEn}
        </span>
      </div>
    </Link>
  );
}
