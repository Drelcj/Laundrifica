"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Check, Info, Minus, Plus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Define types for our items
type ServiceCategory = "wash-fold" | "dry-cleaning" | "ironing" | "repairs"
type ServiceTier = "standard" | "premium"

interface LaundryItem {
  id: string
  name: string
  category: ServiceCategory
  standardPrice: number
  premiumPrice: number
  description: string
}

interface OrderItem {
  item: LaundryItem
  quantity: number
  tier: ServiceTier
}

// Sample data for laundry items
const laundryItems: LaundryItem[] = [
  // Wash & Fold
  {
    id: "wf-regular",
    name: "Regular Laundry",
    category: "wash-fold",
    standardPrice: 1200,
    premiumPrice: 1800,
    description: "Everyday clothes, t-shirts, jeans, etc. (per kg)",
  },
  {
    id: "wf-bedlinen",
    name: "Bed Linens",
    category: "wash-fold",
    standardPrice: 1500,
    premiumPrice: 2200,
    description: "Sheets, pillowcases, duvet covers (per kg)",
  },
  {
    id: "wf-towels",
    name: "Towels",
    category: "wash-fold",
    standardPrice: 1300,
    premiumPrice: 1900,
    description: "Bath towels, hand towels, washcloths (per kg)",
  },
  {
    id: "wf-delicates",
    name: "Delicates",
    category: "wash-fold",
    standardPrice: 2000,
    premiumPrice: 3000,
    description: "Delicate fabrics requiring special care (per kg)",
  },

  // Dry Cleaning
  {
    id: "dc-shirts",
    name: "Shirts/Blouses",
    category: "dry-cleaning",
    standardPrice: 2500,
    premiumPrice: 3800,
    description: "Button-up shirts and blouses (per item)",
  },
  {
    id: "dc-pants",
    name: "Pants/Trousers",
    category: "dry-cleaning",
    standardPrice: 3500,
    premiumPrice: 5200,
    description: "Dress pants, slacks, trousers (per item)",
  },
  {
    id: "dc-suits",
    name: "Suits (2-piece)",
    category: "dry-cleaning",
    standardPrice: 8000,
    premiumPrice: 12000,
    description: "Jacket and pants/skirt (per set)",
  },
  {
    id: "dc-dresses",
    name: "Dresses",
    category: "dry-cleaning",
    standardPrice: 5000,
    premiumPrice: 7500,
    description: "Casual and formal dresses (per item)",
  },

  // Ironing
  {
    id: "ir-shirts",
    name: "Shirts/Blouses",
    category: "ironing",
    standardPrice: 1500,
    premiumPrice: 2200,
    description: "Professional pressing for shirts and blouses (per item)",
  },
  {
    id: "ir-pants",
    name: "Pants/Trousers",
    category: "ironing",
    standardPrice: 1800,
    premiumPrice: 2700,
    description: "Crisp, wrinkle-free pants (per item)",
  },
  {
    id: "ir-dresses",
    name: "Dresses",
    category: "ironing",
    standardPrice: 2500,
    premiumPrice: 3800,
    description: "Careful pressing for dresses (per item)",
  },

  // Repairs
  {
    id: "rp-button",
    name: "Button Replacement",
    category: "repairs",
    standardPrice: 1200,
    premiumPrice: 1800,
    description: "Replace missing or broken buttons (per button)",
  },
  {
    id: "rp-hem",
    name: "Hem Adjustment",
    category: "repairs",
    standardPrice: 3500,
    premiumPrice: 5200,
    description: "Adjust hem length on pants, skirts, dresses (per item)",
  },
  {
    id: "rp-zipper",
    name: "Zipper Replacement",
    category: "repairs",
    standardPrice: 5000,
    premiumPrice: 7500,
    description: "Replace broken zippers (per zipper)",
  },
]

