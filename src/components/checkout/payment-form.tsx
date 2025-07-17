"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CreditCardIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { processPayment } from "@/lib/api"

const paymentSchema = z.object({
  paymentMethod: z.literal("pay_on_delivery"),
})

interface PaymentFormProps {
  total: number
  onPaymentComplete: (paymentDetails: any) => void
}

export function PaymentForm({ total, onPaymentComplete }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "pay_on_delivery",
    },
  })

  const paymentMethod = "pay_on_delivery"

  const handleSubmit = async (data: z.infer<typeof paymentSchema>) => {
    setIsProcessing(true)
    setPaymentError(null)
    try {
      // Only pay on delivery is allowed
      onPaymentComplete({ type: "pay_on_delivery" })
    } catch (error) {
      setPaymentError("An unexpected error occurred")
      console.error("Payment error:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pay on Delivery</CardTitle>
        <CardDescription>Only pay when your order is delivered. No online payment required.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="rounded-md bg-green-50 p-4 text-center">
              <p className="text-sm text-green-700">You will pay for your order upon delivery. No payment is required now.</p>
            </div>
            {paymentError && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{paymentError}</p>
              </div>
            )}
            <div className="rounded-md bg-gray-50 p-4">
              <div className="flex justify-between">
                <span className="font-medium">Total Amount:</span>
                <span className="font-bold">₦{total.toLocaleString()}</span>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" disabled={isProcessing} onClick={form.handleSubmit(handleSubmit)}>
          {isProcessing ? "Processing..." : `Place Order`}
        </Button>
      </CardFooter>
    </Card>
  )
}
