import { Collection, Product, ProductColor } from "./types";

const TEE_SIZES = ["S", "M", "L", "XL"];
const ONE_SIZE = ["One Size"];

const TEE_PRICE = 350;

export const products: Product[] = [
  {
    id: "freedom-tee",
    name: "FREEDOM",
    category: "T-SHIRT",
    price: TEE_PRICE,
    images: ["/images/products/ghana-hand-tee.webp"],
    description:
      "Raised hands in red, gold and green break the chain across the chest. Freedom is the opening statement of Project 1957: heavyweight American fleece, hand printed, made to be worn loud.",
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
        sku: "P57-FRD-WHT",
        front: "/images/products/freedom-white-front.webp",
        back: "/images/products/freedom-white-back.webp",
      },
      {
        name: "Black",
        hex: "#141414",
        sku: "P57-FRD-BLK",
        front: "/images/products/freedom-black-front.webp",
        back: "/images/products/freedom-black-back.webp",
      },
    ],
    collection: "project-1957",
    featured: true,
    inStock: true,
    badge: "new",
    rating: 4.5,
    reviewCount: 13,
  },
  {
    id: "ghana-must-go-tee",
    name: "GHANA MUST GO",
    category: "T-SHIRT",
    price: TEE_PRICE,
    images: [],
    description:
      "Named for the bag that carried whole lives across borders. The independence artwork runs across the chest, with the adinkra mark at the collar on the reverse. A story of leaving, returning, and carrying home with you.",
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
        sku: "P57-GMG-WHT",
        front: "/images/products/ghanamustgo-white-front.webp",
        back: "/images/products/ghanamustgo-white-back.webp",
      },
      {
        name: "Black",
        hex: "#141414",
        sku: "P57-GMG-BLK",
        front: "/images/products/ghanamustgo-black-front.png",
        back: "/images/products/ghanamustgo-black-back.webp",
      },
    ],
    collection: "project-1957",
    featured: true,
    inStock: true,
    rating: 4.0,
    reviewCount: 25,
  },
  {
    id: "survivors-tee",
    name: "SURVIVORS",
    category: "T-SHIRT",
    price: TEE_PRICE,
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
    price: TEE_PRICE,
    images: ["/images/lifestyle/studio-rack.jpg"],
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
    id: "infiniti-bennie",
    name: "INFINITI BENNIE",
    category: "BEANIE",
    price: 160,
    images: ["/images/lifestyle/van-selfie.webp"],
    description:
      "Soft-knit beanie with the infinity mark on the fold and the line that runs through the house: fear who stays loud in silence. Worn slouched or cuffed, made for the hours between night and morning.",
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
        sku: "INF-BNE-OLV",
        front: "/images/products/beanie-olive-stack.webp",
        back: "/images/products/beanie-olive-tees.png",
      },
      {
        name: "Black",
        hex: "#111111",
        sku: "INF-BNE-BLK",
        front: "/images/products/beanie-black-model.webp",
      },
    ],
    collection: "headwear",
    featured: false,
    inStock: true,
    rating: 4.0,
    reviewCount: 6,
  },
  {
    id: "grind-trucker-cap",
    name: "GRIND CAP",
    category: "CAP",
    price: 100,
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
        hex2: "#f4f2ec",
        sku: "GRD-CAP-RED",
        front: "/images/products/trucker-cap-red.webp",
      },
      {
        name: "Sea Blue",
        hex: "#2f6f9f",
        sku: "GRD-CAP-SEA",
        front: "/images/products/trucker-cap-navy-model.webp",
      },
      {
        name: "Navy / White",
        hex: "#2b3550",
        hex2: "#f4f2ec",
        sku: "GRD-CAP-NVY",
        front: "/images/products/caps-circle-2.webp",
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
        hex2: "#2b3550",
        sku: "GRD-CAP-BRN",
        front: "/images/products/trucker-cap-brown-model.webp",
      },
    ],
    collection: "headwear",
    featured: false,
    inStock: true,
    rating: 4.0,
    reviewCount: 9,
  },
  {
    id: "exclusive-cap",
    name: "EXCLUSIVE CAPS",
    category: "CAP",
    price: 150,
    images: ["/images/products/caps-circle-1.webp"],
    description:
      "The exclusive cap carries the NS monogram on the front, KEEP MOVING down one side and SURVIVORS down the other. Structured crown, curved brim, ten two-tone make-ups.",
    details: [
      "STRUCTURED SIX-PANEL CROWN",
      "EMBROIDERED NS MONOGRAM",
      "KEEP MOVING AND SURVIVORS SIDE HITS",
      "ADJUSTABLE STRAP",
      "MADE IN GHANA",
    ],
    sizes: ONE_SIZE,
    colors: [
      { name: "Cream + Black", hex: "#e8dcc4", hex2: "#111111", sku: "EXC-CAP-CRBK", front: "/images/products/ns-caps-pile.webp" },
      { name: "Cream + Brown", hex: "#e8dcc4", hex2: "#6b4a3a", sku: "EXC-CAP-CRBR", front: "/images/products/ns-caps-pile.webp" },
      { name: "Cream + Forest Green", hex: "#e8dcc4", hex2: "#2f4f36", sku: "EXC-CAP-CRFG", front: "/images/products/caps-circle-1.webp" },
      { name: "Cream + Red", hex: "#e8dcc4", hex2: "#b3342c", sku: "EXC-CAP-CRRD", front: "/images/products/ns-caps-pile.webp" },
      { name: "Cream + Navy Blue", hex: "#e8dcc4", hex2: "#23315a", sku: "EXC-CAP-CRNV", front: "/images/products/caps-circle-1.webp" },
      { name: "Cream + Pink", hex: "#e8dcc4", hex2: "#e8b9c4", sku: "EXC-CAP-CRPK", front: "/images/products/ns-caps-pile.webp" },
      { name: "Charcoal Grey + White", hex: "#4a4a4a", hex2: "#f4f2ec", sku: "EXC-CAP-CHWH", front: "/images/products/caps-circle-2.webp" },
      { name: "Cream + Beige", hex: "#e8dcc4", hex2: "#cbb99a", sku: "EXC-CAP-CRBG", front: "/images/products/ns-caps-pile.webp" },
      { name: "White + Black", hex: "#f4f2ec", hex2: "#111111", sku: "EXC-CAP-WHBK", front: "/images/products/caps-circle-2.webp" },
      { name: "White + Blue Black", hex: "#f4f2ec", hex2: "#1b2436", sku: "EXC-CAP-WHBB", front: "/images/products/caps-circle-1.webp" },
    ],
    collection: "headwear",
    featured: false,
    inStock: true,
    rating: 4.0,
    reviewCount: 3,
  },
];

export const collections: Collection[] = [
  {
    id: "project-1957",
    name: "PROJECT 1957",
    description:
      "1957, the year the flag first flew on its own. Two pieces carry the chapter: Freedom, with the chain broken by raised hands, and Ghana Must Go, named for the bag that carried whole lives across borders.",
    image: "/images/lifestyle/freedom-editorial.webp",
    latest: true,
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
    // Cover shot still to come.
  },
  {
    id: "headwear",
    name: "HEADWEAR",
    description:
      "Caps and beanies, built to finish the fit. The Infiniti Bennie, the Grind Cap under its katakana, and the Exclusive Caps carrying the NS monogram with KEEP MOVING and SURVIVORS down the sides.",
    image: "/images/products/caps-circle-1.webp",
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

/**
 * Every shot for a colourway: front, then back, then the shots of the piece
 * being worn. Deduplicated, since a colourway's own photo is sometimes also
 * one of the shared shots and would otherwise appear twice in the gallery.
 */
export function colorImages(product: Product, color: ProductColor): string[] {
  const all = [color.front, ...(color.back ? [color.back] : []), ...product.images];
  return all.filter((src, i) => all.indexOf(src) === i);
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
