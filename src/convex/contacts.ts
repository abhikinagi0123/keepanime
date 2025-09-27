import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contacts", {
      ...args,
      status: "new" as const,
    });
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user || user.role !== "admin") {
      throw new Error("Unauthorized");
    }
    
    return await ctx.db.query("contacts").order("desc").collect();
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("contacts"),
    status: v.union(v.literal("new"), v.literal("read"), v.literal("replied")),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user || user.role !== "admin") {
      throw new Error("Unauthorized");
    }
    
    return await ctx.db.patch(args.id, { status: args.status });
  },
});
