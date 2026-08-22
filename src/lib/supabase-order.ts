// src/lib/supabase-order.ts
import { createServerClient } from "@/utils/supabase/server-client"
import type { TablesInsert } from "@/types/database"

type OrderItemInsert = Omit<TablesInsert<'order_items'>, 'id' | 'order_id'> & { order_id?: number }

export async function createSupabaseOrder(order: Omit<TablesInsert<'orders'>, 'id'>, items: OrderItemInsert[]) {
  const supabase = createServerClient()

  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert([order])
    .select('id')
    .single()

  if (orderError || !orderData) {
    throw orderError || new Error('Order insert failed')
  }

  const itemsWithOrderId = items.map(item => ({ ...item, order_id: orderData.id }))
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(itemsWithOrderId)

  if (itemsError) {
    // Roll back the order so we don't leave an item-less order behind.
    await supabase.from('orders').delete().eq('id', orderData.id)
    throw itemsError
  }

  return orderData.id
}
