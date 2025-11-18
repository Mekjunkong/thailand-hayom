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
    ]
  },
  {
    id: 4,
    title: "Shopping & Bargaining",
    titleHebrew: "קניות ומיקוח",
    icon: "🛍️",
    phrases: [
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
    ]
  }
];
