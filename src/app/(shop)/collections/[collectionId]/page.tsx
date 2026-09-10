import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { collections, getCollection, getCollectionProducts } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/motion/Reveal";

interface Props {
  params: { collectionId: string };
}

export function generateStaticParams() {
  return collections.map((c) => ({ collectionId: c.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const collection = getCollection(params.collectionId);
  if (!collection) return { title: "Collection" };
  return { title: collection.name, description: collection.description };
}

export default function CollectionDetailPage({ params }: Props) {
  const collection = getCollection(params.collectionId);
  if (!collection) notFound();

  const items = getCollectionProducts(collection.id);

  // A collection holding one or two pieces would look bare, so those are laid
  // out a card per colourway. Colourways that share a photo collapse into one
  // card, and a collection with enough pieces of its own is left alone.
  const colourways =
    items.length < 3
      ? items.flatMap((product) => {
          const seen: string[] = [];
          return product.colors
            .map((colour, index) => ({ product, colour, index }))
            .filter(({ colour }) => {
              if (seen.includes(colour.front)) return false;
              seen.push(colour.front);
              return true;
            });
        })
      : items.map((product) => ({ product, colour: null, index: undefined }));

  return (
    <div className="pb-8">
      <Reveal className="mx-auto flex w-full max-w-site items-baseline gap-3 px-4 pb-6 lg:px-8">
        <span className="text-[18px] font-bold tracking-wide">COLLECTIONS</span>
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-black" />
        <span className="text-[14px]">{collections.length} Items</span>
      </Reveal>

      {/* Editorial hero */}
      <section className="relative min-h-[70vh] overflow-hidden bg-black lg:min-h-[92vh]">
        {collection.image ? (
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            priority
            sizes="100vw"
            className="ken-burns object-cover grayscale"
          />
        ) : (
          /* Waiting on its cover shot: hold the space with the mark */
          <div className="absolute inset-0 flex items-center justify-center bg-[#111111]">
            <span className="font-blackletter text-[48px] text-white/25 lg:text-[80px]">
              nvrsëynvr
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
        <span className="absolute right-6 top-6 flex items-center gap-2 text-[10px] font-bold tracking-widest text-white lg:right-10">
          <span className="bg-white/90 px-3 py-1 text-black">PLAY/PAUSE ▶</span>
        </span>
        <Reveal
          variant="left"
          className="absolute bottom-12 left-6 max-w-2xl text-white lg:left-12"
        >
          {collection.latest && (
            <p className="mb-2 text-[13px] tracking-[0.15em] text-white/80">NEW COLLECTION</p>
          )}
          <h1 className="text-[22px] tracking-[0.08em] lg:text-[28px]">{collection.name}</h1>
          <p className="mt-4 text-[13px] leading-relaxed text-white/85 lg:text-[14px]">
            {collection.description}
          </p>
        </Reveal>
      </section>

      {/* Explore grid */}
      <div className="mx-auto w-full max-w-site px-4 lg:px-8">
        <Reveal className="flex items-baseline gap-3 pt-10">
          <span className="text-[18px] font-bold tracking-wide">EXPLORE</span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-black" />
          <span className="text-[14px]">{colourways.length} Items</span>
        </Reveal>

        <Reveal group className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4">
          {colourways.map(({ product, colour, index }, i) => (
            <ProductCard
              key={colour ? `${product.id}-${colour.sku}` : product.id}
              product={product}
              colorIndex={index}
              priority={i < 4}
            />
          ))}
        </Reveal>

        <Reveal className="py-16 text-center">
          <p className="text-[14px]">You&apos;ve reached the end of this selection</p>
          <p className="mt-1 text-[12px] text-black/50">{colourways.length} Items</p>
        </Reveal>
      </div>
    </div>
  );
}
