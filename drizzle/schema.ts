import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  reputationPoints: int("reputationPoints").default(0),
  postCount: int("postCount").default(0),
  commentCount: int("commentCount").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Newsletter and content tables
export const articles = mysqlTable("articles", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  titleHe: varchar("titleHe", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  excerptHe: text("excerptHe"),
  content: text("content").notNull(),
  contentHe: text("contentHe").notNull(),
  category: varchar("category", { length: 100 }).notNull(), // Travel Tips, Visa Updates, Events, Food, Safety, Deals, Vegan, Where to Go, What to See
  coverImage: varchar("coverImage", { length: 500 }),
  authorId: int("authorId").references(() => users.id).notNull(),
  isPremium: int("isPremium").default(0).notNull(), // 0 = free, 1 = premium only
  isPublished: int("isPublished").default(0).notNull(),
  views: int("views").default(0),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const newsletterSubscribers = mysqlTable("newsletterSubscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  tier: mysqlEnum("tier", ["free", "premium"]).default("free").notNull(),
  status: mysqlEnum("status", ["active", "unsubscribed", "bounced"]).default("active").notNull(),
  userId: int("userId").references(() => users.id), // Link to user account if they register
  subscribedAt: timestamp("subscribedAt").defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribedAt"),
  lastEmailSent: timestamp("lastEmailSent"),
});

export const events = mysqlTable("events", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  titleHe: varchar("titleHe", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  descriptionHe: text("descriptionHe").notNull(),
  location: varchar("location", { length: 255 }),
  locationHe: varchar("locationHe", { length: 255 }),
  eventDate: timestamp("eventDate").notNull(),
  endDate: timestamp("endDate"),
  price: int("price"), // Price in shekels, null = free
  coverImage: varchar("coverImage", { length: 500 }),
  category: varchar("category", { length: 100 }), // Concert, Festival, Market, Workshop, etc.
  isPremium: int("isPremium").default(0).notNull(), // 0 = visible to all, 1 = premium only
  isFeatured: int("isFeatured").default(0).notNull(),
  registrationUrl: varchar("registrationUrl", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const eventPackages = mysqlTable("eventPackages", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  nameHe: varchar("nameHe", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  descriptionHe: text("descriptionHe").notNull(),
  price: int("price").notNull(), // Price in shekels (15-29)
  coverImage: varchar("coverImage", { length: 500 }),
  contentUrl: varchar("contentUrl", { length: 500 }), // PDF guide URL
  eventsIncluded: text("eventsIncluded"), // JSON array of event IDs
  isActive: int("isActive").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id).notNull(),
  subscriberId: int("subscriberId").references(() => newsletterSubscribers.id),
  tier: mysqlEnum("tier", ["free", "premium"]).default("free").notNull(),
  status: mysqlEnum("status", ["active", "canceled", "expired", "past_due"]).default("active").notNull(),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }).unique(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  currentPeriodStart: timestamp("currentPeriodStart"),
  currentPeriodEnd: timestamp("currentPeriodEnd"),
  canceledAt: timestamp("canceledAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
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

export const purchases = mysqlTable("purchases", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id),
  stripeSessionId: varchar("stripeSessionId", { length: 255 }).unique().notNull(),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  productType: varchar("productType", { length: 50 }).notNull(),
  amount: int("amount").notNull(),
  currency: varchar("currency", { length: 10 }).notNull(),
  customerEmail: varchar("customerEmail", { length: 320 }).notNull(),
  customerName: text("customerName"),
  status: varchar("status", { length: 50 }).notNull(),
  metadata: text("metadata"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export const chatLogs = mysqlTable("chatLogs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id),
  sessionId: varchar("sessionId", { length: 255 }).notNull(),
  userMessage: text("userMessage").notNull(),
  assistantMessage: text("assistantMessage").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const userProgress = mysqlTable("userProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id).notNull(),
  lessonId: int("lessonId").notNull(),
  completed: int("completed").default(0).notNull(),
  quizScore: int("quizScore"),
  lastAccessedAt: timestamp("lastAccessedAt").defaultNow().notNull(),
});

export const bookmarkedPhrases = mysqlTable("bookmarkedPhrases", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id).notNull(),
  lessonId: int("lessonId").notNull(),
  phraseIndex: int("phraseIndex").notNull(),
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

export const quizPerformance = mysqlTable("quizPerformance", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id).notNull(),
  phraseId: int("phraseId").notNull(),
  correct: int("correct").default(0).notNull(),
  incorrect: int("incorrect").default(0).notNull(),
  lastReviewed: timestamp("lastReviewed").defaultNow().notNull(),
  nextReview: timestamp("nextReview").defaultNow().notNull(),
  easinessFactor: int("easinessFactor").default(250).notNull(), // SM-2 algorithm: 2.5 * 100
  interval: int("interval").default(1).notNull(), // days until next review
  repetitions: int("repetitions").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type QuizPerformance = typeof quizPerformance.$inferSelect;
export type InsertQuizPerformance = typeof quizPerformance.$inferInsert;

// Forum tables
export const forumCategories = mysqlTable("forumCategories", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  nameHe: varchar("nameHe", { length: 100 }),
  description: text("description"),
  descriptionHe: text("descriptionHe"),
  icon: varchar("icon", { length: 50 }),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const forumPosts = mysqlTable("forumPosts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id).notNull(),
  categoryId: int("categoryId").references(() => forumCategories.id).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  titleHe: varchar("titleHe", { length: 255 }),
  content: text("content").notNull(),
  contentHe: text("contentHe"),
  language: varchar("language", { length: 10 }).default("en"),
  likes: int("likes").default(0),
  views: int("views").default(0),
  isPinned: int("isPinned").default(0),
  isLocked: int("isLocked").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const forumComments = mysqlTable("forumComments", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("postId").references(() => forumPosts.id).notNull(),
  userId: int("userId").references(() => users.id).notNull(),
  content: text("content").notNull(),
  likes: int("likes").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const forumLikes = mysqlTable("forumLikes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id).notNull(),
  postId: int("postId").references(() => forumPosts.id),
  commentId: int("commentId").references(() => forumComments.id),
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