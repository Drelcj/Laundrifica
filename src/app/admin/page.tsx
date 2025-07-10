import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { ProductDataTable } from '@/components/admin/product-data-table'
import type { Product } from '@/types/app'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function AdminPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const { data: products, error } = await supabase
    .from('products')
    .select('*, categories(name)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products for admin:', error)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Product Management</h1>
          <p className="text-xl text-muted-foreground mt-2">
            Add, edit, and manage all products for the shop.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">Add Product</Link>
        </Button>
      </div>
      
      <ProductDataTable products={(products as Product[]) ?? []} />
    </div>
  )
}
