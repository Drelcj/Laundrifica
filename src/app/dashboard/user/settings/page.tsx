// src/app/dashboard/user/settings/page.tsx

import type { Metadata } from "next"
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { redirect } from 'next/navigation'
import { Database } from '@/types/database'
import SettingsClientPage from "./SettingsClientPage" // Your client component

export const metadata: Metadata = {
  title: "Account Settings | Laundrifica Dashboard",
  description: "Manage your account settings and preferences",
}

// This page is now an async Server Component
export default async function SettingsPage() {
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
  );

  const { data: { user } } = await supabase.auth.getUser();
  
  // If no user, redirect to login. This is a security measure.
  if (!user) {
    redirect('/login');
  }

  // Fetch the user's profile from the 'profiles' table
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error("Error fetching profile for settings page:", error);
    // You could redirect or show an error message here
  }
  
  // Pass the fetched profile down to the client component
  return <SettingsClientPage profile={profile} />;
}