import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Eye, Heart } from "lucide-react";
import { Link } from "react-router";

interface Product {
  _id: string;
  name: string;
  price: number;
  storage: string;
  collection: string;
  images: string[];
  isPreOrder: boolean;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  // Add consistent price formatting
  const priceDisplay = product.price.toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 hover:ring-1 hover:ring-primary/20">
        <div className="relative overflow-hidden">
          <Link to={`/product/${product._id}`} aria-label={`View ${product.name}`}>
            <img
              src={product.images[0] || "/placeholder-product.jpg"}
              alt={product.name}
              loading="lazy"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button variant="secondary" size="icon" className="h-8 w-8" aria-label="Add to wishlist">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          {product.isPreOrder && (
            <Badge className="absolute top-2 left-2 bg-primary">
              Pre-Order
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {product.collection}
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                {product.storage}
              </Badge>
            </div>
            <Link to={`/product/${product._id}`} className="block hover:underline">
              <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
            </Link>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">${priceDisplay}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 space-x-2">
          <Link to={`/product/${product._id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full" aria-label={`View ${product.name}`}>
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
          </Link>
          <Button size="sm" className="flex-1">
            {product.isPreOrder ? "Notify Me" : "Add to Cart"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}