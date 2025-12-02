import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { forumCategories } from "./drizzle/schema.js";

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

const categories = [
  {
    name: "Tips & Tricks",
    nameHe: "טיפים וטריקים",
    description: "Share your best Thailand travel tips",
    descriptionHe: "שתף את הטיפים הטובים ביותר שלך לטיול בתאילנד",
    icon: "💡",
    slug: "tips-tricks"
  },
  {
    name: "Questions & Help",
    nameHe: "שאלות ועזרה",
    description: "Ask anything about traveling in Thailand",
    descriptionHe: "שאל כל דבר על טיול בתאילנד",
    icon: "❓",
    slug: "questions-help"
  },
  {
    name: "Trip Reports",
    nameHe: "דוחות טיול",
    description: "Share your Thailand travel stories",
    descriptionHe: "שתף את סיפורי הטיול שלך בתאילנד",
    icon: "📝",
    slug: "trip-reports"
  },
  {
    name: "Photos & Videos",
    nameHe: "תמונות וסרטונים",
    description: "Show us your Thailand adventures",
    descriptionHe: "הראה לנו את ההרפתקאות שלך בתאילנד",
    icon: "📸",
    slug: "photos-videos"
  },
  {
    name: "Accommodation",
    nameHe: "לינה",
    description: "Hotel and hostel recommendations",
    descriptionHe: "המלצות על מלונות ואכסניות",
    icon: "🏨",
    slug: "accommodation"
  },
  {
    name: "Food & Restaurants",
    nameHe: "אוכל ומסעדות",
    description: "Best places to eat in Thailand",
    descriptionHe: "המקומות הטובים ביותר לאכול בתאילנד",
    icon: "🍜",
    slug: "food-restaurants"
  },
  {
    name: "Nightlife & Parties",
    nameHe: "חיי לילה ומסיבות",
    description: "Where to party in Thailand",
    descriptionHe: "איפה לחגוג בתאילנד",
    icon: "🎉",
    slug: "nightlife-parties"
  },
  {
    name: "Beaches & Islands",
    nameHe: "חופים ואיים",
    description: "Best beaches and islands to visit",
    descriptionHe: "החופים והאיים הטובים ביותר לבקר",
    icon: "🏖️",
    slug: "beaches-islands"
  }
];

console.log("Seeding forum categories...");

for (const category of categories) {
  await db.insert(forumCategories).values(category).execute();
  console.log(`✓ Created category: ${category.name}`);
}

console.log("\n✅ Forum categories seeded successfully!");
await connection.end();
