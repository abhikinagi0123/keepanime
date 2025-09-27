import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const subscribe = mutation({
  args: {
    email: v.string(),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if email already exists
    const existing = await ctx.db
      .query("newsletter")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    
    if (existing) {
      throw new Error("Email already subscribed");
    }
    
    return await ctx.db.insert("newsletter", {
      email: args.email,
      source: args.source || "website",
      subscribedAt: Date.now(),
    });
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("newsletter").order("desc").collect();
  },
});

export const getCount = query({
  args: {},
  handler: async (ctx) => {
    const subscribers = await ctx.db.query("newsletter").collect();
    return subscribers.length;
  },
});
