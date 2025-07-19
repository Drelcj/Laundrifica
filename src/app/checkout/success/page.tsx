"use client";

import Link from "next/link";
import { ShoppingBag, Package } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          What would you like to do next?
        </h1>
        <p className="text-muted-foreground text-lg">
          Continue your shopping experience or place another order
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {/* Shop Card */}
        <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <ShoppingBag className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-xl">Browse Products</CardTitle>
            <CardDescription>
              Explore our premium collection of laundry care products and unique thrift finds
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button asChild className="w-full" size="lg">
              <Link href="/shop">
                Go to Shop
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Order Card */}
        <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
              <Package className="h-8 w-8 text-secondary" />
            </div>
            <CardTitle className="text-xl">Place Another Laundry Order</CardTitle>
            <CardDescription>
              Need more laundry services? Start a new standard tier order right away
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button asChild className="w-full" size="lg" variant="secondary">
              <Link href="/order?tier=standard">
                New Order
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          Need help? <Link href="/contact" className="text-primary hover:underline">Contact our support team</Link>
        </p>
      </div>
    </div>
  );
}
