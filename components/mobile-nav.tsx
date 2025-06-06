// components/mobile-nav.tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet" // Only import what's needed for content
import { cn } from "@/lib/utils"

const mainNavItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Shop",
    href: "/shop",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
]

type MobileNavProps = {
  setIsOpen: (isOpen: boolean) => void // Prop to close the sheet
}

export function MobileNav({ setIsOpen }: MobileNavProps) {
  const pathname = usePathname()

  return (
    <SheetContent side="right" className="w-[80%] sm:w-[350px]">
      {/* Required for accessibility */}
      <SheetHeader>
        <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
      </SheetHeader>

      <div className="flex flex-col space-y-4 mt-4">
        {/* Logo and Title inside the mobile sheet, optional but good UX */}
        <Link href="/" className="flex items-center space-x-2 mb-6" onClick={() => setIsOpen(false)}>
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-none">Laundrifica</span>
            <span className="text-xs text-muted-foreground leading-none">Your fabric's pristine care</span>
          </div>
        </Link>

        <nav className="flex flex-col gap-4">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-foreground/60 transition-colors hover:text-foreground px-2 py-1 rounded-md hover:bg-muted",
                pathname === item.href
                  ? "text-foreground font-medium bg-muted"
                  : "",
              )}
              onClick={() => setIsOpen(false)} // Close sheet when a link is clicked
            >
              {item.title}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
            </Button>
            <Button asChild size="sm" className="w-full">
              <Link href="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="w-full"
            >
              <Link href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
            </Button>
          </div>
        </nav>
      </div>
    </SheetContent>
  )
}