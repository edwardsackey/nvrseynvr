import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FILM_CONTINUE_ID, STORE_HOME, VideoHero } from "@/components/landing/VideoHero";
import { MarqueeTape } from "@/components/layout/Marquee";
import { LongArrowIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "nvrsëynvr",
  description:
    "Built for the ones who never gave up. The nvrsëynvr film, then the store.",
};

/**
 * The front door: the brand film on its own, with the store one step away.
 * The landing page proper lives at /home.
 */
export default function FilmPage() {
  return (
    <div className="bg-black">
      <VideoHero />

      {/* The panel the scroll cue leads to: a second way into the store. */}
      <section
        id={FILM_CONTINUE_ID}
        className="flex min-h-[85svh] flex-col items-center justify-center bg-black px-6 py-20 text-white"
      >
        <div className="relative h-24 w-24 sm:h-28 sm:w-28">
          <Image
            src="/images/brand/ns-monogram-tight.png"
            alt="nvrseynvr NS monogram"
            fill
            sizes="112px"
            className="object-contain"
          />
        </div>
        <p className="mt-8 max-w-md text-center text-[13px] leading-relaxed tracking-[0.18em] text-white/75 sm:text-[14px]">
          CAPS, BEANIES AND TEES. MADE SLOWLY, IN SMALL NUMBERS,
          <br className="hidden sm:block" /> FOR PEOPLE WHO KEEP MOVING.
        </p>
        <Link
          href={STORE_HOME}
          data-testid="film-enter-store"
          className="btn-swipe btn-swipe-light mt-10 inline-flex items-center gap-3 border border-white px-10 py-4 text-[13px] font-bold tracking-[0.2em] sm:px-14"
        >
          ENTER THE STORE
          <LongArrowIcon className="h-3 w-8" />
        </Link>
      </section>

      <MarqueeTape />
    </div>
  );
}
