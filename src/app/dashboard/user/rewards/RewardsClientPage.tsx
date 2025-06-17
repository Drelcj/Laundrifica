"use client"

import { Gift, Star, Zap } from "lucide-react"
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
      type: "spring" as "spring",
      stiffness: 100,
    },
  },
}

export default function RewardsClientPage() {
  return (
    <div className="flex flex-col gap-8">
      <motion.div
        className="flex flex-col gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Rewards</h1>
        <p className="text-muted-foreground">Earn and redeem points for discounts and free services.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="grid gap-4 md:grid-cols-2"
      >
        <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="text-xl text-white">Loyalty Points</CardTitle>
            <CardDescription className="text-blue-100">Earn 10 points for every ₦1,000 spent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <div className="text-center">
                <div className="text-5xl font-bold">450</div>
                <div className="mt-1 text-sm text-blue-100">Current Points</div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Next Reward: 500 points</span>
                <span>50 points to go</span>
              </div>
              <Progress value={90} className="h-2 w-full bg-white/20" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full">
              Redeem Points
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Membership Tier</CardTitle>
            <CardDescription>Your current tier and benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-blue-100 p-3">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-lg font-medium">Silver Member</p>
                <p className="text-sm text-muted-foreground">Since January 2023</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress to Gold</span>
                <span>4/12 months</span>
              </div>
              <Progress value={33} className="h-2 w-full" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Tier Benefits
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <Tabs defaultValue="available" className="space-y-4">
        <TabsList>
          <TabsTrigger value="available">Available Rewards</TabsTrigger>
          <TabsTrigger value="redeemed">Redeemed Rewards</TabsTrigger>
          <TabsTrigger value="history">Points History</TabsTrigger>
        </TabsList>
        <TabsContent value="available" className="space-y-4">
          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">₦500 Discount</CardTitle>
                    <Badge>500 Points</Badge>
                  </div>
                  <CardDescription>Apply to your next order</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Gift className="h-10 w-10 text-primary" />
                    <p className="text-sm">Get ₦500 off your next laundry order. No minimum spend required.</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" disabled>
                    Need 50 More Points
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Free Delivery</CardTitle>
                    <Badge>300 Points</Badge>
                  </div>
                  <CardDescription>One free delivery</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-10 w-10 text-primary" />
                    <p className="text-sm">Redeem for one free delivery on your next order.</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Redeem Now</Button>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Free Ironing</CardTitle>
                    <Badge>250 Points</Badge>
                  </div>
                  <CardDescription>Up to 5 items</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Gift className="h-10 w-10 text-primary" />
                    <p className="text-sm">Get free ironing service for up to 5 items on your next order.</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Redeem Now</Button>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">10% Discount</CardTitle>
                    <Badge>800 Points</Badge>
                  </div>
                  <CardDescription>On any order</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-10 w-10 text-primary" />
                    <p className="text-sm">Get 10% off your entire order. Valid for 30 days after redemption.</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" disabled>
                    Need 350 More Points
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Free Dry Cleaning</CardTitle>
                    <Badge>1000 Points</Badge>
                  </div>
                  <CardDescription>One item</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Gift className="h-10 w-10 text-primary" />
                    <p className="text-sm">Redeem for one free dry cleaning service for any garment.</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" disabled>
                    Need 550 More Points
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Premium Upgrade</CardTitle>
                    <Badge>2000 Points</Badge>
                  </div>
                  <CardDescription>One month free</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Star className="h-10 w-10 text-primary" />
                    <p className="text-sm">Upgrade to Premium membership for one month at no cost.</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" disabled>
                    Need 1550 More Points
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
        <TabsContent value="redeemed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Redeemed Rewards</CardTitle>
              <CardDescription>Your previously redeemed rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
                <motion.div variants={itemVariants} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Gift className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Free Delivery</p>
                      <p className="text-sm text-muted-foreground">Redeemed on April 10, 2023</p>
                    </div>
                  </div>
                  <Badge variant="outline">300 Points</Badge>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Gift className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">₦500 Discount</p>
                      <p className="text-sm text-muted-foreground">Redeemed on March 5, 2023</p>
                    </div>
                  </div>
                  <Badge variant="outline">500 Points</Badge>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Gift className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Free Ironing</p>
                      <p className="text-sm text-muted-foreground">Redeemed on February 18, 2023</p>
                    </div>
                  </div>
                  <Badge variant="outline">250 Points</Badge>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Points History</CardTitle>
              <CardDescription>Your points earned and redeemed</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
                <motion.div variants={itemVariants} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Order #LDY-2023-0042</p>
                    <p className="text-sm text-muted-foreground">May 15, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+50 Points</p>
                    <p className="text-xs text-muted-foreground">₦5,000 spent</p>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Free Delivery Reward</p>
                    <p className="text-sm text-muted-foreground">April 10, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">-300 Points</p>
                    <p className="text-xs text-muted-foreground">Redeemed</p>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Order #LDY-2023-0038</p>
                    <p className="text-sm text-muted-foreground">April 2, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+70 Points</p>
                    <p className="text-xs text-muted-foreground">₦7,000 spent</p>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">₦500 Discount Reward</p>
                    <p className="text-sm text-muted-foreground">March 5, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">-500 Points</p>
                    <p className="text-xs text-muted-foreground">Redeemed</p>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Order #LDY-2023-0031</p>
                    <p className="text-sm text-muted-foreground">March 1, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+60 Points</p>
                    <p className="text-xs text-muted-foreground">₦6,000 spent</p>
                  </div>
                </motion.div>
              </motion.div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Complete History
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
