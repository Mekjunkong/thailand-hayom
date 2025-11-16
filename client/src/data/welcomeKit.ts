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
  {
    id: 1,
    title: "Arrival Survival Guide",
    titleHebrew: "מדריך הישרדות בהגעה",
    icon: "✈️",
    description: "Everything you need to know in your first 24 hours in Thailand",
    descriptionHebrew: "כל מה שצריך לדעת ב-24 השעות הראשונות בתאילנד",
    content: `**Airport to City:**
- Don Mueang Airport: Use Airport Rail Link (45 THB) or official taxi (400-500 THB)
- Suvarnabhumi Airport: Airport Rail Link to city center (45 THB), taxi with meter (300-400 THB)
- Always use official taxi stands, never accept offers from touts

**First Steps:**
1. Get a SIM card at airport (299-599 THB for tourist packages)
2. Exchange some cash (banks give better rates than airport)
3. Download: Grab, Bolt, Google Maps, Google Translate
4. Save emergency numbers in your phone

**Important:**
- Keep your passport safe (hotel safe)
- Carry a copy of passport when going out
- Keep hotel business card for taxi drivers`,
    contentHebrew: `**מהשדה לעיר:**
- שדה דון מואנג: רכבת שדה תעופה (45 באט) או מונית רשמית (400-500 באט)
- שדה סוברנבהומי: רכבת שדה תעופה למרכז העיר (45 באט), מונית עם מונה (300-400 באט)
- תמיד השתמשו בדוכני מוניות רשמיים, לעולם אל תקבלו הצעות ממתווכים

**צעדים ראשונים:**
1. קנו כרטיס SIM בשדה התעופה (299-599 באט לחבילות תיירים)
2. החליפו קצת מזומן (בנקים נותנים שער טוב יותר מהשדה)
3. הורידו: Grab, Bolt, Google Maps, Google Translate
4. שמרו מספרי חירום בטלפון

**חשוב:**
- שמרו על הדרכון בכספת המלון
- קחו איתכם עותק של הדרכון כשיוצאים
- שמרו כרטיס ביקור של המלון לנהגי מונית`
  },
  {
    id: 2,
    title: "Top Scams to Avoid",
    titleHebrew: "הונאות נפוצות להימנע מהן",
    icon: "⚠️",
    description: "Stay safe and avoid common tourist scams",
    descriptionHebrew: "הישארו בטוחים והימנעו מהונאות תיירים נפוצות",
    content: `**Common Scams:**

**1. Gem Scam:**
- Someone tells you about a "special government sale" of gems
- They take you to a shop where you buy fake gems
- **Solution:** Never buy gems in Thailand unless you're an expert

**2. Tuk-Tuk Tours:**
- Driver offers very cheap tour (20-50 THB)
- Takes you to overpriced shops where he gets commission
- **Solution:** Agree on price and destination before getting in

**3. Grand Palace Closed:**
- Someone near tourist sites says it's closed today
- Offers to take you somewhere else instead
- **Solution:** Check official hours online, ignore random advice

**4. Jet Ski Rental:**
- After returning jet ski, they claim you damaged it
- Demand huge payment for "repairs"
- **Solution:** Take photos/video before and after, use reputable operators

**5. Meter "Broken":**
- Taxi driver says meter is broken, quotes high price
- **Solution:** Get out and find another taxi, or use Grab/Bolt

**6. Ping Pong Show:**
- Touts offer "free" show, then present huge bill
- **Solution:** Avoid these shows entirely`,
    contentHebrew: `**הונאות נפוצות:**

**1. הונאת אבני חן:**
- מישהו מספר לכם על "מבצע ממשלתי מיוחד" על אבני חן
- לוקחים אתכם לחנות שבה תקנו אבני חן מזויפות
- **פתרון:** לעולם אל תקנו אבני חן בתאילנד אלא אם אתם מומחים

**2. טיולי טוק-טוק:**
- הנהג מציע טיול זול מאוד (20-50 באט)
- לוקח אתכם לחנויות יקרות שבהן הוא מקבל עמלה
- **פתרון:** הסכימו על מחיר ויעד לפני שעולים

**3. הארמון הגדול סגור:**
- מישהו ליד אתרי תיירות אומר שסגור היום
- מציע לקחת אתכם למקום אחר במקום
- **פתרון:** בדקו שעות פתיחה רשמיות באינטרנט, התעלמו מעצות אקראיות

**4. השכרת ג'ט סקי:**
- אחרי החזרת הג'ט סקי, הם טוענים שגרמתם נזק
- דורשים תשלום עצום עבור "תיקונים"
- **פתרון:** צלמו תמונות/וידאו לפני ואחרי, השתמשו במפעילים מוכרים

**5. מונה "שבור":**
- נהג מונית אומר שהמונה שבור, מציע מחיר גבוה
- **פתרון:** צאו ומצאו מונית אחרת, או השתמשו ב-Grab/Bolt

**6. מופע פינג פונג:**
- מתווכים מציעים מופע "חינם", ואז מציגים חשבון ענק
- **פתרון:** הימנעו ממופעים אלה לחלוטין`
  },
  {
    id: 3,
    title: "SIM Card Guide",
    titleHebrew: "מדריך כרטיסי SIM",
    icon: "📱",
    description: "Choose the best mobile plan for your stay",
    descriptionHebrew: "בחרו את חבילת הסלולר הטובה ביותר לשהייה שלכם",
    content: `**Top 3 Providers:**

**1. AIS (Best Coverage)**
- Tourist SIM: 299-599 THB (7-15 days)
- Unlimited data with high-speed cap
- Best coverage in islands and rural areas
- Available at airport and 7-Eleven

**2. DTAC (Best Value)**
- Tourist SIM: 249-499 THB (8-15 days)
- Good speeds, slightly cheaper
- Good in cities, okay in islands
- Available at airport and convenience stores

**3. True (Best for Cities)**
- Tourist SIM: 299-599 THB (7-15 days)
- Fast speeds in Bangkok and major cities
- Weaker in remote areas
- Available at airport

**What's Included:**
- Unlimited data (speed reduced after cap)
- Local calls
- International calls (limited)
- Easy top-up at 7-Eleven

**Recommendation:**
- Short trip (1-7 days): DTAC 249 THB
- Island hopping: AIS 599 THB
- City stay: True or AIS 299 THB`,
    contentHebrew: `**3 הספקים המובילים:**

**1. AIS (כיסוי הטוב ביותר)**
- SIM תיירים: 299-599 באט (7-15 ימים)
- גלישה ללא הגבלה עם מגבלת מהירות
- כיסוי הטוב ביותר באיים ובאזורים כפריים
- זמין בשדה התעופה וב-7-Eleven

**2. DTAC (תמורה הטובה ביותר)**
- SIM תיירים: 249-499 באט (8-15 ימים)
- מהירויות טובות, קצת יותר זול
- טוב בערים, בסדר באיים
- זמין בשדה התעופה ובחנויות נוחות

**3. True (הטוב ביותר לערים)**
- SIM תיירים: 299-599 באט (7-15 ימים)
- מהירויות מהירות בבנגקוק ובערים גדולות
- חלש יותר באזורים מרוחקים
- זמין בשדה התעופה

**מה כלול:**
- גלישה ללא הגבלה (מהירות מופחתת אחרי המגבלה)
- שיחות מקומיות
- שיחות בינלאומיות (מוגבל)
- טעינה קלה ב-7-Eleven

**המלצה:**
- טיול קצר (1-7 ימים): DTAC 249 באט
- קפיצה באיים: AIS 599 באט
- שהייה בעיר: True או AIS 299 באט`
  },
  {
    id: 4,
    title: "Transport Rules",
    titleHebrew: "כללי תחבורה",
    icon: "🚕",
    description: "Navigate Thailand's transport system like a pro",
    descriptionHebrew: "נווטו במערכת התחבורה של תאילנד כמו מקצוענים",
    content: `**Ride-Hailing Apps:**

**Grab (Most Popular)**
- Works like Uber
- Fixed price shown before booking
- Driver can't scam you
- Available in all major cities
- Tip: Choose "GrabCar" for cars, "GrabBike" for motorcycles

**Bolt (Cheapest)**
- Usually 10-20% cheaper than Grab
- Same concept, fixed prices
- Growing in Bangkok
- Tip: Compare prices with Grab

**InDriver (Negotiable)**
- You set your price, drivers bid
- Can get very cheap rides
- More risk of cancellations
- Tip: Set reasonable price based on distance

**Taxis:**
- Always insist on meter ("meter, please" / "ใช้มิเตอร์")
- Starting fare: 35 THB
- Avoid taxis near tourist spots
- Tip: Have destination written in Thai

**Tuk-Tuks:**
- Negotiate price BEFORE getting in
- Usually more expensive than taxis
- Fun for short distances
- Typical prices: 100-200 THB for short rides

**BTS/MRT (Sky Train/Metro):**
- Cleanest, fastest way in Bangkok
- Runs 6 AM - midnight
- Buy tickets at stations (40-60 THB per trip)
- Get Rabbit Card for convenience`,
    contentHebrew: `**אפליקציות הזמנת נסיעות:**

**Grab (הפופולרי ביותר)**
- עובד כמו Uber
- מחיר קבוע מוצג לפני ההזמנה
- הנהג לא יכול להונות אתכם
- זמין בכל הערים הגדולות
- טיפ: בחרו "GrabCar" למכוניות, "GrabBike" לאופנועים

**Bolt (הזול ביותר)**
- בדרך כלל 10-20% יותר זול מ-Grab
- אותו קונספט, מחירים קבועים
- צומח בבנגקוק
- טיפ: השוו מחירים עם Grab

**InDriver (ניתן למשא ומתן)**
- אתם קובעים את המחיר, נהגים מציעים
- יכול להיות נסיעות זולות מאוד
- יותר סיכון לביטולים
- טיפ: קבעו מחיר סביר על בסיס המרחק

**מוניות:**
- תמיד עמדו על מונה ("meter, please" / "ใช้มิเตอร์")
- תעריף פתיחה: 35 באט
- הימנעו ממוניות ליד אתרי תיירות
- טיפ: כתבו את היעד בתאילנדית

**טוק-טוק:**
- נהלו משא ומתן על המחיר לפני שעולים
- בדרך כלל יקר יותר ממוניות
- כיף למרחקים קצרים
- מחירים טיפוסיים: 100-200 באט לנסיעות קצרות

**BTS/MRT (רכבת עילית/מטרו):**
- הדרך הנקייה והמהירה ביותר בבנגקוק
- פועל 6 בבוקר - חצות
- קנו כרטיסים בתחנות (40-60 באט לנסיעה)
- קבלו כרטיס Rabbit לנוחות`
  },
  {
    id: 5,
    title: "How to Negotiate Politely",
    titleHebrew: "איך לנהל משא ומתן באדיבות",
    icon: "🤝",
    description: "Master the Thai art of polite bargaining",
    descriptionHebrew: "שליטה באמנות התאילנדית של משא ומתן אדיב",
    content: `**Thai Negotiation Culture:**

Thais value harmony and face-saving. Aggressive bargaining is considered rude. Here's how to negotiate the Thai way:

**Golden Rules:**
1. **Always smile** - Even when discussing price
2. **Stay calm** - Never raise your voice or show anger
3. **Be respectful** - Use polite language ("khrap/kha")
4. **Know when to bargain** - Markets yes, malls/restaurants no
5. **Start at 50-60%** - Of asking price, meet in the middle

**Where to Bargain:**
✅ Street markets
✅ Night markets  
✅ Tuk-tuks (agree price first)
✅ Street vendors
✅ Tailor shops

**Where NOT to Bargain:**
❌ Restaurants
❌ 7-Eleven/convenience stores
❌ Shopping malls
❌ Taxis with meters
❌ Hotels

**Useful Phrases:**
- "ลดหน่อยได้ไหม" (lot noi dai mai) - "Can you reduce the price?"
- "แพงไป" (paeng pai) - "Too expensive"
- "ราคาสุดท้ายเท่าไหร่" (raa-kaa sut taai tao rai) - "What's your best price?"

**Example Negotiation:**
1. Vendor: "500 baht"
2. You (smiling): "Oh, that's expensive. How about 250?"
3. Vendor: "No no, 450"
4. You: "300? Final price?"
5. Vendor: "Okay okay, 350"
6. You: "Deal! Thank you!" (😊)

**Pro Tips:**
- Walk away slowly if price too high - they often call you back
- Buy multiple items for better discount
- Shop at end of day for better deals
- Compliment the product while negotiating`,
    contentHebrew: `**תרבות המשא ומתן התאילנדית:**

תאילנדים מעריכים הרמוניה ושמירה על כבוד. משא ומתן אגרסיבי נחשב גס. כך מנהלים משא ומתן בדרך התאילנדית:

**כללי זהב:**
1. **תמיד חייכו** - גם כשמדברים על מחיר
2. **הישארו רגועים** - לעולם אל תרימו קול או תראו כעס
3. **היו מכבדים** - השתמשו בשפה מנומסת ("khrap/kha")
4. **דעו מתי להתמקח** - שווקים כן, קניונים/מסעדות לא
5. **התחילו ב-50-60%** - מהמחיר המבוקש, היפגשו באמצע

**איפה להתמקח:**
✅ שווקי רחוב
✅ שווקי לילה
✅ טוק-טוק (הסכימו על מחיר מראש)
✅ דוכני רחוב
✅ חנויות חייטים

**איפה לא להתמקח:**
❌ מסעדות
❌ 7-Eleven/חנויות נוחות
❌ קניונים
❌ מוניות עם מונה
❌ מלונות

**ביטויים שימושיים:**
- "ลดหน่อยได้ไหม" (lot noi dai mai) - "אפשר להוריד את המחיר?"
- "แพงไป" (paeng pai) - "יקר מדי"
- "ราคאסุดท้ายเท่าไหร่" (raa-kaa sut taai tao rai) - "מה המחיר הטוב ביותר שלך?"

**דוגמה למשא ומתן:**
1. מוכר: "500 באט"
2. אתם (מחייכים): "אוי, זה יקר. מה דעתך על 250?"
3. מוכר: "לא לא, 450"
4. אתם: "300? מחיר סופי?"
5. מוכר: "אוקיי אוקיי, 350"
6. אתם: "עסקה! תודה!" (😊)

**טיפים מקצועיים:**
- התרחקו לאט אם המחיר גבוה מדי - לעיתים קרובות הם קוראים חזרה
- קנו מספר פריטים להנחה טובה יותר
- קנו בסוף היום לעסקאות טובות יותר
- החמיאו את המוצר תוך כדי משא ומתן`
  },
  {
    id: 6,
    title: "Temple Etiquette",
    titleHebrew: "נימוסי מקדש",
    icon: "🛕",
    description: "Respect sacred spaces and Thai culture",
    descriptionHebrew: "כבדו מקומות קדושים ותרבות תאילנדית",
    content: `**Dress Code:**

**Required:**
- Cover shoulders (no tank tops)
- Cover knees (no shorts)
- Remove shoes before entering
- Remove hats inside

**Recommended:**
- Lightweight long pants or skirt
- T-shirt or blouse with sleeves
- Socks (floors can be hot)
- Bring a scarf to cover shoulders if needed

**Behavior Rules:**

**DO:**
✅ Remove shoes at entrance
✅ Sit with feet tucked (never point feet at Buddha)
✅ Speak quietly
✅ Walk slowly and calmly
✅ Take photos (usually allowed, check signs)
✅ Make donations if you wish
✅ Wai (prayer gesture) when appropriate

**DON'T:**
❌ Touch Buddha images
❌ Point at Buddha images
❌ Turn your back to Buddha
❌ Climb on statues for photos
❌ Touch monks (especially women)
❌ Sit higher than monks
❌ Be loud or disrespectful
❌ Wear revealing clothes

**Women & Monks:**
- Women cannot touch monks or hand items directly
- If giving something, place it down or give through a man
- Monks cannot touch women either

**Popular Temples:**

**Bangkok:**
- Wat Phra Kaew (Grand Palace) - 500 THB
- Wat Pho (Reclining Buddha) - 200 THB
- Wat Arun (Temple of Dawn) - 100 THB

**Chiang Mai:**
- Wat Phra That Doi Suthep - 30 THB
- Wat Chedi Luang - Free

**Tips:**
- Visit early morning (cooler, fewer crowds)
- Bring water (but don't drink inside temple)
- Hire a guide for deeper understanding
- Respect photography restrictions`,
    contentHebrew: `**קוד לבוש:**

**חובה:**
- כיסוי כתפיים (ללא גופיות)
- כיסוי ברכיים (ללא מכנסיים קצרים)
- הסרת נעליים לפני כניסה
- הסרת כובעים בפנים

**מומלץ:**
- מכנסיים ארוכים קלים או חצאית
- חולצת טי או חולצה עם שרוולים
- גרביים (הרצפות יכולות להיות חמות)
- צעיף לכיסוי כתפיים אם צריך

**כללי התנהגות:**

**כן:**
✅ הסירו נעליים בכניסה
✅ שבו עם רגליים מקופלות (לעולם אל לכוון רגליים לבודהה)
✅ דברו בשקט
✅ הלכו לאט וברגיעות
✅ צלמו (בדרך כלל מותר, בדקו שלטים)
✅ תרמו אם אתם רוצים
✅ עשו ואי (מחוות תפילה) כשמתאים

**לא:**
❌ לגעת בפסלי בודהה
❌ להצביע על פסלי בודהה
❌ להפנות גב לבודהה
❌ לטפס על פסלים לתמונות
❌ לגעת בנזירים (במיוחד נשים)
❌ לשבת גבוה יותר מנזירים
❌ להיות רועשים או חסרי כבוד
❌ ללבוש בגדים חשופים

**נשים ונזירים:**
- נשים לא יכולות לגעת בנזירים או למסור פריטים ישירות
- אם נותנים משהו, הניחו אותו או תנו דרך גבר
- נזירים גם לא יכולים לגעת בנשים

**מקדשים פופולריים:**

**בנגקוק:**
- Wat Phra Kaew (הארמון הגדול) - 500 באט
- Wat Pho (בודהה שוכב) - 200 באט
- Wat Arun (מקדש השחר) - 100 באט

**צ'יאנג מאי:**
- Wat Phra That Doi Suthep - 30 באט
- Wat Chedi Luang - חינם

**טיפים:**
- בקרו בבוקר מוקדם (קריר, פחות קהל)
- הביאו מים (אבל אל תשתו בתוך המקדש)
- שכרו מדריך להבנה עמוקה יותר
- כבדו הגבלות צילום`
  }
];
