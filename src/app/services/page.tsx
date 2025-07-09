"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shirt, Droplets, Scissors, Sparkles, Clock, Shield, Truck, Check } from "lucide-react"

const services = [
  {
    title: "Wash & Fold",
    description: "Professional washing and folding service for your everyday clothes.",
    icon: Droplets,
    image: "/placeholder.svg?height=400&width=600",
    link: "/services/wash-and-fold",
  },
  {
    title: "Dry Cleaning",
    description: "Specialized cleaning for delicate fabrics and formal wear.",
    icon: Shirt,
    image: "/placeholder.svg?height=400&width=600",
    link: "/services/dry-cleaning",
  },
  {
    title: "Ironing",
    description: "Expert ironing service to keep your clothes wrinkle-free.",
    icon: Sparkles,
    image: "/placeholder.svg?height=400&width=600",
    link: "/services/ironing",
  },
  {
    title: "Repairs & Amendments",
    description: "Fix tears, replace buttons, and make alterations to your garments.",
    icon: Scissors,
    image: "/placeholder.svg?height=400&width=600",
    link: "/services/repairs",
  },
]

const benefits = [
  {
    title: "Fast Turnaround",
    description: "Get your clothes back quickly with our efficient service.",
    icon: Clock,
  },
  {
    title: "Quality Guarantee",
    description: "We ensure your clothes are treated with the utmost care.",
    icon: Shield,
  },
  {
    title: "Free Pickup & Delivery",
    description: "Convenient service right to your doorstep.",
    icon: Truck,
  },
]

export default function ServicesPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

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
              <span className="text-sm font-medium text-primary">Our Services</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">Premium Laundry Solutions</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              We offer a comprehensive range of laundry services to meet all your needs with cutting-edge technology.
            </p>
            <Button asChild size="lg" className="gradient-border overflow-hidden group">
              <Link href="/order">
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10">Place an Order</span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-12 md:py-24">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Our Core Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our range of professional laundry services designed to keep your clothes looking their best.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={item}>
                <Card className="overflow-hidden gradient-border h-full group">
                  <div className="gradient-border-content h-full flex flex-col">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardHeader className="p-6">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 mr-3">
                          <service.icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-xl group-hover:gradient-text transition-all duration-300">
                          {service.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 flex-1">
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-primary mr-2" />
                          <span>Professional cleaning</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-primary mr-2" />
                          <span>Quality inspection</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-primary mr-2" />
                          <span>Free delivery</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter className="p-6">
                      <Button asChild className="w-full">
                        <Link href={service.link}>Learn More</Link>
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-24 bg-muted/30">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Why Choose Laundrilab</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the benefits of our professional laundry service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="glass-card p-6 rounded-xl h-full">
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
                    <benefit.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-24">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Our Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We follow a meticulous process to ensure your clothes receive the best care.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"></div>

            {[
              {
                title: "Pickup",
                description:
                  "We collect your laundry from your doorstep at your scheduled time or on-demand for Premium members.",
                icon: Truck,
              },
              {
                title: "Sorting & Inspection",
                description:
                  "Your clothes are carefully sorted by color, fabric type, and cleaning requirements. We inspect for stains and special care needs.",
                icon: Shirt,
              },
              {
                title: "Cleaning",
                description:
                  "Using advanced techniques and eco-friendly products, we clean your clothes according to their specific requirements.",
                icon: Droplets,
              },
              {
                title: "Quality Check",
                description:
                  "Each item undergoes a thorough quality check to ensure it meets our high standards of cleanliness and care.",
                icon: Shield,
              },
              {
                title: "Finishing",
                description:
                  "Your clothes are professionally finished with precise folding, hanging, or ironing as required.",
                icon: Sparkles,
              },
              {
                title: "Delivery",
                description: "Your freshly cleaned clothes are delivered back to your doorstep at your convenience.",
                icon: Truck,
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                className="relative mb-12 last:mb-0"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div
                  className={`flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} items-center gap-8 md:gap-12`}
                >
                  <div className="w-full md:w-1/2">
                    <div className="glass-card p-6 rounded-xl relative">
                      <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary animate-pulse-slow z-10 border-2 border-background"></div>
                      <div
                        className={`absolute top-1/2 -translate-y-1/2 w-12 h-0.5 bg-gradient-to-r from-primary to-transparent ${
                          index % 2 === 0 ? "-right-12" : "-left-12"
                        }`}
                      ></div>
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 mr-3">
                          <step.icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">
                          Step {index + 1}: {step.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block w-1/2"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto glass-card p-12 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-bold gradient-text mb-6">Ready to Experience Laundrilab?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who have made laundry day the easiest part of their week.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="gradient-border overflow-hidden group">
                  <Link href="/order">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10">Place an Order</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/membership-comparison">Compare Memberships</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
