"use client"
import { useCartStore } from "@/src/lib/cart"
import { Suspense } from "react"
import { ProductGrid } from "@/components/shop/product-grid"
import { ProductFilters } from "@/components/shop/product-filters"
import { ProductCardSkeleton } from "@/components/loading-skeleton"

const products = [
  {
    id: 1,
    name: "Eco-Friendly Detergent",
    description: "Gentle on clothes and the environment.",
    price: 3500,
    image: "/images/products/eco-detergent.png",
    category: "Detergents",
  },
  {
    id: 2,
    name: "Fabric Softener",
    description: "Leaves clothes soft and fresh.",
    price: 2800,
    image: "/images/products/fabric-softener.png",
    category: "Softeners",
  },
  {
    id: 3,
    name: "Stain Remover",
    description: "Tackles tough stains effectively.",
    price: 1950,
    image: "/images/products/stain-remover.png",
    category: "Stain Removers",
  },
  {
    id: 4,
    name: "Laundry Bag",
    description: "Durable bag for storing and transporting laundry.",
    price: 4200,
    image: "/images/products/laundry-bag.png",
    category: "Accessories",
  },
  {
    id: 5,
    name: "Premium Hangers (Set of 10)",
    description: "High-quality hangers that protect your garments.",
    price: 5500,
    image: "/images/products/premium-hangers.png",
    category: "Accessories",
  },
  {
    id: 6,
    name: "Delicates Wash Bag",
    description: "Protects delicate items during washing.",
    price: 1800,
    image: "/images/products/delicates-bag.png",
    category: "Accessories",
  },
  {
    id: 7,
    name: "Organic Wool Dryer Balls",
    description: "Reduces drying time and static naturally.",
    price: 3200,
    image: "/images/products/dryer-balls.png",
    category: "Accessories",
  },
  {
    id: 8,
    name: "Premium Ironing Board Cover",
    description: "Heat-resistant and durable ironing surface.",
    price: 4800,
    image: "/images/products/ironing-board-cover.png",
    category: "Accessories",
  },
]

const categories = ["All", "Detergents", "Softeners", "Stain Removers", "Accessories"]

export default function ShopPageClient() {
  const { addItem } = useCartStore()

  const handleAddToCart = (product: any) => {
    addItem({
      id: `product-${product.id}`,
      productId: product.id.toString(),
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Shop Laundrifica Products</h1>
        <p className="text-muted-foreground">Discover premium laundry care products for your fabric's pristine care.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <ProductFilters />
        </aside>

        <main className="lg:col-span-3">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <ProductGrid />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
