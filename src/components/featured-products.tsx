import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Eco-Friendly Detergent",
    price: 2500,
    originalPrice: 3000,
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611440/laundrifica_images/products/eco-detergent_lehbqn.jpg",
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
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611450/laundrifica_images/products/stain-remover_eh5aas.jpg",
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
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611450/laundrifica_images/products/premium-hangers_oncshy.jpg",
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
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611449/laundrifica_images/products/ironing-board-cover_jy0xxc.jpg",
    rating: 4.6,
    reviews: 67,
    badge: "Eco",
    description: "Durable mesh bag for delicate garment protection",
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our premium collection of laundry care products. Your fabric's pristine care starts with quality
            products.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={85}
                    loading={index < 2 ? "eager" : "lazy"}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo="
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

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
