"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Download,
  RefreshCw,
  Star,
} from "lucide-react"

// Mock data for analytics
const mockData = {
  overview: {
    totalRevenue: 2450000,
    revenueGrowth: 12.5,
    totalOrders: 1234,
    ordersGrowth: 8.2,
    avgOrderValue: 1986,
    avgOrderGrowth: 3.1,
    customerRetention: 78.5,
    retentionGrowth: -1.2,
  },
  salesData: [
    { date: "Jan", revenue: 180000, orders: 89 },
    { date: "Feb", revenue: 220000, orders: 112 },
    { date: "Mar", revenue: 195000, orders: 98 },
    { date: "Apr", revenue: 285000, orders: 143 },
    { date: "May", revenue: 310000, orders: 156 },
    { date: "Jun", revenue: 275000, orders: 138 },
  ],
  popularServices: [
    { name: "Wash & Fold", orders: 456, revenue: 912000, growth: 15.2 },
    { name: "Dry Cleaning", orders: 234, revenue: 702000, growth: 8.7 },
    { name: "Ironing", orders: 189, revenue: 378000, growth: 12.1 },
    { name: "Repairs", orders: 67, revenue: 201000, growth: 22.3 },
    { name: "Express Service", orders: 123, revenue: 369000, growth: 18.9 },
  ],
  orderStatuses: [
    { status: "Completed", count: 892, percentage: 72.3, color: "bg-green-500" },
    { status: "Processing", count: 156, percentage: 12.6, color: "bg-blue-500" },
    { status: "Pending", count: 98, percentage: 7.9, color: "bg-yellow-500" },
    { status: "Cancelled", count: 45, percentage: 3.6, color: "bg-red-500" },
    { status: "Refunded", count: 43, percentage: 3.5, color: "bg-gray-500" },
  ],
  customerAcquisition: [
    { month: "Jan", newCustomers: 45, totalCustomers: 1245 },
    { month: "Feb", newCustomers: 67, totalCustomers: 1312 },
    { month: "Mar", newCustomers: 52, totalCustomers: 1364 },
    { month: "Apr", newCustomers: 78, totalCustomers: 1442 },
    { month: "May", newCustomers: 89, totalCustomers: 1531 },
    { month: "Jun", newCustomers: 94, totalCustomers: 1625 },
  ],
  recentActivity: [
    { type: "order", message: "New order #1234 received", time: "2 minutes ago" },
    { type: "customer", message: "New customer registration", time: "5 minutes ago" },
    { type: "payment", message: "Payment of ₦2,500 received", time: "8 minutes ago" },
    { type: "review", message: "5-star review received", time: "12 minutes ago" },
  ],
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7days")
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1000)
  }

  const MetricCard = ({
    title,
    value,
    growth,
    icon: Icon,
    prefix = "",
    suffix = "",
  }: {
    title: string
    value: number | string
    growth?: number
    icon: any
    prefix?: string
    suffix?: string
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {prefix}
          {typeof value === "number" ? value.toLocaleString() : value}
          {suffix}
        </div>
        {growth !== undefined && (
          <div className={`flex items-center pt-1 text-xs ${growth >= 0 ? "text-green-500" : "text-red-500"}`}>
            {growth >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
            <span>{Math.abs(growth)}% from last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  )

  const ChartPlaceholder = ({ title, height = "h-64" }: { title: string; height?: string }) => (
    <div
      className={`${height} border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center bg-muted/10`}
    >
      <div className="text-center">
        <TrendingUp className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">{title} Chart</p>
        <p className="text-xs text-muted-foreground/75">Interactive chart will be rendered here</p>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Monitor your business performance and key metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Revenue"
          value={mockData.overview.totalRevenue}
          growth={mockData.overview.revenueGrowth}
          icon={DollarSign}
          prefix="₦"
        />
        <MetricCard
          title="Total Orders"
          value={mockData.overview.totalOrders}
          growth={mockData.overview.ordersGrowth}
          icon={ShoppingCart}
        />
        <MetricCard
          title="Avg. Order Value"
          value={mockData.overview.avgOrderValue}
          growth={mockData.overview.avgOrderGrowth}
          icon={TrendingUp}
          prefix="₦"
        />
        <MetricCard
          title="Customer Retention"
          value={mockData.overview.customerRetention}
          growth={mockData.overview.retentionGrowth}
          icon={Users}
          suffix="%"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue & Orders Over Time</CardTitle>
                <CardDescription>Daily revenue and order trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartPlaceholder title="Revenue & Orders Timeline" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Status Distribution</CardTitle>
                <CardDescription>Current order status breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockData.orderStatuses.map((status) => (
                    <div key={status.status} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${status.color}`} />
                        <span className="text-sm font-medium">{status.status}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{status.count}</span>
                        <Badge variant="secondary">{status.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest business activities and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                    <div className="flex-shrink-0">
                      {activity.type === "order" && <ShoppingCart className="h-4 w-4 text-blue-500" />}
                      {activity.type === "customer" && <Users className="h-4 w-4 text-green-500" />}
                      {activity.type === "payment" && <DollarSign className="h-4 w-4 text-yellow-500" />}
                      {activity.type === "review" && <Star className="h-4 w-4 text-purple-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales Performance</CardTitle>
                <CardDescription>Revenue trends and sales metrics over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartPlaceholder title="Sales Performance" height="h-80" />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                  <CardDescription>Revenue breakdown by month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartPlaceholder title="Monthly Revenue" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sales by Time of Day</CardTitle>
                  <CardDescription>Peak hours analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartPlaceholder title="Hourly Sales" />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Acquisition</CardTitle>
                <CardDescription>New customers over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartPlaceholder title="Customer Acquisition" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Lifetime Value</CardTitle>
                <CardDescription>Average customer value metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">Average CLV</span>
                    <span className="text-lg font-bold">₦15,420</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">Customer Acquisition Cost</span>
                    <span className="text-lg font-bold">₦2,340</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">CLV:CAC Ratio</span>
                    <span className="text-lg font-bold text-green-600">6.6:1</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Customer Segmentation</CardTitle>
              <CardDescription>Customer groups by behavior and value</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartPlaceholder title="Customer Segments" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Popular Services</CardTitle>
              <CardDescription>Most requested services and their performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.popularServices.map((service, index) => (
                  <div key={service.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                        <span className="text-sm font-bold text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{service.name}</h4>
                        <p className="text-sm text-muted-foreground">{service.orders} orders</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₦{service.revenue.toLocaleString()}</p>
                      <div className="flex items-center text-sm text-green-600">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        {service.growth}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Service Performance</CardTitle>
                <CardDescription>Revenue by service category</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartPlaceholder title="Service Revenue" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Ratings</CardTitle>
                <CardDescription>Customer satisfaction by service</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartPlaceholder title="Service Ratings" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
