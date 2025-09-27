import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type WishItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  storage?: string;
  collection?: string;
};

type WishlistContextType = {
  items: WishItem[];
  toggle: (item: WishItem) => void;
  has: (id: string) => boolean;
  count: number;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

const STORAGE_KEY = "keepanime_wishlist_v1";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const has = useCallback((id: string) => items.some((i) => i.id === id), [items]);

  const toggle = useCallback((item: WishItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) {
        toast.success("Removed from wishlist");
        return prev.filter((i) => i.id !== item.id);
      }
      toast.success("Added to wishlist");
      return [...prev, item];
    });
  }, []);

  const count = useMemo(() => items.length, [items]);

  const value: WishlistContextType = { items, toggle, has, count };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
