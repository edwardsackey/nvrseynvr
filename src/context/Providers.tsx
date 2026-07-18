"use client";

import { CartProvider } from "./CartContext";
import { CheckoutProvider } from "./CheckoutContext";
import { ToastProvider } from "./ToastContext";
import { WishlistProvider } from "./WishlistContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <CheckoutProvider>{children}</CheckoutProvider>
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
}
