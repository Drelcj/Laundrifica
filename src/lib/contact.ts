// Single source of truth for Laundryfica Nigeria Ltd. contact details.
// Update here rather than hardcoding numbers or addresses in components.

/** Display form of the primary business line. */
export const PHONE_DISPLAY = "+234 811 061 2646" as const
/** Dialable form, for `tel:` links. */
export const PHONE_TEL = "+2348110612646" as const
/** WhatsApp is the primary contact channel for this business. */
export const WHATSAPP_URL = "https://wa.me/2348110612646" as const

export const SUPPORT_EMAIL = "hello@laundryfica.com.ng" as const

/** The operating branch. */
export const ADDRESS_LINE =
  "Plot 1 Road 5, Okporo Estate, by Today FM Drive, Rumuekini, Port Harcourt" as const
export const CITY_STATE = "Port Harcourt, Rivers State, Nigeria" as const

/**
 * Second branch. NOT yet open — never present this as an operating address,
 * and keep it out of any structured data / LocalBusiness markup.
 */
export const UPCOMING_BRANCH_ADDRESS = "110 Rumuagholu Road by T-Junction, Port Harcourt" as const
