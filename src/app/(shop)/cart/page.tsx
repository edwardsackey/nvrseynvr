"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { chosenImage, frontImage, getProduct, products } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import {
  CloseIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "@/components/ui/icons";
import { Reveal } from "@/components/motion/Reveal";

function PairedSidebar() {
  const { items } = useCart();
  const inCart = new Set(items.map((i) => i.productId));
  const suggestions = products.filter((p) => !inCart.has(p.id)).slice(0, 3);

  return (
    <aside className="hidden w-[240px] shrink-0 bg-card px-5 py-8 lg:block">
      <h2 className="text-[20px] font-bold leading-tight">
        CAN BE
        <br />
        PAIRED WITH
      </h2>
      <Reveal group className="mt-6 space-y-7">
        {suggestions.map((p) => (
          <Link key={p.id} href={`/products/${p.id}`} className="group card-lift block">
            <div className="relative aspect-square w-full overflow-hidden bg-white">
              <Image
                src={frontImage(p)}
                alt={p.name}
                fill
                sizes="200px"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              />
            </div>
            <p className="mt-2 font-blackletter text-[10px] text-black/70">nvrsëynvr</p>
            <p className="mt-0.5 text-[12px] font-bold tracking-wide">{p.name}</p>
            <p className="mt-0.5 text-[11px] text-black/50">{formatPrice(p.price)}</p>
          </Link>
        ))}
      </Reveal>
    </aside>
  );
}

export default function CartPage() {
  const router = useRouter();
  const { items, hydrated, itemCount, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <div className="mx-auto flex w-full max-w-site gap-0 px-0 pb-10 lg:px-8">
      <PairedSidebar />

      <div className="flex min-h-[70vh] flex-1 flex-col px-4 pt-2 lg:px-12">
        <Reveal className="flex items-center justify-between border-b border-black/40 pb-4">
          <h1 className="text-[24px] font-bold tracking-wide sm:text-[28px]">
            SHOPPING CART ({hydrated ? itemCount : 0})
          </h1>
          <button
            aria-label="Close cart"
            onClick={() => router.back()}
            className="transition-transform duration-300 hover:rotate-90"
          >
            <CloseIcon className="h-7 w-7" />
          </button>
        </Reveal>

        {!hydrated ? (
          <p className="py-16 text-[14px] text-black/50">Loading your cart…</p>
        ) : items.length === 0 ? (
          <Reveal className="flex flex-1 flex-col items-start justify-center gap-5 py-16">
            <p className="text-[22px] font-bold">Your cart is empty.</p>
            <p className="max-w-sm text-[14px] text-black/60">
              Built for the ones who never gave up — the drop is waiting.
            </p>
            <Link
              href="/shop"
              className="btn-swipe btn-swipe-light border border-black bg-black px-8 py-3 text-[13px] font-bold tracking-widest text-white"
            >
              SHOP THE DROP
            </Link>
          </Reveal>
        ) : (
          <>
            {/* Items */}
            <Reveal as="ul" group>
              {items.map((item) => {
                const product = getProduct(item.productId);
                if (!product) return null;
                return (
                  <li
                    key={`${item.productId}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex gap-5 border-b border-black/30 py-6 sm:gap-8"
                  >
                    <Link
                      href={`/products/${product.id}`}
                      className="relative block h-32 w-32 shrink-0 overflow-hidden bg-card sm:h-40 sm:w-44"
                    >
                      <Image
                        src={chosenImage(product, item.selectedColor)}
                        alt={product.name}
                        fill
                        sizes="176px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <p className="text-[17px] font-bold tracking-wide sm:text-[20px]">
                        {product.name}
                      </p>
                      <p className="mt-1 text-[12px] font-bold tracking-widest text-black/80">
                        {product.category}
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-[13px]">
                        {item.selectedSize}
                        <Link
                          href={`/products/${product.id}`}
                          className="text-[12px] underline underline-offset-2"
                        >
                          CHANGE
                        </Link>
                      </p>
                      <p className="mt-3 text-[13px]">{formatPrice(product.price)}</p>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <button
                            aria-label="Decrease quantity"
                            onClick={() =>
                              updateQuantity(item.productId, item.selectedSize, item.selectedColor, item.quantity - 1)
                            }
                            className="flex h-7 w-7 items-center justify-center border border-black/50"
                          >
                            <MinusIcon className="h-3.5 w-3.5" />
                          </button>
                          <span className="flex h-7 w-8 items-center justify-center border border-black/50 text-[12px]">
                            {item.quantity}
                          </span>
                          <button
                            aria-label="Increase quantity"
                            onClick={() =>
                              updateQuantity(item.productId, item.selectedSize, item.selectedColor, item.quantity + 1)
                            }
                            className="flex h-7 w-7 items-center justify-center border border-black/50"
                          >
                            <PlusIcon className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          aria-label={`Remove ${product.name} from cart`}
                          onClick={() => removeItem(item.productId, item.selectedSize, item.selectedColor)}
                          className="text-black/70 transition-colors hover:text-black"
                        >
                          <TrashIcon className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </Reveal>

            {/* Totals + checkout */}
            <Reveal className="mt-auto pt-10">
              <div className="mb-4 flex justify-end gap-10 text-[13px]">
                <div className="space-y-1.5 text-right">
                  <p className="text-black/60">Sub-total</p>
                  <p className="text-black/60">Shipping</p>
                  <p className="font-bold">Total</p>
                </div>
                <div className="space-y-1.5 text-right font-bold">
                  <p>{formatPrice(subtotal)}</p>
                  <p className="text-[12px] font-normal text-black/60">chosen at checkout</p>
                  <p>{formatPrice(subtotal)}</p>
                </div>
              </div>
              <div className="border-t border-black/40 pt-6">
                <Link
                  href="/checkout"
                  className="btn-swipe btn-swipe-light block w-full border border-black bg-black py-4 text-center text-[14px] font-bold tracking-widest text-white"
                >
                  CHECKOUT - {formatPrice(subtotal)}
                </Link>
              </div>
            </Reveal>
          </>
        )}
      </div>
    </div>
  );
}
