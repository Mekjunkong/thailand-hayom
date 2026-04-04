import PDFDocument from 'pdfkit';

// ─────────────────────────────────────────────────────────────────
// Smart Tourist Pack PDF Generator — Thailand Hayom
// Generates a bilingual Hebrew/English PDF for Israeli travelers
// ─────────────────────────────────────────────────────────────────

interface Section {
  titleEn: string;
  titleHe: string;
  icon: string;
  content: string;
}

const SECTIONS: Section[] = [
  {
    titleEn: 'Visa & Legal',
    titleHe: 'ויזה ועניינים משפטיים',
    icon: '1.',
    content: `THAILAND VISA GUIDE FOR ISRAELIS (2025)

VISA EXEMPT ENTRY
- Israelis get 30 days visa-free on arrival
- Extend ONCE for 30 more days at any immigration office: 1,900 THB
- Total: up to 60 days visa-free

TOURIST VISA (TR) — Apply at Thai Embassy before trip
- Single entry: 60 days + 30-day extension = 90 days | Cost: ~$40 USD
- Double entry: Two 60-day periods

EXTEND IN CHIANG MAI
Address: Promenada Mall, 2nd Floor, Nimmanhaemin Rd.
Hours: Mon-Fri 8:30 AM – 4:30 PM (closed 12-1 PM)
Bring: Passport + TM.7 form + 1,900 THB + 2 passport photos + copy of arrival stamp
Tip: Arrive 7:30 AM for queue number. Tue/Wed less crowded.

OVERSTAYING: 500 THB per day fine. NEVER overstay!

ISRAELI EMBASSY BANGKOK
Address: Ocean Tower II, 25F, 75/6-7 Sukhumvit Soi 19
Phone: +66 2 204 9200
Emergency (24/7 for Israelis abroad): 00-972-3-9190141`,
  },
  {
    titleEn: 'Kosher in Thailand',
    titleHe: 'כשרות בתאילנד',
    icon: '2.',
    content: `CHABAD HOUSES — COMPLETE LIST
Bangkok:       +66 2 282-1770 / +66 2 663-0244
Chiang Mai:    +66 81-472-1003  (4/1 Nimman Soi 6)
Phuket:        +66 76-344-144   (Patong Beach)
Koh Samui:     +66 86-280-5077
Koh Phangan:   +66 85-048-1888
Pai:           Via Chiang Mai Chabad

KOSHER RESTAURANTS
Bangkok: Beit Chabad (Sukhumvit), Darna (Sukhumvit 33), Jerusalem Restaurant (Khao San)
Chiang Mai: Chabad house (reserve by Thursday!), Hummus Bar (Nimman area)
Phuket: Chabad Patong, certified restaurants near Bangla Road

SAFE EATING TIPS
- "Mai sai mu" (ไม่ใส่หมู) = No pork please
- "Jay" (เจ) = Buddhist vegan — no meat/fish/dairy
- Safe: fresh fruit, plain rice, coconut milk curries (request vegetarian)
- Avoid: nam pla (fish sauce), kapi (shrimp paste) in most dishes

KOSHER GROCERIES
- Rimping Supermarket (Chiang Mai): Best imported selection
- Tops Market: Imported goods, check labels
- Bangkok airport duty-free: Israeli products`,
  },
  {
    titleEn: 'SIM Cards & Internet',
    titleHe: 'תקשורת ואינטרנט',
    icon: '3.',
    content: `BEST SIM CARDS FOR ISRAELIS (2025)
AIS (best coverage): 299/399/599 THB for 7/15/30 days — best for islands
DTAC (best value):   249/349/499 THB for 8/15/30 days
True Move (cities):  299/399/599 THB for 7/15/30 days

Buy at airport immediately after customs — bring passport.
Open 6 AM – midnight.

CALLING ISRAEL
Dial: 00 + 972 + number (drop leading 0)
Example: 052-1234567 → 00-972-52-1234567
Cheapest: WhatsApp/FaceTime/Telegram (data only, free)

NO VPN NEEDED IN THAILAND
WhatsApp, Telegram, Facebook, Instagram, Google, YouTube — all work perfectly.
Thailand does NOT block Israeli apps or services.

WISE / REVOLUT TIP
Use Wise or Revolut card for ATMs — saves 200-300 ILS over 2 weeks vs Israeli bank card.`,
  },
  {
    titleEn: 'Banking & Money',
    titleHe: 'בנקאות וכסף',
    icon: '4.',
    content: `EXCHANGE RATES (2025 approx.)
1 ILS ≈ 9-10 THB | 1 USD ≈ 33-35 THB
Check live: google.com/search?q=ILS+to+THB

BEST EXCHANGE (Chiang Mai)
1. SuperRich (best rates) — near Nimman / Central Festival
2. Gold shops near Night Bazaar
3. AVOID: Airport counters (5-10% worse rates!)

ATM TIPS
- All Thai ATMs charge 220 THB foreign card fee
- Withdraw maximum per transaction (20,000-30,000 THB)
- ALWAYS choose to pay in THB (refuse "dynamic currency conversion")
- Alert your Israeli bank before traveling!
- Israeli cards that work: Hapoalim, Leumi, Discount, Mizrahi

DAILY BUDGET REFERENCE
Street food meal:     40-80 THB  (4-9 ILS)
Restaurant meal:      150-300 THB (17-33 ILS)
Beer (7-Eleven):      45-55 THB  (5-6 ILS)
Grab ride (5km):      60-120 THB (7-13 ILS)
Budget guesthouse:    300-600 THB (33-65 ILS)
Nice hotel/night:     800-2,000 THB (88-220 ILS)`,
  },
  {
    titleEn: 'Safety & Health',
    titleHe: 'בטיחות ובריאות',
    icon: '5.',
    content: `EMERGENCY NUMBERS
191   — Thai Police
1669  — Ambulance / Emergency Medical
1155  — Tourist Police (English-speaking)
199   — Fire Department
+66 2 204 9200 — Israeli Embassy Bangkok (24/7 emergency)
00-972-3-9190141 — Israeli Emergency Hotline (from Thailand)

HOSPITALS — CHIANG MAI
Rajavej Hospital: +66 53 904 111 — 24h, international ward, most insurance accepted
Bangkok Hospital: +66 53 208 500 — international standard, highest quality
Maharaj (govt):   +66 53 935 000 — cheapest, longer waits

HOSPITALS — BANGKOK
Bumrungrad International: +66 2 667 1000 (best in Southeast Asia)
Bangkok Hospital: +66 2 310 3000

TRAVEL INSURANCE — MANDATORY
Minimum: $100,000 medical + evacuation to Israel
Israeli options: Harel (+972-3-7531111), Menorah (+972-3-9241222), Clal
International: World Nomads (excellent English service)
Cost: $30-60 for 2 weeks

TOP SCAMS TO AVOID
1. Gem scam — never buy gems without expert knowledge
2. Tuk-tuk "cheap tour" — ends at commission shops
3. Grand Palace "closed today" — it's not, ignore strangers
4. Jet ski damage scam — photograph BEFORE and AFTER
5. Taxi meter "broken" — use Grab app instead
6. Fake monk on street asking for money — real monks don't do this`,
  },
  {
    titleEn: 'Transportation',
    titleHe: 'תחבורה',
    icon: '6.',
    content: `GRAB APP — USE THIS ALWAYS
Download: App Store / Google Play
Set pickup + destination → fixed price shown → driver comes to you
Much cheaper and safer than street taxis.
Types: GrabCar (private), GrabBike (motorcycle), GrabTaxi (metered)

CHIANG MAI SPECIFICS
Songthaew (red truck): 20-30 THB flat rate, share with others
Airport to city: Grab 120-180 THB | Official taxi 150-250 THB
Old City area: Walkable or bicycle rental 50-80 THB/day

CHIANG MAI → BANGKOK
Fly (1 hr): AirAsia/Thai Lion 500-1,500 THB | Book: airasia.com
Train (12-13 hrs sleeper): 600-1,300 THB | Book: 12go.asia
Bus (10-11 hrs overnight): 500-800 THB, Nakhonchai Air VIP

TAXIS
Always say: "Meter, please" / "Chai meter" (ใช้มิเตอร์)
Starting fare: 35 THB | Avoid taxis near Khao San Road

MOTORBIKE RENTAL
150-300 THB/day | International license required
Insurance won't cover accidents without valid license!`,
  },
  {
    titleEn: 'Israeli Community',
    titleHe: 'ישראלים בתאילנד',
    icon: '7.',
    content: `JOIN THESE FACEBOOK GROUPS BEFORE YOU GO
- "ישראלים בתאילנד" — 50,000+ members, ask anything
- "ישראלים בצ'יאנג מאי" — city-specific
- "ויזה תאילנד לישראלים" — visa updates, border runs
- "כשר בתאילנד" — kosher recommendations

ISRAELI SPOTS — CHIANG MAI
Nimman Area (Israeli hub):
- Jerusalem Restaurant (Nimman Soi 13)
- Hummus Bar (falafel, hummus, shakshuka)
- Kalamata Restaurant (Mediterranean)
- Green Tiger Hostel (young Israelis)

Pai village (4 hrs north): Very popular, Hebrew menus everywhere

KOH PHANGAN: Israeli community, Full Moon Party, Chabad
PHUKET: Chabad Patong, Israeli restaurants near Bangla Rd

SHABBAT TIMES — CHIANG MAI 2025
Summer (Apr-Aug): Candles ~6:35-6:45 PM, ends ~7:30-7:45 PM
Winter (Nov-Feb):  Candles ~6:00-6:10 PM, ends ~7:05-7:15 PM
Exact times: myzmanim.com (set to Chiang Mai, timezone UTC+7)

CHABAD HOTLINE FOR ISRAELIS
Chiang Mai Chabad: +66 81-472-1003 (WhatsApp)
— Can help with: meals, mikveh, Jewish items, local advice, emergencies`,
  },
  {
    titleEn: 'Survival Thai Phrases',
    titleHe: 'מילון שרידות תאי',
    icon: '8.',
    content: `20 ESSENTIAL PHRASES FOR ISRAELIS

GREETING & POLITE
Sawadee khrap/kha      = Hello/Goodbye (male/female)
Khob khun khrap/kha    = Thank you
Mai pen rai            = No problem / You're welcome
Kho thot               = Sorry / Excuse me

SHOPPING & MONEY
Tao rai?               = How much? (price)
Paeng pai              = Too expensive
Lot noi dai mai?       = Can you reduce the price?
Ao an ni               = I want this
Mai ao                 = I don't want it

GETTING AROUND
Pai [destination]      = Go to [place]
Leow sai               = Turn left
Leow khwa              = Turn right
Trong pai              = Straight ahead
Jod thi ni             = Stop here
Hong nam yoo thi nai?  = Where is the toilet?

EMERGENCY
Chuay duay!            = HELP!
Tong kan mo            = I need a doctor
Tho riak tamruat       = Call the police

FOOD
Aroy!                  = Delicious!
Mai phet               = Not spicy please
Mai sai mu             = No pork please
Jay                    = Vegetarian/vegan
Kep ngoen duay         = Check/bill please

NUMBERS
1=neung  2=song  3=sam  4=si   5=ha
6=hok    7=jet   8=paet 9=kao  10=sip
20=yee sip   100=roi   1000=pan

TAXI ESSENTIAL
"Chai meter khrap" = Use the meter please (กรุณาใช้มิเตอร์)
Say this EVERY time you get in a taxi!`,
  },
];

