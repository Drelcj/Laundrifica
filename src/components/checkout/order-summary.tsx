import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CartItem } from "@/lib/types"

interface OrderSummaryProps {
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  shippingMethod?: string
}

export function OrderSummary({ items, subtotal, tax, shipping, total, shippingMethod }: OrderSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₦{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (7.5% VAT)</span>
            <span>₦{tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping{shippingMethod ? ` (${shippingMethod})` : ''}</span>
            <span>{shipping === 0 ? 'Free' : `₦${shipping.toLocaleString()}`}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₦{total.toLocaleString()}</span>
        </div>
      </CardContent>
    </Card>
  )
}
