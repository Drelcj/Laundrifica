"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa"
import { Eye, EyeOff, CheckCircle2 } from "lucide-react"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [membershipType, setMembershipType] = useState("standard")

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 hero-gradient">
      <div className="absolute inset-0 dot-pattern opacity-30"></div>
      <motion.div
        className="max-w-md w-full space-y-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link href="/" className="inline-block">
              <h2 className="text-3xl font-bold gradient-text">Laundrify</h2>
            </Link>
          </motion.div>
          <motion.h2
            className="mt-6 text-3xl font-extrabold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Create your account
          </motion.h2>
          <motion.p
            className="mt-2 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:text-primary/80">
              Sign in
            </Link>
          </motion.p>
        </div>

        <motion.div
          className="glass-card p-6 rounded-2xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  className="bg-background/50 backdrop-blur-sm border-white/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" className="bg-background/50 backdrop-blur-sm border-white/20" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
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
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-background/50 backdrop-blur-sm border-white/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Password must be at least 8 characters long with a number and special character.
              </p>
            </div>

            <div className="space-y-3">
              <Label>Membership Type</Label>
              <RadioGroup
                defaultValue="standard"
                value={membershipType}
                onValueChange={setMembershipType}
                className="grid grid-cols-1 gap-4"
              >
                <div
                  className={`relative rounded-lg border p-4 transition-all ${membershipType === "standard" ? "border-primary bg-primary/5" : "border-white/20"}`}
                >
                  <div className="flex items-start">
                    <RadioGroupItem value="standard" id="standard" className="mt-1" />
                    <div className="ml-3 space-y-1">
                      <Label htmlFor="standard" className="text-base font-medium">
                        Standard Membership
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Free membership with scheduled pickups and standard processing.
                      </p>
                      <ul className="mt-2 text-sm space-y-1">
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                          <span>Scheduled pickups (Mon, Wed, Fri, Sun)</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                          <span>24/7 customer support</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div
                  className={`relative rounded-lg border p-4 transition-all ${membershipType === "premium" ? "border-primary bg-primary/5" : "border-white/20"}`}
                >
                  <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground px-2 py-0.5 text-xs font-medium rounded">
                    Recommended
                  </div>
                  <div className="flex items-start">
                    <RadioGroupItem value="premium" id="premium" className="mt-1" />
                    <div className="ml-3 space-y-1">
                      <Label htmlFor="premium" className="text-base font-medium">
                        Premium Membership
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        ₦5,000/month for instant pickup and priority handling.
                      </p>
                      <ul className="mt-2 text-sm space-y-1">
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-accent mr-2" />
                          <span>Instant pickup on demand</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-accent mr-2" />
                          <span>Priority handling & faster turnaround</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-accent mr-2" />
                          <span>Free basic repairs & amendments</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </RadioGroup>
              <p className="text-xs text-muted-foreground mt-1">
                <Link href="/membership-comparison" className="text-primary hover:text-primary/80">
                  View detailed membership comparison
                </Link>
              </p>
            </div>

            <Button type="submit" className="w-full gradient-border overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10">Create Account</span>
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button variant="outline" className="bg-background/50 backdrop-blur-sm border-white/20">
                <FaGoogle className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button variant="outline" className="bg-background/50 backdrop-blur-sm border-white/20">
                <FaFacebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
              <Button variant="outline" className="bg-background/50 backdrop-blur-sm border-white/20">
                <FaTwitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
