import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <p className="font-blackletter text-[26px]">nvrsëynvr</p>
      <h1 className="mt-8 text-[32px] font-bold">This page doesn&apos;t exist.</h1>
      <p className="mt-3 max-w-sm text-[14px] text-black/60">
        The piece you&apos;re looking for may have moved. The shop is still open.
      </p>
      <Link
        href="/"
        className="mt-10 inline-block bg-black px-10 py-3 text-[13px] font-bold tracking-widest text-white"
      >
        BACK TO STORE
      </Link>
    </div>
  );
}
