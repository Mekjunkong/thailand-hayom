# Trip Planner Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an interactive drag-and-drop trip planner for Israel travelers in Thailand with bilingual support, ILS budget tracking, and premium gating (save/share/PDF).

**Architecture:** Client-side DnD (via @dnd-kit) manages planning state in React; localStorage auto-saves every 30s. Server (tRPC) handles persistence, sharing (nanoid tokens), and PDF export (pdfkit). Static destination/activity data in shared TypeScript files — no admin UI needed.

**Tech Stack:** React 19, @dnd-kit/core + @dnd-kit/sortable, tRPC 11, Drizzle ORM (PostgreSQL), pdfkit, nanoid, TailwindCSS v4, Wouter, Zod

---

## Task 1: Install DnD Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install @dnd-kit packages**

Run:
```bash
cd /Users/pasuthunjunkong/workspace/thailand-hayom && pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

**Step 2: Verify installation**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && pnpm ls @dnd-kit/core`
Expected: Shows installed version

**Step 3: Commit**

```bash
cd /Users/pasuthunjunkong/workspace/thailand-hayom && git add package.json pnpm-lock.yaml && git commit -m "chore: add @dnd-kit dependencies for trip planner"
```

---

## Task 2: Create Static Destination & Activity Data

**Files:**
- Create: `shared/destinations.ts`
- Create: `shared/activityCategories.ts`

**Step 1: Create activity categories file**

Create `shared/activityCategories.ts`:

```ts
export interface ActivityCategory {
  id: string;
  nameEn: string;
  nameHe: string;
  icon: string; // Lucide icon name
  color: string; // TailwindCSS color class
}

export const activityCategories: ActivityCategory[] = [
  { id: "temples", nameEn: "Temples", nameHe: "מקדשים", icon: "Landmark", color: "text-amber-600" },
  { id: "beaches", nameEn: "Beaches", nameHe: "חופים", icon: "Waves", color: "text-cyan-500" },
  { id: "food", nameEn: "Food & Dining", nameHe: "אוכל ומסעדות", icon: "UtensilsCrossed", color: "text-rose-500" },
  { id: "nightlife", nameEn: "Nightlife", nameHe: "חיי לילה", icon: "Moon", color: "text-purple-500" },
  { id: "nature", nameEn: "Nature & Outdoors", nameHe: "טבע וטיולים", icon: "TreePine", color: "text-green-600" },
  { id: "shopping", nameEn: "Shopping & Markets", nameHe: "קניות ושווקים", icon: "ShoppingBag", color: "text-pink-500" },
  { id: "culture", nameEn: "Culture & History", nameHe: "תרבות והיסטוריה", icon: "BookOpen", color: "text-indigo-500" },
  { id: "wellness", nameEn: "Wellness & Spa", nameHe: "ספא ובריאות", icon: "Heart", color: "text-red-400" },
];

export function getActivityCategory(id: string): ActivityCategory | undefined {
  return activityCategories.find(c => c.id === id);
}
```

**Step 2: Create destinations file**

Create `shared/destinations.ts` with ~12 curated destinations. Each destination has `id`, `name`, `nameHe`, `region`, `suggestedDays`, `budgetPerDay` (ILS), and 5-8 activities.

