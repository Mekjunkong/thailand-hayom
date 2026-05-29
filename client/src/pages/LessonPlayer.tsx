import { useState, useCallback, useEffect, useRef } from "react";
import { useRoute, Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Heart,
  RotateCcw,
  Volume2,
  X,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGamification } from "@/contexts/GamificationContext";
import { hasCourseAccess } from "@/lib/courseAccess";
import { trpc } from "@/lib/trpc";
import { cn } from "@/lib/utils";

// slugs that are free without a purchase
const FREE_SLUGS = new Set(["airport-arrival", "food-restaurant"]);

// ─── types ────────────────────────────────────────────────────────────────────

type Phase = "listen" | "drill" | "quiz" | "score";

interface DialogueLine {
  speakerHe: string;
  speakerEn: string;
  thai: string;
  transliteration: string;
  translationHe: string;
  translationEn: string;
}

interface DrillPhrase {
  id: number;
  thai: string;
  transliteration: string;
  translationHe: string;
  translationEn: string;
  noteHe: string;
  noteEn: string;
}

type QuizQuestion =
  | {
      id: number;
      type: "meaning";
      promptHe: string;
      promptEn: string;
      thai: string;
      transliteration: string;
      options: Array<{ labelHe: string; labelEn: string }>;
      correctIndex: number;
    }
  | {
      id: number;
      type: "listen";
      promptHe: string;
      promptEn: string;
      thai: string;
      transliteration: string;
      options: Array<{ labelHe: string; labelEn: string }>;
      correctIndex: number;
    }
  | {
      id: number;
      type: "complete";
      promptHe: string;
      promptEn: string;
      beforeThai: string;
      missingThai: string;
      afterThai: string;
      transliteration: string;
      options: Array<{ labelHe: string; labelEn: string }>;
      correctIndex: number;
    };

interface MockLesson {
  id: string;
  titleHe: string;
  titleEn: string;
  chapterHe: string;
  chapterEn: string;
  dialogue: DialogueLine[];
  drillPhrases: DrillPhrase[];
  quiz: QuizQuestion[];
}

// ─── lesson data ──────────────────────────────────────────────────────────────

