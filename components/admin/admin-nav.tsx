"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Box,
  FileText,
  Gift,
  LayoutDashboard,
  MapPin,
  Package,
  Settings,
  ShoppingBag,
  Tag,
  Truck,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface AdminNavProps extends React.HTMLAttributes<HTMLElement> {}

export function AdminNav({ className, ...props }: AdminNavProps) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/admin",
      icon: LayoutDashboard,
      title: "Dashboard",
    },
    {
      href: "/admin/orders",
      icon: Package,
      title: "Orders",
    },
    {
      href: "/admin/customers",
      icon: Users,
      title: "Customers",
    },
    {
      href: "/admin/staff",
      icon: Users,
      title: "Staff",
    },
    {
      href: "/admin/delivery",
      icon: Truck,
      title: "Delivery",
    },
    {
      href: "/admin/inventory",
      icon: Box,
      title: "Inventory",
    },
    {
      href: "/admin/blog",
      icon: FileText,
      title: "Blog",
    },
    {
      href: "/admin/products",
      icon: ShoppingBag,
      title: "Products",
    },
    {
      href: "/admin/vouchers",
      icon: Gift,
      title: "Vouchers",
    },
    {
      href: "/admin/analytics",
      icon: BarChart3,
      title: "Analytics",
    },
    {
      href: "/admin/marketing",
      icon: Tag,
      title: "Marketing",
    },
    {
      href: "/admin/locations",
      icon: MapPin,
      title: "Locations",
    },
    {
      href: "/admin/settings",
      icon: Settings,
      title: "Settings",
    },
  ]

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {routes.map((route) => (
        <Button
          key={route.href}
          variant={pathname === route.href ? "secondary" : "ghost"}
          className={cn(
            "justify-start",
            pathname === route.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
          )}
          asChild
        >
          <Link href={route.href}>
            <route.icon className="mr-2 h-4 w-4" />
            {route.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
