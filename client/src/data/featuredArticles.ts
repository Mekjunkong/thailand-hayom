export interface FeaturedArticle {
  id: number;
  slug: string;
  title: string;
  titleHe: string;
  excerpt: string;
  excerptHe: string;
  category: string;
  coverImage: string | null;
  authorId: number;
  isPremium: boolean;
  isPublished: boolean;
  gated?: boolean;
  views: number;
  publishedAt: Date;
  createdAt: Date;
  content: string;
  contentHe: string;
}

export const featuredArticles: FeaturedArticle[] = [
  {
    id: 9001,
    slug: "thai-airport-phrases-israeli-travelers",
    title: "7 Thai airport phrases Israeli travelers should learn before landing",
    titleHe: "7 ביטויים בתאית שכדאי לישראלים להכיר לפני הנחיתה",
    excerpt: "A practical first guide for landing in Thailand: SIM cards, baggage claim, taxis, and polite words that reduce stress in the first hour.",
    excerptHe: "מדריך ראשון ומעשי לנחיתה בתאילנד: סים, איסוף מזוודות, מוניות ומילים מנומסות שמורידות לחץ בשעה הראשונה.",
    category: "travel",
    coverImage: null,
    authorId: 1,
    isPremium: false,
    isPublished: true,
    gated: false,
    views: 0,
    publishedAt: new Date("2026-05-31T08:00:00.000Z"),
    createdAt: new Date("2026-05-31T08:00:00.000Z"),
    content: `## Start with the first hour, not a textbook

The first Thai you need is not grammar. It is the small set of phrases that helps you move through the airport calmly: ask where baggage claim is, buy a SIM card, find the exit, and speak politely to taxi or hotel staff.

## The 7 phrases to practice before landing

1. **สวัสดีครับ/ค่ะ — sà-wàt-dee kráp/kâ — Hello**
Use it before every request. The ending changes by speaker: usually **kráp** for men and **kâ** for women.

2. **ขอบคุณครับ/ค่ะ — khòp-khun kráp/kâ — Thank you**
This is the easiest way to sound respectful after any small help.

3. **ห้องน้ำอยู่ที่ไหน — hâwng náam yùu thîi nǎi — Where is the bathroom?**
Useful immediately after landing, at baggage claim, or before a taxi ride.

4. **รับกระเป๋าที่ไหน — ráp grà-bpǎo thîi nǎi — Where is baggage claim?**
If you are tired after the flight, show this phrase on your phone.

5. **ซิมการ์ดราคาเท่าไหร่ — sim gâat raa-khaa thâo-rài — How much is a SIM card?**
Good for comparing airport SIM counters without switching to a long English conversation.

6. **ไปโรงแรมนี้ — bpai roong-raem níi — To this hotel**
Show your hotel address and say this before entering a taxi or ride-share pickup.

7. **เปิดมิเตอร์ได้ไหม — bpèrt mii-dtə̂ə dâai măi — Can you use the meter?**
Useful in a city taxi. If the driver refuses, you can choose another taxi or app ride.

## A simple landing script

Say hello, show the phrase or address, then keep the sentence short. Thai service workers are used to tourists, so clarity is more useful than perfect pronunciation.

## Practice next

Download the free 50-phrase pack and try the two free lessons in the Tourist Survival Thai Course. The free pack is a practical checklist; the course adds listening, pronunciation, drills, and travel situations.`,
    contentHe: `## מתחילים מהשעה הראשונה, לא מספר דקדוק

התאית הראשונה שצריך היא לא דקדוק. היא אוסף קטן של משפטים שעוזר לעבור את שדה התעופה ברוגע: איפה איסוף מזוודות, איך קונים סים, איפה היציאה, ואיך לדבר בנימוס עם נהג או צוות מלון.

## 7 הביטויים שכדאי לתרגל לפני הנחיתה

1. **สวัสดีครับ/ค่ะ — sà-wàt-dee kráp/kâ — שלום**
פותח כל בקשה בצורה נעימה. הסיומת משתנה לפי הדובר: בדרך כלל **kráp** לגברים ו־**kâ** לנשים.

2. **ขอบคุณครับ/ค่ะ — khòp-khun kráp/kâ — תודה**
הדרך הכי פשוטה להישמע מכבדים אחרי כל עזרה קטנה.

3. **ห้องน้ำอยู่ที่ไหน — hâwng náam yùu thîi nǎi — איפה השירותים?**
שימושי מיד אחרי נחיתה, באזור המזוודות או לפני נסיעה ארוכה.

4. **รับกระเป๋าที่ไหน — ráp grà-bpǎo thîi nǎi — איפה אוספים מזוודות?**
אם אתם עייפים אחרי טיסה, פשוט הציגו את המשפט בטלפון.

5. **ซิมการ์ดราคาเท่าไหร่ — sim gâat raa-khaa thâo-rài — כמה עולה סים?**
טוב להשוואה קצרה בדוכני הסים בשדה בלי להיכנס לשיחה ארוכה באנגלית.

6. **ไปโรงแรมนี้ — bpai roong-raem níi — למלון הזה**
הראו את כתובת המלון ואמרו את זה לפני מונית או נקודת איסוף.

7. **เปิดมิเตอร์ได้ไหม — bpèrt mii-dtə̂ə dâai măi — אפשר להפעיל מונה?**
שימושי במונית עירונית. אם הנהג מסרב, אפשר לבחור מונית אחרת או אפליקציה.

## סקריפט נחיתה פשוט

אומרים שלום, מציגים את המשפט או הכתובת, ושומרים על משפט קצר. נותני שירות בתאילנד רגילים לתיירים, ולכן בהירות חשובה יותר מהגייה מושלמת.

## לתרגל הלאה

הורידו את חבילת 50 הביטויים בחינם ונסו את שני השיעורים החינמיים בקורס Tourist Survival Thai. החבילה היא צ'ק ליסט מעשי; הקורס מוסיף שמיעה, הגייה, תרגול וסיטואציות נסיעה.`,
  },
];

export function getFeaturedArticleBySlug(slug: string) {
  return featuredArticles.find((article) => article.slug === slug && article.isPublished);
}
