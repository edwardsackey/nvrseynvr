"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BagIcon,
  LongArrowIcon,
  SearchIcon,
  UserIcon,
} from "@/components/ui/icons";
import { useCart } from "@/context/CartContext";
import { Reveal } from "@/components/motion/Reveal";

// Each frame carries its own crop: the wide group shot needs the window
// pulled up so the back row keeps its headroom, the rest sit centred.
const heroSlides = [
  {
    src: "/images/lifestyle/studio-group-front.jpg",
    position: "object-[50%_28%]",
    alt: "The nvrsëynvr crew in the nvr sëy nvr tees and beanies",
  },
  {
    src: "/images/lifestyle/studio-survivors-backs.jpg",
    position: "object-center",
    alt: "The Survivors lion back print across the crew",
  },
  {
    src: "/images/lifestyle/studio-four-front.jpg",
    position: "object-center",
    alt: "Four of the crew in the Survivors and nvr sëy nvr tees",
  },
];

// Front and back of each piece: the card opens on the front and swipes to the
// back when pointed at.
const exploreCards = [
  {
    href: "/products/project-1957-freedom",
    label: "FREEDOM",
    front: "/images/products/freedom-black-front.webp",
    back: "/images/products/freedom-black-back.png",
  },
  {
    href: "/products/survivors-tee",
    label: "SURVIVORS",
    front: "/images/products/survivors-ivory-front.webp",
    back: "/images/products/survivors-ivory-back.webp",
  },
  {
    href: "/products/keep-moving-tee",
    label: "KEEP MOVING",
    front: "/images/products/keepmoving-sand-front.webp",
    back: "/images/products/keepmoving-sand-back.webp",
  },
  {
    href: "/products/ghana-must-go-tee",
    label: "GHANA MUST GO",
    front: "/images/products/ghanamustgo-white-front.webp",
    back: "/images/products/ghanamustgo-white-back.webp",
  },
];

const categoryChips = [
  { label: "T-SHIRTS", image: "/images/products/classic-tee-black-back.webp", href: "/shop?q=t-shirt" },
  { label: "CAP - OLD SCHOOL", image: "/images/products/caps-circle-1.webp", href: "/shop?q=cap" },
  { label: "CAPS", image: "/images/products/ns-caps-pile.webp", href: "/shop?q=cap" },
  { label: "BENNIE", image: "/images/products/beanie-olive-stack.webp", href: "/shop?q=beanie" },
];

const communityPhotos = [
  { src: "/images/collab/joeyb-poster.png", alt: "Joey B in the nvrsëynvr beanie" },
  { src: "/images/lifestyle/ghana-flag-man.webp", alt: "Raising the Ghana flag over Accra" },
  { src: "/images/lifestyle/van-selfie.webp", alt: "The community in nvrsëynvr beanies" },
];

function BandSequence() {
  return (
    <span className="inline-flex shrink-0 items-center">
      {[0, 1, 2].map((i) => (
        <span key={i} className="inline-flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10">
          <span className="font-blackletter text-[22px] leading-none sm:text-[26px] lg:text-[30px]">
            nvrsëynvr
          </span>
          <span className="text-[22px] font-bold leading-none tracking-[0.4em] sm:text-[28px]">•••</span>
          <span className="relative h-11 w-11 shrink-0 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
            <Image src="/images/brand/ns-monogram.png" alt="" fill sizes="64px" className="object-contain" />
          </span>
          <span className="text-[22px] font-bold leading-none tracking-[0.4em] sm:text-[28px]">•••</span>
          <span className="text-[20px] font-bold leading-none tracking-[0.08em] sm:text-[24px] lg:text-[28px]">
            ACCRA-GHANA
          </span>
          <span className="text-[22px] font-bold leading-none tracking-[0.4em] sm:text-[28px]">•••</span>
          <span className="relative h-11 w-11 shrink-0 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
            <Image src="/images/brand/ns-monogram.png" alt="" fill sizes="64px" className="object-contain" />
          </span>
          <span className="text-[22px] font-bold leading-none tracking-[0.4em] sm:text-[28px]">•••</span>
        </span>
      ))}
    </span>
  );
}

