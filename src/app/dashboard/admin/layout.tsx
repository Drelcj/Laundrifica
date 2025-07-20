
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
import { createClient } from '@/utils/supabase/server';




export const metadata: Metadata = {
  title: "Admin Dashboard | LaundryLab",
  description: "Manage your laundry business",
}

interface AdminLayoutProps {
  children: React.ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = user 
    ? await supabase.from('profiles').select('*').eq('id', user.id).single() 
    : { data: null };

  return (
    <div className="flex flex-col min-h-screen"> {/* Adjust layout for mobile */}
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6"> {/* Adjust padding */}
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
                <Link href="/dashboard/admin" className="flex items-center gap-2 font-semibold">
                  <span className="gradient-text text-lg md:text-xl">LaundryLab Admin</span> {/* Adjust text size */}
                </Link>
                <AdminNav className="mt-4" />
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/admin" className="flex items-center gap-2 font-semibold">
            <span className="gradient-text text-lg md:text-xl hidden md:inline-flex">LaundryLab Admin</span> {/* Adjust text size */}
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-4">
          {user && (
            <UserAccountNav
              user={{
                name: profile?.full_name || user.email || "Unknown User",
                email: user.email || "unknown@example.com",
                image: profile?.avatar_url || "/default-avatar.png"
              }}
            />
          )}
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
        <main className="flex-1 p-4 md:p-6"> {/* Adjust padding */}
          <Suspense fallback={<Skeleton />}>{children}</Suspense>
        </main>
      </div>
    </div>
  )
}
