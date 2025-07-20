import type { Metadata } from "next"
import { CreditCard, Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Payment Methods | LaundryLab Dashboard",
  description: "Manage your payment methods",
}

// Mock data for payment methods
const paymentMethods = [
  {
    id: "card-1",
    type: "Visa",
    last4: "4242",
    expiry: "05/25",
    isDefault: true,
  },
  {
    id: "card-2",
    type: "Mastercard",
    last4: "5555",
    expiry: "08/24",
    isDefault: false,
  },
]

export default function PaymentMethodsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Payment Methods</h1>
        <p className="text-muted-foreground">Manage your payment methods for LaundryLab services.</p>
      </div>

      <div className="flex justify-end">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Payment Method
        </Button>
      </div>

      <Tabs defaultValue="cards" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="bank-accounts">Bank Accounts</TabsTrigger>
          <TabsTrigger value="wallets">Digital Wallets</TabsTrigger>
        </TabsList>
        <TabsContent value="cards" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {paymentMethods.map((method) => (
              <Card key={method.id} className={method.isDefault ? "border-primary" : ""}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {method.type} •••• {method.last4}
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">Expires {method.expiry}</div>
                  {method.isDefault && (
                    <Badge variant="outline" className="mt-2">
                      Default
                    </Badge>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  {!method.isDefault && (
                    <Button variant="outline" size="sm">
                      Set as Default
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}

            <Card className="border-dashed flex flex-col items-center justify-center p-6 h-[180px]">
              <Button variant="ghost" className="h-full w-full flex flex-col gap-2">
                <Plus className="h-8 w-8" />
                <span>Add New Card</span>
              </Button>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="bank-accounts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bank Accounts</CardTitle>
              <CardDescription>Connect your bank accounts for direct payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>You haven't added any bank accounts yet.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Bank Account
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="wallets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Digital Wallets</CardTitle>
              <CardDescription>Connect digital payment services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>You haven't connected any digital wallets yet.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Connect Digital Wallet
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Recent payments for LaundryLab services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <p className="font-medium">Order #LDY-2023-0042</p>
                <p className="text-sm text-muted-foreground">May 15, 2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium">₦12,500</p>
                <p className="text-xs text-muted-foreground">Visa •••• 4242</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <p className="font-medium">Order #LDY-2023-0039</p>
                <p className="text-sm text-muted-foreground">May 8, 2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium">₦8,750</p>
                <p className="text-xs text-muted-foreground">Mastercard •••• 5555</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <p className="font-medium">Order #LDY-2023-0035</p>
                <p className="text-sm text-muted-foreground">May 1, 2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium">₦15,200</p>
                <p className="text-xs text-muted-foreground">Visa •••• 4242</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
