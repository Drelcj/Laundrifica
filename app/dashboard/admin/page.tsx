import Link from "next/link"
import { ArrowRight, DollarSign, Package, Truck, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RecentOrdersTable } from "@/components/admin/recent-orders-table"
import { DeliveryMap } from "@/components/admin/delivery-map"
import { SalesChart } from "@/components/admin/sales-chart"

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the Laundrifica admin dashboard. Here's an overview of your business.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href="/dashboard/admin/orders">
                View all orders
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deliveries</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">8 pickups, 16 deliveries</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href="/dashboard/admin/delivery">
                View deliveries
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href="/dashboard/admin/customers">
                View customers
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦4.2M</div>
            <p className="text-xs text-muted-foreground">+23% from last month</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href="/dashboard/admin/analytics">
                View analytics
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Daily revenue for the past 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Active Deliveries</CardTitle>
            <CardDescription>Real-time location of delivery personnel</CardDescription>
          </CardHeader>
          <CardContent>
            <DeliveryMap />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/admin/delivery">View Detailed Map</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders across all customers</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentOrdersTable />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/admin/orders">View All Orders</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Customer Insights</CardTitle>
            <CardDescription>Membership distribution and activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">Membership Distribution</h4>
                  <Link href="/dashboard/admin/customers" className="text-xs text-primary hover:underline">
                    View Details
                  </Link>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-full flex items-center gap-2">
                      <div className="font-medium text-sm">Standard</div>
                      <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "65%" }}></div>
                      </div>
                      <div className="text-sm">65%</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full flex items-center gap-2">
                      <div className="font-medium text-sm">Premium</div>
                      <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-secondary" style={{ width: "35%" }}></div>
                      </div>
                      <div className="text-sm">35%</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">Top Services</h4>
                  <Link href="/dashboard/admin/analytics" className="text-xs text-primary hover:underline">
                    View Details
                  </Link>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-full flex items-center gap-2">
                      <div className="font-medium text-sm">Wash & Fold</div>
                      <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "42%" }}></div>
                      </div>
                      <div className="text-sm">42%</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full flex items-center gap-2">
                      <div className="font-medium text-sm">Dry Cleaning</div>
                      <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-secondary" style={{ width: "28%" }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full flex items-center gap-2">
                      <div className="font-medium text-sm">Ironing</div>
                      <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-accent" style={{ width: "18%" }}></div>
                      </div>
                      <div className="text-sm">18%</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full flex items-center gap-2">
                      <div className="font-medium text-sm">Repairs</div>
                      <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-muted-foreground" style={{ width: "12%" }}></div>
                      </div>
                      <div className="text-sm">12%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
