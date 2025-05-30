import Link from "next/link"
import { ArrowRight, Calendar, MapPin, Package, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for upcoming services
const upcomingServices = [
  {
    id: "SVC-001",
    type: "pickup",
    date: "2023-05-22T10:00:00",
    address: "123 Main Street, Lagos",
    notes: "Please ring the doorbell twice",
  },
  {
    id: "SVC-002",
    type: "delivery",
    date: "2023-05-23T14:00:00",
    address: "123 Main Street, Lagos",
    notes: "",
    orderId: "ORD-12346",
  },
  {
    id: "SVC-003",
    type: "pickup",
    date: "2023-05-25T09:00:00",
    address: "123 Main Street, Lagos",
    notes: "",
  },
]

export function UpcomingServicesList() {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-4">
      {upcomingServices.map((service) => (
        <Card key={service.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-base flex items-center">
                  {service.type === "pickup" ? (
                    <>
                      <Package className="mr-2 h-4 w-4" />
                      Pickup
                    </>
                  ) : (
                    <>
                      <Truck className="mr-2 h-4 w-4" />
                      Delivery
                    </>
                  )}
                </CardTitle>
                <CardDescription>{service.id}</CardDescription>
              </div>
              <Badge variant={service.type === "pickup" ? "outline" : "secondary"}>
                {service.type === "pickup" ? "Pickup" : "Delivery"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-start">
                <Calendar className="mr-2 h-4 w-4 mt-0.5 text-muted-foreground" />
                <span>{formatDate(service.date)}</span>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-2 h-4 w-4 mt-0.5 text-muted-foreground" />
                <span>{service.address}</span>
              </div>
              {service.notes && (
                <div className="text-sm text-muted-foreground mt-2">
                  <strong>Notes:</strong> {service.notes}
                </div>
              )}
              {service.orderId && (
                <div className="text-sm mt-2">
                  <strong>Order:</strong>{" "}
                  <Link href={`/dashboard/orders/${service.orderId}`} className="text-primary hover:underline">
                    {service.orderId}
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/upcoming/${service.id}`}>
                View Details
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            {service.type === "pickup" && (
              <Button variant="ghost" size="sm">
                Reschedule
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}

      <div className="text-center">
        <Button variant="outline" asChild>
          <Link href="/dashboard/upcoming">View Full Schedule</Link>
        </Button>
      </div>
    </div>
  )
}
