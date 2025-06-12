import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { OrderStatusBadge } from "@/components/dashboard/order-status-badge"
import { OrderTrackingTimeline } from "@/components/dashboard/order-tracking-timeline"

// Mock data for recent orders
const recentOrders = [
  {
    id: "ORD-12345",
    date: "2023-05-15",
    items: [
      { name: "Regular Laundry", quantity: 3, price: 1200 },
      { name: "Bed Linens", quantity: 1, price: 1500 },
    ],
    total: 5100,
    status: "delivered" as const,
  },
  {
    id: "ORD-12346",
    date: "2023-05-18",
    items: [
      { name: "Shirts/Blouses", quantity: 5, price: 2500 },
      { name: "Pants/Trousers", quantity: 3, price: 3500 },
    ],
    total: 23000,
    status: "processing" as const,
  },
  {
    id: "ORD-12347",
    date: "2023-05-20",
    items: [
      { name: "Regular Laundry", quantity: 2, price: 1200 },
      { name: "Towels", quantity: 4, price: 1300 },
    ],
    total: 7600,
    status: "pickup-scheduled" as const,
  },
]

export function RecentOrdersList() {
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
    <div className="space-y-4">
      {recentOrders.map((order) => (
        <Card key={order.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-base">Order {order.id}</CardTitle>
                <CardDescription>{new Date(order.date).toLocaleDateString()}</CardDescription>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.quantity} × {item.name}
                  </span>
                  <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="flex justify-between border-t pt-2 font-medium">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>

            {/* Only show tracking for orders that are in progress */}
            {order.status !== "delivered" && order.status !== "cancelled" && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Order Tracking</h4>
                <OrderTrackingTimeline status={order.status} />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/orders/${order.id}`}>
                View Details
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/dashboard/invoices/${order.id}`}>
                Download Invoice
                <ExternalLink className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}

      <div className="text-center">
        <Button variant="outline" asChild>
          <Link href="/dashboard/orders">View All Orders</Link>
        </Button>
      </div>
    </div>
  )
}
