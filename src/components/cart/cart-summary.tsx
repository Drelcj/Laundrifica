"use client"
import { useRouter } from "next/navigation"
import { ShoppingBagIcon } from "lucide-react"
import { useCartStore } from "@/lib/cart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function CartSummary() {
  const router = useRouter()
  const { cart } = useCartStore()
  const { items, subtotal, tax, shipping, total } = cart

  const handleCheckout = () => {
    router.push("/checkout")
  }

  const handleContinueShopping = () => {
    router.push("/products")
  }

  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Cart</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Button onClick={handleContinueShopping}>Continue Shopping</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal ({items.length} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button className="w-full" onClick={handleCheckout}>
          Proceed to Checkout
        </Button>
        <Button variant="outline" className="w-full" onClick={handleContinueShopping}>
          Continue Shopping
        </Button>
      </CardFooter>
    </Card>
  )
}
