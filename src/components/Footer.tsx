import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Facebook, Instagram, Mail, Twitter, Youtube } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const subscribe = useMutation(api.newsletter.subscribe);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await subscribe({ email, source: "footer" });
      toast.success("Successfully subscribed to newsletter!");
      setEmail("");
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-muted/30 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">K</span>
              </div>
              <span className="font-bold text-xl">KeepAnime</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Anime in your pocket. Premium anime-themed pendrives with preloaded content.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/shop" className="block text-sm text-muted-foreground hover:text-primary">
                Shop
              </Link>
              <Link to="/collections" className="block text-sm text-muted-foreground hover:text-primary">
                Collections
              </Link>
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary">
                About Us
              </Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <div className="space-y-2">
              <Link to="/faq" className="block text-sm text-muted-foreground hover:text-primary">
                FAQ
              </Link>
              <Link to="/shipping" className="block text-sm text-muted-foreground hover:text-primary">
                Shipping Info
              </Link>
              <Link to="/returns" className="block text-sm text-muted-foreground hover:text-primary">
                Returns
              </Link>
              <Link to="/privacy" className="block text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get notified about our launch and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={isLoading}>
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 KeepAnime. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
