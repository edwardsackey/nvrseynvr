"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { chosenImage, getProduct } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { CartItem } from "@/lib/types";

export function ShoppingBag({
  items,
  itemCount,
  subtotal,
  shippingCost,
  discount,
  promoCode,
  promoError,
  onApplyPromo,
  onClearPromo,
  total,
}: {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shippingCost: number;
  discount: number;
  promoCode: string | null;
  promoError: string | null;
  onApplyPromo: (code: string) => void;
  onClearPromo: () => void;
  total: number;
}) {
  const [draft, setDraft] = useState("");

  return (
    <section aria-labelledby="bag-heading">
      <h2 id="bag-heading" className="text-[17px] sm:text-[19px]">
        Shopping Bag ({itemCount})
      </h2>

      <ul className="mt-5 space-y-4">
        {items.map((item) => {
          const product = getProduct(item.productId);
          if (!product) return null;
          const src = chosenImage(product, item.selectedColor);
          return (
            <li
              key={`${item.productId}-${item.selectedSize}-${item.selectedColor}`}
              className="flex gap-3.5 sm:gap-4"
            >
              <Link
                href={`/products/${product.id}`}
                className="relative block h-[86px] w-[68px] shrink-0 overflow-hidden bg-card sm:h-[100px] sm:w-[78px]"
              >
                <Image src={src} alt={product.name} fill sizes="80px" className="object-cover" />
              </Link>

              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="truncate text-[13px] font-bold sm:text-[14px]">{product.name}</p>
                  <p className="whitespace-nowrap text-[13px] sm:text-[14px]">
                    {formatPrice(product.price * item.quantity)}
                  </p>
                </div>
                <dl className="mt-1.5 space-y-0.5 text-[10px] text-black/55 sm:text-[11px]">
                  <div className="flex gap-1.5">
                    <dt>Size:</dt>
                    <dd>{item.selectedSize}</dd>
                  </div>
                  <div className="flex gap-1.5">
                    <dt>Color:</dt>
                    <dd>{item.selectedColor}</dd>
                  </div>
                  <div className="flex gap-1.5">
                    <dt>Quantity:</dt>
                    <dd>{item.quantity}</dd>
                  </div>
                </dl>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Promo code */}
      <div className="mt-7 border-t border-black/15 pt-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onApplyPromo(draft);
          }}
          className="flex items-stretch gap-3"
        >
          <label htmlFor="promocode" className="sr-only">
            Promocode
          </label>
          <input
            id="promocode"
            value={draft}
            onChange={(e) => setDraft(e.target.value.toUpperCase())}
            placeholder="Promocode"
            autoComplete="off"
            className="h-10 min-w-0 flex-1 border-0 border-b border-b-black/25 bg-transparent text-[12px] uppercase tracking-wide placeholder:normal-case placeholder:tracking-normal placeholder:text-black/40 focus:border-b-black focus:outline-none sm:text-[13px]"
          />
          <button
            type="submit"
            className="h-10 w-[120px] shrink-0 bg-[#e4e3df] text-[10px] font-bold tracking-[0.18em] transition-colors hover:bg-[#d8d7d2] sm:w-[148px] sm:text-[11px]"
          >
            APPLY
          </button>
        </form>
        {promoError && <p className="mt-2 text-[11px] text-red-600">{promoError}</p>}
        {promoCode && (
          <p className="mt-2 flex items-center gap-2 text-[11px] text-black/60">
            <span className="font-bold text-black">{promoCode}</span> applied
            <button
              type="button"
              onClick={() => {
                onClearPromo();
                setDraft("");
              }}
              className="underline underline-offset-2 hover:text-black"
            >
              remove
            </button>
          </p>
        )}
      </div>

      {/* Totals */}
      <dl className="mt-6 space-y-2.5 border-b border-black/15 pb-5 text-[12px] sm:text-[13px]">
        <div className="flex justify-between">
          <dt className="text-black/60">Sub-total</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-black/60">Shipping</dt>
          <dd>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-black/60">Discount</dt>
          <dd>{discount > 0 ? `- ${formatPrice(discount)}` : formatPrice(0)}</dd>
        </div>
      </dl>

      <div className="mt-5 flex items-baseline justify-between">
        <p className="text-[19px] font-bold sm:text-[22px]">Total:</p>
        <p data-testid="bag-total" className="text-[19px] font-bold sm:text-[22px]">
          {formatPrice(total)}
        </p>
      </div>
    </section>
  );
}
