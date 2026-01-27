import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { newsletterSubscribers, subscriptions, users } from "../drizzle/schema";
import { eq, and, desc } from "drizzle-orm";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  return await resend.emails.send({
    from: 'Thailand Hayom <noreply@manus.space>',
    to,
    subject,
    html,
  });
}

export const newsletterRouter = router({
  // Subscribe to newsletter (free tier)
  subscribe: publicProcedure
    .input(z.object({
      email: z.string().email(),
      name: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      try {
        // Check if already subscribed
        const existing = await db
          .select()
          .from(newsletterSubscribers)
          .where(eq(newsletterSubscribers.email, input.email))
          .limit(1);

        if (existing.length > 0) {
          if (existing[0].status === "unsubscribed") {
            // Resubscribe
            await db
              .update(newsletterSubscribers)
              .set({
                status: "active",
                subscribedAt: new Date(),
                unsubscribedAt: null,
              })
              .where(eq(newsletterSubscribers.email, input.email));

            return { success: true, message: "Resubscribed successfully!" };
          }
          return { success: false, message: "Already subscribed" };
        }

        // Create new subscriber
        await db.insert(newsletterSubscribers).values({
          email: input.email,
          name: input.name,
          tier: "free",
          status: "active",
        });

        // Send welcome email
        try {
          await sendEmail({
            to: input.email,
            subject: "Welcome to Thailand Hayom! | ברוכים הבאים לתאילנד היום!",
            html: `
              <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #2563eb;">ברוכים הבאים לתאילנד היום!</h1>
                <p>שלום ${input.name || ""},</p>
                <p>תודה שהצטרפת לניוזלטר שלנו! כל שבוע תקבל:</p>
                <ul>
                  <li>חדשות ועדכונים מתאילנד</li>
                  <li>טיפים למטיילים</li>
                  <li>מדריכים מקומיים</li>
                  <li>אירועים ופסטיבלים</li>
                </ul>
                <p>הניוזלטר הבא בדרך אליך בקרוב!</p>
                <hr />
                <h2 style="color: #2563eb;">Welcome to Thailand Hayom!</h2>
                <p>Hello ${input.name || ""},</p>
                <p>Thanks for joining our newsletter! Every week you'll receive:</p>
                <ul>
                  <li>News and updates from Thailand</li>
                  <li>Travel tips</li>
                  <li>Local guides</li>
                  <li>Events and festivals</li>
                </ul>
                <p>Your next newsletter is coming soon!</p>
                <p style="margin-top: 30px; font-size: 12px; color: #666;">
                  <a href="${process.env.VITE_FRONTEND_FORGE_API_URL}/unsubscribe?email=${input.email}">Unsubscribe</a>
                </p>
              </div>
            `,
          });
        } catch (emailError) {
          console.error("Failed to send welcome email:", emailError);
          // Don't fail the subscription if email fails
        }

        return { success: true, message: "Subscribed successfully!" };
      } catch (error) {
        console.error("Newsletter subscription error:", error);
        throw new Error("Failed to subscribe");
      }
    }),

  // Unsubscribe from newsletter
  unsubscribe: publicProcedure
    .input(z.object({
      email: z.string().email(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db
        .update(newsletterSubscribers)
        .set({
          status: "unsubscribed",
          unsubscribedAt: new Date(),
        })
        .where(eq(newsletterSubscribers.email, input.email));

      return { success: true };
    }),

  // Get subscriber stats (admin only)
  getStats: protectedProcedure
    .query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const allSubscribers = await db.select().from(newsletterSubscribers);
      
      const stats = {
        total: allSubscribers.length,
        active: allSubscribers.filter(s => s.status === "active").length,
        free: allSubscribers.filter(s => s.tier === "free" && s.status === "active").length,
        premium: allSubscribers.filter(s => s.tier === "premium" && s.status === "active").length,
        unsubscribed: allSubscribers.filter(s => s.status === "unsubscribed").length,
      };

      return stats;
    }),

  // Get all subscribers (admin only)
  getSubscribers: protectedProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(50),
      tier: z.enum(["all", "free", "premium"]).default("all"),
    }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      let query = db
        .select()
        .from(newsletterSubscribers)
        .orderBy(desc(newsletterSubscribers.subscribedAt))
        .limit(input.limit)
        .offset((input.page - 1) * input.limit);

      if (input.tier !== "all") {
        query = query.where(eq(newsletterSubscribers.tier, input.tier)) as any;
      }

      const subscribers = await query;
      return subscribers;
    }),
});
