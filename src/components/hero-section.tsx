"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/src/lib/utils"
import dynamic from "next/dynamic"

// Dynamically import motion components to reduce initial bundle size
const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div), { ssr: false })

const slides = [
  {
    title: "Premium Laundry Service",
    description:
      "Experience the convenience of professional laundry service with free pickup and delivery. Your fabric's pristine care is our commitment.",
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611430/laundrifica_images/hero/laundry-service-hero_r9klvh.jpg",
    cta: "Order Now",
    ctaLink: "/order",
  },
  {
    title: "Premium Membership Benefits",
    description:
      "Enjoy instant pickup, priority handling, and exclusive discounts with our premium membership. Your fabric's pristine care, elevated.",
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611439/laundrifica_images/hero/premium-membership_x8wimn.jpg",
    cta: "Upgrade Now",
    ctaLink: "/membership",
  },
  {
    title: "Eco-Friendly Cleaning",
    description:
      "We use environmentally friendly detergents and energy-efficient machines for all our services. Your fabric's pristine care meets sustainability.",
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611429/laundrifica_images/hero/fabric-care-excellence_ezisnk.jpg",
    cta: "Learn More",
    ctaLink: "/eco-friendly",
  },
  {
    title: "Fabric Care Excellence",
    description:
      "Every garment receives meticulous attention with our advanced cleaning techniques. Your fabric's pristine care is our specialty.",
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611430/laundrifica_images/hero/fabric-care-excellence_ezisnk.jpg",
    cta: "Discover More",
    ctaLink: "/services",
  },
  {
    title: "Pristine Garment Care",
    description:
      "From delicate silks to sturdy denims, we handle every fabric with expert precision. Your fabric&apos;s pristine care, guaranteed.",
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611439/laundrifica_images/hero/pristine-garment-care_rzopts.jpg",
    cta: "Start Today",
    ctaLink: "/order",
  },
]

// Generate blur data URL for better loading experience
const generateBlurDataURL = (width: number, height: number) => {
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")
  if (ctx) {
    ctx.fillStyle = "#f3f4f6"
    ctx.fillRect(0, 0, width, height)
  }
  return canvas.toDataURL()
}

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <div className="relative w-full overflow-hidden hero-gradient">
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="relative h-[600px] md:h-[700px] w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              currentSlide === index ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              sizes="100vw"
              quality={85}
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo="
              className="object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
              {isClient && MotionDiv ? (
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="max-w-4xl mx-auto"
                >
                  <MotionDiv
                    className="mb-2 inline-block px-4 py-1 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-sm font-medium">Laundrifica • Your fabric's pristine care</span>
                  </MotionDiv>
                  <MotionDiv
                    className="font-heading text-4xl md:text-6xl lg:text-7xl mb-6 max-w-3xl gradient-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h1>{slide.title}</h1>
                  </MotionDiv>
                  <MotionDiv
                    className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <p>{slide.description}</p>
                  </MotionDiv>
                  <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <Button asChild size="lg" className="gradient-border overflow-hidden group">
                      <Link href={slide.ctaLink}>
                        <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative z-10">{slide.cta}</span>
                      </Link>
                    </Button>
                  </MotionDiv>
                </MotionDiv>
              ) : (
                // Fallback for SSR
                <div className="max-w-4xl mx-auto">
                  <div className="mb-2 inline-block px-4 py-1 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30">
                    <span className="text-sm font-medium">Laundrifica • Your fabric's pristine care</span>
                  </div>
                  <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl mb-6 max-w-3xl gradient-text">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90">{slide.description}</p>
                  <Button asChild size="lg" className="gradient-border overflow-hidden group">
                    <Link href={slide.ctaLink}>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative z-10">{slide.cta}</span>
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/10 backdrop-blur-md text-white hover:bg-black/30 rounded-full border border-white/10 z-10"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/10 backdrop-blur-md text-white hover:bg-black/30 rounded-full border border-white/10 z-10"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              currentSlide === index ? "bg-white w-8" : "bg-white/50",
            )}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  )
}
