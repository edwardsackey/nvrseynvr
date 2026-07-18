"use client";

import Image from "next/image";
import Link from "next/link";
import { useCheckout } from "@/context/CheckoutContext";
import { getProduct } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { CheckCircleIcon, TruckIcon } from "@/components/ui/icons";

function deliveryWindow(placedAt: string): string {
  const fmt: Intl.DateTimeFormatOptions = { weekday: "short", month: "short", day: "numeric" };
  const from = new Date(placedAt);
  from.setDate(from.getDate() + 5);
  const to = new Date(placedAt);
  to.setDate(to.getDate() + 12);
  return `${from.toLocaleDateString("en-US", fmt)}-${to.toLocaleDateString("en-US", fmt)}`;
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

  return (
    <div className="mx-auto w-full max-w-[1100px] px-5 pb-16">
      <h1 className="pt-10 text-center text-[30px] font-bold sm:text-[35px]">
        Order Confirmation
      </h1>

      <div className="mt-16 flex justify-center">
        <CheckCircleIcon className="h-[70px] w-[70px]" />
      </div>
      <h2 className="mt-6 text-center text-[30px] font-bold sm:text-[35px]">Order Complete</h2>
      <p className="mt-2 text-center text-[22px] sm:text-[24px]">
        Order number <span className="font-bold">{lastOrder.orderNumber}</span>
      </p>

      <p className="mt-10 text-center text-[22px] sm:text-[24px]">
        Thank you for shopping with us.
      </p>
      <p className="mt-2 text-center text-[22px] sm:text-[24px]">
        We have sent a confirmation email to{" "}
        <span className="whitespace-nowrap">{lastOrder.email}</span>
      </p>

      {/* Delivery estimate banner */}
      <div className="mx-auto mt-14 flex max-w-[1023px] items-center justify-center gap-8 bg-[rgba(217,217,217,0.4)] px-6 py-10">
        <TruckIcon className="h-[50px] w-[50px] shrink-0" />
        <p className="text-[18px] sm:text-[24px]">
          Expect delivery between {deliveryWindow(lastOrder.placedAt)}
        </p>
      </div>

      {/* Items + totals */}
      <div className="mx-auto mt-16 max-w-[760px]">
        {lastOrder.items.map((item) => {
          const product = getProduct(item.productId);
          if (!product) return null;
          return (
            <div
              key={`${item.productId}-${item.selectedSize}-${item.selectedColor}`}
              className="mb-8 flex items-start gap-8"
            >
              <div className="relative h-[126px] w-[130px] shrink-0 bg-card p-2">
                <span className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black text-[13px] font-bold text-white">
                  {item.quantity}
                </span>
                <div className="relative h-full w-full">
                  <Image src={product.images[0]} alt={product.name} fill sizes="120px" className="object-cover" />
                </div>
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[20px] font-bold tracking-wide sm:text-[24px]">{product.name}</p>
                  <p className="whitespace-nowrap text-[14px] font-bold">
                    {formatPrice(product.price * item.quantity)}
                  </p>
                </div>
                <p className="mt-1 text-[18px] sm:text-[24px]">{product.category}</p>
                <p className="mt-1 text-[18px] sm:text-[24px]">{item.selectedSize}</p>
              </div>
            </div>
          );
        })}

        <div className="mt-4 space-y-3">
          <div className="flex items-baseline justify-between">
            <p className="text-[20px] sm:text-[24px]">Sub-total</p>
            <p className="text-[14px] font-bold">{formatPrice(lastOrder.subtotal)}</p>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-[20px] sm:text-[24px]">Shipping</p>
            <p className="text-[12px] font-bold">
              {lastOrder.shippingCost === null
                ? "enter shipping details"
                : formatPrice(lastOrder.shippingCost)}
            </p>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-[20px] font-bold">Total</p>
            <p className="text-[14px] font-bold">{formatPrice(lastOrder.total)}</p>
          </div>
        </div>

        <p className="mt-12 text-[28px] font-bold sm:text-[35px]">Order Summary</p>
      </div>

      <div className="mt-16 flex justify-center">
        <Link
          href="/shop"
          className="block w-full max-w-[794px] bg-black py-4 text-center text-[18px] text-white transition-opacity hover:opacity-85"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
