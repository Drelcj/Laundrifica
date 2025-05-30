import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Cart, CartItem } from "./types"

interface CartState {
  cart: Cart
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  calculateTotals: () => void
}

// Initial cart state
const initialCart: Cart = {
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: initialCart,

      addItem: (item: CartItem) => {
        const { cart } = get()
        const existingItemIndex = cart.items.findIndex((i) => i.id === item.id)

        let updatedItems: CartItem[]

        if (existingItemIndex >= 0) {
          // Item exists, update quantity
          updatedItems = [...cart.items]
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + item.quantity,
          }
        } else {
          // New item, add to cart
          updatedItems = [...cart.items, item]
        }

        set({ cart: { ...cart, items: updatedItems } })
        get().calculateTotals()
      },

      removeItem: (itemId: string) => {
        const { cart } = get()
        const updatedItems = cart.items.filter((item) => item.id !== itemId)
        set({ cart: { ...cart, items: updatedItems } })
        get().calculateTotals()
      },

      updateQuantity: (itemId: string, quantity: number) => {
        const { cart } = get()
        const updatedItems = cart.items.map((item) => (item.id === itemId ? { ...item, quantity } : item))
        set({ cart: { ...cart, items: updatedItems } })
        get().calculateTotals()
      },

      clearCart: () => {
        set({ cart: initialCart })
      },

      calculateTotals: () => {
        const { cart } = get()
        const subtotal = cart.items.reduce((total, item) => total + item.price * item.quantity, 0)

        // Calculate tax (7.5% VAT in Nigeria)
        const tax = subtotal * 0.075

        // Calculate shipping (base rate of ₦1500 + ₦100 per item beyond the first)
        const itemCount = cart.items.reduce((count, item) => count + item.quantity, 0)
        const shipping = itemCount > 0 ? 1500 + Math.max(0, itemCount - 1) * 100 : 0

        // Calculate total
        const total = subtotal + tax + shipping

        set({
          cart: {
            ...cart,
            subtotal,
            tax,
            shipping,
            total,
          },
        })
      },
    }),
    {
      name: "laundrify-cart",
    },
  ),
)
