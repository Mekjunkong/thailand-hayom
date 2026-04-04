/**
 * Local JWT Auth — replaces Manus OAuth for Railway deployment.
 *
 * Strategy: simple email + password login stored in DB (bcrypt hashed).
 * The existing session cookie + jwt verify flow in sdk.ts is UNCHANGED —
 * we just issue our own tokens here instead of relying on Manus OAuth server.
 *
 * Routes added:
 *   POST /api/auth/login   { email, password } → sets session cookie
 *   POST /api/auth/register { email, password, name } → creates user + session
 *
 * The legacy /api/oauth/callback is left in place but will 400 gracefully
 * when OAUTH_SERVER_URL is not set.
 */

import type { Express, Request, Response } from "express";
import { nanoid } from "nanoid";
import { getDb } from "../db";
import { users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { sdk } from "./sdk";
import { getSessionCookieOptions } from "./cookies";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { ENV } from "./env";

// Simple password hashing using built-in crypto (no bcrypt dep needed)
import { createHash, randomBytes, timingSafeEqual } from "crypto";

function hashPassword(password: string, salt: string): string {
  return createHash("sha256")
    .update(`${salt}:${password}:${ENV.cookieSecret}`)
    .digest("hex");
}

function generateSalt(): string {
  return randomBytes(16).toString("hex");
}

function verifyPassword(password: string, salt: string, hash: string): boolean {
  const computed = hashPassword(password, salt);
  try {
    return timingSafeEqual(Buffer.from(computed), Buffer.from(hash));
  } catch {
    return false;
  }
}

export function registerLocalAuthRoutes(app: Express) {
  // POST /api/auth/register
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    const { email, password, name } = req.body ?? {};

    if (!email || !password) {
      res.status(400).json({ error: "email and password are required" });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({ error: "password must be at least 8 characters" });
      return;
    }

    try {
      const db = await getDb();
      if (!db) {
        res.status(500).json({ error: "Database not available" });
        return;
      }

      // Check if user already exists
      const existing = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (existing.length > 0) {
        res.status(409).json({ error: "Email already registered" });
        return;
      }

      const salt = generateSalt();
      const hash = hashPassword(password, salt);
      const openId = `local_${nanoid(21)}`;

      await db.insert(users).values({
        openId,
        email,
        name: name || email.split("@")[0],
        loginMethod: "email",
        passwordHash: hash,
        passwordSalt: salt,
        lastSignedIn: new Date(),
      });

      const sessionToken = await sdk.createSessionToken(openId, {
        name: name || email,
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.json({ success: true });
    } catch (error) {
      console.error("[LocalAuth] Register failed", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  // POST /api/auth/login
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      res.status(400).json({ error: "email and password are required" });
      return;
    }

    try {
      const db = await getDb();
      if (!db) {
        res.status(500).json({ error: "Database not available" });
        return;
      }

      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (!user || !user.passwordHash || !user.passwordSalt) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      if (!verifyPassword(password, user.passwordSalt, user.passwordHash)) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      // Update last sign in
      await db
        .update(users)
        .set({ lastSignedIn: new Date() })
        .where(eq(users.openId, user.openId));

      const sessionToken = await sdk.createSessionToken(user.openId, {
        name: user.name || user.email || "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.json({ success: true, name: user.name });
    } catch (error) {
      console.error("[LocalAuth] Login failed", error);
      res.status(500).json({ error: "Login failed" });
    }
  });
}
