"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { collections } from "@/lib/data";
import {
  BagIcon,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "@/components/ui/icons";

const menuFootLinks = ["FAQ", "STORIES", "T & C", "SHIPPING", "PAYMENTS"];

export function Header() {
  const { itemCount, hydrated } = useCart();
  const { ids: wishlistIds } = useWishlist();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    router.push(query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : "/shop");
  }

  return (
    <header className="relative z-40 bg-white" ref={menuRef}>
      <div className="mx-auto flex h-16 w-full max-w-site items-center justify-between gap-4 px-5 lg:px-12">
        {/* Left nav */}
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          <Link
            href="/shop"
            className={`link-wipe text-[15px] ${pathname === "/shop" ? "underline underline-offset-4" : ""}`}
          >
            Shop
          </Link>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            className={`link-wipe text-[15px] ${menuOpen ? "underline underline-offset-4" : ""}`}
          >
            Collections
          </button>
        </nav>

        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
          className="p-1 lg:hidden"
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* Search + icons */}
        <div className="flex items-center gap-4">
          <form
            onSubmit={onSearch}
            className="hidden h-10 w-72 items-center justify-between rounded-sm border border-black/40 px-3.5 sm:flex"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              aria-label="Search products"
              className="w-full bg-transparent text-[15px] placeholder:text-black/50 focus:outline-none"
            />
            <button type="submit" aria-label="Search">
              <SearchIcon className="h-[18px] w-[18px]" />
            </button>
          </form>
          <button aria-label={`Wishlist, ${wishlistIds.length} items`} className="relative p-1">
            <HeartIcon />
            {wishlistIds.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-0.5 text-[10px] font-bold text-white">
                {wishlistIds.length}
              </span>
            )}
          </button>
          <button aria-label="Account" className="hidden p-1 sm:block">
            <UserIcon />
          </button>
          <Link
            href="/cart"
            aria-label={`Shopping cart, ${hydrated ? itemCount : 0} items`}
            className="relative p-1"
          >
            <BagIcon />
            {hydrated && itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-0.5 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Centered blackletter wordmark */}
      <div className="flex justify-center pb-4 pt-1">
        <Link href="/home" className="py-1 font-blackletter text-[26px] leading-none sm:text-[32px]">
          nvrsëynvr
        </Link>
      </div>

      {/* Collections mega menu */}
      {menuOpen && (
        <div className="absolute inset-x-0 top-full hidden border-b border-black/10 bg-white shadow-[0_24px_48px_rgba(0,0,0,0.12)] lg:block">
          <div className="mx-auto grid w-full max-w-site grid-cols-[1fr_1fr_1.2fr] px-12">
            <div className="py-10">
              <p className="text-[15px] font-bold tracking-wide">COLLECTIONS</p>
              <ul className="mt-6 space-y-5">
                {collections.map((c) => (
                  <li key={c.id} className="flex items-baseline gap-3">
                    <Link
                      href={`/collections/${c.id}`}
                      className="text-[14px] tracking-wide underline-offset-4 hover:underline"
                    >
                      {c.name.toUpperCase()}
                    </Link>
                    {c.latest && (
                      <span className="flex items-center gap-1 text-[11px] text-black/50">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-black" />
                        LATEST
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="py-10">
              <p className="text-[15px] font-bold tracking-wide">COLLABORATIONS</p>
              <ul className="mt-6">
                <li className="flex items-baseline gap-3">
                  <Link
                    href="/#joey-b"
                    className="text-[14px] tracking-wide underline-offset-4 hover:underline"
                  >
                    JOEY B
                  </Link>
                  <span className="flex items-center gap-1 text-[11px] text-black/50">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-black" />
                    INFINITY BENNIE
                  </span>
                </li>
              </ul>
            </div>
            <Link href="/#joey-b" className="group relative block min-h-[230px] overflow-hidden bg-black">
              <Image
                src="/images/collab/joeyb-box-durag.webp"
                alt="Joey B x Infinity Bennie"
                fill
                sizes="480px"
                className="object-cover opacity-80 transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[18px] font-bold text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
                  JOEY B X INFINITY BENNIE
                </p>
                <span className="btn-swipe btn-swipe-dark mt-2 inline-block bg-white px-4 py-1.5 text-[11px] tracking-wide text-black">
                  EXPLORE NOW
                </span>
              </div>
            </Link>
          </div>
          <div className="border-t border-black/10">
            <div className="mx-auto flex w-full max-w-site gap-10 px-12 py-3">
              {menuFootLinks.map((l) => (
                <span key={l} className="text-[11px] tracking-wide text-black/60">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-black/10 bg-white px-5 py-6 lg:hidden">
          <form
            onSubmit={onSearch}
            className="mb-5 flex h-10 items-center justify-between rounded-sm border border-black/40 px-3.5"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              aria-label="Search products"
              className="w-full bg-transparent text-[15px] placeholder:text-black/50 focus:outline-none"
            />
            <button type="submit" aria-label="Search">
              <SearchIcon className="h-[18px] w-[18px]" />
            </button>
          </form>
          <nav aria-label="Mobile" className="space-y-4">
            <Link href="/shop" className="block text-[17px]">
              Shop
            </Link>
            <p className="pt-2 text-[13px] font-bold tracking-wide text-black/60">COLLECTIONS</p>
            {collections.map((c) => (
              <Link
                key={c.id}
                href={`/collections/${c.id}`}
                className="block text-[15px] tracking-wide"
              >
                {c.name.toUpperCase()}
              </Link>
            ))}
            <Link href="/#joey-b" className="block text-[15px] tracking-wide">
              JOEY B X INFINITY BENNIE
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
