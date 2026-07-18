"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { OrderRecord, ShippingInfo } from "@/lib/types";

const SHIPPING_KEY = "nvrseynvr-checkout-shipping";
const ORDER_KEY = "nvrseynvr-last-order";

const emptyShipping: ShippingInfo = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
  postalCode: "",
};

interface CheckoutContextValue {
  shipping: ShippingInfo;
  setShipping: (info: ShippingInfo) => void;
  shippingComplete: boolean;
  lastOrder: OrderRecord | null;
  placeOrder: (order: OrderRecord) => void;
  hydrated: boolean;
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [shipping, setShippingState] = useState<ShippingInfo>(emptyShipping);
  const [lastOrder, setLastOrder] = useState<OrderRecord | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const rawShipping = sessionStorage.getItem(SHIPPING_KEY);
      if (rawShipping) setShippingState(JSON.parse(rawShipping));
      const rawOrder = sessionStorage.getItem(ORDER_KEY);
      if (rawOrder) setLastOrder(JSON.parse(rawOrder));
    } catch {
      // corrupted storage — start fresh
    }
    setHydrated(true);
  }, []);

  const setShipping = useCallback((info: ShippingInfo) => {
    setShippingState(info);
    sessionStorage.setItem(SHIPPING_KEY, JSON.stringify(info));
  }, []);

  const placeOrder = useCallback((order: OrderRecord) => {
    setLastOrder(order);
    sessionStorage.setItem(ORDER_KEY, JSON.stringify(order));
    sessionStorage.removeItem(SHIPPING_KEY);
    setShippingState(emptyShipping);
  }, []);

  const shippingComplete = useMemo(() => {
    const required: (keyof ShippingInfo)[] = [
      "fullName",
      "phone",
      "address",
      "city",
      "country",
    ];
    return required.every((key) => shipping[key].trim().length > 0);
  }, [shipping]);

  const value = useMemo(
    () => ({
      shipping,
      setShipping,
      shippingComplete,
      lastOrder,
      placeOrder,
      hydrated,
    }),
    [shipping, setShipping, shippingComplete, lastOrder, placeOrder, hydrated]
  );

  return (
    <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used within CheckoutProvider");
  return ctx;
}
