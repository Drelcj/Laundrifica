'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import type { DbOrder } from '@/lib/types';

export async function getOrders() {
  const supabase = await createClient();

  const { data: ordersData, error: ordersError } = await supabase
    .from('orders')
    .select(`*`)
    .order('created_at', { ascending: false });

  if (ordersError) {
    console.error('Error fetching orders:', ordersError);
    return { status: 'error' as const, message: 'Failed to fetch orders.', data: [] };
  }

  // Fetch user details for each order
  const userIds = ordersData.map(order => order.user_id).filter(id => id);
  const { data: usersData, error: usersError } = await supabase
    .from('profiles')
    .select('id, full_name')
    .in('id', userIds);

  if (usersError) {
    console.error('Error fetching users:', usersError);
    // Continue without user data if it fails
  }

  const usersMap = new Map(usersData?.map(user => [user.id, user.full_name]));

  const data: DbOrder[] = (ordersData as DbOrder[]).map(order => {
    const userFullName = order.user_id ? usersMap.get(order.user_id) : null;
    return {
      ...order,
      users: { full_name: userFullName },
    };
  });

  return { status: 'success' as const, message: 'Orders fetched successfully.', data };
}

interface CartItem {
  product_id: number;
  quantity: number;
  price_at_purchase: number;
}

export async function createOrder(customerEmail: string, cart: CartItem[], totalAmount: number) {
  const supabase = await createClient();

  // Find user by email to associate the order
  const { data: userData, error: userError } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', customerEmail)
    .single();

  // user_id can be null if the customer is not a registered user
  const userId = userData?.id ?? null;

  const orderPayload: any = {
    total_amount: totalAmount,
    status: 'pending_pickup',
    customer_email: customerEmail,
  };

  if (userId) {
    orderPayload.user_id = userId;
  }

  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert(orderPayload)
    .select('id')
    .single();

  if (orderError || !orderData) {
    console.error('Error creating order:', orderError);
    return {
      status: 'error' as const,
      message: 'Database Error: Failed to create order.',
    };
  }

  const orderId = orderData.id;

  const orderItems = cart.map((item) => ({
    order_id: orderId,
    product_id: item.product_id,
    quantity: item.quantity,
    price_at_purchase: item.price_at_purchase,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

  if (itemsError) {
    console.error('Error creating order items:', itemsError);
    // Optional: Attempt to delete the order if items fail to be created
    await supabase.from('orders').delete().eq('id', orderId);
    return {
      status: 'error' as const,
      message: 'Database Error: Failed to save order items.',
    };
  }

  revalidatePath('/dashboard/admin/orders');
  revalidatePath('/dashboard/agent');

  return {
    status: 'success' as const,
    message: 'Order placed successfully!',
    orderId,
  };
}

export async function assignAgentToOrder(orderId: number, agentId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('orders')
    .update({ assigned_agent_id: agentId, status: 'processing' })
    .eq('id', orderId);

  if (error) {
    console.error('Error assigning agent:', error);
    return {
      status: 'error' as const,
      message: 'Database Error: Failed to assign agent.',
    };
  }

  revalidatePath('/dashboard/admin/orders');
  return {
    status: 'success' as const,
    message: 'Agent assigned successfully!',
  };
}
