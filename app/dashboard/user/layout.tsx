import type React from "react"
import { Suspense } from "react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { UserAccountNav } from "@/components/dashboard/user-account-nav"
import { Skeleton } from "@/components/loading-skeleton"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <div className="flex-1">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center justify-between px-6">
            <h1 className="text-lg font-semibold">Dashboard</h1>
            {/* <UserAccountNav /> */}
          </div>
        </header>
        <main className="p-6">
          <Suspense fallback={<Skeleton />}>{children}</Suspense>
        </main>
      </div>
    </div>
  )
}
