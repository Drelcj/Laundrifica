import type { Metadata } from "next"
import MembershipClientPage from "./MembershipClientPage"

export const metadata: Metadata = {
  title: "Membership | Laundrify Dashboard",
  description: "Manage your Laundrify membership and subscription",
}

export default function MembershipPage() {
  return <MembershipClientPage />
}
