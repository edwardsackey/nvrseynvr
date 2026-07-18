"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "nvrseynvr-wishlist";

interface WishlistContextValue {
  ids: string[];
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setIds(JSON.parse(raw));
    } catch {
      // corrupted storage — start fresh
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids, hydrated]);

  const isWishlisted = useCallback(
    (productId: string) => ids.includes(productId),
    [ids]
  );

  const toggleWishlist = useCallback(
    (productId: string) => {
      const adding = !ids.includes(productId);
      setIds((prev) =>
        adding ? [...prev, productId] : prev.filter((id) => id !== productId)
      );
      return adding;
    },
    [ids]
  );

  const value = useMemo(
    () => ({ ids, isWishlisted, toggleWishlist }),
    [ids, isWishlisted, toggleWishlist]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
