// src/app/dashboard/page.tsx

import { redirect } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '@/types/database'; // Make sure this path is correct

// This page will not render any UI. It's a server-side component
// that acts as a router based on the user's role.

export default async function DashboardPage() {
  // The crucial 'await' is added here to resolve the Promise
  const cookieStore = await cookies();

  // Create a Supabase client for server-side operations
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // Now cookieStore is the resolved object, and .get() will work
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  // 1. Get the current user session
  const { data: { session } } = await supabase.auth.getSession();

  // If no user is logged in, redirect to the login page
  if (!session) {
    return redirect('/login');
  }

  // 2. Get the user's role from the 'profiles' table
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();
    
  // If there's an error fetching the profile or the profile is missing,
  // it's safest to log them out and send to login.
  if (error || !profile) {
    await supabase.auth.signOut();
    return redirect('/login');
  }

  const userRole = profile.role;

  // 3. Redirect based on the user's role
  switch (userRole) {
    case 'admin':
      redirect('/dashboard/admin');
      break;
    case 'delivery_agent':
      redirect('/dashboard/agent');
      break;
    case 'user':
      redirect('/dashboard/user');
      break;
    default:
      // As a fallback, redirect to a generic user page or login
      redirect('/dashboard/user');
      break;
  }

  // This part of the component will never be reached because of the redirects,
  // but returning null is good practice for components that don't render UI.
  return null;
}