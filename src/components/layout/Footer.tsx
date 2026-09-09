"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { useToast } from "@/context/ToastContext";
import { ChevronDownIcon, LongArrowIcon } from "@/components/ui/icons";
import { MarqueeTape } from "./Marquee";

const navItems = [
  { label: "About us", dropdown: false },
  { label: "Contact us", dropdown: true },
  { label: "Socials", dropdown: true },
  { label: "Get Help", dropdown: true },
];

export function Footer() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    setEmail("");
    showToast("You've joined the conversation.");
  }

  return (
    <footer className="bg-black text-white">
      <MarqueeTape />
      <div className="mx-auto grid w-full max-w-site gap-8 px-6 py-8 lg:grid-cols-2 lg:gap-8 lg:px-16 lg:py-12 xl:grid-cols-[1fr_auto_1fr]">
        {/* Manifesto + newsletter */}
        <div className="order-1 min-w-0">
          <p className="max-w-md text-[14px] leading-relaxed lg:text-[16px]">
            We don&apos;t believe in limits, and we certainly don&apos;t believe
            in &quot;no.&quot; Our brand was built for the dreamers the doers,
            and the ones who view every obstacle as an invitation to innovate.
            Whether it&apos;s through curated luxury, high-end tech, or
            unforgettable experiences, we provide the tools for a life lived
            without boundaries.
          </p>

          <p className="mt-7 text-[17px]">Join the Conversation</p>
          <form onSubmit={onSubmit} className="mt-4 max-w-md">
            <div className="flex items-end justify-between gap-4 border-b border-white/70 pb-1.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
                className="w-full bg-transparent text-[15px] text-white focus:outline-none"
              />
              <button type="submit" aria-label="Subscribe">
                <LongArrowIcon className="h-4 w-12" />
              </button>
            </div>
            <p className="mt-2 text-[13px] tracking-wide">EMAIL ADDRESS</p>
          </form>

          <div className="mt-7 flex items-center gap-4 text-[13px] tracking-wide">
            <span>WORLDWIDE</span>
            <span aria-hidden="true">🇬🇧</span>
            <span>ENGLISH</span>
          </div>
        </div>

        {/* Links, all on one aligned row */}
        <div className="order-2 grid min-w-0 grid-cols-2 gap-x-6 gap-y-4 lg:flex lg:flex-nowrap lg:items-start lg:justify-end lg:gap-x-6 lg:pt-2 xl:order-3 xl:gap-x-7 xl:pt-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="link-wipe flex items-center gap-1.5 whitespace-nowrap text-[16px] xl:text-[17px]"
            >
              {item.label}
              {item.dropdown && <ChevronDownIcon className="h-4 w-4 shrink-0" />}
            </button>
          ))}
        </div>

        {/* Brand mark, centred, with the wordmark beneath it */}
        <div className="order-3 flex flex-col items-center justify-between lg:col-span-2 xl:order-2 xl:col-span-1">
          <div className="flex flex-col items-center xl:h-48 xl:justify-center">
            <div className="relative h-36 w-36 xl:h-44 xl:w-44">
              <Image
                src="/images/brand/ns-monogram-tight.png"
                alt="nvrseynvr NS monogram"
                fill
                sizes="176px"
                className="object-contain"
              />
            </div>
            <p className="mt-4 text-[22px] font-bold xl:text-[26px]">nvrsëynvr</p>
          </div>
          <p className="mt-8 text-[16px] text-white/80 xl:mt-6">
            Copyright © 2026
          </p>
        </div>
      </div>
      <MarqueeTape />
    </footer>
  );
}
