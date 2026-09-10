export interface ProductColor {
  name: string;
  hex: string;
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
  image: string;
  latest?: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export type PaymentMethod = "card" | "momo";

export interface OrderRecord {
  orderNumber: string;
  placedAt: string;
  items: CartItem[];
  email: string;
  shipping: ShippingInfo | null;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingCost: number | null;
  total: number;
}
