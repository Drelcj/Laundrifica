"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface AgentNavProps extends React.HTMLAttributes<HTMLElement> {}

export function AgentNav({ className, ...props }: AgentNavProps) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard/agent",
      icon: LayoutDashboard,
      title: "Dashboard",
    },
    {
      href: "/dashboard/agent/orders",
      icon: Package,
      title: "My Orders",
    },
    {
      href: `/dashboard/agent/place-order`,
      icon: ShoppingCart,
      title: "Place Order",
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
