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
  },
  {
    id: 11,
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
        id: 52,
        english: "Too expensive",
        hebrew: "יקר מדי",
        thai: "แพงไป",
        phonetic: "paeng pai",
        scenario: "Use when bargaining at markets. Follow with your counter-offer or walk away slowly.",
        culturalTip: "Bargaining is expected at markets but not in malls or 7-Eleven. Start at 50-60% of asking price."
      },
      {
        id: 53,
        english: "Can you give me a discount?",
        hebrew: "אתה יכול לתת לי הנחה?",
        thai: "ลดได้ไหม",
        phonetic: "lot dai mai",
        scenario: "Polite way to ask for a better price. Works best when buying multiple items.",
        culturalTip: "Smile and be friendly. Thais respond better to charm than aggressive haggling."
      },
      {
        id: 54,
        english: "I'll take it",
        hebrew: "אני אקח את זה",
        thai: "เอาค่ะ/ครับ",
        phonetic: "ao kha/khrap",
        scenario: "When you've agreed on a price and want to buy.",
        culturalTip: "Once you say this, you're committed. Don't continue bargaining after."
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
    ]
  },
  {
    id: 15,
    title: "Numbers & Counting",
    titleHebrew: "מספרים וספירה",
    icon: "🔢",
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
    ]
  }
];
