"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { AgreeCheckbox, CheckoutField } from "@/components/checkout/CheckoutField";
import { OptionRow } from "@/components/checkout/OptionRow";
import { ShoppingBag } from "@/components/checkout/ShoppingBag";
import {
  AirtelTigoMark,
  ApplePayMark,
  MastercardMark,
  MtnMark,
  PaypalMark,
  TelecelMark,
  VisaMark,
} from "@/components/checkout/PaymentMarks";
import { Reveal } from "@/components/motion/Reveal";
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";
import { useToast } from "@/context/ToastContext";
import {
  DELIVERY_OPTIONS,
  MOMO_NETWORKS,
  deliveryOption,
  formatPrice,
  generateOrderNumber,
  promoDiscount,
} from "@/lib/format";
import {
  DeliveryOption,
  MomoNetwork,
  PaymentMethod,
  ShippingInfo,
} from "@/lib/types";

function formatCardNumber(value: string): string {
  return value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d][\d\s-]{7,}$/;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, itemCount, subtotal, clearCart, hydrated } = useCart();
  const { shipping, setShipping, placeOrder } = useCheckout();
  const { showToast } = useToast();

  const [form, setForm] = useState<ShippingInfo>(shipping);
  const [delivery, setDelivery] = useState<DeliveryOption>("standard");
  const [method, setMethod] = useState<PaymentMethod>("card");

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [momoNetwork, setMomoNetwork] = useState<MomoNetwork>("MTN");
  const [momoNumber, setMomoNumber] = useState("");

  const [agreeInfo, setAgreeInfo] = useState(false);
  const [agreePayment, setAgreePayment] = useState(false);

  const [promo, setPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [processing, setProcessing] = useState(false);

  // Details typed before this session's storage was read should not be wiped.
  useEffect(() => {
    setForm((current) =>
      Object.values(current).some((v) => v.trim()) ? current : shipping
    );
  }, [shipping]);

  // Nothing to pay for: send them back to the cart rather than an empty form.
  useEffect(() => {
    if (hydrated && items.length === 0 && !processing) router.replace("/cart");
  }, [hydrated, items.length, processing, router]);

  const shippingCost = deliveryOption(delivery).price;
  const discount = useMemo(
    () => (promo ? promoDiscount(promo, subtotal) ?? 0 : 0),
    [promo, subtotal]
  );
  const total = Math.max(0, subtotal - discount) + shippingCost;

  function update(field: keyof ShippingInfo, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: false } : prev));
  }

  function applyPromo(code: string) {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      setPromoError("Enter a promo code first.");
      return;
    }
    if (promoDiscount(trimmed, subtotal) === null) {
      setPromo(null);
      setPromoError("That code is not valid.");
      return;
    }
    setPromo(trimmed);
    setPromoError(null);
    showToast(`${trimmed} applied.`);
  }

  /** Returns the fields at fault and the first thing to tell the shopper. */
  function validate(): { bad: Record<string, boolean>; message: string | null } {
    const bad: Record<string, boolean> = {};
    let message: string | null = null;

    const require = (field: string, ok: boolean, complaint: string) => {
      if (ok) return;
      bad[field] = true;
      message ??= complaint;
    };

    require("firstName", Boolean(form.firstName.trim()), "Enter your first name.");
    require("lastName", Boolean(form.lastName.trim()), "Enter your last name.");
    require("phone", phonePattern.test(form.phone.trim()), "Enter a valid phone number.");
    require("email", emailPattern.test(form.email.trim()), "Enter a valid email address.");
    require("country", Boolean(form.country.trim()), "Enter your country or region.");
    require("city", Boolean(form.city.trim()), "Enter your city.");
    require("address", Boolean(form.address.trim()), "Enter your address.");

    if (!agreeInfo) message ??= "Please agree to data processing to continue.";

    if (method === "card") {
      require(
        "cardNumber",
        cardNumber.replace(/\s/g, "").length === 16,
        "Enter a valid 16-digit card number."
      );
      require("cardHolder", Boolean(cardHolder.trim()), "Enter the cardholder name.");
      require("expiry", /^\d{2}\/\d{2}$/.test(expiry), "Expiry must be MM/YY.");
      require("cvv", /^\d{3,4}$/.test(cvv), "Enter a valid CVV.");
    }
    if (method === "momo") {
      require(
        "momoNumber",
        phonePattern.test(momoNumber.trim()),
        "Enter the mobile money number."
      );
    }

    if (!agreePayment) message ??= "Please agree to data processing under payment.";

    return { bad, message };
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const { bad, message } = validate();
    setErrors(bad);

    if (message) {
      showToast(message, "error");
      const firstBad = Object.keys(bad)[0];
      if (firstBad) document.getElementById(firstBad)?.focus();
      return;
    }

    setProcessing(true);
    setShipping(form);

    // Simulated authorisation — no money moves in this frontend build.
    window.setTimeout(() => {
      placeOrder({
        orderNumber: generateOrderNumber(),
        placedAt: new Date().toISOString(),
        items,
        email: form.email.trim(),
        shipping: form,
        delivery,
        paymentMethod: method,
        momoNetwork: method === "momo" ? momoNetwork : undefined,
        subtotal,
        discount,
        promoCode: promo,
        shippingCost,
        total,
      });
      clearCart();
      router.push("/checkout/confirmation");
    }, 900);
  }

  const sectionTitle = "text-[17px] sm:text-[19px]";
  const blockLabel = "text-[12px] font-bold sm:text-[13px]";

  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[1240px] px-5 pb-20 pt-8 sm:px-8 lg:px-12 lg:pt-12">
        <Reveal>
          <h1 className="text-[44px] font-bold uppercase leading-[0.9] tracking-[-0.02em] sm:text-[62px] lg:text-[76px]">
            Checkout
          </h1>
        </Reveal>

        <div className="mt-8 grid gap-12 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:gap-20">
          {/* ── The form ─────────────────────────────────────────── */}
          <form
            data-testid="checkout-form"
            onSubmit={onSubmit}
            onBlur={() => setShipping(form)}
            noValidate
          >
            {/* Information */}
            <Reveal>
              <h2 className={sectionTitle}>Information</h2>

              <p className={`mt-6 ${blockLabel}`}>Personal Information</p>
              <div className="mt-1 grid gap-x-8 sm:grid-cols-2">
                <CheckoutField
                  id="firstName"
                  label="First name"
                  autoComplete="given-name"
                  value={form.firstName}
                  invalid={errors.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                />
                <CheckoutField
                  id="lastName"
                  label="Last name"
                  autoComplete="family-name"
                  value={form.lastName}
                  invalid={errors.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                />
                <CheckoutField
                  id="phone"
                  label="Phone number"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  invalid={errors.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
                <CheckoutField
                  id="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  invalid={errors.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </div>

              <p className={`mt-9 ${blockLabel}`}>Shipping Information</p>
              <div className="mt-1 grid gap-x-8 sm:grid-cols-2">
                <CheckoutField
                  id="country"
                  label="Country / Region"
                  autoComplete="country-name"
                  value={form.country}
                  invalid={errors.country}
                  onChange={(e) => update("country", e.target.value)}
                />
                <CheckoutField
                  id="city"
                  label="City"
                  autoComplete="address-level2"
                  value={form.city}
                  invalid={errors.city}
                  onChange={(e) => update("city", e.target.value)}
                />
                <CheckoutField
                  id="address"
                  label="Address"
                  autoComplete="street-address"
                  value={form.address}
                  invalid={errors.address}
                  onChange={(e) => update("address", e.target.value)}
                />
                <CheckoutField
                  id="postalCode"
                  label="Zip / Postal code"
                  autoComplete="postal-code"
                  value={form.postalCode}
                  onChange={(e) => update("postalCode", e.target.value)}
                />
              </div>

              <div className="mt-3">
                <AgreeCheckbox id="agree-info" checked={agreeInfo} onChange={setAgreeInfo}>
                  I agree to data processing
                </AgreeCheckbox>
              </div>
            </Reveal>

            {/* Delivery */}
            <Reveal className="mt-12">
              <h2 className={sectionTitle}>Delivery</h2>
              <div className="mt-4 border-t border-black/15">
                {DELIVERY_OPTIONS.map((option) => (
                  <OptionRow
                    key={option.id}
                    name="delivery"
                    value={option.id}
                    checked={delivery === option.id}
                    onSelect={() => setDelivery(option.id)}
                    title={option.label}
                    note={option.note}
                    aside={
                      <span className="text-[12px] sm:text-[13px]">
                        {option.price === 0 ? "Free" : formatPrice(option.price)}
                      </span>
                    }
                  />
                ))}
              </div>
            </Reveal>

            {/* Payment */}
            <Reveal className="mt-12">
              <h2 className={sectionTitle}>Payment</h2>
              <div className="mt-4 border-t border-black/15">
                {/* Card */}
                <OptionRow
                  name="payment"
                  value="card"
                  checked={method === "card"}
                  onSelect={() => setMethod("card")}
                  title="Credit card"
                  aside={
                    <>
                      <VisaMark />
                      <MastercardMark />
                    </>
                  }
                >
                  <div className="grid gap-x-8 sm:grid-cols-2">
                    <CheckoutField
                      id="cardNumber"
                      label="Card number"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      value={cardNumber}
                      invalid={errors.cardNumber}
                      onChange={(e) => {
                        setCardNumber(formatCardNumber(e.target.value));
                        setErrors((p) => (p.cardNumber ? { ...p, cardNumber: false } : p));
                      }}
                    />
                    <CheckoutField
                      id="cardHolder"
                      label="Cardholder name"
                      autoComplete="cc-name"
                      value={cardHolder}
                      invalid={errors.cardHolder}
                      onChange={(e) => {
                        setCardHolder(e.target.value);
                        setErrors((p) => (p.cardHolder ? { ...p, cardHolder: false } : p));
                      }}
                    />
                    <CheckoutField
                      id="expiry"
                      label="Expiration date (MM/YY)"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      value={expiry}
                      invalid={errors.expiry}
                      onChange={(e) => {
                        setExpiry(formatExpiry(e.target.value));
                        setErrors((p) => (p.expiry ? { ...p, expiry: false } : p));
                      }}
                    />
                    <CheckoutField
                      id="cvv"
                      label="CVV"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      maxLength={4}
                      value={cvv}
                      invalid={errors.cvv}
                      onChange={(e) => {
                        setCvv(e.target.value.replace(/\D/g, ""));
                        setErrors((p) => (p.cvv ? { ...p, cvv: false } : p));
                      }}
                    />
                  </div>
                </OptionRow>

                {/* Mobile money */}
                <OptionRow
                  name="payment"
                  value="momo"
                  checked={method === "momo"}
                  onSelect={() => setMethod("momo")}
                  title="Mobile Money"
                  note="Approve the prompt on your phone"
                  aside={
                    <>
                      <MtnMark />
                      <TelecelMark />
                      <AirtelTigoMark className="hidden sm:inline" />
                    </>
                  }
                >
                  <fieldset>
                    <legend className="sr-only">Mobile money network</legend>
                    <div className="flex flex-wrap gap-2">
                      {MOMO_NETWORKS.map((network) => (
                        <button
                          key={network}
                          type="button"
                          onClick={() => setMomoNetwork(network)}
                          aria-pressed={momoNetwork === network}
                          className={`h-9 min-w-[88px] px-4 text-[11px] font-bold tracking-wide transition-colors sm:text-[12px] ${
                            momoNetwork === network
                              ? "bg-black text-white"
                              : "bg-[#e4e3df] text-black hover:bg-[#d8d7d2]"
                          }`}
                        >
                          {network}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <div className="grid gap-x-8 sm:grid-cols-2">
                    <CheckoutField
                      id="momoNumber"
                      label="Mobile money number"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={momoNumber}
                      invalid={errors.momoNumber}
                      onChange={(e) => {
                        setMomoNumber(e.target.value);
                        setErrors((p) => (p.momoNumber ? { ...p, momoNumber: false } : p));
                      }}
                    />
                  </div>
                  <p className="mt-2 text-[10px] text-black/45 sm:text-[11px]">
                    A {momoNetwork} prompt is sent to this number for {formatPrice(total)}.
                  </p>
                </OptionRow>

                <OptionRow
                  name="payment"
                  value="paypal"
                  checked={method === "paypal"}
                  onSelect={() => setMethod("paypal")}
                  title="PayPal"
                  aside={<PaypalMark />}
                >
                  <p className="text-[11px] text-black/55 sm:text-[12px]">
                    You will finish paying in PayPal after placing the order.
                  </p>
                </OptionRow>

                <OptionRow
                  name="payment"
                  value="applepay"
                  checked={method === "applepay"}
                  onSelect={() => setMethod("applepay")}
                  title="Apple Pay"
                  aside={<ApplePayMark />}
                >
                  <p className="text-[11px] text-black/55 sm:text-[12px]">
                    Confirm with Face ID or Touch ID after placing the order.
                  </p>
                </OptionRow>
              </div>

              <div className="mt-3">
                <AgreeCheckbox id="agree-payment" checked={agreePayment} onChange={setAgreePayment}>
                  I agree to data processing
                </AgreeCheckbox>
              </div>

              {/* On a phone the bag sits far above, so restate what is owed
                  right where the order is placed. */}
              <div
                data-testid="mobile-total"
                className="mt-4 flex items-baseline justify-between border-t border-black/15 pt-4 lg:hidden"
              >
                <p className="text-[15px] font-bold">Total:</p>
                <p className="text-[15px] font-bold">{formatPrice(total)}</p>
              </div>

              <button
                type="submit"
                data-testid="place-order"
                disabled={processing}
                className="btn-swipe btn-swipe-light mt-6 block w-full border border-black bg-black py-4 text-[11px] font-bold tracking-[0.2em] text-white disabled:opacity-60 sm:text-[12px]"
              >
                {processing ? "PLACING ORDER…" : "PAY AND PLACE ORDER"}
              </button>
            </Reveal>
          </form>

          {/* ── The bag ──────────────────────────────────────────── */}
          <Reveal className="order-first lg:order-none">
            <ShoppingBag
              items={items}
              itemCount={hydrated ? itemCount : 0}
              subtotal={subtotal}
              shippingCost={shippingCost}
              discount={discount}
              promoCode={promo}
              promoError={promoError}
              onApplyPromo={applyPromo}
              onClearPromo={() => {
                setPromo(null);
                setPromoError(null);
              }}
              total={total}
            />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
