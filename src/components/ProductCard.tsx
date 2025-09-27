import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Eye, Heart } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";

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
  const [open, setOpen] = useState(false); // Add dialog state
  const [email, setEmail] = useState(""); // Add email input state
  const [submitting, setSubmitting] = useState(false); // Add submitting state
  const subscribe = useMutation(api.newsletter.subscribe); // Add mutation
  const { addItem, items, removeItem } = useCart();
  const { toggle: toggleWishlist, has } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const wished = has(product._id);
  const inCart = items.some((i) => i.id === product._id);

  const handleAddToCart = () => {
    if (inCart) {
      removeItem(product._id); // Toggle off
      return;
    }
    addItem(
      {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0],
        storage: product.storage,
        collection: product.collection,
      },
      1,
    );
  };

  const handleNotify = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    setSubmitting(true);
    try {
      await subscribe({ email, source: `product:${product._id}` });
      toast.success("You'll be notified at launch!");
      setEmail("");
      setOpen(false);
    } catch (e) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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
          <div className="absolute top-2 right-2 flex gap-2 opacity-100 transition-opacity duration-300">
            <Button
              variant={wished ? "default" : "secondary"}
              size="icon"
              className="h-8 w-8"
              aria-label="Toggle wishlist"
              onClick={() =>
                toggleWishlist({
                  id: product._id,
                  name: product.name,
                  price: product.price,
                  image: product.images?.[0],
                  storage: product.storage,
                  collection: product.collection,
                })
              }
            >
              <Heart className={`h-4 w-4 ${wished ? "fill-current" : ""}`} />
            </Button>

            {!product.isPreOrder && (
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8"
                aria-label="Add to cart"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            )}
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
          {product.isPreOrder ? (
            isAuthenticated ? (
              <Button size="sm" className="flex-1" onClick={handleAddToCart}>
                {inCart ? "Added" : "Add to Cart"}
              </Button>
            ) : (
              <Button
                size="sm"
                className="flex-1"
                onClick={() => navigate("/auth")}
              >
                Notify Me
              </Button>
            )
          ) : (
            <Button size="sm" className="flex-1" onClick={handleAddToCart}>
              {inCart ? "Added" : "Add to Cart"}
            </Button>
          )}
        </CardFooter>

        {/* Notify Me Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Get notified at launch</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} disabled={submitting}>
                Cancel
              </Button>
              <Button onClick={handleNotify} disabled={submitting}>
                {submitting ? "Subscribing..." : "Notify Me"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </motion.div>
  );
}