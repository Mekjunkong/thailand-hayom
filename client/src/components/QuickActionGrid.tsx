import {
  ShieldAlert,
  MessageCircle,
  MapPin,
  GraduationCap,
  FileText,
  Calendar,
} from "lucide-react";
import QuickActionCard from "./QuickActionCard";

const actions = [
  {
    href: "/emergency",
    icon: ShieldAlert,
    labelEn: "Emergency",
    labelHe: "חירום",
    tintBg: "bg-red-50",
    tintText: "text-red-500",
  },
  {
    href: "/pronunciation",
    icon: MessageCircle,
    labelEn: "Phrases",
    labelHe: "ביטויים",
    tintBg: "bg-amber-50",
    tintText: "text-amber-500",
  },
  {
    href: "/trips/chiang-mai-one-day",
    icon: MapPin,
    labelEn: "Map",
    labelHe: "מפה",
    tintBg: "bg-teal-50",
    tintText: "text-teal-500",
  },
  {
    href: "/interactive-lessons",
    icon: GraduationCap,
    labelEn: "Lessons",
    labelHe: "שיעורים",
    tintBg: "bg-blue-50",
    tintText: "text-blue-500",
  },
  {
    href: "/articles?category=visa",
    icon: FileText,
    labelEn: "Visa",
    labelHe: "ויזה",
    tintBg: "bg-indigo-50",
    tintText: "text-indigo-500",
  },
  {
    href: "/articles?category=events",
    icon: Calendar,
    labelEn: "Events",
    labelHe: "אירועים",
    tintBg: "bg-violet-50",
    tintText: "text-violet-500",
  },
];

export default function QuickActionGrid() {
  return (
    <section className="px-4 pt-6 pb-2">
      <div className="max-w-lg mx-auto grid grid-cols-3 gap-3 md:gap-4">
        {actions.map(action => (
          <QuickActionCard key={action.href} {...action} />
        ))}
      </div>
    </section>
  );
}