const LESSONS: Record<string, MockLesson> = {
  "airport-arrival": {
    id: "airport-arrival",
    titleHe: "שיעור 1 · הגעה לשדה התעופה",
    titleEn: "Lesson 1 · Airport Arrival",
    chapterHe: "פרק 1 · הגעה",
    chapterEn: "Chapter 1 · Arrival",
    dialogue: [
      {
        speakerHe: "תייר ישראלי",
        speakerEn: "Israeli tourist",
        thai: "ขอโทษครับ",
        transliteration: "Kor-toht-krap",
        translationHe: "סליחה",
        translationEn: "Excuse me",
      },
      {
        speakerHe: "אדם מקומי",
        speakerEn: "Thai person",
        thai: "ครับ มีอะไรให้ช่วยไหมครับ",
        transliteration: "Krap, mee a-rai hai chuay mai krap",
        translationHe: "כן, איך אפשר לעזור?",
        translationEn: "Yes, how can I help?",
      },
      {
        speakerHe: "תייר ישראלי",
        speakerEn: "Israeli tourist",
        thai: "แท็กซี่อยู่ที่ไหนครับ",
        transliteration: "Taek-si yoo tee-nai krap",
        translationHe: "איפה המונית?",
        translationEn: "Where is the taxi?",
      },
      {
        speakerHe: "אדם מקומי",
        speakerEn: "Thai person",
        thai: "ออกไปทางนี้ครับ แล้วเลี้ยวขวา",
        transliteration: "Ork bpai tahng nee krap laew liao kwa",
        translationHe: "לך לכיוון הזה ואז פנה ימינה",
        translationEn: "Go this way, then turn right",
      },
    ],
    drillPhrases: [
      {
        id: 1,
        thai: "ขอโทษครับ",
        transliteration: "Kor-toht-krap",
        translationHe: "סליחה (גבר)",
        translationEn: "Excuse me (male)",
        noteHe: "משפט פתיחה בטוח כשאתם צריכים עזרה.",
        noteEn: "Your safest opener when you need help.",
      },
      {
        id: 2,
        thai: "ขอโทษค่ะ",
        transliteration: "Kor-toht-kha",
        translationHe: "סליחה (אישה)",
        translationEn: "Excuse me (female)",
        noteHe: "אותה מילה — רק הסיומת משתנה לפי מגדר.",
        noteEn: "Same word — only the particle changes by gender.",
      },
      {
        id: 3,
        thai: "ช่วยได้ไหม",
        transliteration: "Chuay dai mai",
        translationHe: "אתה יכול לעזור?",
        translationEn: "Can you help?",
        noteHe: "שימושי כשאתם תקועים.",
        noteEn: "Useful when you are stuck.",
      },
      {
        id: 4,
        thai: "อยู่ที่ไหน",
        transliteration: "Yoo tee-nai",
        translationHe: "איפה נמצא...?",
        translationEn: "Where is...?",
        noteHe: "שאלת הכיוון הבסיסית.",
        noteEn: "The basic direction question.",
      },
      {
        id: 5,
        thai: "ไปทางนี้",
        transliteration: "Bpai tahng nee",
        translationHe: "לך לכיוון הזה",
        translationEn: "Go this way",
        noteHe: "תשמעו את זה הרבה מאנשים שמכוונים אתכם.",
        noteEn: "You will hear this a lot from people directing you.",
      },
      {
        id: 6,
        thai: "เลี้ยวขวา",
        transliteration: "Liao kwa",
        translationHe: "פנה ימינה",
        translationEn: "Turn right",
        noteHe: "זכרו: ขวา = ימין, ซ้าย = שמאל",
        noteEn: "Remember: ขวา = right, ซ้าย = left",
      },
      {
        id: 7,
        thai: "เลี้ยวซ้าย",
        transliteration: "Liao sai",
        translationHe: "פנה שמאלה",
        translationEn: "Turn left",
        noteHe: "זוג של עם הביטוי הקודם.",
        noteEn: "Pair this with the previous phrase.",
      },
      {
        id: 8,
        thai: "ขอบคุณครับ",
        transliteration: "Korp-kun-krap",
        translationHe: "תודה (גבר)",
        translationEn: "Thank you (male)",
        noteHe: "תמיד לסיים בתודה — זה מאוד מכובד בתאילנד.",
        noteEn: "Always close with thanks — very respected in Thailand.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "ขอโทษครับ",
        transliteration: "Kor-toht-krap",
        options: [
          { labelHe: "תודה", labelEn: "Thank you" },
          { labelHe: "סליחה", labelEn: "Excuse me" },
          { labelHe: "שלום", labelEn: "Hello" },
          { labelHe: "להתראות", labelEn: "Goodbye" },
        ],
        correctIndex: 1,
      },
      {
        id: 2,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "อยู่ที่ไหน",
        transliteration: "Yoo tee-nai",
        options: [
          { labelHe: "כמה זה עולה?", labelEn: "How much?" },
          { labelHe: "איפה נמצא?", labelEn: "Where is...?" },
          { labelHe: "מה השם שלך?", labelEn: "What's your name?" },
          { labelHe: "אני רוצה", labelEn: "I want" },
        ],
        correctIndex: 1,
      },
      {
        id: 3,
        type: "listen",
        promptHe: "שמעו וזהו:",
        promptEn: "Listen and identify:",
        thai: "เลี้ยวขวา",
        transliteration: "Liao kwa",
        options: [
          { labelHe: "פנה ימינה", labelEn: "Turn right" },
          { labelHe: "פנה שמאלה", labelEn: "Turn left" },
          { labelHe: "לך ישר", labelEn: "Go straight" },
          { labelHe: "עצור כאן", labelEn: "Stop here" },
        ],
        correctIndex: 0,
      },
      {
        id: 4,
        type: "complete",
        promptHe: "השלימו את המשפט:",
        promptEn: "Complete the sentence:",
        beforeThai: "แท็กซี่",
        missingThai: "___",
        afterThai: "ที่ไหนครับ",
        transliteration: "Taek-si ___ tee-nai krap",
        options: [
          { labelHe: "อยู่ (yoo)", labelEn: "อยู่ (yoo)" },
          { labelHe: "ไป (bpai)", labelEn: "ไป (bpai)" },
          { labelHe: "มา (ma)", labelEn: "มา (ma)" },
          { labelHe: "ดี (dee)", labelEn: "ดี (dee)" },
        ],
        correctIndex: 0,
      },
      {
        id: 5,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "ขอบคุณครับ",
        transliteration: "Korp-kun-krap",
        options: [
          { labelHe: "בבקשה", labelEn: "Please" },
          { labelHe: "לא", labelEn: "No" },
          { labelHe: "תודה", labelEn: "Thank you" },
          { labelHe: "כן", labelEn: "Yes" },
        ],
        correctIndex: 2,
      },
    ],
  },

  "taxi-transport": {
    id: "taxi-transport",
    titleHe: "שיעור 2 · מונית וכיוונים",
    titleEn: "Lesson 2 · Taxi & Directions",
    chapterHe: "פרק 2 · תחבורה",
    chapterEn: "Chapter 2 · Transport",
    dialogue: [
      {
        speakerHe: "תייר ישראלי",
        speakerEn: "Israeli tourist",
        thai: "ไปโรงแรมนี้ครับ",
        transliteration: "Bpai rohng-raem nee krap",
        translationHe: "למלון הזה בבקשה",
        translationEn: "To this hotel please",
      },
      {
        speakerHe: "נהג",
        speakerEn: "Driver",
        thai: "ได้ครับ ราคาเท่าไหร่ครับ",
        transliteration: "Dai krap, ra-kah tao-rai krap",
        translationHe: "בסדר, כמה המחיר?",
        translationEn: "OK, how much is the price?",
      },
      {
        speakerHe: "תייר ישראלי",
        speakerEn: "Israeli tourist",
        thai: "ขอมิเตอร์ครับ",
        transliteration: "Kor mee-ter krap",
        translationHe: "בבקשה מד מרחק",
        translationEn: "Meter please",
      },
      {
        speakerHe: "תייר ישראלי",
        speakerEn: "Israeli tourist",
        thai: "จอดที่นี่ครับ",
        transliteration: "Jort tee-nee krap",
        translationHe: "עצור כאן בבקשה",
        translationEn: "Stop here please",
      },
    ],
    drillPhrases: [
      {
        id: 1,
        thai: "ไปที่นี่ครับ",
        transliteration: "Bpai tee-nee krap",
        translationHe: "לכאן בבקשה (גבר)",
        translationEn: "Go here please (male)",
        noteHe: "הראו את המיקום על הטלפון.",
        noteEn: "Show the location on your phone.",
      },
      {
        id: 2,
        thai: "ขอมิเตอร์ครับ",
        transliteration: "Kor mee-ter krap",
        translationHe: "מד מרחק בבקשה",
        translationEn: "Meter please",
        noteHe: "תמיד בקשו מד — זה החוק.",
        noteEn: "Always ask for the meter — it's the law.",
      },
      {
        id: 3,
        thai: "เท่าไหร่ครับ",
        transliteration: "Tao-rai krap",
        translationHe: "כמה זה?",
        translationEn: "How much?",
        noteHe: "השאלה החשובה ביותר בשוק ובמונית.",
        noteEn: "The most important question at markets and in taxis.",
      },
      {
        id: 4,
        thai: "จอดที่นี่ครับ",
        transliteration: "Jort tee-nee krap",
        translationHe: "עצור כאן (גבר)",
        translationEn: "Stop here (male)",
        noteHe: "אמרו את זה ברור כשאתם מגיעים.",
        noteEn: "Say this clearly when you arrive.",
      },
      {
        id: 5,
        thai: "ตรงไปครับ",
        transliteration: "Dtrong bpai krap",
        translationHe: "ישר קדימה",
        translationEn: "Straight ahead",
        noteHe: "זוג עם ימין ושמאל.",
        noteEn: "Pair with right and left.",
      },
      {
        id: 6,
        thai: "เลี้ยวขวาครับ",
        transliteration: "Liao kwa krap",
        translationHe: "ימינה בבקשה",
        translationEn: "Turn right please",
        noteHe: "ขวา = ימין, ซ้าย = שמאל.",
        noteEn: "ขวา = right, ซ้าย = left.",
      },
      {
        id: 7,
        thai: "ไม่ต้องทอนครับ",
        transliteration: "Mai dtong torn krap",
        translationHe: "אין צורך בעודף",
        translationEn: "No change needed",
        noteHe: "בקש שלא יעניק עודף — טיפ בתאילנד.",
        noteEn: "Decline change as a tip in Thailand.",
      },
      {
        id: 8,
        thai: "ขอบคุณครับ",
        transliteration: "Korp-kun-krap",
        translationHe: "תודה (גבר)",
        translationEn: "Thank you (male)",
        noteHe: "תמיד לסיים בתודה.",
        noteEn: "Always close with thanks.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "ขอมิเตอร์ครับ",
        transliteration: "Kor mee-ter krap",
        options: [
          { labelHe: "עצור כאן", labelEn: "Stop here" },
          { labelHe: "מד מרחק בבקשה", labelEn: "Meter please" },
          { labelHe: "כמה זה?", labelEn: "How much?" },
          { labelHe: "ישר קדימה", labelEn: "Straight" },
        ],
        correctIndex: 1,
      },
      {
        id: 2,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "จอดที่นี่ครับ",
        transliteration: "Jort tee-nee krap",
        options: [
          { labelHe: "לכאן", labelEn: "Go here" },
          { labelHe: "ממהר!", labelEn: "Hurry!" },
          { labelHe: "עצור כאן", labelEn: "Stop here" },
          { labelHe: "פנה ימינה", labelEn: "Turn right" },
        ],
        correctIndex: 2,
      },
      {
        id: 3,
        type: "listen",
        promptHe: "שמעו וזהו:",
        promptEn: "Listen and identify:",
        thai: "เท่าไหร่ครับ",
        transliteration: "Tao-rai krap",
        options: [
          { labelHe: "כמה זה?", labelEn: "How much?" },
          { labelHe: "שלום", labelEn: "Hello" },
          { labelHe: "תודה", labelEn: "Thank you" },
          { labelHe: "בבקשה", labelEn: "Please" },
        ],
        correctIndex: 0,
      },
      {
        id: 4,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "ตรงไปครับ",
        transliteration: "Dtrong bpai krap",
        options: [
          { labelHe: "פנה שמאלה", labelEn: "Turn left" },
          { labelHe: "ישר קדימה", labelEn: "Straight ahead" },
          { labelHe: "עצור כאן", labelEn: "Stop here" },
          { labelHe: "פנה ימינה", labelEn: "Turn right" },
        ],
        correctIndex: 1,
      },
      {
        id: 5,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "ไม่ต้องทอนครับ",
        transliteration: "Mai dtong torn krap",
        options: [
          { labelHe: "אין בעיה", labelEn: "No problem" },
          { labelHe: "אין עודף", labelEn: "No change needed" },
          { labelHe: "לא תודה", labelEn: "No thank you" },
          { labelHe: "לא רחוק", labelEn: "Not far" },
        ],
        correctIndex: 1,
      },
    ],
  },

  "food-restaurant": {
    id: "food-restaurant",
    titleHe: "שיעור 3 · אוכל ומסעדות",
    titleEn: "Lesson 3 · Food & Restaurants",
    chapterHe: "פרק 3 · אוכל",
    chapterEn: "Chapter 3 · Food",
    dialogue: [
      {
        speakerHe: "מלצר",
        speakerEn: "Waiter",
        thai: "สั่งอะไรดีครับ",
        transliteration: "Sang a-rai dee krap",
        translationHe: "מה תרצו להזמין?",
        translationEn: "What would you like to order?",
      },
      {
        speakerHe: "תייר ישראלי",
        speakerEn: "Israeli tourist",
        thai: "ขอผัดไทยครับ ไม่เผ็ดครับ",
        transliteration: "Kor pad-tai krap, mai-pet krap",
        translationHe: "פאד-טאי בבקשה, לא חריף",
        translationEn: "Pad Thai please, not spicy",
      },
      {
        speakerHe: "מלצר",
        speakerEn: "Waiter",
        thai: "แพ้อาหารอะไรไหมครับ",
        transliteration: "Pae a-harn a-rai mai krap",
        translationHe: "יש לך אלרגיה למשהו?",
        translationEn: "Do you have any allergies?",
      },
      {
        speakerHe: "תייר ישראלי",
        speakerEn: "Israeli tourist",
        thai: "ไม่ใส่ถั่วลิสงครับ",
        transliteration: "Mai sai tua-li-song krap",
        translationHe: "בלי בוטנים בבקשה",
        translationEn: "No peanuts please",
      },
    ],
    drillPhrases: [
      {
        id: 1,
        thai: "ไม่เผ็ดครับ",
        transliteration: "Mai-pet krap",
        translationHe: "לא חריף (גבר)",
        translationEn: "Not spicy (male)",
        noteHe: "המשפט החשוב ביותר בתאילנד!",
        noteEn: "The most important phrase in Thailand!",
      },
      {
        id: 2,
        thai: "ไม่เผ็ดค่ะ",
        transliteration: "Mai-pet kha",
        translationHe: "לא חריף (אישה)",
        translationEn: "Not spicy (female)",
        noteHe: "אותה משמעות, סיומת שונה.",
        noteEn: "Same meaning, different particle.",
      },
      {
        id: 3,
        thai: "อร่อยมากครับ",
        transliteration: "A-roi mak krap",
        translationHe: "מאוד טעים! (גבר)",
        translationEn: "Very delicious! (male)",
        noteHe: "ישמח את השף.",
        noteEn: "Will make the chef happy.",
      },
      {
        id: 4,
        thai: "ขอน้ำเปล่าครับ",
        transliteration: "Kor nam-bplao krap",
        translationHe: "מים רגילים בבקשה",
        translationEn: "Plain water please",
        noteHe: "น้ำเปล่า = מים רגילים, ไม่มีน้ำแข็ง = בלי קרח.",
        noteEn: "น้ำเปล่า = plain water, ไม่มีน้ำแข็ง = no ice.",
      },
      {
        id: 5,
        thai: "เก็บเงินด้วยครับ",
        transliteration: "Gep-ngern duay krap",
        translationHe: "חשבון בבקשה",
        translationEn: "Bill please",
        noteHe: "תשמעו את זה הרבה — זה קריאה לחשבון.",
        noteEn: "You'll use this at the end of every meal.",
      },
      {
        id: 6,
        thai: "ไม่ใส่ผักชีครับ",
        transliteration: "Mai sai pak-chee krap",
        translationHe: "בלי כוסברה",
        translationEn: "No cilantro",
        noteHe: "הרבה מאכלים מגיעים עם כוסברה.",
        noteEn: "Many dishes come with cilantro.",
      },
      {
        id: 7,
        thai: "เผ็ดนิดหน่อยได้ครับ",
        transliteration: "Pet nit-noi dai krap",
        translationHe: "קצת חריף זה בסדר",
        translationEn: "A little spicy is OK",
        noteHe: "אם אתם אוהבים קצת חריפות.",
        noteEn: "If you like just a touch of heat.",
      },
      {
        id: 8,
        thai: "แนะนำอะไรดีครับ",
        transliteration: "Nae-nam a-rai dee krap",
        translationHe: "מה אתם ממליצים?",
        translationEn: "What do you recommend?",
        noteHe: "שאלה נהדרת — תקבלו מנה מקומית אמיתית.",
        noteEn: "Great question — you'll get the real local dish.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "ไม่เผ็ดครับ",
        transliteration: "Mai-pet krap",
        options: [
          { labelHe: "לא חריף", labelEn: "Not spicy" },
          { labelHe: "לא כבד", labelEn: "Not heavy" },
          { labelHe: "לא יקר", labelEn: "Not expensive" },
          { labelHe: "לא מתוק", labelEn: "Not sweet" },
        ],
        correctIndex: 0,
      },
      {
        id: 2,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "อร่อยมากครับ",
        transliteration: "A-roi mak krap",
        options: [
          { labelHe: "מאוד יקר!", labelEn: "Very expensive!" },
          { labelHe: "מאוד חריף!", labelEn: "Very spicy!" },
          { labelHe: "מאוד טעים!", labelEn: "Very delicious!" },
          { labelHe: "מאוד קר!", labelEn: "Very cold!" },
        ],
        correctIndex: 2,
      },
      {
        id: 3,
        type: "listen",
        promptHe: "שמעו וזהו:",
        promptEn: "Listen and identify:",
        thai: "เก็บเงินด้วยครับ",
        transliteration: "Gep-ngern duay krap",
        options: [
          { labelHe: "חשבון בבקשה", labelEn: "Bill please" },
          { labelHe: "מים בבקשה", labelEn: "Water please" },
          { labelHe: "עוד אחד", labelEn: "One more" },
          { labelHe: "תודה", labelEn: "Thank you" },
        ],
        correctIndex: 0,
      },
      {
        id: 4,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "ไม่ใส่ผักชีครับ",
        transliteration: "Mai sai pak-chee krap",
        options: [
          { labelHe: "בלי בוטנים", labelEn: "No peanuts" },
          { labelHe: "בלי ביצים", labelEn: "No eggs" },
          { labelHe: "בלי כוסברה", labelEn: "No cilantro" },
          { labelHe: "בלי פלפל", labelEn: "No pepper" },
        ],
        correctIndex: 2,
      },
      {
        id: 5,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "แนะนำอะไรดีครับ",
        transliteration: "Nae-nam a-rai dee krap",
        options: [
          { labelHe: "מה השעה?", labelEn: "What time is it?" },
          { labelHe: "מה אתם ממליצים?", labelEn: "What do you recommend?" },
          { labelHe: "אפשר עוד?", labelEn: "Can I have more?" },
          { labelHe: "זה כבד מדי", labelEn: "It's too heavy" },
        ],
        correctIndex: 1,
      },
    ],
  },

  "shopping-market": {
    id: "shopping-market",
    titleHe: "שיעור 4 · שוק וקניות",
    titleEn: "Lesson 4 · Shopping & Bargaining",
    chapterHe: "פרק 4 · קניות",
    chapterEn: "Chapter 4 · Shopping",
    dialogue: [
      {
        speakerHe: "תייר ישראלי",
        speakerEn: "Israeli tourist",
        thai: "อันนี้เท่าไหร่ครับ",
        transliteration: "An-nee tao-rai krap",
        translationHe: "כמה עולה זה?",
        translationEn: "How much is this?",
      },
      {
        speakerHe: "מוכר",
        speakerEn: "Vendor",
        thai: "สามร้อยบาทครับ",
        transliteration: "Sam roy baht krap",
        translationHe: "שלוש מאות בהט",
        translationEn: "Three hundred baht",
      },
      {
        speakerHe: "תייר ישראלי",
        speakerEn: "Israeli tourist",
        thai: "ลดราคาได้ไหมครับ",
        transliteration: "Lot ra-kah dai mai krap",
        translationHe: "אפשר להוריד מחיר?",
        translationEn: "Can you lower the price?",
      },
      {
        speakerHe: "מוכר",
        speakerEn: "Vendor",
        thai: "สองร้อยห้าสิบบาทครับ",
        transliteration: "Song roy ha-sip baht krap",
        translationHe: "מאתיים וחמישים בהט",
        translationEn: "Two hundred fifty baht",
      },
    ],
    drillPhrases: [
      {
        id: 1,
        thai: "อันนี้เท่าไหร่ครับ",
        transliteration: "An-nee tao-rai krap",
        translationHe: "כמה עולה זה?",
        translationEn: "How much is this?",
        noteHe: "הצביעו על הפריט.",
        noteEn: "Point at the item.",
      },
      {
        id: 2,
        thai: "ลดราคาได้ไหมครับ",
        transliteration: "Lot ra-kah dai mai krap",
        translationHe: "אפשר להוריד?",
        translationEn: "Can you lower the price?",
        noteHe: "אמרו בנחת עם חיוך.",
        noteEn: "Say this gently with a smile.",
      },
      {
        id: 3,
        thai: "แพงไปครับ",
        transliteration: "Paeng bpai krap",
        translationHe: "זה יקר מדי",
        translationEn: "Too expensive",
        noteHe: "עיקרון השיחוח בשוק.",
        noteEn: "The key bargaining phrase.",
      },
      {
        id: 4,
        thai: "ขอดูได้ไหมครับ",
        transliteration: "Kor doo dai mai krap",
        translationHe: "אפשר לראות?",
        translationEn: "Can I see it?",
        noteHe: "לפני שקונים.",
        noteEn: "Before buying.",
      },
      {
        id: 5,
        thai: "เอาครับ",
        transliteration: "Ao krap",
        translationHe: "אני לוקח",
        translationEn: "I'll take it",
        noteHe: "קצר ויעיל לסגירת עסקה.",
        noteEn: "Short and effective to close the deal.",
      },
      {
        id: 6,
        thai: "ไม่เอาครับ",
        transliteration: "Mai ao krap",
        translationHe: "אני לא לוקח",
        translationEn: "I won't take it",
        noteHe: "לדחות בנעימות.",
        noteEn: "Polite refusal.",
      },
      {
        id: 7,
        thai: "มีสีอื่นไหมครับ",
        transliteration: "Mee see eun mai krap",
        translationHe: "יש צבע אחר?",
        translationEn: "Any other colors?",
        noteHe: "לשאול על אפשרויות.",
        noteEn: "Ask about options.",
      },
      {
        id: 8,
        thai: "ห่อของให้หน่อยครับ",
        transliteration: "Hor kong hai noi krap",
        translationHe: "תעטוף לי בבקשה",
        translationEn: "Please wrap it",
        noteHe: "לאחר קניה.",
        noteEn: "After purchasing.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "แพงไปครับ",
        transliteration: "Paeng bpai krap",
        options: [
          { labelHe: "זה בסדר", labelEn: "That's fine" },
          { labelHe: "זה יקר מדי", labelEn: "Too expensive" },
          { labelHe: "זה זול מדי", labelEn: "Too cheap" },
          { labelHe: "אני אקנה", labelEn: "I'll buy it" },
        ],
        correctIndex: 1,
      },
      {
        id: 2,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "ลดราคาได้ไหมครับ",
        transliteration: "Lot ra-kah dai mai krap",
        options: [
          { labelHe: "אפשר לראות?", labelEn: "Can I see it?" },
          { labelHe: "כמה זה?", labelEn: "How much?" },
          { labelHe: "אפשר הנחה?", labelEn: "Can you lower the price?" },
          { labelHe: "אני לא לוקח", labelEn: "I won't take it" },
        ],
        correctIndex: 2,
      },
      {
        id: 3,
        type: "listen",
        promptHe: "שמעו וזהו:",
        promptEn: "Listen and identify:",
        thai: "เอาครับ",
        transliteration: "Ao krap",
        options: [
          { labelHe: "אני לוקח", labelEn: "I'll take it" },
          { labelHe: "אני לא לוקח", labelEn: "I won't take it" },
          { labelHe: "כמה זה?", labelEn: "How much?" },
          { labelHe: "מה זה?", labelEn: "What is this?" },
        ],
        correctIndex: 0,
      },
      {
        id: 4,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "ไม่เอาครับ",
        transliteration: "Mai ao krap",
        options: [
          { labelHe: "אני לוקח", labelEn: "I'll take it" },
          { labelHe: "לא תודה", labelEn: "No thank you" },
          { labelHe: "אני לא לוקח", labelEn: "I won't take it" },
          { labelHe: "כן תודה", labelEn: "Yes thank you" },
        ],
        correctIndex: 2,
      },
      {
        id: 5,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "มีสีอื่นไหมครับ",
        transliteration: "Mee see eun mai krap",
        options: [
          { labelHe: "יש מידה אחרת?", labelEn: "Any other sizes?" },
          { labelHe: "יש צבע אחר?", labelEn: "Any other colors?" },
          { labelHe: "יש סגנון אחר?", labelEn: "Any other styles?" },
          { labelHe: "יש מחיר טוב יותר?", labelEn: "A better price?" },
        ],
        correctIndex: 1,
      },
    ],
  },

  "hotel-checkin": {
    id: "hotel-checkin",
    titleHe: "שיעור 5 · מלון וצ'ק-אין",
    titleEn: "Lesson 5 · Hotel & Check-in",
    chapterHe: "פרק 5 · מלון",
    chapterEn: "Chapter 5 · Hotel",
    dialogue: [
      {
        speakerHe: "תייר ישראלי",
        speakerEn: "Israeli tourist",
        thai: "เช็คอินครับ",
        transliteration: "Check-in krap",
        translationHe: "צ'ק-אין בבקשה",
        translationEn: "Check in please",
      },
      {
        speakerHe: "פקיד קבלה",
        speakerEn: "Receptionist",
        thai: "ขอพาสปอร์ตหน่อยครับ",
        transliteration: "Kor passport noi krap",
        translationHe: "הדרכון שלך בבקשה",
        translationEn: "Your passport please",
      },
      {
        speakerHe: "תייר ישראלי",
        speakerEn: "Israeli tourist",
        thai: "ห้องน้ำใช้ไม่ได้ครับ",
        transliteration: "Hong-nam chai mai dai krap",
        translationHe: "השירותים לא עובדים",
        translationEn: "The bathroom isn't working",
      },
      {
        speakerHe: "פקיד קבלה",
        speakerEn: "Receptionist",
        thai: "ขอโทษครับ จะส่งช่างให้ทันทีครับ",
        transliteration: "Kor-toht krap, ja song chang hai tan-tee krap",
        translationHe: "מצטער, אשלח טכנאי מיד",
        translationEn: "Sorry, I'll send a technician immediately",
      },
    ],
    drillPhrases: [
      {
        id: 1,
        thai: "เช็คอินครับ",
        transliteration: "Check-in krap",
        translationHe: "צ'ק-אין (גבר)",
        translationEn: "Check in (male)",
        noteHe: "אותה מילה כמו באנגלית.",
        noteEn: "Same word as in English.",
      },
      {
        id: 2,
        thai: "ขอผ้าเช็ดตัวครับ",
        transliteration: "Kor pha-chet-dtua krap",
        translationHe: "מגבת בבקשה",
        translationEn: "Towel please",
        noteHe: "שימושי כשהמגבת אזלה.",
        noteEn: "Useful when towels run out.",
      },
      {
        id: 3,
        thai: "แอร์ไม่เย็นครับ",
        transliteration: "Air mai yen krap",
        translationHe: "המזגן לא קר",
        translationEn: "The AC is not cold",
        noteHe: "בתאילנד — חשוב!",
        noteEn: "In Thailand — important!",
      },
      {
        id: 4,
        thai: "ขอเปลี่ยนห้องครับ",
        transliteration: "Kor bplian hong krap",
        translationHe: "אני רוצה לשנות חדר",
        translationEn: "I'd like to change rooms",
        noteHe: "אם יש בעיה בחדר.",
        noteEn: "If there's a problem with your room.",
      },
      {
        id: 5,
        thai: "เช็คเอาท์กี่โมงครับ",
        transliteration: "Check-out gee mong krap",
        translationHe: "מתי הצ'ק-אאוט?",
        translationEn: "What time is check-out?",
        noteHe: "שאלו ביום הקודם.",
        noteEn: "Ask the day before.",
      },
      {
        id: 6,
        thai: "ฝากกระเป๋าได้ไหมครับ",
        transliteration: "Fak gra-bpao dai mai krap",
        translationHe: "אפשר לשמור מזוודה?",
        translationEn: "Can I store my luggage?",
        noteHe: "אחרי צ'ק-אאוט.",
        noteEn: "After check-out.",
      },
      {
        id: 7,
        thai: "wifi รหัสคืออะไรครับ",
        transliteration: "WiFi ra-hat kue a-rai krap",
        translationHe: "מה הסיסמה לוויפיי?",
        translationEn: "What's the WiFi password?",
        noteHe: "השאלה הראשונה בכל מקום.",
        noteEn: "The first question everywhere.",
      },
      {
        id: 8,
        thai: "ขอบคุณมากครับ",
        transliteration: "Korp-kun mak krap",
        translationHe: "תודה רבה (גבר)",
        translationEn: "Thank you very much (male)",
        noteHe: "מאוד מנומס.",
        noteEn: "Very polite.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "ขอผ้าเช็ดตัวครับ",
        transliteration: "Kor pha-chet-dtua krap",
        options: [
          { labelHe: "סבון בבקשה", labelEn: "Soap please" },
          { labelHe: "מגבת בבקשה", labelEn: "Towel please" },
          { labelHe: "כרית בבקשה", labelEn: "Pillow please" },
          { labelHe: "שמיכה בבקשה", labelEn: "Blanket please" },
        ],
        correctIndex: 1,
      },
      {
        id: 2,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "แอร์ไม่เย็นครับ",
        transliteration: "Air mai yen krap",
        options: [
          { labelHe: "אין חשמל", labelEn: "No electricity" },
          { labelHe: "המזגן לא קר", labelEn: "The AC is not cold" },
          { labelHe: "המים לא חמים", labelEn: "The water is not hot" },
          { labelHe: "הדלת לא נועלת", labelEn: "The door doesn't lock" },
        ],
        correctIndex: 1,
      },
      {
        id: 3,
        type: "listen",
        promptHe: "שמעו וזהו:",
        promptEn: "Listen and identify:",
        thai: "wifi รหัสคืออะไรครับ",
        transliteration: "WiFi ra-hat kue a-rai krap",
        options: [
          {
            labelHe: "מה הסיסמה לוויפיי?",
            labelEn: "What's the WiFi password?",
          },
          { labelHe: "מתי הצ'ק-אאוט?", labelEn: "What time is check-out?" },
          { labelHe: "יש מסעדה?", labelEn: "Is there a restaurant?" },
          { labelHe: "איפה החדר?", labelEn: "Where is the room?" },
        ],
        correctIndex: 0,
      },
      {
        id: 4,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "ฝากกระเป๋าได้ไหมครับ",
        transliteration: "Fak gra-bpao dai mai krap",
        options: [
          { labelHe: "אפשר לשמור מזוודה?", labelEn: "Can I store my luggage?" },
          { labelHe: "איפה הלובי?", labelEn: "Where is the lobby?" },
          { labelHe: "אפשר לשדרג חדר?", labelEn: "Can I upgrade my room?" },
          { labelHe: "יש מחסן?", labelEn: "Is there a storage room?" },
        ],
        correctIndex: 0,
      },
      {
        id: 5,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "ขอเปลี่ยนห้องครับ",
        transliteration: "Kor bplian hong krap",
        options: [
          { labelHe: "אפשר מפתח נוסף?", labelEn: "Can I get another key?" },
          {
            labelHe: "אני רוצה לשנות חדר",
            labelEn: "I'd like to change rooms",
          },
          { labelHe: "החדר מלוכלך", labelEn: "The room is dirty" },
          { labelHe: "יש חדר גדול יותר?", labelEn: "Is there a bigger room?" },
        ],
        correctIndex: 1,
      },
    ],
  },

  "emergency-health": {
    id: "emergency-health",
    titleHe: "שיעור 6 · חירום ובריאות",
    titleEn: "Lesson 6 · Emergency & Health",
    chapterHe: "פרק 6 · חירום",
    chapterEn: "Chapter 6 · Emergency",
    dialogue: [
      {
        speakerHe: "תייר ישראלי",
        speakerEn: "Israeli tourist",
        thai: "ช่วยด้วยครับ",
        transliteration: "Chuay duay krap",
        translationHe: "עזרה!",
        translationEn: "Help!",
      },
      {
        speakerHe: "אדם מקומי",
        speakerEn: "Thai person",
        thai: "เป็นอะไรครับ",
        transliteration: "Bpen a-rai krap",
        translationHe: "מה קרה?",
        translationEn: "What happened?",
      },
      {
        speakerHe: "תייר ישראלי",
        speakerEn: "Israeli tourist",
        thai: "ต้องการหมอครับ",
        transliteration: "Dtong-garn mor krap",
        translationHe: "אני צריך רופא",
        translationEn: "I need a doctor",
      },
      {
        speakerHe: "אדם מקומי",
        speakerEn: "Thai person",
        thai: "โรงพยาบาลอยู่ใกล้ครับ จะพาไปครับ",
        transliteration: "Rohng-pa-ya-barn yoo glai krap, ja pa bpai krap",
        translationHe: "בית החולים קרוב, אני אלך איתך",
        translationEn: "The hospital is nearby, I'll take you",
      },
    ],
    drillPhrases: [
      {
        id: 1,
        thai: "ช่วยด้วยครับ",
        transliteration: "Chuay duay krap",
        translationHe: "עזרה! (גבר)",
        translationEn: "Help! (male)",
        noteHe: "המשפט החשוב ביותר.",
        noteEn: "The most important phrase.",
      },
      {
        id: 2,
        thai: "ต้องการหมอครับ",
        transliteration: "Dtong-garn mor krap",
        translationHe: "אני צריך רופא",
        translationEn: "I need a doctor",
        noteHe: "ברור ופשוט לשיימוש חירום.",
        noteEn: "Clear and simple for emergencies.",
      },
      {
        id: 3,
        thai: "โรงพยาบาลอยู่ที่ไหนครับ",
        transliteration: "Rohng-pa-ya-barn yoo tee-nai krap",
        translationHe: "איפה בית החולים?",
        translationEn: "Where is the hospital?",
        noteHe: "חשוב לדעת.",
        noteEn: "Important to know.",
      },
      {
        id: 4,
        thai: "เรียกตำรวจด้วยครับ",
        transliteration: "Riak dta-ruat duay krap",
        translationHe: "תקרא למשטרה",
        translationEn: "Call the police",
        noteHe: "ตำรวจ = משטרה.",
        noteEn: "ตำรวจ = police.",
      },
      {
        id: 5,
        thai: "ปวดท้องครับ",
        transliteration: "Bpuat tong krap",
        translationHe: "כואב לי הבטן",
        translationEn: "I have a stomachache",
        noteHe: "ปวด = כאב, ท้อง = בטן.",
        noteEn: "ปวด = pain, ท้อง = stomach.",
      },
      {
        id: 6,
        thai: "มีไข้ครับ",
        transliteration: "Mee kai krap",
        translationHe: "יש לי חום",
        translationEn: "I have a fever",
        noteHe: "ไข้ = חום.",
        noteEn: "ไข้ = fever.",
      },
      {
        id: 7,
        thai: "แพ้ยาครับ",
        transliteration: "Pae ya krap",
        translationHe: "יש לי אלרגיה לתרופות",
        translationEn: "I have a medicine allergy",
        noteHe: "חשוב לומר לרופא.",
        noteEn: "Important to tell the doctor.",
      },
      {
        id: 8,
        thai: "โทรหาสถานทูตด้วยครับ",
        transliteration: "Tor ha sa-tan-toot duay krap",
        translationHe: "צלצל לשגרירות",
        translationEn: "Call the embassy",
        noteHe: "שגרירות ישראל בבנגקוק: +66-2-204-9200.",
        noteEn: "Israeli Embassy in Bangkok: +66-2-204-9200.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "ช่วยด้วยครับ",
        transliteration: "Chuay duay krap",
        options: [
          { labelHe: "עזרה!", labelEn: "Help!" },
          { labelHe: "סליחה!", labelEn: "Excuse me!" },
          { labelHe: "רגע!", labelEn: "Wait!" },
          { labelHe: "הודה!", labelEn: "Thanks!" },
        ],
        correctIndex: 0,
      },
      {
        id: 2,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "ต้องการหมอครับ",
        transliteration: "Dtong-garn mor krap",
        options: [
          { labelHe: "אני צריך מים", labelEn: "I need water" },
          { labelHe: "אני צריך עזרה", labelEn: "I need help" },
          { labelHe: "אני צריך רופא", labelEn: "I need a doctor" },
          { labelHe: "אני צריך משטרה", labelEn: "I need police" },
        ],
        correctIndex: 2,
      },
      {
        id: 3,
        type: "listen",
        promptHe: "שמעו וזהו:",
        promptEn: "Listen and identify:",
        thai: "มีไข้ครับ",
        transliteration: "Mee kai krap",
        options: [
          { labelHe: "יש לי חום", labelEn: "I have a fever" },
          { labelHe: "כואב לי הראש", labelEn: "I have a headache" },
          { labelHe: "אני חלש", labelEn: "I feel weak" },
          { labelHe: "אני סחרחר", labelEn: "I feel dizzy" },
        ],
        correctIndex: 0,
      },
      {
        id: 4,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "เรียกตำรวจด้วยครับ",
        transliteration: "Riak dta-ruat duay krap",
        options: [
          { labelHe: "תקרא לאמבולנס", labelEn: "Call an ambulance" },
          { labelHe: "תקרא לרופא", labelEn: "Call a doctor" },
          { labelHe: "תקרא למשטרה", labelEn: "Call the police" },
          { labelHe: "תקרא לשגרירות", labelEn: "Call the embassy" },
        ],
        correctIndex: 2,
      },
      {
        id: 5,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "ปวดท้องครับ",
        transliteration: "Bpuat tong krap",
        options: [
          { labelHe: "כואב לי הגב", labelEn: "My back hurts" },
          { labelHe: "כואב לי הראש", labelEn: "My head hurts" },
          { labelHe: "כואב לי הבטן", labelEn: "My stomach hurts" },
          { labelHe: "כואב לי הרגל", labelEn: "My leg hurts" },
        ],
        correctIndex: 2,
      },
    ],
  },

  "small-talk": {
    id: "small-talk",
    titleHe: "שיעור 7 · שיחה קצרה",
    titleEn: "Lesson 7 · Small Talk",
    chapterHe: "פרק 7 · שיחה",
    chapterEn: "Chapter 7 · Conversation",
    dialogue: [
      {
        speakerHe: "תייר ישראלי",
        speakerEn: "Israeli tourist",
        thai: "คุณพูดภาษาอังกฤษได้ไหมครับ",
        transliteration: "Khun phoot pha-sa ang-grit dai mai krap",
        translationHe: "אתה מדבר אנגלית?",
        translationEn: "Do you speak English?",
      },
      {
        speakerHe: "אדם מקומי",
        speakerEn: "Thai person",
        thai: "นิดหน่อยครับ",
        transliteration: "Nit-noi krap",
        translationHe: "קצת",
        translationEn: "A little",
      },
      {
        speakerHe: "תייר ישראลי",
        speakerEn: "Israeli tourist",
        thai: "ผมชอบประเทศไทยมากครับ",
        transliteration: "Phom chorp pra-tet tai mak krap",
        translationHe: "אני מאוד אוהב את תאילנד",
        translationEn: "I really like Thailand",
      },
      {
        speakerHe: "אדם מקומי",
        speakerEn: "Thai person",
        thai: "ขอบคุณครับ ยินดีต้อนรับครับ",
        transliteration: "Korp-kun krap, yin-dee ton-rap krap",
        translationHe: "תודה, ברוך הבא!",
        translationEn: "Thank you, welcome!",
      },
    ],
    drillPhrases: [
      {
        id: 1,
        thai: "สวัสดีครับ",
        transliteration: "Sa-wat-dee krap",
        translationHe: "שלום (גבר)",
        translationEn: "Hello (male)",
        noteHe: "הברכה הכי בסיסית בתאית.",
        noteEn: "The most basic Thai greeting.",
      },
      {
        id: 2,
        thai: "ยินดีที่ได้รู้จักครับ",
        transliteration: "Yin-dee tee dai roo-jak krap",
        translationHe: "נעים להכיר",
        translationEn: "Nice to meet you",
        noteHe: "בפגישה ראשונה.",
        noteEn: "On first meeting.",
      },
      {
        id: 3,
        thai: "ผมมาจากอิสราเอลครับ",
        transliteration: "Phom ma jak It-sa-rae-el krap",
        translationHe: "אני מישראל (גבר)",
        translationEn: "I'm from Israel (male)",
        noteHe: "הם יחייכו!",
        noteEn: "They will smile!",
      },
      {
        id: 4,
        thai: "ชอบประเทศไทยมากครับ",
        transliteration: "Chorp pra-tet tai mak krap",
        translationHe: "אני מאוד אוהב תאילנד",
        translationEn: "I really like Thailand",
        noteHe: "תמיד עוזר לשבור את הקרח.",
        noteEn: "Always helps break the ice.",
      },
      {
        id: 5,
        thai: "ลาก่อนครับ",
        transliteration: "La-gorn krap",
        translationHe: "להתראות (גבר)",
        translationEn: "Goodbye (male)",
        noteHe: "לסיים שיחה.",
        noteEn: "To end a conversation.",
      },
      {
        id: 6,
        thai: "คุณชื่ออะไรครับ",
        transliteration: "Khun chue a-rai krap",
        translationHe: "מה שמך?",
        translationEn: "What's your name?",
        noteHe: "שאלה פשוטה ומאוד ידידותית.",
        noteEn: "Simple and very friendly.",
      },
      {
        id: 7,
        thai: "ผมชื่อ ... ครับ",
        transliteration: "Phom chue ... krap",
        translationHe: "שמי ... (גבר)",
        translationEn: "My name is ... (male)",
        noteHe: "החליפו ... בשמכם.",
        noteEn: "Replace ... with your name.",
      },
      {
        id: 8,
        thai: "ไม่เป็นไรครับ",
        transliteration: "Mai-bpen-rai krap",
        translationHe: "לא נורא / בסדר",
        translationEn: "No worries / It's OK",
        noteHe: "הביטוי הנחמד ביותר בתאילנד.",
        noteEn: "The nicest expression in Thailand.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "สวัสดีครับ",
        transliteration: "Sa-wat-dee krap",
        options: [
          { labelHe: "להתראות", labelEn: "Goodbye" },
          { labelHe: "שלום", labelEn: "Hello" },
          { labelHe: "תודה", labelEn: "Thank you" },
          { labelHe: "בבקשה", labelEn: "Please" },
        ],
        correctIndex: 1,
      },
      {
        id: 2,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "ไม่เป็นไรครับ",
        transliteration: "Mai-bpen-rai krap",
        options: [
          { labelHe: "לא מבין", labelEn: "I don't understand" },
          { labelHe: "לא נורא / בסדר", labelEn: "No worries / It's OK" },
          { labelHe: "לא יודע", labelEn: "I don't know" },
          { labelHe: "לא רוצה", labelEn: "I don't want" },
        ],
        correctIndex: 1,
      },
      {
        id: 3,
        type: "listen",
        promptHe: "שמעו וזהו:",
        promptEn: "Listen and identify:",
        thai: "ยินดีต้อนรับครับ",
        transliteration: "Yin-dee ton-rap krap",
        options: [
          { labelHe: "ברוך הבא!", labelEn: "Welcome!" },
          { labelHe: "להתראות!", labelEn: "Goodbye!" },
          { labelHe: "תודה!", labelEn: "Thank you!" },
          { labelHe: "נעים להכיר!", labelEn: "Nice to meet you!" },
        ],
        correctIndex: 0,
      },
      {
        id: 4,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "ลาก่อนครับ",
        transliteration: "La-gorn krap",
        options: [
          { labelHe: "שלום", labelEn: "Hello" },
          { labelHe: "תודה", labelEn: "Thank you" },
          { labelHe: "להתראות", labelEn: "Goodbye" },
          { labelHe: "בטח", labelEn: "Of course" },
        ],
        correctIndex: 2,
      },
      {
        id: 5,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "ผมมาจากอิสราเอลครับ",
        transliteration: "Phom ma jak It-sa-rae-el krap",
        options: [
          { labelHe: "אני אוהב ישראל", labelEn: "I love Israel" },
          { labelHe: "אני מישראל", labelEn: "I'm from Israel" },
          { labelHe: "ישראל רחוקה", labelEn: "Israel is far" },
          { labelHe: "אני נוסע לישראל", labelEn: "I'm going to Israel" },
        ],
        correctIndex: 1,
      },
    ],
  },
};

