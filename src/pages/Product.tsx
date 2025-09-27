import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Heart } from "lucide-react";
import { Link, useParams } from "react-router";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";

export default function Product() {
  const { id } = useParams();
  const product = useQuery(api.products.getById, {
    id: id as unknown as Id<"products">,
  });

  // Add related products query (skips until product is loaded)
  const related = useQuery(
    api.products.getRelated,
    product
      ? {
          productId: product._id as Id<"products">,
          collection: product.collection,
          limit: 4,
        }
      : "skip",
  );

  const [open, setOpen] = useState(false); // Add dialog state
  const [email, setEmail] = useState(""); // Add email input state
  const [submitting, setSubmitting] = useState(false); // Add submitting state
  const subscribe = useMutation(api.newsletter.subscribe); // Add mutation
  const { addItem } = useCart();
  const { toggle: toggleWishlist, has } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleNotify = async () => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    if (!product) return;
    setSubmitting(true);
    try {
      await subscribe({ email, source: `product:${product._id}` });
      toast.success("You'll be notified at launch!");
      setEmail("");
      setOpen(false);
    } catch {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product._id as unknown as string,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      storage: product.storage,
      collection: product.collection,
    }, 1);
  };

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
          <>
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
                    loading="lazy"
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
                    <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
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
                  {product && (
                    <Button
                      variant={has(product._id as unknown as string) ? "default" : "outline"}
                      size="icon"
                      aria-label="Toggle wishlist"
                      onClick={() =>
                        toggleWishlist({
                          id: product._id as unknown as string,
                          name: product.name,
                          price: product.price,
                          image: product.images?.[0],
                          storage: product.storage,
                          collection: product.collection,
                        })
                      }
                    >
                      <Heart
                        className={`h-4 w-4 ${has(product._id as unknown as string) ? "fill-current" : ""}`}
                      />
                    </Button>
                  )}
                  <Button
                    className="flex-1"
                    onClick={() =>
                      product.isPreOrder
                        ? isAuthenticated
                          ? handleAddToCart() // If logged in and pre-order, convert to Add to Cart
                          : navigate("/auth") // If not logged in, go to auth
                        : handleAddToCart()
                    }
                  >
                    {product.isPreOrder
                      ? isAuthenticated
                        ? "Add to Cart"
                        : "Notify Me at Launch"
                      : "Add to Cart"}
                  </Button>
                  <Link to={`/shop?collection=${encodeURIComponent(product.collection)}`}>
                    <Button variant="outline">View more in {product.collection}</Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Notify Me Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Get notified for this product</DialogTitle>
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

            {/* Related Products */}
            {related && related.length > 0 && (
              <section className="mt-16">
                <h2 className="text-2xl font-bold tracking-tight mb-6">
                  Related Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {related.map((p, idx) => (
                    <ProductCard key={p._id} product={p as any} index={idx} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}