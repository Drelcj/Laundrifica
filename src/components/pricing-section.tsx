import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function PricingSection() {
  return (
    <section className="py-16" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing for all your laundry needs with Standard and Premium options
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="relative overflow-hidden border-border">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-xl">Standard Service</span>
                </CardTitle>
                <CardDescription>Quality laundry service at affordable rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-blue-500" />
                  <span>Regular processing techniques</span>
                </div>
                <div className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-blue-500" />
                  <span>Standard turnaround time</span>
                </div>
                <div className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-blue-500" />
                  <span>Basic packaging</span>
                </div>
                <div className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-blue-500" />
                  <span>Option to upgrade specific items</span>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground mb-4">Starting from ₦1,000 per order</p>
              </CardFooter>
            </Card>

            <Card className="relative overflow-hidden border-primary">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600"></div>
              <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">Premium</Badge>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-xl">Premium Service</span>
                </CardTitle>
                <CardDescription>Enhanced quality with special care and attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Advanced cleaning technologies</span>
                </div>
                <div className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Priority processing</span>
                </div>
                <div className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Premium packaging</span>
                </div>
                <div className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Special fabric treatments</span>
                </div>
                <div className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Extended garment life</span>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground mb-4">Premium rates applied per item</p>
              </CardFooter>
            </Card>
          </div>

          <Tabs defaultValue="wash-fold" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="wash-fold">Wash & Fold</TabsTrigger>
              <TabsTrigger value="dry-cleaning">Dry Cleaning</TabsTrigger>
              <TabsTrigger value="ironing">Ironing</TabsTrigger>
              <TabsTrigger value="repairs">Repairs</TabsTrigger>
            </TabsList>

            <TabsContent value="wash-fold" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Wash & Fold Sample Pricing</CardTitle>
                  <CardDescription>Priced per kg</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <div>
                        <span>Regular Laundry</span>
                        <Badge variant="outline" className="ml-2">
                          Most Popular
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₦1,200/kg</div>
                        <div className="text-xs text-muted-foreground">Standard</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Regular Laundry (Premium)</span>
                      <div className="text-right">
                        <div className="font-medium">₦1,800/kg</div>
                        <div className="text-xs text-primary">Premium</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dry-cleaning" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dry Cleaning Sample Pricing</CardTitle>
                  <CardDescription>Priced per item</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Shirts/Blouses</span>
                      <div className="text-right">
                        <div className="font-medium">₦2,500</div>
                        <div className="text-xs text-muted-foreground">Standard</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Shirts/Blouses (Premium)</span>
                      <div className="text-right">
                        <div className="font-medium">₦3,800</div>
                        <div className="text-xs text-primary">Premium</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ironing" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ironing Sample Pricing</CardTitle>
                  <CardDescription>Priced per item</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Shirts/Blouses</span>
                      <div className="text-right">
                        <div className="font-medium">₦1,500</div>
                        <div className="text-xs text-muted-foreground">Standard</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Shirts/Blouses (Premium)</span>
                      <div className="text-right">
                        <div className="font-medium">₦2,200</div>
                        <div className="text-xs text-primary">Premium</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="repairs" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Repairs Sample Pricing</CardTitle>
                  <CardDescription>Priced per service</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Button Replacement</span>
                      <div className="text-right">
                        <div className="font-medium">₦1,200</div>
                        <div className="text-xs text-muted-foreground">Standard</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Button Replacement (Premium)</span>
                      <div className="text-right">
                        <div className="font-medium">₦1,800</div>
                        <div className="text-xs text-primary">Premium</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" asChild>
              <Link href="/pricing">
                View Full Pricing <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/order">Place Order Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
