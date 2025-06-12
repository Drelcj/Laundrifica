"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const IroningPage = () => {
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
              <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">Professional Ironing Service</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Our expert ironing service will keep your clothes looking crisp, wrinkle-free, and professionally
                finished. Perfect for business attire, formal wear, and everyday clothes that deserve special care.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="gradient-border overflow-hidden group">
                  <Link href="/order?service=ironing">
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
                      src="/images/services/ironing-hero.png"
                      alt="Professional Ironing Service"
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

      {/* Content Section */}
      <div className="container mx-auto py-12 px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Why Choose Our Ironing Services?</h2>
            <p className="text-gray-700">
              We offer a reliable and efficient ironing service, ensuring your clothes are perfectly pressed and ready
              to wear. Our experienced team uses professional equipment and techniques to deliver exceptional results
              every time.
            </p>
            <ul className="list-disc pl-5 mt-4 text-gray-700">
              <li>Expert ironing for all types of garments</li>
              <li>Fast turnaround times</li>
              <li>Competitive pricing</li>
              <li>Convenient pickup and delivery options</li>
            </ul>
          </div>
          <div>
            <img
              src="/images/services/ironing-example.jpg" // Replace with a relevant image
              alt="Ironing Service Example"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Ready to Experience Perfectly Ironed Clothes?</h2>
          <p className="text-gray-700 mb-6">Contact us today to schedule your ironing service.</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get a Quote</button>
        </div>
      </div>
    </div>
  )
}

export default IroningPage
