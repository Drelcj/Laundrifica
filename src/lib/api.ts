// Mock API functions for demonstration purposes
// In a real application, these would make actual API calls to your backend
//
// All monetary values in this file are in Nigerian Naira (NGN).

import type { Product, Order, InventoryItem, AnalyticsData, OrderStatus, ShippingInfo } from "./types"

// Mock data
const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Premium Laundry Service",
    description: "Our premium laundry service includes washing, drying, and folding.",
    price: 12000,
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
    price: 18000,
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
    price: 25000,
    images: ["/placeholder.svg?height=300&width=300"],
    category: "Laundry",
    inStock: true,
    stockQuantity: 50,
    tags: ["express", "same-day", "laundry"],
    createdAt: "2023-01-03T00:00:00Z",
    updatedAt: "2023-01-03T00:00:00Z",
  },
]

const MOCK_ORDERS: Order[] = [
  {
    id: "order-1",
    userId: "user-1",
    email: "customer@example.com",
    items: [
      {
        id: "item-1",
        productId: "prod-1",
        name: "Premium Laundry Service",
        price: 12000,
        quantity: 2,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    shippingAddress: {
      firstName: "Chinedu",
      lastName: "Okoro",
      addressLine1: "12 Okporo Road",
      city: "Port Harcourt",
      state: "Rivers",
      phone: "+234 811 061 2646",
    },
    billingAddress: {
      firstName: "Chinedu",
      lastName: "Okoro",
      addressLine1: "12 Okporo Road",
      city: "Port Harcourt",
      state: "Rivers",
      phone: "+234 811 061 2646",
    },
    paymentMethod: {
      type: "credit_card",
      last4: "4242",
      expiryDate: "12/25",
    },
    subtotal: 24000,
    tax: 0,
    shipping: 1500,
    total: 25500,
    status: "shipped",
    shippingInfo: {
      method: "Standard",
      carrier: "Laundryfica Delivery",
      trackingNumber: "LF-2023-0612-0001",
      estimatedDelivery: "2023-06-15T00:00:00Z",
      cost: 1500,
      currentLocation: {
        city: "Port Harcourt",
        state: "Rivers",
        country: "Nigeria",
        latitude: 4.8156,
        longitude: 7.0498,
      },
      updates: [
        {
          status: "order_placed",
          location: "Online",
          timestamp: "2023-06-10T10:00:00Z",
          description: "Order has been placed",
        },
        {
          status: "processing",
          location: "Laundryfica Facility",
          timestamp: "2023-06-11T09:30:00Z",
          description: "Order is being processed",
        },
        {
          status: "shipped",
          location: "Laundryfica Facility",
          timestamp: "2023-06-12T14:20:00Z",
          description: "Order has been shipped",
        },
      ],
    },
    createdAt: "2023-06-10T10:00:00Z",
    updatedAt: "2023-06-12T14:20:00Z",
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
    cost: 1600,
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
    cost: 1200,
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
    cost: 1800,
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
    cost: 250,
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
    cost: 150,
    location: "Warehouse C",
  },
]

const MOCK_ANALYTICS: AnalyticsData = {
  sales: [
    { date: "2023-05-01", revenue: 504000, orders: 42, averageOrderValue: 12000 },
    { date: "2023-05-02", revenue: 540000, orders: 45, averageOrderValue: 12000 },
    { date: "2023-05-03", revenue: 442000, orders: 38, averageOrderValue: 11632 },
    { date: "2023-05-04", revenue: 570000, orders: 47, averageOrderValue: 12128 },
    { date: "2023-05-05", revenue: 624000, orders: 52, averageOrderValue: 12000 },
    { date: "2023-05-06", revenue: 482000, orders: 40, averageOrderValue: 12050 },
    { date: "2023-05-07", revenue: 394000, orders: 33, averageOrderValue: 11939 },
  ],
  products: [
    { id: "prod-1", name: "Premium Laundry Service", sales: 120, revenue: 1440000, views: 450, conversionRate: 0.27 },
    { id: "prod-2", name: "Dry Cleaning Service", sales: 85, revenue: 1530000, views: 380, conversionRate: 0.22 },
    { id: "prod-3", name: "Express Laundry Service", sales: 65, revenue: 1625000, views: 320, conversionRate: 0.2 },
  ],
  customers: {
    acquisitionCost: 5000,
    lifetimeValue: 100000,
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

export async function createOrder(orderData: Partial<Order>): Promise<Order> {
  // Send to server API route which persists to Supabase
  const payload = {
    order: {
      total_amount: Number(orderData.total || 0),
      status: (orderData.status as string) || 'pending',
      shipping_address: orderData.shippingAddress || null,
      billing_address: orderData.billingAddress || null,
      user_id: (orderData.userId as string) || null,
    },
    items: (orderData.items || []).map((it: any) => ({
      product_id: Number(it.productId || it.product_id || 0),
      quantity: Number(it.quantity || 1),
      price_at_purchase: Number(it.price || it.price_at_purchase || 0),
    })),
  }

  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body?.message || `Failed to create order (${res.status})`)
  }

  const data = await res.json()
  // Return a minimal Order-like object for client flow (the server returns orderId)
  return {
    id: String(data.orderId || `order-${Date.now()}`),
    userId: (orderData.userId as string) || undefined,
    email: orderData.email || '',
    items: orderData.items || [],
    shippingAddress: orderData.shippingAddress!,
    billingAddress: orderData.billingAddress!,
    paymentMethod: orderData.paymentMethod!,
    subtotal: orderData.subtotal || 0,
    tax: orderData.tax || 0,
    shipping: orderData.shipping || 0,
    total: orderData.total || 0,
    status: (orderData.status as OrderStatus) || 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export async function getOrders(): Promise<Order[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return MOCK_ORDERS
}

export async function getOrderById(id: string): Promise<Order | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return MOCK_ORDERS.find((order) => order.id === id) || null
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order | null> {
  await new Promise((resolve) => setTimeout(resolve, 400))

  const orderIndex = MOCK_ORDERS.findIndex((order) => order.id === id)
  if (orderIndex === -1) return null

  MOCK_ORDERS[orderIndex].status = status
  MOCK_ORDERS[orderIndex].updatedAt = new Date().toISOString()

  return MOCK_ORDERS[orderIndex]
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
  await new Promise((resolve) => setTimeout(resolve, 600))

  // Find an order with the given tracking number
  const order = MOCK_ORDERS.find((o) => o.shippingInfo?.trackingNumber === trackingNumber)
  return order?.shippingInfo || null
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

  // VAT handling is not yet implemented. Nigerian VAT is a single national
  // rate (not a per-state rate), and whether it applies to these orders has
  // not been confirmed with the business, so tax is zero for now.
  return 0
}

export async function calculateShipping(items: any[], zipCode: string): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 400))

  // Simple shipping calculation, in Naira.
  // In a real app, this would use a shipping API or more complex rules
  const baseRate = 1500
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  // Add ₦200 for each item beyond the first
  const additionalItemCost = Math.max(0, itemCount - 1) * 200

  return baseRate + additionalItemCost
}