```ts
export interface Activity {
  id: string;
  name: string;
  nameHe: string;
  category: string; // matches ActivityCategory.id
  estimatedCostIls: number;
  duration: string; // e.g. "2h", "half-day", "full-day"
}

export interface Destination {
  id: string;
  name: string;
  nameHe: string;
  region: "central" | "north" | "south-andaman" | "south-gulf" | "east";
  suggestedDays: [number, number]; // [min, max]
  budgetPerDay: {
    backpacker: number; // ILS
    midRange: number;
    luxury: number;
  };
  activities: Activity[];
}

export const destinations: Destination[] = [
  {
    id: "bangkok",
    name: "Bangkok",
    nameHe: "בנגקוק",
    region: "central",
    suggestedDays: [3, 5],
    budgetPerDay: { backpacker: 150, midRange: 400, luxury: 1200 },
    activities: [
      { id: "bkk-grand-palace", name: "Grand Palace & Wat Phra Kaew", nameHe: "הארמון הגדול ווואט פרה קאו", category: "temples", estimatedCostIls: 60, duration: "3h" },
      { id: "bkk-wat-pho", name: "Wat Pho (Reclining Buddha)", nameHe: "וואט פו (בודהה השוכב)", category: "temples", estimatedCostIls: 25, duration: "2h" },
      { id: "bkk-wat-arun", name: "Wat Arun (Temple of Dawn)", nameHe: "וואט ארון (מקדש השחר)", category: "temples", estimatedCostIls: 15, duration: "1.5h" },
      { id: "bkk-chatuchak", name: "Chatuchak Weekend Market", nameHe: "שוק צ'טוצ'ק", category: "shopping", estimatedCostIls: 0, duration: "half-day" },
      { id: "bkk-khao-san", name: "Khao San Road Night", nameHe: "רחוב קאו סאן בלילה", category: "nightlife", estimatedCostIls: 50, duration: "3h" },
      { id: "bkk-street-food", name: "Yaowarat Street Food Tour", nameHe: "סיור אוכל רחוב יאוורט", category: "food", estimatedCostIls: 40, duration: "2h" },
      { id: "bkk-floating-market", name: "Damnoen Saduak Floating Market", nameHe: "השוק הצף דמנואן סדואק", category: "culture", estimatedCostIls: 80, duration: "half-day" },
      { id: "bkk-massage", name: "Traditional Thai Massage", nameHe: "עיסוי תאילנדי מסורתי", category: "wellness", estimatedCostIls: 30, duration: "1.5h" },
    ],
  },
  {
    id: "chiang-mai",
    name: "Chiang Mai",
    nameHe: "צ'יאנג מאי",
    region: "north",
    suggestedDays: [3, 5],
    budgetPerDay: { backpacker: 100, midRange: 300, luxury: 900 },
    activities: [
      { id: "cm-doi-suthep", name: "Doi Suthep Temple", nameHe: "מקדש דוי סוטפ", category: "temples", estimatedCostIls: 10, duration: "3h" },
      { id: "cm-old-city", name: "Old City Temples Walk", nameHe: "סיור מקדשים בעיר העתיקה", category: "culture", estimatedCostIls: 0, duration: "half-day" },
      { id: "cm-night-bazaar", name: "Night Bazaar", nameHe: "שוק הלילה", category: "shopping", estimatedCostIls: 0, duration: "2h" },
      { id: "cm-cooking-class", name: "Thai Cooking Class", nameHe: "שיעור בישול תאילנדי", category: "food", estimatedCostIls: 120, duration: "half-day" },
      { id: "cm-elephant-sanctuary", name: "Elephant Sanctuary Visit", nameHe: "ביקור בשמורת פילים", category: "nature", estimatedCostIls: 200, duration: "full-day" },
      { id: "cm-doi-inthanon", name: "Doi Inthanon National Park", nameHe: "הפארק הלאומי דוי אינתנון", category: "nature", estimatedCostIls: 80, duration: "full-day" },
      { id: "cm-sunday-market", name: "Sunday Walking Street Market", nameHe: "שוק רחוב יום ראשון", category: "shopping", estimatedCostIls: 0, duration: "2h" },
    ],
  },
  {
    id: "chiang-rai",
    name: "Chiang Rai",
    nameHe: "צ'יאנג ראי",
    region: "north",
    suggestedDays: [2, 3],
    budgetPerDay: { backpacker: 80, midRange: 250, luxury: 700 },
    activities: [
      { id: "cr-white-temple", name: "White Temple (Wat Rong Khun)", nameHe: "המקדש הלבן", category: "temples", estimatedCostIls: 15, duration: "2h" },
      { id: "cr-blue-temple", name: "Blue Temple (Wat Rong Suea Ten)", nameHe: "המקדש הכחול", category: "temples", estimatedCostIls: 0, duration: "1h" },
      { id: "cr-black-house", name: "Black House (Baan Dam Museum)", nameHe: "הבית השחור (מוזיאון באן דם)", category: "culture", estimatedCostIls: 25, duration: "2h" },
      { id: "cr-night-market", name: "Chiang Rai Night Market", nameHe: "שוק הלילה צ'יאנג ראי", category: "food", estimatedCostIls: 20, duration: "2h" },
      { id: "cr-golden-triangle", name: "Golden Triangle", nameHe: "המשולש המוזהב", category: "culture", estimatedCostIls: 40, duration: "half-day" },
    ],
  },
  {
    id: "pai",
    name: "Pai",
    nameHe: "פאי",
    region: "north",
    suggestedDays: [2, 4],
    budgetPerDay: { backpacker: 70, midRange: 200, luxury: 500 },
    activities: [
      { id: "pai-canyon", name: "Pai Canyon Sunset", nameHe: "קניון פאי בשקיעה", category: "nature", estimatedCostIls: 0, duration: "2h" },
      { id: "pai-hot-springs", name: "Pai Hot Springs", nameHe: "מעיינות חמים פאי", category: "wellness", estimatedCostIls: 10, duration: "2h" },
      { id: "pai-waterfalls", name: "Mo Paeng Waterfall", nameHe: "מפל מו פאנג", category: "nature", estimatedCostIls: 0, duration: "2h" },
      { id: "pai-walking-street", name: "Pai Walking Street", nameHe: "רחוב המדרחוב פאי", category: "food", estimatedCostIls: 15, duration: "2h" },
      { id: "pai-bamboo-bridge", name: "Bamboo Bridge (Boon Ko Ku So)", nameHe: "גשר הבמבוק", category: "nature", estimatedCostIls: 5, duration: "1h" },
    ],
  },
  {
    id: "phuket",
    name: "Phuket",
    nameHe: "פוקט",
    region: "south-andaman",
    suggestedDays: [3, 5],
    budgetPerDay: { backpacker: 150, midRange: 500, luxury: 1500 },
    activities: [
      { id: "pk-patong-beach", name: "Patong Beach", nameHe: "חוף פטונג", category: "beaches", estimatedCostIls: 0, duration: "half-day" },
      { id: "pk-phi-phi", name: "Phi Phi Islands Day Trip", nameHe: "טיול יום לאיי פיפי", category: "nature", estimatedCostIls: 150, duration: "full-day" },
      { id: "pk-big-buddha", name: "Big Buddha", nameHe: "בודהה הגדול", category: "temples", estimatedCostIls: 0, duration: "2h" },
      { id: "pk-old-town", name: "Phuket Old Town", nameHe: "העיר העתיקה של פוקט", category: "culture", estimatedCostIls: 0, duration: "2h" },
      { id: "pk-bangla-road", name: "Bangla Road Night", nameHe: "רחוב בנגלה בלילה", category: "nightlife", estimatedCostIls: 60, duration: "3h" },
      { id: "pk-james-bond", name: "James Bond Island Tour", nameHe: "סיור לאי ג'יימס בונד", category: "nature", estimatedCostIls: 120, duration: "full-day" },
    ],
  },
  {
    id: "krabi",
    name: "Krabi",
    nameHe: "קראבי",
    region: "south-andaman",
    suggestedDays: [3, 5],
    budgetPerDay: { backpacker: 120, midRange: 400, luxury: 1200 },
    activities: [
      { id: "kb-railay", name: "Railay Beach", nameHe: "חוף ריילי", category: "beaches", estimatedCostIls: 20, duration: "full-day" },
      { id: "kb-4-islands", name: "4 Islands Tour", nameHe: "סיור 4 האיים", category: "nature", estimatedCostIls: 100, duration: "full-day" },
      { id: "kb-tiger-cave", name: "Tiger Cave Temple", nameHe: "מקדש מערת הנמר", category: "temples", estimatedCostIls: 0, duration: "3h" },
      { id: "kb-ao-nang", name: "Ao Nang Beach & Nightlife", nameHe: "חוף אאו נאנג וחיי לילה", category: "beaches", estimatedCostIls: 0, duration: "half-day" },
      { id: "kb-hot-springs", name: "Emerald Pool & Hot Springs", nameHe: "הבריכה האזמרגדית ומעיינות חמים", category: "nature", estimatedCostIls: 30, duration: "half-day" },
    ],
  },
  {
    id: "koh-lanta",
    name: "Koh Lanta",
    nameHe: "קו לנטה",
    region: "south-andaman",
    suggestedDays: [3, 5],
    budgetPerDay: { backpacker: 100, midRange: 350, luxury: 1000 },
    activities: [
      { id: "kl-long-beach", name: "Long Beach Relaxation", nameHe: "רגיעה בחוף הארוך", category: "beaches", estimatedCostIls: 0, duration: "half-day" },
      { id: "kl-snorkeling", name: "4 Islands Snorkeling Trip", nameHe: "שנורקלינג ב-4 איים", category: "nature", estimatedCostIls: 100, duration: "full-day" },
      { id: "kl-old-town", name: "Lanta Old Town", nameHe: "העיר העתיקה לנטה", category: "culture", estimatedCostIls: 0, duration: "2h" },
      { id: "kl-national-park", name: "Mu Ko Lanta National Park", nameHe: "הפארק הלאומי מו קו לנטה", category: "nature", estimatedCostIls: 30, duration: "half-day" },
      { id: "kl-cooking", name: "Thai Cooking on the Beach", nameHe: "בישול תאילנדי על החוף", category: "food", estimatedCostIls: 100, duration: "3h" },
    ],
  },
  {
    id: "koh-samui",
    name: "Koh Samui",
    nameHe: "קו סמוי",
    region: "south-gulf",
    suggestedDays: [3, 5],
    budgetPerDay: { backpacker: 130, midRange: 450, luxury: 1400 },
    activities: [
      { id: "ks-chaweng", name: "Chaweng Beach", nameHe: "חוף צ'אוונג", category: "beaches", estimatedCostIls: 0, duration: "half-day" },
      { id: "ks-ang-thong", name: "Ang Thong Marine Park", nameHe: "הפארק הימי אנג תונג", category: "nature", estimatedCostIls: 180, duration: "full-day" },
      { id: "ks-big-buddha", name: "Big Buddha Temple", nameHe: "מקדש הבודהה הגדול", category: "temples", estimatedCostIls: 0, duration: "1.5h" },
      { id: "ks-fishermans", name: "Fisherman's Village Night Market", nameHe: "שוק הלילה של כפר הדייגים", category: "food", estimatedCostIls: 20, duration: "2h" },
      { id: "ks-jungle-trek", name: "Jungle Club Viewpoint Trek", nameHe: "טרק לנקודת התצפית ג'אנגל קלאב", category: "nature", estimatedCostIls: 15, duration: "3h" },
    ],
  },
  {
    id: "koh-phangan",
    name: "Koh Phangan",
    nameHe: "קו פנגן",
    region: "south-gulf",
    suggestedDays: [3, 5],
    budgetPerDay: { backpacker: 100, midRange: 350, luxury: 1000 },
    activities: [
      { id: "kp-full-moon", name: "Full Moon Party", nameHe: "מסיבת הירח המלא", category: "nightlife", estimatedCostIls: 40, duration: "full-night" },
      { id: "kp-bottle-beach", name: "Bottle Beach", nameHe: "חוף הבקבוק", category: "beaches", estimatedCostIls: 15, duration: "full-day" },
      { id: "kp-yoga", name: "Yoga & Wellness Retreat", nameHe: "ריטריט יוגה ובריאות", category: "wellness", estimatedCostIls: 80, duration: "half-day" },
      { id: "kp-thong-nai-pan", name: "Thong Nai Pan Beach", nameHe: "חוף תונג נאי פאן", category: "beaches", estimatedCostIls: 0, duration: "half-day" },
      { id: "kp-night-market", name: "Thong Sala Night Market", nameHe: "שוק הלילה תונג סלה", category: "food", estimatedCostIls: 15, duration: "2h" },
    ],
  },
  {
    id: "koh-tao",
    name: "Koh Tao",
    nameHe: "קו טאו",
    region: "south-gulf",
    suggestedDays: [2, 4],
    budgetPerDay: { backpacker: 100, midRange: 350, luxury: 900 },
    activities: [
      { id: "kt-diving", name: "Scuba Diving Course", nameHe: "קורס צלילה", category: "nature", estimatedCostIls: 400, duration: "2-3 days" },
      { id: "kt-snorkeling", name: "Snorkeling at Shark Bay", nameHe: "שנורקלינג במפרץ הכרישים", category: "nature", estimatedCostIls: 20, duration: "half-day" },
      { id: "kt-viewpoint", name: "John-Suwan Viewpoint", nameHe: "נקודת תצפית ג'ון סואן", category: "nature", estimatedCostIls: 5, duration: "2h" },
      { id: "kt-sairee", name: "Sairee Beach Sunset", nameHe: "שקיעה בחוף סאירי", category: "beaches", estimatedCostIls: 0, duration: "2h" },
      { id: "kt-night-market", name: "Mae Haad Night Market", nameHe: "שוק הלילה מאי האד", category: "food", estimatedCostIls: 15, duration: "2h" },
    ],
  },
  {
    id: "pattaya",
    name: "Pattaya",
    nameHe: "פטאיה",
    region: "east",
    suggestedDays: [2, 3],
    budgetPerDay: { backpacker: 120, midRange: 400, luxury: 1200 },
    activities: [
      { id: "pt-walking-street", name: "Walking Street Nightlife", nameHe: "רחוב ההליכה בלילה", category: "nightlife", estimatedCostIls: 60, duration: "3h" },
      { id: "pt-sanctuary-truth", name: "Sanctuary of Truth", nameHe: "מקדש האמת", category: "culture", estimatedCostIls: 60, duration: "2h" },
      { id: "pt-coral-island", name: "Coral Island (Koh Larn)", nameHe: "האי האלמוגים (קו לאן)", category: "beaches", estimatedCostIls: 30, duration: "full-day" },
      { id: "pt-floating-market", name: "Pattaya Floating Market", nameHe: "השוק הצף של פטאיה", category: "shopping", estimatedCostIls: 10, duration: "2h" },
      { id: "pt-nong-nooch", name: "Nong Nooch Tropical Garden", nameHe: "הגן הטרופי נונג נוץ'", category: "nature", estimatedCostIls: 50, duration: "half-day" },
    ],
  },
  {
    id: "koh-chang",
    name: "Koh Chang",
    nameHe: "קו צ'אנג",
    region: "east",
    suggestedDays: [3, 5],
    budgetPerDay: { backpacker: 100, midRange: 350, luxury: 1000 },
    activities: [
      { id: "kc-lonely-beach", name: "Lonely Beach", nameHe: "החוף הבודד", category: "beaches", estimatedCostIls: 0, duration: "half-day" },
      { id: "kc-waterfall", name: "Klong Plu Waterfall", nameHe: "מפל קלונג פלו", category: "nature", estimatedCostIls: 10, duration: "2h" },
      { id: "kc-snorkeling", name: "Snorkeling Trip to Koh Rang", nameHe: "שנורקלינג לקו ראנג", category: "nature", estimatedCostIls: 100, duration: "full-day" },
      { id: "kc-white-sand", name: "White Sand Beach", nameHe: "חוף החול הלבן", category: "beaches", estimatedCostIls: 0, duration: "half-day" },
      { id: "kc-night-market", name: "Koh Chang Night Market", nameHe: "שוק הלילה קו צ'אנג", category: "food", estimatedCostIls: 15, duration: "2h" },
    ],
  },
];

export function getDestinationById(id: string): Destination | undefined {
  return destinations.find(d => d.id === id);
}

export function getDestinationsByRegion(region: Destination["region"]): Destination[] {
  return destinations.filter(d => d.region === region);
}
```

