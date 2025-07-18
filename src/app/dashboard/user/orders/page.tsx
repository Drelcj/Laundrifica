import Link from "next/link"
import { ArrowRight, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderStatusBadge } from "@/components/dashboard/order-status-badge"

import { getOrders } from "@/lib/api"
import { OrderWithItems } from "@/types/order";
import { DbOrderStatus } from "@/lib/types";

export default async function OrdersPage() {
  const orders: OrderWithItems[] = await getOrders();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const renderOrderCard = (order: OrderWithItems) => (
    <Card key={order.id}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">Order #{order.id}</CardTitle>
            <CardDescription>{new Date(order.created_at).toLocaleDateString()}</CardDescription>
          </div>
          <OrderStatusBadge status={order.status as DbOrderStatus} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {order.order_items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.quantity} × {item.products?.name || 'Unknown Product'}
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
          <Link href={`/order/${order.id}`}>
            View Details
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );

  const activeOrders = orders.filter(
    (order) => order.status !== "completed" && order.status !== "cancelled"
  );
  const completedOrders = orders.filter((order) => order.status === "completed");
  const cancelledOrders = orders.filter((order) => order.status === "cancelled");

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
          {orders.map(renderOrderCard)}
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          {activeOrders.map(renderOrderCard)}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          {completedOrders.map(renderOrderCard)}
        </TabsContent>
        <TabsContent value="cancelled" className="space-y-4">
          {cancelledOrders.map(renderOrderCard)}
        </TabsContent>
      </Tabs>
    </div>
  )
}
