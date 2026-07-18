"use client";

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
      <div className="mx-auto grid w-full max-w-site gap-8 px-6 py-8 lg:grid-cols-[1.1fr_0.9fr_1.2fr] lg:gap-8 lg:px-16 lg:py-12">
        {/* Manifesto + newsletter */}
        <div>
          <p className="text-[22px] font-bold lg:text-[26px]">nvrsëynvr</p>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed lg:text-[16px]">
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

        {/* Brand logo */}
        <div className="flex flex-col items-center justify-between">
          <div className="flex h-40 items-center justify-center lg:h-48">
            <span className="font-blackletter text-[48px] leading-none text-white lg:text-[60px]">
              nvrsëynvr
            </span>
          </div>
          <p className="mt-6 text-[16px] text-white/80">
            Copyright © 2026
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-start gap-x-10 gap-y-4 lg:justify-end lg:pt-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-2 text-[16px] hover:underline lg:text-[18px]"
            >
              {item.label}
              {item.dropdown && <ChevronDownIcon className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </div>
      <MarqueeTape />
    </footer>
  );
}
