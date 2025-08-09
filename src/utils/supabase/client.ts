// src/utils/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/database'

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL or anonymous key is not set. Please check your environment variables.");
  }

  return createBrowserClient<Database>(
    supabaseUrl,
    supabaseAnonKey
  );
}