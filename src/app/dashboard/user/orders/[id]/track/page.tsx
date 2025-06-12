"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { OrderStatusTimeline } from "@/components/order-tracking/order-status-timeline"
import { ShippingMap } from "@/components/order-tracking/shipping-map"
import { getOrderById } from "@/src/lib/api"
import type { Order } from "@/src/lib/types"

export default function OrderTrackingPage() {
  const params = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadOrder() {
      try {
        const orderId = params.id as string
        const orderData = await getOrderById(orderId)
        setOrder(orderData)
      } catch (error) {
        console.error("Error loading order:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadOrder()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto py-12">
        <div className="text-center py-16 space-y-6">
          <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Order Not Found</h2>
            <p className="text-muted-foreground">The order you're looking for doesn't exist or has been removed.</p>
          </div>
          <Button asChild size="lg">
            <Link href="/dashboard/orders">View All Orders</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href={`/dashboard/orders/${order.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Order Details
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Order #{order.id}</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderStatusTimeline order={order} />
            </CardContent>
          </Card>

          {order.shippingInfo && <ShippingMap shippingInfo={order.shippingInfo} />}

          {order.shippingInfo?.updates && order.shippingInfo.updates.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Shipment Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.shippingInfo.updates.map((update, index) => (
                    <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{update.status.replace("_", " ")}</span>
                        <span className="text-sm text-muted-foreground">{formatDate(update.timestamp)}</span>
                      </div>
                      <p className="text-sm">{update.description}</p>
                      <p className="text-sm text-muted-foreground mt-1">{update.location}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Items</h3>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₦{order.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>₦{order.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>₦{order.shipping.toLocaleString()}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₦{order.total.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <div className="text-sm">
                    <p>
                      {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                    </p>
                    <p>{order.shippingAddress.addressLine1}</p>
                    {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                    <p className="mt-1">{order.shippingAddress.phone}</p>
                  </div>
                </div>

                {order.shippingInfo && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">Shipping Method</h3>
                      <p className="text-sm">{order.shippingInfo.method}</p>
                      <p className="text-sm text-muted-foreground">
                        Estimated delivery: {formatDate(order.shippingInfo.estimatedDelivery)}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function formatDate(dateString: string): string {
  if (!dateString) return "Not available"
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
