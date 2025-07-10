// src/types/app.ts
import { User as SupabaseUser } from '@supabase/supabase-js'
import { Database } from './database' // Assumes your generated types are here

// We can extend or simplify the Supabase user type if needed
export type User = SupabaseUser

// This pulls the 'profiles' table type from our auto-generated database types
export type Profile = Database['public']['Tables']['profiles']['Row']

// This pulls the 'products' table type from our auto-generated database types
export type Product = Database['public']['Tables']['products']['Row'] & {
  categories: Category | null
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}