import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { newsletterSubscribers, subscriptions, users, articles, events } from "../drizzle/schema";
import { eq, and, desc, inArray } from "drizzle-orm";
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

  // Send newsletter (admin only)
  sendNewsletter: protectedProcedure
    .input(z.object({
      subject: z.string().min(1),
      subjectHe: z.string().min(1),
      articleIds: z.array(z.number()).optional(),
      eventIds: z.array(z.number()).optional(),
      customContent: z.string().optional(),
      customContentHe: z.string().optional(),
      tier: z.enum(["all", "free", "premium"]).default("all"),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Get selected articles
      let selectedArticles: any[] = [];
      if (input.articleIds && input.articleIds.length > 0) {
        selectedArticles = await db
          .select()
          .from(articles)
          .where(inArray(articles.id, input.articleIds));
      }

      // Get selected events
      let selectedEvents: any[] = [];
      if (input.eventIds && input.eventIds.length > 0) {
        selectedEvents = await db
          .select()
          .from(events)
          .where(inArray(events.id, input.eventIds));
      }

      // Get subscribers based on tier
      let subscribersQuery = db
        .select()
        .from(newsletterSubscribers)
        .where(eq(newsletterSubscribers.status, "active"));

      if (input.tier !== "all") {
        subscribersQuery = subscribersQuery.where(eq(newsletterSubscribers.tier, input.tier)) as any;
      }

      const subscribers = await subscribersQuery;

      if (subscribers.length === 0) {
        throw new Error("No active subscribers found");
      }

      // Generate newsletter HTML
      const newsletterHtml = generateNewsletterHTML({
        articles: selectedArticles,
        events: selectedEvents,
        customContent: input.customContent,
        customContentHe: input.customContentHe,
      });

      // Send email to all subscribers (in batches to avoid rate limits)
      const batchSize = 50;
      let sentCount = 0;
      let failedCount = 0;

      for (let i = 0; i < subscribers.length; i += batchSize) {
        const batch = subscribers.slice(i, i + batchSize);

        await Promise.allSettled(
          batch.map(async (subscriber) => {
            try {
              await sendEmail({
                to: subscriber.email,
                subject: `${input.subjectHe} | ${input.subject}`,
                html: newsletterHtml,
              });

              // Update lastEmailSent
              await db
                .update(newsletterSubscribers)
                .set({ lastEmailSent: new Date() })
                .where(eq(newsletterSubscribers.id, subscriber.id));

              sentCount++;
            } catch (error) {
              console.error(`Failed to send to ${subscriber.email}:`, error);
              failedCount++;
            }
          })
        );

        // Small delay between batches to respect rate limits
        if (i + batchSize < subscribers.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      return {
        success: true,
        sentCount,
        failedCount,
        totalSubscribers: subscribers.length,
      };
    }),

  // Preview newsletter HTML (admin only)
  previewNewsletter: protectedProcedure
    .input(z.object({
      articleIds: z.array(z.number()).optional(),
      eventIds: z.array(z.number()).optional(),
      customContent: z.string().optional(),
      customContentHe: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Get selected articles
      let selectedArticles: any[] = [];
      if (input.articleIds && input.articleIds.length > 0) {
        selectedArticles = await db
          .select()
          .from(articles)
          .where(inArray(articles.id, input.articleIds));
      }

      // Get selected events
      let selectedEvents: any[] = [];
      if (input.eventIds && input.eventIds.length > 0) {
        selectedEvents = await db
          .select()
          .from(events)
          .where(inArray(events.id, input.eventIds));
      }

      // Generate newsletter HTML
      const newsletterHtml = generateNewsletterHTML({
        articles: selectedArticles,
        events: selectedEvents,
        customContent: input.customContent,
        customContentHe: input.customContentHe,
      });

      return { html: newsletterHtml };
    }),
});

// Helper function to generate newsletter HTML
function generateNewsletterHTML({
  articles,
  events,
  customContent,
  customContentHe,
}: {
  articles: any[];
  events: any[];
  customContent?: string;
  customContentHe?: string;
}) {
  const frontendUrl = process.env.VITE_FRONTEND_FORGE_API_URL || "http://localhost:3000";

  return `
<!DOCTYPE html>
<html dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
    }
    .content {
      padding: 30px;
    }
    .section-title {
      color: #2563eb;
      font-size: 22px;
      margin: 30px 0 15px 0;
      padding-bottom: 10px;
      border-bottom: 2px solid #e5e7eb;
    }
    .article-card, .event-card {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      transition: box-shadow 0.3s;
    }
    .article-card:hover, .event-card:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .article-title, .event-title {
      font-size: 18px;
      font-weight: bold;
      color: #1f2937;
      margin-bottom: 10px;
    }
    .article-excerpt, .event-description {
      color: #6b7280;
      line-height: 1.6;
      margin-bottom: 15px;
    }
    .read-more {
      display: inline-block;
      background-color: #2563eb;
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: 500;
    }
    .event-meta {
      color: #6b7280;
      font-size: 14px;
      margin-top: 10px;
    }
    .custom-content {
      background-color: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 20px;
      margin: 20px 0;
    }
    .footer {
      background-color: #f9fafb;
      padding: 20px;
      text-align: center;
      color: #6b7280;
      font-size: 12px;
    }
    .footer a {
      color: #2563eb;
      text-decoration: none;
    }
    .premium-badge {
      background-color: #f59e0b;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      margin-right: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>תאילנד היום | Thailand Hayom</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">הניוזלטר שלכם למטיילים ישראלים בתאילנד</p>
    </div>

    <div class="content">
      ${customContentHe ? `
        <div class="custom-content">
          <div dir="rtl">${customContentHe}</div>
        </div>
      ` : ''}

      ${articles.length > 0 ? `
        <h2 class="section-title">מאמרים חדשים | New Articles</h2>
        ${articles.map(article => `
          <div class="article-card">
            ${article.isPremium ? '<span class="premium-badge">PREMIUM</span>' : ''}
            <div class="article-title" dir="rtl">${article.titleHe}</div>
            <div class="article-title" dir="ltr">${article.title}</div>
            ${article.excerptHe ? `<div class="article-excerpt" dir="rtl">${article.excerptHe}</div>` : ''}
            <a href="${frontendUrl}/articles/${article.slug}" class="read-more">קרא עוד | Read More</a>
          </div>
        `).join('')}
      ` : ''}

      ${events.length > 0 ? `
        <h2 class="section-title">אירועים קרובים | Upcoming Events</h2>
        ${events.map(event => `
          <div class="event-card">
            ${event.isPremium ? '<span class="premium-badge">PREMIUM</span>' : ''}
            <div class="event-title" dir="rtl">${event.titleHe}</div>
            <div class="event-title" dir="ltr">${event.title}</div>
            <div class="event-meta">
              📅 ${new Date(event.eventDate).toLocaleDateString('he-IL')}
              ${event.location ? ` | 📍 ${event.locationHe || event.location}` : ''}
              ${event.price ? ` | 💰 ₪${event.price}` : ' | 🆓 חינם'}
            </div>
            ${event.descriptionHe ? `<div class="event-description" dir="rtl">${event.descriptionHe.substring(0, 200)}...</div>` : ''}
            ${event.registrationUrl ? `<a href="${event.registrationUrl}" class="read-more">הרשמה | Register</a>` : ''}
          </div>
        `).join('')}
      ` : ''}

      ${customContent ? `
        <div class="custom-content" dir="ltr">
          ${customContent}
        </div>
      ` : ''}
    </div>

    <div class="footer">
      <p>תודה שאתם חלק מהקהילה שלנו | Thank you for being part of our community</p>
      <p>
        <a href="${frontendUrl}">Visit Website</a> |
        <a href="${frontendUrl}/articles">Browse Articles</a> |
        <a href="${frontendUrl}/unsubscribe">Unsubscribe</a>
      </p>
      <p style="margin-top: 15px; color: #9ca3af;">
        Thailand Hayom - Your guide to Thailand for Israeli travelers
      </p>
    </div>
  </div>
</body>
</html>
  `;
}
