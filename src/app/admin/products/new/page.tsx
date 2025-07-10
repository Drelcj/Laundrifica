import { createClient } from '@/utils/supabase/server'
import { ProductForm } from '@/components/admin/product-form'

export default async function AddProductPage() {
  const supabase = await createClient()
  const { data: categories, error } = await supabase.from('categories').select('id, name')

  if (error) {
    console.error('Error fetching categories:', error)
    // Handle error appropriately
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">Add New Product</h1>
      <ProductForm categories={categories ?? []} />
    </div>
  )
}
