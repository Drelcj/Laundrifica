"use client"

import { useState } from "react"
import { PlusCircle, Trash2, Edit, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock voucher data
const initialVouchers = [
  {
    id: "V001",
    code: "WELCOME20",
    discount: "20%",
    type: "percentage",
    minOrder: "₦5,000",
    maxDiscount: "₦2,000",
    usageLimit: 1000,
    usageCount: 450,
    startDate: "2023-05-01",
    endDate: "2023-06-30",
    status: "active",
  },
  {
    id: "V002",
    code: "FREESHIP",
    discount: "₦1,500",
    type: "fixed",
    minOrder: "₦10,000",
    maxDiscount: "₦1,500",
    usageLimit: 500,
    usageCount: 320,
    startDate: "2023-05-15",
    endDate: "2023-06-15",
    status: "active",
  },
  {
    id: "V003",
    code: "SUMMER25",
    discount: "25%",
    type: "percentage",
    minOrder: "₦7,500",
    maxDiscount: "₦3,000",
    usageLimit: 800,
    usageCount: 800,
    startDate: "2023-04-01",
    endDate: "2023-05-31",
    status: "expired",
  },
  {
    id: "V004",
    code: "NEWUSER15",
    discount: "15%",
    type: "percentage",
    minOrder: "₦3,000",
    maxDiscount: "₦1,500",
    usageLimit: 2000,
    usageCount: 1245,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    status: "active",
  },
  {
    id: "V005",
    code: "FLASH500",
    discount: "₦500",
    type: "fixed",
    minOrder: "₦2,500",
    maxDiscount: "₦500",
    usageLimit: 300,
    usageCount: 300,
    startDate: "2023-05-10",
    endDate: "2023-05-12",
    status: "expired",
  },
]

export default function VoucherPage() {
  const [vouchers, setVouchers] = useState(initialVouchers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newVoucher, setNewVoucher] = useState({
    code: "",
    discount: "",
    type: "percentage",
    minOrder: "",
    maxDiscount: "",
    usageLimit: 0,
    startDate: "",
    endDate: "",
  })

  const filteredVouchers = vouchers.filter(
    (voucher) =>
      voucher.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voucher.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddVoucher = () => {
    const voucherId = `V${String(vouchers.length + 1).padStart(3, "0")}`
    const status = new Date(newVoucher.endDate) > new Date() ? "active" : "expired"

    setVouchers([
      ...vouchers,
      {
        ...newVoucher,
        id: voucherId,
        usageCount: 0,
        status,
      },
    ])

    setIsAddDialogOpen(false)
    setNewVoucher({
      code: "",
      discount: "",
      type: "percentage",
      minOrder: "",
      maxDiscount: "",
      usageLimit: 0,
      startDate: "",
      endDate: "",
    })
  }

  const handleDeleteVoucher = (id: string) => {
    setVouchers(vouchers.filter((voucher) => voucher.id !== id))
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Voucher Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Voucher
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create New Voucher</DialogTitle>
              <DialogDescription>Enter the details for the new voucher code.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Voucher Code</Label>
                  <Input
                    id="code"
                    value={newVoucher.code}
                    onChange={(e) => setNewVoucher({ ...newVoucher, code: e.target.value })}
                    placeholder="e.g. SUMMER20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Discount Type</Label>
                  <Select
                    value={newVoucher.type}
                    onValueChange={(value) => setNewVoucher({ ...newVoucher, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount Value</Label>
                  <Input
                    id="discount"
                    value={newVoucher.discount}
                    onChange={(e) => setNewVoucher({ ...newVoucher, discount: e.target.value })}
                    placeholder={newVoucher.type === "percentage" ? "e.g. 20%" : "e.g. ₦1000"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minOrder">Minimum Order</Label>
                  <Input
                    id="minOrder"
                    value={newVoucher.minOrder}
                    onChange={(e) => setNewVoucher({ ...newVoucher, minOrder: e.target.value })}
                    placeholder="e.g. ₦5000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxDiscount">Maximum Discount</Label>
                  <Input
                    id="maxDiscount"
                    value={newVoucher.maxDiscount}
                    onChange={(e) => setNewVoucher({ ...newVoucher, maxDiscount: e.target.value })}
                    placeholder="e.g. ₦2000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usageLimit">Usage Limit</Label>
                  <Input
                    id="usageLimit"
                    type="number"
                    value={newVoucher.usageLimit.toString()}
                    onChange={(e) => setNewVoucher({ ...newVoucher, usageLimit: Number.parseInt(e.target.value) })}
                    placeholder="e.g. 1000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newVoucher.startDate}
                    onChange={(e) => setNewVoucher({ ...newVoucher, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newVoucher.endDate}
                    onChange={(e) => setNewVoucher({ ...newVoucher, endDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddVoucher}>Create Voucher</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vouchers</CardTitle>
          <CardDescription>Manage discount vouchers and promotional codes.</CardDescription>
          <div className="flex items-center mt-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search vouchers..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] ml-4">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Min Order</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Validity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVouchers.map((voucher) => (
                <TableRow key={voucher.id}>
                  <TableCell className="font-medium">{voucher.id}</TableCell>
                  <TableCell className="font-medium">{voucher.code}</TableCell>
                  <TableCell>{voucher.discount}</TableCell>
                  <TableCell>{voucher.minOrder}</TableCell>
                  <TableCell>
                    {voucher.usageCount}/{voucher.usageLimit}
                  </TableCell>
                  <TableCell>
                    {voucher.startDate} to {voucher.endDate}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={voucher.status === "active" ? "default" : "secondary"}
                      className={
                        voucher.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }
                    >
                      {voucher.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteVoucher(voucher.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
