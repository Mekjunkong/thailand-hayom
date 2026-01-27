import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { userProgress, bookmarkedPhrases, purchases } from "../drizzle/schema";
import { eq, and, desc } from "drizzle-orm";

export const userRouter = router({
  // Get user's lesson progress
  getProgress: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    const progress = await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, ctx.user.id));

    return progress;
  }),

  // Save lesson progress
  saveProgress: protectedProcedure
    .input(
      z.object({
        lessonId: z.number(),
        completed: z.boolean(),
        quizScore: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Check if progress exists
      const existing = await db
        .select()
        .from(userProgress)
        .where(
          and(
            eq(userProgress.userId, ctx.user.id),
            eq(userProgress.lessonId, input.lessonId)
          )
        );

      if (existing.length > 0) {
        // Update existing
        await db
          .update(userProgress)
          .set({
            completed: input.completed,
            quizScore: input.quizScore,
            lastAccessedAt: new Date(),
          })
          .where(
            and(
              eq(userProgress.userId, ctx.user.id),
              eq(userProgress.lessonId, input.lessonId)
            )
          );
      } else {
        // Insert new
        await db.insert(userProgress).values({
          userId: ctx.user.id,
          lessonId: input.lessonId,
          completed: input.completed,
          quizScore: input.quizScore,
        });
      }

      return { success: true };
    }),

  // Get bookmarked phrases
  getBookmarks: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    const bookmarks = await db
      .select()
      .from(bookmarkedPhrases)
      .where(eq(bookmarkedPhrases.userId, ctx.user.id))
      .orderBy(desc(bookmarkedPhrases.createdAt));

    return bookmarks;
  }),

  // Add bookmark
  addBookmark: protectedProcedure
    .input(
      z.object({
        lessonId: z.number(),
        phraseIndex: z.number(),
        phraseText: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Check if already bookmarked
      const existing = await db
        .select()
        .from(bookmarkedPhrases)
        .where(
          and(
            eq(bookmarkedPhrases.userId, ctx.user.id),
            eq(bookmarkedPhrases.lessonId, input.lessonId),
            eq(bookmarkedPhrases.phraseIndex, input.phraseIndex)
          )
        );

      if (existing.length > 0) {
        return { success: true, message: "Already bookmarked" };
      }

      await db.insert(bookmarkedPhrases).values({
        userId: ctx.user.id,
        lessonId: input.lessonId,
        phraseIndex: input.phraseIndex,
        phraseText: input.phraseText,
      });

      return { success: true, message: "Bookmark added" };
    }),

  // Remove bookmark
  removeBookmark: protectedProcedure
    .input(z.object({ bookmarkId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db
        .delete(bookmarkedPhrases)
        .where(
          and(
            eq(bookmarkedPhrases.id, input.bookmarkId),
            eq(bookmarkedPhrases.userId, ctx.user.id)
          )
        );

      return { success: true };
    }),

  // Get purchase history
  getPurchaseHistory: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    const history = await db
      .select()
      .from(purchases)
      .where(eq(purchases.userId, ctx.user.id))
      .orderBy(desc(purchases.createdAt));

    return history;
  }),
});
