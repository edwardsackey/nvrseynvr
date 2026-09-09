"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/Reveal";

const PAGE_SIZE = 12;

function ShopContent() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").toLowerCase();
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!query) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.collection.toLowerCase().includes(query)
    );
  }, [query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <div className="mx-auto w-full max-w-site px-4 pb-16 lg:px-8">
      <Reveal className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <p className="flex items-baseline gap-3">
          <span className="text-[20px] font-bold tracking-wide">
            {query ? `RESULTS FOR “${query.toUpperCase()}”` : "SHOP ALL"}
          </span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-black" />
          <span className="text-[15px]">{filtered.length} Items</span>
        </p>
        <div className="flex gap-4">
          <button className="btn-swipe btn-swipe-dark flex items-center gap-3 border border-black/40 px-6 py-2.5 text-[12px] font-bold tracking-widest">
            CHANGE VIEW
            <span className="inline-block h-2 w-2 rounded-full bg-current" />
          </button>
          <button className="btn-swipe btn-swipe-light bg-black px-6 py-2.5 text-[12px] font-bold tracking-widest text-white">
            FILTER OR SORT
          </button>
        </div>
      </Reveal>

      {visible.length === 0 ? (
        <p className="py-24 text-center text-[15px] text-black/60">
          Nothing matches that search — try “tee”, “cap”, or “beanie”.
        </p>
      ) : (
        <Reveal
          group
          key={`${query}-${current}`}
          className="mt-8 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {visible.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </Reveal>
      )}

      {/* Pagination */}
      <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-4">
        <button
          aria-label="Previous page"
          disabled={current <= 1}
          onClick={() => setPage(current - 1)}
          className="disabled:opacity-30"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            aria-current={n === current ? "page" : undefined}
            onClick={() => setPage(n)}
            className={`text-[14px] ${n === current ? "font-bold underline underline-offset-4" : "text-black/50"}`}
          >
            {n}
          </button>
        ))}
        <button
          aria-label="Next page"
          disabled={current >= pageCount}
          onClick={() => setPage(current + 1)}
          className="disabled:opacity-30"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </nav>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-site px-4 pb-16 lg:px-8">
          <p className="flex items-baseline gap-3 pt-2">
            <span className="text-[20px] font-bold tracking-wide">SHOP ALL</span>
          </p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
