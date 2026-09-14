export interface ProductColor {
  name: string;
  hex: string;
  /** Second tone for a two-colour make-up, drawn as a split swatch. */
  hex2?: string;
  sku: string;
  /** Front of the garment: what the card and gallery open on. */
  front: string;
  /** Back of the garment, revealed on hover and in the gallery. */
  back?: string;
}

export type ProductBadge = "new" | "coming-soon";

export interface Product {
  id: string;
  name: string;
  category: "T-SHIRT" | "CAP" | "BEANIE";
  price: number;
  originalPrice?: number;
  /** Extra shots beyond the colourway fronts and backs, e.g. on the body. */
  images: string[];
  /** Alternate image shown when the F model toggle is active on the PDP */
  imageFemale?: string;
  description: string;
  details: string[];
  sizes: string[];
  colors: ProductColor[];
  collection: string;
  featured: boolean;
  inStock: boolean;
  badge?: ProductBadge;
  rating: number;
  reviewCount: number;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  /** Left off while a collection is still waiting on its cover shot. */
  image?: string;
  latest?: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
}

/** The two speeds offered at checkout. */
export type DeliveryOption = "standard" | "express";

export type PaymentMethod = "card" | "momo" | "paypal" | "applepay";

/** Mobile money networks that serve Ghana. */
export type MomoNetwork = "MTN" | "Telecel" | "AirtelTigo";

export interface OrderRecord {
  orderNumber: string;
  placedAt: string;
  items: CartItem[];
  email: string;
  shipping: ShippingInfo;
  delivery: DeliveryOption;
  paymentMethod: PaymentMethod;
  /** Only carried when the order was paid by mobile money. */
  momoNetwork?: MomoNetwork;
  subtotal: number;
  /** Amount taken off by a promo code, zero when none was used. */
  discount: number;
  promoCode: string | null;
  shippingCost: number;
  total: number;
}
