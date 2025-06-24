"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  CreditCard,
  FileText,
  Gift,
  Home,
  MapPin,
  Package,
  Settings,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DashboardNavProps extends React.HTMLAttributes<HTMLElement> {}

export function DashboardNav({ className, ...props }: DashboardNavProps) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard/user",
      icon: Home,
      title: "Overview",
    },
    {
      href: "/dashboard//user/orders",
      icon: Package,
      title: "Orders",
    },
    {
      href: "/dashboard/user/upcoming",
      icon: Truck,
      title: "Upcoming",
    },
    {
      href: "/dashboard/user/membership",
      icon: Star,
      title: "Membership",
    },
    {
      href: "/dashboard/user/rewards",
      icon: Gift,
      title: "Rewards",
    },
    {
      href: "/dashboard/user/payment-methods",
      icon: CreditCard,
      title: "Payment Methods",
    },
    {
      href: "/dashboard/user/addresses",
      icon: MapPin,
      title: "Addresses",
    },
    {
      href: "/dashboard/user/notifications",
      icon: Bell,
      title: "Notifications",
    },
    {
      href: "/dashboard/user/vouchers",
      icon: ShoppingBag,
      title: "Vouchers",
    },
    {
      href: "/dashboard/user/invoices",
      icon: FileText,
      title: "Invoices",
    },
    {
      href: "/dashboard/user/settings",
      icon: Settings,
      title: "Settings",
    },
  ]

  return (
    <nav className={cn("h-full flex flex-col space-y-1", className)} {...props}>
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
