import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CountdownTimer from "@/components/CountdownTimer";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Star, Users, Package, Shield } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const products = useQuery(api.products.list, { sortBy: "name", sortOrder: "asc" });
  const collections = useQuery(api.products.getCollections);
  const subscribe = useMutation(api.newsletter.subscribe);

  // Launch date (3-4 months from now)
  const launchDate = new Date();
  launchDate.setMonth(launchDate.getMonth() + 3);

  const handleNotifyMe = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/auth");
  };

  const featuredProducts = products?.slice(0, 4) || [];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-primary/5 to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <Badge className="w-fit">Coming Soon</Badge>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                  Anime in Your
                  <span className="block bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Pocket
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Premium anime-themed pendrives preloaded with your favorite series. 
                  Collectible, practical, and digital.
                </p>
              </div>

              {subscribed || isAuthenticated ? (
                <div className="text-sm bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-500/15 dark:to-emerald-500/15 border border-green-500/30 dark:border-green-500/40 rounded-md px-3 py-2 w-fit shadow-sm">
                  You'll be notified when we launch!
                </div>
              ) : (
                <form onSubmit={handleNotifyMe} className="flex space-x-2 max-w-md">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 rounded-lg"
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading} className="rounded-lg shadow-sm hover:shadow transition-shadow">
                    Notify Me
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>1000+ Waiting</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 fill-current text-yellow-500" />
                  <span>Premium Quality</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1625948515291-69613efd103f?w=600&h=400&fit=crop"
                  alt="One Piece Themed Anime Pendrive"
                  className="w-full rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-2xl" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Official Launch In</h2>
              <p className="text-muted-foreground">
                Be the first to get your hands on our premium anime pendrives
              </p>
            </div>
            <CountdownTimer targetDate={launchDate} className="justify-center" />
          </motion.div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl font-bold">Featured Collections</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully curated anime collections, each with unique designs and preloaded content
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections?.slice(0, 3).map((collection, index) => (
              <motion.div
                key={collection.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/shop?collection=${encodeURIComponent(collection.name)}`} aria-label={`View ${collection.name} collection`}>
                  <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 rounded-xl">
                    <div className="relative overflow-hidden">
                      <img
                        src={collection.image || "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop"}
                        alt={collection.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold">{collection.name}</h3>
                        <p className="text-sm opacity-90">{collection.count} Products</p>
                      </div>
                      <div className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-white/80 text-gray-900 shadow backdrop-blur">
                        Explore
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/collections">
              <Button variant="outline" size="lg">
                View All Collections
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-4 mb-12"
            >
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <p className="text-muted-foreground">
                Get a sneak peek at our upcoming anime pendrive collection
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link to="/shop">
                <Button size="lg">
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl font-bold">Why Choose KeepAnime?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine premium quality with authentic anime designs to create the perfect collectible storage solution
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Package,
                title: "Premium Quality",
                description: "High-speed USB 3.0 drives with durable anime-themed designs that last."
              },
              {
                icon: Play,
                title: "Preloaded Content",
                description: "Each drive comes with carefully selected anime episodes and exclusive content."
              },
              {
                icon: Shield,
                title: "Authentic Designs",
                description: "Officially licensed artwork and designs from your favorite anime series."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto ring-1 ring-primary/10">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}