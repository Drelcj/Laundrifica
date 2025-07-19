// src/components/cart/cart-item.tsx
"use client"

import type React from "react"
import Image from "next/image"
import { Trash2Icon, MinusIcon, PlusIcon } from "lucide-react"
import type { CartItem } from "@/lib/types"
import { useCartStore } from "@/lib/cart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CartItemProps {
  item: CartItem
}

export function CartItemComponent({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore()

  // Formatter for Nigerian Naira
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  })

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number.parseInt(e.target.value)
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity)
    }
  }

  const incrementQuantity = () => {
    updateQuantity(item.id, item.quantity + 1)
  }

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1)
    }
  }

  const handleRemove = () => {
    removeItem(item.id)
  }

  return (
    <div className="flex items-center py-4 border-b">
      <div className="flex-shrink-0 mr-4">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          width={80}
          height={80}
          className="rounded-md object-cover"
        />
      </div>

      <div className="flex-grow">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-gray-500">{formatter.format(item.price)}</p>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={decrementQuantity}
          disabled={item.quantity <= 1}
        >
          <MinusIcon className="h-4 w-4" />
        </Button>

        <Input
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="h-8 w-16 text-center"
        />

        <Button variant="outline" size="icon" className="h-8 w-8" onClick={incrementQuantity}>
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="ml-4 text-right">
        <p className="font-medium">{formatter.format(item.price * item.quantity)}</p>
        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 mt-1" onClick={handleRemove}>
          <Trash2Icon className="h-4 w-4 mr-1" />
          <span className="text-xs">Remove</span>
        </Button>
      </div>
    </div>
  )
}