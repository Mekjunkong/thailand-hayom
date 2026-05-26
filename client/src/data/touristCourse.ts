import { lessonsData } from "@/data/lessonsData";

export const TOURIST_COURSE = {
  productName: "Tourist Survival Thai Course",
  productNameHe: "קורס תאית הישרדות לתיירים",
  headlineHe: "לדבר תאית בסיסית לטיול בתאילנד תוך 7 ימים",
  headlineEn: "Speak enough Thai for your Thailand trip in 7 days",
  priceIls: 79,
  originalPriceIls: 129,
  currency: "ils",
  freeLessonIds: [1, 3],
  paidLessonIds: [1, 5, 3, 4, 6, 7, 9],
  checkoutProductType: "single",
  whatsAppUrl:
    "https://wa.me/66929894495?text=Hi!%20I%20want%20the%20Tourist%20Survival%20Thai%20Course",
} as const;

export type TouristCourseModule = {
  day: number;
  lessonId: number;
  titleHe: string;
  titleEn: string;
  outcomeHe: string;
  outcomeEn: string;
  situation: "arrival" | "taxi" | "food" | "shopping" | "hotel" | "emergency" | "social";
};

export const TOURIST_COURSE_MODULES: TouristCourseModule[] = [
  {
    day: 1,
    lessonId: 1,
    titleHe: "ברכות ונימוס",
    titleEn: "Greetings and respect",
    outcomeHe: "להגיד שלום, תודה וסליחה בצורה מכבדת",
    outcomeEn: "Say hello, thank you, and sorry respectfully",
    situation: "arrival",
  },
  {
    day: 2,
    lessonId: 5,
    titleHe: "מונית, Grab וכיוונים",
    titleEn: "Taxi, Grab, and directions",
    outcomeHe: "להסביר לאן לנסוע, לעצור כאן, ולשאול מחיר",
    outcomeEn: "Give directions, stop here, and ask the price",
    situation: "taxi",
  },
  {
    day: 3,
    lessonId: 3,
    titleHe: "אוכל ומסעדות",
    titleEn: "Food and restaurants",
    outcomeHe: "להזמין אוכל, לבקש לא חריף, ולדבר על אלרגיות",
    outcomeEn: "Order food, ask for not spicy, and handle allergies",
    situation: "food",
  },
  {
    day: 4,
    lessonId: 4,
    titleHe: "שוק וקניות",
    titleEn: "Shopping and bargaining",
    outcomeHe: "לשאול כמה עולה, לבקש הנחה, ולקנות בביטחון",
    outcomeEn: "Ask prices, request a discount, and buy confidently",
    situation: "shopping",
  },
  {
    day: 5,
    lessonId: 6,
    titleHe: "מלון וצ'ק-אין",
    titleEn: "Hotel and check-in",
    outcomeHe: "לבקש חדר, מגבת, עזרה או פתרון לבעיה",
    outcomeEn: "Ask for a room, towel, help, or a fix",
    situation: "hotel",
  },
  {
    day: 6,
    lessonId: 7,
    titleHe: "חירום ובריאות",
    titleEn: "Emergency and health",
    outcomeHe: "לבקש עזרה, רופא, משטרה או בית חולים",
    outcomeEn: "Ask for help, a doctor, police, or a hospital",
    situation: "emergency",
  },
  {
    day: 7,
    lessonId: 9,
    titleHe: "שיחה קצרה וחזרה",
    titleEn: "Small talk and review",
    outcomeHe: "לפתוח שיחה קצרה ולהרגיש יותר נוח עם מקומיים",
    outcomeEn: "Start a short conversation and feel more comfortable",
    situation: "social",
  },
];

export const COURSE_BONUSES = [
  {
    titleHe: "PDF ביטויים לטיול",
    titleEn: "Trip phrasebook PDF",
    descriptionHe: "כל המשפטים החשובים בעברית, תאית והגייה פשוטה",
    descriptionEn: "All key phrases in Hebrew, Thai, and simple pronunciation",
  },
  {
    titleHe: "תסריטי חירום",
    titleEn: "Emergency scripts",
    descriptionHe: "מה להגיד לרופא, משטרה, נהג או מלון כשיש בעיה",
    descriptionEn: "What to say to a doctor, police, driver, or hotel when something goes wrong",
  },
  {
    titleHe: "דף צ'יט לטלפון",
    titleEn: "Phone cheat sheet",
    descriptionHe: "גרסה קצרה לשמירה בטלפון לפני שיוצאים מהמלון",
    descriptionEn: "A short version to keep on your phone before leaving the hotel",
  },
] as const;

export function getTouristCourseLessons() {
  return TOURIST_COURSE_MODULES.map(module => {
    const lesson = lessonsData.find(item => item.id === module.lessonId);
    return { module, lesson };
  }).filter(item => Boolean(item.lesson));
}
