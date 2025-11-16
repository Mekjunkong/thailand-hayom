import { protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { purchases, chatLogs, users } from "../drizzle/schema";
import { eq, desc, count, sum, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const adminRouter = router({
  // Check if user is admin
  isAdmin: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user.role === "admin";
  }),

  // Get payment analytics
  getPaymentAnalytics: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
    }

    const db = await getDb();
    if (!db) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
    }

    const totalRevenue = await db
      .select({ total: sum(purchases.amount) })
      .from(purchases)
      .where(eq(purchases.status, "completed"));

    const totalTransactions = await db
      .select({ count: count() })
      .from(purchases)
      .where(eq(purchases.status, "completed"));

    const recentPurchases = await db
      .select()
      .from(purchases)
      .orderBy(desc(purchases.createdAt))
      .limit(10);

    const productBreakdown = await db
      .select({
        productType: purchases.productType,
        count: count(),
        revenue: sum(purchases.amount),
      })
      .from(purchases)
      .where(eq(purchases.status, "completed"))
      .groupBy(purchases.productType);

    return {
      totalRevenue: totalRevenue[0]?.total || 0,
      totalTransactions: totalTransactions[0]?.count || 0,
      recentPurchases,
      productBreakdown,
    };
  }),

  // Get chat logs
  getChatLogs: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
      }

      const db = await getDb();
      if (!db) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      }

      const logs = await db
        .select()
        .from(chatLogs)
        .orderBy(desc(chatLogs.createdAt))
        .limit(input.limit)
        .offset(input.offset);

      const totalCount = await db.select({ count: count() }).from(chatLogs);

      return {
        logs,
        total: totalCount[0]?.count || 0,
      };
    }),

  // Get all users
  getUsers: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
    }

    const db = await getDb();
    if (!db) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
    }

    return await db.select().from(users).orderBy(desc(users.createdAt));
  }),

  // Get bulk orders (purchases with quantity > 1)
  getBulkOrders: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
    }

    const db = await getDb();
    if (!db) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
    }

    return await db
      .select()
      .from(purchases)
      .where(sql`${purchases.productType} IN ('bulk_10', 'bulk_20')`)
      .orderBy(desc(purchases.createdAt));
  }),
});
