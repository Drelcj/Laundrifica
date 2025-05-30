"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Search, Edit, Trash2, Copy, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"

interface Voucher {
  id: string
  code: string
  name: string
  description: string
  discountType: "percentage" | "fixed"
  discountValue: number
  minimumOrderValue: number
  usageLimit: number
  usedCount: number
  expiryDate: string
  isActive: boolean
  createdAt: string
}

const mockVouchers: Voucher[] = [
  {
    id: "1",
    code: "WELCOME20",
    name: "Welcome Discount",
    description: "20% off for new customers",
    discountType: "percentage",
    discountValue: 20,
    minimumOrderValue: 1000,
    usageLimit: 100,
    usedCount: 45,
    expiryDate: "2024-12-31",
    isActive: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    code: "SAVE500",
    name: "Fixed Discount",
    description: "₦500 off on orders above ₦3000",
    discountType: "fixed",
    discountValue: 500,
    minimumOrderValue: 3000,
    usageLimit: 50,
    usedCount: 12,
    expiryDate: "2024-06-30",
    isActive: true,
    createdAt: "2024-02-01",
  },
  {
    id: "3",
    code: "EXPIRED10",
    name: "Expired Voucher",
    description: "10% off - expired",
    discountType: "percentage",
    discountValue: 10,
    minimumOrderValue: 500,
    usageLimit: 200,
    usedCount: 200,
    expiryDate: "2024-01-31",
    isActive: false,
    createdAt: "2023-12-01",
  },
]

export default function VouchersPage() {
  const [vouchers, setVouchers] = useState<Voucher[]>(mockVouchers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingVoucher, setEditingVoucher] = useState<Voucher | null>(null)
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    discountType: "percentage" as "percentage" | "fixed",
    discountValue: 0,
    minimumOrderValue: 0,
    usageLimit: 0,
    expiryDate: "",
    isActive: true,
  })

  const filteredVouchers = vouchers.filter(
    (voucher) =>
      voucher.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voucher.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingVoucher) {
      // Update existing voucher
      setVouchers(
        vouchers.map((v) =>
          v.id === editingVoucher.id
            ? {
                ...v,
                ...formData,
                id: editingVoucher.id,
                usedCount: editingVoucher.usedCount,
                createdAt: editingVoucher.createdAt,
              }
            : v,
        ),
      )
      toast({
        title: "Voucher Updated",
        description: "The voucher has been successfully updated.",
      })
    } else {
      // Create new voucher
      const newVoucher: Voucher = {
        ...formData,
        id: Date.now().toString(),
        usedCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setVouchers([...vouchers, newVoucher])
      toast({
        title: "Voucher Created",
        description: "The new voucher has been successfully created.",
      })
    }

    // Reset form
    setFormData({
      code: "",
      name: "",
      description: "",
      discountType: "percentage",
      discountValue: 0,
      minimumOrderValue: 0,
      usageLimit: 0,
      expiryDate: "",
      isActive: true,
    })
    setEditingVoucher(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (voucher: Voucher) => {
    setEditingVoucher(voucher)
    setFormData({
      code: voucher.code,
      name: voucher.name,
      description: voucher.description,
      discountType: voucher.discountType,
      discountValue: voucher.discountValue,
      minimumOrderValue: voucher.minimumOrderValue,
      usageLimit: voucher.usageLimit,
      expiryDate: voucher.expiryDate,
      isActive: voucher.isActive,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setVouchers(vouchers.filter((v) => v.id !== id))
    toast({
      title: "Voucher Deleted",
      description: "The voucher has been successfully deleted.",
      variant: "destructive",
    })
  }

  const handleToggleStatus = (id: string) => {
    setVouchers(vouchers.map((v) => (v.id === id ? { ...v, isActive: !v.isActive } : v)))
    toast({
      title: "Status Updated",
      description: "The voucher status has been updated.",
    })
  }

  const copyVoucherCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Code Copied",
      description: `Voucher code "${code}" copied to clipboard.`,
    })
  }

  const getStatusBadge = (voucher: Voucher) => {
    const isExpired = new Date(voucher.expiryDate) < new Date()
    const isUsedUp = voucher.usedCount >= voucher.usageLimit

    if (isExpired) {
      return <Badge variant="destructive">Expired</Badge>
    }
    if (isUsedUp) {
      return <Badge variant="secondary">Used Up</Badge>
    }
    if (!voucher.isActive) {
      return <Badge variant="outline">Inactive</Badge>
    }
    return <Badge variant="default">Active</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Voucher Management</h1>
          <p className="text-muted-foreground">Create and manage discount vouchers for your customers</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingVoucher(null)
                setFormData({
                  code: "",
                  name: "",
                  description: "",
                  discountType: "percentage",
                  discountValue: 0,
                  minimumOrderValue: 0,
                  usageLimit: 0,
                  expiryDate: "",
                  isActive: true,
                })
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Voucher
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingVoucher ? "Edit Voucher" : "Create New Voucher"}</DialogTitle>
              <DialogDescription>
                {editingVoucher
                  ? "Update the voucher details below."
                  : "Fill in the details to create a new discount voucher."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Voucher Code</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="e.g., WELCOME20"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Voucher Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Welcome Discount"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the voucher"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discountType">Discount Type</Label>
                  <Select
                    value={formData.discountType}
                    onValueChange={(value: "percentage" | "fixed") => setFormData({ ...formData, discountType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount (₦)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountValue">
                    Discount Value {formData.discountType === "percentage" ? "(%)" : "(₦)"}
                  </Label>
                  <Input
                    id="discountValue"
                    type="number"
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                    placeholder={formData.discountType === "percentage" ? "20" : "500"}
                    min="0"
                    max={formData.discountType === "percentage" ? "100" : undefined}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minimumOrderValue">Minimum Order Value (₦)</Label>
                  <Input
                    id="minimumOrderValue"
                    type="number"
                    value={formData.minimumOrderValue}
                    onChange={(e) => setFormData({ ...formData, minimumOrderValue: Number(e.target.value) })}
                    placeholder="1000"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usageLimit">Usage Limit</Label>
                  <Input
                    id="usageLimit"
                    type="number"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                    placeholder="100"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="isActive">Status</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    />
                    <Label htmlFor="isActive">{formData.isActive ? "Active" : "Inactive"}</Label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingVoucher ? "Update Voucher" : "Create Voucher"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vouchers Overview</CardTitle>
          <CardDescription>Manage all your discount vouchers in one place</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vouchers by code or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVouchers.map((voucher) => (
                  <TableRow key={voucher.id}>
                    <TableCell className="font-mono">
                      <div className="flex items-center space-x-2">
                        <span>{voucher.code}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyVoucherCode(voucher.code)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{voucher.name}</div>
                        <div className="text-sm text-muted-foreground">{voucher.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {voucher.discountType === "percentage"
                        ? `${voucher.discountValue}%`
                        : `₦${voucher.discountValue}`}
                      {voucher.minimumOrderValue > 0 && (
                        <div className="text-xs text-muted-foreground">Min: ₦{voucher.minimumOrderValue}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {voucher.usedCount} / {voucher.usageLimit}
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{ width: `${Math.min((voucher.usedCount / voucher.usageLimit) * 100, 100)}%` }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>{voucher.expiryDate}</TableCell>
                    <TableCell>{getStatusBadge(voucher)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(voucher.id)}
                          className="h-8 w-8 p-0"
                        >
                          {voucher.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(voucher)} className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(voucher.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredVouchers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No vouchers found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
