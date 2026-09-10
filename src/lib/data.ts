import { Collection, Product, ProductColor } from "./types";

const TEE_SIZES = ["S", "M", "L", "XL"];
const ONE_SIZE = ["One Size"];

export const products: Product[] = [
  {
    id: "project-1957-freedom",
    name: "PROJECT-1957-FREEDOM",
    category: "T-SHIRT",
    price: 300,
    images: [],
    description:
      "The flagship tee of the Project-1957 line. Heavyweight American fleece carrying the independence artwork across the chest, with the adinkra mark at the collar on the reverse.",
    details: [
      "100% COTTON HEAVY AMERICAN FLEECE",
      "GARMENT DYED PIGMENT",
      "HAND PRINTED FRONT ARTWORK",
      "NVRSËYNVR LABEL",
      "MADE IN GHANA",
    ],
    sizes: TEE_SIZES,
    colors: [
      {
        name: "White",
        hex: "#f2f0eb",
        sku: "P57-FRD-WHT",
        front: "/images/products/freedom-white-front.webp",
        back: "/images/products/freedom-white-back.webp",
      },
      {
        name: "Black",
        hex: "#141414",
        sku: "P57-FRD-BLK",
        front: "/images/products/freedom-black-front.png",
        back: "/images/products/freedom-black-back.webp",
      },
    ],
    collection: "project-1957-freedom",
    featured: true,
    inStock: true,
    rating: 4.0,
    reviewCount: 25,
  },
  {
    id: "survivors-tee",
    name: "SURVIVORS",
    category: "T-SHIRT",
    price: 300,
    images: ["/images/lifestyle/survivors-group.webp"],
    description:
      "This is for the silent fighters. The ones who don't beg to be seen. The Survivors lion, hand drawn and printed across the back of heavyweight cotton. Fear who stays loud in silence.",
    details: [
      "100% COTTON HEAVY AMERICAN FLEECE",
      "OVERSIZED LION BACK PRINT",
      "HAND PRINTED GRAPHICS",
      "NVRSËYNVR LABEL",
      "MADE IN GHANA",
    ],
    sizes: TEE_SIZES,
    colors: [
      {
        name: "Ivory",
        hex: "#efeacf",
        sku: "SVR-TEE-IVY",
        front: "/images/products/survivors-ivory-front.webp",
        back: "/images/products/survivors-ivory-back.webp",
      },
      {
        name: "White",
        hex: "#f4f2ec",
        sku: "SVR-TEE-WHT",
        front: "/images/products/survivors-white-front.webp",
        back: "/images/products/survivors-white-back.webp",
      },
      {
        name: "Black",
        hex: "#111111",
        sku: "SVR-TEE-BLK",
        front: "/images/products/survivors-black-front.webp",
        back: "/images/products/survivors-black-back.webp",
      },
      {
        name: "Rose",
        hex: "#e8b9b4",
        sku: "SVR-TEE-RSE",
        front: "/images/products/survivors-rose-front.webp",
        back: "/images/products/survivors-rose-back.webp",
      },
    ],
    collection: "survivors",
    featured: true,
    inStock: true,
    badge: "new",
    rating: 4.5,
    reviewCount: 39,
  },
  {
    id: "keep-moving-tee",
    name: "KEEP MOVING",
    category: "T-SHIRT",
    price: 300,
    images: [],
    description:
      "Keep moving, no matter how slow. The turtle back print carries the whole philosophy of the line: steady beats fast, and showing up beats standing still.",
    details: [
      "100% COTTON HEAVY AMERICAN FLEECE",
      "TURTLE BACK PRINT",
      "HAND PRINTED GRAPHICS",
      "NVRSËYNVR LABEL",
      "MADE IN GHANA",
    ],
    sizes: TEE_SIZES,
    colors: [
      {
        name: "Sand",
        hex: "#e3d3b3",
        sku: "KPM-TEE-SND",
        front: "/images/products/keepmoving-sand-front.webp",
        back: "/images/products/keepmoving-sand-back.webp",
      },
      {
        name: "White",
        hex: "#f4f2ec",
        sku: "KPM-TEE-WHT",
        front: "/images/products/keepmoving-white-front.webp",
        back: "/images/products/keepmoving-white-back.webp",
      },
      {
        name: "Black",
        hex: "#141414",
        sku: "KPM-TEE-BLK",
        front: "/images/products/keepmoving-black-front.webp",
        back: "/images/products/keepmoving-black-back.webp",
      },
    ],
    collection: "keep-moving",
    featured: true,
    inStock: true,
    badge: "new",
    rating: 4.5,
    reviewCount: 11,
  },
  {
    id: "ghana-must-go-tee",
    name: "GHANA-MUST-GO",
    category: "T-SHIRT",
    price: 300,
    images: ["/images/products/ghana-hand-tee.webp"],
    description:
      "Named for the bag that carried whole lives across borders. Raised hands in red, gold and green break the chain across the chest. A story of leaving, returning, and carrying home with you.",
    details: [
      "100% COTTON HEAVY AMERICAN FLEECE",
      "MULTI-COLOUR FRONT PRINT",
      "HAND PRINTED GRAPHICS",
      "NVRSËYNVR LABEL",
      "MADE IN GHANA",
    ],
    sizes: TEE_SIZES,
    colors: [
      {
        name: "White",
        hex: "#f4f2ec",
        sku: "GMG-TEE-WHT",
        front: "/images/products/ghanamustgo-white-front.webp",
        back: "/images/products/ghanamustgo-white-back.webp",
      },
      {
        name: "Black",
        hex: "#141414",
        sku: "GMG-TEE-BLK",
        front: "/images/products/ghanamustgo-black-front.webp",
        back: "/images/products/ghanamustgo-black-back.webp",
      },
    ],
    collection: "project-1957-ghana-must-go",
    featured: true,
    inStock: true,
    badge: "new",
    rating: 4.5,
    reviewCount: 13,
  },
  {
    id: "grind-trucker-cap",
    name: "GRIND TRUCKER CAP",
    category: "CAP",
    price: 150,
    images: [
      "/images/products/trucker-cap-navy-model.webp",
      "/images/products/trucker-cap-brown-model.webp",
      "/images/products/trucker-cap-green-model.webp",
    ],
    description:
      "The グラインド (grind) trucker. Foam front, mesh back, nvr sëy nvr script under the katakana. Comes in every colour the city does.",
    details: [
      "FOAM FRONT / MESH BACK",
      "EMBROIDERED GRAPHICS",
      "ADJUSTABLE SNAPBACK",
      "NVRSËYNVR LABEL",
      "MADE IN GHANA",
    ],
    sizes: ONE_SIZE,
    colors: [
      {
        name: "Red / White",
        hex: "#b3342c",
        sku: "GRD-CAP-RED",
        front: "/images/products/trucker-cap-red.webp",
        back: "/images/products/caps-circle-1.webp",
      },
      {
        name: "Navy / White",
        hex: "#2b3550",
        sku: "GRD-CAP-NVY",
        front: "/images/products/trucker-cap-navy-model.webp",
        back: "/images/products/caps-circle-2.webp",
      },
      {
        name: "Green",
        hex: "#7a8a5a",
        sku: "GRD-CAP-GRN",
        front: "/images/products/trucker-cap-green-model.webp",
      },
      {
        name: "Brown / Navy",
        hex: "#6b4a3a",
        sku: "GRD-CAP-BRN",
        front: "/images/products/trucker-cap-brown-model.webp",
      },
    ],
    collection: "project-1957-ghana-must-go",
    featured: false,
    inStock: true,
    rating: 4.0,
    reviewCount: 9,
  },
  {
    id: "ns-heritage-cap",
    name: "NS HERITAGE CAP",
    category: "CAP",
    price: 150,
    images: ["/images/products/caps-circle-1.webp"],
    description:
      "The NS monogram baseball cap in heritage colourways: cream, pink, brick, and black. Structured crown, curved brim, embroidered interlocked NS.",
    details: [
      "STRUCTURED SIX-PANEL CROWN",
      "EMBROIDERED NS MONOGRAM",
      "ADJUSTABLE STRAP",
      "NVRSËYNVR LABEL",
      "MADE IN GHANA",
    ],
    sizes: ONE_SIZE,
    colors: [
      {
        name: "Cream",
        hex: "#e8dcc4",
        sku: "NSH-CAP-CRM",
        front: "/images/products/ns-caps-pile.webp",
        back: "/images/products/caps-circle-2.webp",
      },
      {
        name: "Black",
        hex: "#111111",
        sku: "NSH-CAP-BLK",
        front: "/images/products/caps-circle-2.webp",
      },
    ],
    collection: "project-1957-ghana-must-go",
    featured: false,
    inStock: false,
    badge: "coming-soon",
    rating: 4.0,
    reviewCount: 3,
  },
  {
    id: "olive-beanie",
    name: "NVRSËYNVR BEANIE",
    category: "BEANIE",
    price: 180,
    images: ["/images/products/beanie-black-model.webp"],
    description:
      "Soft-knit beanie in olive with the nvr sëy nvr script across the fold. Worn slouched or cuffed, made for the hours between night and morning.",
    details: [
      "SOFT KNIT COTTON BLEND",
      "PRINTED FOLD SCRIPT",
      "ONE SIZE FITS ALL",
      "NVRSËYNVR LABEL",
      "MADE IN GHANA",
    ],
    sizes: ONE_SIZE,
    colors: [
      {
        name: "Olive",
        hex: "#6b6b3a",
        sku: "OLV-BNE-OLV",
        front: "/images/products/beanie-olive-stack.webp",
        back: "/images/products/beanie-olive-tees.png",
      },
      {
        name: "Black",
        hex: "#111111",
        sku: "OLV-BNE-BLK",
        front: "/images/products/beanie-black-model.webp",
      },
    ],
    collection: "keep-moving",
    featured: false,
    inStock: true,
    rating: 4.0,
    reviewCount: 6,
  },
];