// ─── helpers ──────────────────────────────────────────────────────────────────

function speakThai(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const raw = text.split("/")[0].trim();
  const utterance = new SpeechSynthesisUtterance(raw);
  utterance.lang = "th-TH";
  utterance.rate = 0.85;
  const voices = window.speechSynthesis.getVoices();
  const thaiVoice = voices.find(v => v.lang === "th-TH");
  if (thaiVoice) utterance.voice = thaiVoice;
  window.speechSynthesis.speak(utterance);
}

// ─── design tokens (dark lesson player) ───────────────────────────────────────

const C = {
  bg: "oklch(12% 0.01 264)",
  surface: "oklch(18% 0.015 264)",
  surfaceHigh: "oklch(22% 0.018 264)",
  border: "oklch(28% 0.02 264)",
  text: "oklch(93% 0.005 264)",
  muted: "oklch(58% 0.012 264)",
  indigo: "oklch(52% 0.24 264)",
  indigoLight: "oklch(70% 0.18 264)",
  orange: "oklch(68% 0.19 40)",
  orangeLight: "oklch(80% 0.14 40)",
  green: "oklch(62% 0.18 145)",
  red: "oklch(55% 0.22 27)",
  amber: "oklch(72% 0.18 75)",
};

const SLIDE = {
  initial: { x: 60, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -60, opacity: 0 },
  transition: {
    duration: 0.25,
    ease: [0.25, 0, 0, 1] as [number, number, number, number],
  },
};

