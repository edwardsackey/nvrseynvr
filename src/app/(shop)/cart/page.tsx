"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";
import { getProduct, products } from "@/lib/data";
import { DELIVERY_FEE, formatPrice } from "@/lib/format";
import { ShippingInfo } from "@/lib/types";
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
                src={p.images[0]}
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

function DeliveryForm() {
  const { shipping, setShipping } = useCheckout();
  const [form, setForm] = useState<ShippingInfo>(shipping);
  const [saved, setSaved] = useState(false);

  function update(field: keyof ShippingInfo, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function save() {
    setShipping(form);
    setSaved(true);
  }

  const fieldCls =
    "h-11 w-full border-[0.5px] border-black/50 px-3 text-[14px] placeholder:text-black/40 focus:border-black focus:outline-none";

  return (
    <div className="grid gap-4 pb-2 sm:grid-cols-2">
      <label className="block">
        <span className="mb-1.5 block text-[14px] font-bold">Full Name</span>
        <input className={fieldCls} value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Eg: Mensah Edward Sackey" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[14px] font-bold">Phone</span>
        <input className={fieldCls} type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+233 20 000 0000" />
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-[14px] font-bold">Address</span>
        <input className={fieldCls} value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Street, house number" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[14px] font-bold">City</span>
        <input className={fieldCls} value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Accra" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[14px] font-bold">Country</span>
        <input className={fieldCls} value={form.country} onChange={(e) => update("country", e.target.value)} placeholder="Ghana" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[14px] font-bold">Postal Code</span>
        <input className={fieldCls} value={form.postalCode} onChange={(e) => update("postalCode", e.target.value)} placeholder="GA-145" />
      </label>
      <div className="flex items-end">
        <button
          onClick={save}
          className="btn-swipe btn-swipe-light h-11 w-full border border-black bg-black text-[13px] font-bold tracking-widest text-white"
        >
          {saved ? "SAVED ✓" : "SAVE DETAILS"}
        </button>
      </div>
    </div>
  );
}

export default function CartPage() {
  const router = useRouter();
  const { items, hydrated, itemCount, subtotal, updateQuantity, removeItem } = useCart();
  const { shippingComplete } = useCheckout();
  const [openSection, setOpenSection] = useState<"payment" | "delivery" | null>(null);

  const shippingCost = shippingComplete ? DELIVERY_FEE : null;
  const total = subtotal + (shippingCost ?? 0);

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
                        src={product.images[0]}
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

            {/* Accordions */}
            <Reveal className="mt-2">
              <button
                onClick={() => setOpenSection(openSection === "payment" ? null : "payment")}
                aria-expanded={openSection === "payment"}
                className="flex w-full items-center gap-4 py-5 text-left"
              >
                <span className="text-[20px] font-bold sm:text-[22px]">Payment Information</span>
                <PlusIcon className={`h-5 w-5 transition-transform ${openSection === "payment" ? "rotate-45" : ""}`} />
              </button>
              {openSection === "payment" && (
                <div className="accordion-open flex items-center gap-4 pb-5">
                  <p className="text-[13px] text-black/70">
                    Card or Mobile Money — choose your method at checkout.
                  </p>
                  <Link href="/checkout/payment" className="text-[13px] font-bold underline underline-offset-2">
                    GO TO PAYMENT
                  </Link>
                </div>
              )}

              <button
                onClick={() => setOpenSection(openSection === "delivery" ? null : "delivery")}
                aria-expanded={openSection === "delivery"}
                className="flex w-full items-center gap-4 py-5 text-left"
              >
                <span className="text-[20px] font-bold sm:text-[22px]">Delivery Details</span>
                <PlusIcon className={`h-5 w-5 transition-transform ${openSection === "delivery" ? "rotate-45" : ""}`} />
              </button>
              {openSection === "delivery" && (
                <div className="accordion-open">
                  <DeliveryForm />
                </div>
              )}
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
                  <p>{shippingCost === null ? (
                    <button onClick={() => setOpenSection("delivery")} className="text-[12px] font-bold underline underline-offset-2">
                      enter shipping details
                    </button>
                  ) : (
                    formatPrice(shippingCost)
                  )}</p>
                  <p>{formatPrice(total)}</p>
                </div>
              </div>
              <div className="border-t border-black/40 pt-6">
                <Link
                  href="/checkout/payment"
                  className="btn-swipe btn-swipe-light block w-full border border-black bg-black py-4 text-center text-[14px] font-bold tracking-widest text-white"
                >
                  CHECKOUT - {formatPrice(total)}
                </Link>
              </div>
            </Reveal>
          </>
        )}
      </div>
    </div>
  );
}
