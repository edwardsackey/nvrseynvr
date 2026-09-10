"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { HeartIcon } from "@/components/ui/icons";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  /**
   * Pin the card to one colourway. Collection pages use this to lay a piece
   * out in every colour it comes in.
   */
  colorIndex?: number;
}

export function ProductCard({ product, priority = false, colorIndex }: ProductCardProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const wishlisted = isWishlisted(product.id);

  const pinned = typeof colorIndex === "number";
  const colour = product.colors[pinned ? colorIndex! : 0];
  const front = colour?.front ?? product.images[0];
  const back = colour?.back;
  const hasBack = Boolean(back && back !== front);

  const href = pinned
    ? `/products/${product.id}?colour=${encodeURIComponent(colour.name)}`
    : `/products/${product.id}`;

  function onHeart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product.id);
    showToast(
      added ? `${product.name} added to wishlist.` : `${product.name} removed from wishlist.`,
      "info"
    );
  }

  return (
    <Link href={href} className="group card-lift block">
      <div
        data-testid="product-card-media"
        /* The card is shaped to the product photography, so a garment fills
           the frame instead of floating in a tall letterbox. */
        className="relative aspect-[6/5] overflow-hidden bg-card"
      >
        {product.badge && !pinned && (
          <span className="absolute left-3 top-3 z-20 rounded-sm border border-black/20 bg-white px-3 py-1 text-[10px] font-bold tracking-widest sm:left-4 sm:top-4 sm:px-4 sm:py-1.5 sm:text-[11px]">
            {product.badge === "new" ? "NEW" : "COMING SOON"}
          </span>
        )}
        <button
          onClick={onHeart}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-1 top-1 z-20 p-2.5 transition-all duration-300 hover:scale-110 active:scale-95 sm:right-2 sm:top-2 ${
            wishlisted ? "scale-105 text-black" : "text-black/60 hover:text-black"
          }`}
        >
          <HeartIcon className="h-5 w-5 sm:h-6 sm:w-6" filled={wishlisted} />
        </button>

        {/* The garment sits whole inside the card, front sliding out to the
            left as the back slides in behind it. */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={front}
            alt={`${product.name}, front`}
            fill
            priority={priority}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 24vw"
            className={`object-contain transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
              hasBack ? "group-hover:-translate-x-full" : "group-hover:scale-[1.05]"
            }`}
          />
          {hasBack && (
            <Image
              src={back!}
              alt={`${product.name}, back`}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 24vw"
              data-testid="product-card-back"
              className="translate-x-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-0 sm:p-6"
            />
          )}
        </div>
      </div>

      <p className="mt-3 font-blackletter text-[11px] leading-none text-black/80">nvrsëynvr</p>
      <h3 className="mt-1.5 text-[13px] font-bold tracking-wide">
        {product.name}
        {pinned && <span className="font-normal text-black/60"> — {colour.name}</span>}
      </h3>
      <p className="mt-1 text-[12px] text-black/50">{formatPrice(product.price)}</p>
      {!pinned && product.colors.length > 1 && (
        <div className="mt-2 flex items-center gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c.sku}
              title={c.name}
              className="h-3 w-3 rounded-full border border-black/25"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      )}
    </Link>
  );
}
