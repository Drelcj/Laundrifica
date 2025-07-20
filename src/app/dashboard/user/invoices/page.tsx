import type { Metadata } from "next"
import { Download, FileText, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Invoices | LaundryLab Dashboard",
  description: "View and download your invoices",
}

// Mock data for invoices
const invoices = [
  {
    id: "INV-2023-0042",
    orderId: "LDY-2023-0042",
    date: "May 15, 2023",
    amount: "₦12,500",
    status: "Paid",
  },
  {
    id: "INV-2023-0039",
    orderId: "LDY-2023-0039",
    date: "May 8, 2023",
    amount: "₦8,750",
    status: "Paid",
  },
  {
    id: "INV-2023-0035",
    orderId: "LDY-2023-0035",
    date: "May 1, 2023",
    amount: "₦15,200",
    status: "Paid",
  },
  {
    id: "INV-2023-0030",
    orderId: "LDY-2023-0030",
    date: "April 24, 2023",
    amount: "₦9,800",
    status: "Paid",
  },
  {
    id: "INV-2023-0025",
    orderId: "LDY-2023-0025",
    date: "April 17, 2023",
    amount: "₦11,350",
    status: "Paid",
  },
]

export default function InvoicesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Invoices & Receipts</h1>
        <p className="text-muted-foreground">View and download your invoices and receipts.</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search invoices..." className="pl-8" />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>View and download your recent invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.orderId}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tax Documents</CardTitle>
          <CardDescription>Annual tax documents and statements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div className="flex items-center">
                <FileText className="mr-4 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Annual Statement 2023</p>
                  <p className="text-sm text-muted-foreground">January 1, 2023 - December 31, 2023</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div className="flex items-center">
                <FileText className="mr-4 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Annual Statement 2022</p>
                  <p className="text-sm text-muted-foreground">January 1, 2022 - December 31, 2022</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
