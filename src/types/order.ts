// The project's correct name is 'Laundrilab', not 'Laundrifica'.

import { Database } from "@/types/database";

export type Order = Database["public"]["Tables"]["orders"]["Row"];
type OrderItem = Database["public"]["Tables"]["order_items"]["Row"];
type Product = Database["public"]["Tables"]["products"]["Row"];

interface OrderItemWithProduct extends OrderItem {
  products: Product | null;
}

export interface OrderWithItems extends Order {
  order_items: OrderItemWithProduct[];
}
