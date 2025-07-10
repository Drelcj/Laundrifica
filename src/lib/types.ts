// Product Types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  inStock: boolean
  stockQuantity: number
  tags: string[]
  createdAt: string
  updatedAt: string
}

// Cart Types
export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
}

// Order Types

export type DbOrderStatus = 'pending_payment' | 'pending_pickup' | 'processing' | 'out_for_delivery' | 'completed' | 'cancelled';

export interface DbOrder {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: string | null;
  customer_email: string | null;
  total_amount: number;
  status: DbOrderStatus;
  shipping_address: string | null;
  assigned_agent_id: string | null;
  users?: { 
    full_name: string | null | undefined; 
  };
}

export interface OrderAddress {
  firstName: string
  lastName: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
}

export interface OrderItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"

export interface ShippingInfo {
  method: string
  carrier: string
  trackingNumber: string
  estimatedDelivery: string
  cost: number
  currentLocation?: {
    city: string
    state: string
    country: string
    latitude: number
    longitude: number
  }
  updates: {
    status: string
    location: string
    timestamp: string
    description: string
  }[]
}

export interface Order {
  id: string
  userId?: string
  email: string
  items: OrderItem[]
  shippingAddress: OrderAddress
  billingAddress: OrderAddress
  paymentMethod: {
    type: string
    last4?: string
    expiryDate?: string
  }
  subtotal: number
  tax: number
  shipping: number
  total: number
  status: OrderStatus
  shippingInfo?: ShippingInfo
  createdAt: string
  updatedAt: string
}

// Inventory Types
export interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  threshold: number
  lastRestocked: string
  supplier: string
  cost: number
  location: string
}

// Analytics Types
export interface SalesMetric {
  date: string
  revenue: number
  orders: number
  averageOrderValue: number
}

export interface ProductMetric {
  id: string
  name: string
  sales: number
  revenue: number
  views: number
  conversionRate: number
}

export interface CustomerMetric {
  acquisitionCost: number
  lifetimeValue: number
  retentionRate: number
  churnRate: number
}

export interface AnalyticsData {
  sales: SalesMetric[]
  products: ProductMetric[]
  customers: CustomerMetric
  timeRange: {
    start: string
    end: string
  }
}

// User Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "customer" | "admin" | "staff"
  orders: string[]
  createdAt: string
}
