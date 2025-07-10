import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import type { Product } from '@/types/app'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col group">
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={product.image_urls?.[0] ?? '/placeholder.svg'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        {product.categories?.name && <Badge variant="secondary" className="w-fit mb-2">{product.categories.name}</Badge>}
        <h3 className="text-xl font-bold mb-2 flex-grow">{product.name}</h3>
        {product.description && <p className="text-muted-foreground mb-4 text-sm">{product.description}</p>}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <p className="text-2xl font-extrabold">
            ₦{Number(product.price).toLocaleString()}
          </p>
          <Button>Add to Cart</Button>
        </div>
      </div>
    </div>
  )
}
