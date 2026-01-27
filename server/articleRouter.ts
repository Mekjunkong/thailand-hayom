import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { articles, users } from "../drizzle/schema";
import { eq, desc, and, or, like, sql } from "drizzle-orm";

// Helper function to generate URL-friendly slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export const articleRouter = router({
  // Get all articles (public, with filters)
  list: publicProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(20),
      category: z.string().optional(),
      search: z.string().optional(),
      isPremium: z.boolean().optional(),
      isPublished: z.boolean().optional().default(true), // Only show published by default
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const conditions = [];

      if (input.isPublished !== undefined) {
        conditions.push(eq(articles.isPublished, input.isPublished));
      }

      if (input.category) {
        conditions.push(eq(articles.category, input.category));
      }

      if (input.isPremium !== undefined) {
        conditions.push(eq(articles.isPremium, input.isPremium));
      }

      if (input.search) {
        conditions.push(
          or(
            like(articles.title, `%${input.search}%`),
            like(articles.titleHe, `%${input.search}%`),
            like(articles.content, `%${input.search}%`)
          )!
        );
      }

      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

      const allArticles = await db
        .select({
          id: articles.id,
          title: articles.title,
          titleHe: articles.titleHe,
          slug: articles.slug,
          excerpt: articles.excerpt,
          excerptHe: articles.excerptHe,
          category: articles.category,
          coverImage: articles.coverImage,
          isPremium: articles.isPremium,
          isPublished: articles.isPublished,
          views: articles.views,
          publishedAt: articles.publishedAt,
          createdAt: articles.createdAt,
          authorId: articles.authorId,
        })
        .from(articles)
        .where(whereClause)
        .orderBy(desc(articles.publishedAt), desc(articles.createdAt))
        .limit(input.limit)
        .offset((input.page - 1) * input.limit);

      const totalCount = await db
        .select({ count: sql<number>`count(*)` })
        .from(articles)
        .where(whereClause);

      return {
        articles: allArticles,
        total: Number(totalCount[0]?.count || 0),
        page: input.page,
        limit: input.limit,
      };
    }),

  // Get single article by slug (public)
  getBySlug: publicProcedure
    .input(z.object({
      slug: z.string(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const article = await db
        .select()
        .from(articles)
        .where(eq(articles.slug, input.slug))
        .limit(1);

      if (article.length === 0) {
        throw new Error("Article not found");
      }

      // Increment view count
      await db
        .update(articles)
        .set({ views: sql`${articles.views} + 1` })
        .where(eq(articles.id, article[0].id));

      // Get author info
      const author = await db
        .select({ id: users.id, name: users.name })
        .from(users)
        .where(eq(users.id, article[0].authorId))
        .limit(1);

      return {
        ...article[0],
        author: author[0] || null,
      };
    }),

  // Get article by ID (admin only)
  getById: protectedProcedure
    .input(z.object({
      id: z.number(),
    }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const article = await db
        .select()
        .from(articles)
        .where(eq(articles.id, input.id))
        .limit(1);

      if (article.length === 0) {
        throw new Error("Article not found");
      }

      return article[0];
    }),

  // Create article (admin only)
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      titleHe: z.string().min(1),
      excerpt: z.string().optional(),
      excerptHe: z.string().optional(),
      content: z.string().min(1),
      contentHe: z.string().min(1),
      category: z.string().min(1),
      coverImage: z.string().optional(),
      isPremium: z.boolean().default(false),
      isPublished: z.boolean().default(false),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Generate slug from English title
      let slug = generateSlug(input.title);

      // Ensure slug is unique
      const existing = await db
        .select()
        .from(articles)
        .where(eq(articles.slug, slug))
        .limit(1);

      if (existing.length > 0) {
        slug = `${slug}-${Date.now()}`;
      }

      const newArticle = await db
        .insert(articles)
        .values({
          ...input,
          slug,
          authorId: ctx.user.id,
          publishedAt: input.isPublished ? new Date() : null,
        })
        .returning();

      return newArticle[0];
    }),

  // Update article (admin only)
  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().min(1).optional(),
      titleHe: z.string().min(1).optional(),
      excerpt: z.string().optional(),
      excerptHe: z.string().optional(),
      content: z.string().min(1).optional(),
      contentHe: z.string().min(1).optional(),
      category: z.string().min(1).optional(),
      coverImage: z.string().optional(),
      isPremium: z.boolean().optional(),
      isPublished: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const { id, ...updateData } = input;

      // If title changed, regenerate slug
      if (updateData.title) {
        const newSlug = generateSlug(updateData.title);
        const existing = await db
          .select()
          .from(articles)
          .where(and(
            eq(articles.slug, newSlug),
            sql`${articles.id} != ${id}`
          ))
          .limit(1);

        if (existing.length === 0) {
          (updateData as any).slug = newSlug;
        }
      }

      // If publishing for the first time, set publishedAt
      if (updateData.isPublished) {
        const current = await db
          .select()
          .from(articles)
          .where(eq(articles.id, id))
          .limit(1);

        if (current.length > 0 && !current[0].publishedAt) {
          (updateData as any).publishedAt = new Date();
        }
      }

      const updated = await db
        .update(articles)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(eq(articles.id, id))
        .returning();

      if (updated.length === 0) {
        throw new Error("Article not found");
      }

      return updated[0];
    }),

  // Delete article (admin only)
  delete: protectedProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const deleted = await db
        .delete(articles)
        .where(eq(articles.id, input.id))
        .returning();

      if (deleted.length === 0) {
        throw new Error("Article not found");
      }

      return { success: true };
    }),

  // Get article categories with counts (public)
  getCategories: publicProcedure
    .query(async () => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const categories = await db
        .select({
          category: articles.category,
          count: sql<number>`count(*)`,
        })
        .from(articles)
        .where(eq(articles.isPublished, true))
        .groupBy(articles.category);

      return categories;
    }),
});
