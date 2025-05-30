"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Search } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Keeping Your Clothes Looking New",
    excerpt: "Learn how to extend the life of your favorite garments with these expert tips.",
    date: "May 15, 2023",
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611411/laundrifica_images/blog/laundry-tips-main_g12kep.jpg",
    category: "Clothing Care",
    tags: ["clothing", "maintenance", "tips"],
  },
  {
    id: 2,
    title: "The Environmental Impact of Laundry Detergents",
    excerpt: "Discover eco-friendly alternatives that are better for the planet and your clothes.",
    date: "June 2, 2023",
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611403/laundrifica_images/blog/eco-detergents_fwrd7v.jpg",
    category: "Sustainability",
    tags: ["eco-friendly", "environment", "detergents"],
  },
  {
    id: 3,
    title: "How to Remove Common Stains from Your Clothes",
    excerpt: "A comprehensive guide to tackling everything from coffee to ink stains.",
    date: "July 10, 2023",
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611418/laundrifica_images/blog/stain-removal-main_m6ojih.jpg",
    category: "Stain Removal",
    tags: ["stains", "cleaning", "tips"],
  },
  {
    id: 4,
    title: "The Science Behind Dry Cleaning",
    excerpt: "Understanding the process and chemicals used in professional dry cleaning.",
    date: "August 5, 2023",
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611410/laundrifica_images/blog/fabric-care-guide_vxjrtv.jpg",
    category: "Dry Cleaning",
    tags: ["dry cleaning", "science", "professional"],
  },
  {
    id: 5,
    title: "Seasonal Laundry Tips: Summer Edition",
    excerpt: "Special care instructions for your summer wardrobe and fabrics.",
    date: "August 22, 2023",
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611418/laundrifica_images/blog/seasonal-tips_reuxib.jpg",
    category: "Seasonal Tips",
    tags: ["summer", "seasonal", "tips"],
  },
  {
    id: 6,
    title: "The History of Laundry: From Rivers to Machines",
    excerpt: "A fascinating journey through the evolution of laundry practices throughout history.",
    date: "September 15, 2023",
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611410/laundrifica_images/blog/laundry-history_hrxmiq.jpg",
    category: "History",
    tags: ["history", "evolution", "technology"],
  },
]

const categories = [
  "All",
  "Clothing Care",
  "Sustainability",
  "Stain Removal",
  "Dry Cleaning",
  "Seasonal Tips",
  "History",
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = activeCategory === "All" || post.category === activeCategory

    return matchesSearch && matchesCategory
  })

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
              <span className="text-sm font-medium text-primary">Our Blog</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">Laundrifica Insights</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Tips, tricks, and insights about laundry care and clothing maintenance from our experts.
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="pl-10 bg-background/50 backdrop-blur-sm border-white/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 md:py-24">
        <div className="container">
          <Tabs defaultValue="All" className="mb-12">
            <TabsList className="flex flex-wrap h-auto p-1 bg-muted/50 backdrop-blur-sm">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => setActiveCategory(category)}
                  className="data-[state=active]:gradient-text"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {filteredPosts.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredPosts.map((post) => (
                <motion.div key={post.id} variants={item}>
                  <Link href={`/blog/${post.id}`} className="group block">
                    <div className="gradient-border rounded-xl overflow-hidden transition-all duration-300 group-hover:shadow-lg">
                      <div className="gradient-border-content">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-primary/80 backdrop-blur-sm hover:bg-primary">{post.category}</Badge>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center text-sm text-muted-foreground mb-3">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            {post.date}
                          </div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="bg-background/50">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("All")
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}

          {filteredPosts.length > 0 && (
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 md:py-24 bg-muted/30">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center glass-card p-8 md:p-12 rounded-2xl relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-muted-foreground mb-6">
                Get the latest laundry tips, tricks, and exclusive offers delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-background/50 backdrop-blur-sm border-white/20"
                />
                <Button className="gradient-border overflow-hidden group whitespace-nowrap">
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10">Subscribe</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
