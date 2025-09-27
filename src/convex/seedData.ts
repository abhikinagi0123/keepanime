import { mutation } from "./_generated/server";

export const seedProducts = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if products already exist
    const existingProducts = await ctx.db.query("products").collect();
    if (existingProducts.length > 0) {
      return "Products already exist";
    }

    const sampleProducts = [
      {
        name: "One Piece Luffy USB Drive",
        description: "Premium 32GB USB drive featuring Monkey D. Luffy design with preloaded One Piece episodes.",
        price: 49.99,
        storage: "32GB",
        collection: "One Piece",
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"],
        specifications: {
          storageSize: "32GB USB 3.0",
          preloadedAnime: ["One Piece Episodes 1-50", "Character Wallpapers", "Theme Songs"],
          logoDesign: "Straw Hat Pirates Logo",
          compatibility: "Windows, Mac, Linux"
        },
        isPreOrder: true
      },
      {
        name: "Naruto Hokage Collection",
        description: "64GB drive with exclusive Naruto content and Hokage-themed design.",
        price: 69.99,
        storage: "64GB",
        collection: "Naruto",
        images: ["https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop"],
        specifications: {
          storageSize: "64GB USB 3.0",
          preloadedAnime: ["Naruto Episodes 1-100", "Shippuden Highlights", "Character Art"],
          logoDesign: "Hidden Leaf Village Symbol",
          compatibility: "Windows, Mac, Linux"
        },
        isPreOrder: true
      },
      {
        name: "Attack on Titan Survey Corps",
        description: "128GB premium drive with Survey Corps emblem and exclusive AOT content.",
        price: 89.99,
        storage: "128GB",
        collection: "Attack on Titan",
        images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop"],
        specifications: {
          storageSize: "128GB USB 3.0",
          preloadedAnime: ["Attack on Titan Season 1-4", "OST Collection", "Manga Extras"],
          logoDesign: "Survey Corps Wings of Freedom",
          compatibility: "Windows, Mac, Linux"
        },
        isPreOrder: true
      },
      {
        name: "Dragon Ball Z Saiyan Elite",
        description: "Special edition 256GB drive with Dragon Ball Z complete series.",
        price: 129.99,
        storage: "256GB",
        collection: "Dragon Ball Z",
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"],
        specifications: {
          storageSize: "256GB USB 3.0",
          preloadedAnime: ["Dragon Ball Z Complete", "Movies Collection", "Character Profiles"],
          logoDesign: "Saiyan Royal Crest",
          compatibility: "Windows, Mac, Linux"
        },
        isPreOrder: true
      }
    ];

    for (const product of sampleProducts) {
      await ctx.db.insert("products", product);
    }

    return "Sample products created successfully";
  },
});
