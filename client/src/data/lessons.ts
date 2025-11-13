export interface Phrase {
  thai: string;
  phonetic: string;
  english: string;
  hebrew: string;
  audio: string;
}

export interface Exercise {
  type: 'multiple-choice' | 'fill-blank' | 'matching';
  question: string;
  questionHebrew: string;
  options?: string[];
  correctAnswer: string | number;
}

export interface Lesson {
  id: number;
  title: string;
  titleHebrew: string;
  description: string;
  descriptionHebrew: string;
  image: string;
  phrases: Phrase[];
  exercises: Exercise[];
  culturalNote?: string;
  culturalNoteHebrew?: string;
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "Greetings & Introductions",
    titleHebrew: "ברכות והיכרות",
    description: "Learn basic greetings and how to introduce yourself in Thai",
    descriptionHebrew: "למד ברכות בסיסיות וכיצד להציג את עצמך בתאילנדית",
    image: "/images/lesson1-greetings.jpg",
    phrases: [
      {
        thai: "สวัสดีครับ/ค่ะ",
        phonetic: "sà-wàt-dii khráp/khâ",
        english: "Hello",
        hebrew: "שלום",
        audio: "/audio/lesson1-hello.wav"
      },
      {
        thai: "ผม/ฉันชื่อ...",
        phonetic: "phǒm/chǎn chêu...",
        english: "My name is...",
        hebrew: "קוראים לי...",
        audio: "/audio/lesson1-myname.wav"
      },
      {
        thai: "คุณชื่ออะไร",
        phonetic: "khun chêu à-rai",
        english: "What is your name?",
        hebrew: "איך קוראים לך?",
        audio: "/audio/lesson1-yourname.wav"
      },
      {
        thai: "ยินดีที่ได้รู้จัก",
        phonetic: "yin-dii thîi dâi rúu-jàk",
        english: "Nice to meet you",
        hebrew: "נעים להכיר",
        audio: "/audio/lesson1-nicetomeet.wav"
      },
      {
        thai: "ขอบคุณครับ/ค่ะ",
        phonetic: "khàawp-khun khráp/khâ",
        english: "Thank you",
        hebrew: "תודה",
        audio: "/audio/lesson1-thankyou.wav"
      },
      {
        thai: "ขอโทษครับ/ค่ะ",
        phonetic: "khǎaw-thôot khráp/khâ",
        english: "Excuse me / Sorry",
        hebrew: "סליחה",
        audio: "/audio/lesson1-sorry.wav"
      }
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: "How do you say 'Hello' in Thai?",
        questionHebrew: "איך אומרים 'שלום' בתאילנדית?",
        options: ["สวัสดีครับ", "ขอบคุณครับ", "ขอโทษครับ"],
        correctAnswer: 0
      },
      {
        type: 'multiple-choice',
        question: "What does 'ขอบคุณครับ' mean?",
        questionHebrew: "מה המשמעות של 'ขอบคุณครับ'?",
        options: ["Hello", "Thank you", "Goodbye"],
        correctAnswer: 1
      }
    ],
    culturalNote: "Politeness particles are essential in Thai! Men add 'ครับ' (khráp) and women add 'ค่ะ' (khâ) at the end of sentences. The 'wai' gesture (hands pressed together) shows respect - the higher the hands, the more respect shown. Always return a wai when someone greets you this way!",
    culturalNoteHebrew: "חלקיקי נימוס חיוניים בתאילנדית! גברים מוסיפים 'ครับ' (khráp) ונשים 'ค่ะ' (khâ) בסוף המשפטים. מחוות ה'וואי' (כפות ידיים לחוצות) מראה כבוד - כל מה שהידיים גבוהות יותר, יותר כבוד מוצג!"
  },
  {
    id: 2,
    title: "Numbers & Time",
    titleHebrew: "מספרים ושעות",
    description: "Master Thai numbers and learn to ask about time",
    descriptionHebrew: "שלוט במספרים תאילנדיים ולמד לשאול על השעה",
    image: "/images/lesson2-numbers.jpg",
    phrases: [
      {
        thai: "หนึ่ง",
        phonetic: "nìng",
        english: "One",
        hebrew: "אחד",
        audio: "/audio/number-1.wav"
      },
      {
        thai: "สอง",
        phonetic: "sǎawng",
        english: "Two",
        hebrew: "שניים",
        audio: "/audio/number-2.wav"
      },
      {
        thai: "สาม",
        phonetic: "sǎam",
        english: "Three",
        hebrew: "שלושה",
        audio: "/audio/number-3.wav"
      },
      {
        thai: "สี่",
        phonetic: "sìi",
        english: "Four",
        hebrew: "ארבעה",
        audio: "/audio/number-4.wav"
      },
      {
        thai: "ห้า",
        phonetic: "hâa",
        english: "Five",
        hebrew: "חמישה",
        audio: "/audio/number-5.wav"
      },
      {
        thai: "หก",
        phonetic: "hòk",
        english: "Six",
        hebrew: "שישה",
        audio: "/audio/number-6.wav"
      },
      {
        thai: "เจ็ด",
        phonetic: "jèt",
        english: "Seven",
        hebrew: "שבעה",
        audio: "/audio/number-7.wav"
      },
      {
        thai: "แปด",
        phonetic: "pàaet",
        english: "Eight",
        hebrew: "שמונה",
        audio: "/audio/number-8.wav"
      },
      {
        thai: "เก้า",
        phonetic: "kâao",
        english: "Nine",
        hebrew: "תשעה",
        audio: "/audio/number-9.wav"
      },
      {
        thai: "สิบ",
        phonetic: "sìp",
        english: "Ten",
        hebrew: "עשרה",
        audio: "/audio/number-10.wav"
      },
      {
        thai: "ตอนนี้กี่โมงแล้ว",
        phonetic: "dtaawn-níi kìi moong láaeo",
        english: "What time is it now?",
        hebrew: "מה השעה עכשיו?",
        audio: "/audio/lesson2-time.wav"
      }
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: "What number is 'สาม'?",
        questionHebrew: "איזה מספר הוא 'สาม'?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 3,
    title: "Ordering Food",
    titleHebrew: "הזמנת אוכל",
    description: "Learn essential phrases for ordering food in Thai restaurants",
    descriptionHebrew: "למד ביטויים חיוניים להזמנת אוכל במסעדות תאילנדיות",
    image: "/images/lesson3-food.jpg",
    phrases: [
      {
        thai: "ขอเมนูหน่อยครับ/ค่ะ",
        phonetic: "khǎaw mee-nuu nàauy khráp/khâ",
        english: "Can I have the menu, please?",
        hebrew: "אפשר לקבל את התפריט בבקשה?",
        audio: "/audio/lesson3-menu.wav"
      },
      {
        thai: "เอาอันนี้ครับ/ค่ะ",
        phonetic: "ao an-níi khráp/khâ",
        english: "I'll take this one",
        hebrew: "אני אקח את זה",
        audio: "/audio/lesson3-takethis.wav"
      },
      {
        thai: "ไม่เผ็ด",
        phonetic: "mâi phèt",
        english: "Not spicy",
        hebrew: "לא חריף",
        audio: "/audio/lesson3-notspicy.wav"
      },
      {
        thai: "เผ็ดน้อย",
        phonetic: "phèt náauy",
        english: "A little spicy",
        hebrew: "קצת חריף",
        audio: "/audio/lesson3-littlespicy.wav"
      },
      {
        thai: "เก็บเงินด้วยครับ/ค่ะ",
        phonetic: "gèp ngern dûuai khráp/khâ",
        english: "Check, please",
        hebrew: "חשבון בבקשה",
        audio: "/audio/lesson3-check.wav"
      }
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: "How do you ask for the menu?",
        questionHebrew: "איך מבקשים את התפריט?",
        options: ["ขอเมนูหน่อยครับ", "เก็บเงินด้วยครับ", "ไม่เผ็ด"],
        correctAnswer: 0
      }
    ],
    culturalNote: "Thai food can be VERY spicy! Always specify your spice level when ordering. 'ไม่เผ็ด' (not spicy) is perfectly acceptable and won't offend anyone. Thai restaurants are used to adjusting spice levels for tourists. Pro tip: Keep water or rice nearby - they help more than cold drinks when food is too spicy!",
    culturalNoteHebrew: "אוכל תאילנדי יכול להיות חריף מאוד! תמיד ציין את רמת החריפות בהזמנה. 'ไม่เผ็ด' (לא חריף) זה לגמרי מקובל ולא פוגע באף אחד. טיפ: שמרו מים או אורז בקרבת מקום - הם עוזרים יותר ממשקאות קרים!"
  },
  {
    id: 4,
    title: "Shopping & Bargaining",
    titleHebrew: "קניות ומיקוח",
    description: "Essential phrases for shopping and negotiating prices in Thai markets",
    descriptionHebrew: "ביטויים חיוניים לקניות ומיקוח במחירים בשווקים תאילנדיים",
    image: "/images/lesson4-shopping.jpg",
    phrases: [
      {
        thai: "อันนี้ราคาเท่าไหร่",
        phonetic: "an-níi raa-khaa thâo-rài",
        english: "How much is this?",
        hebrew: "כמה זה עולה?",
        audio: "/audio/lesson4-howmuch.wav"
      },
      {
        thai: "แพงไป",
        phonetic: "phaaeng bpai",
        english: "Too expensive",
        hebrew: "יקר מדי",
        audio: "/audio/lesson4-expensive.wav"
      },
      {
        thai: "ลดหน่อยได้ไหม",
        phonetic: "lót nàauy dâi mǎi",
        english: "Can you give a discount?",
        hebrew: "אפשר הנחה?",
        audio: "/audio/lesson4-discount.wav"
      }
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: "What does 'แพงไป' mean?",
        questionHebrew: "מה המשמעות של 'แพงไป'?",
        options: ["Too cheap", "Too expensive", "Good price"],
        correctAnswer: 1
      }
    ],
    culturalNote: "Bargaining is expected in markets and street stalls, but NOT in malls or fixed-price shops. Start at 50-60% of the asking price and negotiate with a smile. If the vendor won't budge, walk away - they'll often call you back with a better price. Remember: bargaining should be fun and friendly, never aggressive. A good rule: if you agree on a price, you must buy - backing out is considered very rude.",
    culturalNoteHebrew: "מיקוח צפוי בשווקים ודוכני רחוב, אבל לא בקניונים. התחל ב-50-60% מהמחיר המבוקש ונהל משא ומתן עם חיוך. אם המוכר לא מוריד, לך הלאה - לעתים קרובות הם יקראו אותך חזרה עם מחיר טוב יותר. חשוב: אם הסכמת על מחיר, חייב לקנות!"
  },
  {
    id: 5,
    title: "Transportation & Directions",
    titleHebrew: "תחבורה וכיוונים",
    description: "Navigate Thailand with confidence using these transportation phrases",
    descriptionHebrew: "נווט בתאילנד בביטחון באמצעות ביטויי תחבורה אלה",
    image: "/images/lesson5-transportation.jpg",
    phrases: [
      {
        thai: "เลี้ยวซ้าย",
        phonetic: "líiao sáai",
        english: "Turn left",
        hebrew: "פנה שמאלה",
        audio: "/audio/lesson5-directions.wav"
      },
      {
        thai: "เลี้ยวขวา",
        phonetic: "líiao khwǎa",
        english: "Turn right",
        hebrew: "פנה ימינה",
        audio: "/audio/lesson5-directions.wav"
      },
      {
        thai: "ตรงไป",
        phonetic: "dtrong bpai",
        english: "Go straight",
        hebrew: "לך ישר",
        audio: "/audio/lesson5-directions.wav"
      }
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: "What does 'เลี้ยวซ้าย' mean?",
        questionHebrew: "מה המשמעות של 'เลี้ยวซ้าย'?",
        options: ["Turn right", "Turn left", "Go straight"],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 6,
    title: "Accommodation",
    titleHebrew: "לינה",
    description: "Book hotels and communicate with hotel staff effectively",
    descriptionHebrew: "הזמן מלונות ותקשר עם צוות המלון ביעילות",
    image: "/images/lesson6-accommodation.jpg",
    phrases: [
      {
        thai: "มีห้องว่างไหมครับ/ค่ะ",
        phonetic: "mii hâawng wâang mǎi khráp/khâ",
        english: "Do you have any vacant rooms?",
        hebrew: "יש לכם חדרים פנויים?",
        audio: "/audio/lesson6-room.wav"
      },
      {
        thai: "ราคาเท่าไหร่",
        phonetic: "raa-khaa thâo-rài",
        english: "What is the price?",
        hebrew: "מה המחיר?",
        audio: "/audio/lesson4-howmuch.wav"
      }
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: "How do you ask if there are vacant rooms?",
        questionHebrew: "איך שואלים אם יש חדרים פנויים?",
        options: ["มีห้องว่างไหมครับ", "ราคาเท่าไหร่", "ขอบคุณครับ"],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 7,
    title: "Emergencies & Help",
    titleHebrew: "מצבי חירום ועזרה",
    description: "Critical phrases for emergency situations and getting help",
    descriptionHebrew: "ביטויים קריטיים למצבי חירום וקבלת עזרה",
    image: "/images/lesson7-emergency.jpg",
    phrases: [
      {
        thai: "ช่วยด้วย",
        phonetic: "chûuai dûuai",
        english: "Help!",
        hebrew: "הצילו!",
        audio: "/audio/lesson7-help.wav"
      },
      {
        thai: "เรียกรถพยาบาล",
        phonetic: "rîiak rót phá-yaa-baan",
        english: "Call an ambulance",
        hebrew: "תזמינו אמבולנס",
        audio: "/audio/lesson7-ambulance.wav"
      },
      {
        thai: "เรียกตำรวจ",
        phonetic: "rîiak dtam-rùuat",
        english: "Call the police",
        hebrew: "תזמינו משטרה",
        audio: "/audio/lesson7-police.wav"
      }
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: "How do you call for help?",
        questionHebrew: "איך קוראים לעזרה?",
        options: ["ช่วยด้วย", "ขอบคุณครับ", "สวัสดีครับ"],
        correctAnswer: 0
      }
    ],
    culturalNote: "Emergency number in Thailand: 191 for police, 1669 for ambulance.",
    culturalNoteHebrew: "מספר חירום בתאילנד: 191 למשטרה, 1669 לאמבולנס."
  },
  {
    id: 8,
    title: "Culture & Etiquette",
    titleHebrew: "תרבות ונימוסים",
    description: "Understand Thai cultural norms and proper etiquette",
    descriptionHebrew: "הבן נורמות תרבותיות תאילנדיות ונימוסים נכונים",
    image: "/images/lesson8-culture.jpg",
    phrases: [
      {
        thai: "ไหว้",
        phonetic: "wâi",
        english: "The Wai (traditional Thai greeting)",
        hebrew: "הוואי (ברכה תאילנדית מסורתית)",
        audio: "/audio/lesson1-hello.wav"
      }
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: "What is the traditional Thai greeting gesture called?",
        questionHebrew: "איך קוראים למחווה הברכה התאילנדית המסורתית?",
        options: ["Wai", "Bow", "Handshake"],
        correctAnswer: 0
      }
    ],
    culturalNote: "The 'Wai' is performed by pressing palms together at chest level and bowing slightly. It shows respect and is used for greetings.",
    culturalNoteHebrew: "ה'וואי' מבוצע על ידי לחיצת כפות הידיים יחד בגובה החזה וקידה קלה. זה מראה כבוד ומשמש לברכות."
  },
  {
    id: 9,
    title: "Practice Dialogues",
    titleHebrew: "תרגול דיאלוגים",
    description: "Practice real-life scenarios combining all previous lessons",
    descriptionHebrew: "תרגל תרחישים מהחיים האמיתיים המשלבים את כל השיעורים הקודמים",
    image: "/images/lesson9-practice.jpg",
    phrases: [
      {
        thai: "สวัสดีครับ ขอเมนูหน่อยครับ",
        phonetic: "sà-wàt-dii khráp, khǎaw mee-nuu nàauy khráp",
        english: "Hello, can I have the menu please?",
        hebrew: "שלום, אפשר לקבל את התפריט בבקשה?",
        audio: "/audio/lesson1-hello.wav"
      }
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: "In a restaurant, what should you say first?",
        questionHebrew: "במסעדה, מה כדאי לומר ראשון?",
        options: ["สวัสดีครับ", "เก็บเงินด้วยครับ", "แพงไป"],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 10,
    title: "Review & Survival Phrases",
    titleHebrew: "סיכום וביטויי הישרדות",
    description: "Master the most essential phrases for traveling in Thailand",
    descriptionHebrew: "שלוט בביטויים החיוניים ביותר לנסיעה בתאילנד",
    image: "/images/lesson10-review.jpg",
    phrases: [
      {
        thai: "สวัสดีครับ/ค่ะ",
        phonetic: "sà-wàt-dii khráp/khâ",
        english: "Hello",
        hebrew: "שלום",
        audio: "/audio/lesson1-hello.wav"
      },
      {
        thai: "ขอบคุณครับ/ค่ะ",
        phonetic: "khàawp-khun khráp/khâ",
        english: "Thank you",
        hebrew: "תודה",
        audio: "/audio/lesson1-thankyou.wav"
      },
      {
        thai: "ราคาเท่าไหร่",
        phonetic: "raa-khaa thâo-rài",
        english: "How much?",
        hebrew: "כמה?",
        audio: "/audio/lesson4-howmuch.wav"
      },
      {
        thai: "ช่วยด้วย",
        phonetic: "chûuai dûuai",
        english: "Help!",
        hebrew: "הצילו!",
        audio: "/audio/lesson7-help.wav"
      }
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: "Final Quiz: What's the most important phrase to remember?",
        questionHebrew: "חידון סיום: מהו הביטוי החשוב ביותר לזכור?",
        options: ["สวัสดีครับ (Hello)", "ขอบคุณครับ (Thank you)", "All of them!"],
        correctAnswer: 2
      }
    ],
    culturalNote: "Congratulations! You've completed the Thai language course. Practice these phrases during your trip and enjoy Thailand!",
    culturalNoteHebrew: "מזל טוב! סיימת את קורס השפה התאילנדית. תרגל את הביטויים האלה במהלך הטיול שלך ותהנה מתאילנד!"
  }
];
