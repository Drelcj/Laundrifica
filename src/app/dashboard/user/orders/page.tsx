import Link from "next/link"
import { ArrowRight, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderStatusBadge } from "@/components/dashboard/order-status-badge"

// Mock data for orders
const orders = [
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
  {
    id: "ORD-12348",
    date: "2023-05-22",
    items: [
      { name: "Shirts/Blouses", quantity: 3, price: 2500 },
      { name: "Suits (2-piece)", quantity: 1, price: 8000 },
    ],
    total: 15500,
    status: "acknowledged" as const,
  },
  {
    id: "ORD-12349",
    date: "2023-05-25",
    items: [
      { name: "Regular Laundry", quantity: 4, price: 1200 },
      { name: "Bed Linens", quantity: 2, price: 1500 },
    ],
    total: 7800,
    status: "pending" as const,
  },
]

export default function OrdersPage() {
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
          {orders.map((order) => (
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
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="ml-auto" asChild>
                  <Link href={`/dashboard/orders/${order.id}`}>
                    View Details
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          {orders
            .filter((order) =>
              [
                "pending",
                "acknowledged",
                "pickup-scheduled",
                "pickup-in-progress",
                "received",
                "processing",
                "ready-for-delivery",
                "delivery-in-progress",
              ].includes(order.status),
            )
            .map((order) => (
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
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="ml-auto" asChild>
                    <Link href={`/dashboard/orders/${order.id}`}>
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
            .filter((order) => order.status === "delivered")
            .map((order) => (
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
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="ml-auto" asChild>
                    <Link href={`/dashboard/orders/${order.id}`}>
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
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="ml-auto" asChild>
                    <Link href={`/dashboard/orders/${order.id}`}>
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
