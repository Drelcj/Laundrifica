import { createClient } from "@/utils/supabase/client"
import type { TablesInsert } from "@/types/database"

type OrderItemInsert = Omit<TablesInsert<'order_items'>, 'id' | 'order_id'> & { order_id?: number }

import { Order } from "@/types/order";

export async function createSupabaseOrder(order: Omit<TablesInsert<'orders'>, 'id' | 'user_id'>, items: OrderItemInsert[]): Promise<Order> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be logged in to create an order.");
  }

  const fullOrder = { ...order, user_id: user.id };
  console.log('Order insert payload:', fullOrder);

  // Insert order
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert(fullOrder)
    .select('*')
    .single();

  if (orderError || !orderData) {
    console.error('Supabase order error:', orderError);
    throw new Error(orderError?.message || 'Order insert failed');
  }

  // Insert order items
  const itemsWithOrderId = items.map(item => ({ ...item, order_id: orderData.id }));
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(itemsWithOrderId);

  if (itemsError) {
    console.error('Supabase items error:', itemsError);
    throw new Error(itemsError.message || 'Order items insert failed');
  }

  if (!orderData) {
    throw new Error('Order creation succeeded but no data was returned.');
  }

  return orderData;
}
