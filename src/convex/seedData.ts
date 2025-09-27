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

export const seedMoreProducts = mutation({
  args: {},
  handler: async (ctx) => {
    const moreProducts = [
      {
        name: "Jujutsu Kaisen Cursed Energy Drive",
        description:
          "64GB drive infused with Jujutsu vibes and exclusive wallpapers, OSTs, and scenes.",
        price: 74.99,
        storage: "64GB",
        collection: "Jujutsu Kaisen",
        images: [
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
        ],
        specifications: {
          storageSize: "64GB USB 3.0",
          preloadedAnime: [
            "Season Highlights",
            "Character Wallpapers",
            "OST Collection",
          ],
          logoDesign: "Tokyo Jujutsu High Emblem",
          compatibility: "Windows, Mac, Linux",
        },
        isPreOrder: true,
      },
      {
        name: "Demon Slayer Nichirin Edition",
        description:
          "128GB Nichirin-inspired design with Demon Slayer curated content.",
        price: 94.99,
        storage: "128GB",
        collection: "Demon Slayer",
        images: [
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
        ],
        specifications: {
          storageSize: "128GB USB 3.0",
          preloadedAnime: ["S1 Highlights", "Movie Extras", "Art Book PDFs"],
          logoDesign: "Demon Slayer Corps Emblem",
          compatibility: "Windows, Mac, Linux",
        },
        isPreOrder: true,
      },
      {
        name: "My Hero Academia UA Drive",
        description:
          "32GB UA-themed drive with hero training materials and extras.",
        price: 54.99,
        storage: "32GB",
        collection: "My Hero Academia",
        images: [
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        ],
        specifications: {
          storageSize: "32GB USB 3.0",
          preloadedAnime: ["UA Archives", "Character Voice Lines", "Wallpapers"],
          logoDesign: "UA High School Crest",
          compatibility: "Windows, Mac, Linux",
        },
        isPreOrder: true,
      },
      {
        name: "One Piece Zoro Edition",
        description:
          "128GB drive for swordsmen at heart, packed with Zoro-focused content.",
        price: 89.99,
        storage: "128GB",
        collection: "One Piece",
        images: [
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
        ],
        specifications: {
          storageSize: "128GB USB 3.0",
          preloadedAnime: ["Zoro Arcs", "OST Collection", "Wallpapers"],
          logoDesign: "Three Swords Style Crest",
          compatibility: "Windows, Mac, Linux",
        },
        isPreOrder: true,
      },
      {
        name: "Naruto Akatsuki Stealth",
        description:
          "256GB stealth series with Akatsuki-themed assets and collections.",
        price: 139.99,
        storage: "256GB",
        collection: "Naruto",
        images: [
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
        ],
        specifications: {
          storageSize: "256GB USB 3.0",
          preloadedAnime: ["Akatsuki Saga", "Movies", "Art Collections"],
          logoDesign: "Akatsuki Cloud",
          compatibility: "Windows, Mac, Linux",
        },
        isPreOrder: true,
      },
      {
        name: "Attack on Titan Marley Archives",
        description:
          "64GB AoT companion focused on Marley and Warrior Unit.",
        price: 74.99,
        storage: "64GB",
        collection: "Attack on Titan",
        images: [
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        ],
        specifications: {
          storageSize: "64GB USB 3.0",
          preloadedAnime: ["Warrior Unit Episodes", "Soundtracks", "Wallpapers"],
          logoDesign: "Marley Military Insignia",
          compatibility: "Windows, Mac, Linux",
        },
        isPreOrder: true,
      },
    ];

    // Avoid duplicates by name
    const existing = await ctx.db.query("products").collect();
    const existingNames = new Set(existing.map((p) => p.name));

    let inserted = 0;
    for (const product of moreProducts) {
      if (!existingNames.has(product.name)) {
        await ctx.db.insert("products", product as any);
        inserted++;
      }
    }

    return `Inserted ${inserted} new products`;
  },
});

