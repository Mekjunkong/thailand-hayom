import express, { Request, Response } from "express";
import { getDb, getUserByOpenId } from "./db";
import { forumCategories, forumPosts, forumComments, forumLikes, users } from "../drizzle/schema";
import { eq, desc, sql, and } from "drizzle-orm";
import { sdk } from "./_core/sdk";
import { COOKIE_NAME } from "@shared/const";

const router = express.Router();

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

// Helper function to get authenticated user
async function getAuth(req: Request): Promise<{ id: number; name: string | null } | null> {
  const user = await getAuthUser(req);
  if (!user) return null;
  return { id: user.id, name: user.name };
}

// Get all categories
router.get("/api/forum/categories", async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database not available" });
    }

    const categories = await db.select().from(forumCategories).execute();
    res.json(categories);
  } catch (error) {
    console.error("[Forum API] Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// Get posts by category
router.get("/api/forum/posts", async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.query;
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database not available" });
    }

    let query = db
      .select({
        post: forumPosts,
        author: {
          id: users.id,
          name: users.name,
        },
      })
      .from(forumPosts)
      .leftJoin(users, eq(forumPosts.userId, users.id))
      .orderBy(desc(forumPosts.isPinned), desc(forumPosts.createdAt));

    if (categoryId) {
      query = query.where(eq(forumPosts.categoryId, Number(categoryId))) as any;
    }

    const posts = await query.execute();
    res.json(posts);
  } catch (error) {
    console.error("[Forum API] Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Get single post with comments
router.get("/api/forum/posts/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database not available" });
    }

    // Get post with author
    const postData = await db
      .select({
        post: forumPosts,
        author: {
          id: users.id,
          name: users.name,
        },
      })
      .from(forumPosts)
      .leftJoin(users, eq(forumPosts.userId, users.id))
      .where(eq(forumPosts.id, Number(id)))
      .execute().then(r => r[0]);

    if (!postData) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Increment view count
    await db
      .update(forumPosts)
      .set({ views: sql`${forumPosts.views} + 1` })
      .where(eq(forumPosts.id, Number(id)))
      .execute();

    // Get comments with authors
    const comments = await db
      .select({
        comment: forumComments,
        author: {
          id: users.id,
          name: users.name,
        },
      })
      .from(forumComments)
      .leftJoin(users, eq(forumComments.userId, users.id))
      .where(eq(forumComments.postId, Number(id)))
      .orderBy(forumComments.createdAt)
      .execute();

    res.json({ ...postData, comments });
  } catch (error) {
    console.error("[Forum API] Error fetching post:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

// Create new post
router.post("/api/forum/posts", async (req: Request, res: Response) => {
  const user = await getAuth(req);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { categoryId, title, titleHe, content, contentHe, language } = req.body;
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database not available" });
    }

    const result = await db
      .insert(forumPosts)
      .values({
        userId: user.id,
        categoryId,
        title,
        titleHe,
        content,
        contentHe,
        language: language || "en",
      })
      .execute();

    res.json({ success: true });
  } catch (error) {
    console.error("[Forum API] Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Create comment
router.post("/api/forum/comments", async (req: Request, res: Response) => {
  const user = await getAuth(req);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { postId, content } = req.body;
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database not available" });
    }

    const result = await db
      .insert(forumComments)
      .values({
        postId,
        userId: user.id,
        content,
      })
      .execute();

    res.json({ success: true });
  } catch (error) {
    console.error("[Forum API] Error creating comment:", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
});

// Toggle like on post
router.post("/api/forum/posts/:id/like", async (req: Request, res: Response) => {
  const user = await getAuth(req);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { id } = req.params;
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database not available" });
    }

    // Check if already liked
    const existing = await db
      .select()
      .from(forumLikes)
      .where(and(eq(forumLikes.userId, user.id), eq(forumLikes.postId, Number(id))))
      .execute().then(r => r[0]);

    if (existing) {
      // Unlike
      await db.delete(forumLikes).where(eq(forumLikes.id, existing.id)).execute();
      await db
        .update(forumPosts)
        .set({ likes: sql`${forumPosts.likes} - 1` })
        .where(eq(forumPosts.id, Number(id)))
        .execute();
      res.json({ liked: false });
    } else {
      // Like
      await db.insert(forumLikes).values({ userId: user.id, postId: Number(id) }).execute();
      await db
        .update(forumPosts)
        .set({ likes: sql`${forumPosts.likes} + 1` })
        .where(eq(forumPosts.id, Number(id)))
        .execute();
      res.json({ liked: true });
    }
  } catch (error) {
    console.error("[Forum API] Error toggling like:", error);
    res.status(500).json({ error: "Failed to toggle like" });
  }
});

export default router;
