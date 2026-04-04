import {
  ShieldAlert,
  MessageCircle,
  GraduationCap,
  FileText,
  Calendar,
  BookOpen,
} from "lucide-react";
import QuickActionCard from "./QuickActionCard";

const actions = [
  {
    href: "/emergency",
    icon: ShieldAlert,
    labelEn: "Emergency",
    labelHe: "חירום",
    bgClass: "bg-gradient-to-br from-red-500 to-rose-600",
  },
  {
    href: "/pronunciation",
    icon: MessageCircle,
    labelEn: "Phrases",
    labelHe: "ביטויים",
    bgClass: "bg-gradient-to-br from-amber-400 to-orange-500",
  },
  {
    href: "/interactive-lessons",
    icon: GraduationCap,
    labelEn: "Lessons",
    labelHe: "שיעורים",
    bgClass: "bg-gradient-to-br from-blue-500 to-indigo-600",
  },
  {
    href: "/articles?category=visa",
    icon: FileText,
    labelEn: "Visa",
    labelHe: "ויזה",
    bgClass: "bg-gradient-to-br from-teal-400 to-emerald-600",
  },
  {
    href: "/articles?category=events",
    icon: Calendar,
    labelEn: "Events",
    labelHe: "אירועים",
    bgClass: "bg-gradient-to-br from-violet-500 to-purple-600",
  },
  {
    href: "/blog",
    icon: BookOpen,
    labelEn: "Blog",
    labelHe: "בלוג",
    bgClass: "bg-gradient-to-br from-sky-400 to-blue-500",
  },
];

export default function QuickActionGrid() {
  return (
    <section className="px-4 pt-4 pb-2">
      <div className="max-w-lg mx-auto grid grid-cols-3 gap-3">
        {actions.map(action => (
          <QuickActionCard key={action.href} {...action} />
        ))}
      </div>
    </section>
  );
}
