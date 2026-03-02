import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import type { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  href: string;
  icon: LucideIcon;
  labelEn: string;
  labelHe: string;
  tintBg: string;
  tintText: string;
}

export default function QuickActionCard({
  href,
  icon: Icon,
  labelEn,
  labelHe,
  tintBg,
  tintText,
}: QuickActionCardProps) {
  const { language } = useLanguage();

  return (
    <Link href={href}>
      <div
        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer ${tintBg}`}
      >
        <Icon className={`h-7 w-7 ${tintText}`} />
        <span className="text-xs font-medium text-gray-700 text-center leading-tight">
          {language === "he" ? labelHe : labelEn}
        </span>
      </div>
    </Link>
  );
}
