"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const addOnServices = [
  {
    name: "Express Service",
    price: "₦4,500",
    description: "Same-day turnaround for urgent items",
  },
  {
    name: "Stain Treatment",
    price: "₦2,000",
    description: "Special treatment for tough stains",
  },
  {
    name: "Ironing Only",
    price: "₦3,200",
    description: "Professional ironing service per kg",
  },
  {
    name: "Garment Repair",
    price: "₦4,800",
    description: "Basic repairs like button replacement or small tears",
  },
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 hero-gradient overflow-hidden">
        <div className="absolute inset-0 grid-pattern"></div>
        <div className="container relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20">
              <span className="text-sm font-medium text-primary">Transparent Pricing</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">Our Pricing Plans</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Choose the service that fits your needs with no hidden fees.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Content */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4 glass-card p-2 rounded-full">
              <span className={billingCycle === "monthly" ? "font-bold" : "text-muted-foreground"}>Monthly</span>
              <Switch
                checked={billingCycle === "yearly"}
                onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
              />
              <div className="flex flex-col items-start">
                <span className={billingCycle === "yearly" ? "font-bold" : "text-muted-foreground"}>Yearly</span>
                <span className="text-xs text-primary">Save 10%</span>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="relative overflow-hidden border-border h-full">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="text-2xl">Standard Service</span>
                    </CardTitle>
                    <CardDescription className="text-base">Quality laundry service at affordable rates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{billingCycle === "monthly" ? "₦1,200" : "₦12,960"}</span>
                      <span className="text-muted-foreground ml-2">
                        {billingCycle === "monthly" ? "per kg" : "per kg yearly"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-blue-500" />
                      <span>Regular processing techniques</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-blue-500" />
                      <span>Standard turnaround time (48-72 hours)</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-blue-500" />
                      <span>Basic packaging</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-blue-500" />
                      <span>Regular detergents and softeners</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-blue-500" />
                      <span>Option to upgrade specific items to Premium</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-blue-500" />
                      <span>Scheduled pickups (Mon, Wed, Fri, Sun)</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button size="lg" className="w-full" asChild>
                      <Link href="/order?tier=standard">Choose Standard</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="relative overflow-hidden border-primary h-full">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600"></div>
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">Premium</Badge>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="text-2xl">Premium Service</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      Enhanced quality with special care and attention
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{billingCycle === "monthly" ? "₦1,800" : "₦19,440"}</span>
                      <span className="text-muted-foreground ml-2">
                        {billingCycle === "monthly" ? "per kg" : "per kg yearly"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-primary" />
                      <span>Advanced cleaning technologies</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-primary" />
                      <span>Priority processing (24-48 hours)</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-primary" />
                      <span>Premium packaging with garment covers</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-primary" />
                      <span>High-quality eco-friendly detergents</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-primary" />
                      <span>Special fabric treatments and conditioners</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-primary" />
                      <span>Instant pickup and delivery on demand</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-primary" />
                      <span>Extended garment life and protection</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button size="lg" className="w-full" asChild>
                      <Link href="/order?tier=premium">Choose Premium</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg mb-8">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">How Our Pricing Works</h3>
                  <p className="text-sm text-muted-foreground">
                    Premium service is priced higher per item rather than charging a monthly fee. Standard service users
                    can upgrade specific items to Premium treatment on a per-item basis. All prices are in Nigerian
                    Naira (₦).
                  </p>
                </div>
              </div>
            </div>

            <TooltipProvider>
              <Tabs defaultValue="wash-fold" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                  <TabsTrigger value="wash-fold">Wash & Fold</TabsTrigger>
                  <TabsTrigger value="dry-cleaning">Dry Cleaning</TabsTrigger>
                  <TabsTrigger value="ironing">Ironing</TabsTrigger>
                  <TabsTrigger value="repairs">Repairs</TabsTrigger>
                </TabsList>

                <TabsContent value="wash-fold" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Wash & Fold Pricing</CardTitle>
                      <CardDescription>Priced per kg</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold mb-3 flex items-center">
                            Standard Service
                            <Badge variant="outline" className="ml-2">
                              Basic
                            </Badge>
                          </h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b">
                              <div className="flex items-center">
                                <span>Regular Laundry</span>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-muted-foreground ml-1 cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="w-[200px] text-xs">Everyday clothes, t-shirts, jeans, etc.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <span className="font-bold">₦1,200/kg</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Bed Linens</span>
                              <span className="font-bold">₦1,500/kg</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Towels</span>
                              <span className="font-bold">₦1,300/kg</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Delicates</span>
                              <span className="font-bold">₦2,000/kg</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Comforters/Duvets</span>
                              <span className="font-bold">₦2,500/kg</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-3 flex items-center text-primary">
                            Premium Service
                            <Badge className="ml-2 bg-primary text-primary-foreground">Enhanced</Badge>
                          </h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b">
                              <div className="flex items-center">
                                <span>Regular Laundry</span>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-muted-foreground ml-1 cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="w-[200px] text-xs">With fabric conditioner and premium detergents</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <span className="font-bold">₦1,800/kg</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Bed Linens</span>
                              <span className="font-bold">₦2,200/kg</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Towels</span>
                              <span className="font-bold">₦1,900/kg</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Delicates</span>
                              <span className="font-bold">₦3,000/kg</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Comforters/Duvets</span>
                              <span className="font-bold">₦3,800/kg</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="dry-cleaning" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Dry Cleaning Pricing</CardTitle>
                      <CardDescription>Priced per item</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold mb-3 flex items-center">
                            Standard Service
                            <Badge variant="outline" className="ml-2">
                              Basic
                            </Badge>
                          </h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Shirts/Blouses</span>
                              <span className="font-bold">₦2,500</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Pants/Trousers</span>
                              <span className="font-bold">₦3,500</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Suits (2-piece)</span>
                              <span className="font-bold">₦8,000</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Dresses</span>
                              <span className="font-bold">₦5,000</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Coats/Jackets</span>
                              <span className="font-bold">₦6,500</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Comforters</span>
                              <span className="font-bold">₦10,000</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-3 flex items-center text-primary">
                            Premium Service
                            <Badge className="ml-2 bg-primary text-primary-foreground">Enhanced</Badge>
                          </h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Shirts/Blouses</span>
                              <span className="font-bold">₦3,800</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Pants/Trousers</span>
                              <span className="font-bold">₦5,200</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Suits (2-piece)</span>
                              <span className="font-bold">₦12,000</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Dresses</span>
                              <span className="font-bold">₦7,500</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Coats/Jackets</span>
                              <span className="font-bold">₦9,800</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Comforters</span>
                              <span className="font-bold">₦15,000</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ironing" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Ironing Pricing</CardTitle>
                      <CardDescription>Priced per item</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold mb-3 flex items-center">
                            Standard Service
                            <Badge variant="outline" className="ml-2">
                              Basic
                            </Badge>
                          </h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Shirts/Blouses</span>
                              <span className="font-bold">₦1,500</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Pants/Trousers</span>
                              <span className="font-bold">₦1,800</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Dresses</span>
                              <span className="font-bold">₦2,500</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Bed Sheets</span>
                              <span className="font-bold">₦2,200</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Skirts</span>
                              <span className="font-bold">₦1,800</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-3 flex items-center text-primary">
                            Premium Service
                            <Badge className="ml-2 bg-primary text-primary-foreground">Enhanced</Badge>
                          </h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Shirts/Blouses</span>
                              <span className="font-bold">₦2,200</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Pants/Trousers</span>
                              <span className="font-bold">₦2,700</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Dresses</span>
                              <span className="font-bold">₦3,800</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Bed Sheets</span>
                              <span className="font-bold">₦3,300</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Skirts</span>
                              <span className="font-bold">₦2,700</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="repairs" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Repairs Pricing</CardTitle>
                      <CardDescription>Priced per service</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold mb-3 flex items-center">
                            Standard Service
                            <Badge variant="outline" className="ml-2">
                              Basic
                            </Badge>
                          </h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Button Replacement</span>
                              <span className="font-bold">₦1,200</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Hem Adjustment</span>
                              <span className="font-bold">₦3,500</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Zipper Replacement</span>
                              <span className="font-bold">₦5,000</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Patch Repair</span>
                              <span className="font-bold">₦4,000</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Seam Repair</span>
                              <span className="font-bold">₦2,500</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-3 flex items-center text-primary">
                            Premium Service
                            <Badge className="ml-2 bg-primary text-primary-foreground">Enhanced</Badge>
                          </h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Button Replacement</span>
                              <span className="font-bold">₦1,800</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Hem Adjustment</span>
                              <span className="font-bold">₦5,200</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Zipper Replacement</span>
                              <span className="font-bold">₦7,500</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Patch Repair</span>
                              <span className="font-bold">₦6,000</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span>Seam Repair</span>
                              <span className="font-bold">₦3,800</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TooltipProvider>

            {/* Add-on Services */}
            <div className="mt-24">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold gradient-text mb-4">Add-on Services</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Customize your laundry experience with these additional services.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {addOnServices.map((service, index) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="glass-card border-none h-full">
                      <CardHeader>
                        <CardTitle>{service.name}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{service.price}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Volume Discounts */}
            <div className="mt-24">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold gradient-text mb-4">Volume Discounts</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Save more when you order in bulk with our volume-based pricing.
                </p>
              </div>

              <div className="max-w-3xl mx-auto glass-card p-8 rounded-xl">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-4 px-2">Weight (kg)</th>
                        <th className="text-left py-4 px-2">Standard Service</th>
                        <th className="text-left py-4 px-2">Premium Service</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-4 px-2">1-5 kg</td>
                        <td className="py-4 px-2">₦1,200/kg</td>
                        <td className="py-4 px-2">₦1,800/kg</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-4 px-2">6-10 kg</td>
                        <td className="py-4 px-2">₦1,080/kg (10% off)</td>
                        <td className="py-4 px-2">₦1,620/kg (10% off)</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-4 px-2">11-20 kg</td>
                        <td className="py-4 px-2">₦960/kg (20% off)</td>
                        <td className="py-4 px-2">₦1,440/kg (20% off)</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-2">21+ kg</td>
                        <td className="py-4 px-2">₦840/kg (30% off)</td>
                        <td className="py-4 px-2">₦1,260/kg (30% off)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-24">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold gradient-text mb-4">Frequently Asked Questions</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Find answers to common questions about our pricing and services.
                </p>
              </div>

              <div className="max-w-3xl mx-auto glass-card p-8 rounded-xl">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Are there any hidden fees?</h3>
                    <p className="text-muted-foreground">
                      No, our pricing is completely transparent. The prices listed are what you'll pay, with no hidden
                      charges or surprise fees.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">How is the weight of my laundry calculated?</h3>
                    <p className="text-muted-foreground">
                      We weigh your laundry when it arrives at our facility. You'll only be charged for the actual
                      weight of your items, rounded to the nearest 0.1 kg.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Can I mix different types of services in one order?</h3>
                    <p className="text-muted-foreground">
                      Yes, you can combine different services in a single order. For example, you can have some items
                      dry cleaned and others washed and folded. Each item will be charged according to the appropriate
                      service rate.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Do you offer any discounts or promotions?</h3>
                    <p className="text-muted-foreground">
                      Yes, we regularly offer seasonal promotions and discounts for new customers. Premium members also
                      receive exclusive discounts on services. Sign up for our newsletter to stay informed about our
                      latest offers.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      What's the difference between Standard and Premium service?
                    </h3>
                    <p className="text-muted-foreground">
                      Standard service provides quality cleaning at affordable rates with regular processing techniques.
                      Premium service includes advanced cleaning technologies, priority processing, premium packaging,
                      and special fabric treatments that extend the life of your garments.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Can I upgrade specific items to Premium?</h3>
                    <p className="text-muted-foreground">
                      Yes, Standard service users can upgrade specific items to Premium treatment on a per-item basis.
                      This is perfect for when you have special garments that need extra care while keeping the rest of
                      your laundry at Standard rates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-24">
              <div className="max-w-4xl mx-auto glass-card p-12 rounded-3xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"></div>
                <div className="relative z-10 text-center">
                  <h2 className="text-3xl font-bold gradient-text mb-6">Ready to Get Started?</h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Experience the convenience of professional laundry service with Laundrify. Place your first order
                    today and enjoy 20% off!
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button asChild size="lg" className="gradient-border overflow-hidden group">
                      <Link href="/order">
                        <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative z-10">Place an Order</span>
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/contact">Contact Sales</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button size="lg" asChild>
                <Link href="/order">
                  Place Order Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
