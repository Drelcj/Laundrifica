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
          Continue to shop or place a laundry order?
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {/* Shop Card */}
        {/* CHANGE 1: Make the card a flex container to allow content to grow */}
        <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 flex flex-col">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <ShoppingBag className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-xl">Browse Products</CardTitle>
            <CardDescription>
              Explore our premium collection of laundry care products and unique thrift finds
            </CardDescription>
          </CardHeader>
          {/*CHANGE 2: Make CardContent grow and align the button to the bottom */}
          <CardContent className="pt-0 flex-grow flex flex-col justify-end">
            <Button asChild className="w-full" size="lg">
              <Link href="/shop">
                Go to Shop
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Order Card */}
        {/*CHANGE 1: Make the card a flex container */}
        <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 flex flex-col">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
              <Package className="h-8 w-8 text-secondary" />
            </div>
            <CardTitle className="text-xl">Place Another Laundry Order</CardTitle>
            <CardDescription>
              Need more laundry services? Start a new standard or premium tier laundry order right away
            </CardDescription>
          </CardHeader>
          {/* CHANGE 2: Make CardContent grow and align buttons to the bottom */}
          <CardContent className="pt-0 flex-grow flex flex-col justify-end">
            {/*CHANGE 3: Wrap buttons in a div to add spacing */}
            <div className="flex flex-col gap-2">
              <Button asChild className="w-full" size="lg" variant="secondary">
                <Link href="/order?tier=standard">
                  New Standard Laundry Order
                </Link>
              </Button>
              <Button asChild className="w-full" size="lg" >
                <Link href="/order?tier=premium">
                  New Premium Laundry Order
                </Link>
              </Button>
            </div>
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