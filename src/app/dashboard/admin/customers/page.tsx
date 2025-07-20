import type { Metadata } from "next"
import { FilterIcon, SearchIcon, UserPlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Customer Management | LaundryLab Admin",
  description: "Manage all customers and their information",
}

// Mock data for customers
const customers = [
  {
    id: "CUST-1001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+234 801 234 5678",
    membership: "Premium",
    orders: 24,
    totalSpent: "₦245,800",
    lastOrder: "2023-05-15",
  },
  {
    id: "CUST-1002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+234 802 345 6789",
    membership: "Standard",
    orders: 8,
    totalSpent: "₦78,500",
    lastOrder: "2023-05-12",
  },
  {
    id: "CUST-1003",
    name: "Michael Obi",
    email: "michael.o@example.com",
    phone: "+234 803 456 7890",
    membership: "Premium",
    orders: 32,
    totalSpent: "₦356,200",
    lastOrder: "2023-05-18",
  },
  {
    id: "CUST-1004",
    name: "Amina Yusuf",
    email: "amina.y@example.com",
    phone: "+234 804 567 8901",
    membership: "Standard",
    orders: 5,
    totalSpent: "₦42,300",
    lastOrder: "2023-05-10",
  },
  {
    id: "CUST-1005",
    name: "David Adeleke",
    email: "david.a@example.com",
    phone: "+234 805 678 9012",
    membership: "Premium",
    orders: 18,
    totalSpent: "₦198,750",
    lastOrder: "2023-05-16",
  },
]

export default function CustomersPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Customer Management</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FilterIcon className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <UserPlusIcon className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search customers by name, email, or phone..." className="pl-8" />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Customers</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
          <TabsTrigger value="standard">Standard</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Customers</CardTitle>
              <CardDescription>Showing {customers.length} customers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Membership</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Last Order</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            customer.membership === "Premium"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                          }
                        >
                          {customer.membership}
                        </Badge>
                      </TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>{customer.totalSpent}</TableCell>
                      <TableCell>{customer.lastOrder}</TableCell>
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
        <TabsContent value="premium" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Premium Customers</CardTitle>
              <CardDescription>Customers with premium membership</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure for premium customers */}
              <div className="text-center py-8 text-muted-foreground">Filtered premium customers would appear here</div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="standard" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Standard Customers</CardTitle>
              <CardDescription>Customers with standard membership</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure for standard customers */}
              <div className="text-center py-8 text-muted-foreground">
                Filtered standard customers would appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inactive" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Inactive Customers</CardTitle>
              <CardDescription>Customers who haven't placed an order in the last 3 months</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure for inactive customers */}
              <div className="text-center py-8 text-muted-foreground">
                Filtered inactive customers would appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
