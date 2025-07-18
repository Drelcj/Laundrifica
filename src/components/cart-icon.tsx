// src/components/cart-icon.tsx
"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/lib/cart"
import { useEffect, useState } from "react"

export function CartIcon() {
  const { cart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  if (!isMounted) {
    return (
      <Link href="/cart" className="relative inline-flex items-center">
        <ShoppingCart className="h-5 w-5" />
        <span className="sr-only">Shopping cart</span>
      </Link>
    );
  }

  return (
    <Link href="/cart" className="relative inline-flex items-center">
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full text-xs px-1.5 py-0.5 min-w-[1.25rem] text-center">
          {itemCount}
        </span>
      )}
      <span className="sr-only">Shopping cart</span>
    </Link>
  );
}
