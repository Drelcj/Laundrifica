import type { Metadata } from "next"
import { FilterIcon, SearchIcon, UserPlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export const metadata: Metadata = {
  title: "Staff Management | Laundrify Admin",
  description: "Manage all staff members and their assignments",
}

// Mock data for staff
const staff = [
  {
    id: "STAFF-001",
    name: "Oluwaseun Adebayo",
    role: "Delivery Agent",
    email: "seun.a@laundrify.ng",
    phone: "+234 801 234 5678",
    location: "Lekki",
    status: "Active",
    assignedOrders: 5,
    joinDate: "2022-03-15",
  },
  {
    id: "STAFF-002",
    name: "Chioma Okafor",
    role: "Laundry Processor",
    email: "chioma.o@laundrify.ng",
    phone: "+234 802 345 6789",
    location: "Ikeja",
    status: "Active",
    assignedOrders: 0,
    joinDate: "2022-05-22",
  },
  {
    id: "STAFF-003",
    name: "Emeka Eze",
    role: "Delivery Agent",
    email: "emeka.e@laundrify.ng",
    phone: "+234 803 456 7890",
    location: "Victoria Island",
    status: "On Leave",
    assignedOrders: 0,
    joinDate: "2022-01-10",
  },
  {
    id: "STAFF-004",
    name: "Fatima Ibrahim",
    role: "Customer Service",
    email: "fatima.i@laundrify.ng",
    phone: "+234 804 567 8901",
    location: "Ikeja",
    status: "Active",
    assignedOrders: 0,
    joinDate: "2022-08-05",
  },
  {
    id: "STAFF-005",
    name: "Tunde Bakare",
    role: "Delivery Agent",
    email: "tunde.b@laundrify.ng",
    phone: "+234 805 678 9012",
    location: "Surulere",
    status: "Active",
    assignedOrders: 3,
    joinDate: "2022-06-18",
  },
]

// Helper function to get status badge color
function getStatusColor(status: string) {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800"
    case "On Leave":
      return "bg-yellow-100 text-yellow-800"
    case "Inactive":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// Helper function to get role badge color
function getRoleColor(role: string) {
  switch (role) {
    case "Delivery Agent":
      return "bg-blue-100 text-blue-800"
    case "Laundry Processor":
      return "bg-purple-100 text-purple-800"
    case "Customer Service":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function StaffPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Staff Management</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FilterIcon className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <UserPlusIcon className="mr-2 h-4 w-4" />
            Add Staff
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search staff by name, role, or location..." className="pl-8" />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Staff</TabsTrigger>
          <TabsTrigger value="delivery">Delivery Agents</TabsTrigger>
          <TabsTrigger value="processing">Laundry Processors</TabsTrigger>
          <TabsTrigger value="customer-service">Customer Service</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Staff Members</CardTitle>
              <CardDescription>Showing {staff.length} staff members</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned Orders</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {member.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRoleColor(member.role)}>{member.role}</Badge>
                      </TableCell>
                      <TableCell>{member.location}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                      </TableCell>
                      <TableCell>{member.assignedOrders}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{member.email}</div>
                          <div className="text-muted-foreground">{member.phone}</div>
                        </div>
                      </TableCell>
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
        <TabsContent value="delivery" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Agents</CardTitle>
              <CardDescription>Staff members responsible for pickups and deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure for delivery agents */}
              <div className="text-center py-8 text-muted-foreground">Filtered delivery agents would appear here</div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="processing" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Laundry Processors</CardTitle>
              <CardDescription>Staff members responsible for cleaning and processing</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure for laundry processors */}
              <div className="text-center py-8 text-muted-foreground">
                Filtered laundry processors would appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="customer-service" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Service</CardTitle>
              <CardDescription>Staff members handling customer inquiries and support</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure for customer service staff */}
              <div className="text-center py-8 text-muted-foreground">
                Filtered customer service staff would appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
