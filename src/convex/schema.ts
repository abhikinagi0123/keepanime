import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove

      // Added optional profile fields
      phone: v.optional(v.string()),
      address: v.optional(v.string()),
      paymentMethod: v.optional(v.string()),
      notifications: v.optional(v.boolean()),
    }).index("email", ["email"]), // index for the email. do not remove or modify

    // Products table for anime pendrives
    products: defineTable({
      name: v.string(),
      description: v.string(),
      price: v.number(),
      storage: v.string(),
      collection: v.string(), // e.g., "One Piece", "Naruto", "Attack on Titan"
      images: v.array(v.string()),
      specifications: v.object({
        storageSize: v.string(),
        preloadedAnime: v.array(v.string()),
        logoDesign: v.string(),
        compatibility: v.string(),
      }),
      isPreOrder: v.boolean(),
    }).index("by_collection", ["collection"]),

    // Newsletter subscribers
    newsletter: defineTable({
      email: v.string(),
      source: v.string(), // "homepage", "product", "launch"
      subscribedAt: v.number(),
    }).index("by_email", ["email"]),

    // Blog posts for updates
    blog: defineTable({
      title: v.string(),
      slug: v.string(),
      content: v.string(),
      excerpt: v.string(),
      image: v.optional(v.string()),
      published: v.boolean(),
      authorId: v.id("users"),
    })
      .index("by_slug", ["slug"])
      .index("by_published", ["published"]),

    // Contact form submissions
    contacts: defineTable({
      name: v.string(),
      email: v.string(),
      subject: v.string(),
      message: v.string(),
      status: v.union(v.literal("new"), v.literal("read"), v.literal("replied")),
    }).index("by_status", ["status"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;