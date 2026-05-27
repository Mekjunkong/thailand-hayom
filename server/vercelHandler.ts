import "dotenv/config";
import express, { type Request, type Response } from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./_core/oauth";
import { appRouter } from "./routers";
import { createContext } from "./_core/context";
import progressRouter from "./progressRouter";
import phraseCardsRouter from "./phraseCardsRouter";
import cookieParser from "cookie-parser";
import { handleStripeWebhook } from "./webhookHandler";

let app: express.Express | null = null;

function buildApp(): express.Express {
  const expressApp = express();

  expressApp.use(cookieParser());

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

  expressApp.use("/api", (_req, res) => {
    res.status(404).json({ error: "API route not found" });
  });

  return expressApp;
}

export default async (req: Request, res: Response) => {
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
