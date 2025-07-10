'use client'

import { ProductGrid } from '@/components/shop/product-grid'
import { ProductFilters } from '@/components/shop/product-filters'
import type { Product } from '@/types/app'

interface ShopPageClientProps {
  products: Product[]
}

export default function ShopPageClient({ products }: ShopPageClientProps) {
    const categories = [
    'All',
    ...Array.from(new Set(products.map((p) => p.categories?.name).filter(Boolean) as string[])),
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Our Shop</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover premium laundry care products and unique thrift finds to elevate your fabric care routine.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <ProductFilters categories={categories} />
        </aside>

        <main className="lg:col-span-3">
          <ProductGrid products={products} />
        </main>
      </div>
    </div>
  )
}
