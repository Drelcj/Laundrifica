import type { Metadata } from "next"
import RepairsClientPage from "./RepairsClientPage"

export const metadata: Metadata = {
  title: "Repairs - QuickLease",
  description: "QuickLease Repairs Services",
}

export default function RepairsPage() {
  return <RepairsClientPage />
}
