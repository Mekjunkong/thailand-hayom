import Stripe from "stripe";
import { getDb } from "./db";
import { purchases } from "../drizzle/schema";
import { generateWelcomeKitPDF, generateInvoicePDF } from "./pdfGenerator";
import { sendWelcomeKitEmail, sendBulkOrderInvoice } from "./emailService";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

export async function handleStripeWebhook(body: string, signature: string) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error("STRIPE_WEBHOOK_SECRET not configured");
  }

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
      currency: session.currency || "thb",
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
