import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import Stripe from "stripe";
import { TRPCError } from "@trpc/server";
import { PRODUCTS } from "@shared/products";

function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message: "Stripe is not configured. Set STRIPE_SECRET_KEY to enable payments.",
    });
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-10-29.clover",
  });
}

export const stripeRouter = router({
  createCheckoutSession: publicProcedure
    .input(
      z.object({
        productType: z.enum(["single", "bulk_10", "bulk_20"]),
        customerEmail: z.string().email().optional(),
        customerName: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { productType, customerEmail, customerName } = input;

      let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];
      let metadata: Record<string, string> = {
        product_type: productType,
      };

      if (productType === "single") {
        lineItems = [
          {
            price_data: {
              currency: "ils",
              product_data: {
                name: PRODUCTS.SMART_TOURIST_PACK.name,
                description: PRODUCTS.SMART_TOURIST_PACK.description,
              },
              unit_amount: PRODUCTS.SMART_TOURIST_PACK.price * 100, // Convert to cents
            },
            quantity: 1,
          },
        ];
      } else if (productType === "bulk_10") {
        lineItems = [
          {
            price_data: {
              currency: "ils",
              product_data: {
                name: `${PRODUCTS.SMART_TOURIST_PACK.name} - Bulk (10 packs)`,
                description: "10 Smart Tourist Packs for tour agents/hostels",
              },
              unit_amount: PRODUCTS.BULK_PRICING["10_PACKS"].price * 100,
            },
            quantity: 1,
          },
        ];
        metadata.quantity = "10";
      } else {
        lineItems = [
          {
            price_data: {
              currency: "ils",
              product_data: {
                name: `${PRODUCTS.SMART_TOURIST_PACK.name} - Bulk (20 packs)`,
                description: "20 Smart Tourist Packs for tour agents/hostels",
              },
              unit_amount: PRODUCTS.BULK_PRICING["20_PACKS"].price * 100,
            },
            quantity: 1,
          },
        ];
        metadata.quantity = "20";
      }

      // Add user info to metadata if available
      if (ctx.user) {
        metadata.user_id = ctx.user.id.toString();
        if (ctx.user.email) metadata.customer_email = ctx.user.email;
        if (ctx.user.name) metadata.customer_name = ctx.user.name;
      } else if (customerEmail) {
        metadata.customer_email = customerEmail;
        if (customerName) {
          metadata.customer_name = customerName;
        }
      }

      const origin = ctx.req.headers.origin || "http://localhost:3000";

      const sessionParams: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/welcome-kit`,
        metadata,
        allow_promotion_codes: true,
      };

      if (customerEmail || ctx.user?.email) {
        sessionParams.customer_email = customerEmail || ctx.user?.email || undefined;
      }

      if (ctx.user?.id) {
        sessionParams.client_reference_id = ctx.user.id.toString();
      }

      const session = await getStripe().checkout.sessions.create(sessionParams);

      return {
        sessionId: session.id,
        url: session.url || "",
      };
    }),

  verifyPayment: publicProcedure
    .input(
      z.object({
        sessionId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const session = await getStripe().checkout.sessions.retrieve(input.sessionId);

      return {
        status: session.payment_status,
        customerEmail: session.customer_details?.email,
        amountTotal: session.amount_total,
        currency: session.currency,
      };
    }),
});
