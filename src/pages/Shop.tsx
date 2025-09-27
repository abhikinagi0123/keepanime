import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { useLocation } from "react-router";

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollection, setSelectedCollection] = useState<string>("");
  const [sortBy, setSortBy] = useState<"name" | "price" | "storage">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Sync collection filter from URL ?collection=
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const col = params.get("collection");
    if (col) {
      setSelectedCollection(col);
    } else {
      setSelectedCollection("");
    }
  }, [location.search]);

  const products = useQuery(api.products.list, {
    collection: selectedCollection === "all" ? undefined : selectedCollection || undefined,
    sortBy,
    sortOrder,
  });

  const collections = useQuery(api.products.getCollections);

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.collection.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
          <h1 className="text-4xl font-bold mb-4">Shop Anime Pendrives</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our premium collection of anime-themed USB drives, each preloaded with exclusive content
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-muted/30 rounded-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Collection Filter */}
            <Select value={selectedCollection} onValueChange={setSelectedCollection}>
              <SelectTrigger>
                <SelectValue placeholder="All Collections" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Collections</SelectItem>
                {collections?.map((collection) => (
                  <SelectItem key={collection.name} value={collection.name}>
                    {collection.name} ({collection.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={(value: "name" | "price" | "storage") => setSortBy(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="storage">Storage</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Order */}
            <Select value={sortOrder} onValueChange={(value: "asc" | "desc") => setSortOrder(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} products
            {selectedCollection && (
              <Badge variant="secondary" className="ml-2">
                {selectedCollection}
              </Badge>
            )}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
