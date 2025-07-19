// src/components/cart/cart-summary.tsx
"use client";
import { useRouter } from "next/navigation";
import { ShoppingBagIcon } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export function CartSummary() {
  const router = useRouter();
  const { cart } = useCartStore();
  const { items, subtotal, tax, total } = cart;

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null for loading
  const supabase = createClient();

  // Formatter for Nigerian Naira
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  // Check auth status on mount
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkSession();
  }, [supabase]);

  const handleCheckout = () => {
    if (isAuthenticated === null) {
      // Session is still loading, do nothing
      return;
    }
    if (!isAuthenticated) {
      // User is not logged in, redirect to login with cart as the redirect URL
      router.push("/login?redirect=/cart");
    } else {
      // User is logged in, proceed to checkout
      router.push("/checkout");
    }
  };

  const handleContinueShopping = () => {
    router.push("/products");
  };

  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Cart</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Button onClick={handleContinueShopping}>Continue Shopping</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal ({items.length} items)</span>
            <span>{formatter.format(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>VAT</span>
            <span>{formatter.format(tax)}</span>
          </div>
          <div className="text-sm text-gray-500">
            Choose your preferred shipping method at checkout
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>{formatter.format(total)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button
          className="w-full"
          onClick={handleCheckout}
          disabled={isAuthenticated === null}
        >
          Proceed to Checkout
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </Button>
      </CardFooter>
    </Card>
  );
}
