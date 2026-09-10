"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { backImage, frontImage } from "@/lib/data";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { HeartIcon } from "@/components/ui/icons";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const wishlisted = isWishlisted(product.id);

  const front = frontImage(product);
  const back = backImage(product);
  const hasBack = Boolean(back && back !== front);

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
    <Link href={`/products/${product.id}`} className="group card-lift block">
      <div
        data-testid="product-card-media"
        className="relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-card"
      >
        {product.badge && (
          <span className="absolute left-4 top-4 z-20 rounded-sm border border-black/20 bg-white px-4 py-1.5 text-[11px] font-bold tracking-widest">
            {product.badge === "new" ? "NEW" : "COMING SOON"}
          </span>
        )}
        <button
          onClick={onHeart}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-4 top-4 z-20 transition-all duration-300 hover:scale-110 active:scale-95 ${
            wishlisted ? "scale-105 text-black" : "text-black/60 hover:text-black"
          }`}
        >
          <HeartIcon className="h-6 w-6" filled={wishlisted} />
        </button>

        {/* Front slides out to the left, back slides in behind it */}
        <div className="relative h-[72%] w-[78%] overflow-hidden bg-white">
          <Image
            src={front}
            alt={`${product.name}, front`}
            fill
            priority={priority}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 24vw"
            className={`object-cover transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
              hasBack ? "group-hover:-translate-x-full" : "group-hover:scale-[1.06]"
            }`}
          />
          {hasBack && (
            <Image
              src={back!}
              alt={`${product.name}, back`}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 24vw"
              data-testid="product-card-back"
              className="translate-x-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-0"
            />
          )}
        </div>
      </div>

      <p className="mt-3 font-blackletter text-[11px] leading-none text-black/80">nvrsëynvr</p>
      <h3 className="mt-1.5 text-[13px] font-bold tracking-wide">{product.name}</h3>
      <p className="mt-1 text-[12px] text-black/50">{formatPrice(product.price)}</p>
      {product.colors.length > 1 && (
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
