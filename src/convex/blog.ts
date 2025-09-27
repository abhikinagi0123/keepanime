import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getCurrentUser } from "./users";

export const list = query({
  args: {
    published: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    if (args.published !== undefined) {
      return await ctx.db
        .query("blog")
        .withIndex("by_published", (q) => q.eq("published", args.published!))
        .order("desc")
        .collect();
    }
    
    return await ctx.db.query("blog").order("desc").collect();
  },
});

export const getById = query({
  args: { id: v.id("blog") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("blog")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.string(),
    image: v.optional(v.string()),
    published: v.boolean(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user || user.role !== "admin") {
      throw new Error("Unauthorized");
    }
    
    return await ctx.db.insert("blog", {
      ...args,
      authorId: user._id,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("blog"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    content: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    image: v.optional(v.string()),
    published: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user || user.role !== "admin") {
      throw new Error("Unauthorized");
    }
    
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});
