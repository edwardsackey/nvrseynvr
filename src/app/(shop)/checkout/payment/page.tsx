"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";
import { useToast } from "@/context/ToastContext";
import { getProduct } from "@/lib/data";
import { DELIVERY_FEE, formatPrice, generateOrderNumber } from "@/lib/format";
import { PaymentMethod } from "@/lib/types";
import { ChevronDownIcon, CloseIcon } from "@/components/ui/icons";

const networks = ["MTN", "Telecel", "AirtelTigo"];

function formatCardNumber(value: string): string {
  return value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
}

export default function PaymentPage() {
  const router = useRouter();
  const { items, subtotal, clearCart, hydrated } = useCart();
  const { shipping, shippingComplete, placeOrder } = useCheckout();
  const { showToast } = useToast();

  const [method, setMethod] = useState<PaymentMethod>("card");
  const [processing, setProcessing] = useState(false);

  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [name, setName] = useState("");
  const [momoNumber, setMomoNumber] = useState("");
  const [network, setNetwork] = useState(networks[0]);

  useEffect(() => {
    if (hydrated && items.length === 0 && !processing) {
      router.replace("/cart");
    }
  }, [hydrated, items.length, processing, router]);

  const shippingCost = shippingComplete ? DELIVERY_FEE : null;
  const total = subtotal + (shippingCost ?? 0);

  function validate(): string | null {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address.";
    if (method === "card") {
      if (cardNumber.replace(/\s/g, "").length !== 16) return "Enter a valid 16-digit card number.";
      if (!/^\d{3,4}$/.test(cvv)) return "Enter a valid CVV.";
      if (!/^\d{2}\/\d{2}$/.test(expiry)) return "Expiry must be mm/yy.";
      if (!name.trim()) return "Enter the name on the card.";
    } else {
      if (!/^[+\d][\d\s-]{6,}$/.test(momoNumber.trim())) return "Enter a valid mobile number.";
      if (!name.trim()) return "Enter the account holder details.";
    }
    return null;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const error = validate();
    if (error) {
      showToast(error, "error");
      return;
    }
    setProcessing(true);
    // Simulated processing — no real payment is made in this frontend build
    window.setTimeout(() => {
      placeOrder({
        orderNumber: generateOrderNumber(),
        placedAt: new Date().toISOString(),
        items,
        email,
        shipping: shippingComplete ? shipping : null,
        paymentMethod: method,
        subtotal,
        shippingCost,
        total,
      });
      clearCart();
      router.push("/checkout/confirmation");
    }, 900);
  }

  const fieldCls =
    "h-[52px] w-full border-[0.5px] border-black/50 px-4 text-[15px] placeholder:text-black/40 focus:border-black focus:outline-none";
  const labelCls = "mb-2 block text-[20px] font-bold";

  return (
    <div className="mx-auto w-full max-w-[1367px] px-5 pb-16 lg:px-14">
      <div className="flex items-start justify-between pt-6">
        <h1 className="text-[28px] font-bold sm:text-[35px]">Payment Information</h1>
        <button aria-label="Close" onClick={() => router.push("/cart")}>
          <CloseIcon className="h-8 w-8" />
        </button>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_540px]">
        <form onSubmit={onSubmit} noValidate>
          <p className="text-[22px] font-bold">Choose payment method below</p>

          {/* Method cards */}
          <div className="mt-8 flex flex-wrap gap-6">
            <button
              type="button"
              onClick={() => setMethod("card")}
              aria-pressed={method === "card"}
              className={`w-[240px] border bg-white p-3 ${method === "card" ? "border-black" : "border-black/30"}`}
            >
              <div className="relative mx-auto h-[86px] w-[150px]">
                <Image src="/images/payment/card-methods.png" alt="Visa, Mastercard, ATM cards" fill sizes="150px" className="object-contain" />
              </div>
            </button>
            <button
              type="button"
              onClick={() => setMethod("momo")}
              aria-pressed={method === "momo"}
              className={`flex w-[240px] items-center justify-center gap-2 border bg-white p-3 ${method === "momo" ? "border-black" : "border-black/30"}`}
            >
              <div className="relative h-[58px] w-[95px]">
                <Image src="/images/payment/momo-mtn.png" alt="MTN Mobile Money" fill sizes="95px" className="object-contain" />
              </div>
              <div className="relative h-[50px] w-[105px]">
                <Image src="/images/payment/momo-telecel.png" alt="Telecel Cash" fill sizes="105px" className="object-contain" />
              </div>
            </button>
          </div>
          <div className="mt-2 flex gap-6">
            <p className="w-[240px] text-center text-[13px] text-black/50">VISA/MASTERCARD/ATM</p>
            <p className="w-[240px] text-center text-[13px] text-black/50">MOBILE MONEY</p>
          </div>

          {/* Fields */}
          <div className="mt-12 max-w-[466px] space-y-7">
            <div>
              <label htmlFor="pay-email" className={labelCls}>Email</label>
              <input
                id="pay-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Eg: nvrsëynvr@email.com"
                className={fieldCls}
              />
            </div>

            {method === "card" ? (
              <>
                <div>
                  <label htmlFor="pay-card" className={labelCls}>Card Number</label>
                  <input
                    id="pay-card"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="0000 0000 0000 0000"
                    className={`${fieldCls} text-center`}
                  />
                </div>
                <div>
                  <label htmlFor="pay-cvv" className={labelCls}>CVV</label>
                  <input
                    id="pay-cvv"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    maxLength={4}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                    placeholder="CVV"
                    className={`${fieldCls} w-[137px]`}
                  />
                </div>
                <div>
                  <label htmlFor="pay-exp" className={labelCls}>Expiry</label>
                  <div className="relative w-[137px]">
                    <input
                      id="pay-exp"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      value={expiry}
                      onChange={(e) => {
                        const d = e.target.value.replace(/\D/g, "").slice(0, 4);
                        setExpiry(d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d);
                      }}
                      placeholder="mm/yy"
                      className={`${fieldCls} pr-9`}
                    />
                    <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/60" />
                  </div>
                </div>
                <div>
                  <label htmlFor="pay-name" className={labelCls}>Name</label>
                  <input
                    id="pay-name"
                    autoComplete="cc-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name on card"
                    className={fieldCls}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="pay-momo" className={labelCls}>Mobile Number</label>
                  <input
                    id="pay-momo"
                    type="tel"
                    inputMode="tel"
                    value={momoNumber}
                    onChange={(e) => setMomoNumber(e.target.value)}
                    placeholder="0000 0000 0000 0000"
                    className={`${fieldCls} text-center`}
                  />
                </div>
                <div>
                  <label htmlFor="pay-network" className={labelCls}>Select Network</label>
                  <div className="relative w-[192px]">
                    <select
                      id="pay-network"
                      value={network}
                      onChange={(e) => setNetwork(e.target.value)}
                      className={`${fieldCls} appearance-none pr-9`}
                    >
                      {networks.map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/60" />
                  </div>
                </div>
                <div>
                  <label htmlFor="pay-details" className={labelCls}>Details</label>
                  <input
                    id="pay-details"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="MENSAH EDWARD SACKEY"
                    className={`${fieldCls} text-center uppercase tracking-wide`}
                  />
                </div>
              </>
            )}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="mx-auto mt-16 block w-full max-w-[794px] bg-black py-4 text-[16px] tracking-widest text-white transition-opacity hover:opacity-85 disabled:opacity-50"
          >
            {processing ? "PROCESSING…" : "PROCEED"}
          </button>
        </form>

        {/* Order summary */}
        <aside className="order-first lg:order-none">
          <div className="border-t border-black pt-8">
            {items.map((item) => {
              const product = getProduct(item.productId);
              if (!product) return null;
              return (
                <div
                  key={`${item.productId}-${item.selectedSize}-${item.selectedColor}`}
                  className="mb-6 flex items-start gap-6"
                >
                  <div className="relative h-[126px] w-[130px] shrink-0 bg-card p-2">
                    <span className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black text-[13px] font-bold text-white">
                      {item.quantity}
                    </span>
                    <div className="relative h-full w-full">
                      <Image src={product.images[0]} alt={product.name} fill sizes="120px" className="object-cover" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-[17px] font-bold tracking-wide">{product.name}</p>
                      <p className="whitespace-nowrap text-[13px] font-bold">
                        {formatPrice(product.price * item.quantity)}
                      </p>
                    </div>
                    <p className="mt-1 text-[13px]">{product.category}</p>
                    <p className="mt-1 text-[13px]">{item.selectedSize}</p>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-between text-[15px]">
              <p>Sub-total</p>
              <p className="font-bold">{formatPrice(subtotal)}</p>
            </div>
            <div className="mt-2 flex justify-between text-[15px]">
              <p>Shipping</p>
              <p className="text-[12px] font-bold">
                {shippingCost === null ? "enter shipping details" : formatPrice(shippingCost)}
              </p>
            </div>
            <div className="mt-4 flex justify-between border-b border-black pb-4 text-[20px] font-bold">
              <p>Total</p>
              <p className="text-[14px] font-bold leading-7">{formatPrice(total)}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
