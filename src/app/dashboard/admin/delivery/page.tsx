import type { Metadata } from "next"
import { MapIcon, RefreshCwIcon, SearchIcon, TruckIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Delivery Management | LaundryLab Admin",
  description: "Manage all pickups and deliveries",
}

// Mock data for deliveries
const deliveries = [
  {
    id: "DEL-2023-1001",
    type: "Pickup",
    customer: "John Doe",
    address: "15 Adebayo St, Lekki Phase 1",
    scheduledTime: "10:00 AM - 12:00 PM",
    agent: "Oluwaseun Adebayo",
    status: "Completed",
    orderId: "ORD-2023-1001",
  },
  {
    id: "DEL-2023-1002",
    type: "Delivery",
    customer: "Sarah Johnson",
    address: "7B Admiralty Way, Lekki",
    scheduledTime: "2:00 PM - 4:00 PM",
    agent: "Tunde Bakare",
    status: "In Progress",
    orderId: "ORD-2023-1002",
  },
  {
    id: "DEL-2023-1003",
    type: "Pickup",
    customer: "Michael Obi",
    address: "24 Bode Thomas St, Surulere",
    scheduledTime: "9:00 AM - 11:00 AM",
    agent: "Oluwaseun Adebayo",
    status: "Scheduled",
    orderId: "ORD-2023-1003",
  },
  {
    id: "DEL-2023-1004",
    type: "Pickup",
    customer: "Amina Yusuf",
    address: "5 Adeola Odeku St, Victoria Island",
    scheduledTime: "1:00 PM - 3:00 PM",
    agent: "Unassigned",
    status: "Pending Assignment",
    orderId: "ORD-2023-1004",
  },
  {
    id: "DEL-2023-1005",
    type: "Delivery",
    customer: "David Adeleke",
    address: "10 Bourdillon Rd, Ikoyi",
    scheduledTime: "4:00 PM - 6:00 PM",
    agent: "Tunde Bakare",
    status: "Scheduled",
    orderId: "ORD-2023-1005",
  },
]

// Helper function to get status badge color
function getStatusColor(status: string) {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800"
    case "In Progress":
      return "bg-blue-100 text-blue-800"
    case "Scheduled":
      return "bg-purple-100 text-purple-800"
    case "Pending Assignment":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// Helper function to get type badge color
function getTypeColor(type: string) {
  switch (type) {
    case "Pickup":
      return "bg-blue-100 text-blue-800"
    case "Delivery":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function DeliveryPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Delivery Management</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCwIcon className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <MapIcon className="mr-2 h-4 w-4" />
            View Map
          </Button>
          <Button>
            <TruckIcon className="mr-2 h-4 w-4" />
            Schedule Delivery
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search by ID, customer, or address..." className="pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="pending">Pending Assignment</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pickups">Pickups</TabsTrigger>
          <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
          <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Pickups & Deliveries</CardTitle>
              <CardDescription>Showing {deliveries.length} scheduled pickups and deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Scheduled Time</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deliveries.map((delivery) => (
                    <TableRow key={delivery.id}>
                      <TableCell className="font-medium">{delivery.id}</TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(delivery.type)}>{delivery.type}</Badge>
                      </TableCell>
                      <TableCell>{delivery.customer}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{delivery.address}</TableCell>
                      <TableCell>{delivery.scheduledTime}</TableCell>
                      <TableCell>
                        {delivery.agent === "Unassigned" ? (
                          <span className="text-yellow-600">Unassigned</span>
                        ) : (
                          delivery.agent
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(delivery.status)}>{delivery.status}</Badge>
                      </TableCell>
                      <TableCell>{delivery.orderId}</TableCell>
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
        <TabsContent value="pickups" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pickups</CardTitle>
              <CardDescription>All scheduled laundry pickups</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure for pickups */}
              <div className="text-center py-8 text-muted-foreground">Filtered pickups would appear here</div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="deliveries" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Deliveries</CardTitle>
              <CardDescription>All scheduled laundry deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure for deliveries */}
              <div className="text-center py-8 text-muted-foreground">Filtered deliveries would appear here</div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="unassigned" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Unassigned</CardTitle>
              <CardDescription>Pickups and deliveries that need agent assignment</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure for unassigned */}
              <div className="text-center py-8 text-muted-foreground">
                Filtered unassigned pickups/deliveries would appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