// ─── sub-components ───────────────────────────────────────────────────────────

function PlayButton({
  text,
  size = "md",
}: {
  text: string;
  size?: "sm" | "md" | "lg";
}) {
  const [playing, setPlaying] = useState(false);

  const handlePlay = useCallback(() => {
    speakThai(text);
    setPlaying(true);
    setTimeout(() => setPlaying(false), 1800);
  }, [text]);

  const sz = size === "lg" ? 52 : size === "md" ? 40 : 32;
  const iconSz = size === "lg" ? 20 : size === "md" ? 16 : 13;

  return (
    <button
      onClick={handlePlay}
      style={{
        width: sz,
        height: sz,
        borderRadius: "50%",
        backgroundColor: playing ? C.orange : C.indigo,
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.15s ease",
        flexShrink: 0,
      }}
    >
      <Volume2 size={iconSz} color="white" />
    </button>
  );
}

function HeartsRow({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[0, 1, 2].map(i => (
        <Heart
          key={i}
          size={18}
          fill={i < count ? C.red : "none"}
          color={i < count ? C.red : C.muted}
          style={{ transition: "all 0.2s ease" }}
        />
      ))}
    </div>
  );
}

function PhaseBar({ phase }: { phase: Phase }) {
  const phases: Phase[] = ["listen", "drill", "quiz"];
  const currentIdx = phases.indexOf(phase);

  return (
    <div style={{ display: "flex", gap: 6, flex: 1 }}>
      {phases.map((p, i) => (
        <div
          key={p}
          style={{
            flex: 1,
            height: 4,
            borderRadius: 2,
            backgroundColor: i <= currentIdx ? C.orange : C.border,
            transition: "background-color 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

// ─── Phase 1 — Listen ─────────────────────────────────────────────────────────

function ListenPhase({
  lesson,
  onComplete,
}: {
  lesson: MockLesson;
  onComplete: () => void;
}) {
  const { t, language } = useLanguage();
  const [lineIndex, setLineIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [played, setPlayed] = useState(false);

  const line = lesson.dialogue[lineIndex];
  const isLast = lineIndex === lesson.dialogue.length - 1;
  const dir = language === "he" ? "rtl" : "ltr";

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setLineIndex(i => i + 1);
      setRevealed(false);
      setPlayed(false);
    }
  };

  const handlePlay = useCallback(() => {
    speakThai(line.thai);
    setPlayed(true);
  }, [line.thai]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={lineIndex}
        {...SLIDE}
        style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}
      >
        {/* speaker chip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            direction: dir,
          }}
        >
          <div
            style={{
              padding: "4px 12px",
              borderRadius: 20,
              backgroundColor: C.surfaceHigh,
              fontSize: 12,
              color: C.muted,
              fontFamily: "Noto Sans Hebrew, sans-serif",
            }}
          >
            {language === "he" ? line.speakerHe : line.speakerEn}
          </div>
          <div style={{ fontSize: 12, color: C.muted }}>
            {lineIndex + 1} / {lesson.dialogue.length}
          </div>
        </div>

        {/* Thai card */}
        <div
          style={{
            backgroundColor: C.surface,
            borderRadius: 16,
            padding: "28px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            border: `1px solid ${C.border}`,
          }}
        >
          <PlayButton text={line.thai} size="lg" />

          {played ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{ textAlign: "center" }}
            >
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 600,
                  color: C.text,
                  letterSpacing: "0.03em",
                  marginBottom: 8,
                }}
              >
                {line.thai}
              </div>
              <div style={{ fontSize: 14, color: C.muted }}>
                {line.transliteration}
              </div>
            </motion.div>
          ) : (
            <button
              onClick={handlePlay}
              style={{
                background: "none",
                border: `1px dashed ${C.border}`,
                borderRadius: 8,
                padding: "10px 20px",
                color: C.muted,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "Noto Sans Hebrew, sans-serif",
              }}
            >
              {t({ he: "לחץ כדי לשמוע", en: "Tap to hear" })}
            </button>
          )}
        </div>

        {/* translation reveal */}
        {played && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {revealed ? (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  backgroundColor: C.surfaceHigh,
                  borderRadius: 12,
                  padding: "14px 20px",
                  textAlign: "center",
                  fontFamily: "Noto Sans Hebrew, sans-serif",
                  direction: dir,
                  color: C.indigoLight,
                  fontSize: 18,
                  fontWeight: 500,
                }}
              >
                {language === "he" ? line.translationHe : line.translationEn}
              </motion.div>
            ) : (
              <button
                onClick={() => setRevealed(true)}
                style={{
                  width: "100%",
                  background: "none",
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  padding: "14px 20px",
                  color: C.muted,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "Noto Sans Hebrew, sans-serif",
                }}
              >
                {t({ he: "הצג תרגום", en: "Show translation" })}
              </button>
            )}
          </motion.div>
        )}

        {/* advance button */}
        {played && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={handleNext}
            style={{
              marginTop: "auto",
              padding: "16px 0",
              borderRadius: 14,
              backgroundColor: C.orange,
              border: "none",
              color: "white",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "Noto Sans Hebrew, sans-serif",
              direction: dir,
            }}
          >
            {isLast
              ? t({ he: "עברו לתרגול ←", en: "Start Drill →" })
              : t({ he: "השורה הבאה ←", en: "Next line →" })}
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Phase 2 — Drill ──────────────────────────────────────────────────────────

function DrillPhase({
  lesson,
  onComplete,
}: {
  lesson: MockLesson;
  onComplete: () => void;
}) {
  const { t, language } = useLanguage();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const dir = language === "he" ? "rtl" : "ltr";
  const phrase = lesson.drillPhrases[index];
  const isLast = index === lesson.drillPhrases.length - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setIndex(i => i + 1);
      setFlipped(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        {...SLIDE}
        style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}
      >
        {/* progress dots */}
        <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
          {lesson.drillPhrases.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === index ? 20 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: i <= index ? C.orange : C.border,
                transition: "all 0.2s ease",
              }}
            />
          ))}
        </div>

        {/* counter */}
        <div
          style={{
            textAlign: "center",
            color: C.muted,
            fontSize: 13,
            fontFamily: "Noto Sans Hebrew, sans-serif",
          }}
        >
          {index + 1} / {lesson.drillPhrases.length}
        </div>

        {/* flip card */}
        <div
          className="perspective-1000"
          style={{ flex: 1, cursor: "pointer", minHeight: 220 }}
          onClick={() => {
            if (!flipped) {
              speakThai(phrase.thai);
              setFlipped(true);
            }
          }}
        >
          <motion.div
            className="preserve-3d"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0, 0, 1] }}
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              minHeight: 220,
            }}
          >
            {/* front */}
            <div
              className="backface-hidden"
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: C.surface,
                borderRadius: 20,
                border: `1px solid ${C.border}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                padding: 24,
              }}
            >
              <PlayButton text={phrase.thai} size="lg" />
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 700,
                  color: C.text,
                  letterSpacing: "0.02em",
                  textAlign: "center",
                }}
              >
                {phrase.thai}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: C.muted,
                  fontFamily: "Noto Sans Hebrew, sans-serif",
                }}
              >
                {t({ he: "לחץ לגלות", en: "Tap to reveal" })}
              </div>
            </div>

            {/* back */}
            <div
              className="backface-hidden rotate-y-180"
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: C.surfaceHigh,
                borderRadius: 20,
                border: `1px solid ${C.indigo}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                padding: 24,
                direction: dir,
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  color: C.indigoLight,
                  fontWeight: 700,
                  textAlign: "center",
                  fontFamily: "Noto Sans Hebrew, sans-serif",
                }}
              >
                {language === "he"
                  ? phrase.translationHe
                  : phrase.translationEn}
              </div>
              <div
                style={{ fontSize: 15, color: C.muted, textAlign: "center" }}
              >
                {phrase.transliteration}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: C.muted,
                  textAlign: "center",
                  fontFamily: "Noto Sans Hebrew, sans-serif",
                  marginTop: 4,
                }}
              >
                {language === "he" ? phrase.noteHe : phrase.noteEn}
              </div>
            </div>
          </motion.div>
        </div>

        {/* actions */}
        {flipped && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: "flex", gap: 10 }}
          >
            <button
              onClick={() => {
                speakThai(phrase.thai);
                setFlipped(false);
              }}
              style={{
                flex: 1,
                padding: "14px 0",
                borderRadius: 12,
                backgroundColor: C.surface,
                border: `1px solid ${C.border}`,
                color: C.muted,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                fontFamily: "Noto Sans Hebrew, sans-serif",
              }}
            >
              <RotateCcw size={14} />
              {t({ he: "חזור", en: "Repeat" })}
            </button>
            <button
              onClick={handleNext}
              style={{
                flex: 2,
                padding: "14px 0",
                borderRadius: 12,
                backgroundColor: C.orange,
                border: "none",
                color: "white",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "Noto Sans Hebrew, sans-serif",
              }}
            >
              {isLast
                ? t({ he: "למבחן ←", en: "To Quiz →" })
                : t({ he: "הבנתי ←", en: "Got it →" })}
            </button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Phase 3 — Quiz ───────────────────────────────────────────────────────────

