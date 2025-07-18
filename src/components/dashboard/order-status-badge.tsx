import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { DbOrderStatus } from "@/lib/types"

interface OrderStatusBadgeProps {
  status: DbOrderStatus
  className?: string
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const getStatusConfig = (status: DbOrderStatus) => {
    switch (status) {
      case "pending_payment":
        return { label: "Pending Payment", variant: "outline" as const }
      case "pending_pickup":
        return { label: "Pending Pickup", variant: "outline" as const }
      case "processing":
        return { label: "Processing", variant: "secondary" as const }
      case "out_for_delivery":
        return { label: "Out for Delivery", variant: "default" as const }
      case "completed":
        return { label: "Completed", variant: "success" as const }
      case "cancelled":
        return { label: "Cancelled", variant: "destructive" as const }
      default:
        const exhaustiveCheck: never = status;
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
