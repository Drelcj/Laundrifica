import { Shirt, Truck, Sparkles, Package } from "lucide-react"

const steps = [
  {
    title: "Schedule Pickup",
    description: "Choose a convenient time for us to collect your laundry.",
    icon: Package,
  },
  {
    title: "We Collect",
    description: "Our delivery personnel will pick up your items from your location.",
    icon: Truck,
  },
  {
    title: "Professional Cleaning",
    description: "Your clothes are sorted, cleaned, and treated with care.",
    icon: Sparkles,
  },
  {
    title: "Delivery",
    description: "Clean, fresh clothes delivered back to your doorstep.",
    icon: Shirt,
  },
]

export function HowItWorks() {
  return (
    <section className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-4xl mb-4">How It Works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Our simple 4-step process makes laundry day a breeze.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={step.title} className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 left-full w-full h-0.5 bg-primary/20 hidden lg:block">
                {index < steps.length - 1 && <div className="w-full h-full" />}
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">
              Step {index + 1}: {step.title}
            </h3>
            <p className="text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
