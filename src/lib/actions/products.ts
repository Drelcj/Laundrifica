import { SupabaseClient } from '@supabase/supabase-js';
import { Product } from '@/types/app';

export async function getProducts(supabase: SupabaseClient): Promise<{ data: Product[] | null; error: any }> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (name)
    `)
    .order('created_at', { ascending: false });

  return { data, error };
}
