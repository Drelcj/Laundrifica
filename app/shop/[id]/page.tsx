"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, Heart, Minus, Plus, Share2, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/cart"

// This would normally be fetched from a database based on the ID
const getProductById = (id: string) => {
  const products = {
    "1": {
      id: "1",
      name: "Eco-Friendly Detergent",
      price: 3500,
      discountPrice: 2800,
      rating: 4.8,
      reviewCount: 124,
      stock: 35,
      description:
        "Our eco-friendly laundry detergent is specially formulated to provide exceptional cleaning power while being gentle on fabrics and the environment. It effectively removes tough stains and odors, leaving your clothes fresh and clean.",
      features: [
        "Effective on all fabric types",
        "Removes tough stains and odors",
        "Gentle on delicate fabrics",
        "Pleasant fresh scent",
        "Concentrated formula (1L = 25 washes)",
        "Eco-friendly packaging",
      ],
      specifications: {
        "Product Type": "Liquid Detergent",
        Volume: "1 Liter",
        "Number of Washes": "Approximately 25",
        Fragrance: "Fresh Linen",
        "Suitable For": "All fabric types",
        "Stain Removal": "High",
        "Eco-Friendly": "Yes",
        "Made In": "Nigeria",
      },
      images: [
        "/images/products/eco-detergent.png",
        "/images/products/eco-detergent.png",
        "/images/products/eco-detergent.png",
      ],
      relatedProducts: [
        {
          id: "2",
          name: "Fabric Softener",
          price: 2800,
          image: "/images/products/fabric-softener.png",
        },
        {
          id: "3",
          name: "Stain Remover",
          price: 1950,
          image: "/images/products/stain-remover.png",
        },
        {
          id: "4",
          name: "Laundry Bag",
          price: 4200,
          image: "/images/products/laundry-bag.png",
        },
      ],
    },
    "2": {
      id: "2",
      name: "Fabric Softener",
      price: 2800,
      discountPrice: null,
      rating: 4.6,
      reviewCount: 98,
      stock: 42,
      description:
        "Our premium fabric softener leaves your clothes incredibly soft, fresh, and static-free. The gentle formula is suitable for all fabric types and helps to reduce wrinkles for easier ironing.",
      features: [
        "Makes clothes soft and comfortable",
        "Reduces static cling",
        "Long-lasting fresh scent",
        "Helps reduce wrinkles",
        "Gentle on all fabrics",
        "Concentrated formula",
      ],
      specifications: {
        "Product Type": "Liquid Softener",
        Volume: "750ml",
        "Number of Washes": "Approximately 30",
        Fragrance: "Spring Breeze",
        "Suitable For": "All fabric types",
        "Eco-Friendly": "Yes",
        "Made In": "Nigeria",
      },
      images: [
        "/images/products/fabric-softener.png",
        "/images/products/fabric-softener.png",
        "/images/products/fabric-softener.png",
      ],
      relatedProducts: [
        {
          id: "1",
          name: "Eco-Friendly Detergent",
          price: 3500,
          image: "/images/products/eco-detergent.png",
        },
        {
          id: "3",
          name: "Stain Remover",
          price: 1950,
          image: "/images/products/stain-remover.png",
        },
        {
          id: "6",
          name: "Delicates Wash Bag",
          price: 1800,
          image: "/images/products/delicates-bag.png",
        },
      ],
    },
  }

  return products[id as keyof typeof products] || null
}

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

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = () => {
    addItem({
      id: `product-${product.id}`,
      productId: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      quantity: quantity,
      image: product.images[0],
    })

    // Optionally navigate to cart
    // router.push('/cart')
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
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {product.images.map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-lg border">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm font-medium">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-baseline">
            {product.discountPrice ? (
              <>
                <span className="text-3xl font-bold">₦{product.discountPrice.toLocaleString()}</span>
                <span className="ml-2 text-lg text-muted-foreground line-through">
                  ₦{product.price.toLocaleString()}
                </span>
                <Badge className="ml-2 bg-green-100 text-green-800">
                  Save ₦{(product.price - product.discountPrice).toLocaleString()}
                </Badge>
              </>
            ) : (
              <span className="text-3xl font-bold">₦{product.price.toLocaleString()}</span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-green-600 border-green-600">
              In Stock: {product.stock} available
            </Badge>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Key Features:</h3>
            <ul className="space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="mr-2 h-4 w-4 text-green-600 mt-1" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                >
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
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="py-4">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">About {product.name}</h3>
            <p>
              Our premium laundry detergent is specially formulated to provide exceptional cleaning power while being
              gentle on fabrics. The concentrated formula means you need less detergent per wash, making it economical
              and environmentally friendly.
            </p>
            <p>
              The fresh linen scent leaves your clothes smelling clean and fresh without being overpowering. Our
              detergent is effective in all water temperatures and is suitable for both machine and hand washing.
            </p>
            <h3 className="text-xl font-semibold mt-6">How to Use</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                For machine washing, add 40ml (1 capful) to your washing machine drawer or directly into the drum.
              </li>
              <li>For hand washing, dilute 20ml in a basin of water before adding clothes.</li>
              <li>For tough stains, apply a small amount directly to the stain before washing.</li>
              <li>Store in a cool, dry place away from direct sunlight.</li>
            </ol>
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="py-4">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between p-3 border rounded-lg">
                  <span className="font-medium">{key}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="py-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Customer Reviews</h3>
              <Button>Write a Review</Button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="font-medium">
                {product.rating} out of 5 ({product.reviewCount} reviews)
              </span>
            </div>
            <div className="space-y-4">
              {/* Sample reviews would go here */}
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-medium">Excellent product!</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">May 10, 2023</span>
                </div>
                <p className="text-sm">
                  This detergent is amazing! It removed tough stains from my children's clothes that other brands
                  couldn't handle. The scent is pleasant without being overwhelming. Highly recommend!
                </p>
                <div className="mt-2 text-sm font-medium">Chioma O. - Verified Buyer</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-medium">Great value for money</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">April 28, 2023</span>
                </div>
                <p className="text-sm">
                  I've been using this detergent for a few months now and I'm very satisfied. It lasts longer than other
                  brands I've tried, making it great value for money. The clothes come out clean and fresh.
                </p>
                <div className="mt-2 text-sm font-medium">Emeka A. - Verified Buyer</div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Load More Reviews
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="shipping" className="py-4">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Shipping Information</h3>
            <p>
              We offer nationwide delivery across Nigeria. Standard shipping takes 3-5 business days, while express
              shipping is available for 1-2 business days delivery.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Standard Shipping</h4>
                <p className="text-sm">3-5 business days</p>
                <p className="text-sm font-medium mt-1">₦1,500</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Express Shipping</h4>
                <p className="text-sm">1-2 business days</p>
                <p className="text-sm font-medium mt-1">₦3,000</p>
              </div>
            </div>
            <h3 className="text-xl font-semibold mt-6">Return Policy</h3>
            <p>
              We accept returns within 7 days of delivery if the product is unused and in its original packaging. Please
              contact our customer service team to initiate a return.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {product.relatedProducts.map((relatedProduct) => (
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
                <p className="font-bold mt-1">₦{relatedProduct.price.toLocaleString()}</p>
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
