"use client"

import { Copy, Gift, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

// Mock data for vouchers
const vouchers = [
  {
    id: "VOUCHER-001",
    code: "REFUND50",
    amount: "₦5,000",
    expiryDate: "June 30, 2023",
    isActive: true,
    remainingAmount: 5000,
    originalAmount: 5000,
  },
  {
    id: "VOUCHER-002",
    code: "COMPENSATION25",
    amount: "₦2,500",
    expiryDate: "July 15, 2023",
    isActive: true,
    remainingAmount: 1200,
    originalAmount: 2500,
  },
  {
    id: "VOUCHER-003",
    code: "WELCOME20",
    amount: "₦2,000",
    expiryDate: "May 1, 2023",
    isActive: false,
    remainingAmount: 0,
    originalAmount: 2000,
  },
]

export default function VouchersClientPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Vouchers & Refunds</h1>
        <p className="text-muted-foreground">Manage your vouchers, refunds, and promotional credits.</p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          Vouchers can be used during checkout. Refund vouchers are issued for service issues and have a longer validity
          period.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {vouchers.map((voucher) => (
          <Card key={voucher.id} className={!voucher.isActive ? "opacity-70" : ""}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{voucher.amount} Voucher</CardTitle>
                {voucher.isActive ? (
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-100 text-gray-800">
                    Expired
                  </Badge>
                )}
              </div>
              <CardDescription>Code: {voucher.code}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Remaining Balance:</span>
                <span className="font-medium">₦{voucher.remainingAmount.toLocaleString()}</span>
              </div>
              <Progress value={(voucher.remainingAmount / voucher.originalAmount) * 100} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {voucher.isActive ? (
                  <span>Expires on {voucher.expiryDate}</span>
                ) : (
                  <span>Expired on {voucher.expiryDate}</span>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                disabled={!voucher.isActive}
                onClick={() => {
                  navigator.clipboard.writeText(voucher.code)
                }}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Code
              </Button>
            </CardFooter>
          </Card>
        ))}

        <Card className="border-dashed flex flex-col items-center justify-center p-6">
          <Gift className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No More Vouchers</h3>
          <p className="text-sm text-muted-foreground text-center mb-4">
            You'll receive vouchers for refunds, compensation, or special promotions.
          </p>
          <Button variant="outline" size="sm">
            View Current Promotions
          </Button>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Refund History</CardTitle>
          <CardDescription>History of refunds and compensations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <p className="font-medium">Refund for Order #LDY-2023-0037</p>
                <p className="text-sm text-muted-foreground">Missing item compensation</p>
                <p className="text-xs text-muted-foreground">May 10, 2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium">₦5,000</p>
                <Badge variant="outline" className="mt-1">
                  Voucher Issued
                </Badge>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <p className="font-medium">Refund for Order #LDY-2023-0028</p>
                <p className="text-sm text-muted-foreground">Delayed delivery compensation</p>
                <p className="text-xs text-muted-foreground">April 22, 2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium">₦2,500</p>
                <Badge variant="outline" className="mt-1">
                  Voucher Issued
                </Badge>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <p className="font-medium">Refund for Order #LDY-2023-0015</p>
                <p className="text-sm text-muted-foreground">Service quality compensation</p>
                <p className="text-xs text-muted-foreground">March 15, 2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium">₦3,750</p>
                <Badge variant="outline" className="bg-green-100 text-green-800 mt-1">
                  Cash Refunded
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
