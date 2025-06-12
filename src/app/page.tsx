import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { HowItWorks } from "@/components/how-it-works"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PricingSection } from "@/components/pricing-section"
import { FeaturedProducts } from "@/components/featured-products"
import { FeaturedPosts } from "@/components/featured-posts"
import { NewsletterSection } from "@/components/newsletter-section"
import { FaqSection } from "@/components/faq-section"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ServicesSection />
      <HowItWorks />
      <TestimonialsSection />
      <PricingSection />
      <FeaturedProducts />
      <FeaturedPosts />
      <FaqSection />
      <NewsletterSection />
    </div>
  )
}
