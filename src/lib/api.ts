// Mock API functions for demonstration purposes
// In a real application, these would make actual API calls to your backend

import { createClient } from "@/utils/supabase/client";
import type { Tables, TablesInsert } from "@/types/database";
import type { Product, InventoryItem, AnalyticsData, DbOrderStatus, ShippingInfo, OrderItem } from "./types"
import { createSupabaseOrder } from "./supabase-order";
import { OrderWithItems, Order } from "@/types/order";
import { ClientOrder } from "./types";



// Mock data
const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Premium Laundry Service",
    description: "Our premium laundry service includes washing, drying, and folding.",
    price: 29.99,
    images: ["/placeholder.svg?height=300&width=300"],
    category: "Laundry",
    inStock: true,
    stockQuantity: 100,
    tags: ["premium", "laundry", "folding"],
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "prod-2",
    name: "Dry Cleaning Service",
    description: "Professional dry cleaning for your delicate garments.",
    price: 39.99,
    images: ["/placeholder.svg?height=300&width=300"],
    category: "Dry Cleaning",
    inStock: true,
    stockQuantity: 100,
    tags: ["dry cleaning", "delicate", "professional"],
    createdAt: "2023-01-02T00:00:00Z",
    updatedAt: "2023-01-02T00:00:00Z",
  },
  {
    id: "prod-3",
    name: "Express Laundry Service",
    description: "Same-day laundry service for when you need it fast.",
    price: 49.99,
    images: ["/placeholder.svg?height=300&width=300"],
    category: "Laundry",
    inStock: true,
    stockQuantity: 50,
    tags: ["express", "same-day", "laundry"],
    createdAt: "2023-01-03T00:00:00Z",
    updatedAt: "2023-01-03T00:00:00Z",
  },
]



const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: "inv-1",
    name: "Laundry Detergent (Premium)",
    category: "Cleaning Supplies",
    quantity: 45,
    unit: "Liters",
    threshold: 20,
    lastRestocked: "2023-05-10",
    supplier: "CleanChem Ltd",
    cost: 3.99,
    location: "Warehouse A",
  },
  {
    id: "inv-2",
    name: "Fabric Softener",
    category: "Cleaning Supplies",
    quantity: 12,
    unit: "Liters",
    threshold: 15,
    lastRestocked: "2023-05-05",
    supplier: "CleanChem Ltd",
    cost: 2.99,
    location: "Warehouse A",
  },
  {
    id: "inv-3",
    name: "Stain Remover",
    category: "Cleaning Supplies",
    quantity: 28,
    unit: "Bottles",
    threshold: 10,
    lastRestocked: "2023-05-12",
    supplier: "SpotFree Inc",
    cost: 4.5,
    location: "Warehouse B",
  },
  {
    id: "inv-4",
    name: "Garment Bags",
    category: "Packaging",
    quantity: 350,
    unit: "Pieces",
    threshold: 100,
    lastRestocked: "2023-05-08",
    supplier: "PackWell Solutions",
    cost: 0.25,
    location: "Warehouse C",
  },
  {
    id: "inv-5",
    name: "Hangers",
    category: "Packaging",
    quantity: 520,
    unit: "Pieces",
    threshold: 200,
    lastRestocked: "2023-05-15",
    supplier: "PackWell Solutions",
    cost: 0.15,
    location: "Warehouse C",
  },
]

const MOCK_ANALYTICS: AnalyticsData = {
  sales: [
    { date: "2023-05-01", revenue: 1250.45, orders: 42, averageOrderValue: 29.77 },
    { date: "2023-05-02", revenue: 1340.2, orders: 45, averageOrderValue: 29.78 },
    { date: "2023-05-03", revenue: 1100.75, orders: 38, averageOrderValue: 28.97 },
    { date: "2023-05-04", revenue: 1420.3, orders: 47, averageOrderValue: 30.22 },
    { date: "2023-05-05", revenue: 1550.9, orders: 52, averageOrderValue: 29.83 },
    { date: "2023-05-06", revenue: 1200.15, orders: 40, averageOrderValue: 30.0 },
    { date: "2023-05-07", revenue: 980.5, orders: 33, averageOrderValue: 29.71 },
  ],
  products: [
    { id: "prod-1", name: "Premium Laundry Service", sales: 120, revenue: 3598.8, views: 450, conversionRate: 0.27 },
    { id: "prod-2", name: "Dry Cleaning Service", sales: 85, revenue: 3399.15, views: 380, conversionRate: 0.22 },
    { id: "prod-3", name: "Express Laundry Service", sales: 65, revenue: 3249.35, views: 320, conversionRate: 0.2 },
  ],
  customers: {
    acquisitionCost: 12.5,
    lifetimeValue: 250.75,
    retentionRate: 0.68,
    churnRate: 0.32,
  },
  timeRange: {
    start: "2023-05-01",
    end: "2023-05-07",
  },
}

