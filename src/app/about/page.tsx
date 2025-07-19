"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Award, Clock, Droplets, Leaf, ShieldCheck, Users } from "lucide-react"

const teamMembers = [
  {
    name: "Emmanuel Chijioke",
    role: "Founder & CEO",
    bio: "With over 15 years in the laundry industry, Adebayo founded LaundriLab to revolutionize how people handle their laundry needs.",
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1746121522/Emmanuelchijioke/emmanuel-chijioke_jxc5hf.jpg",
  },
  {
    name: "Gladys Ewurum",
    role: "Chief Operations Officer",
    bio: "Gladys ensures that every aspect of our operations runs smoothly, from pickup to delivery and everything in between.",
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611985/Emmanuelchijioke/Gladys_Ewurum_rqegbw.jpg",
  },
  {
    name: "Emmanuel Chijioke",
    role: "Chief Technology Officer",
    bio: "In addition to his role as Founder and CEO, Emmanuel serves as our Chief Technology Officer (CTO). He leads our tech team, driving the development of innovative solutions that ensure a seamless and efficient laundry experience.",
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1746121697/Emmanuelchijioke/emmanuel-chijioke-techmandrel_ofikix.jpg",
  },
  {
    name: "Ezinne",
    role: "Customer Experience Director",
    bio: "Ezinne is dedicated to ensuring that every customer interaction with LaundriLab exceeds expectations.",
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748613005/Emmanuelchijioke/Ezinne__em4jrt.jpg",
  },
]

const values = [
  {
    title: "Quality",
    description: "We are committed to delivering the highest quality cleaning for every garment.",
    icon: Award,
  },
  {
    title: "Reliability",
    description: "You can count on us to be there when we say we will, every time.",
    icon: Clock,
  },
  {
    title: "Sustainability",
    description: "We use eco-friendly practices and products to minimize our environmental impact.",
    icon: Leaf,
  },
  {
    title: "Innovation",
    description: "We continuously seek new technologies and methods to improve our service.",
    icon: Droplets,
  },
  {
    title: "Trust",
    description: "We handle your belongings with the utmost care and respect.",
    icon: ShieldCheck,
  },
  {
    title: "Community",
    description: "We are proud to be part of and contribute to our local communities.",
    icon: Users,
  },
]

export default function AboutPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
              <span className="text-sm font-medium text-primary">About LaundriLab</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">Revolutionizing Laundry Services</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              We're on a mission to make laundry day the easiest part of your week with cutting-edge technology and
              exceptional service.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="gradient-border overflow-hidden group">
                <Link href="/contact">
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10">Contact Us</span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative h-[200px] md:h-[300px]">
            <Image
              src="https://res.cloudinary.com/dt3czltxx/image/upload/v1748611378/laundrifica_images/about/laundrify-facility_mxsl8r.jpg"
              alt="LaundriLab Facility"
              fill
              className="object-cover rounded-t-3xl"
              priority
            />
          </div>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 md:py-32 mt-[150px] md:mt-[250px]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
                <div className="relative aspect-square rounded-2xl overflow-hidden gradient-border">
                  <div className="absolute inset-[1px] rounded-2xl overflow-hidden">
                    <Image src="https://res.cloudinary.com/dt3czltxx/image/upload/v1746121697/Emmanuelchijioke/emmanuel-chijioke-techmandrel_ofikix.jpg" alt="Our Story" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-block px-3 py-1 mb-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20">
                <span className="text-sm font-medium text-primary">Our Story</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">From Idea to Innovation</h2>
              <p className="text-lg text-muted-foreground">
                LaundriLab was born out of a simple frustration: the time-consuming and often inconvenient process of
                doing laundry. Our founder, Emmanuel Chijioke, experienced this firsthand as a busy professional in Port Harcourt.
              </p>
              <p className="text-lg text-muted-foreground">
                In 2022, he envisioned a service that would leverage technology to make laundry day effortless. What
                started as a small operation with just him as the sole employee has grown into Nigeria&apos;s leading laundry service
                platform.
              </p>
              <p className="text-lg text-muted-foreground">
                Today, LaundriLab serves customers across major cities in Port Harcourt and expanding into other cities in Nigeria, with a team of dedicated
                professionals committed to providing exceptional service and innovative solutions for all your laundry
                needs.
              </p>
              <div className="pt-4">
                <Button asChild className="gradient-border overflow-hidden group">
                  <Link href="/services">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10">Explore Our Services</span>
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 md:py-32 bg-muted/30 dot-pattern">
        <div className="container">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20">
              <span className="text-sm font-medium text-primary">Our Values</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-6">What Drives Us</h2>
            <p className="text-lg text-muted-foreground">
              At LaundriLab, our core values guide everything we do. They shape our culture, inform our decisions, and
              help us deliver exceptional service to our customers.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {values.map((value) => (
              <motion.div key={value.title} variants={item}>
                <div className="glass-card p-6 rounded-xl h-full">
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 backdrop-blur-sm">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20">
              <span className="text-sm font-medium text-primary">Our Team</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-6">Meet the Experts</h2>
            <p className="text-lg text-muted-foreground">
              Our dedicated team of professionals is committed to providing you with the best laundry experience
              possible.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {teamMembers.map((member) => (
              <motion.div key={member.name} variants={item}>
                <div className="group">
                  <div className="relative overflow-hidden rounded-xl gradient-border mb-4">
                    <div className="absolute inset-[1px] rounded-[calc(0.75rem-1px)] overflow-hidden">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={300}
                        height={300}
                        className="object-cover aspect-square transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-4xl md:text-6xl font-bold mb-2">3+</h3>
              <p className="text-primary-foreground/80">Years in Business</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-4xl md:text-6xl font-bold mb-2">100+</h3>
              <p className="text-primary-foreground/80">Happy Customers</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-4xl md:text-6xl font-bold mb-2">1.2+</h3>
              <p className="text-primary-foreground/80">Orders Completed</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-4xl md:text-6xl font-bold mb-2">6</h3>
              <p className="text-primary-foreground/80">Cities Served</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <motion.div
            className="max-w-4xl mx-auto text-center glass-card p-12 rounded-3xl relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">Ready to Experience LaundriLab?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join hundreds of satisfied customers who have made laundry day the easiest part of their week.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="gradient-border overflow-hidden group">
                  <Link href="/signup">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10">Get Started</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
