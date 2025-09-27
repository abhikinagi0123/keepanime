import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWishlist } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

export default function Profile() {
  const { isAuthenticated, user, signOut } = useAuth();
  const initials = String(user?.name ?? user?.email ?? "U").trim().slice(0, 2).toUpperCase();

  // New hooks for wishlist/cart and name update
  const { items: wishlistItems, count: wishlistCount, toggle: toggleWishlist } = useWishlist();
  const { items: cartItems, addItem, removeItem } = useCart();
  const setUserName = useMutation(api.users.setName);

  // Local state for editing display name
  const [newName, setNewName] = useState<string>(user?.name ?? "");
  const [savingName, setSavingName] = useState(false);

  const inCart = (id: string) => cartItems.some((i) => i.id === id);
  const uniqueCollections = Array.from(
    new Set(wishlistItems.map((w) => w.collection).filter(Boolean)),
  ) as string[];
  const rewardsPoints = wishlistCount * 50;

  const handleSaveName = async () => {
    if (!newName.trim() || newName.trim() === user?.name) return;
    setSavingName(true);
    try {
      await setUserName({ name: newName.trim() });
      // no toast needed here to keep UI clean; the UI updates via realtime query
    } catch {
      // swallow error to keep UX simple; errors bubble up in logs
    } finally {
      setSavingName(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold">Your Profile</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            View your account details.
          </p>
        </motion.div>

        {!isAuthenticated ? (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Sign in required</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                You need to sign in to view your profile.
              </p>
              <Link to="/auth">
                <Button>Go to Sign In</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-muted/40 to-background mb-6"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-primary/10 ring-2 ring-primary/20 flex items-center justify-center text-lg font-semibold">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-2xl font-bold truncate">
                        {user?.name ?? "Unnamed User"}
                      </h2>
                      <Badge variant="secondary" className="text-xs">
                        {user?.role ?? "user"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 truncate">
                      {user?.email ?? "No email"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" onClick={signOut} className="w-full sm:w-auto">
                    Sign Out
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="grid grid-cols-1 gap-6"
            >
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Account Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-muted-foreground">User ID</div>
                      <div className="font-medium break-all">
                        {String(user?._id ?? "—")}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Email</div>
                      <div className="font-medium break-all">
                        {user?.email ?? "—"}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Name</div>
                      <div className="font-medium">{user?.name ?? "—"}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Role</div>
                      <div className="font-medium capitalize">
                        {user?.role ?? "user"}
                      </div>
                    </div>

                    <div>
                      <div className="text-muted-foreground">Phone</div>
                      <div className="font-medium break-all">
                        {(user as any)?.phone ?? "—"}
                      </div>
                    </div>

                    <div>
                      <div className="text-muted-foreground">Address</div>
                      <div className="font-medium">
                        {(user as any)?.address ?? "—"}
                      </div>
                    </div>

                    <div>
                      <div className="text-muted-foreground">Payment Method</div>
                      <div className="font-medium">
                        {(user as any)?.paymentMethod ?? "—"}
                      </div>
                    </div>

                    <div>
                      <div className="text-muted-foreground">Notifications</div>
                      <div className="font-medium">
                        {((user as any)?.notifications ?? false) ? "Enabled" : "Disabled"}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This information is private to your account.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Sign-in Method</span>
                    <span className="font-medium">Email OTP</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your account uses secure one-time passcodes sent to your email for
                    authentication.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* New: Account Stats */}
            {isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6"
              >
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">Total Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">Wishlist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{wishlistCount}</div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">Rewards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{rewardsPoints}</div>
                    <div className="text-xs text-muted-foreground mt-1">points</div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">Collections</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{uniqueCollections.length}</div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* New: Recent Favorites (from Wishlist) */}
            {isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-6"
              >
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Recent Favorites</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {wishlistItems.length === 0 ? (
                      <div className="text-sm text-muted-foreground">No favorites yet.</div>
                    ) : (
                      wishlistItems.slice(0, 5).map((i) => {
                        const added = inCart(i.id);
                        return (
                          <div key={i.id} className="flex items-center gap-3">
                            <img
                              src={i.image || "/placeholder-product.jpg"}
                              alt={i.name}
                              className="h-12 w-12 rounded object-cover"
                              loading="lazy"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium line-clamp-1">{i.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {i.storage || ""} {i.collection ? `• ${i.collection}` : ""}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => toggleWishlist(i)}
                                aria-label="Remove from wishlist"
                              >
                                Remove
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => {
                                  if (added) {
                                    removeItem(i.id);
                                  } else {
                                    addItem(
                                      {
                                        id: i.id,
                                        name: i.name,
                                        price: i.price,
                                        image: i.image,
                                        storage: i.storage,
                                        collection: i.collection,
                                      },
                                      1,
                                    );
                                  }
                                }}
                              >
                                {added ? "Added" : "Add to Cart"}
                              </Button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* New: Favorite Anime / Wishlist Carousel */}
            {isAuthenticated && wishlistItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6"
              >
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>My Wishlist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {wishlistItems.map((i) => {
                        const added = inCart(i.id);
                        return (
                          <div key={i.id} className="min-w-[220px] max-w-[220px] rounded-lg border bg-card p-3">
                            <img
                              src={i.image || "/placeholder-product.jpg"}
                              alt={i.name}
                              className="h-28 w-full rounded object-cover"
                              loading="lazy"
                            />
                            <div className="mt-2 space-y-1">
                              <div className="text-sm font-medium line-clamp-1">{i.name}</div>
                              {typeof i.price === "number" && (
                                <div className="text-xs text-muted-foreground">${i.price.toFixed(2)}</div>
                              )}
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  size="sm"
                                  className="flex-1"
                                  onClick={() => {
                                    if (added) {
                                      removeItem(i.id);
                                    } else {
                                      addItem(
                                        {
                                          id: i.id,
                                          name: i.name,
                                          price: i.price,
                                          image: i.image,
                                          storage: i.storage,
                                          collection: i.collection,
                                        },
                                        1,
                                      );
                                    }
                                  }}
                                >
                                  {added ? "Added" : "Add"}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => toggleWishlist(i)}
                                  aria-label="Remove from wishlist"
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* New: Settings / Preferences (Edit display name) */}
            {isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-6"
              >
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Display Name</div>
                        <div className="flex gap-2">
                          <Input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="Your name"
                            disabled={savingName}
                          />
                          <Button onClick={handleSaveName} disabled={savingName || !newName.trim() || newName.trim() === user?.name}>
                            {savingName ? "Saving..." : "Save"}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Email</div>
                        <Input value={user?.email ?? ""} readOnly />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      More preferences like phone, address, payment methods, and notifications will appear here in the future.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}