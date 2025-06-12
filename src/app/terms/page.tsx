import type { Metadata } from "next"
import { TermsOfService } from "@/components/terms-of-service"

export const metadata: Metadata = {
  title: "Terms of Service | Laundrify",
  description: "Terms and conditions for using Laundrify services",
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Terms of Service</h1>
      <TermsOfService />
    </div>
  )
}
