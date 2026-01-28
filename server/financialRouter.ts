import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { purchases, subscriptions, newsletterSubscribers, users } from "../drizzle/schema";
import { eq, desc, gte, lte, and, sql, between } from "drizzle-orm";

export const financialRouter = router({
  // Get revenue overview
  getRevenueOverview: protectedProcedure
    .input(z.object({
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const conditions = [eq(purchases.status, "completed")];

      if (input.startDate) {
        conditions.push(gte(purchases.completedAt, new Date(input.startDate)));
      }
      if (input.endDate) {
        conditions.push(lte(purchases.completedAt, new Date(input.endDate)));
      }

      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

      // Total revenue
      const revenueData = await db
        .select({
          totalRevenue: sql<number>`COALESCE(SUM(${purchases.amount}), 0)`,
          totalTransactions: sql<number>`COUNT(*)`,
        })
        .from(purchases)
        .where(whereClause);

      // Revenue by product type
      const revenueByProduct = await db
        .select({
          productType: purchases.productType,
          revenue: sql<number>`SUM(${purchases.amount})`,
          count: sql<number>`COUNT(*)`,
        })
        .from(purchases)
        .where(whereClause)
        .groupBy(purchases.productType);

      // Daily revenue for chart (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const dailyRevenue = await db
        .select({
          date: sql<string>`DATE(${purchases.completedAt})`,
          revenue: sql<number>`SUM(${purchases.amount})`,
          transactions: sql<number>`COUNT(*)`,
        })
        .from(purchases)
        .where(and(
          eq(purchases.status, "completed"),
          gte(purchases.completedAt, thirtyDaysAgo)
        ))
        .groupBy(sql`DATE(${purchases.completedAt})`)
        .orderBy(sql`DATE(${purchases.completedAt})`);

      return {
        totalRevenue: revenueData[0]?.totalRevenue || 0,
        totalTransactions: revenueData[0]?.totalTransactions || 0,
        revenueByProduct,
        dailyRevenue,
      };
    }),

  // Get subscription analytics
  getSubscriptionAnalytics: protectedProcedure
    .query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Active subscriptions by tier
      const activeSubscriptions = await db
        .select({
          tier: subscriptions.tier,
          count: sql<number>`COUNT(*)`,
          mrr: sql<number>`SUM(CASE WHEN ${subscriptions.status} = 'active' THEN 0 ELSE 0 END)`, // Placeholder for MRR calculation
        })
        .from(subscriptions)
        .where(eq(subscriptions.status, "active"))
        .groupBy(subscriptions.tier);

      // Newsletter subscriber tiers
      const subscriberTiers = await db
        .select({
          tier: newsletterSubscribers.tier,
          status: newsletterSubscribers.status,
          count: sql<number>`COUNT(*)`,
        })
        .from(newsletterSubscribers)
        .groupBy(newsletterSubscribers.tier, newsletterSubscribers.status);

      // Subscription churn (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const churnedSubscriptions = await db
        .select({
          count: sql<number>`COUNT(*)`,
        })
        .from(subscriptions)
        .where(and(
          eq(subscriptions.status, "canceled"),
          gte(subscriptions.canceledAt, thirtyDaysAgo)
        ));

      // New subscriptions (last 30 days)
      const newSubscriptions = await db
        .select({
          count: sql<number>`COUNT(*)`,
        })
        .from(subscriptions)
        .where(gte(subscriptions.createdAt, thirtyDaysAgo));

      return {
        activeSubscriptions,
        subscriberTiers,
        churnCount: churnedSubscriptions[0]?.count || 0,
        newSubscriptionsCount: newSubscriptions[0]?.count || 0,
      };
    }),

  // Get recent transactions
  getRecentTransactions: protectedProcedure
    .input(z.object({
      limit: z.number().default(50),
      offset: z.number().default(0),
      status: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const conditions = [];
      if (input.status) {
        conditions.push(eq(purchases.status, input.status));
      }

      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

      const transactions = await db
        .select()
        .from(purchases)
        .where(whereClause)
        .orderBy(desc(purchases.createdAt))
        .limit(input.limit)
        .offset(input.offset);

      const totalCount = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(purchases)
        .where(whereClause);

      return {
        transactions,
        total: totalCount[0]?.count || 0,
      };
    }),

  // Get financial insights (AI-ready data)
  getFinancialInsights: protectedProcedure
    .query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const now = new Date();
      const lastMonth = new Date(now);
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      const twoMonthsAgo = new Date(now);
      twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

      // Current month revenue
      const currentMonthRevenue = await db
        .select({
          revenue: sql<number>`COALESCE(SUM(${purchases.amount}), 0)`,
          count: sql<number>`COUNT(*)`,
        })
        .from(purchases)
        .where(and(
          eq(purchases.status, "completed"),
          gte(purchases.completedAt, new Date(now.getFullYear(), now.getMonth(), 1))
        ));

      // Last month revenue
      const lastMonthRevenue = await db
        .select({
          revenue: sql<number>`COALESCE(SUM(${purchases.amount}), 0)`,
          count: sql<number>`COUNT(*)`,
        })
        .from(purchases)
        .where(and(
          eq(purchases.status, "completed"),
          gte(purchases.completedAt, new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1)),
          lte(purchases.completedAt, new Date(now.getFullYear(), now.getMonth(), 1))
        ));

      // Average transaction value
      const avgTransactionValue = await db
        .select({
          avg: sql<number>`COALESCE(AVG(${purchases.amount}), 0)`,
        })
        .from(purchases)
        .where(eq(purchases.status, "completed"));

      // Top customers
      const topCustomers = await db
        .select({
          email: purchases.customerEmail,
          totalSpent: sql<number>`SUM(${purchases.amount})`,
          transactionCount: sql<number>`COUNT(*)`,
        })
        .from(purchases)
        .where(eq(purchases.status, "completed"))
        .groupBy(purchases.customerEmail)
        .orderBy(desc(sql`SUM(${purchases.amount})`))
        .limit(10);

      // Calculate growth rate
      const currentRevenue = currentMonthRevenue[0]?.revenue || 0;
      const previousRevenue = lastMonthRevenue[0]?.revenue || 0;
      const growthRate = previousRevenue > 0
        ? ((currentRevenue - previousRevenue) / previousRevenue) * 100
        : 0;

      // Active subscribers
      const activeSubscribers = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(newsletterSubscribers)
        .where(eq(newsletterSubscribers.status, "active"));

      return {
        currentMonth: {
          revenue: currentRevenue,
          transactions: currentMonthRevenue[0]?.count || 0,
        },
        lastMonth: {
          revenue: previousRevenue,
          transactions: lastMonthRevenue[0]?.count || 0,
        },
        growthRate,
        avgTransactionValue: avgTransactionValue[0]?.avg || 0,
        topCustomers,
        activeSubscribers: activeSubscribers[0]?.count || 0,
      };
    }),

  // Get revenue by time period
  getRevenueTrends: protectedProcedure
    .input(z.object({
      period: z.enum(["day", "week", "month"]),
      limit: z.number().default(30),
    }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      let groupBy: any;
      let startDate = new Date();

      switch (input.period) {
        case "day":
          groupBy = sql`DATE(${purchases.completedAt})`;
          startDate.setDate(startDate.getDate() - input.limit);
          break;
        case "week":
          groupBy = sql`DATE_TRUNC('week', ${purchases.completedAt})`;
          startDate.setDate(startDate.getDate() - (input.limit * 7));
          break;
        case "month":
          groupBy = sql`DATE_TRUNC('month', ${purchases.completedAt})`;
          startDate.setMonth(startDate.getMonth() - input.limit);
          break;
      }

      const trends = await db
        .select({
          period: groupBy,
          revenue: sql<number>`SUM(${purchases.amount})`,
          transactions: sql<number>`COUNT(*)`,
          avgTransactionValue: sql<number>`AVG(${purchases.amount})`,
        })
        .from(purchases)
        .where(and(
          eq(purchases.status, "completed"),
          gte(purchases.completedAt, startDate)
        ))
        .groupBy(groupBy)
        .orderBy(groupBy);

      return trends;
    }),

  // Export financial data
  exportFinancialData: protectedProcedure
    .input(z.object({
      startDate: z.string(),
      endDate: z.string(),
      format: z.enum(["csv", "json"]),
    }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const transactions = await db
        .select()
        .from(purchases)
        .where(and(
          gte(purchases.createdAt, new Date(input.startDate)),
          lte(purchases.createdAt, new Date(input.endDate))
        ))
        .orderBy(desc(purchases.createdAt));

      if (input.format === "csv") {
        // Convert to CSV format
        const headers = ["Date", "Customer Email", "Product Type", "Amount", "Status", "Transaction ID"];
        const rows = transactions.map(t => [
          t.createdAt.toISOString(),
          t.customerEmail,
          t.productType,
          (t.amount / 100).toFixed(2),
          t.status,
          t.stripeSessionId,
        ]);

        const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
        return { format: "csv", data: csv };
      }

      return { format: "json", data: transactions };
    }),

  // Get customer lifetime value
  getCustomerLifetimeValue: protectedProcedure
    .query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const customerValues = await db
        .select({
          email: purchases.customerEmail,
          totalSpent: sql<number>`SUM(${purchases.amount})`,
          transactionCount: sql<number>`COUNT(*)`,
          firstPurchase: sql<string>`MIN(${purchases.createdAt})`,
          lastPurchase: sql<string>`MAX(${purchases.createdAt})`,
        })
        .from(purchases)
        .where(eq(purchases.status, "completed"))
        .groupBy(purchases.customerEmail)
        .orderBy(desc(sql`SUM(${purchases.amount})`));

      // Calculate average LTV
      const avgLTV = customerValues.length > 0
        ? customerValues.reduce((sum, c) => sum + c.totalSpent, 0) / customerValues.length
        : 0;

      return {
        customers: customerValues,
        avgLifetimeValue: avgLTV,
        totalCustomers: customerValues.length,
      };
    }),
});
