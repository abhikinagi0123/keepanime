import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { Menu, ShoppingBag, User } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Collections", href: "/collections" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const { items, total, count, removeItem, clearCart } = useCart();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">K</span>
            </div>
            <span className="font-bold text-xl">KeepAnime</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  {count > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
                      {count}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[360px] sm:w-[420px] p-0">
                <div className="p-4 flex items-center justify-between">
                  <div className="font-semibold">Your Cart</div>
                  <Button variant="ghost" size="sm" onClick={clearCart} disabled={items.length === 0}>
                    Clear
                  </Button>
                </div>
                <Separator />
                <ScrollArea className="h-[60vh]">
                  <div className="p-4 space-y-3">
                    {items.length === 0 && (
                      <div className="text-sm text-muted-foreground">Your cart is empty.</div>
                    )}
                    {items.map((i) => (
                      <div key={i.id} className="flex gap-3 items-center">
                        <img
                          src={i.image || "/placeholder-product.jpg"}
                          alt={i.name}
                          className="h-14 w-14 rounded object-cover"
                          loading="lazy"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium line-clamp-1">{i.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {i.storage || ""} {i.collection ? `• ${i.collection}` : ""}
                          </div>
                          <div className="text-sm">${(i.price * i.quantity).toFixed(2)} ({i.quantity}×)</div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeItem(i.id)} aria-label="Remove">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <Separator />
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                  </div>
                  <Button className="w-full" disabled={items.length === 0}>
                    Checkout (disabled)
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            {isAuthenticated ? (
              <Link to="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4 border-t">
                    {isAuthenticated ? (
                      <Link to="/profile">
                        <Button variant="outline" className="w-full">
                          Profile
                        </Button>
                      </Link>
                    ) : (
                      <Link to="/auth">
                        <Button className="w-full">Sign In</Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}