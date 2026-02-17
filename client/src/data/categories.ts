import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Map,
  UtensilsCrossed,
  FileText,
  Calendar,
  Shield,
  Crown,
} from "lucide-react";

export interface Category {
  id: string;
  nameEn: string;
  nameHe: string;
  descriptionEn: string;
  descriptionHe: string;
  color: string;
  textColor: string;
  borderColor: string;
  gradientFrom: string;
  gradientTo: string;
  icon: LucideIcon;
  route: string;
  articleCategory?: string;
}

export const categories: Category[] = [
  {
    id: "lessons",
    nameEn: "Thai Lessons",
    nameHe: "שיעורי תאילנדית",
    descriptionEn: "Interactive Thai language lessons for travelers",
    descriptionHe: "שיעורי תאילנדית אינטראקטיביים למטיילים",
    color: "bg-amber-500",
    textColor: "text-amber-500",
    borderColor: "border-amber-500",
    gradientFrom: "from-amber-400",
    gradientTo: "to-amber-600",
    icon: BookOpen,
    route: "/interactive-lessons",
  },
  {
    id: "travel",
    nameEn: "Travel & Attractions",
    nameHe: "טיולים ואטרקציות",
    descriptionEn: "Discover Thailand's best destinations and hidden gems",
    descriptionHe: "גלו את היעדים הטובים ביותר והאוצרות הנסתרים של תאילנד",
    color: "bg-teal-500",
    textColor: "text-teal-500",
    borderColor: "border-teal-500",
    gradientFrom: "from-teal-400",
    gradientTo: "to-teal-600",
    icon: Map,
    route: "/articles?category=attractions",
    articleCategory: "attractions",
  },
  {
    id: "food",
    nameEn: "Food & Dining",
    nameHe: "אוכל ומסעדות",
    descriptionEn: "Thai cuisine guides, street food, and restaurant reviews",
    descriptionHe: "מדריכי מטבח תאילנדי, אוכל רחוב וביקורות מסעדות",
    color: "bg-rose-500",
    textColor: "text-rose-500",
    borderColor: "border-rose-500",
    gradientFrom: "from-rose-400",
    gradientTo: "to-rose-600",
    icon: UtensilsCrossed,
    route: "/articles?category=food",
    articleCategory: "food",
  },
  {
    id: "visa",
    nameEn: "Visa & Documents",
    nameHe: "ויזה ומסמכים",
    descriptionEn: "Visa requirements, extensions, and official procedures",
    descriptionHe: "דרישות ויזה, הארכות ונהלים רשמיים",
    color: "bg-blue-500",
    textColor: "text-blue-500",
    borderColor: "border-blue-500",
    gradientFrom: "from-blue-400",
    gradientTo: "to-blue-600",
    icon: FileText,
    route: "/articles?category=visa",
    articleCategory: "visa",
  },
  {
    id: "events",
    nameEn: "Events & Festivals",
    nameHe: "אירועים ופסטיבלים",
    descriptionEn: "Upcoming events, festivals, and cultural celebrations",
    descriptionHe: "אירועים קרובים, פסטיבלים וחגיגות תרבותיות",
    color: "bg-violet-500",
    textColor: "text-violet-500",
    borderColor: "border-violet-500",
    gradientFrom: "from-violet-400",
    gradientTo: "to-violet-600",
    icon: Calendar,
    route: "/articles?category=events",
    articleCategory: "events",
  },
  {
    id: "safety",
    nameEn: "Safety & Tips",
    nameHe: "בטיחות וטיפים",
    descriptionEn: "Stay safe with scam alerts, health tips, and emergency info",
    descriptionHe: "הישארו בטוחים עם התראות הונאה, טיפי בריאות ומידע חירום",
    color: "bg-orange-500",
    textColor: "text-orange-500",
    borderColor: "border-orange-500",
    gradientFrom: "from-orange-400",
    gradientTo: "to-orange-600",
    icon: Shield,
    route: "/articles?category=safety",
    articleCategory: "safety",
  },
  {
    id: "premium",
    nameEn: "Premium Content",
    nameHe: "תוכן פרימיום",
    descriptionEn: "Exclusive guides, deals, and insider tips for subscribers",
    descriptionHe: "מדריכים בלעדיים, מבצעים וטיפים פנימיים למנויים",
    color: "bg-gradient-to-r from-yellow-500 to-amber-500",
    textColor: "text-yellow-600",
    borderColor: "border-yellow-500",
    gradientFrom: "from-yellow-400",
    gradientTo: "to-amber-500",
    icon: Crown,
    route: "/articles?premium=true",
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id);
}

export function getCategoryByArticleCategory(
  articleCategory: string
): Category | undefined {
  return categories.find(c => c.articleCategory === articleCategory);
}
