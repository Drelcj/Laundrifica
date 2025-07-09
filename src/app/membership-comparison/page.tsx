"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    name: "Pickup & Delivery",
    standard: "Scheduled (Mon, Wed, Fri, Sun, 5-9:30pm)",
    premium: "Instant on demand",
  },
  {
    name: "Processing Techniques",
    standard: "Standard",
    premium: "Advanced",
  },
  {
    name: "Customer Support",
    standard: "24/7",
    premium: "24/7 Priority",
  },
  {
    name: "Turnaround Time",
    standard: "Standard",
    premium: "Expedited",
  },
  {
    name: "Amendments/Repairs",
    standard: "Paid",
    premium: "Basic repairs free",
  },
  {
    name: "Exclusive Discounts",
    standard: false,
    premium: true,
  },
  {
    name: "Priority Handling",
    standard: false,
    premium: true,
  },
  {
    name: "Garment Protection",
    standard: "Basic",
    premium: "Premium",
  },
  {
    name: "Stain Treatment",
    standard: "Additional fee",
    premium: "Included",
  },
  {
    name: "Delivery Notifications",
    standard: true,
    premium: true,
  },
  {
    name: "Personalized Care Instructions",
    standard: false,
    premium: true,
  },
  {
    name: "Seasonal Fabric Care",
    standard: "Additional fee",
    premium: "Included",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Premium Member",
    content:
      "Upgrading to Premium was the best decision I made. The instant pickup and priority handling save me so much time, and the free basic repairs have been a lifesaver!",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Michael Adebayo",
    role: "Standard Member",
    content:
      "Even as a Standard member, the service is exceptional. The scheduled pickups are always on time, and the quality of cleaning is outstanding.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

const faqs = [
  {
    question: "Can I switch between membership tiers?",
    answer:
      "Yes, you can upgrade or downgrade your membership at any time. Changes will take effect at the start of your next billing cycle.",
  },
  {
    question: "Is there a minimum commitment period?",
    answer:
      "No, there is no minimum commitment period. You can cancel your Premium membership at any time, and you'll continue to receive Premium benefits until the end of your current billing cycle.",
  },
  {
    question: "How do I schedule a pickup as a Standard member?",
    answer:
      "Standard members can schedule pickups through our app or website for Monday, Wednesday, Friday, or Sunday between 5:00 PM and 9:30 PM. We recommend scheduling at least 24 hours in advance to ensure availability.",
  },
  {
    question: "What does 'Instant Pickup' mean for Premium members?",
    answer:
      "Premium members can request a pickup at any time, and we'll dispatch a driver to your location within 60 minutes (subject to driver availability). This service is available 7 days a week from 8:00 AM to 10:00 PM.",
  },
]

export default function MembershipComparisonPage() {
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
              <span className="text-sm font-medium text-primary">Membership Options</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">Choose Your Plan</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Compare our membership tiers and select the one that best fits your laundry needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Membership Cards */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="h-full gradient-border overflow-hidden">
                <div className="gradient-border-content h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-2xl">Standard Membership</CardTitle>
                    <CardDescription>Basic laundry service with scheduled pickups</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-6">
                      <span className="text-4xl font-bold">Free</span>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>Scheduled pickups (Mon, Wed, Fri, Sun)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>Standard processing techniques</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>24/7 customer support</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>Standard turnaround time</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>Basic garment protection</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href="/signup?plan=standard">Choose Standard</Link>
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full gradient-border overflow-hidden relative">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-lg text-sm font-medium">
                  Recommended
                </div>
                <div className="gradient-border-content h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-2xl">Premium Membership</CardTitle>
                    <CardDescription>Enhanced service with priority handling</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-6">
                      <span className="text-4xl font-bold">₦5,000</span>
                      <span className="text-muted-foreground ml-2">per month</span>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Instant pickup on demand</strong>
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Advanced processing techniques</strong>
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>24/7 priority customer support</strong>
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Expedited turnaround time</strong>
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Free basic repairs and amendments</strong>
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Exclusive discounts on services</strong>
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>Premium garment protection</strong>
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full gradient-border overflow-hidden group">
                      <Link href="/signup?plan=premium">
                        <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative z-10">Choose Premium</span>
                      </Link>
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Comparison */}
      <section className="py-12 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">Detailed Feature Comparison</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See exactly what's included in each membership tier.
            </p>
          </div>

          <div className="overflow-x-auto">
            <Table className="border rounded-lg bg-background">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Feature</TableHead>
                  <TableHead className="text-center">Standard</TableHead>
                  <TableHead className="text-center">Premium</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((feature) => (
                  <TableRow key={feature.name}>
                    <TableCell className="font-medium">{feature.name}</TableCell>
                    <TableCell className="text-center">
                      {typeof feature.standard === "boolean" ? (
                        feature.standard ? (
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        feature.standard
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {typeof feature.premium === "boolean" ? (
                        feature.premium ? (
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        <span className="font-medium">{feature.premium}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="font-medium">Monthly Price</TableCell>
                  <TableCell className="text-center">Free</TableCell>
                  <TableCell className="text-center">₦5,000/month</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell className="text-center">
                    <Button asChild variant="outline">
                      <Link href="/signup?plan=standard">Choose Standard</Link>
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button asChild>
                      <Link href="/signup?plan=premium">Choose Premium</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">What Our Members Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from our members about their experience with different membership tiers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="glass-card border-none h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                        <img
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-primary">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="italic">{testimonial.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our membership plans.
            </p>
          </div>

          <div className="max-w-3xl mx-auto glass-card p-8 rounded-xl">
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto glass-card p-12 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-bold gradient-text mb-6">Ready to Join Laundrilab?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Sign up today and experience the convenience of professional laundry service. Premium members get their
                first month at 50% off!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="gradient-border overflow-hidden group">
                  <Link href="/signup">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10">Sign Up Now</span>
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
