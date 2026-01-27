import { integer, pgEnum, pgTable, text, timestamp, varchar, boolean, serial } from "drizzle-orm/pg-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */

// Define enums for PostgreSQL
export const roleEnum = pgEnum("role", ["user", "admin"]);
export const tierEnum = pgEnum("tier", ["free", "premium"]);
export const subscriberStatusEnum = pgEnum("subscriber_status", ["active", "unsubscribed", "bounced"]);
export const subscriptionStatusEnum = pgEnum("subscription_status", ["active", "canceled", "expired", "past_due"]);

export const users = pgTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: serial("id").primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: roleEnum("role").default("user").notNull(),
  reputationPoints: integer("reputationPoints").default(0),
  postCount: integer("postCount").default(0),
  commentCount: integer("commentCount").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Newsletter and content tables
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  titleHe: varchar("titleHe", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  excerptHe: text("excerptHe"),
  content: text("content").notNull(),
  contentHe: text("contentHe").notNull(),
  category: varchar("category", { length: 100 }).notNull(), // Travel Tips, Visa Updates, Events, Food, Safety, Deals, Vegan, Where to Go, What to See
  coverImage: varchar("coverImage", { length: 500 }),
  authorId: integer("authorId").references(() => users.id).notNull(),
  isPremium: boolean("isPremium").default(false).notNull(),
  isPublished: boolean("isPublished").default(false).notNull(),
  views: integer("views").default(0),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const newsletterSubscribers = pgTable("newsletterSubscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  tier: tierEnum("tier").default("free").notNull(),
  status: subscriberStatusEnum("status").default("active").notNull(),
  userId: integer("userId").references(() => users.id), // Link to user account if they register
  subscribedAt: timestamp("subscribedAt").defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribedAt"),
  lastEmailSent: timestamp("lastEmailSent"),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  titleHe: varchar("titleHe", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  descriptionHe: text("descriptionHe").notNull(),
  location: varchar("location", { length: 255 }),
  locationHe: varchar("locationHe", { length: 255 }),
  eventDate: timestamp("eventDate").notNull(),
  endDate: timestamp("endDate"),
  price: integer("price"), // Price in shekels, null = free
  coverImage: varchar("coverImage", { length: 500 }),
  category: varchar("category", { length: 100 }), // Concert, Festival, Market, Workshop, etc.
  isPremium: boolean("isPremium").default(false).notNull(),
  isFeatured: boolean("isFeatured").default(false).notNull(),
  registrationUrl: varchar("registrationUrl", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const eventPackages = pgTable("eventPackages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  nameHe: varchar("nameHe", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  descriptionHe: text("descriptionHe").notNull(),
  price: integer("price").notNull(), // Price in shekels (15-29)
  coverImage: varchar("coverImage", { length: 500 }),
  contentUrl: varchar("contentUrl", { length: 500 }), // PDF guide URL
  eventsIncluded: text("eventsIncluded"), // JSON array of event IDs
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("userId").references(() => users.id).notNull(),
  subscriberId: integer("subscriberId").references(() => newsletterSubscribers.id),
  tier: tierEnum("tier").default("free").notNull(),
  status: subscriptionStatusEnum("status").default("active").notNull(),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }).unique(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  currentPeriodStart: timestamp("currentPeriodStart"),
  currentPeriodEnd: timestamp("currentPeriodEnd"),
  canceledAt: timestamp("canceledAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Article = typeof articles.$inferSelect;
export type InsertArticle = typeof articles.$inferInsert;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;
export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;
export type EventPackage = typeof eventPackages.$inferSelect;
export type InsertEventPackage = typeof eventPackages.$inferInsert;
export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

export const purchases = pgTable("purchases", {
  id: serial("id").primaryKey(),
  userId: integer("userId").references(() => users.id),
  stripeSessionId: varchar("stripeSessionId", { length: 255 }).unique().notNull(),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  productType: varchar("productType", { length: 50 }).notNull(),
  amount: integer("amount").notNull(),
  currency: varchar("currency", { length: 10 }).notNull(),
  customerEmail: varchar("customerEmail", { length: 320 }).notNull(),
  customerName: text("customerName"),
  status: varchar("status", { length: 50 }).notNull(),
  metadata: text("metadata"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export const chatLogs = pgTable("chatLogs", {
  id: serial("id").primaryKey(),
  userId: integer("userId").references(() => users.id),
  sessionId: varchar("sessionId", { length: 255 }).notNull(),
  userMessage: text("userMessage").notNull(),
  assistantMessage: text("assistantMessage").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const userProgress = pgTable("userProgress", {
  id: serial("id").primaryKey(),
  userId: integer("userId").references(() => users.id).notNull(),
  lessonId: integer("lessonId").notNull(),
  completed: boolean("completed").default(false).notNull(),
  quizScore: integer("quizScore"),
  lastAccessedAt: timestamp("lastAccessedAt").defaultNow().notNull(),
});

export const bookmarkedPhrases = pgTable("bookmarkedPhrases", {
  id: serial("id").primaryKey(),
  userId: integer("userId").references(() => users.id).notNull(),
  lessonId: integer("lessonId").notNull(),
  phraseIndex: integer("phraseIndex").notNull(),
  phraseText: text("phraseText").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Purchase = typeof purchases.$inferSelect;
export type InsertPurchase = typeof purchases.$inferInsert;
export type ChatLog = typeof chatLogs.$inferSelect;
export type InsertChatLog = typeof chatLogs.$inferInsert;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = typeof userProgress.$inferInsert;
export type BookmarkedPhrase = typeof bookmarkedPhrases.$inferSelect;
export type InsertBookmarkedPhrase = typeof bookmarkedPhrases.$inferInsert;

export const quizPerformance = pgTable("quizPerformance", {
  id: serial("id").primaryKey(),
  userId: integer("userId").references(() => users.id).notNull(),
  phraseId: integer("phraseId").notNull(),
  correct: integer("correct").default(0).notNull(),
  incorrect: integer("incorrect").default(0).notNull(),
  lastReviewed: timestamp("lastReviewed").defaultNow().notNull(),
  nextReview: timestamp("nextReview").defaultNow().notNull(),
  easinessFactor: integer("easinessFactor").default(250).notNull(), // SM-2 algorithm: 2.5 * 100
  interval: integer("interval").default(1).notNull(), // days until next review
  repetitions: integer("repetitions").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type QuizPerformance = typeof quizPerformance.$inferSelect;
export type InsertQuizPerformance = typeof quizPerformance.$inferInsert;

// Forum tables
export const forumCategories = pgTable("forumCategories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  nameHe: varchar("nameHe", { length: 100 }),
  description: text("description"),
  descriptionHe: text("descriptionHe"),
  icon: varchar("icon", { length: 50 }),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const forumPosts = pgTable("forumPosts", {
  id: serial("id").primaryKey(),
  userId: integer("userId").references(() => users.id).notNull(),
  categoryId: integer("categoryId").references(() => forumCategories.id).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  titleHe: varchar("titleHe", { length: 255 }),
  content: text("content").notNull(),
  contentHe: text("contentHe"),
  language: varchar("language", { length: 10 }).default("en"),
  likes: integer("likes").default(0),
  views: integer("views").default(0),
  isPinned: boolean("isPinned").default(false),
  isLocked: boolean("isLocked").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const forumComments = pgTable("forumComments", {
  id: serial("id").primaryKey(),
  postId: integer("postId").references(() => forumPosts.id).notNull(),
  userId: integer("userId").references(() => users.id).notNull(),
  content: text("content").notNull(),
  likes: integer("likes").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const forumLikes = pgTable("forumLikes", {
  id: serial("id").primaryKey(),
  userId: integer("userId").references(() => users.id).notNull(),
  postId: integer("postId").references(() => forumPosts.id),
  commentId: integer("commentId").references(() => forumComments.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ForumCategory = typeof forumCategories.$inferSelect;
export type InsertForumCategory = typeof forumCategories.$inferInsert;
export type ForumPost = typeof forumPosts.$inferSelect;
export type InsertForumPost = typeof forumPosts.$inferInsert;
export type ForumComment = typeof forumComments.$inferSelect;
export type InsertForumComment = typeof forumComments.$inferInsert;
export type ForumLike = typeof forumLikes.$inferSelect;
export type InsertForumLike = typeof forumLikes.$inferInsert;