**Step 3: Commit**

```bash
cd /Users/pasuthunjunkong/workspace/thailand-hayom && git add shared/destinations.ts shared/activityCategories.ts && git commit -m "feat: add destination and activity catalog data for trip planner"
```

---

## Task 3: Add Itineraries Table to Database Schema

**Files:**
- Modify: `drizzle/schema.ts`

**Step 1: Write the schema addition**

Add to `drizzle/schema.ts` after the `quizPerformance` table (around line 201, before forum tables):

```ts
export const itineraries = pgTable("itineraries", {
  id: serial("id").primaryKey(),
  userId: integer("userId").references(() => users.id),
  shareToken: text("shareToken").unique(),
  title: text("title").notNull(),
  titleHe: text("titleHe").notNull(),
  startDate: timestamp("startDate"),
  totalDays: integer("totalDays").notNull(),
  budget: text("budget"), // JSON string: { accommodation, food, activities, transport }
  days: text("days").notNull(), // JSON string: Day[]
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Itinerary = typeof itineraries.$inferSelect;
export type InsertItinerary = typeof itineraries.$inferInsert;
```

Note: Using `text` for JSON columns instead of `jsonb` because Drizzle ORM's `jsonb` requires extra typing gymnastics. We serialize/deserialize in the router layer.

