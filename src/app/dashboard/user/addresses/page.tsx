import type { Metadata } from "next"
import AddressesPageClient from "./AddressesPageClient"

export const metadata: Metadata = {
  title: "Address Book | Laundryfica Dashboard",
  description: "Manage your delivery addresses",
}

export default function AddressesPage() {
  return <AddressesPageClient />
}
