"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true)
    }, 1000)
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
              <span className="text-sm font-medium text-primary">Get In Touch</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">Contact Us</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Have questions or feedback? We'd love to hear from you. Our team is here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="glass-card p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                {formSubmitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
                      <Send className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                    <Button onClick={() => setFormSubmitted(false)}>Send Another Message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          required
                          className="bg-background/50 backdrop-blur-sm border-white/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          required
                          className="bg-background/50 backdrop-blur-sm border-white/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        required
                        className="bg-background/50 backdrop-blur-sm border-white/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+234 800 000 0000"
                        className="bg-background/50 backdrop-blur-sm border-white/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Inquiry Type</Label>
                      <RadioGroup defaultValue="general">
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="general" id="general" />
                            <Label htmlFor="general">General Inquiry</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="support" id="support" />
                            <Label htmlFor="support">Customer Support</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="feedback" id="feedback" />
                            <Label htmlFor="feedback">Feedback</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="partnership" id="partnership" />
                            <Label htmlFor="partnership">Partnership</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        rows={5}
                        required
                        className="bg-background/50 backdrop-blur-sm border-white/20"
                      />
                    </div>

                    <Button type="submit" className="w-full gradient-border overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative z-10">Send Message</span>
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="glass-card p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Our Location</h3>
                      <p className="text-muted-foreground">123 Laundry Street, Lagos, Nigeria</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Email Us</h3>
                      <p className="text-muted-foreground">
                        <a href="mailto:info@laundrify.com" className="hover:text-primary transition-colors">
                          info@laundrify.com
                        </a>
                      </p>
                      <p className="text-muted-foreground">
                        <a href="mailto:support@laundrify.com" className="hover:text-primary transition-colors">
                          support@laundrify.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Call Us</h3>
                      <p className="text-muted-foreground">
                        <a href="tel:+2348000000000" className="hover:text-primary transition-colors">
                          +234 800 000 0000
                        </a>{" "}
                        (Customer Service)
                      </p>
                      <p className="text-muted-foreground">
                        <a href="tel:+2348000000001" className="hover:text-primary transition-colors">
                          +234 800 000 0001
                        </a>{" "}
                        (Business Inquiries)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Business Hours</h3>
                      <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 8:00 PM</p>
                      <p className="text-muted-foreground">Saturday: 9:00 AM - 6:00 PM</p>
                      <p className="text-muted-foreground">Sunday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-1">How do I track my order?</h3>
                    <p className="text-muted-foreground">
                      You can track your order in real-time through our app or website by logging into your account and
                      navigating to the "Orders" section.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">What is your turnaround time?</h3>
                    <p className="text-muted-foreground">
                      Standard orders are typically completed within 24-48 hours. Premium members enjoy expedited
                      processing with same-day service available.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Do you offer pickup and delivery?</h3>
                    <p className="text-muted-foreground">
                      Yes, we offer free pickup and delivery for all orders. Standard members have scheduled pickup
                      days, while Premium members enjoy on-demand service.
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Button asChild variant="outline" className="w-full">
                    <a href="/faq">View All FAQs</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">Find Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visit our main facility or one of our many drop-off locations throughout the city.
            </p>
          </div>
          <div className="aspect-[16/9] w-full max-w-5xl mx-auto rounded-xl overflow-hidden gradient-border">
            <div className="gradient-border-content h-full">
              <div className="relative w-full h-full bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Interactive map would be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
