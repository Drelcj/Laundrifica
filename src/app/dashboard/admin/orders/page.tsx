import type { Metadata } from "next"
import { CalendarIcon, FilterIcon, SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Orders Management | Laundrify Admin",
  description: "Manage all customer orders and their statuses",
}

// Mock data for orders
const orders = [
  {
    id: "ORD-2023-1001",
    customer: "John Doe",
    date: "2023-05-18",
    total: "₦12,500",
    status: "Delivered",
    items: 8,
    address: "15 Adebayo St, Lekki Phase 1",
  },
  {
    id: "ORD-2023-1002",
    customer: "Sarah Johnson",
    date: "2023-05-18",
    total: "₦8,750",
    status: "Processing",
    items: 5,
    address: "7B Admiralty Way, Lekki",
  },
  {
    id: "ORD-2023-1003",
    customer: "Michael Obi",
    date: "2023-05-17",
    total: "₦15,200",
    status: "Ready for delivery",
    items: 10,
    address: "24 Bode Thomas St, Surulere",
  },
  {
    id: "ORD-2023-1004",
    customer: "Amina Yusuf",
    date: "2023-05-17",
    total: "₦6,800",
    status: "Pickup agent on the way",
    items: 4,
    address: "5 Adeola Odeku St, Victoria Island",
  },
  {
    id: "ORD-2023-1005",
    customer: "David Adeleke",
    date: "2023-05-16",
    total: "₦22,500",
    status: "Delivered",
    items: 15,
    address: "10 Bourdillon Rd, Ikoyi",
  },
]

// Helper function to get status badge color
function getStatusColor(status: string) {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-800"
    case "Processing":
      return "bg-blue-100 text-blue-800"
    case "Ready for delivery":
      return "bg-purple-100 text-purple-800"
    case "Pickup agent on the way":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function OrdersPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Orders Management</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FilterIcon className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button>New Order</Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search orders by ID, customer name, or address..." className="pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="ready">Ready for delivery</SelectItem>
            <SelectItem value="pickup">Pickup agent on the way</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Orders</CardTitle>
              <CardDescription>Showing {orders.length} orders from the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{order.address}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Orders</CardTitle>
              <CardDescription>Orders that are awaiting pickup or processing</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure for pending orders */}
              <div className="text-center py-8 text-muted-foreground">Filtered pending orders would appear here</div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="processing" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Processing Orders</CardTitle>
              <CardDescription>Orders currently being processed in the facility</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure for processing orders */}
              <div className="text-center py-8 text-muted-foreground">Filtered processing orders would appear here</div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Orders</CardTitle>
              <CardDescription>Orders that have been delivered to customers</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure for completed orders */}
              <div className="text-center py-8 text-muted-foreground">Filtered completed orders would appear here</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
