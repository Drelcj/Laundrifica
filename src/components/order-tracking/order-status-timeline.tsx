import { CheckCircle, Clock, Package, Truck, Home } from "lucide-react"
import { cn } from "@/src/lib/utils"
import type { Order } from "@/src/lib/types"

interface OrderStatusTimelineProps {
  order: Order
}

export function OrderStatusTimeline({ order }: OrderStatusTimelineProps) {
  const statusSteps = [
    { key: "pending", label: "Order Placed", icon: Clock, date: order.createdAt },
    { key: "processing", label: "Processing", icon: Package, date: getStatusDate(order, "processing") },
    { key: "shipped", label: "Shipped", icon: Truck, date: getStatusDate(order, "shipped") },
    { key: "delivered", label: "Delivered", icon: Home, date: getStatusDate(order, "delivered") },
  ]

  // Find the current step index
  const currentStepIndex = statusSteps.findIndex((step) => step.key === order.status)

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Order Status</h3>
      <div className="relative">
        {/* Progress line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-muted" />

        {/* Status steps */}
        <div className="space-y-8">
          {statusSteps.map((step, index) => {
            const isCompleted = index <= currentStepIndex
            const isCurrent = index === currentStepIndex
            const isPending = index > currentStepIndex

            return (
              <div key={step.key} className="relative flex items-start">
                <div
                  className={cn("relative z-10 flex items-center justify-center w-12 h-12 rounded-full", {
                    "bg-primary text-primary-foreground": isCompleted,
                    "bg-muted text-muted-foreground": isPending,
                  })}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <step.icon className={cn("h-6 w-6", { "opacity-50": isPending })} />
                  )}
                </div>
                <div className="ml-4 min-w-0 flex-1">
                  <div className="flex justify-between">
                    <div
                      className={cn("text-sm font-medium", {
                        "text-foreground": isCompleted || isCurrent,
                        "text-muted-foreground": isPending,
                      })}
                    >
                      {step.label}
                    </div>
                    {step.date && (
                      <div
                        className={cn("text-sm", {
                          "text-foreground": isCompleted,
                          "text-muted-foreground": isCurrent || isPending,
                        })}
                      >
                        {formatDate(step.date)}
                      </div>
                    )}
                  </div>
                  {isCurrent && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {getStatusMessage(order.status, order.shippingInfo)}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Helper functions
function getStatusDate(order: Order, status: string): string | null {
  if (!order.shippingInfo?.updates) return null

  const statusUpdate = order.shippingInfo.updates.find((update) => update.status === status)
  return statusUpdate?.timestamp || null
}

function formatDate(dateString: string): string {
  if (!dateString) return ""
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function getStatusMessage(status: string, shippingInfo?: any): string {
  switch (status) {
    case "pending":
      return "Your order has been received and is being prepared."
    case "processing":
      return "Your order is being processed and packed for shipping."
    case "shipped":
      return shippingInfo?.trackingNumber
        ? `Your order is on its way. Tracking number: ${shippingInfo.trackingNumber}`
        : "Your order has been shipped and is on its way."
    case "delivered":
      return "Your order has been delivered. Thank you for shopping with us!"
    case "cancelled":
      return "Your order has been cancelled."
    default:
      return "Status update not available."
  }
}
