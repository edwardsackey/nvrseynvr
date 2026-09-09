"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BagIcon,
  ChevronDownIcon,
  LongArrowIcon,
  PlayIcon,
  ReplayIcon,
  SearchIcon,
  SoundOffIcon,
  SoundOnIcon,
} from "@/components/ui/icons";
import { useCart } from "@/context/CartContext";

/** Where the "scroll to continue" affordance sends the visitor. */
export const LANDING_ANCHOR_ID = "landing-start";

type Status = "loading" | "playing" | "paused" | "ended" | "blocked";

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { itemCount, hydrated } = useCart();

  const [status, setStatus] = useState<Status>("loading");
  const [muted, setMuted] = useState(true);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [progress, setProgress] = useState(0);

  const finished = status === "ended" || status === "blocked";

  // The blurred fill behind the portrait video is desktop only, and is mounted
  // rather than merely hidden so phones never download a second stream.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setShowBackdrop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Try to autoplay. Browsers only allow this while muted, and some block it
  // outright, so a rejected play() drops straight to the finished state where
  // both the play control and the Shop Now button are offered.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStatus("blocked");
      return;
    }

    const attempt = video.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => setStatus("blocked"));
    }
  }, []);

  // Stop decoding once the video is scrolled well out of view, and pick it back
  // up when the visitor scrolls back to the top.
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          if (!video.paused) video.pause();
        } else if (video.paused && video.currentTime > 0 && !video.ended) {
          video.play().catch(() => {});
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setMuted(next);
    if (!next && video.paused && !video.ended) video.play().catch(() => {});
  }, []);

  const replay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => setStatus("blocked"));
  }, []);

  const scrollOn = useCallback(() => {
    const target = document.getElementById(LANDING_ANCHOR_ID);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  }, []);

  const videoProps = {
    src: "/video/intro.mp4",
    poster: "/images/video/intro-poster.jpg",
    playsInline: true,
    preload: "auto" as const,
  };

  return (
    <section
      ref={sectionRef}
      aria-label="nvrsëynvr film"
      className="relative h-[100svh] min-h-[520px] w-full overflow-hidden bg-black text-white"
    >
      {/* Ambient fill so the portrait film never sits on empty letterboxing */}
      {showBackdrop && (
        <video
          {...videoProps}
          poster={undefined}
          aria-hidden="true"
          tabIndex={-1}
          muted
          autoPlay
          loop
          className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-2xl"
        />
      )}

      <video
        {...videoProps}
        ref={videoRef}
        muted={muted}
        autoPlay
        aria-label="nvrsëynvr brand film"
        onPlaying={() => setStatus("playing")}
        onPause={() => setStatus((s) => (s === "ended" ? s : "paused"))}
        onEnded={() => setStatus("ended")}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (v.duration) setProgress((v.currentTime / v.duration) * 100);
        }}
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 lg:object-contain ${
          finished ? "scale-[1.02] brightness-[0.45]" : ""
        }`}
      />

      {/* Legibility wash behind the overlay controls */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/70"
      />

      {/* Overlay navigation, so the top of the site is still navigable */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 lg:px-10">
        <div className="flex items-center gap-12">
          <Link href="/" className="font-blackletter text-[18px] leading-none lg:text-[22px]">
            nvrsëynvr
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-8 sm:flex">
            <Link href="/shop" className="link-wipe text-[14px]">
              Shop
            </Link>
            <Link href="/collections" className="link-wipe text-[14px]">
              Collections
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={toggleSound}
            aria-label={muted ? "Unmute film" : "Mute film"}
            className="transition-opacity hover:opacity-70"
          >
            {muted ? <SoundOffIcon className="h-5 w-5" /> : <SoundOnIcon className="h-5 w-5" />}
          </button>
          <Link href="/shop" aria-label="Search">
            <SearchIcon className="h-5 w-5" />
          </Link>
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

      {/* Centre stage: the call to action once the film has run its course */}
      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center px-6 transition-all duration-700 ${
          finished
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <p className="font-blackletter text-[34px] leading-none sm:text-[46px]">nvrsëynvr</p>
        <p className="mt-4 max-w-xs text-center text-[12px] tracking-[0.28em] text-white/80 sm:text-[13px]">
          BUILT FOR THE ONES WHO NEVER GAVE UP
        </p>

        <Link
          href="/shop"
          data-testid="video-shop-now"
          tabIndex={finished ? 0 : -1}
          className="btn-swipe btn-swipe-light mt-8 inline-flex items-center gap-3 border border-white px-10 py-4 text-[13px] font-bold tracking-[0.2em] sm:px-14"
        >
          SHOP NOW
          <LongArrowIcon className="h-3 w-8" />
        </Link>

        <button
          onClick={replay}
          tabIndex={finished ? 0 : -1}
          className="mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-white/70 transition-colors hover:text-white"
        >
          {status === "blocked" ? (
            <>
              <PlayIcon className="h-4 w-4" /> PLAY THE FILM
            </>
          ) : (
            <>
              <ReplayIcon className="h-4 w-4" /> REPLAY
            </>
          )}
        </button>
      </div>

      {/* Scroll affordance, always available so nobody is held by the film */}
      <button
        onClick={scrollOn}
        data-testid="scroll-to-continue"
        className="group absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] text-white/85 transition-colors group-hover:text-white sm:text-[11px]">
          SCROLL TO CONTINUE
        </span>
        <ChevronDownIcon className="h-5 w-5 animate-drift text-white/85 transition-colors group-hover:text-white" />
      </button>

      {/* Progress hairline */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-20 h-[2px] bg-white/15">
        <div
          className="h-full bg-white/85 transition-[width] duration-200 ease-linear"
          style={{ width: `${finished ? 100 : progress}%` }}
        />
      </div>
    </section>
  );
}
