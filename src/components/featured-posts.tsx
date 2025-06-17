import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"

const posts = [
  {
    id: 1,
    title: "10 Tips for Keeping Your Clothes Looking New",
    excerpt: "Learn how to extend the life of your favorite garments with these expert tips.",
    date: "May 15, 2023",
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611462/laundrifica_images/services/ironing-hero_ym2dhe.jpg",
    category: "Clothing Care",
  },
  {
    id: 2,
    title: "The Environmental Impact of Laundry Detergents",
    excerpt: "Discover eco-friendly alternatives that are better for the planet and your clothes.",
    date: "June 2, 2023",
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611461/laundrifica_images/services/eco-cleaning_xszhxb.jpg",
    category: "Sustainability",
  },
  {
    id: 3,
    title: "How to Remove Common Stains from Your Clothes",
    excerpt: "A comprehensive guide to tackling everything from coffee to ink stains.",
    date: "July 10, 2023",
    image: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611439/laundrifica_images/hero/pristine-garment-care_rzopts.jpg",
    category: "Stain Removal",
  },
]

export function FeaturedPosts() {
  return (
    <section className="container py-12 md:py-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div>
          <h2 className="font-heading text-3xl md:text-4xl mb-4">From Our Blog</h2>
          <p className="text-muted-foreground max-w-2xl">
            Tips, tricks, and insights about laundry care and clothing maintenance.
          </p>
        </div>
        <Button asChild variant="outline" className="mt-4 md:mt-0">
          <Link href="/blog">View All Posts</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden flex flex-col">
            <div className="aspect-video relative">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded">
                {post.category}
              </div>
            </div>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-xl">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-1">
              <CardDescription className="mb-4">{post.excerpt}</CardDescription>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {post.date}
              </div>
            </CardContent>
            <CardFooter className="p-4">
              <Button asChild variant="outline" className="w-full">
                <Link href={`/blog/post/${post.id}`}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
