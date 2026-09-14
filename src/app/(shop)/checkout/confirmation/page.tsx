"use client";

import Image from "next/image";
import Link from "next/link";
import { useCheckout } from "@/context/CheckoutContext";
import { chosenImage, getProduct } from "@/lib/data";
import { PAYMENT_LABELS, deliveryOption, formatPrice } from "@/lib/format";
import { CheckCircleIcon, TruckIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/Reveal";

/** The window quoted back, taken from the speed the shopper paid for. */
function deliveryWindow(placedAt: string, fast: boolean): string {
  const fmt: Intl.DateTimeFormatOptions = { weekday: "short", month: "short", day: "numeric" };
  const from = new Date(placedAt);
  from.setDate(from.getDate() + (fast ? 1 : 5));
  const to = new Date(placedAt);
  to.setDate(to.getDate() + (fast ? 3 : 7));
  return `${from.toLocaleDateString("en-US", fmt)} - ${to.toLocaleDateString("en-US", fmt)}`;
}

export default function ConfirmationPage() {
  const { lastOrder, hydrated } = useCheckout();

  if (!hydrated) {
    return <p className="px-8 py-24 text-[14px] text-black/50">Loading…</p>;
  }

  if (!lastOrder) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-[28px] font-bold">No recent order</h1>
        <p className="mt-3 text-[14px] text-black/60">
          We couldn&apos;t find a recent order in this session.
        </p>
        <Link
          href="/shop"
          className="mt-10 inline-block bg-black px-10 py-3 text-[14px] text-white"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const speed = deliveryOption(lastOrder.delivery);
  const payment =
    lastOrder.paymentMethod === "momo" && lastOrder.momoNetwork
      ? `${PAYMENT_LABELS.momo} · ${lastOrder.momoNetwork}`
      : PAYMENT_LABELS[lastOrder.paymentMethod];

  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[1000px] px-5 pb-20 pt-10 sm:px-8">
        <Reveal variant="scale" className="flex justify-center">
          <CheckCircleIcon className="h-[62px] w-[62px]" />
        </Reveal>
        <h1 className="mt-6 text-center text-[36px] font-bold uppercase leading-[0.95] tracking-[-0.02em] sm:text-[52px]">
          Order Complete
        </h1>
        <p className="mt-3 text-center text-[14px] sm:text-[16px]">
          Order number <span className="font-bold">{lastOrder.orderNumber}</span>
        </p>
        <p className="mt-1.5 text-center text-[13px] text-black/60 sm:text-[14px]">
          A confirmation has been sent to {lastOrder.email}
        </p>

        <Reveal className="mt-10 flex items-center justify-center gap-5 bg-card px-6 py-7 sm:gap-8">
          <TruckIcon className="h-10 w-10 shrink-0 sm:h-[46px] sm:w-[46px]" />
          <div>
            <p className="text-[14px] font-bold sm:text-[16px]">{speed.label}</p>
            <p className="mt-0.5 text-[12px] text-black/60 sm:text-[13px]">
              Expect delivery {deliveryWindow(lastOrder.placedAt, lastOrder.delivery === "express")}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:gap-16">
          {/* What was bought */}
          <div>
            <h2 className="text-[17px] sm:text-[19px]">Order Summary</h2>
            <ul className="mt-5 space-y-4 border-t border-black/15 pt-5">
              {lastOrder.items.map((item) => {
                const product = getProduct(item.productId);
                if (!product) return null;
                const src = chosenImage(product, item.selectedColor);
                return (
                  <li
                    key={`${item.productId}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex gap-4"
                  >
                    <div className="relative h-[100px] w-[78px] shrink-0 overflow-hidden bg-card">
                      <Image src={src} alt={product.name} fill sizes="80px" className="object-cover" />
                    </div>
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
          </div>

          {/* Where it goes and what it cost */}
          <div>
            <h2 className="text-[17px] sm:text-[19px]">Details</h2>
            <div className="mt-5 space-y-1 border-t border-black/15 pt-5 text-[12px] text-black/70 sm:text-[13px]">
              <p className="font-bold text-black">
                {lastOrder.shipping.firstName} {lastOrder.shipping.lastName}
              </p>
              <p>{lastOrder.shipping.address}</p>
              <p>
                {[lastOrder.shipping.city, lastOrder.shipping.postalCode]
                  .filter(Boolean)
                  .join(", ")}
              </p>
              <p>{lastOrder.shipping.country}</p>
              <p className="pt-2">{lastOrder.shipping.phone}</p>
              <p className="pt-2">Paid with {payment}</p>
            </div>

            <dl className="mt-7 space-y-2.5 border-b border-black/15 pb-5 text-[12px] sm:text-[13px]">
              <div className="flex justify-between">
                <dt className="text-black/60">Sub-total</dt>
                <dd>{formatPrice(lastOrder.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-black/60">Shipping</dt>
                <dd>
                  {lastOrder.shippingCost === 0 ? "Free" : formatPrice(lastOrder.shippingCost)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-black/60">
                  Discount{lastOrder.promoCode ? ` (${lastOrder.promoCode})` : ""}
                </dt>
                <dd>
                  {lastOrder.discount > 0
                    ? `- ${formatPrice(lastOrder.discount)}`
                    : formatPrice(0)}
                </dd>
              </div>
            </dl>
            <div className="mt-5 flex items-baseline justify-between">
              <p className="text-[19px] font-bold sm:text-[22px]">Total:</p>
              <p className="text-[19px] font-bold sm:text-[22px]">{formatPrice(lastOrder.total)}</p>
            </div>
          </div>
        </div>

        <Reveal className="mt-14">
          <Link
            href="/shop"
            className="btn-swipe btn-swipe-light mx-auto block w-full max-w-[520px] border border-black bg-black py-4 text-center text-[11px] font-bold tracking-[0.2em] text-white sm:text-[12px]"
          >
            CONTINUE SHOPPING
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
