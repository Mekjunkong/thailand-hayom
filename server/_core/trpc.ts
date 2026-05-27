import { NOT_ADMIN_ERR_MSG, UNAUTHED_ERR_MSG } from "../../shared/const";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { TrpcContext } from "./context";
import type { User } from "../../drizzle/schema";

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

/**
 * Fallback identity used in local development when OAUTH_SERVER_URL is not
 * configured. This keeps protected routes exercisable without a live OAuth
 * server; it is never reached in production.
 */
const DEV_FALLBACK_USER: User = {
  id: 1,
  openId: "dev-user",
  name: "Dev User",
  email: "dev@localhost",
  loginMethod: null,
  role: "admin",
  reputationPoints: 0,
  postCount: 0,
  commentCount: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSignedIn: new Date(),
  passwordHash: null,
  passwordSalt: null,
};

const requireUser = t.middleware(async opts => {
  const { ctx, next } = opts;

  if (!ctx.user) {
    if (!process.env.OAUTH_SERVER_URL) {
      // Dev bypass: no OAuth configured, use the fallback user so protected
      // routes can be exercised locally without authentication infrastructure.
      return next({ ctx: { ...ctx, user: DEV_FALLBACK_USER } });
    }
    throw new TRPCError({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

/**
 * Guarantees ctx.user is non-null inside handlers.
 * - Production (OAUTH_SERVER_URL set): rejects unauthenticated requests.
 * - Local dev (no OAUTH_SERVER_URL): falls back to DEV_FALLBACK_USER.
 */
export const protectedProcedure = t.procedure.use(requireUser);

export const adminProcedure = t.procedure.use(
  t.middleware(async opts => {
    const { ctx, next } = opts;

    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }

    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
      },
    });
  }),
);
