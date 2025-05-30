"use client"

import { Check, Crown, Shield, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

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

export default function MembershipClientPage() {
  return (
    <div className="flex flex-col gap-8">
      <motion.div
        className="flex flex-col gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Membership</h1>
        <p className="text-muted-foreground">Manage your membership plan and subscription details.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Standard Plan</CardTitle>
                <CardDescription className="text-blue-100">Active since January 15, 2023</CardDescription>
              </div>
              <div className="rounded-full bg-white/20 p-2">
                <Star className="h-6 w-6 text-yellow-300" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Billing Cycle</span>
                <Badge variant="outline">Monthly</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Next Billing Date</span>
                <span className="text-sm">June 15, 2023</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Monthly Fee</span>
                <span className="text-sm font-bold">₦5,000</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Current Benefits</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Scheduled pickups (Mon, Wed, Fri, Sun)</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Standard processing techniques</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>24/7 customer support</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Regular pricing</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 bg-muted/50 p-6">
            <div className="w-full">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Membership Status</span>
                <Badge>Active</Badge>
              </div>
              <Progress value={33} className="h-2 w-full" />
              <p className="mt-2 text-xs text-muted-foreground">4 months as a member. 8 more months until Gold tier.</p>
            </div>
            <Button className="w-full">Upgrade to Premium</Button>
          </CardFooter>
        </Card>
      </motion.div>

      <Tabs defaultValue="plans" className="space-y-4">
        <TabsList>
          <TabsTrigger value="plans">Available Plans</TabsTrigger>
          <TabsTrigger value="history">Billing History</TabsTrigger>
        </TabsList>
        <TabsContent value="plans" className="space-y-4">
          <motion.div
            className="grid gap-4 md:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Card className="border-2 border-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Premium Plan</CardTitle>
                      <CardDescription>For frequent laundry needs</CardDescription>
                    </div>
                    <div className="rounded-full bg-primary/10 p-2">
                      <Crown className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">₦12,000</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Unlimited pickups and deliveries</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Premium processing techniques</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Priority customer support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>15% discount on all services</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Free stain removal</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Upgrade Now</Button>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Family Plan</CardTitle>
                      <CardDescription>For households with high volume</CardDescription>
                    </div>
                    <div className="rounded-full bg-primary/10 p-2">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">₦20,000</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>All Premium Plan benefits</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Up to 25kg of laundry per week</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Multiple pickup locations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>25% discount on all services</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Dedicated account manager</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>Your recent payments and invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
                <motion.div variants={itemVariants} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Standard Plan - Monthly</p>
                    <p className="text-sm text-muted-foreground">May 15, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₦5,000</p>
                    <Badge variant="outline" className="ml-2">
                      Paid
                    </Badge>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Standard Plan - Monthly</p>
                    <p className="text-sm text-muted-foreground">April 15, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₦5,000</p>
                    <Badge variant="outline" className="ml-2">
                      Paid
                    </Badge>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Standard Plan - Monthly</p>
                    <p className="text-sm text-muted-foreground">March 15, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₦5,000</p>
                    <Badge variant="outline" className="ml-2">
                      Paid
                    </Badge>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Standard Plan - Monthly</p>
                    <p className="text-sm text-muted-foreground">February 15, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₦5,000</p>
                    <Badge variant="outline" className="ml-2">
                      Paid
                    </Badge>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Standard Plan - Monthly</p>
                    <p className="text-sm text-muted-foreground">January 15, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₦5,000</p>
                    <Badge variant="outline" className="ml-2">
                      Paid
                    </Badge>
                  </div>
                </motion.div>
              </motion.div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Download All Invoices
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
