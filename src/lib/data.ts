import { Collection, Product } from "./types";

const TEE_SIZES = ["S", "M", "L", "XL"];
const ONE_SIZE = ["One Size"];

export const products: Product[] = [
  {
    id: "project-1957-freedom",
    name: "PROJECT-1957-FREEDOM",
    category: "T-SHIRT",
    price: 200,
    images: [
      "/images/products/freedom-tee-flat.webp",
      "/images/products/freedom-tee-mannequin.png",
      "/images/products/freedom-tee-gray-mannequin.png",
      "/images/products/freedom-tee-duo.png",
    ],
    imageFemale: "/images/products/freedom-tee-female.png",
    description:
      "The flagship tee of the Project-1957 line. Heavyweight American fleece, garment dyed in Dirty Ivory, with the nvr sëy nvr mark hand printed across the chest and the crescent hit on the sleeve.",
    details: [
      "100% COTTON HEAVY AMERICAN FLEECE",
      "GARMENT DYED PIGMENT",
      "HAND PRINTED GRAPHICS",
      "NVRSËYNVR LABEL",
      "MADE IN GHANA",
    ],
    sizes: TEE_SIZES,
    colors: [{ name: "Dirty Ivory", hex: "#efeacf", sku: "P57-FRD-IVY" }],
    collection: "project-1957-freedom",
    featured: true,
    inStock: true,
    rating: 4.0,
    reviewCount: 25,
  },
  {
    id: "survivors-tee-ivory",
    name: "SURVIVORS TEE — IVORY",
    category: "T-SHIRT",
    price: 250,
    images: [
      "/images/products/survivors-tee-ivory.webp",
      "/images/lifestyle/survivors-group.webp",
    ],
    description:
      "This is for the silent fighters. The ones who don't beg to be seen. The Survivors lion, hand drawn and printed across heavyweight cotton. Fear who stays quiet in silence — built for the unwavable.",
    details: [
      "100% COTTON HEAVY AMERICAN FLEECE",
      "OVERSIZED LION BACK PRINT",
      "HAND PRINTED GRAPHICS",
      "NVRSËYNVR LABEL",
      "MADE IN GHANA",
    ],
    sizes: TEE_SIZES,
    colors: [{ name: "Ivory", hex: "#efeacf", sku: "SVR-TEE-IVY" }],
    collection: "survivors",
    featured: true,
    inStock: true,
    badge: "new",
    rating: 4.5,
    reviewCount: 18,
  },
  {
    id: "survivors-tee-black",
    name: "SURVIVORS TEE — BLACK",
    category: "T-SHIRT",
    price: 250,
    images: [
      "/images/products/survivors-tee-black.webp",
      "/images/lifestyle/three-girls-tees.webp",
    ],
    description:
      "The Survivors lion on midnight black. Hand drawn, hand printed, heavyweight. This one is for the silent fighters who move through the noise without becoming it.",
    details: [
      "100% COTTON HEAVY AMERICAN FLEECE",
      "OVERSIZED LION BACK PRINT",
      "HAND PRINTED GRAPHICS",
      "NVRSËYNVR LABEL",
      "MADE IN GHANA",
    ],
    sizes: TEE_SIZES,
    colors: [{ name: "Black", hex: "#111111", sku: "SVR-TEE-BLK" }],
    collection: "survivors",
    featured: true,
    inStock: true,
    badge: "new",
    rating: 4.5,
    reviewCount: 21,
  },
  {
    id: "survivors-tee-rose",
    name: "SURVIVORS TEE — ROSE",
    category: "T-SHIRT",
    price: 250,
    images: ["/images/products/survivors-tee-pink.webp"],
    description:
      "The Survivors lion in a washed rose colourway. Same heavyweight cotton, same hand printed graphic — a softer shade for the loudest statement in the line.",
    details: [
      "100% COTTON HEAVY AMERICAN FLEECE",
      "OVERSIZED LION BACK PRINT",
      "HAND PRINTED GRAPHICS",
      "NVRSËYNVR LABEL",
      "MADE IN GHANA",
    ],
    sizes: TEE_SIZES,
    colors: [{ name: "Rose", hex: "#e8b9b4", sku: "SVR-TEE-RSE" }],
    collection: "survivors",
    featured: false,
    inStock: true,
    badge: "coming-soon",
    rating: 4.0,
    reviewCount: 7,
  },
  {
    id: "black-roundneck-tee",
    name: "BLACK ROUNDNECK T-SHIRT",
    category: "T-SHIRT",
    price: 200,
    images: [
      "/images/products/classic-tee-black-back.webp",
      "/images/lifestyle/girl-black-tee-cap.webp",
    ],
    description:
      "The everyday classic. Black heavyweight roundneck with the nvr sëy nvr mark across the upper back and the crescent hit on the shoulder. Quiet on the front — the back speaks.",
    details: [
      "100% COTTON HEAVY AMERICAN FLEECE",
      "GARMENT DYED PIGMENT",
      "BACK LOGO PRINT",
      "NVRSËYNVR LABEL",
      "MADE IN GHANA",
    ],
    sizes: TEE_SIZES,
    colors: [{ name: "Black", hex: "#111111", sku: "CLS-TEE-BLK" }],
    collection: "project-1957-freedom",
    featured: true,
    inStock: true,
    rating: 4.0,
    reviewCount: 32,
  },
  {
    id: "white-roundneck-tee",
    name: "WHITE ROUNDNECK T-SHIRT",
    category: "T-SHIRT",
    price: 200,
    images: [
      "/images/products/white-tee-closeup.webp",
      "/images/products/white-tee-flatlay.webp",
    ],
    description:
      "Clean white heavyweight roundneck with the tonal nvr sëy nvr chest mark. Ships with the full nvrsëynvr pack — stickers, bandana, and label card.",
    details: [
      "100% COTTON HEAVY AMERICAN FLEECE",
      "TONAL CHEST PRINT",
      "SHIPS WITH BRAND PACK",
      "NVRSËYNVR LABEL",
      "MADE IN GHANA",
    ],
    sizes: TEE_SIZES,
    colors: [{ name: "White", hex: "#f4f2ec", sku: "CLS-TEE-WHT" }],
    collection: "project-1957-freedom",
    featured: false,
    inStock: true,
    rating: 4.0,
    reviewCount: 14,
  },
  {
    id: "keep-moving-tee",
    name: "KEEP MOVING TEE",
    category: "T-SHIRT",
    price: 220,
    images: [
      "/images/products/keep-moving-tee-cream.webp",
      "/images/products/keep-moving-tee-back.webp",
    ],
    description:
      "Keep moving — no matter how slow. The turtle back print carries the whole philosophy of the line: steady beats fast, and showing up beats standing still.",
    details: [
      "100% COTTON HEAVY AMERICAN FLEECE",
      "TURTLE BACK PRINT",
      "HAND PRINTED GRAPHICS",
      "NVRSËYNVR LABEL",
      "MADE IN GHANA",
    ],
    sizes: TEE_SIZES,
    colors: [{ name: "Cream", hex: "#efe9d8", sku: "KPM-TEE-CRM" }],
    collection: "keep-moving",
    featured: true,
    inStock: true,
    badge: "new",
    rating: 4.5,
    reviewCount: 11,
  },
  {
    id: "grind-trucker-cap",
    name: "GRIND TRUCKER CAP",
    category: "CAP",
    price: 150,
    images: [
      "/images/products/trucker-cap-red.webp",
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
      { name: "Red / White", hex: "#b3342c", sku: "GRD-CAP-RED" },
      { name: "Navy / White", hex: "#2b3550", sku: "GRD-CAP-NVY" },
      { name: "Green", hex: "#7a8a5a", sku: "GRD-CAP-GRN" },
      { name: "Brown / Navy", hex: "#6b4a3a", sku: "GRD-CAP-BRN" },
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
    price: 180,
    images: [
      "/images/products/ns-caps-pile.webp",
      "/images/products/caps-circle-1.webp",
    ],
    description:
      "The NS monogram baseball cap in heritage colourways — cream, pink, brick, and black. Structured crown, curved brim, embroidered interlocked NS.",
    details: [
      "STRUCTURED SIX-PANEL CROWN",
      "EMBROIDERED NS MONOGRAM",
      "ADJUSTABLE STRAP",
      "NVRSËYNVR LABEL",
      "MADE IN GHANA",
    ],
    sizes: ONE_SIZE,
    colors: [
      { name: "Cream", hex: "#e8dcc4", sku: "NSH-CAP-CRM" },
      { name: "Pink", hex: "#e8b9c4", sku: "NSH-CAP-PNK" },
      { name: "Black", hex: "#111111", sku: "NSH-CAP-BLK" },
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
    name: "OLIVE BEANIE",
    category: "BEANIE",
    price: 120,
    images: [
      "/images/products/beanie-olive-stack.webp",
      "/images/products/beanie-olive-tees.png",
      "/images/products/beanie-black-model.webp",
    ],
    description:
      "Soft-knit beanie in olive with the nvr sëy nvr script across the fold. Worn slouched or cuffed — made for the hours between night and morning.",
    details: [
      "SOFT KNIT COTTON BLEND",
      "PRINTED FOLD SCRIPT",
      "ONE SIZE FITS ALL",
      "NVRSËYNVR LABEL",
      "MADE IN GHANA",
    ],
    sizes: ONE_SIZE,
    colors: [
      { name: "Olive", hex: "#6b6b3a", sku: "OLV-BNE-OLV" },
      { name: "Black", hex: "#111111", sku: "OLV-BNE-BLK" },
    ],
    collection: "keep-moving",
    featured: false,
    inStock: true,
    rating: 4.0,
    reviewCount: 6,
  },
  {
    id: "ghana-must-go-tee",
    name: "GHANA-MUST-GO TEE",
    category: "T-SHIRT",
    price: 250,
    images: [
      "/images/products/ghana-hand-tee.webp",
      "/images/lifestyle/ghana-flag-man.webp",
    ],
    description:
      "The Ghana-Must-Go tee — the open hand in red, gold and green on black heavyweight cotton. A story of leaving, returning, and carrying home with you.",
    details: [
      "100% COTTON HEAVY AMERICAN FLEECE",
      "MULTI-COLOUR HAND PRINT",
      "HAND PRINTED GRAPHICS",
      "NVRSËYNVR LABEL",
      "MADE IN GHANA",
    ],
    sizes: TEE_SIZES,
    colors: [{ name: "Black", hex: "#111111", sku: "GMG-TEE-BLK" }],
    collection: "project-1957-ghana-must-go",
    featured: true,
    inStock: true,
    badge: "new",
    rating: 4.5,
    reviewCount: 13,
  },
];

export const collections: Collection[] = [
  {
    id: "project-1957-freedom",
    name: "PROJECT-1957-FREEDOM",
    description:
      "1957 — the year the flag first flew on its own. Freedom is the opening chapter of Project-1957: heavyweight staples in dirty ivory and black, shot against the marble of Accra. For the dreamers, the doers, and the ones who never gave up.",
    image: "/images/lifestyle/freedom-editorial.webp",
    latest: true,
  },
  {
    id: "project-1957-ghana-must-go",
    name: "PROJECT-1957-GHANA MUST GO",
    description:
      "Named for the bag that carried whole lives across borders. Ghana Must Go is about leaving, returning, and carrying home with you — the open hand in red, gold and green, and caps built for the journey.",
    image: "/images/lifestyle/ghana-flag-man.webp",
  },
  {
    id: "survivors",
    name: "SURVIVORS",
    description:
      "This is for the silent fighters. The ones who don't beg to be seen, they show up through action, not noise. Every drop, every line, every graphic screams one truth: fear who stays quiet in silence. Built for the unwavable.",
    image: "/images/lifestyle/survivors-group.webp",
  },
  {
    id: "keep-moving",
    name: "KEEP MOVING",
    description:
      "No matter how slow. The turtle line is the quiet engine of the brand — soft knits, everyday tees, and the reminder that steady beats fast, and showing up beats standing still.",
    image: "/images/lifestyle/van-selfie.webp",
  },
];

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
