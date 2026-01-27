import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { events } from "../drizzle/schema";
import { eq, desc, and, gte, lte, or, like, sql } from "drizzle-orm";

// Helper function to generate URL-friendly slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export const eventRouter = router({
  // Get all events (public, with filters)
  list: publicProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(20),
      category: z.string().optional(),
      search: z.string().optional(),
      isPremium: z.boolean().optional(),
      isFeatured: z.boolean().optional(),
      upcoming: z.boolean().optional(), // Only future events
      startDate: z.string().optional(), // ISO date string
      endDate: z.string().optional(), // ISO date string
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const conditions = [];

      if (input.category) {
        conditions.push(eq(events.category, input.category));
      }

      if (input.isPremium !== undefined) {
        conditions.push(eq(events.isPremium, input.isPremium));
      }

      if (input.isFeatured !== undefined) {
        conditions.push(eq(events.isFeatured, input.isFeatured));
      }

      if (input.upcoming) {
        conditions.push(gte(events.eventDate, new Date()));
      }

      if (input.startDate) {
        conditions.push(gte(events.eventDate, new Date(input.startDate)));
      }

      if (input.endDate) {
        conditions.push(lte(events.eventDate, new Date(input.endDate)));
      }

      if (input.search) {
        conditions.push(
          or(
            like(events.title, `%${input.search}%`),
            like(events.titleHe, `%${input.search}%`),
            like(events.description, `%${input.search}%`)
          )!
        );
      }

      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

      const allEvents = await db
        .select()
        .from(events)
        .where(whereClause)
        .orderBy(desc(events.isFeatured), events.eventDate)
        .limit(input.limit)
        .offset((input.page - 1) * input.limit);

      const totalCount = await db
        .select({ count: sql<number>`count(*)` })
        .from(events)
        .where(whereClause);

      return {
        events: allEvents,
        total: Number(totalCount[0]?.count || 0),
        page: input.page,
        limit: input.limit,
      };
    }),

  // Get single event by slug (public)
  getBySlug: publicProcedure
    .input(z.object({
      slug: z.string(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const event = await db
        .select()
        .from(events)
        .where(eq(events.slug, input.slug))
        .limit(1);

      if (event.length === 0) {
        throw new Error("Event not found");
      }

      return event[0];
    }),

  // Get event by ID (admin only)
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

      const event = await db
        .select()
        .from(events)
        .where(eq(events.id, input.id))
        .limit(1);

      if (event.length === 0) {
        throw new Error("Event not found");
      }

      return event[0];
    }),

  // Create event (admin only)
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      titleHe: z.string().min(1),
      description: z.string().min(1),
      descriptionHe: z.string().min(1),
      location: z.string().optional(),
      locationHe: z.string().optional(),
      eventDate: z.string(), // ISO date string
      endDate: z.string().optional(), // ISO date string
      price: z.number().optional(),
      coverImage: z.string().optional(),
      category: z.string().optional(),
      isPremium: z.boolean().default(false),
      isFeatured: z.boolean().default(false),
      registrationUrl: z.string().optional(),
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
        .from(events)
        .where(eq(events.slug, slug))
        .limit(1);

      if (existing.length > 0) {
        slug = `${slug}-${Date.now()}`;
      }

      const newEvent = await db
        .insert(events)
        .values({
          ...input,
          slug,
          eventDate: new Date(input.eventDate),
          endDate: input.endDate ? new Date(input.endDate) : null,
        })
        .returning();

      return newEvent[0];
    }),

  // Update event (admin only)
  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().min(1).optional(),
      titleHe: z.string().min(1).optional(),
      description: z.string().min(1).optional(),
      descriptionHe: z.string().min(1).optional(),
      location: z.string().optional(),
      locationHe: z.string().optional(),
      eventDate: z.string().optional(), // ISO date string
      endDate: z.string().optional(), // ISO date string
      price: z.number().optional(),
      coverImage: z.string().optional(),
      category: z.string().optional(),
      isPremium: z.boolean().optional(),
      isFeatured: z.boolean().optional(),
      registrationUrl: z.string().optional(),
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
          .from(events)
          .where(and(
            eq(events.slug, newSlug),
            sql`${events.id} != ${id}`
          ))
          .limit(1);

        if (existing.length === 0) {
          (updateData as any).slug = newSlug;
        }
      }

      // Convert date strings to Date objects
      const finalUpdateData: any = { ...updateData };
      if (updateData.eventDate) {
        finalUpdateData.eventDate = new Date(updateData.eventDate);
      }
      if (updateData.endDate) {
        finalUpdateData.endDate = new Date(updateData.endDate);
      }

      const updated = await db
        .update(events)
        .set({
          ...finalUpdateData,
          updatedAt: new Date(),
        })
        .where(eq(events.id, id))
        .returning();

      if (updated.length === 0) {
        throw new Error("Event not found");
      }

      return updated[0];
    }),

  // Delete event (admin only)
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
        .delete(events)
        .where(eq(events.id, input.id))
        .returning();

      if (deleted.length === 0) {
        throw new Error("Event not found");
      }

      return { success: true };
    }),

  // Get event categories with counts (public)
  getCategories: publicProcedure
    .query(async () => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const categories = await db
        .select({
          category: events.category,
          count: sql<number>`count(*)`,
        })
        .from(events)
        .groupBy(events.category);

      return categories.filter(c => c.category !== null);
    }),

  // Get featured/upcoming events for homepage (public)
  getFeatured: publicProcedure
    .input(z.object({
      limit: z.number().default(6),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const featuredEvents = await db
        .select()
        .from(events)
        .where(and(
          eq(events.isFeatured, true),
          gte(events.eventDate, new Date())
        ))
        .orderBy(events.eventDate)
        .limit(input.limit);

      return featuredEvents;
    }),
});