export async function generateWelcomeKitPDF(): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50, autoFirstPage: true });
    const chunks: Buffer[] = [];

    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const WIDTH = 495; // usable width (595 - 2*50)

    // ── Helper utilities ──────────────────────────────────────────
    const h1 = (text: string) => {
      doc.fontSize(26).font('Helvetica-Bold').fillColor('#1a1a2e').text(text, { lineGap: 2 });
      doc.moveDown(0.3);
    };
    const h2 = (text: string) => {
      doc.fontSize(16).font('Helvetica-Bold').fillColor('#c8860a').text(text, { lineGap: 2 });
      doc.moveDown(0.2);
    };
    const h3 = (text: string) => {
      doc.fontSize(12).font('Helvetica-Bold').fillColor('#333').text(text, { lineGap: 1 });
    };
    const body = (text: string) => {
      doc.fontSize(10).font('Helvetica').fillColor('#444').text(text, { lineGap: 3 });
      doc.moveDown(0.3);
    };
    const divider = () => {
      doc.moveDown(0.5);
      doc
        .moveTo(50, doc.y)
        .lineTo(545, doc.y)
        .strokeColor('#e5c07a')
        .lineWidth(1)
        .stroke();
      doc.moveDown(0.5);
    };

    // ── COVER PAGE ────────────────────────────────────────────────
    doc
      .rect(0, 0, 595, 842)
      .fill('#1a1a2e');

    // Gold accent bar
    doc.rect(0, 0, 595, 8).fill('#c8860a');
    doc.rect(0, 834, 595, 8).fill('#c8860a');

    doc.moveDown(6);
    doc
      .fontSize(42)
      .font('Helvetica-Bold')
      .fillColor('#f5c842')
      .text('Smart Tourist Pack', { align: 'center' });

    doc.moveDown(0.5);
    doc
      .fontSize(20)
      .font('Helvetica')
      .fillColor('#ffffff')
      .text('Complete Thailand Guide for Israeli Travelers', { align: 'center' });

    doc.moveDown(0.5);
    doc
      .fontSize(18)
      .font('Helvetica')
      .fillColor('#e5c07a')
      .text('מדריך תאילנד המלא לישראלים', { align: 'center' });

    doc.moveDown(2);
    // Price badge
    doc
      .roundedRect(220, doc.y, 155, 55, 8)
      .fill('#c8860a');
    const badgeY = doc.y - 55;
    doc
      .fontSize(28)
      .font('Helvetica-Bold')
      .fillColor('#fff')
      .text('₪20', 220, badgeY + 8, { width: 155, align: 'center' });
    doc
      .fontSize(11)
      .font('Helvetica')
      .fillColor('#fff')
      .text('One-time Payment', 220, badgeY + 36, { width: 155, align: 'center' });
    doc.moveDown(1);

    doc.moveDown(1);
    doc
      .fontSize(12)
      .font('Helvetica')
      .fillColor('#aaa')
      .text('© 2025 Thailand Hayom — thailandhayom.com', { align: 'center' });

    doc.moveDown(0.5);
    doc
      .fontSize(11)
      .font('Helvetica')
      .fillColor('#888')
      .text('8 Comprehensive Sections | Bilingual Hebrew & English', { align: 'center' });

    // ── TABLE OF CONTENTS ─────────────────────────────────────────
    doc.addPage();

    h1('Table of Contents — תוכן עניינים');
    divider();

    SECTIONS.forEach((sec, i) => {
      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .fillColor('#c8860a')
        .text(`${i + 1}.`, 50, doc.y, { continued: true, width: 25 });
      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .fillColor('#1a1a2e')
        .text(` ${sec.titleEn}`, { continued: true });
      doc
        .fontSize(12)
        .font('Helvetica')
        .fillColor('#666')
        .text(`  —  ${sec.titleHe}`);
      doc.moveDown(0.4);
    });

    divider();
    doc
      .fontSize(10)
      .font('Helvetica')
      .fillColor('#888')
      .text(
        'This pack includes real, actionable information for Israeli travelers in Thailand.\n' +
        'Last updated: 2025 | Contact: info@thailandhayom.com',
        { align: 'center' }
      );

    // ── CONTENT SECTIONS ──────────────────────────────────────────
    SECTIONS.forEach(sec => {
      doc.addPage();

      // Section header band
      doc.rect(50, 50, WIDTH, 40).fill('#1a1a2e');
      doc
        .fontSize(18)
        .font('Helvetica-Bold')
        .fillColor('#f5c842')
        .text(`${sec.icon}  ${sec.titleEn}`, 60, 60);

      doc.moveDown(0.2);

      // Hebrew subtitle
      doc
        .fontSize(13)
        .font('Helvetica')
        .fillColor('#c8860a')
        .text(sec.titleHe, { align: 'right' });

      doc.moveDown(0.5);

      // Content — process line by line to style headers vs body
      const lines = sec.content.split('\n');
      lines.forEach(line => {
        if (!line.trim()) {
          doc.moveDown(0.3);
          return;
        }
        if (
          (line === line.toUpperCase() && line.trim().length > 3 && !line.startsWith('-') && !line.startsWith('•')) ||
          line.endsWith(':')
        ) {
          // ALL CAPS or ends with colon → treat as subheading
          doc
            .fontSize(10)
            .font('Helvetica-Bold')
            .fillColor('#c8860a')
            .text(line, { lineGap: 1 });
        } else {
          doc
            .fontSize(9.5)
            .font('Helvetica')
            .fillColor('#333')
            .text(line, { lineGap: 2 });
        }
      });
    });

    // ── BACK COVER ────────────────────────────────────────────────
    doc.addPage();
    doc.rect(0, 0, 595, 842).fill('#1a1a2e');
    doc.rect(0, 0, 595, 8).fill('#c8860a');

    doc.moveDown(8);
    doc
      .fontSize(22)
      .font('Helvetica-Bold')
      .fillColor('#f5c842')
      .text('Safe Travels!  •  נסיעה טובה!', { align: 'center' });

    doc.moveDown(1);
    doc
      .fontSize(14)
      .font('Helvetica')
      .fillColor('#fff')
      .text('Questions? Help? Emergency?', { align: 'center' });

    doc.moveDown(0.5);
    doc
      .fontSize(12)
      .font('Helvetica')
      .fillColor('#e5c07a')
      .text('Israeli Embassy Bangkok: +66 2 204 9200', { align: 'center' });
    doc.text('Emergency Hotline (24/7): 00-972-3-9190141', { align: 'center' });
    doc.text('Tourist Police: 1155', { align: 'center' });
    doc.text('Chiang Mai Chabad: +66 81-472-1003', { align: 'center' });

    doc.moveDown(2);
    doc
      .fontSize(11)
      .font('Helvetica')
      .fillColor('#888')
      .text('thailandhayom.com  |  info@thailandhayom.com', { align: 'center' });

    doc.end();
  });
}

