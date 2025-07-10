import { createClient } from '@/utils/supabase/server'
import ShopPageClient from './ShopPageClient'

export const metadata = {
  title: 'Shop - Laundrilab',
  description: 'Browse our premium collection of laundry care products and unique thrift finds.',
}

export default async function ShopPage() {
  const supabase = await createClient()
  const { data: products, error } = await supabase
    .from('products')
    .select('*, categories(name)')

  if (error) {
    console.error('Error fetching products:', error)
    // Optionally, render an error state
  }

  return <ShopPageClient products={products ?? []} />
}
