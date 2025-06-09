"use client"

import { useState } from "react"
import { PlusCircle, AlertTriangle, Package, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { InventoryTable } from "@/components/inventory/inventory-table"
import { InventoryForm } from "@/components/inventory/inventory-form"
import { getInventory, updateInventoryItem } from "@/src/lib/api"
import type { InventoryItem } from "@/src/lib/types"

export default function InventoryPageClient() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Load inventory data
  useState(() => {
    async function loadInventory() {
      try {
        const data = await getInventory()
        setInventory(data)
      } catch (error) {
        console.error("Error loading inventory:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadInventory()
  })

  // Calculate inventory metrics
  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0)
  const lowStockItems = inventory.filter((item) => item.quantity <= item.threshold)
  const totalValue = inventory.reduce((sum, item) => sum + item.quantity * item.cost, 0)

  const handleAddItem = async (data: Partial<InventoryItem>) => {
    try {
      // In a real app, this would call an API to create a new inventory item
      const newItem: InventoryItem = {
        id: `inv-${inventory.length + 1}`,
        name: data.name || "",
        category: data.category || "",
        quantity: data.quantity || 0,
        unit: data.unit || "Units",
        threshold: data.threshold || 10,
        supplier: data.supplier || "",
        cost: data.cost || 0,
        location: data.location || "",
        lastRestocked: new Date().toISOString().split("T")[0],
      }

      setInventory([...inventory, newItem])
      setIsAddDialogOpen(false)
    } catch (error) {
      console.error("Error adding inventory item:", error)
    }
  }

  const handleUpdateItem = async (id: string, data: Partial<InventoryItem>) => {
    try {
      // In a real app, this would call an API to update the inventory item
      const updatedItem = await updateInventoryItem(id, data)

      if (updatedItem) {
        setInventory(inventory.map((item) => (item.id === id ? { ...item, ...data } : item)))
      }
    } catch (error) {
      console.error("Error updating inventory item:", error)
    }
  }

  const handleDeleteItem = (id: string) => {
    // In a real app, this would call an API to delete the inventory item
    setInventory(inventory.filter((item) => item.id !== id))
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Inventory Item</DialogTitle>
              <DialogDescription>Add a new item to your inventory.</DialogDescription>
            </DialogHeader>
            <InventoryForm onSubmit={handleAddItem} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">Across {inventory.length} unique products</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems.length}</div>
            <p className="text-xs text-muted-foreground">Items below threshold</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Based on cost price</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
          <TabsTrigger value="cleaning">Cleaning Supplies</TabsTrigger>
          <TabsTrigger value="packaging">Packaging</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <InventoryTable items={inventory} onUpdate={handleUpdateItem} onDelete={handleDeleteItem} />
        </TabsContent>
        <TabsContent value="low-stock" className="mt-6">
          <InventoryTable items={lowStockItems} onUpdate={handleUpdateItem} onDelete={handleDeleteItem} />
        </TabsContent>
        <TabsContent value="cleaning" className="mt-6">
          <InventoryTable
            items={inventory.filter((item) => item.category === "Cleaning Supplies")}
            onUpdate={handleUpdateItem}
            onDelete={handleDeleteItem}
          />
        </TabsContent>
        <TabsContent value="packaging" className="mt-6">
          <InventoryTable
            items={inventory.filter((item) => item.category === "Packaging")}
            onUpdate={handleUpdateItem}
            onDelete={handleDeleteItem}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
