import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function Collections() {
  const collections = useQuery(api.products.getCollections);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Anime Collections</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our curated collections of anime-themed pendrives, organized by your favorite series
          </p>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections?.map((collection, index) => (
            <motion.div
              key={collection.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/shop?collection=${encodeURIComponent(collection.name)}`}>
                <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img
                      src={collection.image || "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop"}
                      alt={collection.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{collection.name}</h3>
                      <Badge variant="secondary" className="mt-2">
                        {collection.count} Products
                      </Badge>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {collections?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No collections available yet.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
