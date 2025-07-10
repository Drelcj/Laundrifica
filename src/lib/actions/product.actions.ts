'use server'

import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const productFormSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  description: z.string(),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  stock_quantity: z.coerce.number().int().min(0, "Stock must be a positive integer"),
  category_id: z.coerce.number().int(),
  type: z.enum(['service', 'shop_item', 'thrift_item']),
  is_active: z.boolean(),
  is_featured: z.boolean(),
  image_urls: z.string(),
});

export async function createProduct(values: z.infer<typeof productFormSchema>) {
  const supabase = await createClient();

  const validatedFields = productFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      status: 'error' as const,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create product.',
    };
  }

  const { image_urls, ...rest } = validatedFields.data;

  const { error } = await supabase.from('products').insert([
    {
      ...rest,
      image_urls: image_urls ? image_urls.split(',').map((url) => url.trim()) : [],
    },
  ]);

  if (error) {
    console.error('Supabase error:', error);
    return {
      status: 'error' as const,
      message: 'Database Error: Failed to create product.',
    };
  }

  revalidatePath('/dashboard/admin/products');
  return {
    status: 'success' as const,
    message: 'Product created successfully!',
  };
}
