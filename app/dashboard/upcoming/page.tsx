import type { Metadata } from "next"
import UpcomingServicesClient from "./UpcomingServicesClient"

export const metadata: Metadata = {
  title: "Upcoming Services | Laundrify Dashboard",
  description: "View and manage your upcoming laundry services",
}

export default function UpcomingServicesPage() {
  return <UpcomingServicesClient />
}
