import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { collections } from "@/lib/data";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Collections",
  description: "The nvrsëynvr collections — Project-1957, Survivors, and Keep Moving.",
};

export default function CollectionsPage() {
  return (
    <div className="pb-4">
      <Reveal className="mx-auto flex w-full max-w-site items-baseline gap-3 px-4 pb-6 lg:px-8">
        <span className="text-[18px] font-bold tracking-wide">COLLECTIONS</span>
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-black" />
        <span className="text-[14px]">{collections.length} Items</span>
      </Reveal>

      <div className="flex flex-col gap-2">
        {collections.map((collection, i) => (
          <Reveal key={collection.id} variant="scale">
            <Link
              href={`/collections/${collection.id}`}
              className="group relative block min-h-[420px] overflow-hidden bg-black lg:min-h-[560px]"
            >
              {collection.image ? (
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              ) : (
                /* Waiting on its cover shot: hold the space with the mark */
                <div className="absolute inset-0 flex items-center justify-center bg-[#111111]">
                  <span className="font-blackletter text-[38px] text-white/25 lg:text-[54px]">
                    nvrsëynvr
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {collection.latest && (
                <span className="absolute left-6 top-6 bg-white px-5 py-1.5 text-[11px] font-bold tracking-widest text-black">
                  NEW
                </span>
              )}
              <div className="absolute bottom-10 left-6 max-w-xl text-white lg:left-10">
                <p className="text-[20px] tracking-[0.06em] lg:text-[24px]">{collection.name}</p>
                <p className="mt-3 hidden text-[13px] leading-relaxed text-white/85 sm:block">
                  {collection.description}
                </p>
              </div>
              <span className="btn-swipe btn-swipe-dark absolute bottom-10 right-6 bg-white px-5 py-1.5 text-[11px] font-bold tracking-widest text-black lg:right-10">
                EXPLORE
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
