import { getAuthUserId } from "@convex-dev/auth/server";
import { query, QueryCtx } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get the current signed in user. Returns null if the user is not signed in.
 * Usage: const signedInUser = await ctx.runQuery(api.authHelpers.currentUser);
 * THIS FUNCTION IS READ-ONLY. DO NOT MODIFY.
 */
export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);

    if (user === null) {
      return null;
    }

    return user;
  },
});

/**
 * Use this function internally to get the current user data. Remember to handle the null user case.
 * @param ctx
 * @returns
 */
export const getCurrentUser = async (ctx: QueryCtx) => {
  const userId = await getAuthUserId(ctx);
  if (userId === null) {
    return null;
  }
  return await ctx.db.get(userId);
};

export const setName = mutation({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    await ctx.db.patch(userId, { name });
  },
});

export const setImage = mutation({
  args: { image: v.string() },
  handler: async (ctx, { image }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    await ctx.db.patch(userId, { image });
  },
});

export const updatePreferences = mutation({
  args: {
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    paymentMethod: v.optional(v.string()),
    notifications: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }

    const update: Record<string, unknown> = {};
    if (args.phone !== undefined) update.phone = args.phone;
    if (args.address !== undefined) update.address = args.address;
    if (args.paymentMethod !== undefined) update.paymentMethod = args.paymentMethod;
    if (args.notifications !== undefined) update.notifications = args.notifications;

    if (Object.keys(update).length === 0) return;
    await ctx.db.patch(userId, update);
  },
});