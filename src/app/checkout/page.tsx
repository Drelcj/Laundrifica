"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircleIcon } from "lucide-react"
import { useCartStore } from "@/lib/cart"
import type { OrderAddress } from "@/lib/types"
import { createOrder, calculateTax } from "@/lib/api"
import { AddressForm } from "@/components/checkout/address-form"
import { ShippingMethodSelector } from "@/components/checkout/shipping-method-selector"
import { PaymentForm } from "@/components/checkout/payment-form"
import { OrderSummary } from "@/components/checkout/order-summary"
import { Steps, Step } from "@/components/ui/steps"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Shipping methods
const SHIPPING_METHODS = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "Delivery in 3-5 business days",
    price: 5.99,
    estimatedDelivery: "3-5 business days",
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "Delivery in 1-2 business days",
    price: 12.99,
    estimatedDelivery: "1-2 business days",
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    description: "Next day delivery",
    price: 19.99,
    estimatedDelivery: "Next business day",
  },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useCartStore()

  const [currentStep, setCurrentStep] = useState(0)
  const [shippingAddress, setShippingAddress] = useState<OrderAddress | null>(null)
  const [billingAddress, setBillingAddress] = useState<OrderAddress | null>(null)
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(SHIPPING_METHODS[0].id)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Calculate shipping cost based on selected method
  const shippingCost = SHIPPING_METHODS.find((method) => method.id === selectedShippingMethod)?.price || 0

  // Update cart with shipping cost
  React.useEffect(() => {
    if (cart.shipping !== shippingCost) {
      // Update cart shipping cost
      // This would typically update the cart state
    }
  }, [shippingCost, cart.shipping])

  const handleShippingAddressSubmit = async (address: OrderAddress) => {
    setShippingAddress(address)

    // Calculate tax based on shipping address
    try {
      const taxAmount = await calculateTax(cart.subtotal, address.state)
      // Update cart tax amount
      // This would typically update the cart state
    } catch (error) {
      console.error("Error calculating tax:", error)
    }

    // Move to next step
    setCurrentStep(1)
  }

  const handleBillingAddressSubmit = (address: OrderAddress) => {
    setBillingAddress(address)
    setCurrentStep(2)
  }

  const handleSameAsShipping = () => {
    if (shippingAddress) {
      setBillingAddress(shippingAddress)
      setCurrentStep(2)
    }
  }

  const handleShippingMethodSelect = (methodId: string) => {
    setSelectedShippingMethod(methodId)
  }

  const handlePaymentComplete = async (paymentDetails: any) => {
    setIsLoading(true)

    try {
      // Create order
      const order = await createOrder({
        items: cart.items,
        shippingAddress: shippingAddress!,
        billingAddress: billingAddress!,
        paymentMethod: paymentDetails,
        subtotal: cart.subtotal,
        tax: cart.tax,
        shipping: shippingCost,
        total: cart.subtotal + cart.tax + shippingCost,
        email: "customer@example.com", // In a real app, this would come from the user's account or checkout form
      })

      // Set order ID and mark as complete
      setOrderId(order.id)
      setOrderComplete(true)

      // Clear cart
      clearCart()

      // Move to confirmation step
      setCurrentStep(3)
    } catch (error) {
      console.error("Error creating order:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleContinueShopping = () => {
    router.push("/products")
  }

  const handleViewOrder = () => {
    if (orderId) {
      router.push(`/dashboard/orders/${orderId}`)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="mb-8">
        <Steps currentStep={currentStep} className="mb-8">
          <Step title="Shipping" />
          <Step title="Billing" />
          <Step title="Payment" />
          <Step title="Confirmation" />
        </Steps>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {currentStep === 0 && (
            <Card>
              <CardContent className="pt-6">
                <AddressForm type="shipping" onSubmit={handleShippingAddressSubmit} />
              </CardContent>
            </Card>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <AddressForm
                    type="billing"
                    initialData={billingAddress || undefined}
                    onSubmit={handleBillingAddressSubmit}
                    onSameAsShipping={handleSameAsShipping}
                    showSameAsShipping={true}
                  />
                </CardContent>
              </Card>

              <ShippingMethodSelector
                methods={SHIPPING_METHODS}
                selectedMethod={selectedShippingMethod}
                onSelect={handleShippingMethodSelect}
              />

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(0)}>
                  Back to Shipping
                </Button>
                <Button onClick={() => setCurrentStep(2)} disabled={!billingAddress}>
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <PaymentForm total={cart.subtotal + cart.tax + shippingCost} onPaymentComplete={handlePaymentComplete} />

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Back to Billing
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && orderComplete && (
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="flex flex-col items-center space-y-4 py-8">
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircleIcon className="h-12 w-12 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold">Order Confirmed!</h2>
                  <p className="text-gray-500">
                    Thank you for your order. Your order number is <span className="font-medium">{orderId}</span>.
                  </p>
                  <p className="text-gray-500">We've sent a confirmation email to your email address.</p>

                  <div className="flex space-x-4 mt-6">
                    <Button variant="outline" onClick={handleContinueShopping}>
                      Continue Shopping
                    </Button>
                    <Button onClick={handleViewOrder}>View Order</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <OrderSummary
            items={cart.items}
            subtotal={cart.subtotal}
            tax={cart.tax}
            shipping={shippingCost}
            total={cart.subtotal + cart.tax + shippingCost}
          />
        </div>
      </div>
    </div>
  )
}
