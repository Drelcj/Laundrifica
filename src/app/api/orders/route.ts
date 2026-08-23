import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { createServerClient } from '@/utils/supabase/server-client'
import { createSupabaseOrder } from '@/lib/supabase-order'

/**
 * Server route to create an order and its items for the authenticated caller.
 * Prices/total and user_id are always derived server-side — never trusted from the client.
 */

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { order, items } = body

    if (!order || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ status: 'error', message: 'Invalid payload' }, { status: 400 })
    }

    const authClient = await createClient()
    const { data: { user } } = await authClient.auth.getUser()

    if (!user) {
      return NextResponse.json({ status: 'error', message: 'Authentication required' }, { status: 401 })
    }

    const supabase = createServerClient()

    const productIds = items.map((it: any) => Number(it.product_id))
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, price, discount_price')
      .in('id', productIds)

    if (productsError || !products) {
      console.error('[api/orders] Failed to load products for pricing:', productsError?.message)
      return NextResponse.json({ status: 'error', message: 'Failed to validate order items' }, { status: 500 })
    }

    const productsById = new Map(products.map((p) => [p.id, p]))

    let totalAmount = 0
    const itemsPayload: { product_id: number; quantity: number; price_at_purchase: number }[] = []

    for (const it of items) {
      const productId = Number(it.product_id)
      const quantity = Number(it.quantity)
      const product = productsById.get(productId)

      if (!product || !Number.isInteger(quantity) || quantity <= 0) {
        return NextResponse.json(
          { status: 'error', message: `Invalid order item: product ${it.product_id}` },
          { status: 400 }
        )
      }

      const unitPrice = product.discount_price ?? product.price
      totalAmount += unitPrice * quantity
      itemsPayload.push({ product_id: productId, quantity, price_at_purchase: unitPrice })
    }

    const orderPayload: any = {
      total_amount: totalAmount,
      status: order.status || 'pending_pickup',
      shipping_address: order.shipping_address || null,
      billing_address: order.billing_address || null,
      user_id: user.id,
    }

    try {
      const insertedOrderId = await createSupabaseOrder(orderPayload, itemsPayload)
      return NextResponse.json({ status: 'success', orderId: insertedOrderId })
    } catch (dbErr: any) {
      console.error('[api/orders] createSupabaseOrder error:', dbErr?.message || dbErr)
      return NextResponse.json({ status: 'error', message: dbErr?.message || 'Database insert failed' }, { status: 500 })
    }
  } catch (error: any) {
    console.error('[api/orders] Unexpected handler error:', error?.message || error)
    return NextResponse.json({ status: 'error', message: error?.message || 'Unknown error' }, { status: 500 })
  }
}
