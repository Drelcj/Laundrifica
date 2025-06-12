import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OrderStatusBadge } from "@/components/dashboard/order-status-badge"

// Mock data for recent orders
const recentOrders = [
  {
    id: "ORD-12345",
    customer: "John Doe",
    date: "2023-05-15",
    total: 5100,
    status: "delivered" as const,
  },
  {
    id: "ORD-12346",
    customer: "Jane Smith",
    date: "2023-05-18",
    total: 23000,
    status: "processing" as const,
  },
  {
    id: "ORD-12347",
    customer: "Michael Johnson",
    date: "2023-05-20",
    total: 7600,
    status: "pickup-scheduled" as const,
  },
  {
    id: "ORD-12348",
    customer: "Sarah Williams",
    date: "2023-05-20",
    total: 12500,
    status: "acknowledged" as const,
  },
  {
    id: "ORD-12349",
    customer: "Robert Brown",
    date: "2023-05-21",
    total: 9800,
    status: "received" as const,
  },
]

export function RecentOrdersTable() {
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
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b text-sm">
            <th className="text-left font-medium p-2">Order ID</th>
            <th className="text-left font-medium p-2">Customer</th>
            <th className="text-left font-medium p-2">Date</th>
            <th className="text-left font-medium p-2">Amount</th>
            <th className="text-left font-medium p-2">Status</th>
            <th className="text-right font-medium p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recentOrders.map((order) => (
            <tr key={order.id} className="border-b hover:bg-muted/50">
              <td className="p-2">
                <Link href={`/admin/orders/${order.id}`} className="text-primary hover:underline">
                  {order.id}
                </Link>
              </td>
              <td className="p-2">
                <Link
                  href={`/admin/customers/${order.customer.toLowerCase().replace(" ", "-")}`}
                  className="hover:underline"
                >
                  {order.customer}
                </Link>
              </td>
              <td className="p-2 text-muted-foreground">{new Date(order.date).toLocaleDateString()}</td>
              <td className="p-2 font-medium">{formatPrice(order.total)}</td>
              <td className="p-2">
                <OrderStatusBadge status={order.status} />
              </td>
              <td className="p-2 text-right">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/admin/orders/${order.id}`}>
                    <span className="sr-only">View order</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
