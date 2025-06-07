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
      href: "/dashboard/admin",
      icon: LayoutDashboard,
      title: "Dashboard",
    },
    {
      href: "/dashboard/admin/orders",
      icon: Package,
      title: "Orders",
    },
    {
      href: "/dashboard/admin/customers",
      icon: Users,
      title: "Customers",
    },
    {
      href: "/dashboard/admin/staff",
      icon: Users,
      title: "Staff",
    },
    {
      href: "/dashboard/admin/delivery",
      icon: Truck,
      title: "Delivery",
    },
    {
      href: "/dashboard/admin/inventory",
      icon: Box,
      title: "Inventory",
    },
    {
      href: "/dashboard/admin/blog",
      icon: FileText,
      title: "Blog",
    },
    {
      href: "/dashboard/admin/products",
      icon: ShoppingBag,
      title: "Products",
    },
    {
      href: "/dashboard/admin/voucher",
      icon: Gift,
      title: "Voucher",
    },
    {
      href: "/dashboard/admin/vouchers",
      icon: Gift,
      title: "Vouchers",
    },
    {
      href: "/dashboard/admin/analytics",
      icon: BarChart3,
      title: "Analytics",
    },
    {
      href: "/dashboard/admin/marketing",
      icon: Tag,
      title: "Marketing",
    },
    {
      href: "/dashboard/admin/reports",
      icon: FileText,
      title: "Reports",
    },
    {
      href: "/dashboard/admin/locations",
      icon: MapPin,
      title: "Locations",
    },
    {
      href: "/dashboard/admin/settings",
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
