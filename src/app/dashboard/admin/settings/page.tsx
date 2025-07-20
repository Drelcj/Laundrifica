// src/app/dashboard/admin/settings/page.tsx
"use client"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="general">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-64">
            <TabsList className="flex flex-col h-auto p-0 bg-transparent space-y-1">
              <TabsTrigger value="general" className="justify-start w-full">
                General
              </TabsTrigger>
              <TabsTrigger value="appearance" className="justify-start w-full">
                Appearance
              </TabsTrigger>
              <TabsTrigger value="notifications" className="justify-start w-full">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="payments" className="justify-start w-full">
                Payments
              </TabsTrigger>
              <TabsTrigger value="shipping" className="justify-start w-full">
                Shipping
              </TabsTrigger>
              <TabsTrigger value="tax" className="justify-start w-full">
                Tax
              </TabsTrigger>
              <TabsTrigger value="users" className="justify-start w-full">
                Users & Permissions
              </TabsTrigger>
              <TabsTrigger value="integrations" className="justify-start w-full">
                Integrations
              </TabsTrigger>
              <TabsTrigger value="advanced" className="justify-start w-full">
                Advanced
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1">
            <TabsContent value="general" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Manage your store's general settings and information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Store Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="storeName">Store Name</Label>
                        <Input id="storeName" defaultValue="LaundryLab" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="storeEmail">Store Email</Label>
                        <Input id="storeEmail" type="email" defaultValue="info@laundrylab.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="storePhone">Store Phone</Label>
                        <Input id="storePhone" defaultValue="+234 801 234 5678" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Select defaultValue="NGN">
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
                            <SelectItem value="USD">US Dollar ($)</SelectItem>
                            <SelectItem value="EUR">Euro (€)</SelectItem>
                            <SelectItem value="GBP">British Pound (£)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="storeAddress">Store Address</Label>
                      <Textarea id="storeAddress" defaultValue="123 Main Street, Lekki Phase 1, Lagos, Nigeria" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Store Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="maintenance">Maintenance Mode</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable maintenance mode to prevent customers from accessing your store.
                          </p>
                        </div>
                        <Switch id="maintenance" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="guestCheckout">Guest Checkout</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow customers to checkout without creating an account.
                          </p>
                        </div>
                        <Switch id="guestCheckout" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="stockManagement">Stock Management</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable automatic stock management for products.
                          </p>
                        </div>
                        <Switch id="stockManagement" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize the look and feel of your store.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Logo</h3>
                    <div className="flex items-center space-x-4">
                      <div className="h-20 w-20 rounded-md border flex items-center justify-center bg-gray-50">
                        <img src="/placeholder.svg?height=80&width=80" alt="Logo" className="max-h-16 max-w-16" />
                      </div>
                      <Button variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Logo
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border rounded-md p-4 cursor-pointer bg-white">
                        <div className="h-20 bg-blue-600 rounded-md mb-2"></div>
                        <div className="text-center font-medium">Default</div>
                      </div>
                      <div className="border rounded-md p-4 cursor-pointer">
                        <div className="h-20 bg-green-600 rounded-md mb-2"></div>
                        <div className="text-center font-medium">Nature</div>
                      </div>
                      <div className="border rounded-md p-4 cursor-pointer">
                        <div className="h-20 bg-purple-600 rounded-md mb-2"></div>
                        <div className="text-center font-medium">Royal</div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Colors</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="primaryColor">Primary Color</Label>
                        <div className="flex">
                          <Input id="primaryColor" defaultValue="#3B82F6" />
                          <div className="w-10 h-10 ml-2 rounded-md bg-blue-500"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="secondaryColor">Secondary Color</Label>
                        <div className="flex">
                          <Input id="secondaryColor" defaultValue="#10B981" />
                          <div className="w-10 h-10 ml-2 rounded-md bg-green-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure how and when notifications are sent.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="orderConfirmation">Order Confirmation</Label>
                          <p className="text-sm text-muted-foreground">
                            Send email notifications when an order is placed.
                          </p>
                        </div>
                        <Switch id="orderConfirmation" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="orderShipped">Order Shipped</Label>
                          <p className="text-sm text-muted-foreground">
                            Send email notifications when an order is shipped.
                          </p>
                        </div>
                        <Switch id="orderShipped" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="orderDelivered">Order Delivered</Label>
                          <p className="text-sm text-muted-foreground">
                            Send email notifications when an order is delivered.
                          </p>
                        </div>
                        <Switch id="orderDelivered" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="lowStock">Low Stock</Label>
                          <p className="text-sm text-muted-foreground">
                            Send email notifications when product stock is low.
                          </p>
                        </div>
                        <Switch id="lowStock" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">SMS Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="smsOrderConfirmation">Order Confirmation</Label>
                          <p className="text-sm text-muted-foreground">
                            Send SMS notifications when an order is placed.
                          </p>
                        </div>
                        <Switch id="smsOrderConfirmation" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="smsOrderShipped">Order Shipped</Label>
                          <p className="text-sm text-muted-foreground">
                            Send SMS notifications when an order is shipped.
                          </p>
                        </div>
                        <Switch id="smsOrderShipped" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="smsOrderDelivered">Order Delivered</Label>
                          <p className="text-sm text-muted-foreground">
                            Send SMS notifications when an order is delivered.
                          </p>
                        </div>
                        <Switch id="smsOrderDelivered" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Settings</CardTitle>
                  <CardDescription>Configure payment methods and options.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Methods</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="creditCard">Credit/Debit Card</Label>
                          <p className="text-sm text-muted-foreground">Accept payments via credit or debit cards.</p>
                        </div>
                        <Switch id="creditCard" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="paypal">PayPal</Label>
                          <p className="text-sm text-muted-foreground">Accept payments via PayPal.</p>
                        </div>
                        <Switch id="paypal" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="bankTransfer">Bank Transfer</Label>
                          <p className="text-sm text-muted-foreground">Accept payments via bank transfer.</p>
                        </div>
                        <Switch id="bankTransfer" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="cashOnDelivery">Cash on Delivery</Label>
                          <p className="text-sm text-muted-foreground">Accept cash payments upon delivery.</p>
                        </div>
                        <Switch id="cashOnDelivery" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Gateway</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="paymentGateway">Default Payment Gateway</Label>
                        <Select defaultValue="stripe">
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment gateway" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="stripe">Stripe</SelectItem>
                            <SelectItem value="paystack">Paystack</SelectItem>
                            <SelectItem value="flutterwave">Flutterwave</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="apiKey">API Key</Label>
                        <Input id="apiKey" type="password" defaultValue="sk_test_123456789" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="secretKey">Secret Key</Label>
                        <Input id="secretKey" type="password" defaultValue="sk_secret_123456789" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Settings</CardTitle>
                  <CardDescription>Configure shipping methods and options.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Shipping Methods</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="standardShipping">Standard Shipping</Label>
                          <p className="text-sm text-muted-foreground">3-5 business days delivery.</p>
                        </div>
                        <Switch id="standardShipping" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="expressShipping">Express Shipping</Label>
                          <p className="text-sm text-muted-foreground">1-2 business days delivery.</p>
                        </div>
                        <Switch id="expressShipping" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="freeShipping">Free Shipping</Label>
                          <p className="text-sm text-muted-foreground">
                            Free shipping for orders above a certain amount.
                          </p>
                        </div>
                        <Switch id="freeShipping" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Shipping Rates</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="standardRate">Standard Shipping Rate</Label>
                          <Input id="standardRate" defaultValue="1500" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="expressRate">Express Shipping Rate</Label>
                          <Input id="expressRate" defaultValue="3000" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="freeShippingThreshold">Free Shipping Threshold</Label>
                        <Input id="freeShippingThreshold" defaultValue="10000" />
                        <p className="text-xs text-muted-foreground">
                          Orders above this amount qualify for free shipping.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="tax" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Tax Settings</CardTitle>
                  <CardDescription>Configure tax rates and options.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enableTax">Enable Tax Calculation</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically calculate and apply taxes to orders.
                        </p>
                      </div>
                      <Switch id="enableTax" defaultChecked />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="defaultTaxRate">Default Tax Rate (%)</Label>
                      <Input id="defaultTaxRate" defaultValue="7.5" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Tax by Region</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="font-medium">Region</div>
                        <div className="font-medium">Tax Rate (%)</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>Lagos</div>
                        <Input defaultValue="7.5" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>Abuja</div>
                        <Input defaultValue="7.5" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>Rivers</div>
                        <Input defaultValue="7.5" />
                      </div>

                      <Button variant="outline" className="w-full">
                        Add Region
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Users & Permissions</CardTitle>
                  <CardDescription>Manage user accounts and permissions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button>Add New User</Button>

                    <div className="border rounded-md">
                      <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                        <div>User</div>
                        <div>Email</div>
                        <div>Role</div>
                        <div className="text-right">Actions</div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 p-4 border-b">
                        <div>Admin User</div>
                        <div>admin@laundrylab.com</div>
                        <div>Administrator</div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 p-4 border-b">
                        <div>Manager User</div>
                        <div>manager@laundrylab.com</div>
                        <div>Manager</div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 p-4">
                        <div>Staff User</div>
                        <div>staff@laundrylab.com</div>
                        <div>Staff</div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>Connect with third-party services and APIs.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">Google Analytics</h3>
                        <p className="text-sm text-muted-foreground">Track website traffic and user behavior.</p>
                      </div>
                      <Switch id="googleAnalytics" defaultChecked />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="googleAnalyticsId">Tracking ID</Label>
                      <Input id="googleAnalyticsId" defaultValue="UA-123456789-1" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">Facebook Pixel</h3>
                        <p className="text-sm text-muted-foreground">Track conversions from Facebook ads.</p>
                      </div>
                      <Switch id="facebookPixel" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="facebookPixelId">Pixel ID</Label>
                      <Input id="facebookPixelId" placeholder="Enter your Facebook Pixel ID" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">Mailchimp</h3>
                        <p className="text-sm text-muted-foreground">Email marketing automation.</p>
                      </div>
                      <Switch id="mailchimp" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mailchimpApiKey">API Key</Label>
                      <Input id="mailchimpApiKey" placeholder="Enter your Mailchimp API Key" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mailchimpListId">List ID</Label>
                      <Input id="mailchimpListId" placeholder="Enter your Mailchimp List ID" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                  <CardDescription>Configure advanced settings for your store.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">System</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="debugMode">Debug Mode</Label>
                          <p className="text-sm text-muted-foreground">Enable detailed error messages and logging.</p>
                        </div>
                        <Switch id="debugMode" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="caching">Enable Caching</Label>
                          <p className="text-sm text-muted-foreground">
                            Improve performance by caching frequently accessed data.
                          </p>
                        </div>
                        <Switch id="caching" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Database</h3>
                    <Button variant="outline">Export Database</Button>
                    <Button variant="outline">Import Database</Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
                    <div className="border border-red-200 rounded-md p-4 bg-red-50">
                      <h4 className="font-medium mb-2">Reset Store</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        This will reset all store data to default values. This action cannot be undone.
                      </p>
                      <Button variant="destructive">Reset Store</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
