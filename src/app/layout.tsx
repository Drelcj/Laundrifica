// src/app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/next"
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/database'

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Laundrifica - Your fabric's pristine care",
  description:
    "Premium laundry services with pickup and delivery. Experience the convenience of professional fabric care with Laundrifica.",
  keywords: ["laundry", "247 digital laundry", "Laundry in Choba", "Choba", "Uniport Laundry", "Port Harcourt", "dry cleaning", "free pickup", "free delivery", "fabric care", "pickup delivery", "Lagos", "Nigeria"],
  openGraph: {
    title: "Laundrifica - Your fabric's pristine care",
    description: "Premium laundry services with pickup and delivery",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laundrifica - Your fabric's pristine care",
    description: "Premium laundry services with pickup and delivery",
  }}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // --- ADDED THIS LOGIC TO FETCH THE USER ---
  const cookieStore = await cookies();
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
  const { data: { session } } = await supabase.auth.getSession()
  const user = session?.user

  // Fetch profile only if a user is logged in, with error handling
  let profile = null;
  if (user) {
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (error) {
        console.error('Error fetching profile:', error.message);
      }
      profile = data;
    } catch (err) {
      console.error('Unexpected error fetching profile:', err);
    }
  }
  // --- END OF ADDED LOGIC ---
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link
          rel="preload"
          href="/_next/static/media/inter-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader user={user ?? null} profile={profile} />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
