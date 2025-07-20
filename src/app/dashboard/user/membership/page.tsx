import type { Metadata } from "next"
import MembershipClientPage from "./MembershipClientPage"

export const metadata: Metadata = {
  title: "Membership | LaundryLab Dashboard",
  description: "Manage your LaundryLab membership and subscription",
}

export default function MembershipPage() {
  return <MembershipClientPage />
}
