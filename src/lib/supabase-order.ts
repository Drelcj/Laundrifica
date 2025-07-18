import { createClient } from "@/utils/supabase/client"
import type { TablesInsert } from "@/types/database"

type OrderItemInsert = Omit<TablesInsert<'order_items'>, 'id' | 'order_id'> & { order_id?: number }

export async function createSupabaseOrder(order: Omit<TablesInsert<'orders'>, 'id'>, items: OrderItemInsert[]) {
  const supabase = createClient()
  console.log('Order insert payload:', order)
  // Insert order
  const { data: orderData, error: orderError, status: orderStatus, statusText: orderStatusText } = await supabase
    .from('orders')
    .insert([order])
    .select('id')
    .single()
  console.log('Order insert response:', { orderData, orderError, orderStatus, orderStatusText })
  if (orderError || !orderData) {
    throw orderError || new Error('Order insert failed')
  }
  // Insert order items
  const itemsWithOrderId = items.map(item => ({ ...item, order_id: orderData.id }))
  console.log('Order items insert payload:', itemsWithOrderId)
  const { error: itemsError, status: itemsStatus, statusText: itemsStatusText } = await supabase
    .from('order_items')
    .insert(itemsWithOrderId)
  console.log('Order items insert response:', { itemsError, itemsStatus, itemsStatusText })
  if (itemsError) {
    throw itemsError
  }
  return orderData.id
}
