"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart"
import { CartItemComponent } from "@/components/cart/cart-item"
import { CartSummary } from "@/components/cart/cart-summary"

export default function CartPage() {
  const { cart, calculateTotals } = useCartStore()

  // Recalculate totals when the page loads
  useEffect(() => {
    calculateTotals()
  }, [calculateTotals])

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {cart.items.length === 0 ? (
        <div className="text-center py-16 space-y-6">
          <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
          </div>
          <Button asChild size="lg">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg shadow-sm border">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Cart Items ({cart.items.length})</h2>
                <div className="divide-y">
                  {cart.items.map((item) => (
                    <CartItemComponent key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <Button variant="outline" asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
              <Button variant="destructive" onClick={() => useCartStore.getState().clearCart()}>
                Clear Cart
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  )
}
