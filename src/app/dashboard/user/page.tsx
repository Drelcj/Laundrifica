// src/app/dashboard/user/page.tsx

import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { redirect } from 'next/navigation'
import { Database } from '@/types/database'
import { OverviewClient } from './overview-client' // Import the client component

export default async function UserDashboardPage() {
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
    
    if (!user) {
      redirect('/login');
    }
  
    // --- FETCH REAL DATA FROM SUPABASE ---

    // 1. Fetch the user's profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    // 2. Fetch the count of active orders
    const { count: activeOrderCount } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true }) // 'head: true' makes it faster
      .eq('user_id', user.id)
      .in('status', ['pending_pickup', 'processing', 'out_for_delivery']);


    // We will fetch more data here in the future...

    // --- PASS FETCHED DATA AS PROPS ---
    return (
        <OverviewClient 
            profile={profile}
            activeOrderCount={activeOrderCount || 0}
        />
    )
}