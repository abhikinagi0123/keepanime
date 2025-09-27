import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router";

export default function Product() {
  const { id } = useParams();
  const product = useQuery(api.products.getById, {
    id: id as unknown as Id<"products">,
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/shop" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to shop
          </Link>
        </div>

        {product === undefined && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {product === null && (
          <div className="text-center py-24">
            <p className="text-muted-foreground">Product not found.</p>
          </div>
        )}

        {product && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <Card className="overflow-hidden border-0">
              <div className="relative">
                <img
                  src={product.images?.[0] || "/placeholder-product.jpg"}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
                {product.isPreOrder && (
                  <Badge className="absolute top-3 left-3">Pre-Order</Badge>
                )}
              </div>
            </Card>

            <div className="space-y-6">
              <div className="space-y-2">
                <Badge variant="secondary" className="text-xs">{product.collection}</Badge>
                <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold">${product.price}</span>
                  <span className="text-sm text-muted-foreground">{product.storage}</span>
                </div>
              </div>

              <p className="text-muted-foreground">{product.description}</p>

              <div className="space-y-3">
                <h2 className="font-semibold">Specifications</h2>
                <Card className="border-0">
                  <CardContent className="p-4 text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <div className="text-muted-foreground">Storage</div>
                        <div className="font-medium">{product.specifications.storageSize}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Design</div>
                        <div className="font-medium">{product.specifications.logoDesign}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Compatibility</div>
                        <div className="font-medium">{product.specifications.compatibility}</div>
                      </div>
                      <div className="sm:col-span-2">
                        <div className="text-muted-foreground">Preloaded Content</div>
                        <div className="font-medium">
                          {product.specifications.preloadedAnime.join(", ")}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1">
                  {product.isPreOrder ? "Notify Me at Launch" : "Add to Cart"}
                </Button>
                <Link to={`/shop?collection=${encodeURIComponent(product.collection)}`}>
                  <Button variant="outline">View more in {product.collection}</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