export default function OrderPage() {
  const searchParams = useSearchParams()
  const initialTier = (searchParams.get("tier") as ServiceTier) || "standard"

  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>("wash-fold")
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [defaultTier, setDefaultTier] = useState<ServiceTier>(initialTier)

  // Filter items by category
  const filteredItems = laundryItems.filter((item) => item.category === selectedCategory)

  // Calculate totals
  const subtotal = orderItems.reduce((sum, orderItem) => {
    const price = orderItem.tier === "premium" ? orderItem.item.premiumPrice : orderItem.item.standardPrice
    return sum + price * orderItem.quantity
  }, 0)

  const deliveryFee = 1500 // Fixed delivery fee
  const total = subtotal + deliveryFee

  // Add item to order
  const addItem = (item: LaundryItem) => {
    const existingItem = orderItems.find((orderItem) => orderItem.item.id === item.id)

    if (existingItem) {
      setOrderItems(
        orderItems.map((orderItem) =>
          orderItem.item.id === item.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem,
        ),
      )
    } else {
      setOrderItems([...orderItems, { item, quantity: 1, tier: defaultTier }])
    }
  }

  // Remove item from order
  const removeItem = (itemId: string) => {
    const existingItem = orderItems.find((orderItem) => orderItem.item.id === itemId)

    if (existingItem && existingItem.quantity > 1) {
      setOrderItems(
        orderItems.map((orderItem) =>
          orderItem.item.id === itemId ? { ...orderItem, quantity: orderItem.quantity - 1 } : orderItem,
        ),
      )
    } else {
      setOrderItems(orderItems.filter((orderItem) => orderItem.item.id !== itemId))
    }
  }

  // Toggle item tier between standard and premium
  const toggleItemTier = (itemId: string) => {
    setOrderItems(
      orderItems.map((orderItem) =>
        orderItem.item.id === itemId
          ? {
              ...orderItem,
              tier: orderItem.tier === "standard" ? "premium" : "standard",
            }
          : orderItem,
      ),
    )
  }

  // Format price in Naira
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/pricing">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Pricing
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Place Your Order</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Select Your Default Service Tier</CardTitle>
              <CardDescription>You can upgrade individual items later</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant={defaultTier === "standard" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setDefaultTier("standard")}
                >
                  <Check className={`mr-2 h-4 w-4 ${defaultTier === "standard" ? "opacity-100" : "opacity-0"}`} />
                  Standard Service
                </Button>
                <Button
                  variant={defaultTier === "premium" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setDefaultTier("premium")}
                >
                  <Check className={`mr-2 h-4 w-4 ${defaultTier === "premium" ? "opacity-100" : "opacity-0"}`} />
                  Premium Service
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ServiceCategory)}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="wash-fold">Wash & Fold</TabsTrigger>
              <TabsTrigger value="dry-cleaning">Dry Cleaning</TabsTrigger>
              <TabsTrigger value="ironing">Ironing</TabsTrigger>
              <TabsTrigger value="repairs">Repairs</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedCategory === "wash-fold" && "Wash & Fold Items"}
                    {selectedCategory === "dry-cleaning" && "Dry Cleaning Items"}
                    {selectedCategory === "ironing" && "Ironing Items"}
                    {selectedCategory === "repairs" && "Repair Services"}
                  </CardTitle>
                  <CardDescription>Click on an item to add it to your order</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {filteredItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                        onClick={() => addItem(item)}
                      >
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {formatPrice(defaultTier === "premium" ? item.premiumPrice : item.standardPrice)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {defaultTier === "premium" ? "Premium" : "Standard"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your full name" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter your phone number" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" placeholder="Enter your email address" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Delivery Address</Label>
                    <Textarea id="address" placeholder="Enter your delivery address" rows={3} />
                  </div>
                  <div>
                    <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Any special instructions for pickup or delivery"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Your Order
              </CardTitle>
              <CardDescription>
                {orderItems.length === 0
                  ? "Your order is empty"
                  : `${orderItems.reduce((sum, item) => sum + item.quantity, 0)} items in your order`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {orderItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Add items to your order by selecting them from the categories on the left.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orderItems.map((orderItem) => (
                    <div key={orderItem.item.id} className="flex flex-col gap-2 pb-4 border-b">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium flex items-center">
                            {orderItem.item.name}
                            {orderItem.tier === "premium" && (
                              <Badge className="ml-2 bg-primary text-primary-foreground text-xs">Premium</Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {orderItem.item.category === "wash-fold" ? "Per kg" : "Per item"}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {formatPrice(
                              orderItem.tier === "premium"
                                ? orderItem.item.premiumPrice * orderItem.quantity
                                : orderItem.item.standardPrice * orderItem.quantity,
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formatPrice(
                              orderItem.tier === "premium" ? orderItem.item.premiumPrice : orderItem.item.standardPrice,
                            )}{" "}
                            × {orderItem.quantity}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => removeItem(orderItem.item.id)}
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          <span className="w-8 text-center">{orderItem.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => addItem(orderItem.item)}
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                        </div>

                        <div className="flex items-center gap-2">
                          <Label htmlFor={`upgrade-${orderItem.item.id}`} className="text-xs cursor-pointer">
                            {orderItem.tier === "standard" ? "Upgrade to Premium" : "Switch to Standard"}
                          </Label>
                          <Switch
                            id={`upgrade-${orderItem.item.id}`}
                            checked={orderItem.tier === "premium"}
                            onCheckedChange={() => toggleItemTier(orderItem.item.id)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {orderItems.length > 0 && (
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>{formatPrice(deliveryFee)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>

                  <Alert className="bg-muted/50 mt-4">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Premium Service</AlertTitle>
                    <AlertDescription className="text-xs">
                      Premium service includes enhanced cleaning techniques, priority processing, and premium packaging
                      for longer-lasting garments.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" disabled={orderItems.length === 0}>
                Proceed to Payment
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
