// components/site-header.tsx
"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
// Only import Sheet and SheetTrigger here; SheetContent will be in MobileNav
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User, ShoppingCart } from "lucide-react"
import { MainNav } from "@/components/main-nav" // Import the desktop main nav
import { MobileNav } from "@/components/mobile-nav" // Import the new mobile nav component
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false) // State to control the mobile sheet

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none">Laundrifica</span>
              <span className="text-xs text-muted-foreground leading-none">Your fabric's pristine care</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation - Only visible on desktop */}
        <div className="hidden md:flex">
          <MainNav /> {/* Renders the desktop navigation component */}
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping cart</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/login">
              <User className="h-5 w-5" />
              <span className="sr-only">User account</span>
            </Link>
          </Button>

          {/* This is the ONE and ONLY mobile menu trigger and sheet */}
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden"> {/* Only visible on mobile */}
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle mobile menu</span>
              </Button>
            </SheetTrigger>
            {/* The actual content of the mobile sheet is now in MobileNav component */}
            <MobileNav setIsOpen={setIsMobileNavOpen} />
          </Sheet>
        </div>
      </div>
    </header>
  )
}