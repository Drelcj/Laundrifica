// The five products Laundryfica Nigeria Ltd. actually manufactures.
// Prices are in Naira, per litre, and exclude the jerrycan.
//
// There are no ratings or review counts here on purpose: no reviews have been
// collected yet, and inventing them is what this catalogue replaced.

export type BulkTier = {
  /** Inclusive lower bound, in litres. */
  minLitres: number
  /** Inclusive upper bound, in litres; null means "and above". */
  maxLitres: number | null
  /** Price per litre, in Naira. */
  pricePerLitre: number
}

export type CatalogueProduct = {
  id: string
  name: string
  slug: string
  /** Price for a single litre, in Naira. */
  price: number
  /** Price for a 25-litre jerrycan, in Naira. */
  price25L: number
  description: string
  image: string
  /** Volume-based per-litre pricing, where the product is sold that way. */
  bulkTiers?: BulkTier[]
}

/**
 * No real product photography has been supplied yet. Every product points at
 * the neutral placeholder rather than a stock image of an unrelated item —
 * swap these for real photos of the actual jerrycans/bottles.
 */
const PRODUCT_IMAGE_PLACEHOLDER = "/placeholder.svg"

export const PRODUCTS: CatalogueProduct[] = [
  {
    id: "1",
    name: "Liquid Wash",
    slug: "liquid-wash",
    price: 2000,
    price25L: 40000,
    description: "Concentrated liquid laundry wash, made in Port Harcourt. Sold per litre or by the jerrycan.",
    image: PRODUCT_IMAGE_PLACEHOLDER,
    bulkTiers: [
      { minLitres: 1, maxLitres: 1, pricePerLitre: 2000 },
      { minLitres: 2, maxLitres: 4, pricePerLitre: 1900 },
      { minLitres: 5, maxLitres: 9, pricePerLitre: 1800 },
      { minLitres: 10, maxLitres: 19, pricePerLitre: 1700 },
      { minLitres: 20, maxLitres: null, pricePerLitre: 1600 },
    ],
  },
  {
    id: "2",
    name: "Germicide (izal)",
    slug: "germicide",
    price: 1890,
    price25L: 49500,
    description: "Pine-based germicide for floors, drains and general disinfecting.",
    image: PRODUCT_IMAGE_PLACEHOLDER,
  },
  {
    id: "3",
    name: "Bleach (Hypo)",
    slug: "bleach-hypo",
    price: 1856,
    price25L: 46400,
    description: "Sodium hypochlorite bleach for whitening, stain removal and sanitising.",
    image: PRODUCT_IMAGE_PLACEHOLDER,
  },
  {
    id: "4",
    name: "Air Freshener",
    slug: "air-freshener",
    price: 1850,
    price25L: 46250,
    description: "Long-lasting air freshener for homes, offices and vehicles.",
    image: PRODUCT_IMAGE_PLACEHOLDER,
  },
  {
    id: "5",
    name: "Antiseptic (Dettol type)",
    slug: "antiseptic",
    price: 6500,
    price25L: 162500,
    description: "Antiseptic disinfectant for personal care, laundry and household use.",
    image: PRODUCT_IMAGE_PLACEHOLDER,
  },
]

/** Formats a Naira amount with no decimal places, e.g. ₦40,000. */
export function formatNaira(amount: number): string {
  return `₦${Math.round(amount).toLocaleString("en-NG")}`
}

/** Renders a bulk tier's quantity range, e.g. "2–4L" or "20L+". */
export function formatTierRange(tier: BulkTier): string {
  if (tier.maxLitres === null) return `${tier.minLitres}L+`
  if (tier.maxLitres === tier.minLitres) return `${tier.minLitres}L`
  return `${tier.minLitres}–${tier.maxLitres}L`
}

export function getProductById(id: string): CatalogueProduct | null {
  return PRODUCTS.find((product) => product.id === id) ?? null
}