**Step 2: Run type check**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && pnpm check`
Expected: No new errors (existing TS error in newsletterRouter.ts:231 is pre-existing and unrelated)

**Step 3: Commit**

```bash
cd /Users/pasuthunjunkong/workspace/thailand-hayom && git add drizzle/schema.ts && git commit -m "feat: add itineraries table to database schema"
```

**Step 4: Generate and apply migration**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && pnpm db:push`
Expected: Migration generated and applied successfully. If DATABASE_URL is not set, this will fail — that's OK for local dev, the table will be created on first deploy.

**Step 5: Commit migration files**

```bash
cd /Users/pasuthunjunkong/workspace/thailand-hayom && git add drizzle/ && git commit -m "chore: add itineraries migration"
```

---

## Task 4: Create Shared Types for Trip Planner

**Files:**
- Create: `shared/tripTypes.ts`

**Step 1: Create shared types**

Create `shared/tripTypes.ts`:

```ts
export interface TripDay {
  dayNumber: number;
  destinationId: string;
  activities: TripActivity[];
  notes: string;
  notesHe: string;
}

export interface TripActivity {
  id: string;
  name: string;
  nameHe: string;
  category: string;
  estimatedCostIls: number;
  duration: string;
}

export interface TripBudget {
  accommodation: number;
  food: number;
  activities: number;
  transport: number;
}

export interface TripPlannerState {
  title: string;
  titleHe: string;
  startDate: string | null; // ISO date string
  totalDays: number;
  days: TripDay[];
  budget: TripBudget;
}

export function calculateTotalBudget(days: TripDay[]): TripBudget {
  const budget: TripBudget = { accommodation: 0, food: 0, activities: 0, transport: 0 };
  for (const day of days) {
    for (const activity of day.activities) {
      budget.activities += activity.estimatedCostIls;
    }
  }
  return budget;
}

export function calculateDayBudget(day: TripDay): number {
  return day.activities.reduce((sum, a) => sum + a.estimatedCostIls, 0);
}
```

**Step 2: Commit**

```bash
cd /Users/pasuthunjunkong/workspace/thailand-hayom && git add shared/tripTypes.ts && git commit -m "feat: add shared types for trip planner"
```

---

## Task 5: Write Budget Calculation Tests

**Files:**
- Create: `server/tripPlanner.test.ts`

**Step 1: Write failing tests**

Create `server/tripPlanner.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { calculateTotalBudget, calculateDayBudget, type TripDay } from "../shared/tripTypes";

describe("Trip Planner Budget Calculations", () => {
  const mockDay: TripDay = {
    dayNumber: 1,
    destinationId: "bangkok",
    activities: [
      { id: "a1", name: "Grand Palace", nameHe: "הארמון", category: "temples", estimatedCostIls: 60, duration: "3h" },
      { id: "a2", name: "Street Food", nameHe: "אוכל רחוב", category: "food", estimatedCostIls: 40, duration: "2h" },
    ],
    notes: "",
    notesHe: "",
  };

  const mockDayEmpty: TripDay = {
    dayNumber: 2,
    destinationId: "chiang-mai",
    activities: [],
    notes: "",
    notesHe: "",
  };

  it("calculates day budget from activities", () => {
    expect(calculateDayBudget(mockDay)).toBe(100);
  });

  it("returns 0 for empty day", () => {
    expect(calculateDayBudget(mockDayEmpty)).toBe(0);
  });

  it("calculates total budget across multiple days", () => {
    const budget = calculateTotalBudget([mockDay, mockDayEmpty, mockDay]);
    expect(budget.activities).toBe(200);
    expect(budget.accommodation).toBe(0);
    expect(budget.food).toBe(0);
    expect(budget.transport).toBe(0);
  });

  it("handles empty days array", () => {
    const budget = calculateTotalBudget([]);
    expect(budget.activities).toBe(0);
  });
});
```

**Step 2: Run tests to verify they pass**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && pnpm test -- server/tripPlanner.test.ts`
Expected: All 4 tests PASS

**Step 3: Commit**

```bash
cd /Users/pasuthunjunkong/workspace/thailand-hayom && git add server/tripPlanner.test.ts && git commit -m "test: add budget calculation tests for trip planner"
```

---

## Task 6: Create Trip Planner tRPC Router

**Files:**
- Create: `server/tripPlannerRouter.ts`
- Modify: `server/routers.ts`

**Step 1: Create the router**

Create `server/tripPlannerRouter.ts`:

```ts
import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { itineraries, subscriptions } from "../drizzle/schema";
import { eq, and, desc } from "drizzle-orm";
import { nanoid } from "nanoid";

const daySchema = z.object({
  dayNumber: z.number(),
  destinationId: z.string(),
  activities: z.array(z.object({
    id: z.string(),
    name: z.string(),
    nameHe: z.string(),
    category: z.string(),
    estimatedCostIls: z.number(),
    duration: z.string(),
  })),
  notes: z.string(),
  notesHe: z.string(),
});

const budgetSchema = z.object({
  accommodation: z.number(),
  food: z.number(),
  activities: z.number(),
  transport: z.number(),
});

