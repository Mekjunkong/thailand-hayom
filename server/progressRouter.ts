import { Router, Request, Response } from "express";
import { eq, and } from "drizzle-orm";
import { getDb, getUserByOpenId } from "./db";
import { userProgress, quizPerformance } from "../drizzle/schema";
import { sdk } from "./_core/sdk";
import { COOKIE_NAME } from "@shared/const";

const router = Router();

// Helper to get authenticated user
async function getAuthUser(req: Request) {
  const sessionToken = req.cookies[COOKIE_NAME];
  if (!sessionToken) return null;
  
  try {
    const session = await sdk.verifySession(sessionToken);
    if (!session?.openId) return null;
    
    const user = await getUserByOpenId(session.openId);
    return user;
  } catch {
    return null;
  }
}

// Get user's lesson progress
router.get("/api/progress", async (req: Request, res: Response) => {
  const user = await getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database not available" });
    }

    const progress = await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, user.id));

    res.json({ progress });
  } catch (error) {
    console.error("[Progress API] Error fetching progress:", error);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});

// Save lesson completion
router.post("/api/progress/lesson", async (req: Request, res: Response) => {
  const user = await getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { lessonId, completed } = req.body;

    if (typeof lessonId !== "number" || typeof completed !== "number") {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database not available" });
    }

    // Check if progress exists
    const existing = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, user.id),
          eq(userProgress.lessonId, lessonId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      // Update existing progress
      await db
        .update(userProgress)
        .set({
          completed,
          lastAccessedAt: new Date(),
        })
        .where(
          and(
            eq(userProgress.userId, user.id),
            eq(userProgress.lessonId, lessonId)
          )
        );
    } else {
      // Insert new progress
      await db.insert(userProgress).values({
        userId: user.id,
        lessonId,
        completed,
        lastAccessedAt: new Date(),
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("[Progress API] Error saving progress:", error);
    res.status(500).json({ error: "Failed to save progress" });
  }
});

// Get quiz performance for phrases
router.get("/api/progress/quiz", async (req: Request, res: Response) => {
  const user = await getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database not available" });
    }

    const performance = await db
      .select()
      .from(quizPerformance)
      .where(eq(quizPerformance.userId, user.id));

    res.json({ performance });
  } catch (error) {
    console.error("[Progress API] Error fetching quiz performance:", error);
    res.status(500).json({ error: "Failed to fetch quiz performance" });
  }
});

// Save quiz result and update spaced repetition
router.post("/api/progress/quiz", async (req: Request, res: Response) => {
  const user = await getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { phraseId, correct } = req.body;

    if (typeof phraseId !== "number" || typeof correct !== "boolean") {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database not available" });
    }

    // Check if performance record exists
    const existing = await db
      .select()
      .from(quizPerformance)
      .where(
        and(
          eq(quizPerformance.userId, user.id),
          eq(quizPerformance.phraseId, phraseId)
        )
      )
      .limit(1);

    const now = new Date();

    if (existing.length > 0) {
      const record = existing[0];
      
      // SM-2 Algorithm for spaced repetition
      let easinessFactor = record.easinessFactor / 100; // Convert back to decimal
      let interval = record.interval;
      let repetitions = record.repetitions;

      if (correct) {
        // Correct answer
        if (repetitions === 0) {
          interval = 1;
        } else if (repetitions === 1) {
          interval = 6;
        } else {
          interval = Math.round(interval * easinessFactor);
        }
        repetitions += 1;
        
        // Update easiness factor (quality = 4 for correct)
        easinessFactor = easinessFactor + (0.1 - (5 - 4) * (0.08 + (5 - 4) * 0.02));
      } else {
        // Incorrect answer
        repetitions = 0;
        interval = 1;
        
        // Update easiness factor (quality = 2 for incorrect)
        easinessFactor = easinessFactor + (0.1 - (5 - 2) * (0.08 + (5 - 2) * 0.02));
      }

      // Ensure easiness factor doesn't go below 1.3
      if (easinessFactor < 1.3) {
        easinessFactor = 1.3;
      }

      const nextReview = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);

      await db
        .update(quizPerformance)
        .set({
          correct: correct ? record.correct + 1 : record.correct,
          incorrect: correct ? record.incorrect : record.incorrect + 1,
          lastReviewed: now,
          nextReview,
          easinessFactor: Math.round(easinessFactor * 100),
          interval,
          repetitions,
        })
        .where(
          and(
            eq(quizPerformance.userId, user.id),
            eq(quizPerformance.phraseId, phraseId)
          )
        );
    } else {
      // First time seeing this phrase
      const interval = correct ? 1 : 1;
      const nextReview = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);

      await db.insert(quizPerformance).values({
        userId: user.id,
        phraseId,
        correct: correct ? 1 : 0,
        incorrect: correct ? 0 : 1,
        lastReviewed: now,
        nextReview,
        easinessFactor: 250, // 2.5 * 100
        interval,
        repetitions: correct ? 1 : 0,
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("[Progress API] Error saving quiz result:", error);
    res.status(500).json({ error: "Failed to save quiz result" });
  }
});

// Get phrases due for review
router.get("/api/progress/quiz/due", async (req: Request, res: Response) => {
  const user = await getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database not available" });
    }

    const now = new Date();
    const dueForReview = await db
      .select()
      .from(quizPerformance)
      .where(eq(quizPerformance.userId, user.id));

    // Filter in JavaScript since drizzle-orm might not support date comparison easily
    const due = dueForReview.filter(p => p.nextReview <= now);

    res.json({ due, count: due.length });
  } catch (error) {
    console.error("[Progress API] Error fetching due phrases:", error);
    res.status(500).json({ error: "Failed to fetch due phrases" });
  }
});

export default router;
