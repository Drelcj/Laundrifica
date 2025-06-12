"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function RepairsClientPage() {
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
              <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">Repairs & Amendments</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Don't let minor damages ruin your favorite clothes. Our skilled tailors can fix tears, replace buttons,
                adjust hems, and make other alterations to extend the life of your garments.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="gradient-border overflow-hidden group">
                  <Link href="/order?service=repairs">
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
                      src="/images/services/repairs-hero.png"
                      alt="Garment Repairs & Amendments Service"
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
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Repair Services</h2>
            <p className="text-gray-700 mb-4">
              We offer a comprehensive range of repair services to keep your property in top condition. From minor fixes
              to major renovations, our team of experienced professionals is here to help.
            </p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Plumbing repairs</li>
              <li>Electrical repairs</li>
              <li>Carpentry services</li>
              <li>Painting and decorating</li>
              <li>Appliance repairs</li>
              <li>HVAC maintenance and repairs</li>
            </ul>
          </div>

          {/* Right Column */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
            <p className="text-gray-700 mb-4">When you choose QuickLease for your repair needs, you can expect:</p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Prompt and reliable service</li>
              <li>Experienced and qualified technicians</li>
              <li>Competitive pricing</li>
              <li>Quality workmanship</li>
              <li>Satisfaction guarantee</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