export const seedEvenMoreProducts = mutation({
  args: {},
  handler: async (ctx) => {
    const moreProducts = [
      {
        name: "Bleach Soul Reaper Drive",
        description:
          "64GB drive with Bleach highlights, wallpapers, and OST selections.",
        price: 69.99,
        storage: "64GB",
        collection: "Bleach",
        images: [
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
        ],
        specifications: {
          storageSize: "64GB USB 3.0",
          preloadedAnime: ["Soul Society Arc", "OST Collection", "Wallpapers"],
          logoDesign: "Gotei 13 Emblem",
          compatibility: "Windows, Mac, Linux",
        },
        isPreOrder: true,
      },
      {
        name: "Hunter x Hunter Nen Edition",
        description:
          "128GB drive with Hunter x Hunter arcs, themes, and extras.",
        price: 92.99,
        storage: "128GB",
        collection: "Hunter x Hunter",
        images: [
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
        ],
        specifications: {
          storageSize: "128GB USB 3.0",
          preloadedAnime: ["Yorknew City", "Chimera Ant Highlights", "OST"],
          logoDesign: "Hunter License Crest",
          compatibility: "Windows, Mac, Linux",
        },
        isPreOrder: true,
      },
      {
        name: "Fullmetal Alchemist State Alchemist",
        description:
          "64GB drive with FMA/Brotherhood curated content and themes.",
        price: 79.99,
        storage: "64GB",
        collection: "Fullmetal Alchemist",
        images: [
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        ],
        specifications: {
          storageSize: "64GB USB 3.0",
          preloadedAnime: ["Brotherhood Highlights", "OST", "Art Book PDFs"],
          logoDesign: "Flamel Symbol",
          compatibility: "Windows, Mac, Linux",
        },
        isPreOrder: true,
      },
      {
        name: "One Piece Straw Hat Crew Edition",
        description:
          "256GB drive packed with Grand Line arcs and exclusive extras.",
        price: 139.99,
        storage: "256GB",
        collection: "One Piece",
        images: [
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
        ],
        specifications: {
          storageSize: "256GB USB 3.0",
          preloadedAnime: ["East Blue to Enies Lobby", "Movies", "Wallpapers"],
          logoDesign: "Straw Hat Jolly Roger",
          compatibility: "Windows, Mac, Linux",
        },
        isPreOrder: true,
      },
      {
        name: "Demon Slayer Hashira Vault",
        description:
          "256GB high-capacity drive with Hashira-focused collections.",
        price: 149.99,
        storage: "256GB",
        collection: "Demon Slayer",
        images: [
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
        ],
        specifications: {
          storageSize: "256GB USB 3.0",
          preloadedAnime: ["Hashira Training", "Movie Extras", "OST"],
          logoDesign: "Wisteria Crest",
          compatibility: "Windows, Mac, Linux",
        },
        isPreOrder: true,
      },
      {
        name: "My Hero Academia All Might Legacy",
        description:
          "128GB drive celebrating All Might with curated hero content.",
        price: 99.99,
        storage: "128GB",
        collection: "My Hero Academia",
        images: [
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
        ],
        specifications: {
          storageSize: "128GB USB 3.0",
          preloadedAnime: ["All Might Highlights", "OST", "Wallpapers"],
          logoDesign: "Plus Ultra Crest",
          compatibility: "Windows, Mac, Linux",
        },
        isPreOrder: true,
      },
      {
        name: "Jujutsu Kaisen Gojo Six Eyes",
        description:
          "128GB drive centered on Gojo content, OSTs, and wallpapers.",
        price: 104.99,
        storage: "128GB",
        collection: "Jujutsu Kaisen",
        images: [
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        ],
        specifications: {
          storageSize: "128GB USB 3.0",
          preloadedAnime: ["Gojo Episodes", "OST", "Art Collections"],
          logoDesign: "Six Eyes Seal",
          compatibility: "Windows, Mac, Linux",
        },
        isPreOrder: true,
      },
      {
        name: "Attack on Titan Scout Regiment Vault",
        description:
          "256GB drive with complete Scout Regiment highlights and extras.",
        price: 159.99,
        storage: "256GB",
        collection: "Attack on Titan",
        images: [
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
        ],
        specifications: {
          storageSize: "256GB USB 3.0",
          preloadedAnime: ["Scout Regiment Anthology", "OST", "Movies"],
          logoDesign: "Wings of Freedom",
          compatibility: "Windows, Mac, Linux",
        },
        isPreOrder: true,
      },
      {
        name: "Dragon Ball Super Ultra Instinct",
        description:
          "128GB drive featuring DBS arcs with premium extras and OST.",
        price: 109.99,
        storage: "128GB",
        collection: "Dragon Ball Z",
        images: [
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
        ],
        specifications: {
          storageSize: "128GB USB 3.0",
          preloadedAnime: ["Tournament of Power Highlights", "OST", "Movies"],
          logoDesign: "Ultra Instinct Crest",
          compatibility: "Windows, Mac, Linux",
        },
        isPreOrder: true,
      },
      {
        name: "Naruto Nine-Tails Legacy",
        description:
          "64GB drive with Naruto legacy arcs, themes, and art packs.",
        price: 72.99,
        storage: "64GB",
        collection: "Naruto",
        images: [
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        ],
        specifications: {
          storageSize: "64GB USB 3.0",
          preloadedAnime: ["Kyuubi Saga", "OST Selection", "Wallpapers"],
          logoDesign: "Nine-Tails Seal",
          compatibility: "Windows, Mac, Linux",
        },
        isPreOrder: true,
      },
    ];

    const existing = await ctx.db.query("products").collect();
    const existingNames = new Set(existing.map((p) => p.name));

    let inserted = 0;
    for (const product of moreProducts) {
      if (!existingNames.has(product.name)) {
        await ctx.db.insert("products", product as any);
        inserted++;
      }
    }

    return `Inserted ${inserted} new products`;
  },
});