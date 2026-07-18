export function formatPrice(amount: number): string {
  return `GHS ${amount.toFixed(2)}`;
}

/** Flat delivery fee applied once shipping details are entered. */
export const DELIVERY_FEE = 30;

export function generateOrderNumber(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}