// API Functions
export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return MOCK_PRODUCTS
}

export async function getProductById(id: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return MOCK_PRODUCTS.find((product) => product.id === id) || null
}



export async function createOrder(orderData: ClientOrder): Promise<Order> {
  console.log("Creating order with client data:", orderData);

  const { items, shippingAddress, total } = orderData;

  if (!items || !shippingAddress || total === undefined) {
    throw new Error('Missing required order data for creation.');
  }

  // 1. Prepare the main order object for the database.
  const orderToInsert: Omit<TablesInsert<'orders'>, 'id' | 'user_id' | 'created_at' | 'updated_at'> = {
    status: 'pending_payment',
    total_amount: total,
    shipping_address: JSON.stringify(shippingAddress),
  };

  // 2. Prepare the order items for the database.
  const itemsToInsert = items.map(item => ({
    product_id: parseInt(item.productId.replace('prod-', ''), 10),
    quantity: item.quantity,
    price: item.price,
  }));

  // 3. Call the Supabase function to perform the transaction and get the final order object.
  const newOrder = await createSupabaseOrder(orderToInsert, itemsToInsert);

  console.log('Successfully created order with ID:', newOrder.id);
  return newOrder;
}

export async function getOrders(): Promise<OrderWithItems[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, products(*))')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }

  return data;
}

export async function getOrderById(id: string): Promise<Tables<'orders'> | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', parseInt(id, 10))
    .single();

  if (error) {
    console.error('Error fetching order by ID:', error);
    return null;
  }

  return data;
}

export async function updateOrderStatus(id: string, status: Tables<'orders'>['status']): Promise<Tables<'orders'> | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', parseInt(id, 10))
    .select()
    .single();

  if (error) {
    console.error(`Error updating order ${id} to status ${status}:`, error);
    return null;
  }

  return data;
}

export async function getInventory(): Promise<InventoryItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return MOCK_INVENTORY
}

export async function updateInventoryItem(id: string, data: Partial<InventoryItem>): Promise<InventoryItem | null> {
  await new Promise((resolve) => setTimeout(resolve, 400))

  const itemIndex = MOCK_INVENTORY.findIndex((item) => item.id === id)
  if (itemIndex === -1) return null

  MOCK_INVENTORY[itemIndex] = { ...MOCK_INVENTORY[itemIndex], ...data }

  return MOCK_INVENTORY[itemIndex]
}

export async function getAnalytics(startDate?: string, endDate?: string): Promise<AnalyticsData> {
  await new Promise((resolve) => setTimeout(resolve, 700))

  // In a real app, you would filter the data based on the date range
  return MOCK_ANALYTICS
}

export async function getShippingInfo(trackingNumber: string): Promise<ShippingInfo | null> {
  // This function is deprecated as it relies on mock data.
  // A real implementation would query the database.
  await new Promise((resolve) => setTimeout(resolve, 600))
  return null;
}

export async function processPayment(
  paymentDetails: any,
): Promise<{ success: boolean; transactionId?: string; error?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simulate payment processing
  // In a real app, this would integrate with a payment gateway like Stripe
  const success = Math.random() > 0.1 // 90% success rate for demo

  if (success) {
    return {
      success: true,
      transactionId: `txn-${Date.now()}`,
    }
  } else {
    return {
      success: false,
      error: "Payment processing failed. Please try again.",
    }
  }
}

export async function calculateTax(subtotal: number, state: string): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Simple tax calculation based on state
  // In a real app, this would use a tax API or more complex rules
  const taxRates: Record<string, number> = {
    CA: 0.0725, // 7.25%
    NY: 0.0845, // 8.45%
    TX: 0.0625, // 6.25%
    // Default rate for other states
    default: 0.06, // 6%
  }

  const rate = taxRates[state] || taxRates.default
  return Number.parseFloat((subtotal * rate).toFixed(2))
}

export async function calculateShipping(items: any[], zipCode: string): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 400))

  // Simple shipping calculation
  // In a real app, this would use a shipping API or more complex rules
  const baseRate = 5.99
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  // Add $1 for each item beyond the first
  const additionalItemCost = Math.max(0, itemCount - 1) * 1.0

  return Number.parseFloat((baseRate + additionalItemCost).toFixed(2))
}