function QuizPhase({
  lesson,
  hearts,
  onAnswer,
  onComplete,
}: {
  lesson: MockLesson;
  hearts: number;
  onAnswer: (correct: boolean) => void;
  onComplete: () => void;
}) {
  const { t, language } = useLanguage();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const dir = language === "he" ? "rtl" : "ltr";
  const q = lesson.quiz[index];

  const handleSelect = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    const correct = i === q.correctIndex;
    onAnswer(correct);
    setTimeout(() => {
      if (index + 1 >= lesson.quiz.length) {
        onComplete();
      } else {
        setIndex(idx => idx + 1);
        setSelected(null);
        setAnswered(false);
      }
    }, 1200);
  };

  const optionColor = (i: number) => {
    if (!answered) return C.surface;
    if (i === q.correctIndex) return "oklch(22% 0.05 145)";
    if (i === selected) return "oklch(22% 0.05 27)";
    return C.surface;
  };

  const optionBorder = (i: number) => {
    if (!answered) return C.border;
    if (i === q.correctIndex) return C.green;
    if (i === selected) return C.red;
    return C.border;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        {...SLIDE}
        style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}
      >
        {/* progress */}
        <div style={{ display: "flex", gap: 6 }}>
          {lesson.quiz.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                backgroundColor: i <= index ? C.orange : C.border,
                transition: "background-color 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* prompt */}
        <div
          style={{ direction: dir, fontFamily: "Noto Sans Hebrew, sans-serif" }}
        >
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 10 }}>
            {language === "he" ? q.promptHe : q.promptEn}
          </div>

          {q.type === "complete" ? (
            <div
              style={{
                backgroundColor: C.surface,
                borderRadius: 14,
                padding: "20px 20px",
                border: `1px solid ${C.border}`,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  color: C.text,
                  letterSpacing: "0.03em",
                  marginBottom: 8,
                }}
              >
                {q.beforeThai}{" "}
                <span
                  style={{
                    color: C.orange,
                    borderBottom: `2px solid ${C.orange}`,
                  }}
                >
                  {q.missingThai}
                </span>{" "}
                {q.afterThai}
              </div>
              <div style={{ fontSize: 13, color: C.muted }}>
                {q.transliteration}
              </div>
            </div>
          ) : (
            <div
              style={{
                backgroundColor: C.surface,
                borderRadius: 14,
                padding: "20px 24px",
                border: `1px solid ${C.border}`,
                display: "flex",
                alignItems: "center",
                gap: 14,
                direction: "ltr",
              }}
            >
              {q.type === "listen" && <PlayButton text={q.thai} size="md" />}
              <div>
                <div
                  style={{
                    fontSize: 30,
                    color: C.text,
                    letterSpacing: "0.02em",
                  }}
                >
                  {q.thai}
                </div>
                <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>
                  {q.transliteration}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* options */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            direction: dir,
          }}
        >
          {q.options.map((opt, i) => (
            <motion.button
              key={i}
              onClick={() => handleSelect(i)}
              whileTap={answered ? {} : { scale: 0.98 }}
              style={{
                padding: "14px 18px",
                borderRadius: 12,
                backgroundColor: optionColor(i),
                border: `1.5px solid ${optionBorder(i)}`,
                color:
                  answered && (i === q.correctIndex || i === selected)
                    ? C.text
                    : C.text,
                fontSize: 15,
                cursor: answered ? "default" : "pointer",
                textAlign: language === "he" ? "right" : "left",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition:
                  "background-color 0.15s ease, border-color 0.15s ease",
                fontFamily: "Noto Sans Hebrew, sans-serif",
              }}
            >
              <span>{language === "he" ? opt.labelHe : opt.labelEn}</span>
              {answered && i === q.correctIndex && (
                <Check size={16} color={C.green} />
              )}
              {answered && i === selected && i !== q.correctIndex && (
                <X size={16} color={C.red} />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Score screen ─────────────────────────────────────────────────────────────

function ScoreScreen({
  xp,
  hearts,
  lesson,
}: {
  xp: number;
  hearts: number;
  lesson: MockLesson;
}) {
  const { t, language } = useLanguage();
  const [displayXp, setDisplayXp] = useState(0);
  const dir = language === "he" ? "rtl" : "ltr";

  useEffect(() => {
    let current = 0;
    const step = Math.ceil(xp / 40);
    const interval = setInterval(() => {
      current = Math.min(current + step, xp);
      setDisplayXp(current);
      if (current >= xp) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [xp]);

  const stars = hearts === 3 ? 3 : hearts >= 1 ? 2 : 1;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.25, 0, 0, 1] }}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        direction: dir,
      }}
    >
      {/* stars */}
      <div style={{ display: "flex", gap: 8 }}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: i < stars ? 1 : 0.5 }}
            transition={{
              delay: 0.1 * i + 0.2,
              type: "spring",
              stiffness: 300,
            }}
            style={{
              fontSize: i < stars ? 40 : 32,
              opacity: i < stars ? 1 : 0.25,
            }}
          >
            ⭐
          </motion.div>
        ))}
      </div>

      {/* headline */}
      <div
        style={{
          textAlign: "center",
          fontFamily: "Noto Sans Hebrew, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: C.text,
            marginBottom: 6,
          }}
        >
          {hearts === 3
            ? t({ he: "מושלם! ✨", en: "Perfect! ✨" })
            : t({ he: "כל הכבוד! 🎉", en: "Great job! 🎉" })}
        </div>
        <div style={{ fontSize: 14, color: C.muted }}>
          {language === "he" ? lesson.titleHe : lesson.titleEn}
        </div>
      </div>

      {/* XP */}
      <motion.div
        style={{
          backgroundColor: C.surface,
          borderRadius: 20,
          padding: "24px 40px",
          border: `1px solid ${C.border}`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Zap size={28} fill={C.amber} color={C.amber} />
          <span
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: C.amber,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            +{displayXp}
          </span>
        </div>
        <div
          style={{
            fontSize: 13,
            color: C.muted,
            marginTop: 4,
            fontFamily: "Noto Sans Hebrew, sans-serif",
          }}
        >
          {t({ he: "XP הרווחתם", en: "XP earned" })}
          {hearts === 3 && (
            <span
              style={{
                color: C.orangeLight,
                marginRight: language === "he" ? 6 : 0,
                marginLeft: language === "en" ? 6 : 0,
              }}
            >
              {" "}
              · {t({ he: "בונוס מושלם! +10", en: "Perfect bonus! +10" })}
            </span>
          )}
        </div>
      </motion.div>

      {/* lives remaining */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: "Noto Sans Hebrew, sans-serif",
        }}
      >
        <HeartsRow count={hearts} />
        <span style={{ fontSize: 13, color: C.muted }}>
          {t({ he: `נשארו ${hearts} לבבות`, en: `${hearts} hearts remaining` })}
        </span>
      </div>

      {/* CTAs */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "100%",
        }}
      >
        <Link href="/interactive-lessons">
          <button
            style={{
              width: "100%",
              padding: "16px 0",
              borderRadius: 14,
              backgroundColor: C.orange,
              border: "none",
              color: "white",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "Noto Sans Hebrew, sans-serif",
            }}
          >
            {t({ he: "חזרה לקורס", en: "Back to Course" })}
          </button>
        </Link>
        <Link href="/lesson/street-food">
          <button
            style={{
              width: "100%",
              padding: "14px 0",
              borderRadius: 14,
              backgroundColor: "transparent",
              border: `1px solid ${C.border}`,
              color: C.muted,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "Noto Sans Hebrew, sans-serif",
            }}
          >
            {t({ he: "שיעור הבא ←", en: "Next Lesson →" })}
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

