import type { Metadata } from "next"
import VouchersClientPage from "./VouchersClientPage"

export const metadata: Metadata = {
  title: "Vouchers & Refunds | LaundryLab Dashboard",
  description: "Manage your vouchers and refunds",
}

export default function VouchersPage() {
  return <VouchersClientPage />
}
