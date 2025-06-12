// src/utils/supabase/client.ts
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../types/database'; // Import our generated types

export const createClient = () =>
  createPagesBrowserClient<Database>({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  });