import type { Metadata } from "next"
import { EditIcon, EyeIcon, FilterIcon, PlusIcon, SearchIcon, TrashIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Product Management | Laundrify Admin",
  description: "Manage all e-commerce products",
}

// Mock data for products
const products = [
  {
    id: "PROD-001",
    name: "Premium Laundry Detergent",
    category: "Detergents",
    price: "₦4,500",
    stock: 45,
    status: "In Stock",
    sales: 128,
  },
  {
    id: "PROD-002",
    name: "Fabric Softener (1L)",
    category: "Fabric Care",
    price: "₦3,200",
    stock: 32,
    status: "In Stock",
    sales: 95,
  },
  {
    id: "PROD-003",
    name: "Stain Remover Spray",
    category: "Stain Removers",
    price: "₦2,800",
    stock: 0,
    status: "Out of Stock",
    sales: 210,
  },
  {
    id: "PROD-004",
    name: "Eco-Friendly Laundry Pods (30 pack)",
    category: "Detergents",
    price: "₦6,500",
    stock: 18,
    status: "Low Stock",
    sales: 76,
  },
  {
    id: "PROD-005",
    name: "Delicates Wash Bag",
    category: "Accessories",
    price: "₦1,800",
    stock: 65,
    status: "In Stock",
    sales: 142,
  },
]

// Helper function to get status badge color
function getStatusColor(status: string) {
  switch (status) {
    case "In Stock":
      return "bg-green-100 text-green-800"
    case "Low Stock":
      return "bg-yellow-100 text-yellow-800"
    case "Out of Stock":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ProductsPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Product Management</h2>
        <div className="flex items-center gap-2">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search products by name or category..." className="pl-8" />
        </div>
        <Button variant="outline" size="sm">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="in-stock">In Stock</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
          <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Products</CardTitle>
              <CardDescription>Showing {products.length} products in the shop</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                      </TableCell>
                      <TableCell>{product.sales}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <EditIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="in-stock" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>In Stock Products</CardTitle>
              <CardDescription>Products currently available for purchase</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure for in-stock products */}
              <div className="text-center py-8 text-muted-foreground">Filtered in-stock products would appear here</div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="low-stock" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Low Stock Products</CardTitle>
              <CardDescription>Products that are running low on stock</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure for low-stock products */}
              <div className="text-center py-8 text-muted-foreground">
                Filtered low-stock products would appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="out-of-stock" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Out of Stock Products</CardTitle>
              <CardDescription>Products that are currently out of stock</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure for out-of-stock products */}
              <div className="text-center py-8 text-muted-foreground">
                Filtered out-of-stock products would appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
