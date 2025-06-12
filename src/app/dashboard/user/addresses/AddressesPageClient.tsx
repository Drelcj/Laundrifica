"use client"

import { Home, MapPin, Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

// Mock data for addresses
const addresses = [
  {
    id: "addr-1",
    name: "Home",
    address: "15 Adebayo Street, Lekki Phase 1",
    city: "Lagos",
    state: "Lagos State",
    isDefault: true,
  },
  {
    id: "addr-2",
    name: "Office",
    address: "7th Floor, Victoria Island Tower, Adeola Odeku Street",
    city: "Lagos",
    state: "Lagos State",
    isDefault: false,
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

export default function AddressesPageClient() {
  return (
    <div className="flex flex-col gap-8">
      <motion.div
        className="flex flex-col gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Address Book</h1>
        <p className="text-muted-foreground">Manage your pickup and delivery addresses.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-end"
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Address
        </Button>
      </motion.div>

      <motion.div className="grid gap-4 md:grid-cols-2" variants={containerVariants} initial="hidden" animate="visible">
        {addresses.map((address) => (
          <motion.div key={address.id} variants={itemVariants}>
            <Card className={address.isDefault ? "border-primary" : ""}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  {address.name === "Home" ? <Home className="mr-2 h-4 w-4" /> : <MapPin className="mr-2 h-4 w-4" />}
                  {address.name}
                </CardTitle>
                {address.isDefault && (
                  <Badge variant="outline" className="ml-2">
                    Default
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-sm">{address.address}</p>
                  <p className="text-sm">
                    {address.city}, {address.state}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <div className="space-x-2">
                  {!address.isDefault && (
                    <Button variant="outline" size="sm">
                      Set as Default
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <Card className="border-dashed flex flex-col items-center justify-center p-6 h-[200px]">
            <Button variant="ghost" className="h-full w-full flex flex-col gap-2">
              <Plus className="h-8 w-8" />
              <span>Add New Address</span>
            </Button>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Delivery Preferences</CardTitle>
            <CardDescription>Set your default delivery options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Preferred Delivery Days</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer">
                  Monday
                </Badge>
                <Badge variant="outline" className="cursor-pointer">
                  Tuesday
                </Badge>
                <Badge className="cursor-pointer">Wednesday</Badge>
                <Badge variant="outline" className="cursor-pointer">
                  Thursday
                </Badge>
                <Badge className="cursor-pointer">Friday</Badge>
                <Badge variant="outline" className="cursor-pointer">
                  Saturday
                </Badge>
                <Badge variant="outline" className="cursor-pointer">
                  Sunday
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Preferred Time Slots</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer">
                  Morning (8AM - 12PM)
                </Badge>
                <Badge className="cursor-pointer">Afternoon (12PM - 4PM)</Badge>
                <Badge variant="outline" className="cursor-pointer">
                  Evening (4PM - 8PM)
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Special Instructions</h3>
              <p className="text-sm text-muted-foreground">
                Call before delivery. Leave with security if I'm not available.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Update Delivery Preferences
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