// Invoice PDF generator for bulk orders
export async function generateInvoicePDF(purchase: {
  id: number;
  customerEmail: string;
  quantity?: number;
  amount: number;
}): Promise<Buffer> {
  const PDFDocument = (await import("pdfkit")).default;
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks: Buffer[] = [];
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    // Header
    doc.fontSize(24).font("Helvetica-Bold").fillColor("#1a1a2e")
      .text("Thailand Hayom", { align: "center" });
    doc.moveDown(0.5);
    doc.fontSize(18).fillColor("#f5c842").text("INVOICE / חשבונית", { align: "center" });
    doc.moveDown(1);

    // Details
    doc.fontSize(12).font("Helvetica").fillColor("#333");
    doc.text(`Invoice #: ${purchase.id}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);
    doc.text(`Customer: ${purchase.customerEmail}`);
    doc.moveDown(1);

    // Items
    doc.fontSize(14).font("Helvetica-Bold").text("Items / פריטים:");
    doc.moveDown(0.5);
    doc.fontSize(12).font("Helvetica");
    const qty = purchase.quantity || 1;
    const unitPrice = Math.round(purchase.amount / qty / 100);
    doc.text(`Smart Tourist Pack x${qty} — ₪${unitPrice} each`);
    doc.moveDown(1);

    // Total
    doc.fontSize(16).font("Helvetica-Bold").fillColor("#f5c842");
    doc.text(`Total: ₪${Math.round(purchase.amount / 100)}`, { align: "right" });
    doc.moveDown(2);

    // Footer
    doc.fontSize(10).font("Helvetica").fillColor("#888")
      .text("thailandhayom.com | info@thailandhayom.com", { align: "center" });

    doc.end();
  });
}
