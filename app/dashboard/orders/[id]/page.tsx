import Link from "next/link"
import { ArrowLeft, Download, ExternalLink, MapPin, Package, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { OrderStatusBadge } from "@/components/dashboard/order-status-badge"
import { OrderTrackingTimeline } from "@/components/dashboard/order-tracking-timeline"

interface OrderDetailsPageProps {
  params: {
    id: string
  }
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { id } = params

  // Mock order data - in a real app, this would come from an API call
  const order = {
    id,
    date: "2023-05-18",
    items: [
      { name: "Shirts/Blouses", quantity: 5, price: 2500, tier: "standard" },
      { name: "Pants/Trousers", quantity: 3, price: 3500, tier: "premium" },
    ],
    subtotal: 21500,
    deliveryFee: 1500,
    total: 23000,
    status: "processing" as const,
    pickupAddress: "123 Main Street, Lagos",
    pickupDate: "2023-05-18T10:00:00",
    estimatedDeliveryDate: "2023-05-20T14:00:00",
    trackingEvents: [
      { status: "acknowledged", date: "2023-05-18T08:30:00", note: "Order confirmed" },
      { status: "pickup-in-progress", date: "2023-05-18T09:45:00", note: "Driver en route to pickup location" },
      { status: "received", date: "2023-05-18T10:15:00", note: "Items received at facility" },
      { status: "processing", date: "2023-05-18T14:20:00", note: "Items being processed" },
    ],
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

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link href="/dashboard/orders">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Order {order.id}</h1>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>Placed on {new Date(order.date).toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Items</h3>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <div>
                        <span>
                          {item.quantity} × {item.name}
                        </span>
                        {item.tier === "premium" && <span className="ml-2 text-xs text-primary">Premium</span>}
                      </div>
                      <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>{formatPrice(order.deliveryFee)}</span>
                </div>
                <div className="flex justify-between font-medium pt-2">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/invoices/${order.id}`}>
                <Download className="mr-2 h-4 w-4" />
                Download Invoice
              </Link>
            </Button>
            <Button variant="ghost" size="sm">
              <ExternalLink className="mr-2 h-4 w-4" />
              Report Issue
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tracking Information</CardTitle>
            <CardDescription>Real-time updates on your order</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-start">
                <Package className="mr-2 h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Pickup</p>
                  <p className="text-sm text-muted-foreground">{formatDate(order.pickupDate)}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Truck className="mr-2 h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Estimated Delivery</p>
                  <p className="text-sm text-muted-foreground">{formatDate(order.estimatedDeliveryDate)}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-2 h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Delivery Address</p>
                  <p className="text-sm text-muted-foreground">{order.pickupAddress}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium mb-4">Order Progress</h3>
              <OrderTrackingTimeline status={order.status} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline" asChild>
              <Link href={`/dashboard/orders/${order.id}/track`}>View Detailed Tracking</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
