"use client"

import { Calendar, Clock, MapPin, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

// Mock data for upcoming services
const upcomingServices = [
  {
    id: "pickup-1",
    type: "Pickup",
    date: "Tomorrow",
    time: "10:00 AM - 12:00 PM",
    address: "15 Adebayo Street, Lekki Phase 1",
    items: "Estimated 3kg",
    instructions: "Call when arriving",
    status: "confirmed",
  },
  {
    id: "delivery-1",
    type: "Delivery",
    date: "Friday, May 24",
    time: "2:00 PM - 4:00 PM",
    address: "15 Adebayo Street, Lekki Phase 1",
    items: "Order #LDY-2023-0042",
    instructions: "Leave with security if not available",
    status: "scheduled",
  },
  {
    id: "pickup-2",
    type: "Pickup",
    date: "Monday, May 27",
    time: "9:00 AM - 11:00 AM",
    address: "7th Floor, Victoria Island Tower",
    items: "Estimated 2kg",
    instructions: "Office building, 7th floor",
    status: "scheduled",
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
}

export default function UpcomingServicesClient() {
  return (
    <div className="flex flex-col gap-8">
      <motion.div
        className="flex flex-col gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Upcoming Services</h1>
        <p className="text-muted-foreground">View and manage your scheduled pickups and deliveries.</p>
      </motion.div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pickups">Pickups</TabsTrigger>
          <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <motion.div className="grid gap-4" variants={containerVariants} initial="hidden" animate="visible">
            {upcomingServices.map((service) => (
              <motion.div key={service.id} variants={itemVariants}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center">
                      <div
                        className={`mr-4 rounded-full p-2 ${
                          service.type === "Pickup" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                        }`}
                      >
                        {service.type === "Pickup" ? <Package className="h-5 w-5" /> : <Package className="h-5 w-5" />}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.type}</CardTitle>
                        <CardDescription>{service.date}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={service.status === "confirmed" ? "default" : "outline"}>
                      {service.status === "confirmed" ? "Confirmed" : "Scheduled"}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span>{service.time}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span>{service.address}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Package className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span>{service.items}</span>
                    </div>
                    {service.instructions && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        <strong>Instructions:</strong> {service.instructions}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      Cancel
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
        <TabsContent value="pickups" className="space-y-4">
          <motion.div className="grid gap-4" variants={containerVariants} initial="hidden" animate="visible">
            {upcomingServices
              .filter((service) => service.type === "Pickup")
              .map((service) => (
                <motion.div key={service.id} variants={itemVariants}>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="flex items-center">
                        <div className="mr-4 rounded-full p-2 bg-blue-100 text-blue-700">
                          <Package className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{service.type}</CardTitle>
                          <CardDescription>{service.date}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={service.status === "confirmed" ? "default" : "outline"}>
                        {service.status === "confirmed" ? "Confirmed" : "Scheduled"}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span>{service.time}</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span>{service.address}</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Package className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span>{service.items}</span>
                      </div>
                      {service.instructions && (
                        <div className="mt-2 text-sm text-muted-foreground">
                          <strong>Instructions:</strong> {service.instructions}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        Cancel
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
          </motion.div>
        </TabsContent>
        <TabsContent value="deliveries" className="space-y-4">
          <motion.div className="grid gap-4" variants={containerVariants} initial="hidden" animate="visible">
            {upcomingServices
              .filter((service) => service.type === "Delivery")
              .map((service) => (
                <motion.div key={service.id} variants={itemVariants}>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="flex items-center">
                        <div className="mr-4 rounded-full p-2 bg-green-100 text-green-700">
                          <Package className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{service.type}</CardTitle>
                          <CardDescription>{service.date}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={service.status === "confirmed" ? "default" : "outline"}>
                        {service.status === "confirmed" ? "Confirmed" : "Scheduled"}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span>{service.time}</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span>{service.address}</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Package className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span>{service.items}</span>
                      </div>
                      {service.instructions && (
                        <div className="mt-2 text-sm text-muted-foreground">
                          <strong>Instructions:</strong> {service.instructions}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        Cancel
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
          </motion.div>
        </TabsContent>
      </Tabs>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>View all your upcoming services on a calendar</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center p-6">
            <div className="w-full max-w-md">
              <Calendar className="h-64 w-full text-primary opacity-50" />
              <div className="mt-4 text-center text-sm text-muted-foreground">Calendar view coming soon</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Schedule New Service
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
