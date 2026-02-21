// Curated one-day trip routes for Thailand
// Each route is a sequence of stops with driving times between them

export interface TripActivity {
  name: string;
  nameHe: string;
  duration: number; // minutes
}

export interface TripStop {
  id: string;
  stopNumber: number;
  name: string;
  nameHe: string;
  arrivalTime: string; // e.g. "06:00"
  stayMinutes: number;
  entranceFee: number; // THB, 0 = free
  description: string;
  descriptionHe: string;
  activities: TripActivity[];
  driveToNext: number | null; // minutes to next stop, null for last stop
  // Coordinates for the mini-map (relative positions 0-100)
  mapX: number;
  mapY: number;
  // Real photo URL — replace placeholders with actual location photos
  photoUrl: string;
  // Gradient fallback when photo hasn't loaded
  gradient: string;
}

export interface TripRoute {
  id: string;
  title: string;
  titleHe: string;
  subtitle: string;
  subtitleHe: string;
  region: string;
  totalHours: number;
  estimatedBudget: number; // THB
  departureTime: string;
  returnTime: string;
  stops: TripStop[];
}

// ---------------------------------------------------------------------------
// Chiang Mai One-Day Route
// ---------------------------------------------------------------------------

export const chiangMaiOneDay: TripRoute = {
  id: "chiang-mai-one-day",
  title: "One Day Chiang Mai",
  titleHe: "יום אחד בצ'יאנג מאי",
  subtitle: "Doi Inthanon → Mae Wang → Doi Suthep → Mae Rim → Samoeng Loop → Mae Kampong",
  subtitleHe:
    "דוי אינתנון → מאה וואנג → דוי סותפ → מאה ריม → לולאת סמואנג → מאה קמפונג",
  region: "Northern Thailand",
  totalHours: 15,
  estimatedBudget: 2200,
  departureTime: "04:30",
  returnTime: "19:30",
  stops: [
    {
      id: "doi-inthanon",
      stopNumber: 1,
      name: "Doi Inthanon",
      nameHe: "דוי אינתנון",
      arrivalTime: "06:00",
      stayMinutes: 150,
      entranceFee: 500,
      description:
        "Highest point in Thailand (2,565m). Catch sunrise at the summit, visit the Twin Royal Pagodas surrounded by misty gardens, hike the Kew Mae Pan Nature Trail boardwalk through cloud forest, and stop at the powerful Wachirathan Waterfall.",
      descriptionHe:
        "הנקודה הגבוהה ביותר בתאילנד (2,565 מ׳). תפסו זריחה בפסגה, בקרו בפגודות המלכותיות התאומות, טיילו בשביל קיו מאה פאן דרך יער הענן, ועצרו במפל ווצ׳יראתאן.",
      activities: [
        { name: "Summit viewpoint & photo", nameHe: "תצפית הפסגה וצילום", duration: 20 },
        { name: "Twin Royal Pagodas", nameHe: "פגודות מלכותיות תאומות", duration: 30 },
        {
          name: "Kew Mae Pan Nature Trail",
          nameHe: "שביל טבע קיו מאה פאן",
          duration: 40,
        },
        { name: "Wachirathan Waterfall", nameHe: "מפל ווצ׳יראתאן", duration: 20 },
      ],
      driveToNext: 45,
      mapX: 30,
      mapY: 85,
      // Real Doi Inthanon summit — misty peak with twin pagodas
      photoUrl:
        "https://images.unsplash.com/photo-1598935898639-81586f7d2129?w=800&q=80",
      gradient: "from-emerald-800 via-emerald-600 to-teal-500",
    },
    {
      id: "mae-wang",
      stopNumber: 2,
      name: "Mae Wang",
      nameHe: "מאה וואנג",
      arrivalTime: "09:15",
      stayMinutes: 45,
      entranceFee: 0,
      description:
        "Quick scenic stop at Pha Chor — Chiang Mai's own Grand Canyon. Towering eroded soil pillars create a dramatic landscape. Short walk from the parking area.",
      descriptionHe:
        "עצירה נופית קצרה בפא צ׳ור — הגרנד קניון של צ׳יאנג מאי. עמודי אדמה שחוקים יוצרים נוף דרמטי.",
      activities: [
        {
          name: "Pha Chor (Grand Canyon)",
          nameHe: "פא צ׳ור (גרנד קניון)",
          duration: 25,
        },
        { name: "Viewpoint photos", nameHe: "צילומים מנקודת תצפית", duration: 20 },
      ],
      driveToNext: 60,
      mapX: 35,
      mapY: 65,
      // Pha Chor canyon pillars
      photoUrl:
        "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80",
      gradient: "from-amber-700 via-orange-600 to-yellow-500",
    },
    {
      id: "doi-suthep",
      stopNumber: 3,
      name: "Doi Suthep",
      nameHe: "דוי סותפ",
      arrivalTime: "11:00",
      stayMinutes: 60,
      entranceFee: 50,
      description:
        "The iconic golden temple Wat Phra That Doi Suthep. Climb 306 steps up the Naga serpent staircase (or take the funicular). Stunning golden chedi with panoramic views over the entire Chiang Mai valley.",
      descriptionHe:
        "המקדש הזהוב האייקוני וואט פרה טאט דוי סותפ. טפסו 306 מדרגות (או רכבל). צ׳די זהוב עם תצפית פנורמית על עמק צ׳יאנג מאי.",
      activities: [
        {
          name: "Naga staircase (306 steps)",
          nameHe: "מדרגות הנאגה (306 מדרגות)",
          duration: 10,
        },
        {
          name: "Wat Phra That Doi Suthep",
          nameHe: "וואט פרה טאט דוי סותפ",
          duration: 35,
        },
        {
          name: "City viewpoint",
          nameHe: "תצפית על העיר",
          duration: 15,
        },
      ],
      driveToNext: 30,
      mapX: 40,
      mapY: 40,
      // Golden temple of Doi Suthep
      photoUrl:
        "https://images.unsplash.com/photo-1512553424438-71f0c7741da8?w=800&q=80",
      gradient: "from-yellow-600 via-amber-500 to-orange-400",
    },
    {
      id: "mae-rim",
      stopNumber: 4,
      name: "Mae Rim",
      nameHe: "מאה רים",
      arrivalTime: "12:30",
      stayMinutes: 90,
      entranceFee: 100,
      description:
        "Lunch break and the beautiful Mae Sa Waterfall with 10 tiers of cascading water through lush jungle. Walk up to tier 3-5 for the best experience. Great spot for a refreshing break.",
      descriptionHe:
        "הפסקת צהריים ומפל מאה סא היפהפה עם 10 קומות של מים זורמים בג׳ונגל. עלו לקומה 3-5 לחוויה הטובה ביותר.",
      activities: [
        { name: "Lunch at local restaurant", nameHe: "צהריים במסעדה מקומית", duration: 45 },
        { name: "Mae Sa Waterfall (10 tiers)", nameHe: "מפל מאה סא (10 קומות)", duration: 45 },
      ],
      driveToNext: 0,
      mapX: 50,
      mapY: 25,
      // Mae Sa Waterfall
      photoUrl:
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
      gradient: "from-teal-600 via-cyan-500 to-sky-400",
    },
    {
      id: "samoeng-loop",
      stopNumber: 5,
      name: "Samoeng Loop",
      nameHe: "לולאת סמואנג",
      arrivalTime: "14:00",
      stayMinutes: 150,
      entranceFee: 90,
      description:
        "The famous scenic mountain loop. Start from Mae Rim on Route 1096, stop at Mon Cham for terraced viewpoints and strawberry fields, enjoy coffee at a hillside café, and wind through the mountains to Samoeng.",
      descriptionHe:
        "הלולאה ההררית המפורסמת. צאו ממאה רים בכביש 1096, עצרו במון צ׳אם לתצפיות ושדות תות, קפה בקפה הררי, ונסעו דרך ההרים לסמואנג.",
      activities: [
        {
          name: "Mon Cham viewpoint",
          nameHe: "תצפית מון צ׳אם",
          duration: 30,
        },
        {
          name: "Mountain scenic drive",
          nameHe: "נסיעה נופית בהרים",
          duration: 60,
        },
        {
          name: "Coffee at hillside café",
          nameHe: "קפה בקפה הררי",
          duration: 20,
        },
      ],
      driveToNext: 60,
      mapX: 65,
      mapY: 15,
      // Mon Cham mountain terraces
      photoUrl:
        "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&q=80",
      gradient: "from-green-700 via-emerald-500 to-lime-400",
    },
    {
      id: "mae-kampong",
      stopNumber: 6,
      name: "Mae Kampong",
      nameHe: "מאה קמפונג",
      arrivalTime: "17:30",
      stayMinutes: 60,
      entranceFee: 50,
      description:
        "End the day at this peaceful 700-year-old mountain village. Walk through narrow paths between traditional Lanna homes, taste locally-grown forest coffee, and enjoy the golden hour light over the village.",
      descriptionHe:
        "סיימו את היום בכפר ההרים השלו בן ה-700 שנה. טיילו בשבילים צרים בין בתי לאנה מסורתיים, טעמו קפה יער מקומי, ותהנו מאור השעה הזהובה.",
      activities: [
        {
          name: "Village walk & local life",
          nameHe: "טיול בכפר וחיים מקומיים",
          duration: 25,
        },
        {
          name: "Forest coffee tasting",
          nameHe: "טעימת קפה יער",
          duration: 15,
        },
        { name: "Village waterfall", nameHe: "מפל הכפר", duration: 15 },
      ],
      driveToNext: null,
      mapX: 80,
      mapY: 45,
      // Mae Kampong village
      photoUrl:
        "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
      gradient: "from-orange-700 via-amber-600 to-yellow-400",
    },
  ],
};

// Registry of all curated trip routes
export const tripRoutes: Record<string, TripRoute> = {
  "chiang-mai-one-day": chiangMaiOneDay,
};
