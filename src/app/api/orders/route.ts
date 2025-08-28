import { NextResponse } from 'next/server'
import { createServerClient } from '@/utils/supabase/server-client'
import { createSupabaseOrder } from '@/lib/supabase-order'

/**
 * Server route to create an order and its items.
 * This route uses the service_role key via createServerClient so DB inserts bypass RLS.
 */

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('[api/orders] Received request body:', JSON.stringify(body))
    const { order, items } = body

    if (!order || !items) {
      console.log('[api/orders] Invalid payload, missing order or items')
      return NextResponse.json({ status: 'error', message: 'Invalid payload' }, { status: 400 })
    }

    const supabase = createServerClient()
    console.log('[api/orders] client-supplied order user_id:', order.user_id)

    const orderPayload: any = {
      total_amount: Number(order.total_amount || 0),
      status: order.status || 'pending_pickup',
      shipping_address: order.shipping_address || null,
      billing_address: order.billing_address || null,
      user_id: order.user_id ?? null,
    }

    const itemsPayload = (items || []).map((it: any) => ({
      product_id: Number(it.product_id || 0),
      quantity: Number(it.quantity || 0),
      price_at_purchase: Number(it.price_at_purchase || 0),
    }))

    console.log('[api/orders] Prepared order payload:', JSON.stringify(orderPayload))
    console.log('[api/orders] Prepared items payload:', JSON.stringify(itemsPayload))

    try {
      const insertedOrderId = await createSupabaseOrder(orderPayload, itemsPayload)
      console.log('[api/orders] createSupabaseOrder succeeded, order id:', insertedOrderId)
      return NextResponse.json({ status: 'success', orderId: insertedOrderId })
    } catch (dbErr: any) {
      console.error('[api/orders] createSupabaseOrder error:', dbErr)
      try { console.error('[api/orders] dbErr stack:', dbErr?.stack) } catch (e) {}
      return NextResponse.json({ status: 'error', message: dbErr?.message || 'Database insert failed' }, { status: 500 })
    }
  } catch (error: any) {
    console.error('[api/orders] Unexpected handler error:', error)
    try { console.error(error.stack) } catch (e) {}
    return NextResponse.json({ status: 'error', message: error?.message || 'Unknown error' }, { status: 500 })
  }
}