export const tripPlannerRouter = router({
  save: protectedProcedure
    .input(z.object({
      id: z.number().optional(), // undefined = create new, number = update existing
      title: z.string().min(1),
      titleHe: z.string().min(1),
      startDate: z.string().nullable(),
      totalDays: z.number().min(1).max(30),
      days: z.array(daySchema),
      budget: budgetSchema,
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Check save limit for free-tier users (max 3)
      if (!input.id) {
        const sub = await db
          .select({ tier: subscriptions.tier, status: subscriptions.status })
          .from(subscriptions)
          .where(and(
            eq(subscriptions.userId, ctx.user.id),
            eq(subscriptions.status, "active"),
          ))
          .limit(1);

        const isPremium = sub.length > 0 && sub[0].tier === "premium";

        if (!isPremium) {
          const existing = await db
            .select({ id: itineraries.id })
            .from(itineraries)
            .where(eq(itineraries.userId, ctx.user.id));

          if (existing.length >= 3) {
            throw new Error("Free users can save up to 3 itineraries. Upgrade to premium for unlimited saves.");
          }
        }
      }

      const daysJson = JSON.stringify(input.days);
      const budgetJson = JSON.stringify(input.budget);

      if (input.id) {
        // Update existing
        const updated = await db
          .update(itineraries)
          .set({
            title: input.title,
            titleHe: input.titleHe,
            startDate: input.startDate ? new Date(input.startDate) : null,
            totalDays: input.totalDays,
            days: daysJson,
            budget: budgetJson,
            updatedAt: new Date(),
          })
          .where(and(
            eq(itineraries.id, input.id),
            eq(itineraries.userId, ctx.user.id),
          ))
          .returning();

        if (updated.length === 0) throw new Error("Itinerary not found");
        return updated[0];
      }

      // Create new
      const shareToken = nanoid(12);
      const created = await db
        .insert(itineraries)
        .values({
          userId: ctx.user.id,
          shareToken,
          title: input.title,
          titleHe: input.titleHe,
          startDate: input.startDate ? new Date(input.startDate) : null,
          totalDays: input.totalDays,
          days: daysJson,
          budget: budgetJson,
        })
        .returning();

      return created[0];
    }),

  list: protectedProcedure
    .query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const trips = await db
        .select()
        .from(itineraries)
        .where(eq(itineraries.userId, ctx.user.id))
        .orderBy(desc(itineraries.updatedAt));

      return trips.map(t => ({
        ...t,
        days: JSON.parse(t.days),
        budget: t.budget ? JSON.parse(t.budget) : null,
      }));
    }),

  getByShareToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const trip = await db
        .select()
        .from(itineraries)
        .where(eq(itineraries.shareToken, input.token))
        .limit(1);

      if (trip.length === 0) throw new Error("Itinerary not found");

      return {
        ...trip[0],
        days: JSON.parse(trip[0].days),
        budget: trip[0].budget ? JSON.parse(trip[0].budget) : null,
      };
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const deleted = await db
        .delete(itineraries)
        .where(and(
          eq(itineraries.id, input.id),
          eq(itineraries.userId, ctx.user.id),
        ))
        .returning();

      if (deleted.length === 0) throw new Error("Itinerary not found");
      return { success: true };
    }),
});
```

**Step 2: Register the router**

In `server/routers.ts`, add the import and mount point:

Add import at top:
```ts
import { tripPlannerRouter } from "./tripPlannerRouter";
```

Add to the `appRouter` object (after `financial: financialRouter,`):
```ts
  trip: tripPlannerRouter,
```

**Step 3: Type check**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && pnpm check`
Expected: No new errors

**Step 4: Commit**

```bash
cd /Users/pasuthunjunkong/workspace/thailand-hayom && git add server/tripPlannerRouter.ts server/routers.ts && git commit -m "feat: add trip planner tRPC router with save/list/share/delete"
```

---

## Task 7: Create TripPlanner Page Component (Shell)

**Files:**
- Create: `client/src/pages/TripPlanner.tsx`
- Modify: `client/src/App.tsx`

**Step 1: Create the page shell**

Create `client/src/pages/TripPlanner.tsx`:

```tsx
import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";
import type { TripDay, TripBudget, TripPlannerState } from "@shared/tripTypes";
import { calculateTotalBudget, calculateDayBudget } from "@shared/tripTypes";

const LOCAL_STORAGE_KEY = "trip-planner-state";

function createEmptyDay(dayNumber: number): TripDay {
  return {
    dayNumber,
    destinationId: "",
    activities: [],
    notes: "",
    notesHe: "",
  };
}

function getInitialState(): TripPlannerState {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return {
    title: "My Thailand Trip",
    titleHe: "הטיול שלי בתאילנד",
    startDate: null,
    totalDays: 3,
    days: [createEmptyDay(1), createEmptyDay(2), createEmptyDay(3)],
    budget: { accommodation: 0, food: 0, activities: 0, transport: 0 },
  };
}

export default function TripPlanner() {
  const { t, language } = useLanguage();
  const [state, setState] = useState<TripPlannerState>(getInitialState);

  // Auto-save to localStorage every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    }, 30000);
    return () => clearInterval(interval);
  }, [state]);

  // Recalculate budget when days change
  useEffect(() => {
    const budget = calculateTotalBudget(state.days);
    setState(prev => ({ ...prev, budget }));
  }, [state.days]);

  const addDay = useCallback(() => {
    setState(prev => ({
      ...prev,
      totalDays: prev.totalDays + 1,
      days: [...prev.days, createEmptyDay(prev.totalDays + 1)],
    }));
  }, []);

  const removeDay = useCallback(() => {
    if (state.totalDays <= 1) return;
    setState(prev => ({
      ...prev,
      totalDays: prev.totalDays - 1,
      days: prev.days.slice(0, -1),
    }));
  }, [state.totalDays]);

  const totalCost = state.budget.activities + state.budget.accommodation + state.budget.food + state.budget.transport;
  const avgPerDay = state.totalDays > 0 ? Math.round(totalCost / state.totalDays) : 0;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Trip Header */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">
            {t({ en: "Trip Planner", he: "מתכנן טיולים" })}
          </h1>
          <div className="flex items-center gap-4 flex-wrap">
            <Input
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60 max-w-xs"
              value={language === "he" ? state.titleHe : state.title}
              onChange={e => {
                const val = e.target.value;
                setState(prev => language === "he"
                  ? { ...prev, titleHe: val }
                  : { ...prev, title: val }
                );
              }}
            />
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" className="text-white" onClick={removeDay}>
                <Minus className="w-4 h-4" />
              </Button>
              <span className="font-medium">
                {state.totalDays} {t({ en: "days", he: "ימים" })}
              </span>
              <Button size="icon" variant="ghost" className="text-white" onClick={addDay}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="font-medium">
              {t({ en: "Budget", he: "תקציב" })}: ₪{totalCost.toLocaleString()}
              <span className="text-white/70 text-sm ml-2">
                (₪{avgPerDay}/{t({ en: "day", he: "יום" })})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Catalog + Timeline will go here */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <p className="text-muted-foreground text-center py-12">
          {t({ en: "Drag destinations and activities to build your itinerary", he: "גררו יעדים ופעילויות כדי לבנות את המסלול שלכם" })}
        </p>

        {/* Day Timeline Placeholder */}
        <div className="space-y-4">
          {state.days.map((day, i) => (
            <div key={i} className="border rounded-lg p-4">
              <h3 className="font-semibold">
                {t({ en: `Day ${day.dayNumber}`, he: `יום ${day.dayNumber}` })}
              </h3>
              <p className="text-sm text-muted-foreground">
                {day.activities.length} {t({ en: "activities", he: "פעילויות" })}
                {" · "}₪{calculateDayBudget(day)}
              </p>
            </div>
          ))}
        </div>

        {/* Add Day Button */}
        <Button variant="outline" className="w-full mt-4" onClick={addDay}>
          <Plus className="w-4 h-4 mr-2" />
          {t({ en: "Add Day", he: "הוסף יום" })}
        </Button>
      </div>
    </div>
  );
}
```

**Step 2: Register routes in App.tsx**

In `client/src/App.tsx`:

Add import:
```ts
import TripPlanner from "./pages/TripPlanner";
```

