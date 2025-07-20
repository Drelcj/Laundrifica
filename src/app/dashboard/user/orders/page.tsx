"use client"

import Link from "next/link"
import { ArrowRight, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderStatusBadge } from "@/components/dashboard/order-status-badge"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import type { DbOrder } from "@/lib/types"

// Interface for order items from database
interface OrderItem {
  id: number
  product_id: number
  quantity: number
  price_at_purchase: number
  products?: {
    name: string
  }
}

// Interface for orders with items
interface OrderWithItems extends DbOrder {
  order_items: OrderItem[]
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderWithItems[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  // Fetch orders from Supabase
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.user?.id) {
          setError("User not authenticated")
          setLoading(false)
          return
        }

        // Fetch orders with order items (products table may not exist yet)
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (
              id,
              product_id,
              quantity,
              price_at_purchase
            )
          `)
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })

        if (ordersError) {
          console.error('Error fetching orders:', ordersError)
          setError('Failed to fetch orders')
        } else {
          setOrders(ordersData as OrderWithItems[] || [])
        }
      } catch (err) {
        console.error('Error:', err)
        setError('An unexpected error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [supabase])

  // Format price in Naira
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Get product name by ID (fallback mapping)
  const getProductName = (productId: number) => {
    const productNames: Record<number, string> = {
      1: "Regular Laundry",
      2: "Premium Laundry", 
      3: "Dry Cleaning",
      4: "Express Service",
      5: "Bed Linens",
      6: "Shirts/Blouses",
      7: "Pants/Trousers",
      8: "Suits (2-piece)",
      9: "Towels"
    }
    return productNames[productId] || `Product ${productId}`
  }

  // Display loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">View and manage your laundry orders</p>
        </div>
        <div className="flex items-center justify-center py-8">
          <p>Loading orders...</p>
        </div>
      </div>
    )
  }

  // Display error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">View and manage your laundry orders</p>
        </div>
        <div className="flex items-center justify-center py-8">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">View and manage your laundry orders</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search orders..." className="w-full sm:w-[300px] pl-8" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No orders found</p>
              <Button asChild className="mt-4">
                <Link href="/services">Place Your First Order</Link>
              </Button>
            </div>
          ) : (
            orders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">Order ORD-{order.id}</CardTitle>
                      <CardDescription>{new Date(order.created_at).toLocaleDateString()}</CardDescription>
                    </div>
                    <OrderStatusBadge status={order.status as any} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {order.order_items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {item.quantity} × {getProductName(item.product_id)}
                        </span>
                        <span className="font-medium">{formatPrice(item.price_at_purchase * item.quantity)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between border-t pt-2 font-medium">
                      <span>Total</span>
                      <span>{formatPrice(order.total_amount)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="ml-auto" asChild>
                    <Link href={`/dashboard/user/orders/${order.id}`}>
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          {orders
            .filter((order) => order.status !== "completed" && order.status !== "cancelled")
            .map((order) => (
              <Card key={order.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">Order ORD-{order.id}</CardTitle>
                      <CardDescription>{new Date(order.created_at).toLocaleDateString()}</CardDescription>
                    </div>
                    <OrderStatusBadge status={order.status as any} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {order.order_items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {item.quantity} × {getProductName(item.product_id)}
                        </span>
                        <span className="font-medium">{formatPrice(item.price_at_purchase * item.quantity)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between border-t pt-2 font-medium">
                      <span>Total</span>
                      <span>{formatPrice(order.total_amount)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="ml-auto" asChild>
                    <Link href={`/dashboard/user/orders/${order.id}`}>
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          {orders
            .filter((order) => order.status === "completed")
            .map((order) => (
              <Card key={order.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">Order ORD-{order.id}</CardTitle>
                      <CardDescription>{new Date(order.created_at).toLocaleDateString()}</CardDescription>
                    </div>
                    <OrderStatusBadge status={order.status as any} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {order.order_items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {item.quantity} × {getProductName(item.product_id)}
                        </span>
                        <span className="font-medium">{formatPrice(item.price_at_purchase * item.quantity)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between border-t pt-2 font-medium">
                      <span>Total</span>
                      <span>{formatPrice(order.total_amount)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="ml-auto" asChild>
                    <Link href={`/dashboard/user/orders/${order.id}`}>
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="cancelled" className="space-y-4">
          {orders
            .filter((order) => order.status === "cancelled")
            .map((order) => (
              <Card key={order.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">Order ORD-{order.id}</CardTitle>
                      <CardDescription>{new Date(order.created_at).toLocaleDateString()}</CardDescription>
                    </div>
                    <OrderStatusBadge status={order.status as any} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {order.order_items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {item.quantity} × {getProductName(item.product_id)}
                        </span>
                        <span className="font-medium">{formatPrice(item.price_at_purchase * item.quantity)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between border-t pt-2 font-medium">
                      <span>Total</span>
                      <span>{formatPrice(order.total_amount)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="ml-auto" asChild>
                    <Link href={`/dashboard/user/orders/${order.id}`}>
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
