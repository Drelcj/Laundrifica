import { Badge } from "@/components/ui/badge"
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

interface OrderStatusBadgeProps {
  status: OrderStatus
  className?: string
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return { label: "Pending", variant: "outline" as const }
      case "acknowledged":
        return { label: "Acknowledged", variant: "outline" as const }
      case "pickup-scheduled":
        return { label: "Pickup Scheduled", variant: "outline" as const }
      case "pickup-in-progress":
        return { label: "Pickup In Progress", variant: "secondary" as const }
      case "received":
        return { label: "Received", variant: "secondary" as const }
      case "processing":
        return { label: "Processing", variant: "secondary" as const }
      case "ready-for-delivery":
        return { label: "Ready for Delivery", variant: "default" as const }
      case "delivery-in-progress":
        return { label: "Delivery In Progress", variant: "default" as const }
      case "delivered":
        return { label: "Delivered", variant: "success" as const }
      case "cancelled":
        return { label: "Cancelled", variant: "destructive" as const }
      default:
        return { label: "Unknown", variant: "outline" as const }
    }
  }

  const config = getStatusConfig(status)

  return (
    <Badge variant={config.variant} className={cn(className)}>
      {config.label}
    </Badge>
  )
}