Add routes inside `<Switch>` (before the `<Route path="/404"` line):
```tsx
      <Route path="/trip-planner">
        <AnimatedRoute component={TripPlanner} />
      </Route>
```

**Step 3: Type check**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && pnpm check`
Expected: No new errors

**Step 4: Commit**

```bash
cd /Users/pasuthunjunkong/workspace/thailand-hayom && git add client/src/pages/TripPlanner.tsx client/src/App.tsx && git commit -m "feat: add TripPlanner page shell with header, day management, and budget display"
```

---

## Task 8: Build Destination Catalog Component

**Files:**
- Create: `client/src/components/trip-planner/DestinationCatalog.tsx`

**Step 1: Create the catalog component**

Create `client/src/components/trip-planner/DestinationCatalog.tsx`:

```tsx
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Search, GripVertical, Clock, Coins } from "lucide-react";
import { destinations, type Destination, type Activity } from "@shared/destinations";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function DraggableActivity({ activity }: { activity: Activity }) {
  const { t } = useLanguage();
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `catalog-${activity.id}`,
    data: { type: "activity", activity },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex items-center gap-2 bg-card border rounded-lg px-3 py-2 cursor-grab active:cursor-grabbing min-w-[200px] shadow-sm hover:shadow-md transition-shadow"
    >
      <GripVertical className="w-4 h-4 text-muted-foreground shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">
          {t({ en: activity.name, he: activity.nameHe })}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-0.5">
            <Coins className="w-3 h-3" /> ₪{activity.estimatedCostIls}
          </span>
          <span className="flex items-center gap-0.5">
            <Clock className="w-3 h-3" /> {activity.duration}
          </span>
        </div>
      </div>
    </div>
  );
}

interface DestinationCatalogProps {
  className?: string;
}

