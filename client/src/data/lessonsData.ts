import { Lesson } from "@/components/InteractiveLessonPlayer";

export const lessonsData: Lesson[] = [
  {
    id: 1,
    title: "Greetings & Introductions",
    titleHebrew: "ברכות והיכרות",
    icon: "🙏",
    phrases: [
      {
        id: 1,
        english: "Hello / Goodbye",
        hebrew: "שלום / להתראות",
        thai: "สวัสดี",
        phonetic: "sa-wat-dee",
        scenario: "Use this greeting at any time of day. Add 'ครับ' (khrap) if you're male or 'ค่ะ' (kha) if you're female after 'สวัสดี'.",
        culturalTip: "Always accompany 'สวัสดี' with a 'wai' gesture (hands together in prayer position) when greeting elders or in formal situations."
      },
      {
        id: 2,
        english: "Thank you",
        hebrew: "תודה",
        thai: "ขอบคุณ",
        phonetic: "khop-khun",
        scenario: "Use after receiving service, food, or help. Add 'ครับ/ค่ะ' (khrap/kha) at the end for politeness.",
        culturalTip: "Thais appreciate gratitude! Saying 'ขอบคุณมาก' (khop-khun maak) means 'thank you very much' and shows extra appreciation."
      },
      {
        id: 3,
        english: "You're welcome / No problem",
        hebrew: "אין בעד מה / אין בעיה",
        thai: "ไม่เป็นไร",
        phonetic: "mai-pen-rai",
        scenario: "Respond to 'thank you' or use when someone apologizes. This phrase embodies the Thai 'easy-going' philosophy.",
        culturalTip: "'ไม่เป็นไร' (mai-pen-rai) is one of the most important phrases in Thai culture - it means 'no worries', 'it's okay', or 'don't worry about it'."
      },
      {
        id: 4,
        english: "Excuse me / Sorry",
        hebrew: "סליחה",
        thai: "ขอโทษ",
        phonetic: "khor-toht",
        scenario: "Use to get someone's attention, apologize, or when you need to pass through a crowd.",
        culturalTip: "Thais rarely show anger in public. Saying 'ขอโทษ' with a smile resolves most situations gracefully."
      },
      {
        id: 5,
        english: "Do you speak English?",
        hebrew: "אתה מדבר אנגלית?",
        thai: "คุณพูดภาษาอังกฤษได้ไหม",
        phonetic: "khun poot paa-saa ang-grit dai mai",
        scenario: "Ask this when you need help and aren't sure if the person speaks English. Most young Thais in tourist areas speak some English.",
        culturalTip: "Even if they say 'yes', their English might be basic. Speak slowly and use simple words."
      }
    ],
    dialogue: [
      {
        speaker: "Yossi",
        speakerHebrew: "יוסי",
        thai: "สวัสดีครับ",
        phonetic: "sa-wat-dee khrap",
        hebrew: "שלום (גבר)"
      },
      {
        speaker: "Thai shopkeeper",
        speakerHebrew: "בעל חנות תאילנדי",
        thai: "สวัสดีค่ะ ยินดีต้อนรับ",
        phonetic: "sa-wat-dee kha yin-dee ton-rap",
        hebrew: "שלום, ברוכים הבאים"
      },
      {
        speaker: "Yossi",
        speakerHebrew: "יוסי",
        thai: "ขอบคุณครับ",
        phonetic: "khop-khun khrap",
        hebrew: "תודה רבה"
      },
      {
        speaker: "Shopkeeper",
        speakerHebrew: "בעל החנות",
        thai: "ไม่เป็นไรค่ะ",
        phonetic: "mai-pen-rai kha",
        hebrew: "אין בעד מה"
      }
    ],
    exercises: [
      {
        id: 1,
        question: "How do you say 'Hello' in Thai?",
        questionHebrew: "איך אומרים 'שלום' בתאילנדית?",
        options: ["สวัสดี", "ขอบคุณ", "ไม่เป็นไร", "ขอโทษ"],
        correctAnswer: 0,
        explanation: "สวัสดี (sa-wat-dee) is the universal greeting in Thai, used for both hello and goodbye.",
        explanationHebrew: "סוואסדี היא הברכה האוניברסלית בתאילנדית, משמשת גם לשלום וגם להתראות."
      },
      {
        id: 2,
        question: "What should a male add after 'สวัสดี' to be polite?",
        questionHebrew: "מה גבר צריך להוסיף אחרי 'סוואסדี' כדי להיות מנומס?",
        options: ["ค่ะ (kha)", "ครับ (khrap)", "มาก (maak)", "ได้ (dai)"],
        correctAnswer: 1,
        explanation: "Males use 'ครับ' (khrap) at the end of sentences for politeness, while females use 'ค่ะ' (kha).",
        explanationHebrew: "גברים משתמשים ב-'คราบ' בסוף משפטים לנימוס, בעוד נשים משתמשות ב-'คะ'."
      },
      {
        id: 3,
        question: "What gesture should accompany 'สวัสดี' in formal situations?",
        questionHebrew: "איזו מחווה צריכה ללוות את 'סוואסדี' במצבים פורמליים?",
        options: ["Handshake / לחיצת יד", "Wave / נפנוף", "Wai (prayer hands) / ווי (ידיים בתנוחת תפילה)", "Bow / קידה"],
        correctAnswer: 2,
        explanation: "The 'wai' gesture (hands together in prayer position) shows respect and is essential in formal greetings.",
        explanationHebrew: "מחוות ה-'ווי' (ידיים ביחד בתנוחת תפילה) מראה כבוד והיא חיונית בברכות פורמליות."
      }
    ]
  },
  {
    id: 2,
    title: "Numbers & Time",
    titleHebrew: "מספרים וזמן",
    icon: "🔢",
    phrases: [
      {
        id: 6,
        english: "One",
        hebrew: "אחד",
        thai: "หนึ่ง",
        phonetic: "neung",
        scenario: "Use when ordering one item, counting, or giving your phone number.",
        culturalTip: "When counting items, you often need to add a classifier word after the number. For example: 'หนึ่งคน' (neung khon) = one person."
      },
      {
        id: 7,
        english: "Two",
        hebrew: "שניים",
        thai: "สอง",
        phonetic: "song",
        scenario: "Ordering two of something, telling time (2 o'clock), or counting people.",
        culturalTip: "In markets, hold up two fingers when saying 'สอง' to avoid confusion."
      },
      {
        id: 8,
        english: "How much?",
        hebrew: "כמה זה עולה?",
        thai: "เท่าไหร่",
        phonetic: "tao-rai",
        scenario: "Essential for shopping, taking taxis, or buying street food. Point at the item and ask 'เท่าไหร่?'",
        culturalTip: "Vendors will often show you the price on a calculator if there's a language barrier."
      },
      {
        id: 9,
        english: "What time?",
        hebrew: "מה השעה?",
        thai: "กี่โมง",
        phonetic: "kii mohng",
        scenario: "Ask when buses leave, when shops open, or when meeting someone.",
        culturalTip: "Thai time system is different from Western 24-hour clock. They use different words for morning, afternoon, and evening hours."
      },
      {
        id: 10,
        english: "Ten / Twenty / One hundred",
        hebrew: "עשר / עשרים / מאה",
        thai: "สิบ / ยี่สิบ / ร้อย",
        phonetic: "sip / yee-sip / roy",
        scenario: "Essential for understanding prices. Most items in Thailand cost between 20-500 baht.",
        culturalTip: "Learn numbers 1-100 to negotiate prices and understand costs without a calculator."
      }
    ],
    dialogue: [
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "นี่เท่าไหร่ครับ",
        phonetic: "nee tao-rai khrap",
        hebrew: "כמה זה עולה?"
      },
      {
        speaker: "Vendor",
        speakerHebrew: "מוכר",
        thai: "สองร้อยบาทครับ",
        phonetic: "song roi baht khrap",
        hebrew: "מאתיים באט"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "แพงไป หนึ่งร้อยได้ไหม",
        phonetic: "paeng pai neung roi dai mai",
        hebrew: "יקר מדי, מאה בסדר?"
      },
      {
        speaker: "Vendor",
        speakerHebrew: "מוכר",
        thai: "ร้อยห้าสิบบาทครับ",
        phonetic: "roi haa-sip baht khrap",
        hebrew: "מאה חמישים באט"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ได้ครับ เอาครับ",
        phonetic: "dai khrap ao khrap",
        hebrew: "בסדר, אני אקח"
      }
    ],
    exercises: [
      {
        id: 4,
        question: "What does 'หนึ่ง' (neung) mean?",
        questionHebrew: "מה המשמעות של 'หนึ่ง' (נึง)?",
        options: ["Two / שניים", "One / אחד", "Ten / עשר", "Three / שלוש"],
        correctAnswer: 1,
        explanation: "'หนึ่ง' (neung) means 'one' - the most basic number for ordering and counting.",
        explanationHebrew: "'หนึ่ง' (נึג) פירושו 'אחד' - המספר הבסיסי ביותר להזמנות וספירה."
      },
      {
        id: 5,
        question: "How do you ask 'How much?' in Thai?",
        questionHebrew: "איך שואלים 'כמה זה עולה?' בתאילנדית?",
        options: ["กี่โมง", "เท่าไหร่", "สิบ", "สอง"],
        correctAnswer: 1,
        explanation: "'เท่าไหร่' (tao-rai) means 'how much?' - essential for shopping and bargaining.",
        explanationHebrew: "'เท่าไหร่' (טאו-ไร) פירושו 'כמה?' - חיוני לקניות ומיקוח."
      },
      {
        id: 6,
        question: "What is unique about Thai counting that tourists should know?",
        questionHebrew: "מה ייחודי בספירה התאילנדית שתיירים צריכים לדעת?",
        options: ["Numbers are the same as English / המספרים זהים לאנגלית", "You need classifier words after numbers / צריך מילות סיווג אחרי מספרים", "They only count to 10 / סופרים רק עד 10", "Numbers are written right to left / מספרים נכתבים מימין לשמאל"],
        correctAnswer: 1,
        explanation: "Thai uses classifier words after numbers. For example, 'หนึ่งคน' (neung khon) = one person, where 'คน' is the classifier for people.",
        explanationHebrew: "בתאילנדית משתמשים במילות סיווג אחרי מספרים. למשל, 'หนึ่งคน' (נึג קון) = אדם אחד, כש-'คน' היא מילת הסיווג לאנשים."
      },
      {
        id: 7,
        question: "How do you say 'twenty' in Thai?",
        questionHebrew: "איך אומרים 'עשרים' בתאילנדית?",
        options: ["สิบ (sip)", "ยี่สิบ (yee-sip)", "ร้อย (roi)", "หนึ่ง (neung)"],
        correctAnswer: 1,
        explanation: "'ยี่สิบ' (yee-sip) means twenty. Thai numbers follow a pattern: สิบ (10), ยี่สิบ (20), สามสิบ (30), etc.",
        explanationHebrew: "'ยี่สิบ' (יי-סิป) פירושו עשרים. המספרים בתאילנדית עוקבים אחר דפוס: สิบ (10), ยี่สิบ (20), สามสิบ (30), וכו'."
      }
    ]
  },
  {
    id: 3,
    title: "Ordering Food",
    titleHebrew: "הזמנת אוכל",
    icon: "🍜",
    phrases: [
      {
        id: 11,
        english: "I would like...",
        hebrew: "אני רוצה...",
        thai: "ขอ...",
        phonetic: "khor...",
        scenario: "Start any order with 'ขอ' followed by what you want. For example: 'ขอน้ำ' (khor nam) = 'I'd like water'.",
        culturalTip: "Always add 'ครับ/ค่ะ' at the end to be polite: 'ขอข้าวผัดครับ' (khor khao pad khrap) = 'I'd like fried rice, please'."
      },
      {
        id: 12,
        english: "Not spicy / A little spicy / Very spicy",
        hebrew: "לא חריף / קצת חריף / מאוד חריף",
        thai: "ไม่เผ็ด / เผ็ดนิดหน่อย / เผ็ดมาก",
        phonetic: "mai phet / phet nit noi / phet maak",
        scenario: "CRITICAL for Israeli travelers! Thai 'not spicy' is still spicy by Western standards. Say 'ไม่เผ็ดเลย' (mai phet loei) for absolutely no spice.",
        culturalTip: "If it's too spicy, eat rice or drink milk/yogurt. Water makes it worse! Thai people love spicy food, so they might not understand 'not spicy'."
      },
      {
        id: 13,
        english: "Vegetarian / No pork / No beef",
        hebrew: "צמחוני / בלי חזיר / בלי בקר",
        thai: "เจ / ไม่เอาหมู / ไม่เอาเนื้อ",
        phonetic: "jay / mai ao muu / mai ao neuua",
        scenario: "'เจ' (jay) means strict vegetarian (no meat, eggs, or dairy). If you eat eggs/dairy, say 'ผักเท่านั้น' (pak tao-nan) = vegetables only.",
        culturalTip: "For kosher travelers: Pork is very common in Thai food. Always specify 'ไม่เอาหมู' (no pork) when ordering."
      },
      {
        id: 14,
        english: "Delicious!",
        hebrew: "טעים!",
        thai: "อร่อย",
        phonetic: "a-roi",
        scenario: "Compliment the chef or vendor after eating. They'll smile and appreciate it!",
        culturalTip: "Say 'อร่อยมาก' (a-roi maak) for 'very delicious!' - vendors love hearing this from foreigners."
      },
      {
        id: 15,
        english: "Check please / Bill please",
        hebrew: "חשבון בבקשה",
        thai: "เช็คบิล",
        phonetic: "check bin",
        scenario: "Wave your hand and say this to get the bill at restaurants. You can also make a writing gesture in the air.",
        culturalTip: "In Thailand, you usually pay at the counter, not at the table. Take the bill to the cashier near the entrance."
      }
    ],
    dialogue: [
      {
        speaker: "Waiter",
        speakerHebrew: "מלצר",
        thai: "สั่งอะไรดีครับ",
        phonetic: "sang arai dee khrap",
        hebrew: "מה תרצה להזמין?"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ขอผัดไทยไม่เผ็ดครับ",
        phonetic: "khor pad thai mai phet khrap",
        hebrew: "אני רוצה פאד תאי לא חריף בבקשה"
      },
      {
        speaker: "Waiter",
        speakerHebrew: "מלצר",
        thai: "ไม่เอาหมูใช่ไหมครับ",
        phonetic: "mai ao muu chai mai khrap",
        hebrew: "בלי חזיר, נכון?"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ใช่ครับ ไม่เอาหมู",
        phonetic: "chai khrap mai ao muu",
        hebrew: "נכון, בלי חזיר"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "อร่อยมากครับ เช็คบิลด้วย",
        phonetic: "a-roi maak khrap check bin duay",
        hebrew: "טעים מאוד! חשבון בבקשה"
      }
    ],
    exercises: [
      {
        id: 8,
        question: "How do you start an order in Thai?",
        questionHebrew: "איך מתחילים הזמנה בתאילנדית?",
        options: ["เอา (ao)", "ขอ (khor)", "เช็คบิล (check bin)", "อร่อย (a-roi)"],
        correctAnswer: 1,
        explanation: "'ขอ' (khor) means 'I would like...' and is the polite way to start any food order in Thai.",
        explanationHebrew: "'ขอ' (קור) פירושו 'הייתי רוצה...' וזו הדרך המנומסת להתחיל כל הזמנת אוכל בתאילנדית."
      },
      {
        id: 9,
        question: "How do you say 'not spicy' in Thai?",
        questionHebrew: "איך אומרים 'לא חריף' בתאילנדית?",
        options: ["เผ็ดมาก (phet maak)", "เผ็ดนิดหน่อย (phet nit noi)", "ไม่เผ็ด (mai phet)", "อร่อย (a-roi)"],
        correctAnswer: 2,
        explanation: "'ไม่เผ็ด' (mai phet) means 'not spicy'. For absolutely no spice, say 'ไม่เผ็ดเลย' (mai phet loei).",
        explanationHebrew: "'ไม่เผ็ด' (מאי פט) פירושו 'לא חריף'. בשביל בלי שום חריפות, אמרו 'ไม่เผ็ดเลย' (מאי פט לוי)."
      },
      {
        id: 10,
        question: "What does 'เจ' (jay) mean for food?",
        questionHebrew: "מה המשמעות של 'เจ' (ג'יי) בהקשר אוכל?",
        options: ["Spicy / חריף", "Delicious / טעים", "Strict vegetarian / צמחוני קפדני", "Expensive / יקר"],
        correctAnswer: 2,
        explanation: "'เจ' (jay) means strict vegetarian - no meat, eggs, or dairy. Important for kosher travelers to also specify 'ไม่เอาหมู' (no pork).",
        explanationHebrew: "'เจ' (ג'יי) פירושו צמחוני קפדני - ללא בשר, ביצים או חלב. חשוב לשומרי כשרות לציין גם 'ไม่เอาหมู' (ללא חזיר)."
      },
      {
        id: 11,
        question: "What should you do if the food is too spicy?",
        questionHebrew: "מה צריך לעשות אם האוכל חריף מדי?",
        options: ["Drink water / לשתות מים", "Eat rice or drink milk / לאכול אורז או לשתות חלב", "Add more chili / להוסיף עוד צ'ילי", "Leave immediately / לעזוב מיד"],
        correctAnswer: 1,
        explanation: "Rice and milk/yogurt help neutralize spiciness. Water actually makes it worse! This is important cultural knowledge for eating in Thailand.",
        explanationHebrew: "אורז וחלב/יוגורט עוזרים לנטרל חריפות. מים דווקא מחמירים את המצב! זהו ידע תרבותי חשוב לאכילה בתאילנד."
      }
    ]
  },
  {
    id: 4,
    title: "Shopping & Bargaining",
    titleHebrew: "קניות ומיקוח",
    icon: "🛍️",
    phrases: [
      {
        id: 51,
        english: "How much is this?",
        hebrew: "כמה זה עולה?",
        thai: "นี่เท่าไหร่",
        phonetic: "nee tao-rai",
        scenario: "Essential for shopping at markets, street vendors, or anywhere without price tags.",
        culturalTip: "Always ask the price before buying. Prices at markets are often negotiable, but stay polite and smile."
      },
      {
        id: 16,
        english: "Too expensive",
        hebrew: "יקר מדי",
        thai: "แพงไป",
        phonetic: "paeng pai",
        scenario: "Use at markets when you think the price is too high. Say it with a smile, not aggressively!",
        culturalTip: "Bargaining is expected at markets but NOT at malls or 7-Eleven. Start by offering 50-60% of the asking price."
      },
      {
        id: 17,
        english: "Can you give a discount?",
        hebrew: "אפשר הנחה?",
        thai: "ลดได้ไหม",
        phonetic: "lot dai mai",
        scenario: "Ask politely with a smile at markets, especially if buying multiple items.",
        culturalTip: "Buying multiple items? Say 'ซื้อหลายอัน ลดได้ไหม' (seu lai an, lot dai mai) = 'buying many, can discount?'"
      },
      {
        id: 18,
        english: "I'll take it",
        hebrew: "אני אקח את זה",
        thai: "เอาค่ะ / เอาครับ",
        phonetic: "ao kha / ao khrap",
        scenario: "Say this when you've agreed on a price and want to buy the item.",
        culturalTip: "Once you say 'เอา', the deal is done. Don't back out or the vendor will be upset."
      },
      {
        id: 19,
        english: "Do you have...?",
        hebrew: "יש לך...?",
        thai: "มี...ไหม",
        phonetic: "mee... mai",
        scenario: "Looking for a specific item? Say 'มี' (mee) + [item name] + 'ไหม' (mai). For example: 'มีขนาดเล็กไหม' (mee kha-nat lek mai) = 'Do you have small size?'",
        culturalTip: "Point at what you want and ask 'มีไหม' if you don't know the Thai word."
      },
      {
        id: 20,
        english: "Just looking",
        hebrew: "רק מסתכל",
        thai: "ดูก่อน",
        phonetic: "doo gon",
        scenario: "Vendors at markets can be pushy. Say this politely to browse without pressure.",
        culturalTip: "Smile and say 'ดูก่อนนะ' (doo gon na) - the 'นะ' (na) makes it softer and more polite."
      },
      {
        id: 55,
        english: "Do you have a smaller size?",
        hebrew: "יש לך מידה קטנה יותר?",
        thai: "มีไซส์เล็กกว่านี้ไหม",
        phonetic: "mee size lek kwa nee mai",
        scenario: "For clothing shopping. Replace 'เล็ก' (small) with 'ใหญ่' (yai) for larger.",
        culturalTip: "Thai sizes run small. Try before buying, and don't be shy about asking for different sizes."
      }
    ],
    dialogue: [
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "นี่เท่าไหร่ครับ",
        phonetic: "nee tao-rai khrap",
        hebrew: "כמה זה עולה?"
      },
      {
        speaker: "Vendor",
        speakerHebrew: "מוכר",
        thai: "สามร้อยบาทค่ะ",
        phonetic: "saam roi baht kha",
        hebrew: "שלוש מאות באט"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "แพงไป ลดได้ไหมครับ",
        phonetic: "paeng pai lot dai mai khrap",
        hebrew: "יקר מדי, אפשר הנחה?"
      },
      {
        speaker: "Vendor",
        speakerHebrew: "מוכר",
        thai: "สองร้อยห้าสิบค่ะ",
        phonetic: "song roi haa-sip kha",
        hebrew: "מאתיים חמישים"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "สองร้อยได้ไหม",
        phonetic: "song roi dai mai",
        hebrew: "מאתיים בסדר?"
      },
      {
        speaker: "Vendor",
        speakerHebrew: "מוכר",
        thai: "ได้ค่ะ เอาเลย",
        phonetic: "dai kha ao loei",
        hebrew: "בסדר, קח"
      }
    ],
    exercises: [
      {
        id: 12,
        question: "How do you say 'How much is this?' in Thai?",
        questionHebrew: "איך אומרים 'כמה זה עולה?' בתאילנדית?",
        options: ["ลดได้ไหม", "นี่เท่าไหร่", "แพงไป", "ดูก่อน"],
        correctAnswer: 1,
        explanation: "'นี่เท่าไหร่' (nee tao-rai) means 'How much is this?' - the first phrase you need when shopping.",
        explanationHebrew: "'นี่เท่าไหร่' (ני טאו-ไร) פירושו 'כמה זה עולה?' - הביטוי הראשון שתצטרכו בקניות."
      },
      {
        id: 13,
        question: "What does 'แพงไป' (paeng pai) mean?",
        questionHebrew: "מה המשמעות של 'แพงไป' (แפง ไป)?",
        options: ["I'll take it / אני אקח את זה", "Too cheap / זול מדי", "Too expensive / יקר מדי", "Just looking / רק מסתכל"],
        correctAnswer: 2,
        explanation: "'แพงไป' (paeng pai) means 'too expensive' - use it with a smile to start bargaining at markets.",
        explanationHebrew: "'แพงไป' (แפง ไป) פירושו 'יקר מדי' - אמרו את זה עם חיוך כדי להתחיל להתמקח בשווקים."
      },
      {
        id: 14,
        question: "Where is bargaining expected in Thailand?",
        questionHebrew: "איפה מצופה להתמקח בתאילנד?",
        options: ["At 7-Eleven / ב-7-Eleven", "At shopping malls / בקניונים", "At markets and street vendors / בשווקים ודוכנים", "At all shops / בכל החנויות"],
        correctAnswer: 2,
        explanation: "Bargaining is expected at markets but NOT at malls or convenience stores. Start by offering 50-60% of the asking price.",
        explanationHebrew: "מיקוח מצופה בשווקים אבל לא בקניונים או מכולות. התחילו בהצעת 50-60% מהמחיר המבוקש."
      },
      {
        id: 15,
        question: "What happens after you say 'เอา' (ao) to a vendor?",
        questionHebrew: "מה קורה אחרי שאומרים 'เอา' (או) למוכר?",
        options: ["You can still negotiate / אפשר עדיין להתמקח", "The deal is done / העסקה נסגרה", "The vendor gives a discount / המוכר נותן הנחה", "You must leave / חייבים לעזוב"],
        correctAnswer: 1,
        explanation: "Once you say 'เอา' (ao - I'll take it), the deal is done. Don't back out or the vendor will be upset.",
        explanationHebrew: "ברגע שאמרתם 'เอา' (או - אני אקח), העסקה נסגרה. אל תחזרו בכם כי המוכר יעלב."
      }
    ]
  },
  {
    id: 5,
    title: "Transportation & Directions",
    titleHebrew: "תחבורה וכיוונים",
    icon: "🚕",
    phrases: [
      {
        id: 21,
        english: "Please use the meter",
        hebrew: "תשתמש במונה בבקשה",
        thai: "เปิดมิเตอร์",
        phonetic: "pert meter",
        scenario: "ESSENTIAL for taxis in Bangkok! Say this immediately when getting in. If driver refuses, get out and find another taxi.",
        culturalTip: "Meter starts at 35 baht. If driver says 'no meter' and quotes a price, it's usually 3-5x more expensive."
      },
      {
        id: 22,
        english: "How much to...?",
        hebrew: "כמה עולה ל...?",
        thai: "ไป...เท่าไหร่",
        phonetic: "pai... tao-rai",
        scenario: "For tuk-tuks, motorcycle taxis, or boats where there's no meter. Agree on price BEFORE getting in!",
        culturalTip: "Normal Bangkok taxi rides cost 60-150 baht with meter. Tuk-tuks charge 100-300 baht for short trips."
      },
      {
        id: 23,
        english: "Stop here please",
        hebrew: "תעצור כאן בבקשה",
        thai: "จอดตรงนี้",
        phonetic: "jot trong nee",
        scenario: "Tell the driver to stop at your destination. Point and say this phrase.",
        culturalTip: "If you're not sure exactly where to stop, say 'จอดตรงนี้ได้ไหม' (jot trong nee dai mai) = 'Can you stop here?'"
      },
      {
        id: 24,
        english: "Turn left / Turn right",
        hebrew: "פנה שמאלה / פנה ימינה",
        thai: "เลี้ยวซ้าย / เลี้ยวขวา",
        phonetic: "liao sai / liao khwa",
        scenario: "Give directions to taxi/tuk-tuk drivers. Point while saying it to be clear.",
        culturalTip: "Learn these well! Drivers often don't speak English, so knowing left/right in Thai is crucial."
      },
      {
        id: 25,
        english: "Go straight",
        hebrew: "לך ישר",
        thai: "ตรงไป",
        phonetic: "trong pai",
        scenario: "Tell the driver to keep going straight. Combine with 'เลี้ยวซ้าย' or 'เลี้ยวขวา' for full directions.",
        culturalTip: "Use hand gestures along with words - point forward for 'ตรงไป', left for 'เลี้ยวซ้าย', right for 'เลี้ยวขวา'."
      }
    ],
    dialogue: [
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ไปเขาสานเปิดมิเตอร์ครับ",
        phonetic: "pai khao saan pert meter khrap",
        hebrew: "לקאוסאן, תפעיל מונה בבקשה"
      },
      {
        speaker: "Driver",
        speakerHebrew: "נהג",
        thai: "ได้ครับ ขึ้นมาเลย",
        phonetic: "dai khrap keun maa loei",
        hebrew: "בסדר, עלה"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ตรงไปครับ แล้วเลี้ยวซ้าย",
        phonetic: "trong pai khrap laew liao sai",
        hebrew: "ישר, ואז פנה שמאלה"
      },
      {
        speaker: "Driver",
        speakerHebrew: "נהג",
        thai: "เลี้ยวตรงนี้เลยครับ",
        phonetic: "liao trong nee loei khrap",
        hebrew: "לפנות כאן?"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ใช่ครับ จอดตรงนี้ได้เลย",
        phonetic: "chai khrap jot trong nee dai loei",
        hebrew: "כן, תעצור כאן"
      }
    ],
    exercises: [
      {
        id: 16,
        question: "What should you say immediately when getting into a Bangkok taxi?",
        questionHebrew: "מה צריך לומר מיד כשעולים למונית בבנגקוק?",
        options: ["จอดตรงนี้ (jot trong nee)", "เลี้ยวซ้าย (liao sai)", "เปิดมิเตอร์ (pert meter)", "ตรงไป (trong pai)"],
        correctAnswer: 2,
        explanation: "'เปิดมิเตอร์' (pert meter) means 'use the meter'. Essential to avoid being overcharged. If the driver refuses, find another taxi.",
        explanationHebrew: "'เปิดมิเตอร์' (เפירט מיטר) פירושו 'הפעל את המונה'. חיוני כדי לא לשלם מחיר מנופח. אם הנהג מסרב, חפשו מונית אחרת."
      },
      {
        id: 17,
        question: "How do you say 'turn right' in Thai?",
        questionHebrew: "איך אומרים 'פנה ימינה' בתאילנדית?",
        options: ["เลี้ยวซ้าย (liao sai)", "ตรงไป (trong pai)", "เลี้ยวขวา (liao khwa)", "จอดตรงนี้ (jot trong nee)"],
        correctAnswer: 2,
        explanation: "'เลี้ยวขวา' (liao khwa) means 'turn right'. Point while saying it to make sure the driver understands.",
        explanationHebrew: "'เลี้ยวขวา' (เลียว ควา) פירושו 'פנה ימינה'. הצביעו תוך כדי אמירה כדי לוודא שהנהג מבין."
      },
      {
        id: 18,
        question: "What is the starting meter fare in Bangkok taxis?",
        questionHebrew: "מהו מחיר הפתיחה של מונה במוניות בנגקוק?",
        options: ["20 baht / באט", "35 baht / באט", "50 baht / באט", "100 baht / באט"],
        correctAnswer: 1,
        explanation: "The meter starts at 35 baht. If a driver quotes a flat price without meter, it's usually 3-5x more expensive.",
        explanationHebrew: "המונה מתחיל ב-35 באט. אם נהג מציע מחיר קבוע בלי מונה, זה בדרך כלל 3-5 פעמים יותר יקר."
      }
    ]
  },
  {
    id: 6,
    title: "Accommodation",
    titleHebrew: "לינה",
    icon: "🏨",
    phrases: [
      {
        id: 26,
        english: "Do you have a room available?",
        hebrew: "יש לכם חדר פנוי?",
        thai: "มีห้องว่างไหม",
        phonetic: "mee hong wang mai",
        scenario: "Walk-in to a hotel or guesthouse and ask this. Many places offer better rates for walk-ins than online bookings.",
        culturalTip: "If they say 'มี' (mee) = yes, ask 'ราคาเท่าไหร่' (raa-kha tao-rai) = 'What's the price?'"
      },
      {
        id: 27,
        english: "How much per night?",
        hebrew: "כמה ללילה?",
        thai: "คืนละเท่าไหร่",
        phonetic: "keun la tao-rai",
        scenario: "Essential for comparing prices. Budget hostels: 150-400 baht/night. Mid-range hotels: 800-2000 baht/night.",
        culturalTip: "Staying multiple nights? Ask 'ถ้าพักหลายคืน ลดได้ไหม' (taa pak lai keun, lot dai mai) = 'If I stay many nights, can you discount?'"
      },
      {
        id: 28,
        english: "Can I see the room first?",
        hebrew: "אפשר לראות את החדר קודם?",
        thai: "ขอดูห้องก่อนได้ไหม",
        phonetic: "khor doo hong gon dai mai",
        scenario: "ALWAYS ask to see the room before paying, especially at budget places. Check AC, hot water, cleanliness.",
        culturalTip: "It's completely normal to ask to see the room. If they refuse, that's a red flag - find another place."
      },
      {
        id: 29,
        english: "The AC doesn't work",
        hebrew: "המזגן לא עובד",
        thai: "แอร์เสีย",
        phonetic: "air sia",
        scenario: "Report problems immediately. Also useful: 'น้ำร้อนไม่มี' (nam ron mai mee) = 'No hot water'.",
        culturalTip: "Most hotels will fix problems quickly or move you to another room. Be polite but firm."
      },
      {
        id: 30,
        english: "Can I extend one more night?",
        hebrew: "אפשר להאריך לילה נוסף?",
        thai: "ขอพักต่ออีกคืนได้ไหม",
        phonetic: "khor pak tor eek keun dai mai",
        scenario: "Decide to stay longer? Ask this at reception. They'll usually say yes if rooms are available.",
        culturalTip: "Book early during high season (Nov-Feb) as popular places fill up quickly."
      }
    ],
    dialogue: [
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "มีห้องว่างไหมครับ",
        phonetic: "mee hong wang mai khrap",
        hebrew: "יש לכם חדר פנוי?"
      },
      {
        speaker: "Receptionist",
        speakerHebrew: "פקיד קבלה",
        thai: "มีค่ะ ห้องเดี่ยวหรือห้องคู่คะ",
        phonetic: "mee kha hong diao rue hong koo kha",
        hebrew: "כן, חדר ליחיד או לזוג?"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ห้องเดี่ยวครับ คืนละเท่าไหร่",
        phonetic: "hong diao khrap keun la tao-rai",
        hebrew: "חדר ליחיד, כמה ללילה?"
      },
      {
        speaker: "Receptionist",
        speakerHebrew: "פקיד קבלה",
        thai: "แปดร้อยบาทค่ะ รวมอาหารเช้า",
        phonetic: "paet roi baht kha ruam aa-haan chao",
        hebrew: "שמונה מאות באט, כולל ארוחת בוקר"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ขอดูห้องก่อนได้ไหมครับ",
        phonetic: "khor doo hong gon dai mai khrap",
        hebrew: "אפשר לראות את החדר קודם?"
      }
    ],
    exercises: [
      {
        id: 19,
        question: "How do you ask if a room is available in Thai?",
        questionHebrew: "איך שואלים אם יש חדר פנוי בתאילנדית?",
        options: ["คืนละเท่าไหร่", "มีห้องว่างไหม", "ขอดูห้องก่อนได้ไหม", "แอร์เสีย"],
        correctAnswer: 1,
        explanation: "'มีห้องว่างไหม' (mee hong wang mai) means 'Do you have a room available?' - the first question when looking for accommodation.",
        explanationHebrew: "'มีห้องว่างไหม' (מי הונג וואנג מאי) פירושו 'יש לכם חדר פנוי?' - השאלה הראשונה כשמחפשים לינה."
      },
      {
        id: 20,
        question: "What does 'แอร์เสีย' (air sia) mean?",
        questionHebrew: "מה המשמעות של 'แอร์เสีย' (แอร์ เสีย)?",
        options: ["The room is nice / החדר נחמד", "The AC doesn't work / המזגן לא עובד", "I need a key / אני צריך מפתח", "The view is beautiful / הנוף יפה"],
        correctAnswer: 1,
        explanation: "'แอร์เสีย' (air sia) means 'the AC doesn't work' - a critical phrase in Thailand's hot climate!",
        explanationHebrew: "'แอร์เสีย' (แอร์ เสีย) פירושו 'המזגן לא עובד' - ביטוי קריטי באקלים החם של תאילנד!"
      },
      {
        id: 21,
        question: "Why should you always ask to see the room before paying?",
        questionHebrew: "למה תמיד צריך לבקש לראות את החדר לפני התשלום?",
        options: ["It's cheaper that way / זה יותר זול ככה", "To check AC, hot water, and cleanliness / לבדוק מזגן, מים חמים, וניקיון", "It's not allowed to pay first / אסור לשלם קודם", "To take photos / כדי לצלם"],
        correctAnswer: 1,
        explanation: "Always check AC, hot water, and cleanliness before paying. If they refuse to show the room, it's a red flag - find another place.",
        explanationHebrew: "תמיד בדקו מזגן, מים חמים וניקיון לפני התשלום. אם מסרבים להראות את החדר, זה סימן מחשיד - חפשו מקום אחר."
      }
    ]
  },
  {
    id: 7,
    title: "Emergencies & Help",
    titleHebrew: "מצבי חירום ועזרה",
    icon: "🆘",
    phrases: [
      {
        id: 31,
        english: "Help!",
        hebrew: "עזרה!",
        thai: "ช่วยด้วย",
        phonetic: "chuay duay",
        scenario: "Emergency situations - shout this loudly if you need immediate help. Thais will come to assist.",
        culturalTip: "Tourist Police number: 1155 (English-speaking). Save this in your phone!"
      },
      {
        id: 32,
        english: "I need a doctor",
        hebrew: "אני צריך רופא",
        thai: "ต้องการหมอ",
        phonetic: "tong-gaan mor",
        scenario: "Medical emergency. Say this at your hotel and they'll call a doctor or take you to hospital.",
        culturalTip: "Bangkok hospitals (Bumrungrad, Samitivej) have excellent English-speaking doctors and accept international insurance."
      },
      {
        id: 33,
        english: "Call the police",
        hebrew: "תתקשר למשטרה",
        thai: "โทรตำรวจ",
        phonetic: "toh tam-ruat",
        scenario: "For theft, scams, or serious problems. Tourist Police (1155) speak English and are more helpful than regular police.",
        culturalTip: "For minor issues, try to resolve peacefully first. Thais prefer to avoid confrontation and police involvement."
      },
      {
        id: 34,
        english: "Where is the hospital?",
        hebrew: "איפה בית החולים?",
        thai: "โรงพยาบาลอยู่ที่ไหน",
        phonetic: "rohng-pa-ya-baan yoo tee-nai",
        scenario: "Need medical attention? Ask this or show this phrase to a taxi driver.",
        culturalTip: "Pharmacies (ร้านขายยา - raan kai yaa) are everywhere and pharmacists can help with minor issues."
      },
      {
        id: 35,
        english: "I lost my passport",
        hebrew: "איבדתי את הדרכון",
        thai: "พาสปอร์ตหาย",
        phonetic: "passport hai",
        scenario: "Go immediately to your embassy and file a police report. Israeli Embassy Bangkok: +66 2 204 9200.",
        culturalTip: "Keep a photocopy of your passport separate from the original. Hotels often accept copies for check-in."
      }
    ],
    dialogue: [
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ช่วยด้วยครับ ต้องการหมอ",
        phonetic: "chuay duay khrap tong-gaan mor",
        hebrew: "עזרה! אני צריך רופא"
      },
      {
        speaker: "Local",
        speakerHebrew: "מקומי",
        thai: "เป็นอะไรครับ",
        phonetic: "pen arai khrap",
        hebrew: "מה קרה?"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "โรงพยาบาลอยู่ที่ไหนครับ",
        phonetic: "rohng-pa-ya-baan yoo tee-nai khrap",
        hebrew: "איפה בית החולים?"
      },
      {
        speaker: "Local",
        speakerHebrew: "מקומי",
        thai: "ใกล้ๆ นี่ครับ ผมพาไป",
        phonetic: "klai klai nee khrap pom paa pai",
        hebrew: "קרוב מכאן, אני אקח אותך"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ขอบคุณมากครับ",
        phonetic: "khop-khun maak khrap",
        hebrew: "תודה רבה"
      }
    ],
    exercises: [
      {
        id: 22,
        question: "How do you shout 'Help!' in Thai?",
        questionHebrew: "איך צועקים 'עזרה!' בתאילנדית?",
        options: ["ขอโทษ (khor-toht)", "ช่วยด้วย (chuay duay)", "โทรตำรวจ (toh tam-ruat)", "ต้องการหมอ (tong-gaan mor)"],
        correctAnswer: 1,
        explanation: "'ช่วยด้วย' (chuay duay) means 'Help!' - shout it loudly in emergency situations and Thais will come to assist.",
        explanationHebrew: "'ช่วยด้วย' (צ'ואי דואי) פירושו 'עזרה!' - צעקו את זה בקול רם במצבי חירום ותאילנדים יבואו לעזור."
      },
      {
        id: 23,
        question: "What is the Tourist Police number in Thailand?",
        questionHebrew: "מהו מספר משטרת התיירים בתאילנד?",
        options: ["911", "999", "1155", "191"],
        correctAnswer: 2,
        explanation: "Tourist Police: 1155. They speak English and are more helpful than regular police for tourist issues.",
        explanationHebrew: "משטרת תיירים: 1155. הם דוברי אנגלית ויעילים יותר מהמשטרה הרגילה לבעיות של תיירים."
      },
      {
        id: 24,
        question: "What should you do if you lose your passport?",
        questionHebrew: "מה צריך לעשות אם איבדתם את הדרכון?",
        options: ["Go to the airport / ללכת לשדה התעופה", "Go to your embassy and file a police report / ללכת לשגרירות ולהגיש תלונה במשטרה", "Buy a new one at 7-Eleven / לקנות חדש ב-7-Eleven", "Wait at the hotel / לחכות במלון"],
        correctAnswer: 1,
        explanation: "Go immediately to your embassy and file a police report. Israeli Embassy Bangkok: +66 2 204 9200. Keep a photocopy of your passport separate from the original.",
        explanationHebrew: "לכו מיד לשגרירות והגישו תלונה במשטרה. שגרירות ישראל בנגקוק: +66 2 204 9200. שמרו צילום של הדרכון בנפרד מהמקור."
      }
    ]
  },
  {
    id: 8,
    title: "Temples & Etiquette",
    titleHebrew: "מקדשים ונימוסים",
    icon: "🛕",
    phrases: [
      {
        id: 36,
        english: "Can I take a photo?",
        hebrew: "אפשר לצלם?",
        thai: "ถ่ายรูปได้ไหม",
        phonetic: "tai roop dai mai",
        scenario: "Always ask before photographing monks, Buddha statues, or inside temple buildings.",
        culturalTip: "It's usually okay to photograph temple exteriors, but always ask for interiors and never photograph monks without permission."
      },
      {
        id: 37,
        english: "Where do I remove my shoes?",
        hebrew: "איפה אני מוריד נעליים?",
        thai: "ถอดรองเท้าที่ไหน",
        phonetic: "tot rong-tao tee-nai",
        scenario: "Look for a shoe rack near the entrance. If you see shoes lined up, that's where you remove yours.",
        culturalTip: "ALWAYS remove shoes before entering any temple building. Wear slip-on shoes for easy removal."
      },
      {
        id: 38,
        english: "Is this appropriate clothing?",
        hebrew: "זה לבוש מתאים?",
        thai: "แต่งตัวแบบนี้ได้ไหม",
        phonetic: "taeng tua baep nee dai mai",
        scenario: "Temples require covered shoulders and knees. If unsure, ask at the entrance. Many temples rent sarongs.",
        culturalTip: "Dress code: No shorts, no tank tops, no see-through clothing. Bring a light scarf to cover shoulders if needed."
      },
      {
        id: 39,
        english: "What is the entrance fee?",
        hebrew: "מה דמי הכניסה?",
        thai: "ค่าเข้าเท่าไหร่",
        phonetic: "kha kao tao-rai",
        scenario: "Major temples charge 50-200 baht entrance fee for foreigners. Thai citizens usually enter free.",
        culturalTip: "Grand Palace: 500 baht. Wat Pho: 200 baht. Wat Arun: 100 baht. Bring cash - they don't accept cards."
      },
      {
        id: 40,
        english: "Very beautiful",
        hebrew: "יפה מאוד",
        thai: "สวยมาก",
        phonetic: "suay maak",
        scenario: "Compliment temples, views, or artwork. Thais are proud of their culture and appreciate foreigners showing respect.",
        culturalTip: "When sitting in temples, never point your feet toward Buddha images. Tuck your feet to the side or behind you."
      }
    ],
    dialogue: [
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ถ่ายรูปได้ไหมครับ",
        phonetic: "tai roop dai mai khrap",
        hebrew: "אפשר לצלם?"
      },
      {
        speaker: "Guard",
        speakerHebrew: "שומר",
        thai: "ข้างนอกได้ครับ ข้างในไม่ได้",
        phonetic: "khaang nok dai khrap khaang nai mai dai",
        hebrew: "בחוץ כן, בפנים לא"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ค่าเข้าเท่าไหร่ครับ",
        phonetic: "kha kao tao-rai khrap",
        hebrew: "מה דמי הכניסה?"
      },
      {
        speaker: "Guard",
        speakerHebrew: "שומר",
        thai: "ร้อยบาทครับ ถอดรองเท้าด้วยนะครับ",
        phonetic: "roi baht khrap tot rong-tao duay na khrap",
        hebrew: "מאה באט, ותוריד נעליים"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "สวยมากครับ ขอบคุณครับ",
        phonetic: "suay maak khrap khop-khun khrap",
        hebrew: "יפה מאוד, תודה"
      }
    ],
    exercises: [
      {
        id: 25,
        question: "What must you always do before entering a Thai temple building?",
        questionHebrew: "מה חובה לעשות לפני כניסה לבניין מקדש תאילנדי?",
        options: ["Pay a fee / לשלם דמי כניסה", "Take a photo / לצלם", "Remove your shoes / להוריד נעליים", "Buy flowers / לקנות פרחים"],
        correctAnswer: 2,
        explanation: "Always remove shoes before entering any temple building. Look for the shoe rack near the entrance where shoes are lined up.",
        explanationHebrew: "תמיד יש להוריד נעליים לפני כניסה לכל בניין מקדש. חפשו את מתקן הנעליים ליד הכניסה."
      },
      {
        id: 26,
        question: "How do you ask 'Can I take a photo?' in Thai?",
        questionHebrew: "איך שואלים 'אפשר לצלם?' בתאילנדית?",
        options: ["สวยมาก (suay maak)", "ค่าเข้าเท่าไหร่ (kha kao tao-rai)", "ถ่ายรูปได้ไหม (tai roop dai mai)", "แต่งตัวแบบนี้ได้ไหม (taeng tua baep nee dai mai)"],
        correctAnswer: 2,
        explanation: "'ถ่ายรูปได้ไหม' (tai roop dai mai) means 'Can I take a photo?' Always ask before photographing monks or sacred objects.",
        explanationHebrew: "'ถ่ายรูปได้ไหม' (טאי רופ ได מאי) פירושו 'אפשר לצלם?' תמיד שאלו לפני צילום נזירים או חפצים קדושים."
      },
      {
        id: 27,
        question: "What is the dress code for Thai temples?",
        questionHebrew: "מהו קוד הלבוש למקדשים תאילנדיים?",
        options: ["Anything is fine / הכל בסדר", "No shoes only / רק בלי נעליים", "Cover shoulders and knees / לכסות כתפיים וברכיים", "Wear white / ללבוש לבן"],
        correctAnswer: 2,
        explanation: "Temples require covered shoulders and knees. No shorts, tank tops, or see-through clothing. Many temples rent sarongs if needed.",
        explanationHebrew: "מקדשים דורשים כיסוי כתפיים וברכיים. אסור מכנסיים קצרים, גופיות, או בגדים שקופים. מקדשים רבים משכירים סארונגים במידת הצורך."
      },
      {
        id: 28,
        question: "What should you never do while sitting in a Thai temple?",
        questionHebrew: "מה אסור לעשות בזמן ישיבה במקדש תאילנדי?",
        options: ["Smile / לחייך", "Point your feet toward Buddha images / להצביע עם הרגליים לעבר פסלי בודהה", "Close your eyes / לעצום עיניים", "Sit quietly / לשבת בשקט"],
        correctAnswer: 1,
        explanation: "Never point your feet toward Buddha images. Tuck your feet to the side or behind you. Feet are considered the lowest, dirtiest part of the body in Thai culture.",
        explanationHebrew: "לעולם אל תצביעו עם הרגליים לעבר פסלי בודהה. הכניסו את הרגליים לצד או מאחור. רגליים נחשבות לחלק הנמוך והמלוכלך ביותר בגוף בתרבות התאילנדית."
      }
    ]
  },
  {
    id: 9,
    title: "Practice Dialogues",
    titleHebrew: "תרגול שיחות",
    icon: "💬",
    phrases: [
      {
        id: 41,
        english: "At the Market - Buying Fruit",
        hebrew: "בשוק - קניית פירות",
        thai: "มะม่วงเท่าไหร่ครับ",
        phonetic: "ma-muang tao-rai khrap",
        scenario: "You: 'มะม่วงเท่าไหร่ครับ' (How much are mangoes?) | Vendor: 'โลละ 60 บาท' (60 baht per kilo) | You: 'แพงไป ลดได้ไหม' (Too expensive, can you discount?) | Vendor: 'ได้ครับ 50 บาท' (Okay, 50 baht) | You: 'เอาสองโลครับ' (I'll take 2 kilos)",
        culturalTip: "Always bargain with a smile! Aggressive bargaining is considered rude. If they won't budge, say 'ไม่เป็นไร' and walk away - they might call you back with a better price."
      },
      {
        id: 42,
        english: "At a Restaurant - Ordering Pad Thai",
        hebrew: "במסעדה - הזמנת פאד תאי",
        thai: "ขอผัดไทยไม่เผ็ดครับ",
        phonetic: "khor pad thai mai phet khrap",
        scenario: "You: 'ขอผัดไทยไม่เผ็ดครับ' (I'd like Pad Thai, not spicy) | Waiter: 'ใส่กุ้งไหมครับ' (With shrimp?) | You: 'ใส่ครับ' (Yes) | Waiter: 'เครื่องดื่มอะไรครับ' (What to drink?) | You: 'ขอน้ำเปล่าครับ' (Water please)",
        culturalTip: "If the food is too spicy, say 'เผ็ดเกินไป' (phet gern pai) = 'too spicy'. They might remake it or bring you rice to cool down."
      },
      {
        id: 43,
        english: "Taking a Taxi - Going to Hotel",
        hebrew: "נסיעה במונית - לכיוון המלון",
        thai: "ไปโรงแรม...เปิดมิเตอร์ครับ",
        phonetic: "pai rohng-raem... pert meter khrap",
        scenario: "You: 'ไปโรงแรม [hotel name] เปิดมิเตอร์ครับ' (To [hotel name], use meter please) | Driver: 'ครับ' (Okay) | [During ride] You: 'เลี้ยวขวาตรงนี้ครับ' (Turn right here) | Driver: 'ตรงนี้เลยครับ' (Right here?) | You: 'ใช่ครับ จอดตรงนี้' (Yes, stop here)",
        culturalTip: "Have your hotel address in Thai written down or on your phone. Show it to the driver if they don't understand."
      },
      {
        id: 44,
        english: "At 7-Eleven - Buying SIM Card",
        hebrew: "ב-7-Eleven - קניית כרטיס SIM",
        thai: "มีซิมการ์ดสำหรับนักท่องเที่ยวไหมครับ",
        phonetic: "mee sim card sam-rap nak-tong-tiao mai khrap",
        scenario: "You: 'มีซิมการ์ดสำหรับนักท่องเที่ยวไหมครับ' (Do you have tourist SIM card?) | Staff: 'มีครับ AIS หรือ DTAC' (Yes, AIS or DTAC) | You: 'AIS เท่าไหร่ครับ' (How much is AIS?) | Staff: '299 บาท 15 วัน' (299 baht, 15 days) | You: 'เอาครับ' (I'll take it)",
        culturalTip: "Bring your passport - they need to register the SIM card to your name by Thai law."
      },
      {
        id: 45,
        english: "At Temple - Asking About Dress Code",
        hebrew: "במקדש - שאלה על קוד לבוש",
        thai: "แต่งตัวแบบนี้เข้าได้ไหมครับ",
        phonetic: "taeng tua baep nee kao dai mai khrap",
        scenario: "You: 'แต่งตัวแบบนี้เข้าได้ไหมครับ' (Can I enter dressed like this?) | Guard: 'กางเกงสั้นไม่ได้ครับ' (No shorts) | You: 'มีผ้าให้ยืมไหมครับ' (Do you have cloth to borrow?) | Guard: 'มีครับ ฝากเงิน 100 บาท' (Yes, 100 baht deposit) | You: 'ขอบคุณครับ' (Thank you)",
        culturalTip: "Many major temples rent sarongs for 100-200 baht deposit (refundable). Bring a light scarf or long pants to avoid this."
      }
    ],
    dialogue: [
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "มะม่วงเท่าไหร่ครับ",
        phonetic: "ma-muang tao-rai khrap",
        hebrew: "כמה עולה מנגו?"
      },
      {
        speaker: "Vendor",
        speakerHebrew: "מוכר",
        thai: "โลละหกสิบบาทครับ",
        phonetic: "lo la hok-sip baht khrap",
        hebrew: "שישים באט לקילו"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "แพงไป ลดได้ไหมครับ",
        phonetic: "paeng pai lot dai mai khrap",
        hebrew: "יקר מדי, אפשר הנחה?"
      },
      {
        speaker: "Vendor",
        speakerHebrew: "מוכר",
        thai: "ห้าสิบบาทครับ",
        phonetic: "haa-sip baht khrap",
        hebrew: "חמישים באט"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "เอาสองโลครับ ขอบคุณ",
        phonetic: "ao song lo khrap khop-khun",
        hebrew: "אני אקח שני קילו, תודה"
      }
    ],
    exercises: [
      {
        id: 29,
        question: "In the market dialogue, what does the buyer ask first?",
        questionHebrew: "בשיחה בשוק, מה הקונה שואל קודם?",
        options: ["The weight / המשקל", "The price per kilo / המחיר לקילו", "The vendor's name / שם המוכר", "The discount / ההנחה"],
        correctAnswer: 1,
        explanation: "The buyer starts with 'มะม่วงเท่าไหร่' (ma-muang tao-rai) - asking the price of mangoes before bargaining.",
        explanationHebrew: "הקונה מתחיל עם 'มะม่วงเท่าไหร่' (מא-מואנג טאו-ไร) - שואל את מחיר המנגו לפני המיקוח."
      },
      {
        id: 30,
        question: "When ordering Pad Thai, what extra request should kosher travelers make?",
        questionHebrew: "כשמזמינים פאד תאי, מה שומרי כשרות צריכים לבקש?",
        options: ["Extra chili / עוד צ'ילי", "No pork - ไม่เอาหมู / ללא חזיר", "More rice / עוד אורז", "Cold water / מים קרים"],
        correctAnswer: 1,
        explanation: "Say 'ไม่เอาหมู' (mai ao muu) - no pork. Pork is very common in Thai food and must be specifically excluded.",
        explanationHebrew: "אמרו 'ไม่เอาหมู' (מאי או מו) - ללא חזיר. חזיר נפוץ מאוד באוכל תאילנדי וצריך לבקש להוציא אותו במפורש."
      },
      {
        id: 31,
        question: "In the taxi dialogue, what is the best tip for communicating with the driver?",
        questionHebrew: "בשיחת המונית, מהי העצה הטובה ביותר לתקשורת עם הנהג?",
        options: ["Speak loudly / לדבר בקול רם", "Have the hotel address written in Thai / שהכתובת תהיה כתובה בתאילנדית", "Only use English / להשתמש רק באנגלית", "Always sit in the front / תמיד לשבת מלפנים"],
        correctAnswer: 1,
        explanation: "Have your hotel address in Thai written down or on your phone. Show it to the driver if they don't understand your pronunciation.",
        explanationHebrew: "שהכתובת של המלון תהיה כתובה בתאילנדית על נייר או בטלפון. הראו אותה לנהג אם הוא לא מבין את ההגייה שלכם."
      }
    ]
  },
  {
    id: 10,
    title: "Survival Phrases",
    titleHebrew: "ביטויי הישרדות",
    icon: "🎒",
    phrases: [
      {
        id: 46,
        english: "Yes / No",
        hebrew: "כן / לא",
        thai: "ใช่ / ไม่ใช่",
        phonetic: "chai / mai chai",
        scenario: "Answer yes/no questions. Add 'ครับ/ค่ะ' at the end for politeness.",
        culturalTip: "Thais often say 'ใช่' (chai) repeatedly to show they're listening, even if they don't fully understand."
      },
      {
        id: 47,
        english: "I don't understand",
        hebrew: "אני לא מבין",
        thai: "ไม่เข้าใจ",
        phonetic: "mai kao-jai",
        scenario: "When you don't understand what someone is saying. They'll usually try to explain differently or find someone who speaks English.",
        culturalTip: "Follow with 'พูดภาษาอังกฤษได้ไหม' (poot paa-saa ang-grit dai mai) = 'Can you speak English?'"
      },
      {
        id: 48,
        english: "Where is the bathroom?",
        hebrew: "איפה השירותים?",
        thai: "ห้องน้ำอยู่ที่ไหน",
        phonetic: "hong naam yoo tee-nai",
        scenario: "Essential phrase! Most restaurants and malls have free bathrooms. Gas stations charge 3-5 baht.",
        culturalTip: "Bring tissues - many Thai bathrooms don't have toilet paper. They use a spray hose instead."
      },
      {
        id: 49,
        english: "I'm allergic to...",
        hebrew: "יש לי אלרגיה ל...",
        thai: "แพ้...",
        phonetic: "pae...",
        scenario: "IMPORTANT for food allergies. Say 'แพ้' + [allergen]. Example: 'แพ้ถั่ว' (pae tua) = 'allergic to peanuts'.",
        culturalTip: "Common allergens: 'ถั่ว' (peanuts), 'กุ้ง' (shrimp), 'ไข่' (eggs), 'นม' (dairy). Write it down and show to restaurants."
      },
      {
        id: 50,
        english: "Can you write it down?",
        hebrew: "אתה יכול לכתוב את זה?",
        thai: "เขียนให้หน่อยได้ไหม",
        phonetic: "kian hai noi dai mai",
        scenario: "When you need an address, phone number, or directions written down. Very useful for showing taxi drivers.",
        culturalTip: "Have a small notepad or use your phone's notes app. Thais are usually happy to write things down for you."
      }
    ],
    dialogue: [
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ขอโทษครับ ห้องน้ำอยู่ที่ไหน",
        phonetic: "khor-toht khrap hong naam yoo tee-nai",
        hebrew: "סליחה, איפה השירותים?"
      },
      {
        speaker: "Local",
        speakerHebrew: "מקומי",
        thai: "ตรงไปแล้วเลี้ยวขวาค่ะ",
        phonetic: "trong pai laew liao khwa kha",
        hebrew: "ישר ואז ימינה"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ไม่เข้าใจครับ เขียนให้หน่อยได้ไหม",
        phonetic: "mai kao-jai khrap kian hai noi dai mai",
        hebrew: "אני לא מבין, אפשר לכתוב את זה?"
      },
      {
        speaker: "Local",
        speakerHebrew: "מקומי",
        thai: "ได้ค่ะ ตามมาเลย",
        phonetic: "dai kha taam maa loei",
        hebrew: "בסדר, בוא אחריי"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ขอบคุณมากครับ",
        phonetic: "khop-khun maak khrap",
        hebrew: "תודה רבה"
      }
    ],
    exercises: [
      {
        id: 32,
        question: "How do you say 'Yes' in Thai?",
        questionHebrew: "איך אומרים 'כן' בתאילנדית?",
        options: ["ไม่ใช่ (mai chai)", "ไม่เข้าใจ (mai kao-jai)", "ใช่ (chai)", "แพ้ (pae)"],
        correctAnswer: 2,
        explanation: "'ใช่' (chai) means 'yes'. Add 'ครับ/ค่ะ' at the end for politeness: 'ใช่ครับ' or 'ใช่ค่ะ'.",
        explanationHebrew: "'ใช่' (צ'אי) פירושו 'כן'. הוסיפו 'ครับ/ค่ะ' בסוף לנימוס: 'ใช่ครับ' או 'ใช่ค่ะ'."
      },
      {
        id: 33,
        question: "How do you say 'I don't understand' in Thai?",
        questionHebrew: "איך אומרים 'אני לא מבין' בתאילנדית?",
        options: ["ไม่เป็นไร (mai pen rai)", "ไม่เข้าใจ (mai kao-jai)", "ขอโทษ (khor-toht)", "ไม่ใช่ (mai chai)"],
        correctAnswer: 1,
        explanation: "'ไม่เข้าใจ' (mai kao-jai) means 'I don't understand'. Follow with 'พูดภาษาอังกฤษได้ไหม' to ask if they speak English.",
        explanationHebrew: "'ไม่เข้าใจ' (מאי קאו-ג'אי) פירושו 'אני לא מבין'. המשיכו עם 'พูดภาษาอังกฤษได้ไหม' כדי לשאול אם הם דוברים אנגלית."
      },
      {
        id: 34,
        question: "How do you say 'I'm allergic to peanuts' in Thai?",
        questionHebrew: "איך אומרים 'יש לי אלרגיה לבוטנים' בתאילנדית?",
        options: ["แพ้กุ้ง (pae kung)", "แพ้ถั่ว (pae tua)", "แพ้ไข่ (pae kai)", "แพ้นม (pae nom)"],
        correctAnswer: 1,
        explanation: "'แพ้ถั่ว' (pae tua) means 'allergic to peanuts'. Write it down and show it to restaurants for safety.",
        explanationHebrew: "'แพ้ถั่ว' (แפ ตัว) פירושו 'אלרגי לבוטנים'. כתבו את זה והראו למסעדות לבטיחות."
      },
      {
        id: 35,
        question: "What is special about Thai bathrooms that tourists should know?",
        questionHebrew: "מה מיוחד בשירותים תאילנדיים שתיירים צריכים לדעת?",
        options: ["They are all free / כולם חינם", "Many don't have toilet paper, they use a spray hose / רבים בלי נייר טואלט, משתמשים בצינור התזה", "They are always outside / הם תמיד בחוץ", "You need a key / צריך מפתח"],
        correctAnswer: 1,
        explanation: "Many Thai bathrooms use a spray hose instead of toilet paper. Bring tissues with you! Gas stations charge 3-5 baht.",
        explanationHebrew: "שירותים רבים בתאילנד משתמשים בצינור התזה במקום נייר טואלט. קחו איתכם טישו! תחנות דלק גובות 3-5 באט."
      }
    ]
  },
  {
    id: 12,
    title: "Medical & Health",
    titleHebrew: "רפואה ובריאות",
    icon: "🏥",
    phrases: [
      {
        id: 56,
        english: "I need a doctor",
        hebrew: "אני צריך רופא",
        thai: "ต้องการหมอ",
        phonetic: "tong-kaan mor",
        scenario: "Emergency phrase. Use at hotel reception or call tourist police 1155.",
        culturalTip: "Bangkok Hospital and Bumrungrad have English-speaking staff. Keep travel insurance handy."
      },
      {
        id: 57,
        english: "I have a headache",
        hebrew: "יש לי כאב ראש",
        thai: "ปวดหัว",
        phonetic: "puat hua",
        scenario: "Common ailment from heat/dehydration. Pharmacies can help without prescription.",
        culturalTip: "7-Eleven sells basic pain relievers. For stronger medicine, visit any pharmacy (ร้านขายยา)."
      },
      {
        id: 58,
        english: "I have stomach pain",
        hebrew: "יש לי כאב בטן",
        thai: "ปวดท้อง",
        phonetic: "puat tong",
        scenario: "Food poisoning or upset stomach. Very common for tourists.",
        culturalTip: "Drink bottled water only. Ask for 'ยาแก้ท้องเสีย' (yaa kae tong sia) - diarrhea medicine at pharmacy."
      },
      {
        id: 59,
        english: "Where is the pharmacy?",
        hebrew: "איפה בית המרקחת?",
        thai: "ร้านขายยาอยู่ที่ไหน",
        phonetic: "raan kai yaa yoo tee nai",
        scenario: "Pharmacies are everywhere in Thailand and very helpful.",
        culturalTip: "Pharmacists often speak basic English and can recommend over-the-counter medicines."
      },
      {
        id: 60,
        english: "I'm allergic to...",
        hebrew: "יש לי אלרגיה ל...",
        thai: "แพ้...",
        phonetic: "pae...",
        scenario: "Critical for medical situations. Write your allergies in Thai and carry the note.",
        culturalTip: "Common: 'แพ้ยาปฏิชีวนะ' (antibiotics), 'แพ้อาหารทะเล' (seafood), 'แพ้ถั่ว' (peanuts)."
      }
    ],
    dialogue: [
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ปวดท้องมากครับ",
        phonetic: "puat tong maak khrap",
        hebrew: "יש לי כאב בטן חזק"
      },
      {
        speaker: "Pharmacist",
        speakerHebrew: "רוקח",
        thai: "กินอะไรมาคะ",
        phonetic: "kin arai maa kha",
        hebrew: "מה אכלת?"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "อาหารข้างทางครับ",
        phonetic: "aa-haan khaang taang khrap",
        hebrew: "אוכל רחוב"
      },
      {
        speaker: "Pharmacist",
        speakerHebrew: "רוקח",
        thai: "นี่ยาแก้ท้องเสียค่ะ กินวันละสามครั้ง",
        phonetic: "nee yaa kae tong sia kha kin wan la saam krang",
        hebrew: "הנה תרופה לשלשול, שלוש פעמים ביום"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "แพ้ยาปฏิชีวนะครับ",
        phonetic: "pae yaa pa-ti-chee-wa-na khrap",
        hebrew: "יש לי אלרגיה לאנטיביוטיקה"
      },
      {
        speaker: "Pharmacist",
        speakerHebrew: "רוקח",
        thai: "ไม่มีปัญหาค่ะ ยานี้ไม่ใช่ยาปฏิชีวนะ",
        phonetic: "mai mee pan-haa kha yaa nee mai chai yaa pa-ti-chee-wa-na",
        hebrew: "אין בעיה, התרופה הזו היא לא אנטיביוטיקה"
      }
    ],
    exercises: [
      {
        id: 36,
        question: "How do you say 'I have a headache' in Thai?",
        questionHebrew: "איך אומרים 'יש לי כאב ראש' בתאילנדית?",
        options: ["ปวดท้อง (puat tong)", "ปวดหัว (puat hua)", "ต้องการหมอ (tong-kaan mor)", "แพ้ (pae)"],
        correctAnswer: 1,
        explanation: "'ปวดหัว' (puat hua) means 'headache'. Common from heat and dehydration. Pharmacies and 7-Eleven sell pain relievers.",
        explanationHebrew: "'ปวดหัว' (פואט הัว) פירושו 'כאב ראש'. נפוץ בגלל חום והתייבשות. בתי מרקחת ו-7-Eleven מוכרים משככי כאבים."
      },
      {
        id: 37,
        question: "Where can you find a pharmacy in Thailand?",
        questionHebrew: "איפה אפשר למצוא בית מרקחת בתאילנד?",
        options: ["Only in hospitals / רק בבתי חולים", "They are rare / הם נדירים", "They are everywhere, pharmacists often speak English / הם בכל מקום, רוקחים לרוב דוברי אנגלית", "Only at airports / רק בשדות תעופה"],
        correctAnswer: 2,
        explanation: "Pharmacies (ร้านขายยา) are everywhere in Thailand. Pharmacists often speak basic English and can recommend over-the-counter medicines.",
        explanationHebrew: "בתי מרקחת (ร้านขายยา) נמצאים בכל מקום בתאילנד. רוקחים לרוב דוברי אנגלית בסיסית ויכולים להמליץ על תרופות ללא מרשם."
      },
      {
        id: 38,
        question: "What does 'ปวดท้อง' (puat tong) mean?",
        questionHebrew: "מה המשמעות של 'ปวดท้อง' (פואט טונג)?",
        options: ["Headache / כאב ראש", "Stomach pain / כאב בטן", "I need a doctor / אני צריך רופא", "I'm allergic / יש לי אלרגיה"],
        correctAnswer: 1,
        explanation: "'ปวดท้อง' (puat tong) means 'stomach pain'. Very common for tourists. Drink only bottled water to prevent issues.",
        explanationHebrew: "'ปวดท้อง' (פואט טונג) פירושו 'כאב בטן'. נפוץ מאוד אצל תיירים. שתו רק מים מבקבוק כדי למנוע בעיות."
      }
    ]
  },
  {
    id: 13,
    title: "Directions & Navigation",
    titleHebrew: "כיוונים וניווט",
    icon: "🧭",
    phrases: [
      {
        id: 61,
        english: "Turn left",
        hebrew: "פנה שמאלה",
        thai: "เลี้ยวซ้าย",
        phonetic: "liaw sai",
        scenario: "Giving directions to taxi/tuk-tuk drivers. Point while saying it.",
        culturalTip: "Use with 'ที่นี่' (tee nee - here) to say 'turn left here'."
      },
      {
        id: 62,
        english: "Turn right",
        hebrew: "פנה ימינה",
        thai: "เลี้ยวขวา",
        phonetic: "liaw khwa",
        scenario: "Essential for navigating with drivers who don't use GPS.",
        culturalTip: "Combine with 'ตรงไป' (trong pai - go straight) for better directions."
      },
      {
        id: 63,
        english: "Go straight",
        hebrew: "לך ישר",
        thai: "ตรงไป",
        phonetic: "trong pai",
        scenario: "When you want the driver to continue without turning.",
        culturalTip: "Use hand gestures pointing forward to reinforce the message."
      },
      {
        id: 64,
        english: "Stop here",
        hebrew: "עצור כאן",
        thai: "จอดตรงนี้",
        phonetic: "jot trong nee",
        scenario: "When you've reached your destination in a taxi or tuk-tuk.",
        culturalTip: "Say this clearly before the driver passes your stop. Taxis move fast!"
      },
      {
        id: 65,
        english: "Is it far?",
        hebrew: "זה רחוק?",
        thai: "ไกลไหม",
        phonetic: "klai mai",
        scenario: "Before deciding to walk or take transport. Helps estimate time/cost.",
        culturalTip: "Thais might say 'ไม่ไกล' (not far) even if it's 20 minutes walk. Always ask distance in minutes."
      }
    ],
    dialogue: [
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ไปวัดพระแก้วไกลไหมครับ",
        phonetic: "pai wat pra kaew klai mai khrap",
        hebrew: "האם ואט פרה קאו רחוק?"
      },
      {
        speaker: "Local",
        speakerHebrew: "מקומי",
        thai: "ไม่ไกลครับ ตรงไปแล้วเลี้ยวซ้าย",
        phonetic: "mai klai khrap trong pai laew liao sai",
        hebrew: "לא רחוק, ישר ואז שמאלה"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "เดินกี่นาทีครับ",
        phonetic: "dern kee naa-tee khrap",
        hebrew: "כמה דקות הליכה?"
      },
      {
        speaker: "Local",
        speakerHebrew: "מקומי",
        thai: "ประมาณสิบนาทีครับ",
        phonetic: "pra-maan sip naa-tee khrap",
        hebrew: "בערך עשר דקות"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ขอบคุณครับ",
        phonetic: "khop-khun khrap",
        hebrew: "תודה"
      }
    ],
    exercises: [
      {
        id: 39,
        question: "How do you say 'turn left' in Thai?",
        questionHebrew: "איך אומרים 'פנה שמאלה' בתאילנדית?",
        options: ["เลี้ยวขวา (liaw khwa)", "ตรงไป (trong pai)", "เลี้ยวซ้าย (liaw sai)", "จอดตรงนี้ (jot trong nee)"],
        correctAnswer: 2,
        explanation: "'เลี้ยวซ้าย' (liaw sai) means 'turn left'. Use with 'ที่นี่' (tee nee - here) to say 'turn left here'.",
        explanationHebrew: "'เลี้ยวซ้าย' (ליאו ซ้าย) פירושו 'פנה שמאלה'. השתמשו עם 'ที่นี่' (ที นี - כאן) כדי לומר 'פנה שמאלה כאן'."
      },
      {
        id: 40,
        question: "What does 'ไกลไหม' (klai mai) mean?",
        questionHebrew: "מה המשמעות של 'ไกลไหม' (קלai มאי)?",
        options: ["Is it expensive? / זה יקר?", "Is it far? / זה רחוק?", "Is it open? / זה פתוח?", "Is it good? / זה טוב?"],
        correctAnswer: 1,
        explanation: "'ไกลไหม' (klai mai) means 'Is it far?' Ask this before deciding to walk or take transport.",
        explanationHebrew: "'ไกลไหม' (קלai מאי) פירושו 'זה רחוק?' שאלו את זה לפני שמחליטים ללכת ברגל או לקחת תחבורה."
      },
      {
        id: 41,
        question: "Why should you always ask distance in minutes when Thais say 'not far'?",
        questionHebrew: "למה תמיד כדאי לשאול מרחק בדקות כשתאילנדים אומרים 'לא רחוק'?",
        options: ["Because they don't know / כי הם לא יודעים", "Because 'not far' might still be 20 minutes walk / כי 'לא רחוק' עלול להיות 20 דקות הליכה", "Because they lie / כי הם משקרים", "Because minutes are easier / כי דקות יותר קל"],
        correctAnswer: 1,
        explanation: "Thais might say 'ไม่ไกล' (not far) even if it's 20 minutes walk. Always ask 'เดินกี่นาที' (how many minutes walking?) for accuracy.",
        explanationHebrew: "תאילנדים עלולים לומר 'ไม่ไกล' (לא רחוק) גם אם זה 20 דקות הליכה. תמיד שאלו 'เดินกี่นาที' (כמה דקות הליכה?) לדיוק."
      }
    ]
  },
  {
    id: 14,
    title: "Weather & Seasons",
    titleHebrew: "מזג אוויר ועונות",
    icon: "🌤️",
    phrases: [
      {
        id: 66,
        english: "It's hot",
        hebrew: "חם",
        thai: "อากาศร้อน",
        phonetic: "aa-kaat ron",
        scenario: "Small talk opener. Thais love discussing weather!",
        culturalTip: "Thailand is hot year-round. 'ร้อนมาก' (ron maak) means 'very hot' - use it often!"
      },
      {
        id: 67,
        english: "Is it going to rain?",
        hebrew: "זה הולך לרדת גשם?",
        thai: "ฝนจะตกไหม",
        phonetic: "fon ja tok mai",
        scenario: "Important during rainy season (June-October). Plan outdoor activities accordingly.",
        culturalTip: "Afternoon rain is common. Carry a small umbrella or poncho."
      },
      {
        id: 68,
        english: "It's raining",
        hebrew: "יורד גשם",
        thai: "ฝนตก",
        phonetic: "fon tok",
        scenario: "State the obvious to make conversation or explain why you're wet!",
        culturalTip: "Rain in Thailand can be sudden and heavy. Wait it out at a café."
      },
      {
        id: 69,
        english: "It's cold",
        hebrew: "קר",
        thai: "อากาศหนาว",
        phonetic: "aa-kaat nao",
        scenario: "Rare in Thailand except in mountains or over-air-conditioned malls.",
        culturalTip: "Thai 'cold' is 20-25°C. Bring a light jacket for air-conditioned places."
      },
      {
        id: 70,
        english: "The weather is nice",
        hebrew: "מזג האוויר נעים",
        thai: "อากาศดี",
        phonetic: "aa-kaat dee",
        scenario: "Perfect small talk. Use in the morning or after rain when it's cooler.",
        culturalTip: "Best weather is November-February: cooler and dry. Perfect for tourism."
      }
    ],
    dialogue: [
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "อากาศร้อนมากวันนี้",
        phonetic: "aa-kaat ron maak wan nee",
        hebrew: "מאוד חם היום"
      },
      {
        speaker: "Friend",
        speakerHebrew: "חבר",
        thai: "ใช่ค่ะ ร้อนมากเลย",
        phonetic: "chai kha ron maak loei",
        hebrew: "כן, חם מאוד באמת"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ฝนจะตกไหมครับ",
        phonetic: "fon ja tok mai khrap",
        hebrew: "יירד גשם?"
      },
      {
        speaker: "Friend",
        speakerHebrew: "חבר",
        thai: "อาจจะตกตอนบ่ายค่ะ",
        phonetic: "aat ja tok ton baai kha",
        hebrew: "אולי יירד אחר הצהריים"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "เอาร่มไปดีกว่า",
        phonetic: "ao rom pai dee kwa",
        hebrew: "עדיף לקחת מטריה"
      }
    ],
    exercises: [
      {
        id: 42,
        question: "How do you say 'It's hot' in Thai?",
        questionHebrew: "איך אומרים 'חם' בתאילנדית?",
        options: ["อากาศหนาว (aa-kaat nao)", "ฝนตก (fon tok)", "อากาศร้อน (aa-kaat ron)", "อากาศดี (aa-kaat dee)"],
        correctAnswer: 2,
        explanation: "'อากาศร้อน' (aa-kaat ron) means 'it's hot'. A great small talk opener since Thailand is hot year-round!",
        explanationHebrew: "'อากาศร้อน' (อา-กาศ รอน) פירושו 'חם'. פתיח מצוין לשיחת חולין כי בתאילנד חם כל השנה!"
      },
      {
        id: 43,
        question: "What does 'ฝนตก' (fon tok) mean?",
        questionHebrew: "מה המשמעות של 'ฝนตก' (ฝน ตก)?",
        options: ["It's hot / חם", "It's cold / קר", "It's raining / יורד גשם", "The weather is nice / מזג האוויר נעים"],
        correctAnswer: 2,
        explanation: "'ฝนตก' (fon tok) means 'it's raining'. Rain in Thailand can be sudden and heavy - wait it out at a cafe.",
        explanationHebrew: "'ฝนตก' (פון ตוก) פירושו 'יורד גשם'. גשם בתאילנד יכול להיות פתאומי וחזק - חכו שיעבור בבית קפה."
      },
      {
        id: 44,
        question: "When is the best weather for visiting Thailand?",
        questionHebrew: "מתי מזג האוויר הטוב ביותר לביקור בתאילנד?",
        options: ["March-May / מרץ-מאי", "June-October / יוני-אוקטובר", "November-February / נובמבר-פברואר", "All year is the same / כל השנה אותו דבר"],
        correctAnswer: 2,
        explanation: "November-February is the best time: cooler and dry. June-October is rainy season with afternoon showers common.",
        explanationHebrew: "נובמבר-פברואר הוא הזמן הטוב ביותר: קריר ויבש. יוני-אוקטובר הוא עונת הגשמים עם מקלחות אחר הצהריים נפוצות."
      }
    ]
  },
  {
    id: 15,
    title: "Counting & Math",
    titleHebrew: "ספירה ומתמטיקה",
    icon: "🧮",
    phrases: [
      {
        id: 71,
        english: "One",
        hebrew: "אחד",
        thai: "หนึ่ง",
        phonetic: "neung",
        scenario: "Basic counting. Essential for shopping, ordering, and bargaining.",
        culturalTip: "When ordering one item, use 'อัน' (an) after: 'หนึ่งอัน' (neung an)."
      },
      {
        id: 72,
        english: "Two",
        hebrew: "שניים",
        thai: "สอง",
        phonetic: "song",
        scenario: "'Two people' = 'สองคน' (song khon). 'Two items' = 'สองอัน' (song an).",
        culturalTip: "Hold up two fingers when ordering to avoid confusion."
      },
      {
        id: 73,
        english: "Ten",
        hebrew: "עשרה",
        thai: "สิบ",
        phonetic: "sip",
        scenario: "Important for prices. 10 baht = 'สิบบาท' (sip baht).",
        culturalTip: "Numbers 11-19 are 'sip-[number]': 11=สิบเอ็ด (sip-et), 12=สิบสอง (sip-song)."
      },
      {
        id: 74,
        english: "One hundred",
        hebrew: "מאה",
        thai: "หนึ่งร้อย",
        phonetic: "neung roi",
        scenario: "Common price point. 100 baht = 'ร้อยบาท' (roi baht).",
        culturalTip: "200 = 'สองร้อย' (song roi), 300 = 'สามร้อย' (saam roi), etc."
      },
      {
        id: 75,
        english: "One thousand",
        hebrew: "אלף",
        thai: "หนึ่งพัน",
        phonetic: "neung pan",
        scenario: "For larger purchases or hotel bills. 1000 baht = 'พันบาท' (pan baht).",
        culturalTip: "ATMs usually dispense 1000฿ notes. Break them at 7-Eleven for smaller bills."
      }
    ],
    dialogue: [
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "นี่เท่าไหร่ครับ",
        phonetic: "nee tao-rai khrap",
        hebrew: "כמה זה?"
      },
      {
        speaker: "Vendor",
        speakerHebrew: "מוכר",
        thai: "สองร้อยห้าสิบบาทค่ะ",
        phonetic: "song roi haa-sip baht kha",
        hebrew: "מאתיים חמישים באט"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "เอาสองอันครับ",
        phonetic: "ao song an khrap",
        hebrew: "אני אקח שניים"
      },
      {
        speaker: "Vendor",
        speakerHebrew: "מוכר",
        thai: "ห้าร้อยบาทค่ะ",
        phonetic: "haa roi baht kha",
        hebrew: "חמש מאות באט"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "นี่หนึ่งพันบาทครับ",
        phonetic: "nee neung pan baht khrap",
        hebrew: "הנה אלף באט"
      }
    ],
    exercises: [
      {
        id: 45,
        question: "What is 'สอง' (song) in English?",
        questionHebrew: "מה פירוש 'สอง' (ซอง) באנגלית?",
        options: ["One / אחד", "Two / שניים", "Ten / עשרה", "Hundred / מאה"],
        correctAnswer: 1,
        explanation: "'สอง' (song) means 'two'. Use with classifier words: 'สองคน' (song khon) = two people, 'สองอัน' (song an) = two items.",
        explanationHebrew: "'สอง' (ซอง) פירושו 'שניים'. השתמשו עם מילות סיווג: 'สองคน' (סונג קון) = שני אנשים, 'สองอัน' (סונג אัน) = שני פריטים."
      },
      {
        id: 46,
        question: "How do you say 'one hundred' in Thai?",
        questionHebrew: "איך אומרים 'מאה' בתאילנדית?",
        options: ["หนึ่งพัน (neung pan)", "สิบ (sip)", "หนึ่งร้อย (neung roi)", "ยี่สิบ (yee-sip)"],
        correctAnswer: 2,
        explanation: "'หนึ่งร้อย' (neung roi) means 'one hundred'. Common price point: 100 baht = 'ร้อยบาท' (roi baht).",
        explanationHebrew: "'หนึ่งร้อย' (נึง รอย) פירושו 'מאה'. מחיר נפוץ: 100 באט = 'ร้อยบาท' (רอย באท)."
      },
      {
        id: 47,
        question: "How are numbers 11-19 formed in Thai?",
        questionHebrew: "איך נוצרים המספרים 11-19 בתאילנדית?",
        options: ["Completely different words / מילים שונות לגמרי", "สิบ (sip) + the digit / สิบ (סิפ) + הספרה", "Same as English / כמו באנגלית", "They skip these numbers / מדלגים על המספרים האלה"],
        correctAnswer: 1,
        explanation: "Numbers 11-19 follow the pattern สิบ (sip/10) + digit: 11=สิบเอ็ด (sip-et), 12=สิบสอง (sip-song), etc.",
        explanationHebrew: "המספרים 11-19 עוקבים אחר הדפוס สิบ (סיפ/10) + ספרה: 11=สิบเอ็ด (สิפ-เอ็ด), 12=สิบสอง (สิפ-ซอง), וכו'."
      }
    ]
  },
  {
    id: 16,
    title: "Time & Dates",
    titleHebrew: "זמן ותאריכים",
    icon: "⏰",
    phrases: [
      {
        id: 76,
        english: "What time is it?",
        hebrew: "מה השעה?",
        thai: "กี่โมงแล้ว",
        phonetic: "kee mong laew",
        scenario: "Asking for current time. Thais use 24-hour clock informally.",
        culturalTip: "Thai time system is unique: morning hours use 'โมงเช้า' (mong chao), afternoon 'บ่าย' (baai)."
      },
      {
        id: 77,
        english: "Today",
        hebrew: "היום",
        thai: "วันนี้",
        phonetic: "wan nee",
        scenario: "'Today I go' = 'วันนี้ไป' (wan nee pai). Very useful for making plans.",
        culturalTip: "Combine with activities: 'วันนี้ไปตลาด' (today go market)."
      },
      {
        id: 78,
        english: "Tomorrow",
        hebrew: "מחר",
        thai: "พรุ่งนี้",
        phonetic: "proong nee",
        scenario: "For scheduling tours, meetings, or deliveries.",
        culturalTip: "'พรุ่งนี้เจอกัน' (proong nee jer kan) = 'See you tomorrow'."
      },
      {
        id: 79,
        english: "Yesterday",
        hebrew: "אתמול",
        thai: "เมื่อวาน",
        phonetic: "meua waan",
        scenario: "For recounting events or explaining when something happened.",
        culturalTip: "'เมื่อวานไป' (meua waan pai) = 'went yesterday'."
      },
      {
        id: 80,
        english: "What day is it?",
        hebrew: "איזה יום היום?",
        thai: "วันนี้วันอะไร",
        phonetic: "wan nee wan arai",
        scenario: "When you lose track of days on vacation!",
        culturalTip: "Days: Monday=จันทร์ (jan), Tuesday=อังคาร (ang-kaan), etc. Not essential for tourists."
      }
    ],
    dialogue: [
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ทัวร์ออกกี่โมงครับ",
        phonetic: "tour ok kee mong khrap",
        hebrew: "באיזו שעה יוצא הטיול?"
      },
      {
        speaker: "Guide",
        speakerHebrew: "מדריך",
        thai: "แปดโมงเช้าค่ะ",
        phonetic: "paet mong chao kha",
        hebrew: "בשמונה בבוקר"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "พรุ่งนี้ใช่ไหมครับ",
        phonetic: "proong nee chai mai khrap",
        hebrew: "מחר, נכון?"
      },
      {
        speaker: "Guide",
        speakerHebrew: "מדריך",
        thai: "ใช่ค่ะ พรุ่งนี้วันศุกร์",
        phonetic: "chai kha proong nee wan suk",
        hebrew: "כן, מחר יום שישי"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "กลับมากี่โมงครับ",
        phonetic: "klap maa kee mong khrap",
        hebrew: "באיזו שעה חוזרים?"
      }
    ],
    exercises: [
      {
        id: 48,
        question: "How do you ask 'What time is it?' in Thai?",
        questionHebrew: "איך שואלים 'מה השעה?' בתאילנדית?",
        options: ["วันนี้วันอะไร (wan nee wan arai)", "กี่โมงแล้ว (kee mong laew)", "พรุ่งนี้ (proong nee)", "เมื่อวาน (meua waan)"],
        correctAnswer: 1,
        explanation: "'กี่โมงแล้ว' (kee mong laew) means 'What time is it?' Thai time system uses different words for morning, afternoon, and evening hours.",
        explanationHebrew: "'กี่โมงแล้ว' (กี มอง แล้ว) פירושו 'מה השעה?' מערכת השעות התאילנדית משתמשת במילים שונות לבוקר, אחר הצהריים וערב."
      },
      {
        id: 49,
        question: "What does 'พรุ่งนี้' (proong nee) mean?",
        questionHebrew: "מה המשמעות של 'พรุ่งนี้' (פרุ้ง ני)?",
        options: ["Today / היום", "Yesterday / אתמול", "Tomorrow / מחר", "Next week / שבוע הבא"],
        correctAnswer: 2,
        explanation: "'พรุ่งนี้' (proong nee) means 'tomorrow'. Use it for scheduling: 'พรุ่งนี้เจอกัน' (proong nee jer kan) = 'See you tomorrow'.",
        explanationHebrew: "'พรุ่งนี้' (פרุ้ง ני) פירושו 'מחר'. השתמשו לתיאומים: 'พรุ่งนี้เจอกัน' (פרุ้ง ני ג'ר กัน) = 'נתראה מחר'."
      },
      {
        id: 50,
        question: "How do you say 'today' in Thai?",
        questionHebrew: "איך אומרים 'היום' בתאילנדית?",
        options: ["เมื่อวาน (meua waan)", "วันนี้ (wan nee)", "พรุ่งนี้ (proong nee)", "กี่โมง (kee mong)"],
        correctAnswer: 1,
        explanation: "'วันนี้' (wan nee) means 'today'. Combine with activities: 'วันนี้ไปตลาด' (wan nee pai talaat) = 'today go to market'.",
        explanationHebrew: "'วันนี้' (วัน ני) פירושו 'היום'. שלבו עם פעילויות: 'วันนี้ไปตลาด' (วัน ני ไป ตลาด) = 'היום הולכים לשוק'."
      }
    ]
  },
  {
    id: 17,
    title: "Colors & Descriptions",
    titleHebrew: "צבעים ותיאורים",
    icon: "🎨",
    phrases: [
      {
        id: 81,
        english: "Red",
        hebrew: "אדום",
        thai: "สีแดง",
        phonetic: "see daeng",
        scenario: "For shopping clothes, describing items, or ordering flowers.",
        culturalTip: "Red is lucky in Thai culture. Popular for Chinese New Year and celebrations."
      },
      {
        id: 82,
        english: "Blue",
        hebrew: "כחול",
        thai: "สีน้ำเงิน",
        phonetic: "see nam ngern",
        scenario: "Literally means 'water-silver color'. Useful for shopping.",
        culturalTip: "Light blue is associated with Monday, the King's birthday color."
      },
      {
        id: 83,
        english: "White",
        hebrew: "לבן",
        thai: "สีขาว",
        phonetic: "see khao",
        scenario: "Common for clothing. 'ขาว' also means rice, so context matters!",
        culturalTip: "White is worn for funerals. Avoid all-white outfits at temples."
      },
      {
        id: 84,
        english: "Black",
        hebrew: "שחור",
        thai: "สีดำ",
        phonetic: "see dam",
        scenario: "For clothing shopping or describing objects.",
        culturalTip: "Black was worn for mourning the late King. Now acceptable in daily wear."
      },
      {
        id: 85,
        english: "Beautiful",
        hebrew: "יפה",
        thai: "สวย",
        phonetic: "suay",
        scenario: "Compliment for women, places, or things. Makes people smile!",
        culturalTip: "'สวยมาก' (suay maak) = 'very beautiful'. Thais love compliments!"
      }
    ],
    dialogue: [
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "มีสีแดงไหมครับ",
        phonetic: "mee see daeng mai khrap",
        hebrew: "יש לך באדום?"
      },
      {
        speaker: "Vendor",
        speakerHebrew: "מוכר",
        thai: "มีค่ะ สีแดงกับสีน้ำเงิน",
        phonetic: "mee kha see daeng gap see nam ngern",
        hebrew: "כן, אדום וכחול"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "สีดำมีไหมครับ",
        phonetic: "see dam mee mai khrap",
        hebrew: "יש בשחור?"
      },
      {
        speaker: "Vendor",
        speakerHebrew: "מוכר",
        thai: "ไม่มีค่ะ มีสีขาวนะคะ",
        phonetic: "mai mee kha mee see khao na kha",
        hebrew: "אין, יש בלבן"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "เอาสีแดงครับ สวยมาก",
        phonetic: "ao see daeng khrap suay maak",
        hebrew: "אני אקח את האדום, יפה מאוד"
      }
    ],
    exercises: [
      {
        id: 51,
        question: "How do you say 'red' in Thai?",
        questionHebrew: "איך אומרים 'אדום' בתאילנדית?",
        options: ["สีน้ำเงิน (see nam ngern)", "สีขาว (see khao)", "สีแดง (see daeng)", "สีดำ (see dam)"],
        correctAnswer: 2,
        explanation: "'สีแดง' (see daeng) means 'red'. Red is considered lucky in Thai culture, popular for celebrations.",
        explanationHebrew: "'สีแดง' (ซี แดง) פירושו 'אדום'. אדום נחשב למזל טוב בתרבות התאילנדית, פופולרי בחגיגות."
      },
      {
        id: 52,
        question: "What color is associated with mourning in Thai culture?",
        questionHebrew: "איזה צבע קשור לאבל בתרבות התאילנדית?",
        options: ["Red / אדום", "Blue / כחול", "White / לבן", "Black / שחור"],
        correctAnswer: 2,
        explanation: "White is worn for funerals in Thailand. Avoid all-white outfits at temples. Black was also worn for mourning the late King.",
        explanationHebrew: "לבן נלבש לטקסי הלוויה בתאילנד. הימנעו מלבוש לבן לגמרי במקדשים. שחור גם נלבש לאבל על המלך המנוח."
      },
      {
        id: 53,
        question: "What does 'สวย' (suay) mean?",
        questionHebrew: "מה המשמעות של 'สวย' (สวย)?",
        options: ["Expensive / יקר", "Big / גדול", "Beautiful / יפה", "Small / קטן"],
        correctAnswer: 2,
        explanation: "'สวย' (suay) means 'beautiful'. Add 'มาก' (maak) for 'very beautiful': 'สวยมาก' (suay maak). Thais love compliments!",
        explanationHebrew: "'สวย' (สวย) פירושו 'יפה'. הוסיפו 'มาก' (มาก) ל'יפה מאוד': 'สวยมาก' (สวยมาก). תאילנדים אוהבים מחמאות!"
      }
    ]
  },
  {
    id: 18,
    title: "Family & Relationships",
    titleHebrew: "משפחה ויחסים",
    icon: "👨‍👩‍👧‍👦",
    phrases: [
      {
        id: 86,
        english: "This is my friend",
        hebrew: "זה החבר שלי",
        thai: "นี่เพื่อนผม/ดิฉัน",
        phonetic: "nee peuan pom/dichan",
        scenario: "Introducing travel companions. 'ผม' (pom) for males, 'ดิฉัน' (dichan) for females.",
        culturalTip: "Thais are very social. Introducing friends shows respect and opens conversations."
      },
      {
        id: 87,
        english: "My husband/wife",
        hebrew: "בעלי/אשתי",
        thai: "สามี/ภรรยา",
        phonetic: "saa-mee/pan-ra-yaa",
        scenario: "Formal terms. Casual: 'แฟน' (faen) means boyfriend/girlfriend/spouse.",
        culturalTip: "Thais rarely show public affection. Keep it modest even with spouses."
      },
      {
        id: 88,
        english: "How old are you?",
        hebrew: "בן כמה אתה?",
        thai: "อายุเท่าไหร่",
        phonetic: "aa-yu tao-rai",
        scenario: "Common question in Thailand, not considered rude. Shows interest.",
        culturalTip: "Thais ask age to determine proper pronouns and level of respect to use."
      },
      {
        id: 89,
        english: "I have children",
        hebrew: "יש לי ילדים",
        thai: "มีลูก",
        phonetic: "mee look",
        scenario: "Thais love children. This opens warm conversations.",
        culturalTip: "'ลูก' (look) means child. 'มีลูกกี่คน' (mee look kee khon) = 'how many children?'"
      },
      {
        id: 90,
        english: "I'm single",
        hebrew: "אני רווק/ה",
        thai: "โสด",
        phonetic: "soht",
        scenario: "Common topic of conversation, especially for younger travelers.",
        culturalTip: "Thais might try to matchmake! It's friendly, not intrusive."
      }
    ],
    dialogue: [
      {
        speaker: "Friend",
        speakerHebrew: "חבר",
        thai: "คุณมีครอบครัวไหมคะ",
        phonetic: "khun mee krop-krua mai kha",
        hebrew: "יש לך משפחה?"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "มีครับ มีลูกสองคน",
        phonetic: "mee khrap mee look song khon",
        hebrew: "כן, יש לי שני ילדים"
      },
      {
        speaker: "Friend",
        speakerHebrew: "חבר",
        thai: "น่ารัก อายุเท่าไหร่คะ",
        phonetic: "na-rak aa-yu tao-rai kha",
        hebrew: "חמוד, בני כמה?"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ห้าขวบกับสามขวบครับ",
        phonetic: "haa khuap gap saam khuap khrap",
        hebrew: "חמש ושלוש"
      },
      {
        speaker: "Friend",
        speakerHebrew: "חבר",
        thai: "นี่เพื่อนคุณใช่ไหมคะ",
        phonetic: "nee peuan khun chai mai kha",
        hebrew: "זה החבר שלך?"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ใช่ครับ นี่เพื่อนผม",
        phonetic: "chai khrap nee peuan pom",
        hebrew: "כן, זה החבר שלי"
      }
    ],
    exercises: [
      {
        id: 54,
        question: "How do you introduce a friend in Thai?",
        questionHebrew: "איך מציגים חבר בתאילנדית?",
        options: ["อายุเท่าไหร่ (aa-yu tao-rai)", "นี่เพื่อนผม (nee peuan pom)", "โสด (soht)", "มีลูก (mee look)"],
        correctAnswer: 1,
        explanation: "'นี่เพื่อนผม' (nee peuan pom) means 'This is my friend' (male speaker). Females say 'นี่เพื่อนดิฉัน' (nee peuan dichan).",
        explanationHebrew: "'นี่เพื่อนผม' (ני เพื่อน พม) פירושו 'זה החבר שלי' (דובר גבר). נשים אומרות 'นี่เพื่อนดิฉัน' (ני เพื่อน ดิฉัน)."
      },
      {
        id: 55,
        question: "Why do Thais commonly ask 'How old are you?'",
        questionHebrew: "למה תאילנדים נוהגים לשאול 'בן כמה אתה?'",
        options: ["It's considered rude / זה נחשב גס רוח", "To determine proper pronouns and respect level / כדי לקבוע כינויי פנייה ורמת כבוד", "They are curious / הם סקרנים", "It's a joke / זו בדיחה"],
        correctAnswer: 1,
        explanation: "Thais ask age to determine the proper level of respect and pronouns to use. It's not considered rude at all - it shows interest.",
        explanationHebrew: "תאילנדים שואלים גיל כדי לקבוע את רמת הכבוד וכינויי הפנייה המתאימים. זה בכלל לא נחשב גס רוח - זה מראה עניין."
      },
      {
        id: 56,
        question: "What does 'แฟน' (faen) mean in Thai?",
        questionHebrew: "מה המשמעות של 'แฟน' (แฟน) בתאילנדית?",
        options: ["Fan / מאוורר", "Boyfriend/girlfriend/spouse / חבר/חברה/בן זוג", "Friend / חבר", "Family / משפחה"],
        correctAnswer: 1,
        explanation: "'แฟน' (faen) is the casual term for boyfriend, girlfriend, or spouse. The formal terms are 'สามี' (husband) and 'ภรรยา' (wife).",
        explanationHebrew: "'แฟน' (แฟน) הוא המונח הלא-פורמלי לחבר, חברה, או בן/בת זוג. המונחים הפורמליים הם 'สามี' (בעל) ו-'ภรรยา' (אישה)."
      }
    ]
  },
  {
    id: 19,
    title: "Hobbies & Interests",
    titleHebrew: "תחביבים ותחומי עניין",
    icon: "🎯",
    phrases: [
      {
        id: 91,
        english: "I like Thai food",
        hebrew: "אני אוהב אוכל תאילנדי",
        thai: "ชอบอาหารไทย",
        phonetic: "chop aa-haan thai",
        scenario: "Great conversation starter. Thais are proud of their cuisine!",
        culturalTip: "Follow with 'อร่อยมาก' (aroi maak - very delicious) for extra points."
      },
      {
        id: 92,
        english: "I love Thailand",
        hebrew: "אני אוהב את תאילנד",
        thai: "รักเมืองไทย",
        phonetic: "rak meuang thai",
        scenario: "Ultimate compliment. Thais beam with pride when tourists say this.",
        culturalTip: "'เมืองไทย' (meuang thai) is the formal name for Thailand."
      },
      {
        id: 93,
        english: "I want to learn Thai",
        hebrew: "אני רוצה ללמוד תאילנדית",
        thai: "อยากเรียนภาษาไทย",
        phonetic: "yaak rian paa-saa thai",
        scenario: "Shows respect for culture. Thais will enthusiastically help you learn.",
        culturalTip: "Even basic Thai earns huge respect. Thais love teaching their language."
      },
      {
        id: 94,
        english: "I like shopping",
        hebrew: "אני אוהב לעשות קניות",
        thai: "ชอบช้อปปิ้ง",
        phonetic: "chop shopping",
        scenario: "Thailand is a shopping paradise. This opens recommendations.",
        culturalTip: "Thais will suggest markets, malls, and secret shopping spots."
      },
      {
        id: 95,
        english: "I want to visit temples",
        hebrew: "אני רוצה לבקר במקדשים",
        thai: "อยากไปวัด",
        phonetic: "yaak pai wat",
        scenario: "Shows cultural interest. Thais appreciate tourists who respect temples.",
        culturalTip: "'วัด' (wat) = temple. Dress modestly: cover shoulders and knees."
      }
    ],
    dialogue: [
      {
        speaker: "Friend",
        speakerHebrew: "חבר",
        thai: "ชอบทำอะไรคะ",
        phonetic: "chop tam arai kha",
        hebrew: "מה אתה אוהב לעשות?"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ชอบอาหารไทยมากครับ อร่อยมาก",
        phonetic: "chop aa-haan thai maak khrap a-roi maak",
        hebrew: "אני מאוד אוהב אוכל תאילנדי, טעים מאוד"
      },
      {
        speaker: "Friend",
        speakerHebrew: "חבר",
        thai: "แล้วชอบไปเที่ยวที่ไหนคะ",
        phonetic: "laew chop pai tiao tee nai kha",
        hebrew: "ולאן אתה אוהב לטייל?"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "อยากไปวัดครับ รักเมืองไทย",
        phonetic: "yaak pai wat khrap rak meuang thai",
        hebrew: "אני רוצה לבקר במקדשים, אני אוהב את תאילנד"
      },
      {
        speaker: "Friend",
        speakerHebrew: "חבר",
        thai: "ดีใจค่ะ อยากเรียนภาษาไทยด้วยไหม",
        phonetic: "dee jai kha yaak rian paa-saa thai duay mai",
        hebrew: "שמחה לשמוע, רוצה גם ללמוד תאילנדית?"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "อยากเรียนครับ",
        phonetic: "yaak rian khrap",
        hebrew: "כן, אני רוצה ללמוד"
      }
    ],
    exercises: [
      {
        id: 57,
        question: "How do you say 'I like Thai food' in Thai?",
        questionHebrew: "איך אומרים 'אני אוהב אוכל תאילנדי' בתאילנדית?",
        options: ["รักเมืองไทย (rak meuang thai)", "อยากไปวัด (yaak pai wat)", "ชอบอาหารไทย (chop aa-haan thai)", "ชอบช้อปปิ้ง (chop shopping)"],
        correctAnswer: 2,
        explanation: "'ชอบอาหารไทย' (chop aa-haan thai) means 'I like Thai food'. Great conversation starter - Thais are very proud of their cuisine!",
        explanationHebrew: "'ชอบอาหารไทย' (צ'อบ อา-หาน ไท) פירושו 'אני אוהב אוכל תאילנדי'. פותח שיחה מצוין - תאילנדים מאוד גאים במטבח שלהם!"
      },
      {
        id: 58,
        question: "What does 'รักเมืองไทย' (rak meuang thai) mean?",
        questionHebrew: "מה המשמעות של 'รักเมืองไทย' (รัก เมือง ไท)?",
        options: ["I want to visit temples / אני רוצה לבקר במקדשים", "I love Thailand / אני אוהב את תאילנד", "I like shopping / אני אוהב קניות", "I want to learn Thai / אני רוצה ללמוד תאילנדית"],
        correctAnswer: 1,
        explanation: "'รักเมืองไทย' (rak meuang thai) means 'I love Thailand'. The ultimate compliment - Thais beam with pride when tourists say this!",
        explanationHebrew: "'รักเมืองไทย' (รัก เมือง ไท) פירושו 'אני אוהב את תאילנד'. המחמאה הגדולה ביותר - תאילנדים קורנים מגאווה כששומעים את זה!"
      },
      {
        id: 59,
        question: "How do you say 'I want to learn Thai' in Thai?",
        questionHebrew: "איך אומרים 'אני רוצה ללמוד תאילנדית' בתאילנדית?",
        options: ["ชอบอาหารไทย (chop aa-haan thai)", "อยากเรียนภาษาไทย (yaak rian paa-saa thai)", "อยากไปวัด (yaak pai wat)", "ชอบช้อปปิ้ง (chop shopping)"],
        correctAnswer: 1,
        explanation: "'อยากเรียนภาษาไทย' (yaak rian paa-saa thai) means 'I want to learn Thai'. Thais will enthusiastically help you!",
        explanationHebrew: "'อยากเรียนภาษาไทย' (ยาก เรียน พา-สา ไท) פירושו 'אני רוצה ללמוד תאילנדית'. תאילנדים ישמחו לעזור לכם!"
      }
    ]
  },
  {
    id: 20,
    title: "Technology & Internet",
    titleHebrew: "טכנולוגיה ואינטרנט",
    icon: "📱",
    phrases: [
      {
        id: 96,
        english: "WiFi password?",
        hebrew: "סיסמת WiFi?",
        thai: "รหัสไวไฟอะไร",
        phonetic: "ra-hat wifi arai",
        scenario: "Essential at cafés, hotels, restaurants. WiFi is everywhere in Thailand.",
        culturalTip: "Most places have free WiFi. Just ask - it's usually posted on walls too."
      },
      {
        id: 97,
        english: "Can I charge my phone?",
        hebrew: "אני יכול לטעון את הטלפון?",
        thai: "ชาร์จโทรศัพท์ได้ไหม",
        phonetic: "charge toh-ra-sap dai mai",
        scenario: "Most cafés and restaurants allow charging. Bring your own cable.",
        culturalTip: "Thailand uses 220V outlets (same as Europe). Bring adapter if needed."
      },
      {
        id: 98,
        english: "Where can I buy a SIM card?",
        hebrew: "איפה אני יכול לקנות כרטיס SIM?",
        thai: "ซื้อซิมการ์ดที่ไหน",
        phonetic: "sue sim card tee nai",
        scenario: "Airport and 7-Eleven sell tourist SIM cards. Cheap and easy.",
        culturalTip: "AIS, DTAC, TrueMove are main carriers. Tourist SIMs include data packages."
      },
      {
        id: 99,
        english: "My phone is broken",
        hebrew: "הטלפון שלי מקולקל",
        thai: "โทรศัพท์เสีย",
        phonetic: "toh-ra-sap sia",
        scenario: "For repairs. MBK Center in Bangkok has hundreds of phone repair shops.",
        culturalTip: "Phone repairs are cheap and fast in Thailand. Get quotes from multiple shops."
      },
      {
        id: 100,
        english: "Can you send it to me?",
        hebrew: "אתה יכול לשלוח לי את זה?",
        thai: "ส่งให้ได้ไหม",
        phonetic: "song hai dai mai",
        scenario: "For photos, files, or LINE messages. LINE is Thailand's main messaging app.",
        culturalTip: "Get LINE app before arriving. Thais use it more than WhatsApp."
      }
    ],
    dialogue: [
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "รหัสไวไฟอะไรครับ",
        phonetic: "ra-hat wifi arai khrap",
        hebrew: "מה סיסמת ה-WiFi?"
      },
      {
        speaker: "Staff",
        speakerHebrew: "עובד",
        thai: "รหัสอยู่บนโต๊ะค่ะ",
        phonetic: "ra-hat yoo bon to kha",
        hebrew: "הסיסמה על השולחן"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ชาร์จโทรศัพท์ได้ไหมครับ",
        phonetic: "charge toh-ra-sap dai mai khrap",
        hebrew: "אפשר לטעון את הטלפון?"
      },
      {
        speaker: "Staff",
        speakerHebrew: "עובד",
        thai: "ได้ค่ะ ปลั๊กอยู่ตรงนั้น",
        phonetic: "dai kha plak yoo trong nan",
        hebrew: "כן, השקע שם"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ขอบคุณครับ ซื้อซิมการ์ดที่ไหนดี",
        phonetic: "khop-khun khrap sue sim card tee nai dee",
        hebrew: "תודה, איפה כדאי לקנות כרטיס SIM?"
      }
    ],
    exercises: [
      {
        id: 60,
        question: "How do you ask for the WiFi password in Thai?",
        questionHebrew: "איך שואלים מה סיסמת ה-WiFi בתאילנדית?",
        options: ["ชาร์จโทรศัพท์ได้ไหม", "รหัสไวไฟอะไร", "ซื้อซิมการ์ดที่ไหน", "โทรศัพท์เสีย"],
        correctAnswer: 1,
        explanation: "'รหัสไวไฟอะไร' (ra-hat wifi arai) means 'What is the WiFi password?' Most places in Thailand have free WiFi.",
        explanationHebrew: "'รหัสไวไฟอะไร' (รา-หัท ไวไฟ อาไร) פירושו 'מה סיסמת ה-WiFi?' רוב המקומות בתאילנד מציעים WiFi חינם."
      },
      {
        id: 61,
        question: "What messaging app do Thais prefer over WhatsApp?",
        questionHebrew: "באיזו אפליקציית הודעות תאילנדים מעדיפים על פני WhatsApp?",
        options: ["Telegram", "WeChat", "LINE", "Facebook Messenger"],
        correctAnswer: 2,
        explanation: "LINE is Thailand's main messaging app. Download it before arriving - Thais use it more than WhatsApp for both personal and business communication.",
        explanationHebrew: "LINE היא אפליקציית ההודעות העיקרית בתאילנד. הורידו אותה לפני ההגעה - תאילנדים משתמשים בה יותר מ-WhatsApp לתקשורת אישית ועסקית."
      },
      {
        id: 62,
        question: "What does 'โทรศัพท์เสีย' (toh-ra-sap sia) mean?",
        questionHebrew: "מה המשמעות של 'โทรศัพท์เสีย' (โทรศัพท์ เสีย)?",
        options: ["I need a phone / אני צריך טלפון", "My phone is broken / הטלפון שלי מקולקל", "Phone number / מספר טלפון", "New phone / טלפון חדש"],
        correctAnswer: 1,
        explanation: "'โทรศัพท์เสีย' (toh-ra-sap sia) means 'my phone is broken'. MBK Center in Bangkok has hundreds of phone repair shops with cheap, fast service.",
        explanationHebrew: "'โทรศัพท์เสีย' (โทรศัพท์ เสีย) פירושו 'הטלפון שלי מקולקל'. ב-MBK Center בבנגקוק יש מאות חנויות תיקוני טלפונים בזול ובמהירות."
      }
    ]
  },
  {
    id: 21,
    title: "Banking & Money",
    titleHebrew: "בנקאות וכסף",
    icon: "💰",
    phrases: [
      {
        id: 101,
        english: "Where is the ATM?",
        hebrew: "איפה הכספומט?",
        thai: "ตู้เอทีเอ็มอยู่ที่ไหน",
        phonetic: "too ATM yoo tee nai",
        scenario: "ATMs everywhere in Thailand. Fees are 220฿ per withdrawal.",
        culturalTip: "Withdraw large amounts to minimize fees. ATMs are safe and reliable."
      },
      {
        id: 102,
        english: "Do you accept credit cards?",
        hebrew: "אתם מקבלים כרטיסי אשראי?",
        thai: "รับบัตรเครดิตไหม",
        phonetic: "rap bat credit mai",
        scenario: "Malls and hotels yes, street vendors and small shops usually no.",
        culturalTip: "Always carry cash. Many places are cash-only or have card minimums."
      },
      {
        id: 103,
        english: "Can I pay with card?",
        hebrew: "אני יכול לשלם בכרטיס?",
        thai: "จ่ายด้วยบัตรได้ไหม",
        phonetic: "jaai duay bat dai mai",
        scenario: "Ask before ordering at restaurants to avoid surprises.",
        culturalTip: "Some places add 3% surcharge for cards. Confirm before paying."
      },
      {
        id: 104,
        english: "I need change",
        hebrew: "אני צריך עודף",
        thai: "ขอทอนด้วย",
        phonetic: "khor ton duay",
        scenario: "When paying with large bills. Vendors often lack change.",
        culturalTip: "Break large bills at 7-Eleven or supermarkets before going to markets."
      },
      {
        id: 105,
        english: "Keep the change",
        hebrew: "שמור על העודף",
        thai: "เก็บเงินทอน",
        phonetic: "kep ngern ton",
        scenario: "Tipping is not mandatory but appreciated for good service.",
        culturalTip: "Round up taxi fares or leave 20-40฿ at restaurants. Small tips go far."
      }
    ],
    dialogue: [
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ตู้เอทีเอ็มอยู่ที่ไหนครับ",
        phonetic: "too ATM yoo tee nai khrap",
        hebrew: "איפה הכספומט?"
      },
      {
        speaker: "Local",
        speakerHebrew: "מקומי",
        thai: "อยู่หน้าเซเว่นค่ะ",
        phonetic: "yoo naa seven kha",
        hebrew: "מול הסבן-אילבן"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ร้านนี้รับบัตรเครดิตไหมครับ",
        phonetic: "raan nee rap bat credit mai khrap",
        hebrew: "החנות הזו מקבלת כרטיסי אשראי?"
      },
      {
        speaker: "Vendor",
        speakerHebrew: "מוכר",
        thai: "ไม่รับค่ะ เงินสดเท่านั้น",
        phonetic: "mai rap kha ngern sot tao nan",
        hebrew: "לא, מזומן בלבד"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ขอทอนด้วยครับ แบงค์พัน",
        phonetic: "khor ton duay khrap baeng pan",
        hebrew: "אני צריך עודף, שטר של אלף"
      }
    ],
    exercises: [
      {
        id: 63,
        question: "How much is the ATM withdrawal fee for foreigners in Thailand?",
        questionHebrew: "מהו דמי המשיכה מכספומט לזרים בתאילנד?",
        options: ["Free / חינם", "50 baht / באט", "220 baht / באט", "500 baht / באט"],
        correctAnswer: 2,
        explanation: "ATMs charge 220 baht per withdrawal for foreign cards. Withdraw large amounts to minimize fees.",
        explanationHebrew: "כספומטים גובים 220 באט למשיכה עבור כרטיסים זרים. משכו סכומים גדולים כדי למזער עמלות."
      },
      {
        id: 64,
        question: "How do you say 'Do you accept credit cards?' in Thai?",
        questionHebrew: "איך אומרים 'אתם מקבלים כרטיסי אשראי?' בתאילנדית?",
        options: ["ขอทอนด้วย (khor ton duay)", "เก็บเงินทอน (kep ngern ton)", "รับบัตรเครดิตไหม (rap bat credit mai)", "จ่ายด้วยบัตรได้ไหม (jaai duay bat dai mai)"],
        correctAnswer: 2,
        explanation: "'รับบัตรเครดิตไหม' (rap bat credit mai) means 'Do you accept credit cards?' Many small shops are cash-only.",
        explanationHebrew: "'รับบัตรเครดิตไหม' (רัพ บัท เครดิท מาי) פירושו 'אתם מקבלים כרטיסי אשראי?' חנויות קטנות רבות מקבלות מזומן בלבד."
      },
      {
        id: 65,
        question: "What does 'เก็บเงินทอน' (kep ngern ton) mean?",
        questionHebrew: "מה המשמעות של 'เก็บเงินทอน' (เก็บ เงิน ทอน)?",
        options: ["I need change / אני צריך עודף", "Keep the change / שמור על העודף", "Pay with card / לשלם בכרטיס", "Too expensive / יקר מדי"],
        correctAnswer: 1,
        explanation: "'เก็บเงินทอน' (kep ngern ton) means 'keep the change'. Tipping isn't mandatory but is appreciated for good service.",
        explanationHebrew: "'เก็บเงินทอน' (เก็บ เงิน ทอน) פירושו 'שמור על העודף'. טיפ אינו חובה אבל מוערך עבור שירות טוב."
      }
    ]
  },
  {
    id: 22,
    title: "Clothing & Sizes",
    titleHebrew: "בגדים ומידות",
    icon: "👕",
    phrases: [
      {
        id: 106,
        english: "Can I try this on?",
        hebrew: "אני יכול למדוד את זה?",
        thai: "ลองได้ไหม",
        phonetic: "long dai mai",
        scenario: "Essential for clothing shopping. Fitting rooms are common in markets.",
        culturalTip: "Always try before buying. Thai sizes run small compared to Western sizes."
      },
      {
        id: 107,
        english: "Too big",
        hebrew: "גדול מדי",
        thai: "ใหญ่ไป",
        phonetic: "yai pai",
        scenario: "When clothes don't fit. Ask for smaller size: 'มีเล็กกว่านี้ไหม' (mee lek kwa nee mai).",
        culturalTip: "Many shops offer free alterations. Ask 'ตัดแต่งได้ไหม' (tat taeng dai mai)."
      },
      {
        id: 108,
        english: "Too small",
        hebrew: "קטן מדי",
        thai: "เล็กไป",
        phonetic: "lek pai",
        scenario: "Common problem for Western tourists. Size up from your usual.",
        culturalTip: "XL in Thailand ≈ M in Western sizing. Always check measurements."
      },
      {
        id: 109,
        english: "What size is this?",
        hebrew: "מה המידה של זה?",
        thai: "นี่ไซส์อะไร",
        phonetic: "nee size arai",
        scenario: "Sizes vary wildly. Check actual measurements, not labels.",
        culturalTip: "Bring a measuring tape or know your measurements in centimeters."
      },
      {
        id: 110,
        english: "Do you have other colors?",
        hebrew: "יש לך צבעים אחרים?",
        thai: "มีสีอื่นไหม",
        phonetic: "mee see eun mai",
        scenario: "When you like the item but not the color.",
        culturalTip: "Vendors often have more stock in back. Don't hesitate to ask."
      }
    ],
    dialogue: [
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ลองได้ไหมครับ",
        phonetic: "long dai mai khrap",
        hebrew: "אפשר למדוד?"
      },
      {
        speaker: "Vendor",
        speakerHebrew: "מוכר",
        thai: "ได้ค่ะ ห้องลองอยู่ข้างหลัง",
        phonetic: "dai kha hong long yoo khaang lang",
        hebrew: "כן, חדר ההלבשה מאחורה"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "เล็กไปครับ มีไซส์ใหญ่กว่านี้ไหม",
        phonetic: "lek pai khrap mee size yai kwa nee mai",
        hebrew: "קטן מדי, יש מידה גדולה יותר?"
      },
      {
        speaker: "Vendor",
        speakerHebrew: "מוכר",
        thai: "มีค่ะ มีสีอื่นด้วยนะคะ",
        phonetic: "mee kha mee see eun duay na kha",
        hebrew: "כן, יש גם צבעים אחרים"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "นี่ไซส์อะไรครับ",
        phonetic: "nee size arai khrap",
        hebrew: "מה המידה של זה?"
      }
    ],
    exercises: [
      {
        id: 66,
        question: "How do you ask 'Can I try this on?' in Thai?",
        questionHebrew: "איך שואלים 'אפשר למדוד?' בתאילנדית?",
        options: ["นี่ไซส์อะไร (nee size arai)", "ลองได้ไหม (long dai mai)", "เล็กไป (lek pai)", "มีสีอื่นไหม (mee see eun mai)"],
        correctAnswer: 1,
        explanation: "'ลองได้ไหม' (long dai mai) means 'Can I try this on?' Always try before buying - Thai sizes run small compared to Western sizes.",
        explanationHebrew: "'ลองได้ไหม' (ลอง ได มาย) פירושו 'אפשר למדוד?' תמיד מדדו לפני קנייה - מידות תאילנדיות קטנות בהשוואה למידות מערביות."
      },
      {
        id: 67,
        question: "What does 'ใหญ่ไป' (yai pai) mean?",
        questionHebrew: "מה המשמעות של 'ใหญ่ไป' (ยาย ไป)?",
        options: ["Too small / קטן מדי", "Too expensive / יקר מדי", "Too big / גדול מדי", "Perfect fit / מידה מושלמת"],
        correctAnswer: 2,
        explanation: "'ใหญ่ไป' (yai pai) means 'too big'. Use 'เล็กไป' (lek pai) for 'too small'. Ask 'มีเล็กกว่านี้ไหม' for smaller size.",
        explanationHebrew: "'ใหญ่ไป' (ยาย ไป) פירושו 'גדול מדי'. השתמשו ב-'เล็กไป' (เล็ก ไป) ל'קטן מדי'. שאלו 'มีเล็กกว่านี้ไหม' למידה קטנה יותר."
      },
      {
        id: 68,
        question: "What is important to know about Thai clothing sizes?",
        questionHebrew: "מה חשוב לדעת על מידות בגדים תאילנדיות?",
        options: ["They are the same as Western / הן זהות למערביות", "XL in Thailand is about M in Western sizing / XL בתאילנד הוא בערך M במידות מערביות", "They only have one size / יש רק מידה אחת", "They use European sizing / הם משתמשים במידות אירופאיות"],
        correctAnswer: 1,
        explanation: "Thai sizes run small. XL in Thailand is approximately M in Western sizing. Always check actual measurements, not just labels.",
        explanationHebrew: "מידות תאילנדיות קטנות. XL בתאילנד שווה בערך ל-M במידות מערביות. תמיד בדקו מידות בפועל, לא רק תוויות."
      }
    ]
  },
  {
    id: 23,
    title: "Body Parts & Gestures",
    titleHebrew: "חלקי גוף ומחוות",
    icon: "🙌",
    phrases: [
      {
        id: 111,
        english: "My foot hurts",
        hebrew: "הרגל שלי כואבת",
        thai: "เท้าเจ็บ",
        phonetic: "tao jep",
        scenario: "From too much walking. Thai massage can help!",
        culturalTip: "Feet are considered lowest/dirtiest. Never point feet at people or Buddha images."
      },
      {
        id: 112,
        english: "My back hurts",
        hebrew: "הגב שלי כואב",
        thai: "ปวดหลัง",
        phonetic: "puat lang",
        scenario: "Long flights or carrying bags. Get a Thai massage!",
        culturalTip: "Thai massage is therapeutic, not just relaxation. Tell them problem areas."
      },
      {
        id: 113,
        english: "I'm tired",
        hebrew: "אני עייף",
        thai: "เหนื่อย",
        phonetic: "neuay",
        scenario: "After long day of sightseeing. Explains why you need rest.",
        culturalTip: "Thais understand heat exhaustion. Take breaks, drink water, rest often."
      },
      {
        id: 114,
        english: "I'm dizzy",
        hebrew: "מסתחרר לי",
        thai: "วิงเวียน",
        phonetic: "wing wian",
        scenario: "Heat stroke symptom. Sit down, drink water, seek shade immediately.",
        culturalTip: "Common in Thai heat. Get to air-con, drink electrolytes, rest."
      },
      {
        id: 115,
        english: "I feel better",
        hebrew: "אני מרגיש יותר טוב",
        thai: "รู้สึกดีขึ้น",
        phonetic: "roo-seuk dee keun",
        scenario: "After resting or treatment. Reassures concerned Thais.",
        culturalTip: "Thais are genuinely concerned about tourists' wellbeing. They'll help."
      }
    ],
    dialogue: [
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "เท้าเจ็บมากครับ เดินเยอะ",
        phonetic: "tao jep maak khrap dern yoe",
        hebrew: "כואב לי הרגל, הלכתי הרבה"
      },
      {
        speaker: "Friend",
        speakerHebrew: "חבר",
        thai: "ไปนวดไทยดีไหมคะ",
        phonetic: "pai nuat thai dee mai kha",
        hebrew: "בוא נלך לעיסוי תאילנדי?"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ดีครับ ปวดหลังด้วย",
        phonetic: "dee khrap puat lang duay",
        hebrew: "מצוין, גם כואב לי הגב"
      },
      {
        speaker: "Friend",
        speakerHebrew: "חבר",
        thai: "บอกเขาตรงที่เจ็บนะคะ",
        phonetic: "bok khao trong tee jep na kha",
        hebrew: "תגיד להם איפה כואב"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "รู้สึกดีขึ้นมากครับ",
        phonetic: "roo-seuk dee keun maak khrap",
        hebrew: "אני מרגיש הרבה יותר טוב"
      }
    ],
    exercises: [
      {
        id: 69,
        question: "What does 'เท้าเจ็บ' (tao jep) mean?",
        questionHebrew: "מה המשמעות של 'เท้าเจ็บ' (เท้า เจ็บ)?",
        options: ["My head hurts / כואב לי הראש", "My foot hurts / כואב לי הרגל", "My back hurts / כואב לי הגב", "I'm tired / אני עייף"],
        correctAnswer: 1,
        explanation: "'เท้าเจ็บ' (tao jep) means 'my foot hurts'. Common after lots of walking. Thai massage can help!",
        explanationHebrew: "'เท้าเจ็บ' (เท้า เจ็บ) פירושו 'כואב לי הרגל'. נפוץ אחרי הליכה רבה. עיסוי תאילנדי יכול לעזור!"
      },
      {
        id: 70,
        question: "Why are feet considered disrespectful in Thai culture?",
        questionHebrew: "למה רגליים נחשבות לא מכובדות בתרבות התאילנדית?",
        options: ["They are dirty from walking / הן מלוכלכות מהליכה", "Feet are the lowest part of the body, considered unclean / הרגליים הן החלק הנמוך ביותר בגוף, נחשבות לא טהורות", "There's no specific reason / אין סיבה ספציפית", "Only in temples / רק במקדשים"],
        correctAnswer: 1,
        explanation: "In Thai culture, feet are the lowest and dirtiest part of the body. Never point feet at people or Buddha images. Tuck them aside when sitting.",
        explanationHebrew: "בתרבות התאילנדית, הרגליים הן החלק הנמוך והמלוכלך ביותר בגוף. לעולם אל תצביעו עם הרגליים לאנשים או לפסלי בודהה. הכניסו אותן הצידה בישיבה."
      },
      {
        id: 71,
        question: "How do you say 'I feel better' in Thai?",
        questionHebrew: "איך אומרים 'אני מרגיש יותר טוב' בתאילנדית?",
        options: ["เหนื่อย (neuay)", "วิงเวียน (wing wian)", "รู้สึกดีขึ้น (roo-seuk dee keun)", "เท้าเจ็บ (tao jep)"],
        correctAnswer: 2,
        explanation: "'รู้สึกดีขึ้น' (roo-seuk dee keun) means 'I feel better'. Use after resting or treatment to reassure concerned Thais.",
        explanationHebrew: "'รู้สึกดีขึ้น' (רู-ซึก ดี เขิน) פירושו 'אני מרגיש יותר טוב'. השתמשו אחרי מנוחה או טיפול כדי להרגיע תאילנדים מודאגים."
      }
    ]
  },
  {
    id: 24,
    title: "Emotions & Feelings",
    titleHebrew: "רגשות ותחושות",
    icon: "😊",
    phrases: [
      {
        id: 116,
        english: "I'm happy",
        hebrew: "אני שמח",
        thai: "มีความสุข",
        phonetic: "mee kwam suk",
        scenario: "Express joy about your trip, food, or experiences.",
        culturalTip: "Thais value happiness ('สุข' - suk). Smiling and positive attitude go far."
      },
      {
        id: 117,
        english: "I'm sad",
        hebrew: "אני עצוב",
        thai: "เศร้า",
        phonetic: "sao",
        scenario: "When leaving Thailand or saying goodbye to new friends.",
        culturalTip: "Thais are empathetic. Sharing feelings creates deeper connections."
      },
      {
        id: 118,
        english: "I'm excited",
        hebrew: "אני נרגש",
        thai: "ตื่นเต้น",
        phonetic: "teun ten",
        scenario: "Before activities, tours, or trying new food.",
        culturalTip: "Enthusiasm is contagious. Thais love seeing tourists enjoy their country."
      },
      {
        id: 119,
        english: "I'm scared",
        hebrew: "אני מפחד",
        thai: "กลัว",
        phonetic: "klua",
        scenario: "Before adventure activities or trying exotic food.",
        culturalTip: "Thais will reassure and encourage you. It's okay to express fear."
      },
      {
        id: 120,
        english: "I'm surprised",
        hebrew: "אני מופתע",
        thai: "แปลกใจ",
        phonetic: "plaek jai",
        scenario: "Reacting to Thai culture, food, or unexpected situations.",
        culturalTip: "Thailand is full of surprises! Express wonder - Thais enjoy your reactions."
      }
    ],
    dialogue: [
      {
        speaker: "Friend",
        speakerHebrew: "חבר",
        thai: "ชอบเมืองไทยไหมคะ",
        phonetic: "chop meuang thai mai kha",
        hebrew: "אתה אוהב את תאילנד?"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "มีความสุขมากครับ",
        phonetic: "mee kwam suk maak khrap",
        hebrew: "אני מאוד שמח"
      },
      {
        speaker: "Friend",
        speakerHebrew: "חבר",
        thai: "ดีใจค่ะ ตื่นเต้นไหม",
        phonetic: "dee jai kha teun ten mai",
        hebrew: "שמחה לשמוע, נרגש?"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ตื่นเต้นมากครับ แต่เศร้าที่ต้องกลับ",
        phonetic: "teun ten maak khrap tae sao tee tong klap",
        hebrew: "מאוד נרגש, אבל עצוב שצריך לחזור"
      },
      {
        speaker: "Friend",
        speakerHebrew: "חבר",
        thai: "กลับมาอีกนะคะ",
        phonetic: "klap maa eek na kha",
        hebrew: "תחזור שוב"
      }
    ],
    exercises: [
      {
        id: 72,
        question: "How do you say 'I'm happy' in Thai?",
        questionHebrew: "איך אומרים 'אני שמח' בתאילנדית?",
        options: ["เศร้า (sao)", "มีความสุข (mee kwam suk)", "กลัว (klua)", "ตื่นเต้น (teun ten)"],
        correctAnswer: 1,
        explanation: "'มีความสุข' (mee kwam suk) means 'I'm happy'. Thais value happiness ('สุข' - suk) and a positive attitude goes far.",
        explanationHebrew: "'มีความสุข' (מי ความ สุข) פירושו 'אני שמח'. תאילנדים מעריכים אושר ('สุข' - סุק) וגישה חיובית עוזרת מאוד."
      },
      {
        id: 73,
        question: "What does 'กลัว' (klua) mean?",
        questionHebrew: "מה המשמעות של 'กลัว' (กลัว)?",
        options: ["I'm happy / אני שמח", "I'm excited / אני נרגש", "I'm scared / אני מפחד", "I'm surprised / אני מופתע"],
        correctAnswer: 2,
        explanation: "'กลัว' (klua) means 'I'm scared'. Thais will reassure and encourage you - it's perfectly okay to express fear.",
        explanationHebrew: "'กลัว' (กลัว) פירושו 'אני מפחד'. תאילנדים ירגיעו ויעודדו אתכם - זה בסדר גמור להביע פחד."
      },
      {
        id: 74,
        question: "How do you say 'I'm excited' in Thai?",
        questionHebrew: "איך אומרים 'אני נרגש' בתאילנדית?",
        options: ["แปลกใจ (plaek jai)", "เศร้า (sao)", "ตื่นเต้น (teun ten)", "มีความสุข (mee kwam suk)"],
        correctAnswer: 2,
        explanation: "'ตื่นเต้น' (teun ten) means 'I'm excited'. Enthusiasm is contagious - Thais love seeing tourists enjoy their country!",
        explanationHebrew: "'ตื่นเต้น' (ตืน เต้น) פירושו 'אני נרגש'. התלהבות מדבקת - תאילנדים אוהבים לראות תיירים נהנים מהארץ שלהם!"
      }
    ]
  },
  {
    id: 25,
    title: "Nature & Animals",
    titleHebrew: "טבע ובעלי חיים",
    icon: "🐘",
    phrases: [
      {
        id: 121,
        english: "Elephant",
        hebrew: "פיל",
        thai: "ช้าง",
        phonetic: "chaang",
        scenario: "Thailand's national symbol. Visit ethical sanctuaries only.",
        culturalTip: "Avoid elephant riding. Choose sanctuaries where elephants roam freely."
      },
      {
        id: 122,
        english: "Monkey",
        hebrew: "קוף",
        thai: "ลิง",
        phonetic: "ling",
        scenario: "Common at temples. Don't feed or provoke them!",
        culturalTip: "Monkeys can be aggressive. Secure bags, sunglasses, and food."
      },
      {
        id: 123,
        english: "Beach",
        hebrew: "חוף",
        thai: "หาด",
        phonetic: "haat",
        scenario: "Thailand has amazing beaches. 'ไปหาด' (pai haat) = go to beach.",
        culturalTip: "Best beaches: Krabi, Phuket, Koh Samui. Avoid monsoon season."
      },
      {
        id: 124,
        english: "Mountain",
        hebrew: "הר",
        thai: "ภูเขา",
        phonetic: "poo khao",
        scenario: "Northern Thailand has beautiful mountains. Chiang Mai, Pai, etc.",
        culturalTip: "Mountains are cooler. Bring light jacket for evening."
      },
      {
        id: 125,
        english: "Waterfall",
        hebrew: "מפל",
        thai: "น้ำตก",
        phonetic: "nam tok",
        scenario: "Popular tourist attractions. Best during/after rainy season.",
        culturalTip: "Bring swimsuit. Many waterfalls allow swimming in pools."
      }
    ],
    dialogue: [
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "อยากไปดูช้างครับ",
        phonetic: "yaak pai doo chaang khrap",
        hebrew: "אני רוצה ללכת לראות פילים"
      },
      {
        speaker: "Guide",
        speakerHebrew: "מדריך",
        thai: "มีสถานที่ดูแลช้างดีๆ ค่ะ",
        phonetic: "mee sa-taan-tee doo lae chaang dee dee kha",
        hebrew: "יש שמורת פילים טובה"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ไม่ขี่ช้างนะครับ ดูอย่างเดียว",
        phonetic: "mai kee chaang na khrap doo yaang diao",
        hebrew: "לא לרכוב על פילים, רק להסתכל"
      },
      {
        speaker: "Guide",
        speakerHebrew: "מדריך",
        thai: "ดีค่ะ มีหาดสวยๆ ใกล้ๆ ด้วย",
        phonetic: "dee kha mee haat suay suay klai klai duay",
        hebrew: "מצוין, יש גם חוף יפה בקרבת מקום"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "อยากไปน้ำตกด้วยครับ",
        phonetic: "yaak pai nam tok duay khrap",
        hebrew: "אני רוצה גם ללכת למפל"
      }
    ],
    exercises: [
      {
        id: 75,
        question: "What does 'ช้าง' (chaang) mean?",
        questionHebrew: "מה המשמעות של 'ช้าง' (ช้าง)?",
        options: ["Monkey / קוף", "Beach / חוף", "Elephant / פיל", "Mountain / הר"],
        correctAnswer: 2,
        explanation: "'ช้าง' (chaang) means 'elephant' - Thailand's national symbol. Always visit ethical sanctuaries, not riding camps.",
        explanationHebrew: "'ช้าง' (ช้าง) פירושו 'פיל' - הסמל הלאומי של תאילנד. תמיד בקרו בשמורות אתיות, לא במחנות רכיבה."
      },
      {
        id: 76,
        question: "Why should you avoid elephant riding in Thailand?",
        questionHebrew: "למה צריך להימנע מרכיבה על פילים בתאילנד?",
        options: ["It's expensive / זה יקר", "It's illegal / זה לא חוקי", "Choose ethical sanctuaries where elephants roam freely / בחרו שמורות אתיות שבהן פילים מסתובבים בחופשיות", "Elephants are dangerous / פילים מסוכנים"],
        correctAnswer: 2,
        explanation: "Elephant riding is harmful. Choose ethical sanctuaries where elephants roam freely and are treated well.",
        explanationHebrew: "רכיבה על פילים מזיקה. בחרו שמורות אתיות שבהן פילים מסתובבים בחופשיות ומטופלים היטב."
      },
      {
        id: 77,
        question: "What does 'หาด' (haat) mean?",
        questionHebrew: "מה המשמעות של 'หาด' (หาด)?",
        options: ["Mountain / הר", "Waterfall / מפל", "Beach / חוף", "Forest / יער"],
        correctAnswer: 2,
        explanation: "'หาด' (haat) means 'beach'. Thailand has amazing beaches: Krabi, Phuket, Koh Samui. 'ไปหาด' (pai haat) = 'go to beach'.",
        explanationHebrew: "'หาด' (หาด) פירושו 'חוף'. בתאילנד יש חופים מדהימים: קראבי, פוקט, קו סמוי. 'ไปหาด' (ไป หาด) = 'ללכת לחוף'."
      }
    ]
  },
  {
    id: 26,
    title: "Sports & Activities",
    titleHebrew: "ספורט ופעילויות",
    icon: "⚽",
    phrases: [
      {
        id: 126,
        english: "Muay Thai",
        hebrew: "מוואי תאי",
        thai: "มวยไทย",
        phonetic: "muay thai",
        scenario: "Thailand's national sport. Watch fights or take classes.",
        culturalTip: "Lumpinee and Rajadamnern stadiums in Bangkok host authentic fights."
      },
      {
        id: 127,
        english: "I want to go diving",
        hebrew: "אני רוצה לצלול",
        thai: "อยากไปดำน้ำ",
        phonetic: "yaak pai dam naam",
        scenario: "Thailand has world-class diving. Similan Islands, Koh Tao, etc.",
        culturalTip: "Get PADI certified in Koh Tao - cheap and high quality."
      },
      {
        id: 128,
        english: "Swimming pool",
        hebrew: "בריכת שחייה",
        thai: "สระว่ายน้ำ",
        phonetic: "sa waai naam",
        scenario: "Most hotels have pools. Ask 'มีสระว่ายน้ำไหม' (mee sa waai naam mai).",
        culturalTip: "Rooftop pools are popular in Bangkok. Great for sunset views."
      },
      {
        id: 129,
        english: "I want to rent a bicycle",
        hebrew: "אני רוצה לשכור אופניים",
        thai: "อยากเช่าจักรยาน",
        phonetic: "yaak chao jak-ka-yaan",
        scenario: "Great for exploring islands or old cities like Ayutthaya.",
        culturalTip: "Wear helmet, drive on left, watch for traffic. Bikes are cheap to rent."
      },
      {
        id: 130,
        english: "Yoga class",
        hebrew: "שיעור יוגה",
        thai: "คลาสโยคะ",
        phonetic: "class yoga",
        scenario: "Popular in Chiang Mai, Koh Phangan. Many retreats available.",
        culturalTip: "Thailand is a yoga hub. From budget to luxury retreats."
      }
    ],
    dialogue: [
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "อยากไปดูมวยไทยครับ",
        phonetic: "yaak pai doo muay thai khrap",
        hebrew: "אני רוצה ללכת לראות מוואי תאי"
      },
      {
        speaker: "Friend",
        speakerHebrew: "חבר",
        thai: "ไปลุมพินีดีไหมคะ",
        phonetic: "pai lum-pi-nee dee mai kha",
        hebrew: "נלך ללומפיני?"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ดีครับ มีสระว่ายน้ำที่โรงแรมไหม",
        phonetic: "dee khrap mee sa waai naam tee rohng raem mai",
        hebrew: "מצוין, יש בריכה במלון?"
      },
      {
        speaker: "Friend",
        speakerHebrew: "חבר",
        thai: "มีค่ะ อยากเช่าจักรยานพรุ่งนี้ไหม",
        phonetic: "mee kha yaak chao jak-ka-yaan proong nee mai",
        hebrew: "כן, רוצה לשכור אופניים מחר?"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "อยากครับ อยากไปดำน้ำด้วย",
        phonetic: "yaak khrap yaak pai dam naam duay",
        hebrew: "כן, ואני גם רוצה לצלול"
      }
    ],
    exercises: [
      {
        id: 78,
        question: "What is 'มวยไทย' (muay thai)?",
        questionHebrew: "מה זה 'มวยไทย' (มวย ไท)?",
        options: ["Thai food / אוכל תאילנדי", "Thai boxing - Thailand's national sport / אגרוף תאילנדי - הספורט הלאומי של תאילנד", "Thai massage / עיסוי תאילנדי", "Thai temple / מקדש תאילנדי"],
        correctAnswer: 1,
        explanation: "'มวยไทย' (muay thai) is Thai boxing - Thailand's national sport. Watch at Lumpinee or Rajadamnern stadiums in Bangkok.",
        explanationHebrew: "'มวยไทย' (מוuay ไท) הוא אגרוף תאילנדי - הספורט הלאומי של תאילנד. צפו באצטדיון לומפיני או ראג'דמנרן בבנגקוק."
      },
      {
        id: 79,
        question: "How do you say 'I want to go diving' in Thai?",
        questionHebrew: "איך אומרים 'אני רוצה לצלול' בתאילנדית?",
        options: ["อยากเช่าจักรยาน (yaak chao jak-ka-yaan)", "อยากไปดำน้ำ (yaak pai dam naam)", "มีสระว่ายน้ำไหม (mee sa waai naam mai)", "คลาสโยคะ (class yoga)"],
        correctAnswer: 1,
        explanation: "'อยากไปดำน้ำ' (yaak pai dam naam) means 'I want to go diving'. Thailand has world-class diving at Similan Islands and Koh Tao.",
        explanationHebrew: "'อยากไปดำน้ำ' (ยาก ไป ดำ น้ำ) פירושו 'אני רוצה לצלול'. בתאילנד יש צלילה ברמה עולמית באיי סימילאן וקו טאו."
      },
      {
        id: 80,
        question: "What should you remember when renting a bicycle in Thailand?",
        questionHebrew: "מה צריך לזכור כששוכרים אופניים בתאילנד?",
        options: ["Drive on the right side / לנהוג בצד ימין", "Drive on the left, wear a helmet, watch for traffic / לנהוג בצד שמאל, לחבוש קסדה, להיזהר מתנועה", "Bicycles are very expensive / אופניים מאוד יקרים", "You need a license / צריך רישיון"],
        correctAnswer: 1,
        explanation: "Drive on the left side (like UK), wear a helmet, and watch for traffic. Bikes are cheap to rent - great for exploring islands.",
        explanationHebrew: "נוהגים בצד שמאל (כמו בבריטניה), חובשים קסדה, ונזהרים מתנועה. אופניים זולים להשכרה - מצוין לסיורים באיים."
      }
    ]
  },
  {
    id: 27,
    title: "Festivals & Celebrations",
    titleHebrew: "פסטיבלים וחגיגות",
    icon: "🎊",
    phrases: [
      {
        id: 131,
        english: "Songkran (Water Festival)",
        hebrew: "סונגקראן (פסטיבל המים)",
        thai: "สงกรานต์",
        phonetic: "song-kraan",
        scenario: "Thai New Year (April 13-15). Massive water fights nationwide!",
        culturalTip: "Protect electronics. Wear waterproof clothes. Join the fun!"
      },
      {
        id: 132,
        english: "Loy Krathong (Lantern Festival)",
        hebrew: "לוי קרתונג (פסטיבל הפנסים)",
        thai: "ลอยกระทง",
        phonetic: "loy kra-tong",
        scenario: "November full moon. Float decorated baskets on water, release lanterns.",
        culturalTip: "Chiang Mai's Yi Peng is spectacular. Book accommodation months ahead."
      },
      {
        id: 133,
        english: "Happy New Year",
        hebrew: "שנה טובה",
        thai: "สวัสดีปีใหม่",
        phonetic: "sa-wat-dee pee mai",
        scenario: "For Western New Year (Jan 1) or Thai New Year (Songkran).",
        culturalTip: "Thais celebrate both! Western New Year has countdown parties."
      },
      {
        id: 134,
        english: "Happy Birthday",
        hebrew: "יום הולדת שמח",
        thai: "สุขสันต์วันเกิด",
        phonetic: "suk-san wan kert",
        scenario: "Thais love birthdays. Cake and celebrations are common.",
        culturalTip: "Birthday person often treats others! Opposite of Western culture."
      },
      {
        id: 135,
        english: "Congratulations",
        hebrew: "מזל טוב",
        thai: "ยินดีด้วย",
        phonetic: "yin dee duay",
        scenario: "For achievements, weddings, new jobs, or any good news.",
        culturalTip: "Thais are genuinely happy for others' success. Share good news!"
      }
    ],
    dialogue: [
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "สงกรานต์เมื่อไหร่ครับ",
        phonetic: "song-kraan meua rai khrap",
        hebrew: "מתי סונגקראן?"
      },
      {
        speaker: "Local",
        speakerHebrew: "מקומי",
        thai: "สิบสามถึงสิบห้าเมษายนค่ะ",
        phonetic: "sip-saam teung sip-haa me-saa-yon kha",
        hebrew: "13 עד 15 באפריל"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "สนุกไหมครับ",
        phonetic: "sa-nuk mai khrap",
        hebrew: "כיף?"
      },
      {
        speaker: "Local",
        speakerHebrew: "מקומי",
        thai: "สนุกมากค่ะ เล่นน้ำกัน สวัสดีปีใหม่",
        phonetic: "sa-nuk maak kha len naam kan sa-wat-dee pee mai",
        hebrew: "מאוד כיף, משחקים במים. שנה טובה!"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "สวัสดีปีใหม่ครับ",
        phonetic: "sa-wat-dee pee mai khrap",
        hebrew: "שנה טובה!"
      }
    ],
    exercises: [
      {
        id: 81,
        question: "When is Songkran (Thai New Year)?",
        questionHebrew: "מתי סונגקראן (ראש השנה התאילנדי)?",
        options: ["January 1 / 1 בינואר", "April 13-15 / 13-15 באפריל", "November 15 / 15 בנובמבר", "December 31 / 31 בדצמבר"],
        correctAnswer: 1,
        explanation: "Songkran (สงกรานต์) is April 13-15 - Thai New Year with massive water fights nationwide! Protect your electronics.",
        explanationHebrew: "סונגקראן (สงกรานต์) הוא 13-15 באפריל - ראש השנה התאילנדי עם קרבות מים ענקיים ברחבי הארץ! הגנו על המכשירים האלקטרוניים."
      },
      {
        id: 82,
        question: "What is 'ลอยกระทง' (Loy Krathong)?",
        questionHebrew: "מה זה 'ลอยกระทง' (לוי קרתונג)?",
        options: ["Water festival / פסטיבל מים", "Lantern festival with floating baskets / פסטיבל פנסים עם סירות צפות", "Food festival / פסטיבל אוכל", "Music festival / פסטיבל מוזיקה"],
        correctAnswer: 1,
        explanation: "'ลอยกระทง' (Loy Krathong) is the Lantern Festival in November. Float decorated baskets on water and release sky lanterns. Chiang Mai's Yi Peng is spectacular.",
        explanationHebrew: "'ลอยกระทง' (לוי קרתונג) הוא פסטיבל הפנסים בנובמבר. מציפים סירות מקושטות על המים ומשחררים פנסי שמיים. יי-פנג בצ'יאנג מאי מרהיב."
      },
      {
        id: 83,
        question: "How do you say 'Happy New Year' in Thai?",
        questionHebrew: "איך אומרים 'שנה טובה' בתאילנדית?",
        options: ["สุขสันต์วันเกิด (suk-san wan kert)", "ยินดีด้วย (yin dee duay)", "สวัสดีปีใหม่ (sa-wat-dee pee mai)", "ขอบคุณ (khop-khun)"],
        correctAnswer: 2,
        explanation: "'สวัสดีปีใหม่' (sa-wat-dee pee mai) means 'Happy New Year'. Used for both Western New Year and Songkran.",
        explanationHebrew: "'สวัสดีปีใหม่' (สวัสดี ปี ใหม่) פירושו 'שנה טובה'. משתמשים גם לשנה החדשה המערבית וגם לסונגקראן."
      },
      {
        id: 84,
        question: "What is unique about Thai birthday culture?",
        questionHebrew: "מה ייחודי בתרבות ימי ההולדת התאילנדית?",
        options: ["They don't celebrate birthdays / הם לא חוגגים ימי הולדת", "The birthday person treats others / חוגג יום ההולדת מכבד את האחרים", "They only celebrate every 5 years / חוגגים רק כל 5 שנים", "Birthdays are private / ימי הולדת הם פרטיים"],
        correctAnswer: 1,
        explanation: "In Thai culture, the birthday person often treats others - the opposite of Western culture! Say 'สุขสันต์วันเกิด' (suk-san wan kert) for Happy Birthday.",
        explanationHebrew: "בתרבות התאילנדית, חוגג יום ההולדת לרוב מכבד את האחרים - ההפך מהתרבות המערבית! אמרו 'สุขสันต์วันเกิด' (สุข สัน วัน เกิด) ליום הולדת שמח."
      }
    ]
  },
  {
    id: 28,
    title: "Business & Work",
    titleHebrew: "עסקים ועבודה",
    icon: "💼",
    phrases: [
      {
        id: 136,
        english: "I'm here for business",
        hebrew: "אני כאן לעסקים",
        thai: "มาทำธุรกิจ",
        phonetic: "maa tam tu-ra-kit",
        scenario: "At immigration or when asked about your visit.",
        culturalTip: "Business visa required for work. Tourist visa for meetings is okay."
      },
      {
        id: 137,
        english: "Here's my business card",
        hebrew: "הנה כרטיס הביקור שלי",
        thai: "นี่นามบัตรผม/ดิฉัน",
        phonetic: "nee naam bat pom/dichan",
        scenario: "Business meetings. Present with both hands, slight bow.",
        culturalTip: "Thais exchange cards formally. Receive with both hands, read it, don't pocket immediately."
      },
      {
        id: 138,
        english: "Let's schedule a meeting",
        hebrew: "בוא נקבע פגישה",
        thai: "นัดประชุมกัน",
        phonetic: "nat pra-chum kan",
        scenario: "Setting up business discussions. Be flexible with timing.",
        culturalTip: "Thais value relationships over punctuality. Build rapport first."
      },
      {
        id: 139,
        english: "Thank you for your time",
        hebrew: "תודה על הזמן שלך",
        thai: "ขอบคุณสำหรับเวลา",
        phonetic: "khop-khun sam-rap we-laa",
        scenario: "Ending meetings politely. Shows respect for their time.",
        culturalTip: "Thais appreciate politeness in business. Always thank them."
      },
      {
        id: 140,
        english: "I'll send you an email",
        hebrew: "אני אשלח לך אימייל",
        thai: "จะส่งอีเมลให้",
        phonetic: "ja song email hai",
        scenario: "Follow-up after meetings. Thais prefer LINE but email is professional.",
        culturalTip: "Follow up promptly. Thais may not respond immediately - be patient."
      }
    ],
    dialogue: [
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "สวัสดีครับ มาทำธุรกิจ",
        phonetic: "sa-wat-dee khrap maa tam tu-ra-kit",
        hebrew: "שלום, אני כאן לעסקים"
      },
      {
        speaker: "Colleague",
        speakerHebrew: "עמית",
        thai: "ยินดีต้อนรับค่ะ นี่นามบัตรดิฉัน",
        phonetic: "yin dee ton rap kha nee naam bat dichan",
        hebrew: "ברוכים הבאים, הנה כרטיס הביקור שלי"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ขอบคุณครับ นี่นามบัตรผม",
        phonetic: "khop-khun khrap nee naam bat pom",
        hebrew: "תודה, הנה כרטיס הביקור שלי"
      },
      {
        speaker: "Colleague",
        speakerHebrew: "עמית",
        thai: "นัดประชุมพรุ่งนี้ดีไหมคะ",
        phonetic: "nat pra-chum proong nee dee mai kha",
        hebrew: "נקבע פגישה למחר?"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ดีครับ ขอบคุณสำหรับเวลา จะส่งอีเมลให้",
        phonetic: "dee khrap khop-khun sam-rap we-laa ja song email hai",
        hebrew: "מצוין, תודה על הזמן. אשלח אימייל"
      }
    ],
    exercises: [
      {
        id: 85,
        question: "How should you present a business card in Thailand?",
        questionHebrew: "איך צריך להגיש כרטיס ביקור בתאילנד?",
        options: ["Toss it on the table / לזרוק על השולחן", "Present with both hands and a slight bow / להגיש בשתי ידיים עם קידה קלה", "Put it in your pocket / לשים בכיס", "Leave it at reception / להשאיר בקבלה"],
        correctAnswer: 1,
        explanation: "Present business cards with both hands and a slight bow. When receiving, use both hands, read it, and don't pocket it immediately.",
        explanationHebrew: "הגישו כרטיסי ביקור בשתי ידיים עם קידה קלה. כשמקבלים, השתמשו בשתי ידיים, קראו אותו, ואל תכניסו לכיס מיד."
      },
      {
        id: 86,
        question: "What do Thais value more in business relationships?",
        questionHebrew: "מה תאילנדים מעריכים יותר ביחסים עסקיים?",
        options: ["Strict punctuality / דייקנות קפדנית", "Building rapport and relationships / בניית יחסים וקשר אישי", "Aggressive negotiation / משא ומתן אגרסיבי", "Formal dress code / קוד לבוש פורמלי"],
        correctAnswer: 1,
        explanation: "Thais value relationships over punctuality in business. Build rapport first before diving into business discussions.",
        explanationHebrew: "תאילנדים מעריכים יחסים מעל דייקנות בעסקים. בנו קשר אישי קודם לפני שנכנסים לדיונים עסקיים."
      },
      {
        id: 87,
        question: "How do you say 'Thank you for your time' in Thai?",
        questionHebrew: "איך אומרים 'תודה על הזמן שלך' בתאילנדית?",
        options: ["นัดประชุมกัน (nat pra-chum kan)", "จะส่งอีเมลให้ (ja song email hai)", "ขอบคุณสำหรับเวลา (khop-khun sam-rap we-laa)", "มาทำธุรกิจ (maa tam tu-ra-kit)"],
        correctAnswer: 2,
        explanation: "'ขอบคุณสำหรับเวลา' (khop-khun sam-rap we-laa) means 'Thank you for your time'. Shows respect and is appreciated in business settings.",
        explanationHebrew: "'ขอบคุณสำหรับเวลา' (ขอบคุณ สำหรับ เวลา) פירושו 'תודה על הזמן שלך'. מראה כבוד ומוערך בסביבה עסקית."
      }
    ]
  },
  {
    id: 29,
    title: "Accommodation Issues",
    titleHebrew: "בעיות לינה",
    icon: "🏨",
    phrases: [
      {
        id: 141,
        english: "The air conditioning doesn't work",
        hebrew: "המזגן לא עובד",
        thai: "แอร์เสีย",
        phonetic: "air sia",
        scenario: "Critical in Thai heat! Report immediately to reception.",
        culturalTip: "Hotels fix issues quickly. Don't suffer in silence."
      },
      {
        id: 142,
        english: "Can I change rooms?",
        hebrew: "אני יכול להחליף חדר?",
        thai: "ขอเปลี่ยนห้องได้ไหม",
        phonetic: "khor plian hong dai mai",
        scenario: "If room is noisy, dirty, or has problems.",
        culturalTip: "Hotels usually accommodate politely-made requests."
      },
      {
        id: 143,
        english: "The WiFi is not working",
        hebrew: "ה-WiFi לא עובד",
        thai: "ไวไฟไม่ทำงาน",
        phonetic: "wifi mai tam ngaan",
        scenario: "Common issue. Ask for router reset or different network.",
        culturalTip: "Get WiFi password at check-in. Test it before staff leaves."
      },
      {
        id: 144,
        english: "I need more towels",
        hebrew: "אני צריך עוד מגבות",
        thai: "ขอผ้าเช็ดตัวเพิ่ม",
        phonetic: "khor paa chet tua perm",
        scenario: "Call housekeeping or front desk. Usually delivered quickly.",
        culturalTip: "Housekeeping is excellent in Thailand. Don't hesitate to ask."
      },
      {
        id: 145,
        english: "What time is checkout?",
        hebrew: "מה שעת היציאה?",
        thai: "เช็คเอาท์กี่โมง",
        phonetic: "check-out kee mong",
        scenario: "Usually 12pm. Ask about late checkout if needed.",
        culturalTip: "Late checkout often available for small fee or free if not busy."
      }
    ],
    dialogue: [
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "แอร์เสียครับ ร้อนมาก",
        phonetic: "air sia khrap ron maak",
        hebrew: "המזגן לא עובד, חם מאוד"
      },
      {
        speaker: "Receptionist",
        speakerHebrew: "פקיד קבלה",
        thai: "ขอโทษค่ะ ส่งช่างไปดูเลยนะคะ",
        phonetic: "khor-toht kha song chang pai doo loei na kha",
        hebrew: "סליחה, נשלח טכנאי מיד"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ขอเปลี่ยนห้องได้ไหมครับ",
        phonetic: "khor plian hong dai mai khrap",
        hebrew: "אפשר להחליף חדר?"
      },
      {
        speaker: "Receptionist",
        speakerHebrew: "פקיד קבלה",
        thai: "ได้ค่ะ ขอผ้าเช็ดตัวเพิ่มไหมคะ",
        phonetic: "dai kha khor paa chet tua perm mai kha",
        hebrew: "כן, צריך עוד מגבות?"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ได้ครับ เช็คเอาท์กี่โมงครับ",
        phonetic: "dai khrap check-out kee mong khrap",
        hebrew: "כן. מה שעת היציאה?"
      },
      {
        speaker: "Receptionist",
        speakerHebrew: "פקיד קבלה",
        thai: "เที่ยงค่ะ",
        phonetic: "tiang kha",
        hebrew: "בשתים עשרה בצהריים"
      }
    ],
    exercises: [
      {
        id: 88,
        question: "How do you say 'Can I change rooms?' in Thai?",
        questionHebrew: "איך אומרים 'אפשר להחליף חדר?' בתאילנדית?",
        options: ["แอร์เสีย (air sia)", "ขอผ้าเช็ดตัวเพิ่ม (khor paa chet tua perm)", "ขอเปลี่ยนห้องได้ไหม (khor plian hong dai mai)", "เช็คเอาท์กี่โมง (check-out kee mong)"],
        correctAnswer: 2,
        explanation: "'ขอเปลี่ยนห้องได้ไหม' (khor plian hong dai mai) means 'Can I change rooms?' Hotels usually accommodate politely-made requests.",
        explanationHebrew: "'ขอเปลี่ยนห้องได้ไหม' (kor plian hong dai mai) פירושו 'אפשר להחליף חדר?' מלונות בדרך כלל נענים לבקשות שנאמרות בנימוס."
      },
      {
        id: 89,
        question: "What does 'ไวไฟไม่ทำงาน' (wifi mai tam ngaan) mean?",
        questionHebrew: "מה המשמעות של 'ไวไฟไม่ทำงาน' (wifi mai tam ngaan)?",
        options: ["The AC is broken / המזגן שבור", "The WiFi is not working / ה-WiFi לא עובד", "I need towels / אני צריך מגבות", "The room is dirty / החדר מלוכלך"],
        correctAnswer: 1,
        explanation: "'ไวไฟไม่ทำงาน' (wifi mai tam ngaan) means 'The WiFi is not working'. Get the WiFi password at check-in and test it before staff leaves.",
        explanationHebrew: "'ไวไฟไม่ทำงาน' (wifi mai tam ngaan) פירושו 'ה-WiFi לא עובד'. קבלו את סיסמת ה-WiFi בצ'ק-אין ובדקו אותה לפני שהצוות עוזב."
      },
      {
        id: 90,
        question: "What is the typical checkout time in Thai hotels?",
        questionHebrew: "מהי שעת היציאה האופיינית במלונות תאילנדיים?",
        options: ["10 AM", "12 PM (noon)", "2 PM", "3 PM"],
        correctAnswer: 1,
        explanation: "Checkout is usually at 12 PM (noon). Late checkout is often available for a small fee or free if the hotel isn't busy.",
        explanationHebrew: "שעת היציאה היא בדרך כלל ב-12 בצהריים. יציאה מאוחרת לרוב אפשרית בתשלום קטן או בחינם אם המלון לא מלא."
      }
    ]
  },
  {
    id: 30,
    title: "Local Customs & Etiquette",
    titleHebrew: "מנהגים ונימוסים מקומיים",
    icon: "🙏",
    phrases: [
      {
        id: 146,
        english: "I respect Thai culture",
        hebrew: "אני מכבד את התרבות התאילנדית",
        thai: "เคารพวัฒนธรรมไทย",
        phonetic: "kao-rop wat-ta-na-tam thai",
        scenario: "Shows cultural awareness. Thais deeply appreciate this.",
        culturalTip: "Learn basic customs: remove shoes, dress modestly at temples, respect monarchy."
      },
      {
        id: 147,
        english: "Is this appropriate?",
        hebrew: "זה מתאים?",
        thai: "เหมาะสมไหม",
        phonetic: "maw-som mai",
        scenario: "When unsure about clothing, behavior, or actions.",
        culturalTip: "Thais will kindly guide you. Better to ask than offend unknowingly."
      },
      {
        id: 148,
        english: "I want to learn Thai customs",
        hebrew: "אני רוצה ללמוד מנהגים תאילנדיים",
        thai: "อยากเรียนรู้ประเพณีไทย",
        phonetic: "yaak rian roo pra-pe-nee thai",
        scenario: "Opens cultural conversations. Thais love sharing their traditions.",
        culturalTip: "Observe and ask questions. Thais are patient teachers."
      },
      {
        id: 149,
        english: "May I take a photo?",
        hebrew: "אני יכול לצלם?",
        thai: "ถ่ายรูปได้ไหม",
        phonetic: "taai roop dai mai",
        scenario: "Always ask before photographing people, monks, or sacred objects.",
        culturalTip: "Some temples prohibit photos of Buddha images. Look for signs."
      },
      {
        id: 150,
        english: "Thank you for teaching me",
        hebrew: "תודה שלימדת אותי",
        thai: "ขอบคุณที่สอน",
        phonetic: "khop-khun tee son",
        scenario: "After Thais help you learn language, customs, or anything.",
        culturalTip: "Gratitude goes far. Thais love helping tourists learn."
      }
    ],
    dialogue: [
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "เคารพวัฒนธรรมไทยครับ",
        phonetic: "kao-rop wat-ta-na-tam thai khrap",
        hebrew: "אני מכבד את התרבות התאילנדית"
      },
      {
        speaker: "Local",
        speakerHebrew: "מקומי",
        thai: "ดีใจค่ะ คุณใจดีมาก",
        phonetic: "dee jai kha khun jai dee maak",
        hebrew: "שמחה לשמוע, אתה מאוד נחמד"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ถ่ายรูปได้ไหมครับ",
        phonetic: "taai roop dai mai khrap",
        hebrew: "אפשר לצלם?"
      },
      {
        speaker: "Local",
        speakerHebrew: "מקומי",
        thai: "ได้ค่ะ ถ่ายเลย",
        phonetic: "dai kha taai loei",
        hebrew: "כן, צלם"
      },
      {
        speaker: "You",
        speakerHebrew: "אתה",
        thai: "ขอบคุณที่สอนครับ อยากเรียนรู้ประเพณีไทย",
        phonetic: "khop-khun tee son khrap yaak rian roo pra-pe-nee thai",
        hebrew: "תודה שלימדת, אני רוצה ללמוד מנהגים תאילנדיים"
      },
      {
        speaker: "Local",
        speakerHebrew: "מקומי",
        thai: "ยินดีค่ะ กลับมาอีกนะคะ",
        phonetic: "yin dee kha klap maa eek na kha",
        hebrew: "בשמחה, תחזור שוב"
      }
    ],
    exercises: [
      {
        id: 91,
        question: "How do you say 'I respect Thai culture' in Thai?",
        questionHebrew: "איך אומרים 'אני מכבד את התרבות התאילנדית' בתאילנדית?",
        options: ["เหมาะสมไหม (maw-som mai)", "เคารพวัฒนธรรมไทย (kao-rop wat-ta-na-tam thai)", "อยากเรียนรู้ประเพณีไทย (yaak rian roo pra-pe-nee thai)", "ขอบคุณที่สอน (khop-khun tee son)"],
        correctAnswer: 1,
        explanation: "'เคารพวัฒนธรรมไทย' (kao-rop wat-ta-na-tam thai) means 'I respect Thai culture'. Thais deeply appreciate this sentiment from visitors.",
        explanationHebrew: "'เคารพวัฒนธรรมไทย' (เคารพ วัฒนธรรม ไท) פירושו 'אני מכבד את התרבות התאילנדית'. תאילנדים מעריכים מאוד את הרגש הזה ממבקרים."
      },
      {
        id: 92,
        question: "What are the three basic Thai customs every tourist should know?",
        questionHebrew: "מהם שלושת המנהגים התאילנדיים הבסיסיים שכל תייר צריך לדעת?",
        options: ["Eat spicy food, drink beer, dance / לאכול חריף, לשתות בירה, לרקוד", "Remove shoes, dress modestly at temples, respect the monarchy / להוריד נעליים, להתלבש בצניעות במקדשים, לכבד את המלוכה", "Speak Thai, eat with chopsticks, tip 20% / לדבר תאילנדית, לאכול עם מקלות, לתת 20% טיפ", "Bow to everyone, wear white, avoid markets / לקוד לכולם, ללבוש לבן, להימנע משווקים"],
        correctAnswer: 1,
        explanation: "Three essential customs: remove shoes indoors, dress modestly at temples (cover shoulders and knees), and show respect for the Thai monarchy.",
        explanationHebrew: "שלושה מנהגים חיוניים: להוריד נעליים בפנים, להתלבש בצניעות במקדשים (כיסוי כתפיים וברכיים), ולהראות כבוד למלוכה התאילנדית."
      },
      {
        id: 93,
        question: "What does 'เหมาะสมไหม' (maw-som mai) mean?",
        questionHebrew: "מה המשמעות של 'เหมาะสมไหม' (מאוว-สום มาย)?",
        options: ["Is this delicious? / זה טעים?", "Is this expensive? / זה יקר?", "Is this appropriate? / זה מתאים?", "Is this far? / זה רחוק?"],
        correctAnswer: 2,
        explanation: "'เหมาะสมไหม' (maw-som mai) means 'Is this appropriate?' Use when unsure about clothing, behavior, or actions. Better to ask than offend.",
        explanationHebrew: "'เหมาะสมไหม' (מאוว-สום מาย) פירושו 'זה מתאים?' השתמשו כשלא בטוחים לגבי לבוש, התנהגות, או פעולות. עדיף לשאול מאשר לפגוע."
      },
      {
        id: 94,
        question: "How do you say 'Thank you for teaching me' in Thai?",
        questionHebrew: "איך אומרים 'תודה שלימדת אותי' בתאילנדית?",
        options: ["ถ่ายรูปได้ไหม (taai roop dai mai)", "เคารพวัฒนธรรมไทย (kao-rop wat-ta-na-tam thai)", "เหมาะสมไหม (maw-som mai)", "ขอบคุณที่สอน (khop-khun tee son)"],
        correctAnswer: 3,
        explanation: "'ขอบคุณที่สอน' (khop-khun tee son) means 'Thank you for teaching me'. Gratitude goes far in Thailand - Thais love helping tourists learn!",
        explanationHebrew: "'ขอบคุณที่สอน' (ขอบคุณ ที สอน) פירושו 'תודה שלימדת אותי'. הכרת תודה עוברת דרך ארוכה בתאילנד - תאילנדים אוהבים לעזור לתיירים ללמוד!"
      }
    ]
  }
];
