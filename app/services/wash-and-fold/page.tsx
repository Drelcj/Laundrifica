"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Droplets } from "lucide-react"

export default function WashAndFoldPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 hero-gradient overflow-hidden">
        <div className="absolute inset-0 grid-pattern"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20">
                <span className="text-sm font-medium text-primary">Our Services</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">Wash & Fold Service</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Our professional wash and fold service takes the hassle out of laundry day. We'll pick up your clothes,
                wash them to perfection, fold them neatly, and deliver them back to your doorstep.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="gradient-border overflow-hidden group">
                  <Link href="/order?service=wash-and-fold">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10">Order Now</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
                <div className="relative aspect-square rounded-2xl overflow-hidden gradient-border">
                  <div className="absolute inset-[1px] rounded-[calc(0.75rem-1px)] overflow-hidden">
                    <Image
                      src="/images/services/wash-fold-hero.png"
                      alt="Professional Wash & Fold Service"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div>
                  <h2 className="text-3xl font-bold gradient-text mb-4">How It Works</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Our wash and fold service is designed to make your life easier. Here's how it works:
                  </p>
                  <ol className="space-y-6">
                    <li className="flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                        <span className="font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">Schedule a Pickup</h3>
                        <p className="text-muted-foreground">
                          Use our app or website to schedule a convenient pickup time. Standard members can choose from
                          our scheduled days, while Premium members enjoy on-demand service.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                        <span className="font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">We Collect Your Laundry</h3>
                        <p className="text-muted-foreground">
                          Our delivery personnel will arrive at your location during the scheduled window to collect
                          your laundry items.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                        <span className="font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">Sorting and Pre-treatment</h3>
                        <p className="text-muted-foreground">
                          We sort your clothes by color, fabric type, and washing requirements. Stains are pre-treated
                          with appropriate solutions.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                        <span className="font-bold">4</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">Washing and Drying</h3>
                        <p className="text-muted-foreground">
                          Your clothes are washed using high-quality, eco-friendly detergents and dried at the
                          appropriate temperature for each fabric type.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                        <span className="font-bold">5</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">Folding and Packaging</h3>
                        <p className="text-muted-foreground">
                          Each item is carefully folded according to professional standards and packaged neatly for
                          delivery.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                        <span className="font-bold">6</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">Delivery</h3>
                        <p className="text-muted-foreground">
                          Your clean, folded laundry is delivered back to your doorstep at your preferred time.
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>

                <div>
                  <h2 className="text-3xl font-bold gradient-text mb-4">Our Washing Process</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    We use a meticulous washing process to ensure your clothes are cleaned thoroughly while preserving
                    their quality:
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-3 mt-1" />
                      <div>
                        <h3 className="font-bold mb-1">Temperature-Controlled Washing</h3>
                        <p className="text-muted-foreground">
                          We wash your clothes at the optimal temperature for each fabric type to prevent damage and
                          ensure thorough cleaning.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-3 mt-1" />
                      <div>
                        <h3 className="font-bold mb-1">Eco-Friendly Detergents</h3>
                        <p className="text-muted-foreground">
                          Our detergents are gentle on clothes and the environment, leaving your garments clean and
                          fresh without harsh chemicals.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-3 mt-1" />
                      <div>
                        <h3 className="font-bold mb-1">Stain Treatment</h3>
                        <p className="text-muted-foreground">
                          Common stains are treated with specialized solutions to ensure they're removed effectively
                          without damaging the fabric.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-3 mt-1" />
                      <div>
                        <h3 className="font-bold mb-1">Gentle Drying</h3>
                        <p className="text-muted-foreground">
                          We use appropriate drying methods for different fabrics to prevent shrinkage and maintain the
                          quality of your clothes.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="glass-card border-none overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 mr-4">
                        <Droplets className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">Pricing</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-border">
                        <span>Basic Wash & Fold</span>
                        <span className="font-bold">₦1,500/kg</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-border">
                        <span>Premium Wash & Fold</span>
                        <span className="font-bold">₦2,500/kg</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-border">
                        <span>Express Service (4-hour turnaround)</span>
                        <span className="font-bold">+₦1,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Minimum Order</span>
                        <span className="font-bold">3kg</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button asChild className="w-full">
                        <Link href="/pricing">View Full Pricing</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-none overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">What Customers Say</h3>
                    <div className="space-y-4">
                      <div className="glass-card p-4 rounded-lg">
                        <p className="italic mb-2">
                          "The wash and fold service is a game-changer! My clothes come back perfectly clean and neatly
                          folded every time."
                        </p>
                        <p className="text-sm text-primary">- Sarah J.</p>
                      </div>
                      <div className="glass-card p-4 rounded-lg">
                        <p className="italic mb-2">
                          "I love how they sort everything by color and fabric type. The attention to detail is
                          impressive!"
                        </p>
                        <p className="text-sm text-primary">- Michael A.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-none overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">FAQs</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold mb-1">How is the weight calculated?</h4>
                        <p className="text-sm text-muted-foreground">
                          We weigh your clothes when they arrive at our facility. You'll only be charged for the actual
                          weight.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">What items are not accepted?</h4>
                        <p className="text-sm text-muted-foreground">
                          We don't accept items that are heavily soiled with oil, paint, or hazardous materials. Please
                          contact us for special handling.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">How long does it take?</h4>
                        <p className="text-sm text-muted-foreground">
                          Standard turnaround is 24-48 hours. Express service is available for an additional fee.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto glass-card p-12 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-bold gradient-text mb-6">Ready to Experience Our Wash & Fold Service?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who have made laundry day the easiest part of their week.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="gradient-border overflow-hidden group">
                  <Link href="/order?service=wash-and-fold">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10">Place an Order</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
