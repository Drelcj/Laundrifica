"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, Minus, Plus, Share2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/cart"
import { PRODUCTS, formatNaira, formatTierRange, getProductById } from "@/lib/products"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCartStore()
  const [quantity, setQuantity] = useState(1)

  const product = getProductById(params.id as string)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/shop">Return to Shop</Link>
        </Button>
      </div>
    )
  }

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4)

  const increaseQuantity = () => setQuantity(quantity + 1)
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const handleAddToCart = () => {
    addItem({
      id: `product-${product.id}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    })
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push("/checkout")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/shop">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">Made in Port Harcourt by Laundryfica</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{formatNaira(product.price)}</span>
              <span className="text-muted-foreground">per litre</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold">{formatNaira(product.price25L)}</span>
              <span className="text-muted-foreground">for 25 litres</span>
            </div>
            <p className="text-sm text-muted-foreground">Prices exclude the jerrycan.</p>
          </div>

          {product.bulkTiers && (
            <div className="space-y-2">
              <h3 className="font-medium">Bulk pricing</h3>
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left font-medium px-3 py-2">Quantity</th>
                      <th className="text-right font-medium px-3 py-2">Price per litre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.bulkTiers.map((tier) => (
                      <tr key={tier.minLitres} className="border-t">
                        <td className="px-3 py-2">{formatTierRange(tier)}</td>
                        <td className="px-3 py-2 text-right font-medium">{formatNaira(tier.pricePerLitre)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-green-600 border-green-600">
              In stock
            </Badge>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none" onClick={increaseQuantity}>
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
              <Button className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="secondary" className="flex-1" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share product</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full mb-12">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="details">Product Details</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="shipping">Shipping &amp; Returns</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="py-4">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">About {product.name}</h3>
            <p>{product.description}</p>
            <p>
              {product.name} is manufactured by Laundryfica Nigeria Limited in Port Harcourt and sold by the litre or
              by the 25-litre jerrycan. Quoted prices are for the product only and do not include the jerrycan.
            </p>
            {product.bulkTiers && (
              <p>
                Buying more brings the price per litre down — see the bulk pricing table above. For orders larger than
                the listed tiers, message us on WhatsApp for a quote.
              </p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="py-4">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between p-3 border rounded-lg">
                <span className="font-medium">Sold as</span>
                <span>1 litre / 25 litre</span>
              </div>
              <div className="flex justify-between p-3 border rounded-lg">
                <span className="font-medium">Price per litre</span>
                <span>{formatNaira(product.price)}</span>
              </div>
              <div className="flex justify-between p-3 border rounded-lg">
                <span className="font-medium">25 litre price</span>
                <span>{formatNaira(product.price25L)}</span>
              </div>
              <div className="flex justify-between p-3 border rounded-lg">
                <span className="font-medium">Made in</span>
                <span>Port Harcourt, Nigeria</span>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="shipping" className="py-4">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Shipping Information</h3>
            <p>
              We deliver across Port Harcourt. For delivery outside the city, message us on WhatsApp and we&apos;ll
              confirm cost and timing before you order.
            </p>
            <h3 className="text-xl font-semibold mt-6">Return Policy</h3>
            <p>
              We accept returns within 7 days of delivery if the product is unused and in its original packaging.
              Please contact us to arrange a return.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Other Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {relatedProducts.map((relatedProduct) => (
            <Card key={relatedProduct.id}>
              <div className="relative aspect-square overflow-hidden rounded-t-lg">
                <Image
                  src={relatedProduct.image || "/placeholder.svg"}
                  alt={relatedProduct.name}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium">{relatedProduct.name}</h3>
                <p className="font-bold mt-1">{formatNaira(relatedProduct.price)}</p>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={`/shop/${relatedProduct.id}`}>View</Link>
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() =>
                      addItem({
                        id: `product-${relatedProduct.id}`,
                        productId: relatedProduct.id,
                        name: relatedProduct.name,
                        price: relatedProduct.price,
                        quantity: 1,
                        image: relatedProduct.image,
                      })
                    }
                  >
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
