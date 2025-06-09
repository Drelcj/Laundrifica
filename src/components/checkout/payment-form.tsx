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
import { processPayment } from "@/src/lib/api"

const paymentSchema = z.object({
  paymentMethod: z.enum(["credit_card", "paypal"]),
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, "Card number must be 16 digits")
    .optional(),
  cardholderName: z.string().min(1, "Cardholder name is required").optional(),
  expiryDate: z
    .string()
    .regex(/^\d{2}\/\d{2}$/, "Expiry date must be in MM/YY format")
    .optional(),
  cvv: z
    .string()
    .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
    .optional(),
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
      paymentMethod: "credit_card",
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
    },
  })

  const paymentMethod = form.watch("paymentMethod")

  const handleSubmit = async (data: z.infer<typeof paymentSchema>) => {
    setIsProcessing(true)
    setPaymentError(null)

    try {
      // Process payment
      const result = await processPayment({
        method: data.paymentMethod,
        amount: total,
        ...data,
      })

      if (result.success) {
        onPaymentComplete({
          type: data.paymentMethod,
          last4: data.cardNumber ? data.cardNumber.slice(-4) : undefined,
          expiryDate: data.expiryDate,
          transactionId: result.transactionId,
        })
      } else {
        setPaymentError(result.error || "Payment processing failed")
      }
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
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>Select your preferred payment method</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2 rounded-md border p-4">
                        <RadioGroupItem value="credit_card" id="credit_card" />
                        <Label htmlFor="credit_card" className="flex items-center">
                          <CreditCardIcon className="mr-2 h-5 w-5" />
                          Credit / Debit Card
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 rounded-md border p-4">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal">PayPal</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {paymentMethod === "credit_card" && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="1234 5678 9012 3456" maxLength={16} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardholderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cardholder Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="John Doe" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="MM/YY" maxLength={5} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" placeholder="123" maxLength={4} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="rounded-md bg-blue-50 p-4 text-center">
                <p className="text-sm text-blue-700">You will be redirected to PayPal to complete your payment.</p>
              </div>
            )}

            {paymentError && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{paymentError}</p>
              </div>
            )}

            <div className="rounded-md bg-gray-50 p-4">
              <div className="flex justify-between">
                <span className="font-medium">Total Amount:</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" disabled={isProcessing} onClick={form.handleSubmit(handleSubmit)}>
          {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
        </Button>
      </CardFooter>
    </Card>
  )
}
