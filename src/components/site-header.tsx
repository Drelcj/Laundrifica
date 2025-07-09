// src/components/site-header.tsx
"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingCart, User as UserIcon } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import type { Profile, User } from '@/types/app'

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
              <span className="text-xs text-muted-foreground leading-none">your effortless pristine fabric care</span>
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

          {/* --- CORRECTED LOGIC --- */}
          {/* This container hides the user menu/login button on mobile, as the sheet will handle it */}
          <div className="hidden md:block">
            {/* The condition is now just 'user'. We only need to know if a session exists. */}
            {user ? (
              <UserNav user={user} profile={profile} />
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link href="/login">
                  <UserIcon className="h-5 w-5" />
                  <span className="sr-only">Login</span>
                </Link>
              </Button>
            )}
          </div>
          
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle mobile menu</span>
              </Button>
            </SheetTrigger>
            <MobileNav setIsOpen={setIsMobileNavOpen} user={user} />
          </Sheet>
        </div>
      </div>
    </header>
  )
}