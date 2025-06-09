"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, Clock, Facebook, Heart, MessageCircle, Share2, Twitter } from "lucide-react"

// Mock blog post data
const blogPosts = [
  {
    id: "1",
    title: "10 Tips for Keeping Your Clothes Looking New",
    excerpt: "Learn how to extend the life of your favorite garments with these expert tips.",
    content: `
      <p>Proper care is essential for maintaining the quality and appearance of your clothes. Here are ten expert tips to help you keep your garments looking new for longer:</p>
      
      <h2>1. Read and Follow Care Labels</h2>
      <p>Care labels provide specific instructions for washing, drying, and ironing your clothes. Always check these labels before cleaning any garment to avoid damage.</p>
      
      <h2>2. Sort Your Laundry Properly</h2>
      <p>Separate your clothes by color, fabric type, and soil level. This prevents color bleeding and ensures that delicate fabrics aren't damaged by washing with heavier items.</p>
      
      <h2>3. Use the Right Water Temperature</h2>
      <p>Hot water can cause colors to fade and fabrics to shrink. Use cold water for dark or bright colors and delicate fabrics, and warm water for whites and heavily soiled items.</p>
      
      <h2>4. Don't Overload Your Washing Machine</h2>
      <p>Overloading prevents clothes from getting properly cleaned and can cause excessive wear and tear. Leave enough space for clothes to move freely in the water.</p>
      
      <h2>5. Use the Right Amount of Detergent</h2>
      <p>Using too much detergent can leave residue on your clothes, while using too little won't clean them properly. Follow the manufacturer's guidelines for dosage.</p>
      
      <h2>6. Turn Clothes Inside Out</h2>
      <p>Washing clothes inside out helps protect the outer surface from fading and wear, especially for dark-colored items, printed t-shirts, and embellished garments.</p>
      
      <h2>7. Zip Up, Button Up, and Fasten Hooks</h2>
      <p>Zippers, buttons, and hooks can catch on other clothes during washing, causing snags and tears. Secure them before washing to prevent damage.</p>
      
      <h2>8. Air Dry When Possible</h2>
      <p>Heat from dryers can damage fabrics and cause shrinkage. Whenever possible, air dry your clothes on a clothesline or drying rack to preserve their shape and color.</p>
      
      <h2>9. Store Clothes Properly</h2>
      <p>Use padded or wooden hangers for hanging clothes, and fold heavy knits to prevent stretching. Keep clothes in a cool, dry place away from direct sunlight to prevent fading.</p>
      
      <h2>10. Address Stains Immediately</h2>
      <p>The longer a stain sits, the harder it is to remove. Treat stains as soon as possible with appropriate stain removers or natural solutions like vinegar or baking soda.</p>
      
      <p>By following these tips, you can significantly extend the life of your clothes and keep them looking fresh and new for years to come. Remember that different fabrics require different care, so always prioritize the specific needs of each garment.</p>
    `,
    date: "May 15, 2023",
    readTime: "8 min read",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Clothing Care",
    tags: ["clothing", "maintenance", "tips"],
    author: {
      name: "Sarah Johnson",
      role: "Textile Specialist",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    relatedPosts: [2, 3, 5],
  },
  {
    id: "2",
    title: "The Environmental Impact of Laundry Detergents",
    excerpt: "Discover eco-friendly alternatives that are better for the planet and your clothes.",
    content: `<p>This is a sample content for the second blog post.</p>`,
    date: "June 2, 2023",
    readTime: "6 min read",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Sustainability",
    tags: ["eco-friendly", "environment", "detergents"],
    author: {
      name: "David Nwachukwu",
      role: "Environmental Consultant",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    relatedPosts: [1, 3, 6],
  },
  {
    id: "3",
    title: "How to Remove Common Stains from Your Clothes",
    excerpt: "A comprehensive guide to tackling everything from coffee to ink stains.",
    content: `<p>This is a sample content for the third blog post.</p>`,
    date: "July 10, 2023",
    readTime: "10 min read",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Stain Removal",
    tags: ["stains", "cleaning", "tips"],
    author: {
      name: "Chioma Okafor",
      role: "Cleaning Expert",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    relatedPosts: [1, 2, 4],
  },
]

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<any>(null)
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data
    const fetchPost = () => {
      setIsLoading(true)
      const foundPost = blogPosts.find((p) => p.id === params.id)

      if (foundPost) {
        setPost(foundPost)

        // Get related posts
        const related = blogPosts.filter((p) => foundPost.relatedPosts.includes(Number(p.id))).slice(0, 3)

        setRelatedPosts(related)
      }

      setIsLoading(false)
    }

    fetchPost()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
        <Button asChild>
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 hero-gradient overflow-hidden">
        <div className="absolute inset-0 grid-pattern"></div>
        <div className="container relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/blog" className="inline-flex items-center text-sm text-primary mb-4 hover:underline">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20">
              <span className="text-sm font-medium text-primary">{post.category}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold gradient-text mb-6">{post.title}</h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {post.date}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {post.readTime}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{post.author.role}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="container -mt-10 relative z-20">
        <motion.div
          className="relative aspect-[16/9] rounded-xl overflow-hidden gradient-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute inset-[1px] rounded-[calc(0.75rem-1px)] overflow-hidden">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
          </div>
        </motion.div>
      </div>

      {/* Blog Content */}
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                className="glass-card p-8 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div
                  className="prose prose-lg dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>

                <div className="mt-8 pt-8 border-t border-border">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline" className="bg-background/50">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        <span>Like</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        <span>Comment</span>
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Facebook className="h-4 w-4" />
                        <span className="sr-only">Share on Facebook</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Twitter className="h-4 w-4" />
                        <span className="sr-only">Share on Twitter</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Share2 className="h-4 w-4" />
                        <span className="sr-only">Share</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Author Bio */}
              <motion.div
                className="mt-8 glass-card p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold mb-2">About {post.author.name}</h3>
                    <p className="text-muted-foreground mb-4">
                      {post.author.role} at Laundrify with expertise in fabric care and maintenance. Passionate about
                      sharing knowledge to help people take better care of their clothes.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button variant="ghost" size="sm">
                        More Articles
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Related Posts */}
              <motion.div
                className="glass-card p-6 rounded-xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="text-xl font-bold mb-6">Related Articles</h3>
                <div className="space-y-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`} className="group block">
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={relatedPost.image || "/placeholder.svg"}
                            alt={relatedPost.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">{relatedPost.date}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/blog">View All Articles</Link>
                  </Button>
                </div>
              </motion.div>

              {/* Categories */}
              <motion.div
                className="glass-card p-6 rounded-xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="text-xl font-bold mb-6">Categories</h3>
                <div className="space-y-2">
                  {["Clothing Care", "Sustainability", "Stain Removal", "Dry Cleaning", "Seasonal Tips", "History"].map(
                    (category) => (
                      <Link
                        key={category}
                        href={`/blog?category=${category}`}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <span>{category}</span>
                        <Badge variant="outline" className="bg-background/50">
                          {Math.floor(Math.random() * 10) + 1}
                        </Badge>
                      </Link>
                    ),
                  )}
                </div>
              </motion.div>

              {/* Newsletter */}
              <motion.div
                className="glass-card p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <h3 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
                <p className="text-muted-foreground mb-4">
                  Get the latest laundry tips and tricks delivered to your inbox.
                </p>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-lg bg-background/50 backdrop-blur-sm border border-white/20"
                  />
                  <Button className="w-full gradient-border overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10">Subscribe</span>
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
