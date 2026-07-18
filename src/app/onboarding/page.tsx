"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useToast } from "@/context/ToastContext";
import { LongArrowIcon } from "@/components/ui/icons";

export default function OnboardingPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    showToast("Welcome to nvrsëynvr.");
    router.push("/");
  }

  return (
    <div className="flex min-h-screen flex-col bg-white px-6">
      <header className="flex items-center justify-between py-6">
        <span className="font-blackletter text-[20px]">nvrsëynvr</span>
        <Link
          href="/"
          className="flex items-center gap-3 text-[18px] underline underline-offset-4"
        >
          Skip for now
          <LongArrowIcon className="h-4 w-9" />
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-[710px] flex-1 flex-col items-center">
        <h1 className="mt-16 text-center text-[28px] font-bold sm:text-[36px]">
          Sign up to join our news letter
        </h1>
        <div className="relative mt-8 h-[220px] w-[228px] sm:h-[281px] sm:w-[290px]">
          <Image
            src="/images/brand/globe-logo.png"
            alt="nvrsëynvr globe logo"
            fill
            priority
            sizes="290px"
            className="object-contain"
          />
        </div>

        <form onSubmit={onSubmit} className="mt-16 w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user12@example.com"
            aria-label="Email address"
            className="w-full border-b border-black pb-2 text-[20px] placeholder:text-black/50 focus:outline-none"
          />
          <p className="mt-2 text-[24px]">Email</p>
          <button
            type="submit"
            className="mt-24 block w-full border border-black bg-black py-2 text-[16px] font-bold text-white transition-colors hover:bg-white hover:text-black"
          >
            Sign UP
          </button>
        </form>
      </main>
      <div className="h-10" />
    </div>
  );
}