function LocationBand() {
  return (
    <div aria-label="Accra, Ghana" className="overflow-hidden bg-black py-4 text-white sm:py-5">
      <div className="flex w-max animate-marquee-slow">
        <BandSequence />
        <BandSequence />
      </div>
    </div>
  );
}

export default function LandingPage() {
  const { itemCount, hydrated } = useCart();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* ── Hero with overlay nav ── */}
      <section className="relative min-h-[92vh] overflow-hidden bg-black lg:min-h-screen">
        {heroSlides.map((frame, i) => (
          <Image
            key={frame.src}
            src={frame.src}
            alt={frame.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${frame.position} grayscale transition-opacity duration-1000 ${
              i === slide ? "ken-burns opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Scrim: these studio frames are shot on a pale backdrop, so the white
            nav and dashes need shading at the top and bottom edges to read. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/65 via-black/15 to-black/60"
        />

        {/* Overlay header */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 text-white lg:px-10">
          <div className="flex items-center gap-12">
            <Link href="/home" className="font-blackletter text-[18px] leading-none">
              nvrsëynvr
            </Link>
            <nav aria-label="Main" className="hidden items-center gap-8 sm:flex">
              <Link href="/shop" className="text-[14px] underline-offset-4 hover:underline">
                Shop
              </Link>
              <Link href="/collections" className="text-[14px] underline-offset-4 hover:underline">
                Collections
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/shop" aria-label="Search">
              <SearchIcon className="h-5 w-5" />
            </Link>
            <button aria-label="Account" className="hidden sm:block">
              <UserIcon className="h-5 w-5" />
            </button>
            <Link href="/cart" aria-label="Shopping cart" className="relative">
              <BagIcon className="h-5 w-5" />
              {hydrated && itemCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-0.5 text-[10px] font-bold text-black">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Message card */}
        <Reveal
          variant="left"
          className="absolute bottom-[8%] left-0 z-10 w-[76%] max-w-[420px] bg-[#efe9dd] p-4 sm:left-6 sm:w-[88%] sm:p-8 lg:left-0"
        >
          <h1 className="text-[20px] font-bold leading-[1.15] sm:text-[32px]">
            Built for the ones
            <br />
            who <em className="font-normal italic">never gave up</em>
          </h1>
          <p className="mt-2 max-w-[280px] text-[10px] leading-snug text-black/80 sm:mt-3 sm:text-[12px]">
            Caps, beanies and tees —made slowly, in small numbers for people
            who&nbsp; keep moving.
          </p>
          <Link
            href="/shop"
            className="btn-swipe btn-swipe-dark mt-3 inline-flex items-center gap-2 border border-black px-3 py-1.5 text-[9px] font-bold tracking-widest sm:mt-5 sm:gap-3 sm:px-4 sm:py-2 sm:text-[11px]"
          >
            SHOP THE DROP
            <LongArrowIcon className="h-2.5 w-6 sm:h-3 sm:w-8" />
          </Link>
        </Reveal>

        {/* Slide dashes */}
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setSlide(i)}
              className={`h-[3px] w-6 transition-colors ${i === slide ? "bg-white" : "bg-white/40"}`}
            />
          ))}
        </div>
      </section>

      {/* ── THE COLLECTION: statement on the left, the pieces on the right ── */}
      <section className="bg-[#f0efed] px-4 py-12 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid w-full max-w-site gap-10 lg:grid-cols-[minmax(240px,340px)_1fr] lg:gap-14">
          <Reveal variant="left" className="self-center">
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-bold tracking-[0.22em] text-black/70">
                THE COLLECTION
              </span>
              <span aria-hidden="true" className="h-px w-14 bg-black/35" />
            </div>
            <h2 className="mt-5 text-[34px] font-bold leading-[1.05] tracking-tight sm:text-[42px] lg:text-[46px]">
              GRIND. GROW.
              <br />
              REPEAT.
            </h2>
            <p className="mt-5 max-w-[260px] text-[12px] leading-relaxed tracking-[0.12em] text-black/65 sm:text-[13px]">
              PREMIUM STREETWEAR FOR
              <br className="hidden sm:block" /> THE RELENTLESS.
            </p>
            <Link
              href="/collections"
              className="btn-swipe btn-swipe-dark mt-8 inline-flex items-center gap-3 border border-black px-6 py-3 text-[11px] font-bold tracking-[0.18em]"
            >
              VIEW COLLECTION
              <LongArrowIcon className="h-3 w-7" />
            </Link>
          </Reveal>

          <Reveal
            group
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4"
          >
            {exploreCards.map((card) => (
              <Link
                key={card.label}
                href={card.href}
                data-testid="explore-card"
                className="group block w-[170px] shrink-0 snap-start sm:w-auto sm:shrink"
              >
                {/* Front slides out to the left, back slides in behind it */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#e3e2e0]">
                  <Image
                    src={card.front}
                    alt={`${card.label} tee, front`}
                    fill
                    sizes="(max-width: 640px) 170px, (max-width: 1024px) 45vw, 22vw"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-x-full"
                  />
                  <Image
                    src={card.back}
                    alt={`${card.label} tee, back`}
                    fill
                    sizes="(max-width: 640px) 170px, (max-width: 1024px) 45vw, 22vw"
                    data-testid="explore-card-back"
                    className="translate-x-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-0"
                  />
                </div>
                <p className="mt-3 text-[12px] font-bold tracking-[0.1em] sm:text-[13px]">
                  {card.label}
                </p>
                <span className="mt-1.5 inline-flex items-center gap-2 text-[10px] tracking-[0.18em] text-black/60 transition-colors group-hover:text-black sm:text-[11px]">
                  SHOP NOW
                  <LongArrowIcon className="h-2.5 w-6 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── UNISEX / NEW COLLECTION category chips ── */}
      <section className="bg-white px-4 py-16 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <Reveal>
            <p className="text-center text-[11px] tracking-[0.2em] text-black/70">UNISEX</p>
            <div className="mt-3 flex justify-center">
              <span className="bg-black px-8 py-2 text-[11px] font-bold tracking-widest text-white">
                NEW COLLECTION
              </span>
            </div>
          </Reveal>
          <Reveal
            group
            className="-mx-4 mt-6 flex snap-x gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mt-8 sm:grid sm:grid-cols-4 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0"
          >
            {categoryChips.map((chip) => (
              <Link
                key={chip.label}
                href={chip.href}
                className="flex shrink-0 snap-start items-center gap-2 bg-[#efefef] p-1.5 pr-3 transition-colors hover:bg-[#e3e3e3] sm:shrink sm:gap-3 sm:p-2 sm:pr-4"
              >
                <span className="relative h-8 w-8 shrink-0 overflow-hidden bg-white sm:h-10 sm:w-10">
                  <Image src={chip.image} alt="" fill sizes="40px" className="object-cover" />
                </span>
                <span className="whitespace-nowrap text-[10px] font-bold tracking-wide sm:text-[12px]">{chip.label}</span>
              </Link>
            ))}
          </Reveal>
          <Reveal className="mt-6 flex justify-end">
            <Link
              href="/shop"
              className="link-wipe inline-flex items-center gap-2 text-[11px] font-bold tracking-widest"
            >
              SHOP NOW <LongArrowIcon className="h-3 w-8" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Joey B collaboration ── */}
      <Reveal
        as="section"
        group
        id="joey-b"
        className="relative grid grid-cols-[1fr_4fr_1fr] gap-1 bg-white"
      >
        <div className="relative min-h-[220px] sm:min-h-[320px] lg:min-h-[500px]">
          <Image
            src="/images/collab/joeyb-portrait-2.webp"
            alt=""
            fill
            sizes="20vw"
            className="object-cover object-left brightness-[0.55]"
          />
        </div>
        <div className="relative min-h-[220px] sm:min-h-[320px] lg:min-h-[500px]">
          <Image
            src="/images/collab/joeyb-box-durag.webp"
            alt="Joey B in the white nvrsëynvr durag"
            fill
            sizes="70vw"
            className="object-cover"
          />
        </div>
        <div className="relative min-h-[220px] sm:min-h-[320px] lg:min-h-[500px]">
          <Image
            src="/images/collab/joeyb-portrait.webp"
            alt=""
            fill
            sizes="20vw"
            className="object-cover brightness-[0.5]"
          />
          <Link
            href="/shop"
            className="btn-swipe btn-swipe-dark absolute right-1 top-1/2 -translate-y-1/2 bg-white px-2 py-1 text-[8px] font-bold tracking-widest sm:right-2 sm:px-3 sm:py-1.5 sm:text-[10px] lg:right-4"
          >
            EXPLORE NOW
          </Link>
        </div>
        {/* Caption pinned to the bottom-left corner of the whole section */}
        <div className="absolute bottom-4 left-2 z-10 text-left sm:bottom-8 sm:left-4 lg:left-8">
          <p className="text-[13px] text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.8)] sm:text-[18px] lg:text-[24px]">
            <span className="font-blackletter">nvrsëynvr</span>{" "}
            <span className="font-bold">X JOEY B</span>
          </p>
          <p className="mt-0.5 text-[11px] tracking-[0.12em] text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.8)] sm:mt-1 sm:text-[16px] lg:text-[20px]">
            COLLABORATION
          </p>
        </div>
      </Reveal>

      {/* ── ACCRA-GHANA band ── */}
      <Reveal variant="fade">
        <LocationBand />
      </Reveal>

      {/* ── Join our community ── */}
      <section className="bg-[#f5f5f5] px-4 py-8 sm:py-14 lg:px-10">
        <div className="mx-auto w-full max-w-site">
          <Reveal className="flex items-start justify-between">
            <h2 className="text-left text-[15px] leading-tight sm:text-[24px]">
              <span className="font-bold">JOIN</span>
              <br />
              <span className="tracking-[0.06em]">OUR COMMUNITY</span>
            </h2>
            <span className="text-right font-blackletter text-[15px] sm:text-[24px]">nvrsëynvr</span>
          </Reveal>
          <Reveal group className="mt-5 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-6">
            {communityPhotos.map((photo) => (
              <div key={photo.src} className="group relative aspect-[645/794] overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="33vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Project-1957-Freedom editorial ── */}
      <section className="relative min-h-[52vh] overflow-hidden sm:min-h-[80vh] lg:min-h-screen">
        <Image
          src="/images/lifestyle/freedom-editorial.webp"
          alt="Project-1957-Freedom editorial in Accra"
          fill
          sizes="100vw"
          className="ken-burns object-cover grayscale"
        />
        <span className="absolute left-3 top-3 bg-white px-3 py-1 text-[9px] font-bold tracking-widest sm:left-6 sm:top-6 sm:px-5 sm:py-1.5 sm:text-[11px]">
          NEW
        </span>
        <Reveal
          variant="left"
          className="absolute bottom-10 left-3 text-left text-white sm:bottom-14 sm:left-6 lg:left-10"
        >
          <p className="text-[13px] tracking-[0.06em] [text-shadow:0_1px_10px_rgba(0,0,0,0.7)] sm:text-[20px] lg:text-[24px]">
            PROJECT-1957-FREEDOM
          </p>
          <p className="mt-0.5 text-[11px] tracking-[0.06em] [text-shadow:0_1px_10px_rgba(0,0,0,0.7)] sm:mt-1 sm:text-[18px] lg:text-[22px]">
            NEW COLLECTION
          </p>
        </Reveal>
        <Link
          href="/collections/project-1957-freedom"
          className="btn-swipe btn-swipe-dark absolute bottom-10 right-3 bg-white px-3 py-1 text-[9px] font-bold tracking-widest sm:bottom-14 sm:right-6 sm:px-5 sm:py-1.5 sm:text-[11px] lg:right-10"
        >
          EXPLORE
        </Link>
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-[3px] w-6 ${i === 0 ? "bg-white" : "bg-white/40"}`} />
          ))}
        </div>
      </section>
    </>
  );
}
