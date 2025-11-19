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

    // Update user stats: +10 points for creating a post
    await db
      .update(users)
      .set({
        reputationPoints: sql`${users.reputationPoints} + 10`,
        postCount: sql`${users.postCount} + 1`,
      })
      .where(eq(users.id, user.id))
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

    // Update user stats: +5 points for creating a comment
    await db
      .update(users)
      .set({
        reputationPoints: sql`${users.reputationPoints} + 5`,
        commentCount: sql`${users.commentCount} + 1`,
      })
      .where(eq(users.id, user.id))
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

    // Get post author
    const post = await db.select().from(forumPosts).where(eq(forumPosts.id, Number(id))).execute().then(r => r[0]);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (existing) {
      // Unlike
      await db.delete(forumLikes).where(eq(forumLikes.id, existing.id)).execute();
      await db
        .update(forumPosts)
        .set({ likes: sql`${forumPosts.likes} - 1` })
        .where(eq(forumPosts.id, Number(id)))
        .execute();
      
      // Remove reputation point from post author
      await db
        .update(users)
        .set({ reputationPoints: sql`${users.reputationPoints} - 2` })
        .where(eq(users.id, post.userId))
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
      
      // Give reputation point to post author (+2 points per like)
      await db
        .update(users)
        .set({ reputationPoints: sql`${users.reputationPoints} + 2` })
        .where(eq(users.id, post.userId))
        .execute();
      
      res.json({ liked: true });
    }
  } catch (error) {
    console.error("[Forum API] Error toggling like:", error);
    res.status(500).json({ error: "Failed to toggle like" });
  }
});

// Get user profile
router.get("/api/forum/users/:id", async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const db = await getDb();
    if (!db) return res.status(503).json({ error: "Database not available" });
    
    const user = await db.select().from(users).where(eq(users.id, userId)).execute().then(r => r[0]);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      id: user.id,
      name: user.name,
      reputationPoints: user.reputationPoints || 0,
      postCount: user.postCount || 0,
      commentCount: user.commentCount || 0,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

// Get user posts
router.get("/api/forum/users/:id/posts", async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const db = await getDb();
    if (!db) return res.status(503).json({ error: "Database not available" });
    
    const userPosts = await db
      .select({
        id: forumPosts.id,
        title: forumPosts.title,
        categoryId: forumPosts.categoryId,
        likes: forumPosts.likes,
        views: forumPosts.views,
        createdAt: forumPosts.createdAt,
      })
      .from(forumPosts)
      .where(eq(forumPosts.userId, userId))
      .orderBy(desc(forumPosts.createdAt))
      .execute();

    const postsWithCategories = await Promise.all(
      userPosts.map(async (post) => {
        const category = await db
          .select({ name: forumCategories.name })
          .from(forumCategories)
          .where(eq(forumCategories.id, post.categoryId))
          .execute()
          .then(r => r[0]);
        return {
          ...post,
          categoryName: category?.name || "Unknown",
        };
      })
    );

    res.json(postsWithCategories);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ error: "Failed to fetch user posts" });
  }
});

// Get user comments
router.get("/api/forum/users/:id/comments", async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const db = await getDb();
    if (!db) return res.status(503).json({ error: "Database not available" });
    
    const userComments = await db
      .select({
        id: forumComments.id,
        content: forumComments.content,
        postId: forumComments.postId,
        likes: forumComments.likes,
        createdAt: forumComments.createdAt,
      })
      .from(forumComments)
      .where(eq(forumComments.userId, userId))
      .orderBy(desc(forumComments.createdAt))
      .execute();

    const commentsWithPosts = await Promise.all(
      userComments.map(async (comment) => {
        const post = await db
          .select({ title: forumPosts.title })
          .from(forumPosts)
          .where(eq(forumPosts.id, comment.postId))
          .execute()
          .then(r => r[0]);
        return {
          ...comment,
          postTitle: post?.title || "Unknown Post",
        };
      })
    );

    res.json(commentsWithPosts);
  } catch (error) {
    console.error("Error fetching user comments:", error);
    res.status(500).json({ error: "Failed to fetch user comments" });
  }
});

export default router;
