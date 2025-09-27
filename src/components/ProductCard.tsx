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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="relative overflow-hidden">
          <img
            src={product.images[0] || "/placeholder-product.jpg"}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button variant="secondary" size="icon" className="h-8 w-8">
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
            <Badge variant="secondary" className="text-xs">
              {product.collection}
            </Badge>
            <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">${product.price}</span>
              <span className="text-xs text-muted-foreground">{product.storage}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 space-x-2">
          <Link to={`/product/${product._id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
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
