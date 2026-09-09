import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getRelatedProducts, products } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductDetail } from "./ProductDetail";
import { Reveal } from "@/components/motion/Reveal";

interface Props {
  params: { productId: string };
}

export function generateStaticParams() {
  return products.map((p) => ({ productId: p.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProduct(params.productId);
  if (!product) return { title: "Product" };
  return { title: product.name, description: product.description };
}

export default function ProductPage({ params }: Props) {
  const product = getProduct(params.productId);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    brand: { "@type": "Brand", name: "nvrsëynvr" },
    offers: {
      "@type": "Offer",
      priceCurrency: "GHS",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className="mx-auto w-full max-w-site px-4 pb-20 lg:px-8">
          <Reveal>
            <h2 className="text-[18px] font-bold tracking-[0.08em]">SIMILAR COLLECTIONS</h2>
          </Reveal>
          <Reveal group className="mt-8 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </Reveal>
        </section>
      )}
    </>
  );
}
