// src/components/site-header.tsx
"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingCart, User as UserIcon } from "lucide-react" // Renamed User to UserIcon to avoid conflict
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav" // Import our new UserNav
import type { Profile, User } from '@/types/app' // Import our shared types

// Define the props the SiteHeader will accept
type SiteHeaderProps = {
  user: User | null;
  profile: Profile | null;
};

export function SiteHeader({ user, profile }: SiteHeaderProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

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

        <div className="hidden md:flex">
          <MainNav />
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping cart</span>
            </Link>
          </Button>

          {/* --- THIS IS THE CONDITIONAL LOGIC --- */}
          {user && profile ? (
            <UserNav user={user} profile={profile} />
          ) : (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/login">
                <UserIcon className="h-5 w-5" />
                <span className="sr-only">Login</span>
              </Link>
            </Button>
          )}
          {/* --- END OF CONDITIONAL LOGIC --- */}
          
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle mobile menu</span>
              </Button>
            </SheetTrigger>
            {/* Pass user data to the mobile nav as well */}
            <MobileNav setIsOpen={setIsMobileNavOpen} user={user} />
          </Sheet>
        </div>
      </div>
    </header>
  )
}