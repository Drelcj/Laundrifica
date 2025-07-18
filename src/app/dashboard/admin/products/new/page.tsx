import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { ProductForm } from '@/components/admin/product-form';
import { createProduct } from '@/lib/actions/product.actions';
import { Category } from '@/types/app';

async function getCategories(supabase: any): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return data;
}

export default async function NewProductPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const categories = await getCategories(supabase);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      <ProductForm 
        categories={categories} 
        createProduct={createProduct} 
        updateProduct={async () => {}}
      />
    </div>
  );
}
