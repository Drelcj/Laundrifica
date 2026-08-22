import Link from "next/link"
import { ArrowRight, Package, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Deliberately carries no KPI figures. The previous version displayed invented
// totals (1,284 orders, 573 customers, "+12% from last month") over mock data.
// Cost and revenue tracking only started in August 2026, so there is nothing
// real to show yet — and a confident wrong number is worse than no number.

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Run the day-to-day business from here.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Orders</CardTitle>
            </div>
            <CardDescription>See what has come in and move it through pickup, wash and delivery.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Every order placed on the website, by an agent, or over the counter.
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full" asChild>
              <Link href="/dashboard/admin/orders">
                Open orders
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Items &amp; prices</CardTitle>
            </div>
            <CardDescription>Add clothing types, set prices, and manage the chemical products.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Changes here take effect on the website immediately.
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full" asChild>
              <Link href="/dashboard/admin/products">
                Open items &amp; prices
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
