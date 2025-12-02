import { Lesson } from "@/components/InteractiveLessonPlayer";

// Intro texts for each lesson
export const lessonIntros = {
  1: {
    english: "Welcome to Lesson 1: Greetings and Introductions. In this lesson, you'll learn essential Thai greetings and how to introduce yourself. These phrases are the foundation of polite communication in Thailand.",
    hebrew: "ברוכים הבאים לשיעור 1: ברכות והיכרות. בשיעור זה תלמדו ברכות תאילנדיות חיוניות וכיצד להציג את עצמכם. ביטויים אלה הם הבסיס לתקשורת מנומסת בתאילנד."
  },
  2: {
    english: "Welcome to Lesson 2: Numbers and Time. Learn how to count, tell time, and use numbers in everyday situations like shopping and ordering food.",
    hebrew: "ברוכים הבאים לשיעור 2: מספרים וזמן. למדו כיצד לספור, לומר את השעה ולהשתמש במספרים במצבים יומיומיים כמו קניות והזמנת אוכל."
  },
  3: {
    english: "Welcome to Lesson 3: Ordering Food. Master the essential phrases for ordering delicious Thai food at restaurants, street stalls, and markets.",
    hebrew: "ברוכים הבאים לשיעור 3: הזמנת אוכל. שלטו בביטויים החיוניים להזמנת אוכל תאילנדי טעים במסעדות, דוכני רחוב ושווקים."
  },
  4: {
    english: "Welcome to Lesson 4: Shopping and Bargaining. Learn how to ask for prices, negotiate politely, and get the best deals in Thai markets.",
    hebrew: "ברוכים הבאים לשיעור 4: קניות ומיקוח. למדו כיצד לשאול על מחירים, לנהל משא ומתן בנימוס ולקבל את העסקאות הטובות ביותר בשווקים התאילנדיים."
  },
  5: {
    english: "Welcome to Lesson 5: Transportation and Directions. Navigate Thailand confidently with phrases for taxis, tuk-tuks, and asking for directions.",
    hebrew: "ברוכים הבאים לשיעור 5: תחבורה וכיוונים. נווטו בתאילנד בביטחון עם ביטויים למוניות, טוק-טוקים ושאילת כיוונים."
  },
  6: {
    english: "Welcome to Lesson 6: Accommodation. Learn essential phrases for checking in, asking about facilities, and communicating with hotel staff.",
    hebrew: "ברוכים הבאים לשיעור 6: לינה. למדו ביטויים חיוניים לצ'ק-אין, שאילת שאלות על מתקנים ותקשורת עם צוות המלון."
  },
  7: {
    english: "Welcome to Lesson 7: Emergencies and Help. Important phrases for getting help, medical situations, and dealing with emergencies in Thailand.",
    hebrew: "ברוכים הבאים לשיעור 7: מצבי חירום ועזרה. ביטויים חשובים לקבלת עזרה, מצבים רפואיים והתמודדות עם מצבי חירום בתאילנד."
  },
  8: {
    english: "Welcome to Lesson 8: Culture and Etiquette. Understand Thai customs, temple etiquette, and cultural phrases to show respect.",
    hebrew: "ברוכים הבאים לשיעור 8: תרבות ונימוסים. הבינו מנהגים תאילנדיים, נימוסי מקדש וביטויים תרבותיים להפגנת כבוד."
  },
  9: {
    english: "Welcome to Lesson 9: Practice Dialogues. Put everything together with real-world conversation scenarios you'll encounter in Thailand.",
    hebrew: "ברוכים הבאים לשיעור 9: תרגול דיאלוגים. חברו הכל יחד עם תרחישי שיחה מהעולם האמיתי שתיתקלו בהם בתאילנד."
  },
  10: {
    english: "Welcome to Lesson 10: Review and Survival Phrases. Final review of all essential phrases plus bonus survival phrases for any situation.",
    hebrew: "ברוכים הבאים לשיעור 10: סיכום וביטויי הישרדות. סקירה סופית של כל הביטויים החיוניים בתוספת ביטויי הישרדות בונוס לכל מצב."
  }
};

// Background music URLs - temporarily disabled due to CORS/accessibility issues
// Will be replaced with generated audio files
export const backgroundMusicUrls: Record<number, string | undefined> = {
  1: undefined,
  2: undefined,
  3: undefined,
  4: undefined,
  5: undefined,
  6: undefined,
  7: undefined,
  8: undefined,
  9: undefined,
  10: undefined
};

export function addAudioToLessons(lessons: Lesson[]): Lesson[] {
  return lessons.map(lesson => ({
    ...lesson,
    introText: lessonIntros[lesson.id as keyof typeof lessonIntros]?.english,
    introTextHebrew: lessonIntros[lesson.id as keyof typeof lessonIntros]?.hebrew,
    backgroundMusicUrl: backgroundMusicUrls[lesson.id as keyof typeof backgroundMusicUrls] || undefined
  }));
}
