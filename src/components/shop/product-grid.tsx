import { OptimizedImage } from "@/components/optimized-image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "Eco-Friendly Detergent",
    price: 2500,
    originalPrice: 3000,
    image: "/images/products/eco-detergent.png",
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller",
    description: "Premium eco-friendly detergent for pristine fabric care",
  },
  {
    id: 2,
    name: "Premium Fabric Softener",
    price: 1800,
    originalPrice: 2200,
    image: "/images/products/fabric-softener.png",
    rating: 4.7,
    reviews: 89,
    badge: "New",
    description: "Luxurious softener that maintains fabric quality",
  },
  {
    id: 3,
    name: "Stain Remover Pro",
    price: 3200,
    originalPrice: 3800,
    image: "/images/products/stain-remover.png",
    rating: 4.9,
    reviews: 156,
    badge: "Popular",
    description: "Professional-grade stain removal for all fabric types",
  },
  {
    id: 4,
    name: "Premium Laundry Bag",
    price: 1500,
    originalPrice: 1800,
    image: "/images/products/laundry-bag.png",
    rating: 4.6,
    reviews: 67,
    badge: "Eco",
    description: "Durable mesh bag for delicate garment protection",
  },
  {
    id: 5,
    name: "Premium Hangers Set",
    price: 2200,
    originalPrice: 2600,
    image: "/images/products/premium-hangers.png",
    rating: 4.5,
    reviews: 43,
    badge: "Quality",
    description: "Professional-grade hangers for garment care",
  },
  {
    id: 6,
    name: "Delicates Wash Bag",
    price: 1200,
    originalPrice: 1500,
    image: "/images/products/delicates-bag.png",
    rating: 4.7,
    reviews: 78,
    badge: "Essential",
    description: "Gentle protection for your most delicate fabrics",
  },
]

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="p-0">
            <div className="relative aspect-square overflow-hidden rounded-t-lg">
              <OptimizedImage
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index < 3}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.badge && <Badge className="absolute top-2 left-2 z-10">{product.badge}</Badge>}
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="text-lg mb-2 line-clamp-1">{product.name}</CardTitle>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
            <div className="flex items-center gap-1 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews})</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold">₦{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₦{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="flex gap-2 w-full">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link href={`/shop/${product.id}`}>View Details</Link>
              </Button>
              <Button size="sm" className="flex-1">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
