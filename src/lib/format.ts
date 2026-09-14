import { DeliveryOption, MomoNetwork, PaymentMethod } from "./types";

export function formatPrice(amount: number): string {
  return `GHS ${amount.toFixed(2)}`;
}

/** The delivery speeds offered at checkout, in the order they are listed. */
export const DELIVERY_OPTIONS: {
  id: DeliveryOption;
  label: string;
  note: string;
  price: number;
}[] = [
  {
    id: "standard",
    label: "Standard Delivery",
    note: "Delivery within 5-7 days",
    price: 0,
  },
  {
    id: "express",
    label: "Express Shipping",
    note: "Delivery within 1-3 days",
    price: 50,
  },
];

export function deliveryOption(id: DeliveryOption) {
  return DELIVERY_OPTIONS.find((o) => o.id === id) ?? DELIVERY_OPTIONS[0];
}

/** Networks a mobile money payment can be charged to. */
export const MOMO_NETWORKS: MomoNetwork[] = ["MTN", "Telecel", "AirtelTigo"];

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  card: "Credit card",
  momo: "Mobile Money",
  paypal: "PayPal",
  applepay: "Apple Pay",
};

/** Promo codes this build honours, as a share off the sub-total. */
const PROMO_CODES: Record<string, number> = {
  NVR10: 0.1,
  GRIND15: 0.15,
};

/**
 * Work out what a promo code is worth against a sub-total. Returns null when
 * the code is not one we know, so the caller can say so.
 */
export function promoDiscount(code: string, subtotal: number): number | null {
  const rate = PROMO_CODES[code.trim().toUpperCase()];
  if (rate === undefined) return null;
  return Math.round(subtotal * rate * 100) / 100;
}

export function generateOrderNumber(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}
