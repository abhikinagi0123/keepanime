import { Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useWishlist } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Profile() {
  const { isAuthenticated, user, signOut } = useAuth();
  const initials = String(user?.name ?? user?.email ?? "U").trim().slice(0, 2).toUpperCase();

  // New hooks for wishlist/cart and name update
  const { items: wishlistItems, count: wishlistCount, toggle: toggleWishlist } = useWishlist();
  const { items: cartItems, addItem, removeItem } = useCart();
  const setUserName = useMutation(api.users.setName);
  const updatePreferences = useMutation(api.users.updatePreferences);

  // Local state for editing display name
  const [newName, setNewName] = useState<string>(user?.name ?? "");
  // Unified saving state for all settings
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Add local states for preferences
  const [phone, setPhone] = useState<string>((user as any)?.phone ?? "");
  const [address, setAddress] = useState<string>((user as any)?.address ?? "");
  const [paymentMethod, setPaymentMethod] = useState<string>((user as any)?.paymentMethod ?? "");
  // Add: notifications preference state
  const [notifications, setNotifications] = useState<boolean>(Boolean((user as any)?.notifications ?? false));

  const inCart = (id: string) => cartItems.some((i) => i.id === id);
  const uniqueCollections = Array.from(
    new Set(wishlistItems.map((w) => w.collection).filter(Boolean)),
  ) as string[];
  const rewardsPoints = wishlistCount * 50;

  // Unified save handler: saves name and preferences together
  const handleSaveSettings = async () => {
    const trimmedName = newName.trim();
    const shouldUpdateName = trimmedName && trimmedName !== (user?.name ?? "");
    setSavingSettings(true);
    try {
      if (shouldUpdateName) {
        await setUserName({ name: trimmedName });
      }
      await updatePreferences({
        phone: phone || undefined,
        address: address || undefined,
        paymentMethod: paymentMethod || undefined,
        // Add: include notifications
        notifications,
      });
    } catch {
      // keep UI minimal; errors visible in logs
    } finally {
      setSavingSettings(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-white via-primary/5 to-muted/20 ring-1 ring-primary/10 shadow-sm mb-6"
              >
                <div className="px-6 sm:px-10 py-8">
                  {/* Adjust grid to add a right-side column on large screens */}
                  <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] lg:grid-cols-[auto,1fr,auto] items-start gap-8 lg:gap-10 text-left">
                    <div className="relative shrink-0 mx-auto md:mx-0">
                      <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-primary/10 ring-2 ring-primary/40 shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex items-center justify-center text-2xl font-semibold">
                        {initials}
                      </div>
                      <div className="absolute -inset-1 rounded-full blur-xl bg-primary/10 pointer-events-none" />
                    </div>

                    <div className="flex-1">
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        {user?.name ?? "Unnamed User"}
                      </h2>
                      <div className="mt-2 flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className="text-xs">
                          Anime Collector
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {user?.role ?? "user"}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {user?.email ?? "No email"}
                      </p>
                      {/* Account Highlights to reduce empty space and add context */}
                      <div className="mt-3 flex flex-wrap gap-2 text-sm">
                        <div className="px-3 py-1 rounded-full bg-primary/5 ring-1 ring-primary/10">
                          Rewards: {rewardsPoints}
                        </div>
                        <div className="px-3 py-1 rounded-full bg-primary/5 ring-1 ring-primary/10">
                          Wishlist: {wishlistCount}
                        </div>
                        <div className="px-3 py-1 rounded-full bg-primary/5 ring-1 ring-primary/10">
                          Collections: {uniqueCollections.length}
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          className="gap-2"
                          onClick={() => {
                            setSettingsOpen(true);
                            requestAnimationFrame(() => {
                              const el = document.getElementById("settings");
                              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                            });
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                          Edit Profile
                        </Button>
                        <Button variant="ghost" onClick={signOut}>
                          Sign Out
                        </Button>
                      </div>
                    </div>

                    {/* Right-side Quick Summary (desktop only) */}
                    <div className="hidden lg:block">
                      <Card className="border-0 shadow-sm w-[260px]">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Quick Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Orders</span>
                            <span className="font-medium">0</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Wishlist</span>
                            <span className="font-medium">{wishlistCount}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Rewards</span>
                            <span className="font-medium">{rewardsPoints}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Collections</span>
                            <span className="font-medium">{uniqueCollections.length}</span>
                          </div>
                          <div className="pt-1">
                            <Link to="/shop">
                              <Button variant="outline" className="w-full" size="sm">
                                View Wishlist & Shop
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
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
                            <div key={i.id} className="flex items-center gap-3 rounded-md hover:bg-muted/30 transition-colors">
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
                            <div key={i.id} className="min-w-[220px] max-w-[220px] rounded-lg border bg-card p-3 transition-all hover:shadow-md hover:ring-2 hover:ring-primary/30">
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

              {/* Settings / Preferences: Always visible as a dropdown */}
              {isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="mt-6"
                  id="settings"
                >
                  <Accordion
                    type="single"
                    collapsible
                    value={settingsOpen ? "settings" : ""}
                    onValueChange={(v) => setSettingsOpen(v === "settings")}
                    className="w-full"
                  >
                    <AccordionItem value="settings" className="border rounded-lg shadow-sm bg-card">
                      <AccordionTrigger className="px-4 py-3 hover:no-underline">
                        <div className="flex flex-col items-start text-left w-full">
                          <div className="font-semibold">Settings</div>
                          <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {[
                              `Name: ${String((newName || user?.name || "—")).trim()}`,
                              `Email: ${user?.email ?? "—"}`,
                              `Phone: ${phone || "—"}`,
                              `Address: ${address || "—"}`,
                              `Payment: ${paymentMethod || "—"}`,
                            ].join(" • ")}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-0 pb-0">
                        <Card className="border-0 shadow-sm rounded-none border-t">
                          <CardContent className="space-y-5 pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Display Name</div>
                                <Input
                                  value={newName}
                                  onChange={(e) => setNewName(e.target.value)}
                                  placeholder="Your name"
                                  disabled={savingSettings}
                                />
                              </div>

                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Email</div>
                                <Input value={user?.email ?? ""} readOnly />
                              </div>

                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Phone</div>
                                <Input
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  placeholder="Enter phone number"
                                  disabled={savingSettings}
                                />
                              </div>

                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Address</div>
                                <Input
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                  placeholder="Enter address"
                                  disabled={savingSettings}
                                />
                              </div>

                              <div className="md:col-span-2">
                                <div className="text-xs text-muted-foreground mb-1">Payment Method</div>
                                <Input
                                  value={paymentMethod}
                                  onChange={(e) => setPaymentMethod(e.target.value)}
                                  placeholder="Card ending •••• 4242"
                                  disabled={savingSettings}
                                />
                              </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                              <Button
                                variant="outline"
                                onClick={() => setSettingsOpen(false)}
                                disabled={savingSettings}
                              >
                                Close
                              </Button>
                              <Button
                                onClick={async () => {
                                  await handleSaveSettings();
                                  setSettingsOpen(false);
                                }}
                                disabled={savingSettings}
                                className="px-6"
                              >
                                {savingSettings ? "Saving..." : "Save Changes"}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}