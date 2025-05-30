import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BlogPostEditor } from "@/components/admin/blog-post-editor"

export const metadata: Metadata = {
  title: "Create New Blog Post | Laundrify Admin",
  description: "Create a new blog post",
}

export default function NewBlogPostPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link href="/admin/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog Posts
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Create New Blog Post</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
              <CardDescription>Enter the basic information for your blog post</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter post title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  placeholder="Enter a short summary of your post"
                  className="resize-none"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="laundry-tips">Laundry Tips</SelectItem>
                      <SelectItem value="stain-removal">Stain Removal</SelectItem>
                      <SelectItem value="fabric-care">Fabric Care</SelectItem>
                      <SelectItem value="eco-friendly">Eco-Friendly</SelectItem>
                      <SelectItem value="news">News & Updates</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Select>
                    <SelectTrigger id="author">
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chioma">Chioma Okafor</SelectItem>
                      <SelectItem value="emeka">Emeka Eze</SelectItem>
                      <SelectItem value="fatima">Fatima Ibrahim</SelectItem>
                      <SelectItem value="tunde">Tunde Bakare</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="featured-image">Featured Image</Label>
                <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-12">
                  <div className="text-center">
                    <div className="mt-2 flex text-sm leading-6 text-muted-foreground">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
              <CardDescription>Write and format your blog post content</CardDescription>
            </CardHeader>
            <CardContent>
              <BlogPostEditor />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Optimize your post for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input id="meta-title" placeholder="Enter meta title" />
                <p className="text-xs text-muted-foreground">
                  Recommended length: 50-60 characters. Current: 0 characters.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea id="meta-description" placeholder="Enter meta description" className="resize-none" rows={3} />
                <p className="text-xs text-muted-foreground">
                  Recommended length: 150-160 characters. Current: 0 characters.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <div className="flex items-center">
                  <span className="text-muted-foreground mr-2">laundrify.com/blog/</span>
                  <Input id="slug" placeholder="enter-post-slug" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="focus-keyword">Focus Keyword</Label>
                <Input id="focus-keyword" placeholder="Enter focus keyword" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Publication Settings</CardTitle>
              <CardDescription>Configure when and how your post is published</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Publication Status</Label>
                <Select>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="publish-date">Publish Date</Label>
                <Input id="publish-date" type="datetime-local" />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="featured" className="rounded border-gray-300" />
                <Label htmlFor="featured">Feature this post on the homepage</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="comments" className="rounded border-gray-300" defaultChecked />
                <Label htmlFor="comments">Allow comments on this post</Label>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>Configure social media sharing options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="social-title">Social Media Title</Label>
                <Input id="social-title" placeholder="Enter social media title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social-description">Social Media Description</Label>
                <Textarea
                  id="social-description"
                  placeholder="Enter social media description"
                  className="resize-none"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social-image">Social Media Image</Label>
                <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-12">
                  <div className="text-center">
                    <div className="mt-2 flex text-sm leading-6 text-muted-foreground">
                      <label
                        htmlFor="social-image-upload"
                        className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
                      >
                        <span>Upload a file</span>
                        <input id="social-image-upload" name="social-image-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-muted-foreground">
                      Recommended size: 1200x630 pixels (PNG, JPG)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
