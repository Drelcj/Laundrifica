import type { Metadata } from "next"
import AddressesPageClient from "./AddressesPageClient"

export const metadata: Metadata = {
  title: "Address Book | Laundrify Dashboard",
  description: "Manage your delivery addresses",
}

export default function AddressesPage() {
  return <AddressesPageClient />
}
