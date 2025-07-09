// src/app/dashboard/layout.tsx

import type React from "react"
import { Suspense } from "react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { Skeleton } from "@/components/ui/skeleton" // Corrected import path
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { createClient } from '@/utils/supabase/server';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = user 
    ? await supabase.from('profiles').select('*').eq('id', user.id).single() 
    : { data: null };

  return (
    // On mobile, this will be a single-column layout (default)
    // On medium screens and up (md:), it becomes a two-column grid.
    // The first column is 240px wide for the sidebar.
    // The second column (1fr) takes up the remaining space.
    <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr]">
      
      {/* --- DESKTOP SIDEBAR --- */}
      {/* This sidebar is hidden by default and only appears on medium screens and up */}
      <aside className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          {/* We can add a logo or header for the sidebar here if needed */}
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
             {/* This could be your Laundrifica logo/link */}
          </div>
          <div className="flex-1">
             <DashboardNav />
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT & MOBILE HEADER --- */}
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">

          {/* --- MOBILE SIDEBAR (SHEET) --- */}
          {/* This Sheet component is only visible on mobile (md:hidden) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
                {/* We re-use the DashboardNav component inside the mobile sheet */}
                <DashboardNav />
            </SheetContent>
          </Sheet>

          {/* This is where the header content like the title and UserAccountNav goes */}
          <div className="w-full flex-1">
             {/* You can add breadcrumbs or search here if you want */}
          </div>
          {/* <UserAccountNav user={user} profile={profile} />  This can be re-enabled later */}
        </header>

        {/* The main content area for each page */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Suspense fallback={<Skeleton className="h-[200px] w-full rounded-lg" />}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  )
}