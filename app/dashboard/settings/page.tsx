import type { Metadata } from "next"
import SettingsClientPage from "./SettingsClientPage"

export const metadata: Metadata = {
  title: "Account Settings | Laundrify Dashboard",
  description: "Manage your account settings and preferences",
}

export default function SettingsPage() {
  return <SettingsClientPage />
}
