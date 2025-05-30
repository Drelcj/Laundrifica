import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { AdminNav } from "@/components/admin/admin-nav"
import { UserAccountNav } from "@/components/dashboard/user-account-nav"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Suspense } from "react"
import { Skeleton } from "@/components/loading-skeleton"

export const metadata: Metadata = {
  title: "Admin Dashboard | Laundrify",
  description: "Manage your laundry business",
}

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  // Mock admin user data - would come from authentication in a real app
  const user = {
    name: "Admin User",
    email: "admin@laundrify.com",
    image: "/placeholder.svg?height=32&width=32",
  }

  return (
    <div className="flex min-h-screen">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <ScrollArea className="h-[calc(100vh-3rem)] pb-10">
              <div className="px-2 py-2">
                <Link href="/admin" className="flex items-center gap-2 font-semibold">
                  <span className="gradient-text text-xl">Laundrify Admin</span>
                </Link>
                <AdminNav className="mt-4" />
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <span className="gradient-text text-xl hidden md:inline-flex">Laundrify Admin</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <UserAccountNav user={user} />
        </div>
      </header>
      <div className="flex-1 md:grid md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r md:block">
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="flex flex-col gap-4 py-4">
              <AdminNav className="px-4" />
            </div>
          </ScrollArea>
        </aside>
        <main className="flex-1 p-6">
          <Suspense fallback={<Skeleton />}>{children}</Suspense>
        </main>
      </div>
    </div>
  )
}
