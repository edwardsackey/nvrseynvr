"use client";

import Image from "next/image";
import { useState } from "react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { colorImages } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { ChevronDownIcon, MinusIcon, PlusIcon, StarIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/Reveal";

const ratingBars = [
  { label: "Excellent", color: "#3f9c35", width: "78%" },
  { label: "Good", color: "#8bc34a", width: "55%" },
  { label: "Average", color: "#9e9e9e", width: "30%" },
  { label: "Below Average", color: "#ff9800", width: "14%" },
  { label: "Poor", color: "#f44336", width: "8%" },
];

function AccordionRow({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-black/15 py-4">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-[13px] font-bold tracking-widest">{title}</span>
        {open ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
      </button>
      {open && children && <div className="accordion-open pt-4">{children}</div>}
    </div>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const [model, setModel] = useState<"M" | "F">("M");
  const [imageIndex, setImageIndex] = useState(0);
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null
  );
  const [sizeOpen, setSizeOpen] = useState(true);

  const activeColor =
    product.colors.find((c) => c.name === color) ?? product.colors[0];
  // Front first, then the back, then any extra shots of the piece.
  const gallery = colorImages(product, activeColor);
  const mainImage =
    model === "F" && product.imageFemale
      ? product.imageFemale
      : gallery[Math.min(imageIndex, gallery.length - 1)];

  /** Picking a colour swaps the gallery back to that colourway's front. */
  function chooseColor(name: string) {
    setColor(name);
    setImageIndex(0);
    setModel("M");
  }

  function handleAddToCart() {
    if (!size) {
      showToast("Select a size first.", "error");
      return;
    }
    addItem({
      productId: product.id,
      quantity: 1,
      selectedSize: size,
      selectedColor: color,
    });
    showToast(`${product.name} added to your cart.`);
  }

  const fullStars = Math.round(product.rating);

  return (
    <div className="mx-auto grid w-full max-w-site gap-10 px-4 pb-16 pt-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-16">
      {/* Gallery */}
      <Reveal variant="left">
        <div className="group relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden bg-card">
          <Image
            key={mainImage}
            src={mainImage}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="img-swap object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          />
        </div>

        {/* Thumbnails */}
        {gallery.length > 1 && model === "M" && (
          <div className="mx-auto mt-3 flex max-w-[520px] flex-wrap gap-3">
            {gallery.map((src, i) => (
              <button
                key={src}
                aria-label={`View image ${i + 1}`}
                onClick={() => setImageIndex(i)}
                className={`relative aspect-square w-16 overflow-hidden border transition-all duration-300 hover:-translate-y-0.5 ${i === imageIndex ? "border-black" : "border-black/15 hover:border-black/50"}`}
              >
                <Image src={src} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* M / F toggle */}
        <div className="mx-auto mt-5 flex max-w-[520px] justify-center gap-3">
          {(["M", "F"] as const).map((m) => (
            <button
              key={m}
              aria-pressed={model === m}
              disabled={m === "F" && !product.imageFemale}
              onClick={() => setModel(m)}
              className={`h-9 w-12 border text-[13px] font-bold transition-colors disabled:opacity-30 ${
                model === m ? "border-black bg-black text-white" : "border-black/40 bg-white"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Info panel. Revealed upwards rather than from the side: a sideways
          transform on a full width column pushes past the viewport edge and
          gives the page a horizontal scrollbar on phones. */}
      <Reveal className="max-w-[520px]">
        <p className="font-blackletter text-[15px]">nvrsëynvr</p>
        <h1 className="mt-2 text-[22px] font-bold tracking-wide">{product.name}</h1>
        <p className="mt-1 text-[13px] text-black/50">{formatPrice(product.price)}</p>

        {/* Colour swatches: pick a colourway and the gallery follows */}
        <fieldset className="mt-6">
          <legend className="text-[11px] font-bold tracking-[0.18em] text-black/70">
            COLOUR
            <span className="ml-2 font-normal tracking-normal text-black">
              {activeColor.name}
            </span>
          </legend>
          <div className="mt-3 flex flex-wrap items-center gap-3" data-testid="colour-swatches">
            {product.colors.map((c) => {
              const selected = c.name === color;
              return (
                <button
                  key={c.sku}
                  type="button"
                  onClick={() => chooseColor(c.name)}
                  aria-pressed={selected}
                  aria-label={`Colour: ${c.name}`}
                  data-colour={c.name}
                  title={c.name}
                  className={`relative h-10 w-10 rounded-full border transition-all duration-200 hover:scale-105 ${
                    selected ? "border-black ring-1 ring-black ring-offset-2" : "border-black/25"
                  }`}
                >
                  <span
                    className="absolute inset-1 rounded-full"
                    style={{ backgroundColor: c.hex }}
                  />
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Size */}
        <div className="mt-6">
          <div className="max-w-[280px]">
            <button
              onClick={() => setSizeOpen((v) => !v)}
              aria-expanded={sizeOpen}
              className="flex h-10 w-full items-center justify-between gap-2 border border-black bg-white px-3 text-[13px]"
            >
              <span className="truncate">{size ?? "Select Size"}</span>
              <ChevronDownIcon className={`h-4 w-4 shrink-0 transition-transform ${sizeOpen ? "rotate-180" : ""}`} />
            </button>
            {sizeOpen && product.sizes.length > 1 && (
              <div className="grid grid-cols-4 border border-t-0 border-black/30">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    aria-pressed={size === s}
                    onClick={() => setSize(s)}
                    className={`border-r border-black/20 py-2 text-[12px] last:border-r-0 ${
                      size === s ? "bg-black font-bold text-white" : "bg-white hover:bg-black/5"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="btn-swipe btn-swipe-light mt-5 w-full border border-black bg-black py-3 text-[13px] font-bold tracking-widest text-white disabled:opacity-40"
        >
          {product.inStock ? "ADD TO CART" : "COMING SOON"}
        </button>

        <p className="mt-6 text-[13px] leading-relaxed text-black/80">{product.description}</p>

        <div className="mt-8">
          <AccordionRow title="DETAILS" defaultOpen>
            <ul className="space-y-1.5">
              {product.details.map((d) => (
                <li key={d} className="text-[11px] tracking-wide text-black/70">
                  • {d}
                </li>
              ))}
            </ul>
          </AccordionRow>

          <AccordionRow title="DELIVERY POLICY">
            <p className="text-[12px] leading-relaxed text-black/70">
              Orders ship from Accra within 2–4 working days. Delivery inside
              Ghana takes 1–3 days after dispatch; worldwide delivery takes
              7–14 days. Exchanges accepted within 14 days, unworn with tags.
            </p>
          </AccordionRow>

          <AccordionRow title="SHARE">
            <p className="text-[12px] text-black/70">
              Share this piece — tag @nvrseynvr and join the conversation.
            </p>
          </AccordionRow>

          <AccordionRow title="RATINGS" defaultOpen>
            <p className="text-[12px]">Overall Rating</p>
            <p className="mt-2 text-[26px] font-bold">{product.rating.toFixed(1)}</p>
            <div className="mt-1 flex gap-1 text-[#f2b01e]">
              {[1, 2, 3, 4, 5].map((n) => (
                <StarIcon key={n} className="h-4 w-4" filled={n <= fullStars} />
              ))}
            </div>
            <p className="mt-1 text-[11px] text-black/50">
              based on {product.reviewCount} views
            </p>
            <div className="mt-4 max-w-[260px] space-y-2">
              {ratingBars.map((bar) => (
                <div key={bar.label} className="flex items-center gap-3">
                  <span className="w-24 text-[10px] text-black/60">{bar.label}</span>
                  <span className="relative h-[3px] flex-1 bg-black/10">
                    <span
                      className="absolute inset-y-0 left-0"
                      style={{ width: bar.width, backgroundColor: bar.color }}
                    />
                  </span>
                </div>
              ))}
            </div>
          </AccordionRow>
        </div>
      </Reveal>
    </div>
  );
}
