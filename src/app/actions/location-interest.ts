'use server'

import { createClient } from '@/utils/supabase/server'

export type LocationInterestState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

/**
 * Records interest in pickup from the upcoming Rumuagholu T-Junction branch.
 * The signup count decides whether that shop opens, so failures are surfaced
 * to the visitor rather than swallowed.
 */
export async function submitLocationInterest(
  _prevState: LocationInterestState,
  formData: FormData,
): Promise<LocationInterestState> {
  const name = String(formData.get('name') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const area = String(formData.get('area') ?? '').trim()

  if (!name) {
    return { status: 'error', message: 'Please tell us your name.' }
  }

  // Nigerian numbers, allowing +234 / 0 prefixes and common separators.
  const digits = phone.replace(/[\s()-]/g, '')
  if (!/^(\+?234|0)\d{10}$/.test(digits)) {
    return { status: 'error', message: 'Please enter a valid Nigerian phone number.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('location_interest').insert({
    name,
    phone: digits,
    area: area || null,
  })

  if (error) {
    console.error('Error saving location interest:', error)
    return { status: 'error', message: 'Something went wrong. Please try again or message us on WhatsApp.' }
  }

  return {
    status: 'success',
    message: "Thank you — we'll text you as soon as pickup starts in your area.",
  }
}
