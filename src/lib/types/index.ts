export type OrderStatus = | 'pending_payment' | 'pending_pickup' | 'processing' | 'out_for_delivery' | 'completed' | 'cancelled';

export interface Order {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: string | null;
  customer_email: string | null;
  total_amount: number;
  status: OrderStatus;
  shipping_address: string | null;
  assigned_agent_id: string | null;
  users: { 
    full_name: string | null | undefined; 
  };
}
