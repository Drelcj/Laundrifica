"use client"

import { useState } from "react"
import { PlusCircle, Edit, Trash2, Search, BarChart3, Mail, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock campaign data
const campaigns = [
  {
    id: "C001",
    name: "Summer Sale Promotion",
    type: "email",
    status: "active",
    audience: "All Customers",
    sent: 5420,
    opened: 2356,
    clicked: 1089,
    converted: 342,
    startDate: "2023-06-01",
    endDate: "2023-06-30",
  },
  {
    id: "C002",
    name: "New Product Launch",
    type: "sms",
    status: "scheduled",
    audience: "Premium Customers",
    sent: 0,
    opened: 0,
    clicked: 0,
    converted: 0,
    startDate: "2023-07-15",
    endDate: "2023-07-30",
  },
  {
    id: "C003",
    name: "Abandoned Cart Recovery",
    type: "email",
    status: "active",
    audience: "Cart Abandoners",
    sent: 1245,
    opened: 876,
    clicked: 543,
    converted: 210,
    startDate: "2023-05-01",
    endDate: "2023-12-31",
  },
  {
    id: "C004",
    name: "Customer Feedback Survey",
    type: "email",
    status: "completed",
    audience: "Recent Customers",
    sent: 3500,
    opened: 1890,
    clicked: 1200,
    converted: 980,
    startDate: "2023-04-01",
    endDate: "2023-05-15",
  },
  {
    id: "C005",
    name: "Holiday Special Offer",
    type: "sms",
    status: "draft",
    audience: "All Customers",
    sent: 0,
    opened: 0,
    clicked: 0,
    converted: 0,
    startDate: "",
    endDate: "",
  },
]

// Mock email templates
const emailTemplates = [
  {
    id: "T001",
    name: "Welcome Email",
    subject: "Welcome to LaundryLab!",
    lastModified: "2023-05-10",
  },
  {
    id: "T002",
    name: "Order Confirmation",
    subject: "Your LaundryLab Order #[ORDER_ID] Confirmation",
    lastModified: "2023-05-12",
  },
  {
    id: "T003",
    name: "Shipping Confirmation",
    subject: "Your LaundryLab Order Has Shipped!",
    lastModified: "2023-05-15",
  },
  {
    id: "T004",
    name: "Abandoned Cart",
    subject: "You Left Something Behind!",
    lastModified: "2023-05-20",
  },
  {
    id: "T005",
    name: "Promotional Offer",
    subject: "Special Offer Just For You!",
    lastModified: "2023-05-25",
  },
]

export default function MarketingPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredTemplates = emailTemplates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Marketing</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Open Rate</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">43.5%</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.8%</div>
            <p className="text-xs text-muted-foreground">+1.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns">
        <TabsList className="mb-6">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Campaigns</CardTitle>
              <CardDescription>Manage your marketing campaigns and track their performance.</CardDescription>
              <div className="flex items-center mt-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search campaigns..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px] ml-4">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Audience</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{campaign.type === "email" ? "Email" : "SMS"}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            campaign.status === "active"
                              ? "default"
                              : campaign.status === "scheduled"
                                ? "outline"
                                : campaign.status === "completed"
                                  ? "secondary"
                                  : "destructive"
                          }
                          className={
                            campaign.status === "active"
                              ? "bg-green-100 text-green-800"
                              : campaign.status === "scheduled"
                                ? "bg-blue-100 text-blue-800"
                                : campaign.status === "completed"
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-amber-100 text-amber-800"
                          }
                        >
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{campaign.audience}</TableCell>
                      <TableCell>
                        {campaign.status === "active" || campaign.status === "completed" ? (
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Open Rate: {((campaign.opened / campaign.sent) * 100).toFixed(1)}%</span>
                              <span>
                                {campaign.opened}/{campaign.sent}
                              </span>
                            </div>
                            <Progress value={(campaign.opened / campaign.sent) * 100} className="h-2" />
                            <div className="flex justify-between text-xs">
                              <span>Click Rate: {((campaign.clicked / campaign.opened) * 100).toFixed(1)}%</span>
                              <span>
                                {campaign.clicked}/{campaign.opened}
                              </span>
                            </div>
                            <Progress value={(campaign.clicked / campaign.opened) * 100} className="h-2" />
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">Not started</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {campaign.startDate && campaign.endDate
                          ? `${campaign.startDate} to ${campaign.endDate}`
                          : "Not scheduled"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Manage your email templates for marketing campaigns.</CardDescription>
              <div className="flex items-center mt-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search templates..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button className="ml-4">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Subject Line</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>{template.subject}</TableCell>
                      <TableCell>{template.lastModified}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Automation</CardTitle>
              <CardDescription>Set up automated marketing workflows based on customer actions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Welcome Series</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Automatically send a series of welcome emails to new customers.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Abandoned Cart</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Send reminders to customers who have abandoned their shopping carts.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Post-Purchase</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Follow up with customers after their purchase with thank you emails and product recommendations.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Badge className="bg-amber-100 text-amber-800">Draft</Badge>
                  </CardFooter>
                </Card>
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Automation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience">
          <Card>
            <CardHeader>
              <CardTitle>Audience Segments</CardTitle>
              <CardDescription>Manage your customer segments for targeted marketing.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">All Customers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8,542</div>
                    <p className="text-sm text-muted-foreground">All registered customers</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Premium Customers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,245</div>
                    <p className="text-sm text-muted-foreground">Customers who have spent over ₦50,000</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Cart Abandoners</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">342</div>
                    <p className="text-sm text-muted-foreground">
                      Customers who abandoned their carts in the last 30 days
                    </p>
                  </CardContent>
                </Card>
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Segment
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
