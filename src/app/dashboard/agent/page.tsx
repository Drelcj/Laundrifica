import Link from "next/link";
import { getOrders } from "@/lib/api";
import type { Order } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function AgentDashboardPage() {
  const orders: Order[] = await getOrders();

  if (!orders || orders.length === 0) {
    return <p>No orders found.</p>;
  }

  // Calculate total earnings (example logic)
  const totalEarnings = orders?.reduce((acc, order) => acc + (order.total * 0.1), 0) ?? 0; // Assuming 10% commission

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
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders && orders.length > 0 ? (
                  orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</TableCell>
                      <TableCell>#{order.id}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{order.status}</Badge>
                      </TableCell>
                      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right">₦{order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/agent/orders/${order.id}`}>View Details</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">No orders assigned yet.</TableCell>
                  </TableRow>
                )}
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
          <div className="text-2xl md:text-3xl font-bold">₦{totalEarnings.toFixed(2)}</div>
          <p className="text-xs md:text-sm text-muted-foreground">Commission earned this month</p>
        </CardContent>
      </Card>
    </div>
  )
}