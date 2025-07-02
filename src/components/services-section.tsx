import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Truck, Leaf, Star } from "lucide-react"

const services = [
  {
    title: "Wash & Fold",
    description:
      "Professional washing and folding service for your everyday garments. Your fabric's pristine care with attention to detail.",
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1751444146/laundrifica_images/services/1d296f74-9c4c-4ccf-b074-361fcf5f6416.png",
    price: "From ₦500",
    duration: "24-48 hours",
    features: ["Eco-friendly detergents", "Fabric softener included", "Folded to perfection"],
    href: "/services/wash-and-fold",
    badge: "Popular",
  },
  {
    title: "Dry Cleaning",
    description:
      "Expert dry cleaning for delicate fabrics and formal wear. Your fabric's pristine care using advanced techniques.",
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1751444720/laundrifica_images/services/843233ba-eb3c-470e-a005-28d42c4f1c65.png",
    price: "From ₦1,200",
    duration: "48-72 hours",
    features: ["Delicate fabric care", "Stain removal", "Professional pressing"],
    href: "/services/dry-cleaning",
    badge: "Premium",
  },
  {
    title: "Ironing Service",
    description:
      "Professional ironing and pressing for crisp, wrinkle-free clothes. Your fabric's pristine care with perfect finishing.",
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1751444840/laundrifica_images/services/861b332b-a90c-4802-8b0f-b54bf92b6cdc.png",
    price: "From ₦300",
    duration: "Same day",
    features: ["Steam pressing", "Crease-free finish", "Hanger service"],
    href: "/services/ironing",
    badge: "Express",
  },
  {
    title: "Repairs & Alterations",
    description:
      "Expert tailoring and repair services to extend your garment's life. Your fabric's pristine care includes restoration.",
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1751445127/laundrifica_images/services/56dea7fd-dc21-44bf-bff6-d35c03e35ae5.png",
    price: "From ₦800",
    duration: "3-5 days",
    features: ["Expert tailoring", "Button replacement", "Hem adjustments"],
    href: "/services/repairs",
    badge: "Specialized",
  },
]

export function ServicesSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Our Premium Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience Laundrifica's comprehensive fabric care solutions. Your fabric's pristine care is our specialty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3" variant="secondary">
                  {service.badge}
                </Badge>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="font-semibold text-primary">{service.price}</div>
                </div>

                <ul className="space-y-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm">
                      <Star className="h-3 w-3 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild className="w-full">
                  <Link href={service.href}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-center space-x-2">
              <Truck className="h-6 w-6 text-primary" />
              <span className="font-medium">Free Pickup & Delivery</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="font-medium">Eco-Friendly Process</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Star className="h-6 w-6 text-primary" />
              <span className="font-medium">Premium Quality Care</span>
            </div>
          </div>
          <Button asChild size="lg">
            <Link href="/order">Book Your Service Today</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
