import type { Metadata } from "next"
import RewardsClientPage from "./RewardsClientPage"

export const metadata: Metadata = {
  title: "Rewards | Laundrify Dashboard",
  description: "View and redeem your loyalty points and rewards",
}

export default function RewardsPage() {
  return <RewardsClientPage />
}
