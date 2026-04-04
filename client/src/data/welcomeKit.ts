export interface WelcomeKitModule {
  id: number;
  title: string;
  titleHebrew: string;
  icon: string;
  description: string;
  descriptionHebrew: string;
  content: string;
  contentHebrew: string;
}

export const welcomeKitModules: WelcomeKitModule[] = [
  // ─────────────────────────────────────────────
  // 1. ויזה ועניינים משפטיים
  // ─────────────────────────────────────────────
  {
    id: 1,
    title: "Visa & Legal",
    titleHebrew: "ויזה ועניינים משפטיים",
    icon: "📋",
    description: "Visa types, extensions, and Israeli embassy contacts",
    descriptionHebrew: "סוגי ויזה, הארכות ואנשי קשר של השגרירות הישראלית",
    content: `THAILAND VISA GUIDE FOR ISRAELIS (2025)

VISA EXEMPT ENTRY
- Israelis get 30 days visa-free on arrival
- Can be extended ONCE for 30 more days at any immigration office
- Cost: 1,900 THB for extension
- Total stay: up to 60 days visa-free

TOURIST VISA (TR)
- Apply at Thai embassy in Israel before trip
- Single entry: 60 days + 30 day extension = 90 days
- Double entry: Two 60-day periods
- Cost: ~$40 USD

VISA ON ARRIVAL (VOA)
- Available at Suvarnabhumi, Phuket, and other major airports
- Valid 15 days, extendable once for 7 days
- Cost: 2,000 THB
- Usually for emergencies (missed pre-applying)
- LONG queues — avoid if possible

HOW TO EXTEND IN CHIANG MAI
Address: Chiang Mai Immigration Office
  Promenada Mall, 2nd Floor
  Nimmanhaemin Rd. (near Central Airport Plaza)
Hours: Monday–Friday 8:30 AM – 4:30 PM (closed 12–1 PM)
Documents needed:
  ✓ Original passport
  ✓ TM.7 form (available at office)
  ✓ 1,900 THB cash
  ✓ 2 passport photos (4x6 cm)
  ✓ Copy of arrival stamp page
Tip: Arrive by 7:30 AM to get a queue number. 
     Go on Tuesday or Wednesday (less crowded)

BORDER RUNS
- Drive to border (e.g., Mae Sai) and re-enter
- Gets you 30 more days
- Cost: ~400 THB for transport
- Limit: 2 border runs per year

OVERSTAYING FINES
- 500 THB per day overstay
- Detention and deportation for long overstays
- NEVER overstay — it causes future visa problems

ISRAELI EMBASSY IN BANGKOK
Address: Ocean Tower II, 25th Floor, 75/6-7 Sukhumvit Soi 19
Bangkok 10110
Phone: +66 2 204 9200
Emergency (after hours): +66 2 204 9200
Email: info@bangkok.mfa.gov.il
Hours: Sun–Thu 8:30 AM – 12:30 PM

EMERGENCY HOTLINE FOR ISRAELIS ABROAD
Phone (from Thailand): 00-972-3-9190141
Available 24/7 for Israeli citizens in distress`,

    contentHebrew: `מדריך ויזה לתאילנד לישראלים (2025)

כניסה ללא ויזה
- ישראלים מקבלים 30 יום ללא ויזה בכניסה
- ניתן להאריך פעם אחת ב-30 ימים נוספים בכל משרד הגירה
- עלות: 1,900 בהט להארכה
- שהייה כוללת: עד 60 יום ללא ויזה

ויזת תיירים (TR)
- הגישו בשגרירות תאילנד בישראל לפני הטיול
- כניסה בודדת: 60 ימים + הארכה 30 ימים = 90 ימים
- כניסה כפולה: שתי תקופות של 60 ימים
- עלות: ~40 דולר

ויזה עם הגעה (VOA)
- זמינה בנמלי תעופה ראשיים
- תקפה 15 ימים, ניתנת להארכה פעם אחת ב-7 ימים
- עלות: 2,000 בהט
- בדרך כלל לחירום (פספסתם להגיש מראש)
- תורים ארוכים מאוד — הימנעו אם אפשר

הארכת ויזה בצ'יאנג מאי
כתובת: משרד ההגירה צ'יאנג מאי
  קניון פרומנדה, קומה 2
  כביש נימנהמין (ליד Central Airport Plaza)
שעות: ראשון–שישי 8:30 – 16:30 (סגור 12–13)
מסמכים נדרשים:
  ✓ דרכון מקורי
  ✓ טופס TM.7 (זמין במשרד)
  ✓ 1,900 בהט מזומן
  ✓ 2 תמונות פספורט (4x6 ס"מ)
  ✓ צילום של דף חותמת הכניסה
טיפ: הגיעו ב-7:30 לקבל מספר תור.
     לכו ביום שלישי או רביעי (פחות עמוס)

ביקורי גבול
- נסעו לגבול (כגון מאה סאי) וכנסו מחדש
- מקבלים 30 ימים נוספים
- עלות: ~400 בהט לתחבורה
- מגבלה: 2 ביקורי גבול בשנה

קנסות על חריגה משהות
- 500 בהט לכל יום חריגה
- מעצר וגירוש לחריגות ארוכות
- לעולם אל תחרגו — זה גורם לבעיות ויזה עתידיות

שגרירות ישראל בבנגקוק
כתובת: Ocean Tower II, קומה 25, 75/6-7 Sukhumvit Soi 19
בנגקוק 10110
טלפון: 02-204-9200+ (66)
חירום (מחוץ לשעות): 02-204-9200+ (66)
אימייל: info@bangkok.mfa.gov.il
שעות: א'–ה' 8:30 – 12:30

קו חירום לישראלים בחו"ל
טלפון (מתאילנד): 00-972-3-9190141
זמין 24/7 לאזרחים ישראלים במצוקה`,
  },

  // ─────────────────────────────────────────────
  // 2. כשרות בתאילנד
  // ─────────────────────────────────────────────
  {
    id: 2,
    title: "Kosher in Thailand",
    titleHebrew: "כשרות בתאילנד",
    icon: "✡️",
    description: "Kosher restaurants, Chabad houses, and eating safely",
    descriptionHebrew: "מסעדות כשרות, בתי חב\"ד וטיפים לאכילה בטוחה",
    content: `KOSHER IN THAILAND — COMPLETE GUIDE

CHIANG MAI
Chabad of Chiang Mai
  Address: 4/1 Nimman Soi 6, Nimmanhaemin Road
  Phone: +66 81-472-1003 (WhatsApp)
  Hours: Open daily, call ahead for Shabbat times
  Services: Shabbat meals, mikveh, Jewish supplies, help for travelers
  Note: Hot kosher meals available — MUST reserve by Thursday

Kosher Restaurants / Options in Chiang Mai:
• Chabad house restaurant (best option, reserve ahead)
• A-Roy One Baht Vegetarian Restaurant — budget Thai veg (near Old City)
• Several vegetarian/vegan restaurants near Nimman that are naturally kosher-friendly

BANGKOK
Chabad of Thailand — Bangkok
  Address: 96 Ram Buttri Rd (Khao San area), Bangkok
  Phone: +66 2 282-1770
  Also: 96/1 Sukhumvit Soi 22, Bangkok
  Phone: +66 2 663-0244
  Hours: Daily services, Shabbat meals every Friday

Kosher Restaurants in Bangkok:
• Beit Chabad (Sukhumvit) — full kosher meals
• Darna — Moroccan-Israeli fusion (Sukhumvit 33)
• Neve Yaakov — Israeli kosher (Sukhumvit area)
• Jerusalem Restaurant (Khao San Road) — budget kosher

PHUKET
Chabad of Phuket
  Address: 68/2 Rat-U-Thit 200 Pee Road, Patong Beach
  Phone: +66 76-344-144
  Services: Shabbat meals, kosher food packages

Patong Beach Kosher Options:
• Chabad house meals (reserve ahead)
• Several certified kosher restaurants near Bangla Road

KOH SAMUI
Chabad of Koh Samui
  Address: Chaweng Beach area
  Phone: +66 86-280-5077
  Services: Friday night dinner, kosher certificates

TIPS FOR EATING SAFELY
What's naturally safe (no pork/shellfish risk):
• Fresh fruit — always safe
• Plain rice (khao plao) — safe
• Vegetarian pad thai (no fish sauce if asked)
• Vegetarian green/red curry with coconut milk

How to ask for no pork in Thai:
  "Mai sai mu" (ไม่ใส่หมู) = No pork please
  "Jay" (เจ) = Buddhist vegan (no meat, fish, dairy)
  "Mang sa wirat" (มังสวิรัต) = Vegetarian (may include eggs/dairy)

WHAT TO AVOID
• "Nam pla" (fish sauce) — in almost all Thai dishes
• "Kapi" (shrimp paste) — in many curries and salads
• Larb — raw meat salad
• Street meat without knowing the source
• Unlabeled sauces

FINDING KOSHER PRODUCTS
• 7-Eleven: Some products have kosher certification
• Rimping Supermarket (Chiang Mai): Best selection of imported products
• Tops Market: Imported goods, check labels
• Bangkok airport duty-free: Israeli products available`,

    contentHebrew: `כשרות בתאילנד — מדריך מלא

צ'יאנג מאי
חב"ד צ'יאנג מאי
  כתובת: 4/1 Nimman Soi 6, Nimmanhaemin Road
  טלפון: 66-81-472-1003+ (WhatsApp)
  שעות: פתוח מדי יום, התקשרו מראש לשעות שבת
  שירותים: ארוחות שבת, מקווה, ציוד יהודי, עזרה למטיילים
  הערה: ארוחות כשרות חמות — חייבים להזמין עד יום חמישי

מסעדות/אפשרויות כשרות בצ'יאנג מאי:
• מסעדת בית חב"ד (האפשרות הטובה ביותר, הזמינו מראש)
• A-Roy One Baht Vegetarian — אוכל תאי צמחוני בתקציב (ליד העיר העתיקה)
• כמה מסעדות טבעוניות/צמחוניות ליד נימן שידידותיות לכשרות

בנגקוק
חב"ד תאילנד — בנגקוק
  כתובת: 96 Ram Buttri Rd (אזור Khao San), בנגקוק
  טלפון: 66-2-282-1770+
  גם: 96/1 Sukhumvit Soi 22, בנגקוק
  טלפון: 66-2-663-0244+
  שעות: תפילות יומיות, ארוחות שבת כל יום שישי

מסעדות כשרות בבנגקוק:
• בית חב"ד (Sukhumvit) — ארוחות כשרות מלאות
• Darna — פיוז'ן מרוקאי-ישראלי (Sukhumvit 33)
• Neve Yaakov — כשר ישראלי (אזור Sukhumvit)
• Jerusalem Restaurant (Khao San Road) — כשר בתקציב

פוקט
חב"ד פוקט
  כתובת: 68/2 Rat-U-Thit 200 Pee Road, Patong Beach
  טלפון: 66-76-344-144+
  שירותים: ארוחות שבת, חבילות מזון כשר

אפשרויות כשרות ב-Patong Beach:
• ארוחות בית חב"ד (הזמינו מראש)
• כמה מסעדות כשרות מוסמכות ליד Bangla Road

קוה סמוי
חב"ד קוה סמוי
  כתובת: אזור חוף Chaweng
  טלפון: 66-86-280-5077+
  שירותים: ארוחת ליל שישי, תעודות כשרות

טיפים לאכילה בטוחה
מה בטוח באופן טבעי (ללא סיכון חזיר/פירות ים):
• פירות טריים — תמיד בטוחים
• אורז לבן (khao plao) — בטוח
• פד תאי צמחוני (ללא רוטב דגים אם מבקשים)
• קארי ירוק/אדום צמחוני עם חלב קוקוס

איך לבקש ללא חזיר בתאי:
  "Mai sai mu" (ไม่ใส่หมู) = בלי חזיר בבקשה
  "Jay" (เจ) = טבעוני בודהיסטי (ללא בשר, דגים, חלב)
  "Mang sa wirat" (มังสวิรัต) = צמחוני (עשוי לכלול ביצים/חלב)

מה להימנע ממנו
• "Nam pla" (רוטב דגים) — כמעט בכל מנות תאי
• "Kapi" (ממרח שרימפס) — בהרבה קארי וסלטים
• לארב — סלט בשר נא
• בשר רחוב ללא ידיעת המקור
• רטבים ללא תווית

מציאת מוצרים כשרים
• 7-Eleven: לחלק מהמוצרים יש תעודת כשרות
• Rimping Supermarket (צ'יאנג מאי): מבחר מוצרי יבוא מצוין
• Tops Market: סחורה מיובאת, בדקו תוויות
• חנות פטורי מכס בנמל תעופה בנגקוק: מוצרים ישראלים זמינים`,
  },

  // ─────────────────────────────────────────────
  // 3. תקשורת ואינטרנט
  // ─────────────────────────────────────────────
  {
    id: 3,
    title: "SIM Cards & Internet",
    titleHebrew: "תקשורת ואינטרנט",
    icon: "📱",
    description: "Best SIM cards, calling Israel, WhatsApp & connectivity tips",
    descriptionHebrew: "כרטיסי SIM הטובים ביותר, שיחות לישראל וטיפי קישוריות",
    content: `SIM CARDS FOR ISRAELIS IN THAILAND

TOP 3 PROVIDERS (2025)

1. AIS — BEST OVERALL COVERAGE
   Tourist SIM prices:
   • 7 days unlimited: 299 THB
   • 15 days unlimited: 399 THB
   • 30 days unlimited: 599 THB
   Why choose AIS:
   ✓ Best coverage in islands, mountains, rural areas
   ✓ Strong signal on Doi Inthanon, islands
   ✓ 4G/5G speeds in cities
   Where to buy: AIS shops, airport counters, 7-Eleven

2. DTAC (now merged with True) — BEST VALUE
   Tourist SIM prices:
   • 8 days: 249 THB
   • 15 days: 349 THB
   • 30 days: 499 THB
   Why choose DTAC:
   ✓ Best price
   ✓ Good in cities and popular tourist areas
   ✓ 5G in Bangkok
   Where to buy: True/DTAC shops, 7-Eleven, airport

3. TRUE MOVE — BEST FOR CITIES
   Tourist SIM prices:
   • 7 days: 299 THB
   • 15 days: 399 THB
   • 30 days: 599 THB
   Why choose True:
   ✓ Fastest speeds in Bangkok
   ✓ Wide 5G coverage
   ✓ Good in shopping malls
   Where to buy: True shops, airport

WHERE TO BUY AT CHIANG MAI AIRPORT
• Immediately after customs — AIS, DTAC, True counters
• Open 6 AM – midnight
• Staff help set up the SIM
• Have passport ready (required for registration)
• Average purchase time: 10–15 minutes

CALLING ISRAEL FROM THAILAND
• Dial: 00 + 972 + number (drop the leading 0)
• Example: 052-1234567 → 00-972-52-1234567
• Cheapest: WhatsApp/FaceTime/Telegram (uses data, free)
• Tourist SIMs include limited international minutes
• International call cost: ~6 THB/minute

APPS — NO VPN NEEDED
✓ WhatsApp — works perfectly
✓ Telegram — works perfectly
✓ Facebook/Instagram — works perfectly
✓ Google — works perfectly
✓ YouTube — works perfectly
✓ TikTok — works perfectly
✗ Only Chinese apps may need VPN (WeChat, Weibo)

Note: Thailand does NOT block Israeli apps or services.
No VPN required for normal use.

WiFi IN THAILAND
• Hotels: Usually good WiFi included
• 7-Eleven: Free WiFi (requires Thai phone for OTP)
• Coffee shops: Free WiFi with purchase
• Airport: Free unlimited WiFi
• Co-working spaces in Chiang Mai: 100–200 THB/day

ROAMING (KEEP YOUR ISRAELI NUMBER)
• Partner (הפרטנר): Check their website for Thailand packages
• HOT Mobile: Thailand package available
• Cellcom: Roaming available, check pricing
• Pelephone: International packages available
Tip: Israeli roaming is expensive (€5–15/day) — buying 
     local SIM is almost always cheaper!`,

    contentHebrew: `כרטיסי SIM לישראלים בתאילנד

3 הספקים המובילים (2025)

1. AIS — כיסוי הכולל הטוב ביותר
   מחירי SIM תיירים:
   • 7 ימים ללא הגבלה: 299 בהט
   • 15 ימים ללא הגבלה: 399 בהט
   • 30 ימים ללא הגבלה: 599 בהט
   למה לבחור AIS:
   ✓ כיסוי הטוב ביותר באיים, הרים, אזורים כפריים
   ✓ אות חזק ב-Doi Inthanon, איים
   ✓ מהירויות 4G/5G בערים
   היכן לקנות: חנויות AIS, דלפקי שדה תעופה, 7-Eleven

2. DTAC (מוזג עם True) — הערך הטוב ביותר
   מחירי SIM תיירים:
   • 8 ימים: 249 בהט
   • 15 ימים: 349 בהט
   • 30 ימים: 499 בהט
   למה לבחור DTAC:
   ✓ המחיר הטוב ביותר
   ✓ טוב בערים ואזורי תיירות פופולריים
   ✓ 5G בבנגקוק
   היכן לקנות: חנויות True/DTAC, 7-Eleven, שדה תעופה

3. TRUE MOVE — הטוב ביותר לערים
   מחירי SIM תיירים:
   • 7 ימים: 299 בהט
   • 15 ימים: 399 בהט
   • 30 ימים: 599 בהט
   למה לבחור True:
   ✓ המהירויות הגבוהות ביותר בבנגקוק
   ✓ כיסוי 5G רחב
   ✓ טוב בקניונים
   היכן לקנות: חנויות True, שדה תעופה

היכן לקנות בנמל התעופה צ'יאנג מאי
• מיד אחרי המכס — דלפקי AIS, DTAC, True
• פתוח 6:00 – 24:00
• הצוות עוזר בהתקנת ה-SIM
• יש להביא דרכון (נדרש לרישום)
• זמן רכישה ממוצע: 10–15 דקות

שיחות לישראל מתאילנד
• חייגו: 00 + 972 + מספר (הסירו את ה-0 הראשון)
• דוגמה: 052-1234567 → 00-972-52-1234567
• הכי זול: WhatsApp/FaceTime/Telegram (משתמש בנתונים, חינם)
• כרטיסי SIM תיירים כוללים דקות בינלאומיות מוגבלות
• עלות שיחה בינלאומית: ~6 בהט/דקה

אפליקציות — ללא צורך ב-VPN
✓ WhatsApp — עובד מצוין
✓ Telegram — עובד מצוין
✓ Facebook/Instagram — עובד מצוין
✓ Google — עובד מצוין
✓ YouTube — עובד מצוין
✓ TikTok — עובד מצוין
✗ רק אפליקציות סיניות עשויות לדרוש VPN (WeChat, Weibo)

הערה: תאילנד לא חוסמת אפליקציות או שירותים ישראליים.
אין צורך ב-VPN לשימוש רגיל.

WiFi בתאילנד
• מלונות: WiFi טוב כלול בדרך כלל
• 7-Eleven: WiFi חינם (דורש טלפון תאי ל-OTP)
• בתי קפה: WiFi חינם עם רכישה
• שדה תעופה: WiFi חינם ללא הגבלה
• מרחבי עבודה משותפים בצ'יאנג מאי: 100–200 בהט/יום

רואמינג (שמרו את המספר הישראלי שלכם)
• פרטנר: בדקו את האתר שלהם לחבילות תאילנד
• HOT Mobile: חבילת תאילנד זמינה
• Cellcom: רואמינג זמין, בדקו מחירים
• Pelephone: חבילות בינלאומיות זמינות
טיפ: רואמינג ישראלי יקר (5–15 יורו/יום) — קניית 
     SIM מקומי כמעט תמיד יותר זול!`,
  },

  // ─────────────────────────────────────────────
  // 4. בנקאות וכסף
  // ─────────────────────────────────────────────
  {
    id: 4,
    title: "Banking & Money",
    titleHebrew: "בנקאות וכסף",
    icon: "💰",
    description: "ATMs, exchange rates, avoiding fees, and money tips",
    descriptionHebrew: "כספומטים, שערי חליפין, הימנעות מעמלות וטיפי כסף",
    content: `MONEY IN THAILAND — GUIDE FOR ISRAELIS

CURRENT EXCHANGE RATE (2025 approx.)
1 ILS (Israeli Shekel) ≈ 9–10 THB (Thai Baht)
1 USD ≈ 33–35 THB
Check live rate: google.com → "ILS to THB"

BEST PLACE TO EXCHANGE MONEY
IN CHIANG MAI:
1. SuperRich branches (best rate, near Nimman / Central Festival)
2. Gold exchange shops near Night Bazaar
3. Banks (slightly worse rates): Bangkok Bank, Kasikorn
4. AVOID: Airport counters (worst rates, 5–10% below market)

IN BANGKOK:
1. SuperRich (orange logo) — Ratchaprasong area
2. Vasu Exchange — near BTS stations
3. Airport: AVOID (15–20% worse)

HOW MUCH TO BRING
Budget traveler: 500–800 THB/day (~55–90 ILS)
Mid-range: 1,200–2,000 THB/day (~130–220 ILS)
Comfortable: 2,500–4,000 THB/day (~280–440 ILS)
Does NOT include: flights, accommodation, tours

ATMs IN THAILAND
• Most ATMs charge 220 THB foreign card fee
• EXCEPTION: Some Krungsri Bank ATMs charge 180 THB
• Strategy: Withdraw maximum per transaction (usually 20,000–30,000 THB)
• Best ATMs for Israeli cards: Bangkok Bank, Kasikorn, SCB
• Alert your bank before traveling (or card may be blocked)
• Israeli banks: Hapoalim, Leumi, Discount, Mizrahi work fine

ATM TIPS
✓ Tell your bank you're traveling to Thailand (important!)
✓ Use ATMs inside banks or malls (safer)
✓ Never accept ATM currency conversion (choose THB)
✓ Say NO to "dynamic currency conversion" — always pay in THB

WISE / REVOLUT (RECOMMENDED!)
• Best option for Israelis traveling
• Near-zero fees for currency exchange
• Use Wise or Revolut card at Thai ATMs
• Save 200–300 ILS on a 2-week trip vs. regular bank cards

WESTERN UNION LOCATIONS IN CHIANG MAI
• Central Airport Plaza (ground floor)
• Pantip IT mall
• 7-Eleven near Night Bazaar
• Hours: Usually 10 AM – 8 PM

CASHLESS PAYMENTS
• PromptPay QR codes — locals use this, NOT useful for tourists
• Credit cards accepted: Central Festival, Nimman restaurants, hotels
• Cash still king for: street food, markets, tuk-tuks, temples
• Tip: Always carry 500–1,000 THB cash as backup

COMMON PRICE REFERENCE
Street food meal: 40–80 THB (4–9 ILS)
Restaurant meal: 150–300 THB (17–33 ILS)
Beer (7-Eleven): 45–55 THB (5–6 ILS)
Grab ride (5km): 60–120 THB (7–13 ILS)
Cheap guesthouse/night: 300–600 THB (33–65 ILS)
Nice hotel/night: 800–2,000 THB (88–220 ILS)`,

    contentHebrew: `כסף בתאילנד — מדריך לישראלים

שער החליפין הנוכחי (2025 בערך)
1 ש"ח (שקל ישראלי) ≈ 9–10 בהט (בהט תאילנדי)
1 דולר ≈ 33–35 בהט
בדקו שער חי: google.com → "ILS to THB"

המקום הטוב ביותר להחלפת כסף
בצ'יאנג מאי:
1. סניפי SuperRich (שער הטוב ביותר, ליד נימן / Central Festival)
2. חנויות זהב ליד Night Bazaar
3. בנקים (שערים גרועים מעט): Bangkok Bank, Kasikorn
4. הימנעו מ: דלפקי שדה תעופה (שערים גרועים ביותר, 5–10% מתחת לשוק)

בבנגקוק:
1. SuperRich (לוגו כתום) — אזור Ratchaprasong
2. Vasu Exchange — ליד תחנות BTS
3. שדה תעופה: הימנעו (15–20% גרוע יותר)

כמה להביא
מטייל תקציב: 500–800 בהט/יום (~55–90 ש"ח)
מרכז: 1,200–2,000 בהט/יום (~130–220 ש"ח)
נוח: 2,500–4,000 בהט/יום (~280–440 ש"ח)
לא כולל: טיסות, לינה, טיולים

כספומטים בתאילנד
• רוב הכספומטים גובים עמלה של 220 בהט לכרטיס זר
• יוצא מן הכלל: חלק מכספומטי Krungsri גובים 180 בהט
• אסטרטגיה: משכו את המקסימום לכל עסקה (בדרך כלל 20,000–30,000 בהט)
• הכספומטים הטובים ביותר לכרטיסים ישראליים: Bangkok Bank, Kasikorn, SCB
• הודיעו לבנק שלכם לפני הנסיעה (אחרת הכרטיס עשוי להיות חסום)
• בנקים ישראליים: הפועלים, לאומי, דיסקונט, מזרחי עובדים בסדר

טיפים לכספומט
✓ ספרו לבנק שלכם שאתם נוסעים לתאילנד (חשוב!)
✓ השתמשו בכספומטים בתוך בנקים או קניונים (בטוח יותר)
✓ לעולם אל תקבלו המרת מטבע בכספומט (בחרו בבהט)
✓ אמרו לא ל"המרת מטבע דינמית" — תמיד שלמו בבהט

Wise / Revolut (מומלץ!)
• האפשרות הטובה ביותר לישראלים הנוסעים
• עמלות כמעט אפסיות להמרת מטבע
• השתמשו בכרטיס Wise או Revolut בכספומטים תאים
• חסכו 200–300 ש"ח בטיול של שבועיים לעומת כרטיסי בנק רגילים

מיקומי Western Union בצ'יאנג מאי
• Central Airport Plaza (קומת הקרקע)
• קניון Pantip IT
• 7-Eleven ליד Night Bazaar
• שעות: בדרך כלל 10:00 – 20:00

תשלומים ללא מזומן
• קודי QR של PromptPay — המקומיים משתמשים בזה, לא שימושי לתיירים
• כרטיסי אשראי מתקבלים: Central Festival, מסעדות נימן, מלונות
• מזומן עדיין מלך בעבור: אוכל רחוב, שווקים, טוק-טוק, מקדשים
• טיפ: תמיד שאו 500–1,000 בהט מזומן כגיבוי

מחירי עיון נפוצים
ארוחת רחוב: 40–80 בהט (4–9 ש"ח)
ארוחת מסעדה: 150–300 בהט (17–33 ש"ח)
בירה (7-Eleven): 45–55 בהט (5–6 ש"ח)
נסיעת Grab (5 ק"מ): 60–120 בהט (7–13 ש"ח)
פנסיון זול/לילה: 300–600 בהט (33–65 ש"ח)
מלון נחמד/לילה: 800–2,000 בהט (88–220 ש"ח)`,
  },

  // ─────────────────────────────────────────────
  // 5. בטיחות ובריאות
  // ─────────────────────────────────────────────
  {
    id: 5,
    title: "Safety & Health",
    titleHebrew: "בטיחות ובריאות",
    icon: "🏥",
    description: "Hospitals, emergency numbers, insurance, and common scams",
    descriptionHebrew: "בתי חולים, מספרי חירום, ביטוח והונאות נפוצות",
    content: `SAFETY & HEALTH IN THAILAND

EMERGENCY NUMBERS
191 — Thai Police (National)
1669 — Ambulance / Emergency Medical
1155 — Tourist Police (English-speaking)
199 — Fire Department
1554 — Highway Police
+66 2 204 9200 — Israeli Embassy Bangkok

HOSPITALS IN CHIANG MAI (English-speaking)
1. Rajavej Chiang Mai Hospital (Best for foreigners)
   Address: 24 Korloi Rd, Chang Klan
   Phone: +66 53 904 111
   24h emergency, international patient ward
   Accepts most travel insurance cards

2. Bangkok Hospital Chiang Mai
   Address: 88 Boonruangrit Rd
   Phone: +66 53 208 500
   International standard, English staff
   Higher prices but excellent care

3. Maharaj Nakorn Chiang Mai (Government Hospital)
   Address: 110 Inthawarorot Rd
   Phone: +66 53 935 000
   Cheapest option, longer waits
   Good Thai doctors, less English

HOSPITALS IN BANGKOK
• Bumrungrad International — +66 2 667 1000 (best in SE Asia)
• Bangkok Hospital — +66 2 310 3000
• Samitivej Hospital — +66 2 711 8000

COMMON HEALTH ISSUES
Mosquito-borne: Dengue fever is real — use DEET repellent
Heat: Drink 2+ liters of water daily
Food poisoning: Common — rehydrate, rest, see doctor if severe
Motorbike accidents: Most common tourist injury — wear helmet!
Sun: Strong sunscreen (SPF 50+), reapply every 2 hours

TRAVEL INSURANCE (MANDATORY!)
Recommended providers for Israelis:
• Harel Insurance — +972-3-7531111 (24h)
• Menorah Insurance — +972-3-9241222
• Clal Insurance — international health plan
• World Nomads — excellent coverage, English service
Minimum coverage: $100,000 medical, evacuation included
Cost: ~$30–60 for 2 weeks

WHAT INSURANCE MUST COVER
✓ Medical treatment
✓ Hospitalization
✓ Medical evacuation to Israel
✓ COVID-19 treatment
✓ Motorbike accidents (must have license!)
✓ Extreme sports if planned (extra)

COMMON SCAMS TO AVOID
1. Gem scam — never buy gems without expert knowledge
2. Tuk-tuk tour scam — 20 THB tour → overpriced shops
3. Grand Palace "closed" today scam
4. Jet ski damage scam — photograph before/after
5. Metered taxi "broken" — use Grab app instead
6. Fake monk — real monks don't ask for money on street
7. Overpriced tailoring — shop on second day, not first
8. Ping pong show — you'll get a 10,000 THB bill

MOTORBIKE SAFETY
• Wear helmet ALWAYS (fine: 500 THB for no helmet)
• Need Thai or international driving license
• Insurance doesn't cover accidents without license
• Never drive after drinking
• Stick to automatic scooters (easier in traffic)

FOOD SAFETY
• Street food: Generally safe — go for busy stalls
• Ice: Usually safe in tourist areas
• Water: Never drink tap water
• Produce: Wash fruit, peel skin when possible
• Leftovers: Thai food spoils fast in heat`,

    contentHebrew: `בטיחות ובריאות בתאילנד

מספרי חירום
191 — משטרה תאילנדית (לאומית)
1669 — אמבולנס / חירום רפואי
1155 — משטרת תיירים (דוברי אנגלית)
199 — מחלקת כיבוי אש
1554 — משטרת כבישים
66-2-204-9200+ — שגרירות ישראל בנגקוק

בתי חולים בצ'יאנג מאי (דוברי אנגלית)
1. Rajavej Chiang Mai Hospital (הטוב ביותר לזרים)
   כתובת: 24 Korloi Rd, Chang Klan
   טלפון: 66-53-904-111+
   חירום 24 שעות, מחלקת חולים בינלאומית
   מקבל רוב כרטיסי ביטוח נסיעות

2. Bangkok Hospital Chiang Mai
   כתובת: 88 Boonruangrit Rd
   טלפון: 66-53-208-500+
   תקן בינלאומי, צוות דובר אנגלית
   מחירים גבוהים יותר אך טיפול מצוין

3. Maharaj Nakorn Chiang Mai (בית חולים ממשלתי)
   כתובת: 110 Inthawarorot Rd
   טלפון: 66-53-935-000+
   האפשרות הזולה ביותר, המתנות ארוכות יותר
   רופאים תאיים טובים, פחות אנגלית

בתי חולים בבנגקוק
• Bumrungrad International — 66-2-667-1000+ (הטוב ביותר בדרום מזרח אסיה)
• Bangkok Hospital — 66-2-310-3000+
• Samitivej Hospital — 66-2-711-8000+

בעיות בריאות נפוצות
מוסקיטו: דנגה היא אמיתית — השתמשו בדוחה חרקים עם DEET
חום: שתו 2+ ליטרים מים ביום
הרעלת מזון: נפוצה — שתו הרבה נוזלים, נוחו, פנו לרופא אם חמור
תאונות אופנוע: פציעת תיירים הנפוצה ביותר — לבשו קסדה!
שמש: קרם הגנה חזק (SPF 50+), מרחו מחדש כל שעתיים

ביטוח נסיעות (חובה!)
ספקים מומלצים לישראלים:
• הראל ביטוח — 03-7531111 (24 שעות)
• מנורה ביטוח — 03-9241222
• כלל ביטוח — תוכנית בריאות בינלאומית
• World Nomads — כיסוי מצוין, שירות באנגלית
כיסוי מינימלי: 100,000 דולר רפואי, כולל פינוי
עלות: ~30–60 דולר ל-2 שבועות

מה הביטוח חייב לכסות
✓ טיפול רפואי
✓ אשפוז
✓ פינוי רפואי לישראל
✓ טיפול בקורונה
✓ תאונות אופנוע (חייב רישיון!)
✓ ספורט אתגרי אם מתוכנן (תוספת)

הונאות נפוצות להימנע מהן
1. הונאת אבני חן — לעולם אל תקנו אבני חן ללא ידע מומחה
2. הונאת טיול בטוק-טוק — טיול 20 בהט → חנויות יקרות מדי
3. הארמון הגדול "סגור" היום
4. הונאת נזק ג'ט סקי — צלמו לפני/אחרי
5. מונה מונית "שבור" — השתמשו באפליקציית Grab במקום
6. נזיר מזויף — נזירים אמיתיים לא מבקשים כסף ברחוב
7. תפירה במחיר מופקע — קנו ביום השני, לא הראשון
8. מופע פינג פונג — תקבלו חשבון של 10,000 בהט

בטיחות אופנוע
• לבשו קסדה תמיד (קנס: 500 בהט ללא קסדה)
• צריך רישיון נהיגה תאי או בינלאומי
• ביטוח לא מכסה תאונות ללא רישיון
• לעולם אל תנהגו אחרי שתייה
• היצמדו לקטנועים אוטומטיים (קל יותר בתנועה)

בטיחות מזון
• אוכל רחוב: בטוח בדרך כלל — לכו לדוכנים עמוסים
• קרח: בדרך כלל בטוח באזורי תיירות
• מים: לעולם אל תשתו מים מהברז
• פירות: שטפו פירות, קלפו את הקליפה כשאפשר
• שאריות: אוכל תאי מתקלקל מהר בחום`,
  },

  // ─────────────────────────────────────────────
  // 6. תחבורה
  // ─────────────────────────────────────────────
  {
    id: 6,
    title: "Transportation",
    titleHebrew: "תחבורה",
    icon: "🚕",
    description: "Grab, Songthaew, airport to city, buses and trains",
    descriptionHebrew: "Grab, סונגתאו, שדה תעופה לעיר, אוטובוסים ורכבות",
    content: `TRANSPORTATION IN THAILAND

GRAB APP (Thailand's Uber) ⭐ RECOMMENDED
- Download: App Store / Google Play
- Register: Phone number + credit/debit card
- How to use:
  1. Open app, set pickup and destination
  2. See price BEFORE booking (no surprises)
  3. Driver comes to you
  4. Pay by card or cash
- Cheaper and safer than taxis
- Works in: Bangkok, Chiang Mai, Phuket, all major cities
- Types:
  • GrabCar — private car (most comfortable)
  • GrabBike — motorcycle taxi (cheap, fast in traffic)
  • GrabTaxi — metered taxi via app (safer than flagging)

SONGTHAEW (RED TRUCKS) — CHIANG MAI
- Red pickup trucks that run fixed routes
- How to use:
  1. Flag one down on the road
  2. Tell driver where you're going (he may say yes or no)
  3. Ride with other passengers
  4. Pay when you get off: 20–30 THB fixed rate
- Tip: Good for getting around the old city area
- Negotiate for private "charter" if going far: 100–200 THB

CHIANG MAI AIRPORT → CITY CENTER
• Grab: 120–180 THB, 20–30 minutes
• Official Taxi: 150–250 THB (counter near exit)
• Red Songthaew: 30–50 THB (shared, takes longer)
• Avoid: Random "taxi" men approaching you (tourist price!)

GETTING FROM CHIANG MAI TO BANGKOK
By Air (1 hour):
  • AirAsia, Thai Lion Air: 500–1,500 THB
  • Book at: airasia.com or thaiairways.com
  
By Overnight Train (12–13 hours):
  • Sleeper train: 600–1,300 THB (first/second class)
  • Comfortable, scenic, arrives morning
  • Book: 12go.asia or railway.co.th
  
By Bus (10–11 hours):
  • Nakhonchai Air VIP: 500–800 THB
  • Departs Arcade Bus Terminal
  • Comfortable, direct, overnight

GETTING AROUND BANGKOK
BTS Skytrain: 16–62 THB per trip
MRT Metro: Similar prices
Grab: Convenient, use for non-BTS areas
Tuk-tuk: Negotiate hard, 100–200 THB for short trips
Ferry: On Chao Phraya River, 15–40 THB (scenic!)

MOTORBIKE RENTAL
• Available everywhere: 150–300 THB/day
• MUST have international driving license
• Helmets required by law
• Accident risk is HIGH — consider carefully
• Scooter types: Honda Click (150cc) is easiest

BICYCLE / E-BIKE
• Chiang Mai: Great for cycling — flat old city
• Rental: 50–80 THB/day regular bike
• E-bike: 150–300 THB/day
• Best areas: Old city moat road, Doi Suthep base

TAXI RULES
• Always demand meter: "Meter, please" / "Chai meter"
• Starting fare: 35 THB
• Avoid: Taxis near Khao San Road (tourist trap)
• Airport taxis: 50 THB surcharge + meter + expressway toll`,

    contentHebrew: `תחבורה בתאילנד

אפליקציית GRAB (האובר של תאילנד) ⭐ מומלץ
- הורדה: App Store / Google Play
- הרשמה: מספר טלפון + כרטיס אשראי/חיוב
- איך להשתמש:
  1. פתחו את האפליקציה, הגדירו איסוף ויעד
  2. ראו מחיר לפני ההזמנה (ללא הפתעות)
  3. הנהג מגיע אליכם
  4. שלמו בכרטיס או מזומן
- יותר זול ובטוח ממוניות
- עובד ב: בנגקוק, צ'יאנג מאי, פוקט, כל הערים הגדולות
- סוגים:
  • GrabCar — מכונית פרטית (הנוח ביותר)
  • GrabBike — מונית אופנוע (זול, מהיר בתנועה)
  • GrabTaxi — מונית מונה דרך האפליקציה (בטוח יותר מלעצור)

סונגתאו (משאיות אדומות) — צ'יאנג מאי
- משאיות פיקאפ אדומות שרצות בקווים קבועים
- איך להשתמש:
  1. הניפו בצד הדרך
  2. ספרו לנהג לאן אתם הולכים (הוא עשוי לומר כן או לא)
  3. נסעו עם נוסעים אחרים
  4. שלמו ביציאה: 20–30 בהט מחיר קבוע
- טיפ: מתאים לתנועה ברחבי אזור העיר העתיקה
- נהלו משא ומתן על "שכירה פרטית" אם הולכים רחוק: 100–200 בהט

שדה תעופה צ'יאנג מאי → מרכז העיר
• Grab: 120–180 בהט, 20–30 דקות
• מונית רשמית: 150–250 בהט (דלפק ליד היציאה)
• סונגתאו אדום: 30–50 בהט (משותף, לוקח יותר זמן)
• הימנעו מ: גברי "מונית" אקראיים שניגשים אליכם (מחיר תייר!)

מצ'יאנג מאי לבנגקוק
בדרך האווירית (שעה):
  • AirAsia, Thai Lion Air: 500–1,500 בהט
  • הזמינו ב: airasia.com או thaiairways.com
  
ברכבת לילה (12–13 שעות):
  • רכבת שינה: 600–1,300 בהט (כיתה ראשונה/שנייה)
  • נוח, ציורי, מגיע בבוקר
  • הזמינו: 12go.asia או railway.co.th
  
באוטובוס (10–11 שעות):
  • Nakhonchai Air VIP: 500–800 בהט
  • יוצא מ-Arcade Bus Terminal
  • נוח, ישיר, לילי

סביב בנגקוק
BTS Skytrain: 16–62 בהט לנסיעה
MRT מטרו: מחירים דומים
Grab: נוח, השתמשו עבור אזורים שלא ב-BTS
טוק-טוק: נהלו משא ומתן קשה, 100–200 בהט לנסיעות קצרות
מעבורת: בנהר צ'או פראיה, 15–40 בהט (ציורי!)

השכרת אופנוע
• זמין בכל מקום: 150–300 בהט/יום
• חייב רישיון נהיגה בינלאומי
• קסדות נדרשות על פי חוק
• סיכון תאונות גבוה — שקלו היטב
• סוג קטנוע: Honda Click (150cc) הוא הקל ביותר

אופניים / אופניים חשמליים
• צ'יאנג מאי: מצוין לרכיבה — עיר עתיקה שטוחה
• השכרה: 50–80 בהט/יום אופניים רגילים
• אופניים חשמליים: 150–300 בהט/יום
• האזורים הטובים ביותר: כביש חפיר העיר העתיקה, מצלעת Doi Suthep

כללי מונית
• תמיד דרשו מונה: "Meter, please" / "Chai meter"
• תעריף פתיחה: 35 בהט
• הימנעו מ: מוניות ליד Khao San Road (מלכודת תיירים)
• מוניות שדה תעופה: 50 בהט תוספת + מונה + אגרת כביש מהיר`,
  },

  // ─────────────────────────────────────────────
  // 7. ישראלים בתאילנד
  // ─────────────────────────────────────────────
  {
    id: 7,
    title: "Israeli Community",
    titleHebrew: "ישראלים בתאילנד",
    icon: "🇮🇱",
    description: "Facebook groups, Israeli spots, Shabbat times, and community",
    descriptionHebrew: "קבוצות פייסבוק, מקומות ישראלים, שעות שבת וקהילה",
    content: `ISRAELI COMMUNITY IN THAILAND

FACEBOOK GROUPS (Join before you go!)
1. "ישראלים בתאילנד" — Israelis in Thailand
   The main group: 50,000+ members
   Ask anything: apartments, recommendations, help

2. "ישראלים בצ'יאנג מאי" — Israelis in Chiang Mai
   City-specific: events, rentals, daily life

3. "ישראלים בבנגקוק" — Israelis in Bangkok
   Bangkok-focused community

4. "ויזה תאילנד לישראלים" — Thailand Visa for Israelis
   Visa questions, border run reports, updates

5. "כשר בתאילנד" — Kosher in Thailand
   Kashrut questions and restaurant recommendations

ISRAELI SPOTS IN CHIANG MAI
Nimmanhaemin area (the Israeli hub):
• Jerusalem Restaurant (Nimman Soi 13) — Israeli food
• Hummus Bar (near Nimman) — falafel, hummus, shakshuka
• Kalamata Restaurant — Mediterranean, popular with Israelis
• Café Nimman area — many Israelis at coffee shops
• Green Tiger Hostel — popular with young Israeli travelers

Night Bazaar area:
• Several Israeli-run shops near Night Bazaar
• Chabad house (see Kosher section)

Pai village (4 hours north):
• Very popular with young Israelis
• Israeli restaurants, Hebrew menus everywhere
• Chabad of Pai in town center

KOH PHANGAN — ISRAELI HOTSPOT
• Full Moon Party beach area
• Many Israeli DJs and events
• Chabad of Koh Phangan: Sruly Ceitlin — +66 85-048-1888
• Israeli restaurants near Haad Rin beach

SHABBAT TIMES IN CHIANG MAI (2025)
Summer months (April–August):
• Candle lighting: ~6:35–6:45 PM
• Shabbat ends: ~7:30–7:45 PM

Winter months (November–February):
• Candle lighting: ~6:00–6:10 PM
• Shabbat ends: ~7:05–7:15 PM

Check exact times: myzmanim.com (set location to Chiang Mai)
Timezone: UTC+7 (no daylight saving in Thailand)

CHABAD HOUSES — FULL LIST
Bangkok: 02-282-1770 / 02-663-0244
Chiang Mai: 081-472-1003
Phuket: 076-344-144
Koh Samui: 086-280-5077
Koh Phangan: 085-048-1888
Koh Tao: Contact via Koh Samui Chabad
Pai: Via Chiang Mai Chabad
Koh Lanta: Contact Bangkok Chabad

USEFUL HEBREW-SPEAKING SERVICES
• Israeli dentist in Chiang Mai: Ask Chabad
• Israeli doctors: Some in Bangkok private hospitals
• Hebrew-speaking lawyers: Israeli embassy referrals
• Hebrew guides for tours: Available via Facebook groups

THAI LANGUAGE NOTICE
Most tourist areas in Chiang Mai have Hebrew signs. 
The Nimman area has Hebrew menus. Taxi drivers near 
popular Israeli spots understand "Chabad" and "Night Bazaar".`,

    contentHebrew: `קהילה ישראלית בתאילנד

קבוצות פייסבוק (הצטרפו לפני שאתם נוסעים!)
1. "ישראלים בתאילנד"
   הקבוצה הראשית: 50,000+ חברים
   שאלו כל דבר: דירות, המלצות, עזרה

2. "ישראלים בצ'יאנג מאי"
   ספציפי לעיר: אירועים, שכירות, חיי יומיום

3. "ישראלים בבנגקוק"
   קהילה ממוקדת בנגקוק

4. "ויזה תאילנד לישראלים"
   שאלות ויזה, דיווחי ביקורי גבול, עדכונים

5. "כשר בתאילנד"
   שאלות כשרות והמלצות מסעדות

מקומות ישראלים בצ'יאנג מאי
אזור נימנהמין (מרכז הישראלים):
• Jerusalem Restaurant (Nimman Soi 13) — אוכל ישראלי
• Hummus Bar (ליד נימן) — פלאפל, חומוס, שקשוקה
• Kalamata Restaurant — ים תיכוני, פופולרי אצל ישראלים
• אזור קפה נימן — הרבה ישראלים בבתי קפה
• Green Tiger Hostel — פופולרי אצל מטיילים ישראלים צעירים

אזור Night Bazaar:
• כמה חנויות בניהול ישראלי ליד Night Bazaar
• בית חב"ד (ראו פרק כשרות)

כפר פאי (4 שעות צפונה):
• פופולרי מאוד אצל ישראלים צעירים
• מסעדות ישראליות, תפריטים בעברית בכל מקום
• חב"ד פאי במרכז העיר

קוה פאנגן — מרכז ישראלי חם
• אזור חוף המסיבה של הירח המלא
• הרבה DJ ישראלים ואירועים
• חב"ד קוה פאנגן: שרולי שייטלין — 66-85-048-1888+
• מסעדות ישראליות ליד חוף Haad Rin

שעות שבת בצ'יאנג מאי (2025)
חודשי קיץ (אפריל–אוגוסט):
• הדלקת נרות: ~18:35–18:45
• צאת שבת: ~19:30–19:45

חודשי חורף (נובמבר–פברואר):
• הדלקת נרות: ~18:00–18:10
• צאת שבת: ~19:05–19:15

בדקו שעות מדויקות: myzmanim.com (הגדירו מיקום לצ'יאנג מאי)
אזור זמן: UTC+7 (אין שעון קיץ בתאילנד)

בתי חב"ד — רשימה מלאה
בנגקוק: 02-282-1770 / 02-663-0244
צ'יאנג מאי: 081-472-1003
פוקט: 076-344-144
קוה סמוי: 086-280-5077
קוה פאנגן: 085-048-1888
קוה טאו: דרך חב"ד קוה סמוי
פאי: דרך חב"ד צ'יאנג מאי
קוה לנטה: דרך חב"ד בנגקוק

שירותים דוברי עברית
• רופא שיניים ישראלי בצ'יאנג מאי: שאלו בחב"ד
• רופאים ישראלים: חלקם בבתי חולים פרטיים בבנגקוק
• עורכי דין דוברי עברית: הפניות משגרירות ישראל
• מדריכים עבריים לטיולים: זמינים דרך קבוצות פייסבוק

הודעה על שפה תאית
ברוב אזורי התיירות בצ'יאנג מאי יש שלטים בעברית.
באזור נימן יש תפריטים בעברית. נהגי מונית ליד
מקומות ישראלים פופולריים מבינים "חב"ד" ו"Night Bazaar".`,
  },

  // ─────────────────────────────────────────────
  // 8. מילון שרידות — Survival Thai Phrases
  // ─────────────────────────────────────────────
  {
    id: 8,
    title: "Survival Thai Phrases",
    titleHebrew: "מילון שרידות בתאי",
    icon: "🗣️",
    description: "20 essential Thai phrases with Hebrew pronunciation guide",
    descriptionHebrew: "20 ביטויים חיוניים בתאי עם מדריך הגייה בעברית",
    content: `SURVIVAL THAI FOR ISRAELIS

PRONUNCIATION TIPS
- Tone matters in Thai (5 tones) — but don't worry too much
- Final "k" sounds like a cut-off "k" (stop the sound)
- "Ph" = "P" not "F" (Phuket = Poo-ket)
- Male politeness particle: "khrap" (กรับ)
- Female politeness particle: "kha" (ค่ะ/ครับ)
- Add khrap/kha at end of sentences to be polite

THE 20 ESSENTIAL PHRASES

GREETINGS
1. Hello / Goodbye
   Thai: สวัสดีครับ/ค่ะ
   Romanized: Sa-wat-dee khrap/kha
   Hebrew guide: סא-วอท-ดี-ครับ

2. Thank you
   Thai: ขอบคุณครับ/ค่ะ
   Romanized: Khob khun khrap/kha
   Hebrew guide: ค็อบ-คุน-ครับ

3. You're welcome / No problem
   Thai: ไม่เป็นไร
   Romanized: Mai pen rai
   Hebrew guide: מאי-פן-ראי (לא נורא)

4. Sorry / Excuse me
   Thai: ขอโทษครับ/ค่ะ
   Romanized: Kho thot khrap/kha
   Hebrew guide: ค็อ-โทด-ครับ

BASICS
5. Yes
   Thai: ใช่ (chai) or ครับ/ค่ะ
   Romanized: Chai / Khrap / Kha
   Hebrew guide: ไช / ครับ

6. No
   Thai: ไม่ใช่ / ไม่
   Romanized: Mai chai / Mai
   Hebrew guide: มาי-ไช / มาย

7. How much? (price)
   Thai: เท่าไหร่ครับ/ค่ะ
   Romanized: Tao rai khrap/kha
   Hebrew guide: เตา-ไร-ครับ

8. Too expensive
   Thai: แพงไป
   Romanized: Paeng pai
   Hebrew guide: แพง-ไป

9. Can you reduce the price?
   Thai: ลดหน่อยได้ไหม
   Romanized: Lot noi dai mai
   Hebrew guide: ล็อด-นอย-ได-ไม

NEEDS
10. I want this
    Thai: เอาอันนี้
    Romanized: Ao an ni
    Hebrew guide: เอา-อัน-นี้

11. I don't want / No thank you
    Thai: ไม่เอา
    Romanized: Mai ao
    Hebrew guide: มาย-เอา

12. Where is the toilet?
    Thai: ห้องน้ำอยู่ที่ไหน
    Romanized: Hong nam yoo thi nai
    Hebrew guide: หง-นาม-ยู-ที-ไน

13. Help!
    Thai: ช่วยด้วย!
    Romanized: Chuay duay!
    Hebrew guide: ช่วย-ดุ้วย!

14. I need a doctor
    Thai: ต้องการหมอ
    Romanized: Tong kan mo
    Hebrew guide: ตง-กัน-ม็อ

15. Call the police
    Thai: โทรเรียกตำรวจ
    Romanized: Tho riak tamruat
    Hebrew guide: โท-เรียก-ตัม-รวด

FOOD
16. Delicious!
    Thai: อร่อย
    Romanized: Aroy
    Hebrew guide: อ-รอย

17. Not spicy please
    Thai: ไม่เผ็ด
    Romanized: Mai phet
    Hebrew guide: มาย-เผ็ด

18. No pork please
    Thai: ไม่ใส่หมู
    Romanized: Mai sai mu
    Hebrew guide: มาย-ไส-หมู

19. Vegetarian (no meat)
    Thai: เจ (มังสวิรัต)
    Romanized: Jay (mang sa wirat)
    Hebrew guide: เจ

20. Check/Bill please
    Thai: เก็บเงินด้วยครับ/ค่ะ
    Romanized: Kep ngoen duay khrap/kha
    Hebrew guide: เก็บ-เงิน-ดุ้วย-ครับ

NUMBERS 1–10
1 = หนึ่ง (neung) — נ'ונג
2 = สอง (song) — ซ็อง
3 = สาม (sam) — ซาม
4 = สี่ (si) — ซี
5 = ห้า (ha) — ห้า
6 = หก (hok) — ห็อก
7 = เจ็ด (jet) — เจ็ด
8 = แปด (paet) — แปด
9 = เก้า (kao) — เก้า
10 = สิบ (sip) — ซิป
20 = ยี่สิบ (yee sip) — ยี-ซิป
100 = ร้อย (roi) — รอย
1000 = พัน (pan) — ปาน

PRACTICAL SENTENCES
"Take me to [hotel name]" 
→ "Pai [hotel name]" (ไป + hotel name)
= "ไป + שם המלון" (go to...)

"How far to [place]?"
→ "Klee mai thi [place]?" (ไกลไหมที่...)

"Turn left" → "Leow sai" (เลี้ยวซ้าย)
"Turn right" → "Leow khwa" (เลี้ยวขวา)
"Straight ahead" → "Trong pai" (ตรงไป)
"Stop here" → "Jod thi ni" (จอดที่นี้)`,

    contentHebrew: `תאי שרידות לישראלים

טיפי הגייה
- טון חשוב בתאי (5 טונים) — אבל אל תדאגו יותר מדי
- "k" סופי נשמע כמו "k" קצוץ (עצרו את הצליל)
- "Ph" = "P" לא "F" (Phuket = פוּ-קֶט)
- חלקיק נימוס לגברים: "khrap" (กรับ)
- חלקיק נימוס לנשים: "kha" (ค่ะ/ครับ)
- הוסיפו khrap/kha בסוף משפטים להיות מנומסים

20 הביטויים החיוניים

ברכות
1. שלום / להתראות
   תאי: สวัสดีครับ/ค่ะ
   תעתיק: Sa-wat-dee khrap/kha
   בעברית: סָ-וָאט-דִי

2. תודה
   תאי: ขอบคุณครับ/ค่ะ
   תעתיק: Khob khun khrap/kha
   בעברית: ח'וֹבּ-כּוּן

3. אין דבר / על לא דבר
   תאי: ไม่เป็นไร
   תעתיק: Mai pen rai
   בעברית: מַאי-פֶּן-רַאי

4. סליחה / עזרת
   תאי: ขอโทษครับ/ค่ะ
   תעתיק: Kho thot khrap/kha
   בעברית: ח'וֹ-תוֹד

יסודות
5. כן
   תאי: ใช่ (chai) or ครับ/ค่ะ
   תעתיק: Chai / Khrap / Kha
   בעברית: צ'אי / קראפ

6. לא
   תאי: ไม่ใช่ / ไม่
   תעתיק: Mai chai / Mai
   בעברית: מַאי-צ'אי / מַאי

7. כמה זה? (מחיר)
   תאי: เท่าไหร่ครับ/ค่ะ
   תעתיק: Tao rai khrap/kha
   בעברית: תָאו-רַאי

8. יקר מדי
   תאי: แพงไป
   תעתיק: Paeng pai
   בעברית: פַּאֶנג-פַּאי

9. אפשר להוריד מחיר?
   תאי: ลดหน่อยได้ไหม
   תעתיק: Lot noi dai mai
   בעברית: ל็וֹט-נוֹי-דַאי-מַאי

צרכים
10. אני רוצה את זה
    תאי: เอาอันนี้
    תעתיק: Ao an ni
    בעברית: אָאו-אַן-נִי

11. אני לא רוצה / לא תודה
    תאי: ไม่เอา
    תעתיק: Mai ao
    בעברית: מַאי-אָאו

12. איפה השירותים?
    תאי: ห้องน้ำอยู่ที่ไหน
    תעתיק: Hong nam yoo thi nai
    בעברית: הוֹנג-נָאם-יוּ-תִי-נַאי

13. עזרה!
    תאי: ช่วยด้วย!
    תעתיק: Chuay duay!
    בעברית: צ'וּאַי-דוּאַי!

14. אני צריך רופא
    תאי: ต้องการหมอ
    תעתיק: Tong kan mo
    בעברית: טוֹנג-קָן-מוֹ

15. קרא למשטרה
    תאי: โทรเรียกตำรวจ
    תעתיק: Tho riak tamruat
    בעברית: תוֹ-רִיאַק-טַמרוּאַט

אוכל
16. טעים!
    תאי: อร่อย
    תעתיק: Aroy
    בעברית: אַ-רוֹי

17. לא חריף בבקשה
    תאי: ไม่เผ็ด
    תעתיק: Mai phet
    בעברית: מַאי-פֶּד

18. ללא חזיר בבקשה
    תאי: ไม่ใส่หมู
    תעתיק: Mai sai mu
    בעברית: מַאי-סַאי-מוּ

19. צמחוני (ללא בשר)
    תאי: เจ (มังสวิรัต)
    תעתיק: Jay
    בעברית: ג'יי

20. חשבון בבקשה
    תאי: เก็บเงินด้วยครับ/ค่ะ
    תעתיק: Kep ngoen duay khrap/kha
    בעברית: קֶ-נגוֹאֶן-דוּאַי

מספרים 1–10
1 = หนึ่ง (neung) — נ'ונג
2 = สอง (song) — ซ็อง
3 = สาม (sam) — ซาม
4 = สี่ (si) — ซี
5 = ห้า (ha) — ห้า
6 = หก (hok) — ห็อก
7 = เจ็ด (jet) — เจ็ด
8 = แปด (paet) — แปด
9 = เก้า (kao) — เก้า
10 = สิบ (sip) — ซิป
20 = ยี่สิบ (yee sip) — ยี-ซิป
100 = ร้อย (roi) — รอย
1,000 = พัน (pan) — ปาน

משפטים מעשיים
"קח אותי ל[שם מלון]"
→ "Pai [שם מלון]" (ไป + שם המלון)

"כמה רחוק ל[מקום]?"
→ "Klee mai thi [מקום]?" (ไกลไหมที่...)

"פנה שמאלה" → "Leow sai" (เลี้ยวซ้าย)
"פנה ימינה" → "Leow khwa" (เลี้ยวขวา)
"ישר קדימה" → "Trong pai" (ตรงไป)
"עצור כאן" → "Jod thi ni" (จอดที่นี้)`,
  },
];
