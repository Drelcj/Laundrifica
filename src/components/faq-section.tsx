"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does the pickup and delivery process work?",
    answer:
      "For standard members, we offer scheduled pickups on Mondays, Wednesdays, Fridays, and Sundays between 5:00pm and 9:30pm. Premium members enjoy the benefit of instant pickup on demand. Our delivery personnel will arrive at your location, collect your laundry items, and deliver them back to you once the service is complete.",
  },
  {
    question: "What is the difference between standard and premium membership?",
    answer:
      "Standard membership is free and includes scheduled pickups, standard processing techniques, and 24/7 customer support. Premium membership costs ₦5,000 per month and offers instant pickup on demand, advanced processing technologies, priority customer support, exclusive discounts, faster turnaround times, free basic amendments/repairs, and priority handling.",
  },
  {
    question: "How are my clothes protected during the cleaning process?",
    answer:
      "We sort all items by color, fabric type, and cleaning requirements to ensure proper handling. We use high-quality, eco-friendly detergents and follow manufacturer care instructions. Delicate items receive special attention with appropriate cleaning methods to prevent damage.",
  },
  {
    question: "What happens if an item is lost or damaged?",
    answer:
      "In the rare event that an item is lost or damaged, please notify us within 6 hours of discovery. We'll conduct a thorough search for 5 working days. If found during this period, you'll receive compensation via discount. If not found, we'll evaluate the item on the 6th working day and process a refund (50% cash, 50% discount voucher) within 7-14 working days.",
  },
  {
    question: "How do I track my order?",
    answer:
      "You can track your order in real-time through our app or website. Our tracking system provides detailed updates at each stage: pickup request acknowledged, pickup agent on the way, laundry items received, processing, ready for delivery, on the way to you, and delivered.",
  },
  {
    question: "What types of payment do you accept?",
    answer:
      "We accept various payment methods including credit/debit cards, bank transfers, and mobile payment solutions. You can choose to pay immediately when placing an order (with a 10% discount) or select the pay-on-delivery option.",
  },
]

export function FaqSection() {
  return (
    <section className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-4xl mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Find answers to common questions about our services.</p>
      </div>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
