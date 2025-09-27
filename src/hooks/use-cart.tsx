import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  storage?: string;
  collection?: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  setQuantity: (id: string, qty: number) => void;
  total: number;
  count: number;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "keepanime_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

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

  const addItem = useCallback((item: Omit<CartItem, "quantity">, qty: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        const next = prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + qty } : p));
        toast.success("Added to cart");
        return next;
      }
      toast.success("Added to cart");
      return [...prev, { ...item, quantity: qty }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((p) => p.id !== id);
      toast.success("Removed from cart");
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    toast.success("Cart cleared");
  }, []);

  const setQuantity = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, Math.min(99, qty)) } : p)),
    );
  }, []);

  const total = useMemo(() => items.reduce((acc, i) => acc + i.price * i.quantity, 0), [items]);
  const count = useMemo(() => items.reduce((acc, i) => acc + i.quantity, 0), [items]);

  const value: CartContextType = { items, addItem, removeItem, clearCart, setQuantity, total, count };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
