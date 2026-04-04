import "dotenv/config";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import express, { Request, Response } from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "../server/_core/oauth";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";
import { serveStatic } from "../server/_core/vite";
import progressRouter from "../server/progressRouter";
import phraseCardsRouter from "../server/phraseCardsRouter";
import cookieParser from "cookie-parser";
import { handleStripeWebhook } from "../server/webhookHandler";

let app: express.Express | null = null;

function buildApp(): express.Express {
  const expressApp = express();

  expressApp.use(cookieParser());

  // Stripe webhook (must be before express.json() to preserve raw body)
  expressApp.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    async (req: Request, res: Response) => {
      try {
        const signature = req.headers["stripe-signature"];
        if (!signature) {
          res.status(400).send("No signature provided");
          return;
        }
        const body = req.body.toString("utf8");
        await handleStripeWebhook(body, signature as string);
        res.json({ received: true });
      } catch (error: any) {
        console.error("Webhook error:", error.message);
        res.status(400).send(`Webhook Error: ${error.message}`);
      }
    }
  );

  expressApp.use(express.json({ limit: "50mb" }));
  expressApp.use(express.urlencoded({ limit: "50mb", extended: true }));

  registerOAuthRoutes(expressApp);
  expressApp.use(progressRouter);
  expressApp.use(phraseCardsRouter);

  expressApp.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  serveStatic(expressApp);

  return expressApp;
}

export default async (req: VercelRequest, res: VercelResponse) => {
  if (!app) {
    app = buildApp();
  }

  const server = createServer(app);

  return new Promise<void>((resolve, reject) => {
    server.emit("request", req, res);
    res.on("finish", () => resolve());
    res.on("error", (error: any) => {
      console.error("Response error:", error);
      reject(error);
    });
  });
};
