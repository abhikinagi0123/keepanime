import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getCurrentUser } from "./users";

export const list = query({
  args: {
    collection: v.optional(v.string()),
    sortBy: v.optional(v.union(v.literal("name"), v.literal("price"), v.literal("storage"))),
    sortOrder: v.optional(v.union(v.literal("asc"), v.literal("desc"))),
  },
  handler: async (ctx, args) => {
    let products;
    
    if (args.collection) {
      products = await ctx.db
        .query("products")
        .withIndex("by_collection", (q) => q.eq("collection", args.collection!))
        .collect();
    } else {
      products = await ctx.db.query("products").collect();
    }
    
    // Sort products
    if (args.sortBy) {
      products.sort((a, b) => {
        let aVal = a[args.sortBy!];
        let bVal = b[args.sortBy!];
        
        if (args.sortBy === "name") {
          aVal = (aVal as string).toLowerCase();
          bVal = (bVal as string).toLowerCase();
        }
        
        if (args.sortOrder === "desc") {
          return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
        }
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      });
    }
    
    return products;
  },
});

export const getById = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getRelated = query({
  args: { 
    productId: v.id("products"),
    collection: v.string(),
    limit: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    const products = await ctx.db
      .query("products")
      .withIndex("by_collection", (q) => q.eq("collection", args.collection))
      .filter((q) => q.neq(q.field("_id"), args.productId))
      .take(args.limit || 4);
    
    return products;
  },
});

export const getCollections = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();
    const collections = [...new Set(products.map(p => p.collection))];
    
    return collections.map(collection => ({
      name: collection,
      count: products.filter(p => p.collection === collection).length,
      image: products.find(p => p.collection === collection)?.images[0] || ""
    }));
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    price: v.number(),
    storage: v.string(),
    collection: v.string(),
    images: v.array(v.string()),
    specifications: v.object({
      storageSize: v.string(),
      preloadedAnime: v.array(v.string()),
      logoDesign: v.string(),
      compatibility: v.string(),
    }),
    isPreOrder: v.boolean(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user || user.role !== "admin") {
      throw new Error("Unauthorized");
    }
    
    return await ctx.db.insert("products", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("products"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    price: v.optional(v.number()),
    storage: v.optional(v.string()),
    collection: v.optional(v.string()),
    images: v.optional(v.array(v.string())),
    specifications: v.optional(v.object({
      storageSize: v.string(),
      preloadedAnime: v.array(v.string()),
      logoDesign: v.string(),
      compatibility: v.string(),
    })),
    isPreOrder: v.optional(v.boolean()),
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

export const remove = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user || user.role !== "admin") {
      throw new Error("Unauthorized");
    }
    
    return await ctx.db.delete(args.id);
  },
});
