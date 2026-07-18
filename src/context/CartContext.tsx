"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CartItem } from "@/lib/types";
import { getProduct } from "@/lib/data";

const STORAGE_KEY = "nvrseynvr-cart";

interface CartContextValue {
  items: CartItem[];
  hydrated: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (item: CartItem) => void;
  updateQuantity: (
    productId: string,
    size: string,
    color: string,
    quantity: number
  ) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function sameLine(a: CartItem, productId: string, size: string, color: string) {
  return (
    a.productId === productId &&
    a.selectedSize === size &&
    a.selectedColor === color
  );
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: CartItem[] = JSON.parse(raw);
        setItems(parsed.filter((i) => getProduct(i.productId)));
      }
    } catch {
      // corrupted storage — start fresh
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) =>
        sameLine(i, item.productId, item.selectedSize, item.selectedColor)
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: string, color: string, quantity: number) => {
      setItems((prev) =>
        quantity <= 0
          ? prev.filter((i) => !sameLine(i, productId, size, color))
          : prev.map((i) =>
              sameLine(i, productId, size, color) ? { ...i, quantity } : i
            )
      );
    },
    []
  );

  const removeItem = useCallback(
    (productId: string, size: string, color: string) => {
      setItems((prev) => prev.filter((i) => !sameLine(i, productId, size, color)));
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);

  const { itemCount, subtotal } = useMemo(() => {
    let count = 0;
    let sum = 0;
    for (const item of items) {
      const product = getProduct(item.productId);
      if (!product) continue;
      count += item.quantity;
      sum += product.price * item.quantity;
    }
    return { itemCount: count, subtotal: sum };
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      hydrated,
      itemCount,
      subtotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [items, hydrated, itemCount, subtotal, addItem, updateQuantity, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
