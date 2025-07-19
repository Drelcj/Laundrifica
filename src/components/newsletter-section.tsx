"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    setIsSubscribed(true)
    setEmail("")
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
      <div className="container max-w-4xl mx-auto text-center px-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">Stay Updated with LaundriLab</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get the latest tips on fabric care, exclusive offers, and updates on our services. Your fabric's pristine
              care starts with staying informed.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {isSubscribed ? (
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                <Button type="submit" className="px-6">
                  <Mail className="h-4 w-4 mr-2" />
                  Subscribe
                </Button>
              </form>
            )}
          </div>

          <p className="text-sm text-muted-foreground">
            Join thousands of satisfied customers who trust LaundriLab for their fabric care needs.
          </p>
        </div>
      </div>
    </section>
  )
}
