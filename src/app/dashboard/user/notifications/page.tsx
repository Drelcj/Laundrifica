import type { Metadata } from "next"
import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Notification Preferences | Laundrify Dashboard",
  description: "Manage your notification settings",
}

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Notification Preferences</h1>
        <p className="text-muted-foreground">Manage how and when you receive notifications from Laundrify.</p>
      </div>

      <Tabs defaultValue="channels" className="space-y-4">
        <TabsList>
          <TabsTrigger value="channels">Notification Channels</TabsTrigger>
          <TabsTrigger value="types">Notification Types</TabsTrigger>
          <TabsTrigger value="history">Notification History</TabsTrigger>
        </TabsList>
        <TabsContent value="channels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Communication Channels</CardTitle>
              <CardDescription>Choose how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-4">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-4">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                  </div>
                </div>
                <Switch id="sms-notifications" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-4">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                  </div>
                </div>
                <Switch id="push-notifications" />
              </div>
              <Separator />
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-4">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">WhatsApp Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via WhatsApp</p>
                  </div>
                </div>
                <Switch id="whatsapp-notifications" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="types" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Updates</CardTitle>
              <CardDescription>Notifications related to your laundry orders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="order-confirmation" className="flex-1">
                    Order Confirmation
                  </Label>
                  <Switch id="order-confirmation" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="pickup-reminder" className="flex-1">
                    Pickup Reminders
                  </Label>
                  <Switch id="pickup-reminder" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="status-updates" className="flex-1">
                    Status Updates
                  </Label>
                  <Switch id="status-updates" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="delivery-notification" className="flex-1">
                    Delivery Notifications
                  </Label>
                  <Switch id="delivery-notification" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="payment-confirmation" className="flex-1">
                    Payment Confirmations
                  </Label>
                  <Switch id="payment-confirmation" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Marketing & Promotions</CardTitle>
              <CardDescription>Notifications about offers and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="special-offers" className="flex-1">
                    Special Offers & Discounts
                  </Label>
                  <Switch id="special-offers" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="new-services" className="flex-1">
                    New Services Announcements
                  </Label>
                  <Switch id="new-services" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="newsletters" className="flex-1">
                    Newsletters
                  </Label>
                  <Switch id="newsletters" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="feedback-requests" className="flex-1">
                    Feedback Requests
                  </Label>
                  <Switch id="feedback-requests" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Your notification history for the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 border rounded-lg">
                  <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium">Your order #LDY-2023-0042 has been delivered</p>
                    <p className="text-sm text-muted-foreground">
                      Your laundry has been delivered to your home address. Thank you for using Laundrify!
                    </p>
                    <p className="text-xs text-muted-foreground">May 15, 2023 • 2:45 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 border rounded-lg">
                  <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium">Your order #LDY-2023-0042 is out for delivery</p>
                    <p className="text-sm text-muted-foreground">
                      Your laundry is on its way to you. Estimated delivery time: 2:30 PM - 3:30 PM.
                    </p>
                    <p className="text-xs text-muted-foreground">May 15, 2023 • 1:30 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 border rounded-lg">
                  <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium">Your order #LDY-2023-0042 is ready for delivery</p>
                    <p className="text-sm text-muted-foreground">
                      Your laundry has been processed and is ready for delivery. We'll notify you when it's on the way.
                    </p>
                    <p className="text-xs text-muted-foreground">May 15, 2023 • 11:15 AM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 border rounded-lg">
                  <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium">Special Offer: 20% off your next order!</p>
                    <p className="text-sm text-muted-foreground">
                      Use code CLEAN20 on your next order to get 20% off. Valid until May 31, 2023.
                    </p>
                    <p className="text-xs text-muted-foreground">May 12, 2023 • 9:00 AM</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Notifications
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
