"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const DryCleaningPage = () => {
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
              <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">Dry Cleaning Service</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Our professional dry cleaning service is perfect for delicate fabrics, formal wear, and garments that
                require special care. We use advanced techniques to clean and preserve your valuable items.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="gradient-border overflow-hidden group">
                  <Link href="/order?service=dry-cleaning">
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
                      src="/images/services/dry-cleaning-hero.png"
                      alt="Professional Dry Cleaning Service"
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
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">Our Dry Cleaning Process</h2>
            <p className="mt-4 text-gray-500">
              We use state-of-the-art equipment and eco-friendly solvents to ensure your clothes are cleaned thoroughly
              and safely. Our process includes inspection, stain removal, cleaning, pressing, and final inspection.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">Benefits of Dry Cleaning</h2>
            <ul className="mt-4 list-disc list-inside text-gray-500">
              <li>Removes tough stains</li>
              <li>Preserves fabric quality</li>
              <li>Extends garment life</li>
              <li>Maintains shape and color</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Ready to get your clothes cleaned?</h2>
          <p className="mt-4 text-lg text-gray-600">Contact us today to schedule a pickup or drop-off.</p>
          <button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Get a Quote
          </button>
        </div>
      </div>
    </div>
  )
}

export default DryCleaningPage
