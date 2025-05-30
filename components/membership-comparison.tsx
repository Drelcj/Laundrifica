import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

const features = [
  {
    name: "Pickup & Delivery",
    standard: "Scheduled (Mon, Wed, Fri, Sun, 5-9:30pm)",
    premium: "Instant on demand",
  },
  {
    name: "Processing Techniques",
    standard: "Standard",
    premium: "Advanced",
  },
  {
    name: "Customer Support",
    standard: "24/7",
    premium: "24/7 Priority",
  },
  {
    name: "Turnaround Time",
    standard: "Standard",
    premium: "Expedited",
  },
  {
    name: "Amendments/Repairs",
    standard: "Paid",
    premium: "Basic repairs free",
  },
  {
    name: "Exclusive Discounts",
    standard: false,
    premium: true,
  },
  {
    name: "Priority Handling",
    standard: false,
    premium: true,
  },
]

export function MembershipComparison() {
  return (
    <section className="container py-12 md:py-24 bg-muted/30">
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-4xl mb-4">Membership Comparison</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the membership that best fits your laundry needs.
        </p>
      </div>
      <div className="overflow-x-auto">
        <Table className="border rounded-lg bg-background">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Feature</TableHead>
              <TableHead className="text-center">Standard</TableHead>
              <TableHead className="text-center">Premium</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature) => (
              <TableRow key={feature.name}>
                <TableCell className="font-medium">{feature.name}</TableCell>
                <TableCell className="text-center">
                  {typeof feature.standard === "boolean" ? (
                    feature.standard ? (
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    )
                  ) : (
                    feature.standard
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {typeof feature.premium === "boolean" ? (
                    feature.premium ? (
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    )
                  ) : (
                    <span className="font-medium">{feature.premium}</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="font-medium">Monthly Price</TableCell>
              <TableCell className="text-center">Free</TableCell>
              <TableCell className="text-center">₦5,000/month</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell className="text-center">
                <Button asChild variant="outline">
                  <Link href="/signup?plan=standard">Choose Standard</Link>
                </Button>
              </TableCell>
              <TableCell className="text-center">
                <Button asChild>
                  <Link href="/signup?plan=premium">Choose Premium</Link>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
