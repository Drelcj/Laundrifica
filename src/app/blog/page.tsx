import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return <p>Error loading posts.</p>;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 hero-gradient overflow-hidden">
        <div className="absolute inset-0 grid-pattern"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20">
              <span className="text-sm font-medium text-primary">Our Blog</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">LaundriLab Insights</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Tips, tricks, and insights about laundry care and clothing maintenance from our experts.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 md:py-24">
        <div className="container">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                                <Link href={`/blog/${post.id}`} key={post.id} className="block group">
                  <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                    <div className="relative w-full h-56">
                      <Image
                        src={post.image_url ?? '/placeholder.svg'}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary/80 backdrop-blur-sm hover:bg-primary">{post.category}</Badge>
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        {new Date(post.created_at).toLocaleDateString()}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 flex-grow">{post.excerpt}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-4">There are currently no blog posts. Check back later!</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center glass-card p-8 md:p-12 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5"></div>
            <form className="relative z-10">
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
                <Button type="submit">Subscribe</Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
