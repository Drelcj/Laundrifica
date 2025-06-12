import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"

export default function AgentDashboardPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-6 max-w-full overflow-hidden"> {/* Prevent overflow */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Agent Dashboard</h1> {/* Adjust font size */}
        <p className="text-sm md:text-base text-muted-foreground">Manage your assigned orders and track your performance.</p> {/* Adjust text size */}
      </div>

      {/* Order Management Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Order Management</CardTitle> {/* Adjust title size */}
          <CardDescription className="text-sm md:text-base">View and update your assigned orders.</CardDescription> {/* Adjust description size */}
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto w-full"> {/* Add horizontal scrolling for tables */}
            <Table className="table-auto w-full"> {/* Ensure table fits within the container */}
              <thead>
                <TableRow>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Pickup Date/Time</TableHead>
                  <TableHead>Delivery Date/Time</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </thead>
              <TableBody>
                {/* Example row */}
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>#12345</TableCell>
                  <TableCell>Pending Pickup</TableCell>
                  <TableCell>June 7, 2025, 10:00 AM</TableCell>
                  <TableCell>June 8, 2025, 4:00 PM</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/agent/orders/12345">View Details</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Earnings Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Earnings</CardTitle> {/* Adjust title size */}
          <CardDescription className="text-sm md:text-base">Track your commission and completed orders.</CardDescription> {/* Adjust description size */}
        </CardHeader>
        <CardContent>
          <div className="text-2xl md:text-3xl font-bold">$450</div>
          <p className="text-xs md:text-sm text-muted-foreground">Commission earned this month</p>
        </CardContent>
      </Card>
    </div>
  )
}