// src/components/mobile-nav.tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import type { User } from "@/types/app"
import { createClient } from "@/utils/supabase/client"

// This can remain the same
const mainNavItems = [
  { title: "Home", href: "/" },
  { title: "Services", href: "/services" },
  { title: "Pricing", href: "/pricing" },
  { title: "Shop", href: "/shop" },
  { title: "Blog", href: "/blog" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
]

type MobileNavProps = {
  setIsOpen: (isOpen: boolean) => void
  user: User | null // Accept the user object as a prop
}

export function MobileNav({ setIsOpen, user }: MobileNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  
  const handleSignOut = async () => {
    const supabase = createClient()
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        // Optionally, you can use a toast or alert here
        alert("Sign out failed: " + error.message)
        return
      }
      setIsOpen(false) // Close the nav
      router.refresh() // Refresh to update auth state
    } catch (err: any) {
      alert("An unexpected error occurred during sign out.")
    }
  }

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };


  return (
    <SheetContent side="right" className="w-[80%] sm:w-[350px]">
      <SheetHeader>
        <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
      </SheetHeader>

      <div className="flex flex-col space-y-4 mt-4">
        {/* Logo and Title */}
        <Link href="/" className="flex items-center space-x-2 mb-6" onClick={() => setIsOpen(false)}>
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-none">Laundrifica</span>
            <span className="text-xs text-muted-foreground leading-none">Your fabric's pristine care</span>
          </div>
        </Link>
        
        {/* Navigation links */}
        <nav className="flex flex-col gap-4">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-foreground/60 px-2 py-1 rounded-md transition-colors hover:text-foreground hover:bg-accent",
                pathname === item.href ? "text-foreground font-medium bg-muted" : ""
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </Link>
          ))}
          {/* CONDITIONAL AUTH BUTTONS */}
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
            {user ? (
              <>
                <Button asChild variant="secondary" size="sm" className="w-full">
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>My Dashboard</Link>
                </Button>
                <Button onClick={handleSignOut} variant="outline" size="sm" className="w-full">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
                </Button>
                <Button asChild size="sm" className="w-full">
                  <Link href="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </SheetContent>
  )
}