"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BagIcon,
  LongArrowIcon,
  PlayIcon,
  ReplayIcon,
  SearchIcon,
  SoundOffIcon,
  SoundOnIcon,
} from "@/components/ui/icons";
import { useCart } from "@/context/CartContext";

/** Where the film sends people: the store's landing page. */
export const STORE_HOME = "/home";

/** How close to the end the film gets before the call to action appears. */
const CTA_LEAD_SECONDS = 4;

type Status = "loading" | "playing" | "paused" | "ended" | "blocked";

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useRef(true);
  const { itemCount, hydrated } = useCart();

  const [status, setStatus] = useState<Status>("loading");
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [nearEnd, setNearEnd] = useState(false);

  const finished = status === "ended" || status === "blocked";
  // The call to action holds off until the film is nearly over, then stays.
  const showCta = nearEnd || finished;

  /**
   * Play the film from the top. Used for the first autoplay and every time the
   * screen is returned to, so the film is always seen from its beginning.
   */
  const startFromTop = useCallback((auto = true) => {
    const video = videoRef.current;
    if (!video) return;

    if (auto && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStatus("blocked");
      return;
    }

    try {
      video.currentTime = 0;
    } catch {
      // a seek before metadata lands is harmless, playback still starts at 0
    }
    setProgress(0);
    setNearEnd(false);

    const attempt = video.play();
    if (attempt && typeof attempt.catch === "function") {
      // Browsers refuse autoplay in some settings; fall back to a play control.
      attempt.catch(() => setStatus("blocked"));
    }
  }, []);

  // Start on mount, and start over if the screen is ever left and returned to.
  // Judged on how much of the screen the film holds, with a gap between the two
  // triggers so resting near the boundary cannot flicker.
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    if (typeof IntersectionObserver === "undefined") {
      startFromTop();
      return;
    }

    const AWAY_BELOW = 0.35;
    const BACK_ABOVE = 0.65;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;

        if (inView.current && ratio < AWAY_BELOW) {
          inView.current = false;
          video.pause();
          try {
            video.currentTime = 0;
          } catch {
            // ignore, the next start seeks again anyway
          }
          setProgress(0);
          setNearEnd(false);
          return;
        }

        if (!inView.current && ratio > BACK_ABOVE) {
          inView.current = true;
          startFromTop();
          return;
        }

        // First run: the film is on screen and has not been started yet.
        if (inView.current && ratio > BACK_ABOVE && video.paused && video.currentTime === 0) {
          startFromTop();
        }
      },
      { threshold: [0, 0.15, 0.35, 0.5, 0.65, 0.85, 1] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [startFromTop]);

  // Coming back to the tab, or back through history from a cached page, should
  // also start the film over rather than resume it mid-shot.
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible" && inView.current) startFromTop();
    };
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted && inView.current) startFromTop();
    };

    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [startFromTop]);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setMuted(next);
    if (!next && video.paused && !video.ended) video.play().catch(() => {});
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="nvrsëynvr film"
      className="relative h-[100svh] min-h-[520px] w-full overflow-hidden bg-black text-white"
    >
      <video
        ref={videoRef}
        src="/video/intro.mp4"
        poster="/images/video/intro-poster.jpg"
        playsInline
        preload="auto"
        muted={muted}
        autoPlay
        aria-label="nvrsëynvr brand film"
        onPlaying={() => setStatus("playing")}
        onPause={() => setStatus((s) => (s === "ended" ? s : "paused"))}
        onEnded={() => setStatus("ended")}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (!v.duration) return;
          setProgress((v.currentTime / v.duration) * 100);
          // Short films get a proportional lead rather than a fixed one.
          const lead = Math.min(CTA_LEAD_SECONDS, v.duration * 0.25);
          setNearEnd(v.duration - v.currentTime <= lead);
        }}
        className={`film-grade absolute inset-0 h-full w-full object-cover object-[50%_38%] transition-all duration-700 ${
          finished ? "film-grade-ended scale-[1.02]" : showCta ? "film-grade-cta" : ""
        }`}
      />

      {/* Grit: moving film grain, then a vignette to weight the corners */}
      <div aria-hidden="true" className="film-grain pointer-events-none absolute inset-0 overflow-hidden" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]"
      />

      {/* Legibility wash behind the overlay controls */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/70"
      />

      {/* Overlay navigation, so the top of the site is still navigable */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-10">
        <div className="flex items-center gap-8 sm:gap-12">
          <Link
            href={STORE_HOME}
            className="py-2 font-blackletter text-[18px] leading-none lg:text-[22px]"
          >
            nvrsëynvr
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-8 sm:flex">
            <Link href="/shop" className="link-wipe py-2 text-[14px]">
              Shop
            </Link>
            <Link href="/collections" className="link-wipe py-2 text-[14px]">
              Collections
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-1 sm:gap-3">
          <button
            onClick={toggleSound}
            aria-label={muted ? "Unmute film" : "Mute film"}
            className="p-2.5 transition-opacity hover:opacity-70"
          >
            {muted ? <SoundOffIcon className="h-5 w-5" /> : <SoundOnIcon className="h-5 w-5" />}
          </button>
          <Link href="/shop" aria-label="Search" className="p-2.5">
            <SearchIcon className="h-5 w-5" />
          </Link>
          <Link href="/cart" aria-label="Shopping cart" className="relative p-2.5">
            <BagIcon className="h-5 w-5" />
            {hydrated && itemCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-0.5 text-[10px] font-bold text-black">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Centre stage: arrives as the film runs out, then holds */}
      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center px-6 transition-all duration-700 ${
          showCta ? "pointer-events-auto opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <p className="font-blackletter text-[34px] leading-none [text-shadow:0_2px_14px_rgba(0,0,0,0.85)] sm:text-[46px]">
          nvrsëynvr
        </p>
        <p className="mt-4 max-w-xs text-center text-[12px] tracking-[0.28em] text-white/90 [text-shadow:0_2px_12px_rgba(0,0,0,0.85)] sm:text-[13px]">
          BUILT FOR THE ONES WHO NEVER GAVE UP
        </p>

        <Link
          href={STORE_HOME}
          data-testid="video-shop-now"
          tabIndex={showCta ? 0 : -1}
          className="btn-swipe btn-swipe-light mt-7 inline-flex items-center gap-2.5 border border-white bg-black/25 px-7 py-3 text-[11px] font-bold tracking-[0.2em] backdrop-blur-sm sm:mt-8 sm:gap-3 sm:px-12 sm:py-4 sm:text-[13px]"
        >
          SHOP NOW
          <LongArrowIcon className="h-3 w-8" />
        </Link>

        {finished && (
          <button
            onClick={() => startFromTop(false)}
            tabIndex={showCta ? 0 : -1}
            className="mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-white/80 transition-colors hover:text-white"
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
        )}
      </div>

      {/* Skip: always there, for anyone who would rather go straight to the shop */}
      <Link
        href={STORE_HOME}
        data-testid="film-skip"
        className="group absolute bottom-5 right-4 z-20 inline-flex items-center gap-1.5 border border-white/45 bg-black/30 px-3.5 py-2 text-[10px] font-bold tracking-[0.22em] backdrop-blur-sm transition-colors hover:border-white hover:bg-black/55 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-[11px] lg:bottom-8 lg:right-8"
      >
        SKIP
        <LongArrowIcon className="h-3 w-7 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>

      {/* Progress hairline */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-20 h-[2px] bg-white/15">
        <div
          className="h-full bg-white/85 transition-[width] duration-200 ease-linear"
          style={{ width: `${status === "ended" ? 100 : progress}%` }}
        />
      </div>
    </section>
  );
}