export const collections: Collection[] = [
  {
    id: "project-1957-freedom",
    name: "PROJECT-1957-FREEDOM",
    description:
      "1957, the year the flag first flew on its own. Freedom is the opening chapter of Project-1957: heavyweight staples carrying the independence artwork, shot against the marble of Accra. For the dreamers, the doers, and the ones who never gave up.",
    image: "/images/lifestyle/freedom-editorial.webp",
    latest: true,
  },
  {
    id: "project-1957-ghana-must-go",
    name: "PROJECT-1957-GHANA MUST GO",
    description:
      "Named for the bag that carried whole lives across borders. Ghana Must Go is about leaving, returning, and carrying home with you: raised hands in red, gold and green, and caps built for the journey.",
    image: "/images/lifestyle/ghana-flag-man.webp",
  },
  {
    id: "survivors",
    name: "SURVIVORS",
    description:
      "This is for the silent fighters. The ones who don't beg to be seen, they show up through action, not noise. Every drop, every line, every graphic screams one truth: fear who stays loud in silence. Built for the unbreakable.",
    image: "/images/lifestyle/survivors-group.webp",
  },
  {
    id: "keep-moving",
    name: "KEEP MOVING",
    description:
      "No matter how slow. The turtle line is the quiet engine of the brand: soft knits, everyday tees, and the reminder that steady beats fast, and showing up beats standing still.",
    image: "/images/lifestyle/van-selfie.webp",
  },
];

/** The shot a card opens on: the first colourway's front. */
export function frontImage(product: Product): string {
  return product.colors[0]?.front ?? product.images[0];
}

/** The shot a card swipes to on hover, when the garment has a back. */
export function backImage(product: Product): string | undefined {
  return product.colors[0]?.back ?? product.images[0];
}

/** Every shot for a colourway, front first, then back, then any extras. */
export function colorImages(product: Product, color: ProductColor): string[] {
  return [color.front, ...(color.back ? [color.back] : []), ...product.images];
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getCollection(id: string): Collection | undefined {
  return collections.find((c) => c.id === id);
}

export function getCollectionProducts(collectionId: string): Product[] {
  return products.filter((p) => p.collection === collectionId);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  const sameCollection = products.filter(
    (p) => p.collection === product.collection && p.id !== product.id
  );
  const others = products.filter(
    (p) => p.collection !== product.collection && p.id !== product.id
  );
  return [...sameCollection, ...others].slice(0, count);
}
