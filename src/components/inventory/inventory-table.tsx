"use client"

import { useState } from "react"
import { Edit, Trash2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { InventoryForm } from "@/components/inventory/inventory-form"
import type { InventoryItem } from "@/src/lib/types"

interface InventoryTableProps {
  items: InventoryItem[]
  onUpdate: (id: string, data: Partial<InventoryItem>) => void
  onDelete: (id: string) => void
}

export function InventoryTable({ items, onUpdate, onDelete }: InventoryTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item)
  }

  const handleUpdate = (data: Partial<InventoryItem>) => {
    if (editingItem) {
      onUpdate(editingItem.id, data)
      setEditingItem(null)
    }
  }

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (itemToDelete) {
      onDelete(itemToDelete)
      setIsDeleteDialogOpen(false)
      setItemToDelete(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Input
          placeholder="Search inventory..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  {item.quantity} {item.unit}
                </TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>₦{item.cost.toLocaleString()}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                  {item.quantity <= item.threshold ? (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Low Stock
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      In Stock
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      {editingItem && (
        <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Inventory Item</DialogTitle>
              <DialogDescription>Update the details of this inventory item.</DialogDescription>
            </DialogHeader>
            <InventoryForm initialData={editingItem} onSubmit={handleUpdate} />
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this inventory item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