export default function DestinationCatalog({ className }: DestinationCatalogProps) {
  const { t } = useLanguage();
  const [selectedDestination, setSelectedDestination] = useState<Destination>(destinations[0]);
  const [search, setSearch] = useState("");

  const filteredDestinations = search
    ? destinations.filter(d =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.nameHe.includes(search)
      )
    : destinations;

  const filteredActivities = search
    ? selectedDestination.activities.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.nameHe.includes(search)
      )
    : selectedDestination.activities;

  return (
    <div className={className}>
      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder={t({ en: "Search destinations...", he: "חיפוש יעדים..." })}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Destination Tabs */}
      <ScrollArea className="w-full">
        <div className="flex gap-2 pb-3">
          {filteredDestinations.map(dest => (
            <Badge
              key={dest.id}
              variant={dest.id === selectedDestination.id ? "default" : "outline"}
              className="cursor-pointer whitespace-nowrap px-3 py-1.5"
              onClick={() => setSelectedDestination(dest)}
            >
              {t({ en: dest.name, he: dest.nameHe })}
            </Badge>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Activity Cards */}
      <ScrollArea className="w-full">
        <div className="flex gap-2 pb-2">
          {filteredActivities.map(activity => (
            <DraggableActivity key={activity.id} activity={activity} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
```

**Step 2: Commit**

```bash
cd /Users/pasuthunjunkong/workspace/thailand-hayom && git add client/src/components/trip-planner/DestinationCatalog.tsx && git commit -m "feat: add DestinationCatalog component with draggable activities"
```

---

## Task 9: Build DayColumn and DayTimeline Components

**Files:**
- Create: `client/src/components/trip-planner/DayColumn.tsx`
- Create: `client/src/components/trip-planner/ActivityCard.tsx`

**Step 1: Create ActivityCard component**

Create `client/src/components/trip-planner/ActivityCard.tsx`:

```tsx
import { useLanguage } from "@/contexts/LanguageContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X, Clock, Coins } from "lucide-react";
import type { TripActivity } from "@shared/tripTypes";

interface ActivityCardProps {
  activity: TripActivity;
  dayIndex: number;
  onRemove: () => void;
}

export default function ActivityCard({ activity, dayIndex, onRemove }: ActivityCardProps) {
  const { t } = useLanguage();
  const sortableId = `day-${dayIndex}-${activity.id}`;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: sortableId,
    data: { type: "placed-activity", activity, dayIndex },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 bg-card border rounded-lg px-3 py-2 shadow-sm"
    >
      <div {...listeners} {...attributes} className="cursor-grab active:cursor-grabbing">
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">
          {t({ en: activity.name, he: activity.nameHe })}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-0.5">
            <Coins className="w-3 h-3" /> ₪{activity.estimatedCostIls}
          </span>
          <span className="flex items-center gap-0.5">
            <Clock className="w-3 h-3" /> {activity.duration}
          </span>
        </div>
      </div>
      <button onClick={onRemove} className="text-muted-foreground hover:text-destructive p-1">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
```

**Step 2: Create DayColumn component**

Create `client/src/components/trip-planner/DayColumn.tsx`:

```tsx
import { useLanguage } from "@/contexts/LanguageContext";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { MapPin } from "lucide-react";
import { getDestinationById } from "@shared/destinations";
import { calculateDayBudget, type TripDay } from "@shared/tripTypes";
import ActivityCard from "./ActivityCard";

interface DayColumnProps {
  day: TripDay;
  dayIndex: number;
  onRemoveActivity: (dayIndex: number, activityIndex: number) => void;
}

export default function DayColumn({ day, dayIndex, onRemoveActivity }: DayColumnProps) {
  const { t } = useLanguage();
  const droppableId = `day-${dayIndex}`;
  const destination = day.destinationId ? getDestinationById(day.destinationId) : null;

  const { setNodeRef, isOver } = useDroppable({
    id: droppableId,
    data: { type: "day", dayIndex },
  });

  const sortableIds = day.activities.map((a, i) => `day-${dayIndex}-${a.id}`);
  const dayCost = calculateDayBudget(day);

  return (
    <div className={`border rounded-lg p-4 transition-colors ${isOver ? "border-teal-400 bg-teal-50/50" : ""}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-base">
          {t({ en: `Day ${day.dayNumber}`, he: `יום ${day.dayNumber}` })}
          {destination && (
            <span className="text-muted-foreground font-normal ml-2 text-sm">
              <MapPin className="w-3.5 h-3.5 inline-block mr-0.5" />
              {t({ en: destination.name, he: destination.nameHe })}
            </span>
          )}
        </h3>
        <span className="text-sm text-muted-foreground">₪{dayCost}</span>
      </div>

      <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="space-y-2 min-h-[60px]">
          {day.activities.length === 0 && (
            <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center text-sm text-muted-foreground">
              {t({ en: "Drop activities here", he: "גררו פעילויות לכאן" })}
            </div>
          )}
          {day.activities.map((activity, actIdx) => (
            <ActivityCard
              key={`${activity.id}-${actIdx}`}
              activity={activity}
              dayIndex={dayIndex}
              onRemove={() => onRemoveActivity(dayIndex, actIdx)}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
```

**Step 3: Commit**

```bash
cd /Users/pasuthunjunkong/workspace/thailand-hayom && git add client/src/components/trip-planner/ActivityCard.tsx client/src/components/trip-planner/DayColumn.tsx && git commit -m "feat: add ActivityCard and DayColumn components with DnD support"
```

---

## Task 10: Build BudgetSummary and TripActions Components

**Files:**
- Create: `client/src/components/trip-planner/BudgetSummary.tsx`
- Create: `client/src/components/trip-planner/TripActions.tsx`

**Step 1: Create BudgetSummary**

Create `client/src/components/trip-planner/BudgetSummary.tsx`:

```tsx
import { useLanguage } from "@/contexts/LanguageContext";
import type { TripBudget } from "@shared/tripTypes";

interface BudgetSummaryProps {
  budget: TripBudget;
  totalDays: number;
}

export default function BudgetSummary({ budget, totalDays }: BudgetSummaryProps) {
  const { t } = useLanguage();
  const total = budget.activities + budget.accommodation + budget.food + budget.transport;
  const avgPerDay = totalDays > 0 ? Math.round(total / totalDays) : 0;

  return (
    <div className="bg-card border rounded-lg p-4">
      <h3 className="font-semibold mb-2">
        {t({ en: "Budget Summary", he: "סיכום תקציב" })}
      </h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <span className="text-muted-foreground">{t({ en: "Activities", he: "פעילויות" })}</span>
        <span className="text-right">₪{budget.activities.toLocaleString()}</span>
        <span className="text-muted-foreground">{t({ en: "Accommodation", he: "לינה" })}</span>
        <span className="text-right">₪{budget.accommodation.toLocaleString()}</span>
        <span className="text-muted-foreground">{t({ en: "Food", he: "אוכל" })}</span>
        <span className="text-right">₪{budget.food.toLocaleString()}</span>
        <span className="text-muted-foreground">{t({ en: "Transport", he: "תחבורה" })}</span>
        <span className="text-right">₪{budget.transport.toLocaleString()}</span>
      </div>
      <div className="border-t mt-3 pt-3 flex justify-between font-semibold">
        <span>{t({ en: "Total", he: "סה\"כ" })}</span>
        <span>₪{total.toLocaleString()}</span>
      </div>
      <p className="text-xs text-muted-foreground text-right mt-1">
        ₪{avgPerDay}/{t({ en: "day avg", he: "יום בממוצע" })}
      </p>
    </div>
  );
}
```

**Step 2: Create TripActions**

Create `client/src/components/trip-planner/TripActions.tsx`:

```tsx
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Save, Share2, FileDown, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import type { TripPlannerState } from "@shared/tripTypes";

interface TripActionsProps {
  state: TripPlannerState;
  itineraryId: number | null;
  onSaved: (id: number, shareToken: string) => void;
}

export default function TripActions({ state, itineraryId, onSaved }: TripActionsProps) {
  const { t } = useLanguage();
  const authQuery = trpc.auth.me.useQuery();
  const isLoggedIn = !!authQuery.data;

  const saveMutation = trpc.trip.save.useMutation({
    onSuccess: (data) => {
      toast.success(t({ en: "Trip saved!", he: "הטיול נשמר!" }));
      onSaved(data.id, data.shareToken || "");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSave = () => {
    if (!isLoggedIn) {
      toast.error(t({ en: "Please log in to save your trip", he: "התחברו כדי לשמור את הטיול" }));
      return;
    }
    saveMutation.mutate({
      id: itineraryId ?? undefined,
      title: state.title,
      titleHe: state.titleHe,
      startDate: state.startDate,
      totalDays: state.totalDays,
      days: state.days,
      budget: state.budget,
    });
  };

  const handleShare = () => {
    if (!itineraryId) {
      toast.error(t({ en: "Save the trip first to share it", he: "שמרו את הטיול קודם כדי לשתף" }));
      return;
    }
    // shareToken is set after save
    toast.info(t({ en: "Share link copied!", he: "קישור שיתוף הועתק!" }));
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <Button onClick={handleSave} disabled={saveMutation.isPending}>
        {saveMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
        {t({ en: "Save", he: "שמור" })}
      </Button>
      <Button variant="outline" onClick={handleShare}>
        <Share2 className="w-4 h-4 mr-2" />
        {t({ en: "Share", he: "שתף" })}
      </Button>
      <Button variant="outline" disabled>
        <FileDown className="w-4 h-4 mr-2" />
        {t({ en: "Export PDF", he: "ייצוא PDF" })}
        <span className="ml-1 text-xs text-amber-600">{t({ en: "(Premium)", he: "(פרימיום)" })}</span>
      </Button>
    </div>
  );
}
```

**Step 3: Commit**

```bash
cd /Users/pasuthunjunkong/workspace/thailand-hayom && git add client/src/components/trip-planner/BudgetSummary.tsx client/src/components/trip-planner/TripActions.tsx && git commit -m "feat: add BudgetSummary and TripActions components"
```

---

## Task 11: Wire Up DnD in TripPlanner Page

**Files:**
- Modify: `client/src/pages/TripPlanner.tsx`

**Step 1: Replace TripPlanner.tsx with full DnD integration**

Replace the entire `client/src/pages/TripPlanner.tsx` with the complete implementation that:

1. Wraps everything in `<DndContext>` from @dnd-kit/core
2. Handles `onDragEnd` to move activities from catalog to days, or between days
3. Integrates DestinationCatalog, DayColumn, BudgetSummary, TripActions
4. Auto-detects destination for each day based on dropped activities

Key DnD logic for `onDragEnd`:

```ts
function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event;
  if (!over) return;

  const activeData = active.data.current;
  const overData = over.data.current;

  // Dropping from catalog onto a day
  if (activeData?.type === "activity" && overData?.type === "day") {
    const activity: TripActivity = activeData.activity;
    const dayIndex: number = overData.dayIndex;

    setState(prev => {
      const newDays = [...prev.days];
      const day = { ...newDays[dayIndex] };
      day.activities = [...day.activities, activity];
      // Auto-set destination from the activity's parent destination
      if (!day.destinationId) {
        const dest = destinations.find(d => d.activities.some(a => a.id === activity.id));
        if (dest) day.destinationId = dest.id;
      }
      newDays[dayIndex] = day;
      return { ...prev, days: newDays };
    });
  }
}
```

**Step 2: Type check**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && pnpm check`
Expected: No new errors

**Step 3: Commit**

```bash
cd /Users/pasuthunjunkong/workspace/thailand-hayom && git add client/src/pages/TripPlanner.tsx && git commit -m "feat: wire up DnD context in TripPlanner with catalog-to-day drops"
```

---

## Task 12: Add Navigation Link to Trip Planner

**Files:**
- Modify: `client/src/components/Navbar.tsx`

**Step 1: Add Trip Planner link**

Add a navigation link to the Navbar component. Look for existing nav items and add:

```tsx
<Link href="/trip-planner">
  {t({ en: "Trip Planner", he: "מתכנן טיולים" })}
</Link>
```

Place it in the nav items list alongside existing links like Blog, Articles, etc.

**Step 2: Commit**

```bash
cd /Users/pasuthunjunkong/workspace/thailand-hayom && git add client/src/components/Navbar.tsx && git commit -m "feat: add Trip Planner link to navigation"
```

---

## Task 13: Add Shared Trip View Route

**Files:**
- Create: `client/src/pages/SharedTrip.tsx`
- Modify: `client/src/App.tsx`

**Step 1: Create SharedTrip page**

Create `client/src/pages/SharedTrip.tsx`:

```tsx
import { useParams } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Coins, Copy } from "lucide-react";
import { toast } from "sonner";
import { getDestinationById } from "@shared/destinations";
import { calculateDayBudget, type TripDay } from "@shared/tripTypes";
import BudgetSummary from "@/components/trip-planner/BudgetSummary";

export default function SharedTrip() {
  const { token } = useParams<{ token: string }>();
  const { t, language } = useLanguage();

  const { data: trip, isLoading, error } = trpc.trip.getByShareToken.useQuery(
    { token: token || "" },
    { enabled: !!token }
  );

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (error || !trip) return <div className="p-8 text-center text-destructive">Trip not found</div>;

  const days = trip.days as TripDay[];
  const budget = trip.budget || { accommodation: 0, food: 0, activities: 0, transport: 0 };

  const handleCopy = () => {
    const stateJson = JSON.stringify({
      title: trip.title,
      titleHe: trip.titleHe,
      startDate: trip.startDate,
      totalDays: trip.totalDays,
      days,
      budget,
    });
    localStorage.setItem("trip-planner-state", stateJson);
    toast.success(t({ en: "Trip copied to your planner!", he: "הטיול הועתק למתכנן שלכם!" }));
    window.location.href = "/trip-planner";
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm opacity-80 mb-1">{t({ en: "Shared Trip", he: "טיול משותף" })}</p>
          <h1 className="text-2xl font-bold">
            {language === "he" ? trip.titleHe : trip.title}
          </h1>
          <p className="opacity-80">
            {trip.totalDays} {t({ en: "days", he: "ימים" })}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6 space-y-4">
        {days.map((day, i) => {
          const dest = day.destinationId ? getDestinationById(day.destinationId) : null;
          return (
            <div key={i} className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">
                {t({ en: `Day ${day.dayNumber}`, he: `יום ${day.dayNumber}` })}
                {dest && (
                  <span className="text-muted-foreground font-normal ml-2 text-sm">
                    <MapPin className="w-3.5 h-3.5 inline mr-0.5" />
                    {t({ en: dest.name, he: dest.nameHe })}
                  </span>
                )}
                <span className="float-right text-sm text-muted-foreground">₪{calculateDayBudget(day)}</span>
              </h3>
              <div className="space-y-2">
                {day.activities.map((a, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm bg-muted/50 rounded px-3 py-2">
                    <span className="flex-1">{t({ en: a.name, he: a.nameHe })}</span>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Coins className="w-3 h-3" /> ₪{a.estimatedCostIls}
                    </span>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {a.duration}
                    </span>
                  </div>
                ))}
                {day.activities.length === 0 && (
                  <p className="text-muted-foreground text-sm">{t({ en: "No activities planned", he: "לא תוכננו פעילויות" })}</p>
                )}
              </div>
            </div>
          );
        })}

        <BudgetSummary budget={budget} totalDays={trip.totalDays} />

        <Button onClick={handleCopy} className="w-full">
          <Copy className="w-4 h-4 mr-2" />
          {t({ en: "Copy This Trip to My Planner", he: "העתק טיול זה למתכנן שלי" })}
        </Button>
      </div>
    </div>
  );
}
```

**Step 2: Register route in App.tsx**

Add import:
```ts
import SharedTrip from "./pages/SharedTrip";
```

Add route (before `/404`):
```tsx
      <Route path="/trip-planner/shared/:token" component={SharedTrip} />
```

**Step 3: Commit**

```bash
cd /Users/pasuthunjunkong/workspace/thailand-hayom && git add client/src/pages/SharedTrip.tsx client/src/App.tsx && git commit -m "feat: add shared trip view with copy-to-planner functionality"
```

---

## Task 14: Final Integration & Smoke Test

**Files:**
- No new files — integration testing

**Step 1: Run type check**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && pnpm check`
Expected: No new errors (pre-existing newsletterRouter error is OK)

**Step 2: Run tests**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && pnpm test`
Expected: All tests pass (budget calculation tests + existing stripe tests)

**Step 3: Run build**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && pnpm build`
Expected: Build succeeds without errors

**Step 4: Start dev server and manually verify**

Run: `cd /Users/pasuthunjunkong/workspace/thailand-hayom && pnpm dev`

Manually verify:
- Navigate to `http://localhost:3000/trip-planner`
- Verify header renders with title, day counter, budget
- Verify destination catalog shows tabs and draggable activities
- Verify day columns render with drop zones
- Verify drag from catalog to day works
- Verify budget updates when activities are added
- Verify Hebrew toggle switches all labels

**Step 5: Final commit if any fixes needed**

```bash
cd /Users/pasuthunjunkong/workspace/thailand-hayom && git add -A && git commit -m "fix: integration fixes for trip planner"
```

---

## Summary of All Tasks

| # | Task | Files | Type |
|---|------|-------|------|
| 1 | Install DnD dependencies | package.json | Setup |
| 2 | Create destination & activity data | shared/destinations.ts, shared/activityCategories.ts | Data |
| 3 | Add itineraries table | drizzle/schema.ts | Schema |
| 4 | Create shared types | shared/tripTypes.ts | Types |
| 5 | Write budget tests | server/tripPlanner.test.ts | Test |
| 6 | Create tRPC router | server/tripPlannerRouter.ts, server/routers.ts | Backend |
| 7 | Create TripPlanner page shell | client/src/pages/TripPlanner.tsx, App.tsx | Frontend |
| 8 | Build DestinationCatalog | client/src/components/trip-planner/DestinationCatalog.tsx | Frontend |
| 9 | Build DayColumn + ActivityCard | trip-planner/DayColumn.tsx, ActivityCard.tsx | Frontend |
| 10 | Build BudgetSummary + TripActions | trip-planner/BudgetSummary.tsx, TripActions.tsx | Frontend |
| 11 | Wire up DnD in TripPlanner | client/src/pages/TripPlanner.tsx | Integration |
| 12 | Add nav link | Navbar.tsx | UI |
| 13 | Add shared trip view | SharedTrip.tsx, App.tsx | Frontend |
| 14 | Final integration & smoke test | — | Verification |

**Dependency graph:** `[1] → [2, 3, 4] → [5, 6] → [7] → [8, 9, 10] → [11] → [12, 13] → [14]`
