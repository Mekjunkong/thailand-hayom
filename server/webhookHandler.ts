import Stripe from "stripe";
import { getDb } from "./db";
import { purchases, subscriptions } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { generateWelcomeKitPDF, generateInvoicePDF } from "./pdfGenerator";
import { sendWelcomeKitEmail, sendBulkOrderInvoice } from "./emailService";

export async function handleStripeWebhook(body: string, signature: string) {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY not configured");
  }
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error("STRIPE_WEBHOOK_SECRET not configured");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-10-29.clover",
  });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    throw new Error(`Webhook signature verification failed: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      await handleSuccessfulPayment(session);
      break;

    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("PaymentIntent succeeded:", paymentIntent.id);
      break;

    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionChange(subscription);
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionDeleted(subscription);
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const invoiceSubscription =
        invoice.parent?.subscription_details?.subscription;
      if (invoiceSubscription) {
        const subscriptionId =
          typeof invoiceSubscription === "string"
            ? invoiceSubscription
            : invoiceSubscription.id;
        await handlePaymentFailed(subscriptionId);
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return { received: true };
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  try {
    const db = await getDb();
    if (!db) {
      console.error("Database not available");
      return;
    }

    // Extract metadata
    const productType = session.metadata?.product_type || "single";
    const quantity = parseInt(session.metadata?.quantity || "1");
    const customerEmail = session.customer_details?.email || session.metadata?.customer_email || "";
    const customerName = session.customer_details?.name || session.metadata?.customer_name || "Customer";

    // Save purchase to database
    const result = await db.insert(purchases).values({
      stripeSessionId: session.id,
      customerEmail,
      customerName,
      amount: session.amount_total || 0,
      currency: session.currency || "ils",
      productType,
      status: "completed",
      metadata: JSON.stringify({ quantity }),
    });

    const purchaseId = (result as any).insertId || 0;
    console.log("Purchase saved to database:", purchaseId);

    // Generate Welcome Kit PDF
    const pdfBuffer = await generateWelcomeKitPDF();

    // Send email with PDF attachment
    if (customerEmail) {
      const emailResult = await sendWelcomeKitEmail(
        customerEmail,
        customerName,
        pdfBuffer
      );

      if (emailResult.success) {
        console.log("Welcome Kit email sent successfully");
      } else {
        console.error("Failed to send Welcome Kit email:", emailResult.error);
      }

      // If bulk order, also send invoice
      if (quantity > 1) {
        const purchase = {
          id: purchaseId,
          customerEmail,
          customerName,
          amount: session.amount_total || 0,
          productType,
          status: "completed",
          createdAt: new Date(),
        };
        const invoicePDF = await generateInvoicePDF(purchase);
        const invoiceResult = await sendBulkOrderInvoice(
          customerEmail,
          customerName,
          invoicePDF,
          quantity
        );

        if (invoiceResult.success) {
          console.log("Invoice email sent successfully");
        } else {
          console.error("Failed to send invoice email:", invoiceResult.error);
        }
      }
    }

    console.log("Payment processed successfully for session:", session.id);
  } catch (error) {
    console.error("Error handling successful payment:", error);
    throw error;
  }
}

function mapStripeStatus(
  stripeStatus: string
): "active" | "past_due" | "canceled" | "expired" {
  switch (stripeStatus) {
    case "active":
      return "active";
    case "past_due":
      return "past_due";
    case "canceled":
      return "canceled";
    default:
      return "expired";
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  try {
    const db = await getDb();
    if (!db) {
      console.error("Database not available");
      return;
    }

    const userId = parseInt(subscription.metadata?.user_id || "0");
    if (!userId) {
      console.error("No user_id in subscription metadata:", subscription.id);
      return;
    }

    const status = mapStripeStatus(subscription.status);
    const tier = status === "active" ? "premium" : "free";

    // In Stripe v19 (clover API), period dates are on subscription items
    const firstItem = subscription.items.data[0];
    const currentPeriodStart = firstItem
      ? new Date(firstItem.current_period_start * 1000)
      : null;
    const currentPeriodEnd = firstItem
      ? new Date(firstItem.current_period_end * 1000)
      : null;

    const stripeCustomerId =
      typeof subscription.customer === "string"
        ? subscription.customer
        : subscription.customer.id;

    // Check if subscription already exists for this user
    const existing = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(subscriptions)
        .set({
          stripeSubscriptionId: subscription.id,
          stripeCustomerId,
          tier,
          status,
          currentPeriodStart,
          currentPeriodEnd,
          updatedAt: new Date(),
        })
        .where(eq(subscriptions.userId, userId));
    } else {
      await db.insert(subscriptions).values({
        userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId,
        tier,
        status,
        currentPeriodStart,
        currentPeriodEnd,
      });
    }

    console.log(
      `Subscription ${subscription.id} ${status} for user ${userId}`
    );
  } catch (error) {
    console.error("Error handling subscription change:", error);
    throw error;
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    const db = await getDb();
    if (!db) {
      console.error("Database not available");
      return;
    }

    await db
      .update(subscriptions)
      .set({
        status: "canceled",
        tier: "free",
        canceledAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.stripeSubscriptionId, subscription.id));

    console.log(`Subscription ${subscription.id} canceled`);
  } catch (error) {
    console.error("Error handling subscription deletion:", error);
    throw error;
  }
}

async function handlePaymentFailed(subscriptionId: string) {
  try {
    const db = await getDb();
    if (!db) {
      console.error("Database not available");
      return;
    }

    await db
      .update(subscriptions)
      .set({
        status: "past_due",
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.stripeSubscriptionId, subscriptionId));

    console.log(`Payment failed for subscription ${subscriptionId}`);
  } catch (error) {
    console.error("Error handling payment failure:", error);
    throw error;
  }
}
