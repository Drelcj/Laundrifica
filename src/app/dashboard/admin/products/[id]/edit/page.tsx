import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { ProductForm } from '@/components/admin/product-form';
import { Category, Product } from '@/types/app';

async function getProductById(supabase: any, id: number): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(id, name))')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }
  return data;
}

async function getCategories(supabase: any): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return data;
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
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

  const productId = Number(params.id);
  const [product, categories] = await Promise.all([
    getProductById(supabase, productId),
    getCategories(supabase),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <ProductForm categories={categories} product={product} />
    </div>
  );
}
