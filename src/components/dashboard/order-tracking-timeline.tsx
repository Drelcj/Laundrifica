import { Check, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

type OrderStatus =
  | "pending"
  | "acknowledged"
  | "pickup-scheduled"
  | "pickup-in-progress"
  | "received"
  | "processing"
  | "ready-for-delivery"
  | "delivery-in-progress"
  | "delivered"
  | "cancelled"

interface OrderTrackingTimelineProps {
  status: OrderStatus
  className?: string
}

export function OrderTrackingTimeline({ status, className }: OrderTrackingTimelineProps) {
  // Define all possible statuses in order
  const allStatuses = [
    { key: "acknowledged", label: "Acknowledged" },
    { key: "pickup-in-progress", label: "Pickup on the way" },
    { key: "received", label: "Items received" },
    { key: "processing", label: "Processing" },
    { key: "ready-for-delivery", label: "Ready for delivery" },
    { key: "delivery-in-progress", label: "On the way to you" },
    { key: "delivered", label: "Delivered" },
  ]

  // Find the index of the current status
  const currentStatusIndex = allStatuses.findIndex((s) => s.key === status)

  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-3.5 top-0 h-full w-px bg-muted"></div>
      <ul className="space-y-4">
        {allStatuses.map((s, index) => {
          const isCompleted = index <= currentStatusIndex
          const isCurrent = index === currentStatusIndex

          return (
            <li key={s.key} className="relative pl-9">
              <div
                className={cn(
                  "absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border",
                  isCompleted ? "border-primary bg-primary text-primary-foreground" : "border-muted bg-background",
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : <Clock className="h-4 w-4 text-muted-foreground" />}
              </div>
              <div
                className={cn(
                  "text-sm",
                  isCurrent ? "font-medium text-foreground" : isCompleted ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {s.label}
                {isCurrent && <span className="ml-2 text-xs text-primary">• Current</span>}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
