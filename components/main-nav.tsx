// components/main-nav.tsx
"use client" // Keep use client if you need usePathname

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation" // Keep if you use it for active link styling
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

// No 'mobile' prop needed here anymore
export function MainNav() {
  const pathname = usePathname() // Still useful for highlighting the active desktop link

  return (
    <nav className="hidden md:flex items-center gap-6 text-sm">
      {mainNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === item.href
              ? "text-foreground font-medium"
              : "text-foreground/60",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}