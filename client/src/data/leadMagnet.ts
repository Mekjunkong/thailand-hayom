export type PhraseCategory = "arrival" | "transport" | "food" | "shopping" | "hotel" | "emergency" | "polite";

export interface LeadMagnetPhrase {
  id: number;
  category: PhraseCategory;
  thai: string;
  romanization: string;
  he: string;
  en: string;
  whenToUse: { he: string; en: string };
}

export const phraseCategoryLabels: Record<PhraseCategory, { he: string; en: string }> = {
  arrival: { he: "נחיתה ושדה תעופה", en: "Arrival & airport" },
  transport: { he: "תחבורה", en: "Transport" },
  food: { he: "אוכל ומסעדות", en: "Food & restaurants" },
  shopping: { he: "קניות ומחירים", en: "Shopping & prices" },
  hotel: { he: "מלון וצ'ק אין", en: "Hotel & check-in" },
  emergency: { he: "בריאות וחירום", en: "Health & emergency" },
  polite: { he: "נימוס ושיחה קצרה", en: "Polite basics" },
};

const rawPhrases: Array<[PhraseCategory, string, string, string, string, string, string]> = [
  ["polite", "สวัสดีครับ/ค่ะ", "sà-wàt-dee kráp/kâ", "שלום", "Hello", "פתיחת כל שיחה", "Start any interaction"],
  ["polite", "ขอบคุณครับ/ค่ะ", "khòp-khun kráp/kâ", "תודה", "Thank you", "אחרי עזרה או שירות", "After help or service"],
  ["polite", "ขอโทษครับ/ค่ะ", "khǎw-thôot kráp/kâ", "סליחה", "Sorry / excuse me", "לפני שאלה או כשנתקלים במישהו", "Before a question or when you bump into someone"],
  ["polite", "ไม่เป็นไร", "mâi bpen rai", "לא נורא / אין בעיה", "No problem", "תגובה רגועה ומנומסת", "A relaxed polite response"],
  ["polite", "ใช่", "châi", "כן", "Yes", "אישור קצר", "Short confirmation"],
  ["polite", "ไม่ใช่", "mâi châi", "לא", "No", "תיקון או סירוב עדין", "Correction or gentle refusal"],
  ["polite", "พูดภาษาอังกฤษได้ไหม", "phûut phaa-sǎa ang-grìt dâai măi", "אפשר לדבר אנגלית?", "Can you speak English?", "כשנתקעים עם תאית", "When Thai gets hard"],
  ["polite", "ไม่เข้าใจ", "mâi khâo-jai", "אני לא מבין/ה", "I do not understand", "לבקש האטה או הסבר", "Ask for a slower explanation"],
  ["arrival", "ห้องน้ำอยู่ที่ไหน", "hâwng náam yùu thîi nǎi", "איפה השירותים?", "Where is the bathroom?", "שדה תעופה, קניון, מסעדה", "Airport, mall, restaurant"],
  ["arrival", "ทางออกอยู่ที่ไหน", "thaang-àwk yùu thîi nǎi", "איפה היציאה?", "Where is the exit?", "בשדה תעופה או תחנה", "Airport or station"],
  ["arrival", "รับกระเป๋าที่ไหน", "ráp grà-bpǎo thîi nǎi", "איפה אוספים מזוודות?", "Where is baggage claim?", "אחרי נחיתה", "After landing"],
  ["arrival", "ซิมการ์ดราคาเท่าไหร่", "sim gâat raa-khaa thâo-rài", "כמה עולה סים?", "How much is a SIM card?", "בדוכן סים בשדה", "At the airport SIM counter"],
  ["arrival", "มีไวไฟไหม", "mii wai-fai măi", "יש Wi-Fi?", "Is there Wi-Fi?", "שדה, מלון, בית קפה", "Airport, hotel, cafe"],
  ["arrival", "แลกเงินได้ที่ไหน", "lâek ngoen dâai thîi nǎi", "איפה אפשר להחליף כסף?", "Where can I exchange money?", "כשצריך באטים", "When you need baht"],
  ["transport", "ไปสนามบินเท่าไหร่", "bpai sà-nǎam-bin thâo-rài", "כמה לשדה התעופה?", "How much to the airport?", "מונית או טוק-טוק", "Taxi or tuk-tuk"],
  ["transport", "ไปโรงแรมนี้", "bpai roong-raem níi", "למלון הזה", "To this hotel", "להראות כתובת לנהג", "Show the driver an address"],
  ["transport", "เปิดมิเตอร์ได้ไหม", "bpèrt mii-dtə̂ə dâai măi", "אפשר להפעיל מונה?", "Can you use the meter?", "מונית בעיר", "City taxi"],
  ["transport", "จอดตรงนี้", "jàwt dtrong níi", "תעצור כאן", "Stop here", "כשמגיעים ליעד", "When you arrive"],
  ["transport", "ไปสถานีรถไฟฟ้า", "bpai sà-thǎa-nii rót-fai-fáa", "לתחנת רכבת עילית", "To the skytrain station", "בבנגקוק", "In Bangkok"],
  ["transport", "ไกลไหม", "glai măi", "זה רחוק?", "Is it far?", "לפני הליכה או נסיעה", "Before walking or riding"],
  ["transport", "ช่วยเรียกแท็กซี่ได้ไหม", "chûai rîak táek-sîi dâai măi", "אפשר להזמין לי מונית?", "Can you call a taxi for me?", "במלון או מסעדה", "At a hotel or restaurant"],
  ["food", "ไม่เผ็ด", "mâi phèt", "לא חריף", "Not spicy", "בהזמנת אוכל", "When ordering food"],
  ["food", "เผ็ดนิดหน่อย", "phèt nít-nòi", "קצת חריף", "A little spicy", "אם רוצים עדין", "If you want mild spice"],
  ["food", "ไม่ใส่หมู", "mâi sài mǔu", "בלי חזיר", "No pork", "כשרות או העדפה אישית", "Kosher/personal preference"],
  ["food", "ไม่ใส่กุ้ง", "mâi sài gûng", "בלי שרימפס", "No shrimp", "אלרגיה או כשרות", "Allergy or kosher preference"],
  ["food", "มีไก่ไหม", "mii gài măi", "יש עוף?", "Do you have chicken?", "בחירת מנה פשוטה", "Picking a simple dish"],
  ["food", "ขอน้ำเปล่า", "khǎw náam bplào", "אפשר מים?", "Can I have water?", "במסעדה", "At a restaurant"],
  ["food", "อร่อยมาก", "à-ròi mâak", "טעים מאוד", "Very delicious", "מחמאה לצוות", "Compliment the staff"],
  ["food", "เก็บเงินครับ/ค่ะ", "gèp ngoen kráp/kâ", "חשבון בבקשה", "Bill please", "בסוף הארוחה", "At the end of the meal"],
  ["food", "เอากลับบ้าน", "ao glàp bâan", "לקחת הביתה", "Take away", "טייק אווי", "Takeout"],
  ["shopping", "ราคาเท่าไหร่", "raa-khaa thâo-rài", "כמה זה עולה?", "How much is it?", "שוק או חנות", "Market or shop"],
  ["shopping", "ลดได้ไหม", "lót dâai măi", "אפשר הנחה?", "Can you discount?", "מיקוח עדין בשוק", "Gentle market bargaining"],
  ["shopping", "แพงไป", "phaeng bpai", "זה יקר מדי", "Too expensive", "במיקוח מנומס", "Polite bargaining"],
  ["shopping", "เอาอันนี้", "ao an níi", "אני לוקח/ת את זה", "I will take this one", "בחירת מוצר", "Choosing an item"],
  ["shopping", "มีไซซ์ใหญ่ไหม", "mii sái yài măi", "יש מידה גדולה יותר?", "Do you have a bigger size?", "קניית בגדים", "Buying clothes"],
  ["shopping", "จ่ายด้วยบัตรได้ไหม", "jàai dûai bàt dâai măi", "אפשר לשלם בכרטיס?", "Can I pay by card?", "חנות או מסעדה", "Shop or restaurant"],
  ["hotel", "เช็กอินได้ไหม", "chék-in dâai măi", "אפשר לעשות צ'ק אין?", "Can I check in?", "הגעה למלון", "Arriving at a hotel"],
  ["hotel", "มีห้องว่างไหม", "mii hâwng wâang măi", "יש חדר פנוי?", "Do you have a room available?", "הזמנה במקום", "Walk-in booking"],
  ["hotel", "ขอกุญแจห้อง", "khǎw gun-jae hâwng", "אפשר מפתח לחדר?", "Room key please", "בקבלה", "At reception"],
  ["hotel", "ห้องไม่สะอาด", "hâwng mâi sà-àat", "החדר לא נקי", "The room is not clean", "בעיה במלון", "Hotel issue"],
  ["hotel", "แอร์เสีย", "ae sǐa", "המזגן לא עובד", "The air conditioner is broken", "תקלה נפוצה", "Common room problem"],
  ["hotel", "ขอผ้าเช็ดตัวเพิ่ม", "khǎw phâa chét dtua phêrm", "אפשר עוד מגבת?", "Can I have another towel?", "בקשה מצוות המלון", "Ask hotel staff"],
  ["emergency", "ช่วยด้วย", "chûai dûai", "עזרה!", "Help!", "מצב דחוף", "Urgent situation"],
  ["emergency", "เรียกรถพยาบาล", "rîak rót phá-yaa-baan", "תקראו לאמבולנס", "Call an ambulance", "חירום רפואי", "Medical emergency"],
  ["emergency", "ไปโรงพยาบาล", "bpai roong-phá-yaa-baan", "לבית חולים", "To the hospital", "מונית בחירום", "Taxi in emergency"],
  ["emergency", "เจ็บตรงนี้", "jèp dtrong níi", "כואב לי כאן", "It hurts here", "להצביע לרופא", "Point for a doctor"],
  ["emergency", "ฉันแพ้ยา", "chăn pháe yaa", "אני אלרגי/ת לתרופה", "I am allergic to medicine", "מרפאה או בית חולים", "Clinic or hospital"],
  ["emergency", "โทรหาตำรวจ", "thoo hǎa dtam-rùat", "תתקשרו למשטרה", "Call the police", "גניבה או סכנה", "Theft or danger"],
  ["emergency", "พาสปอร์ตหาย", "pháat-bpàwt hǎai", "הדרכון אבד", "My passport is missing", "משטרה או שגרירות", "Police or embassy"],
  ["emergency", "ช่วยเขียนให้หน่อย", "chûai khǐan hâi nòi", "אפשר לכתוב לי את זה?", "Can you write it for me?", "When you need an address/instruction", "When you need an address/instruction"],
];

export const leadMagnetPhrases: LeadMagnetPhrase[] = rawPhrases.map(
  ([category, thai, romanization, he, en, whenHe, whenEn], index) => ({
    id: index + 1,
    category,
    thai,
    romanization,
    he,
    en,
    whenToUse: { he: whenHe, en: whenEn },
  }),
);

export function buildPhrasePackText(language: "he" | "en") {
  const title = language === "he"
    ? "50 ביטויים בתאית למטיילים ישראלים — Thailand Hayom"
    : "50 Thai phrases for Israeli travelers — Thailand Hayom";

  const lines = leadMagnetPhrases.map((phrase) => {
    const meaning = language === "he" ? phrase.he : phrase.en;
    const when = language === "he" ? phrase.whenToUse.he : phrase.whenToUse.en;
    return `${phrase.id}. ${phrase.thai} — ${phrase.romanization}\n${meaning}\n${when}`;
  });

  return [title, "", ...lines].join("\n\n");
}