// ─── labels ───────────────────────────────────────────────────────────────────

const PHASE_LABELS = {
  listen: { he: "הקשיבו", en: "Listen" },
  drill: { he: "תרגלו", en: "Drill" },
  quiz: { he: "מבחן קצר", en: "Quick Quiz" },
  score: { he: "תוצאות", en: "Results" },
} as const;

// ─── main page ────────────────────────────────────────────────────────────────

export default function LessonPlayer() {
  const [, params] = useRoute("/lesson/:id");
  const lessonId = params?.id ?? "airport-arrival";
  const lesson = LESSONS[lessonId] ?? LESSONS["airport-arrival"];

  const { t, language } = useLanguage();
  const { recordPractice } = useGamification();
  const dir = language === "he" ? "rtl" : "ltr";
  const he = language === "he";

  const { data: user } = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });
  const { data: purchases = [] } = trpc.user.getPurchaseHistory.useQuery(
    undefined,
    { enabled: Boolean(user) }
  );
  const hasPaid = hasCourseAccess(purchases);
  const isLocked = !hasPaid && !FREE_SLUGS.has(lessonId);

  const [phase, setPhase] = useState<Phase>("listen");
  const [hearts, setHearts] = useState(3);
  const [xp, setXp] = useState(0);
  const [shakeHearts, setShakeHearts] = useState(false);

  const handleListenComplete = () => {
    setXp(x => x + 10);
    setPhase("drill");
  };

  const handleDrillComplete = () => {
    setXp(x => x + 20);
    setPhase("quiz");
  };

  const handleQuizAnswer = (correct: boolean) => {
    if (!correct) {
      setHearts(h => Math.max(0, h - 1));
      setShakeHearts(true);
      setTimeout(() => setShakeHearts(false), 500);
    }
  };

  const handleQuizComplete = () => {
    const base = 30;
    const bonus = hearts === 3 ? 10 : 0;
    const quizXp = base + bonus;
    setXp(x => x + quizXp);
    recordPractice(xp + quizXp); // xp = listen(10)+drill(20) accumulated so far
    setPhase("score");
  };

  if (isLocked) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: C.bg,
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
          direction: dir,
        }}
      >
        <div style={{ fontSize: 52, marginBottom: 16 }}>🔒</div>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: C.text,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {he ? "שיעור זה דורש קורס" : "This lesson requires the course"}
        </h1>
        <p
          style={{
            fontSize: 14,
            color: C.muted,
            textAlign: "center",
            marginBottom: 28,
            maxWidth: 320,
            lineHeight: 1.7,
          }}
        >
          {he
            ? "פתחו את קורס הישרדות התאית לתיירים כדי לגשת לכל 7 השיעורים."
            : "Unlock the Tourist Survival Thai Course to access all 7 lessons."}
        </p>
        <Link href="/welcome-kit">
          <button
            style={{
              padding: "14px 32px",
              borderRadius: 12,
              background: C.orange,
              color: "white",
              fontSize: 16,
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              marginBottom: 12,
            }}
          >
            {he ? "פתח עכשיו ›" : "Unlock now ›"}
          </button>
        </Link>
        <Link href="/lesson/airport-arrival">
          <button
            style={{
              padding: "12px 24px",
              borderRadius: 12,
              background: "transparent",
              color: C.muted,
              fontSize: 13,
              fontWeight: 600,
              border: `1.5px solid ${C.border}`,
              cursor: "pointer",
            }}
          >
            {he ? "שיעור חינם ›" : "Try free lesson ›"}
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: C.bg,
        display: "flex",
        flexDirection: "column",
        zIndex: 50,
      }}
    >
      {/* top bar */}
      <div
        style={{
          padding: "16px 20px 12px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          direction: dir,
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
        }}
      >
        <Link href="/interactive-lessons">
          <button
            style={{
              background: "none",
              border: "none",
              color: C.muted,
              cursor: "pointer",
              padding: 4,
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowLeft
              size={20}
              style={{ transform: language === "he" ? "scaleX(-1)" : "none" }}
            />
          </button>
        </Link>

        {phase !== "score" && <PhaseBar phase={phase} />}

        {phase !== "score" && (
          <motion.div
            animate={shakeHearts ? { x: [0, -5, 5, -5, 0] } : {}}
            transition={{ duration: 0.35 }}
          >
            <HeartsRow count={hearts} />
          </motion.div>
        )}
      </div>

      {/* phase label */}
      {phase !== "score" && (
        <div
          style={{
            padding: "12px 20px 0",
            direction: dir,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: C.muted,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 2,
              fontFamily: "Noto Sans Hebrew, sans-serif",
            }}
          >
            {language === "he" ? lesson.chapterHe : lesson.chapterEn}
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: C.text,
              fontFamily: "Noto Sans Hebrew, sans-serif",
            }}
          >
            {PHASE_LABELS[phase][language]}
          </div>
        </div>
      )}

      {/* content */}
      <div
        style={{
          flex: 1,
          padding: "16px 20px 24px",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AnimatePresence mode="wait">
          {phase === "listen" && (
            <motion.div
              key="listen"
              {...SLIDE}
              style={{ display: "flex", flexDirection: "column", flex: 1 }}
            >
              <ListenPhase lesson={lesson} onComplete={handleListenComplete} />
            </motion.div>
          )}
          {phase === "drill" && (
            <motion.div
              key="drill"
              {...SLIDE}
              style={{ display: "flex", flexDirection: "column", flex: 1 }}
            >
              <DrillPhase lesson={lesson} onComplete={handleDrillComplete} />
            </motion.div>
          )}
          {phase === "quiz" && (
            <motion.div
              key="quiz"
              {...SLIDE}
              style={{ display: "flex", flexDirection: "column", flex: 1 }}
            >
              <QuizPhase
                lesson={lesson}
                hearts={hearts}
                onAnswer={handleQuizAnswer}
                onComplete={handleQuizComplete}
              />
            </motion.div>
          )}
          {phase === "score" && (
            <motion.div
              key="score"
              {...SLIDE}
              style={{ display: "flex", flexDirection: "column", flex: 1 }}
            >
              <ScoreScreen xp={xp} hearts={hearts} lesson={lesson} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
