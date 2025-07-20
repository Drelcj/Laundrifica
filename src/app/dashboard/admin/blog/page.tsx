import type { Metadata } from "next"
import { EditIcon, EyeIcon, PlusIcon, SearchIcon, TrashIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Blog Management | LaundryLab Admin",
  description: "Manage all blog posts and content",
}

// Mock data for blog posts
const blogPosts = [
  {
    id: "POST-001",
    title: "10 Tips for Keeping Your Clothes Fresh Longer",
    author: "Chioma Okafor",
    category: "Laundry Tips",
    status: "Published",
    publishDate: "2023-05-10",
    views: 1245,
    comments: 32,
  },
  {
    id: "POST-002",
    title: "The Ultimate Guide to Removing Tough Stains",
    author: "Emeka Eze",
    category: "Stain Removal",
    status: "Published",
    publishDate: "2023-05-05",
    views: 2180,
    comments: 45,
  },
  {
    id: "POST-003",
    title: "How to Care for Delicate Fabrics",
    author: "Fatima Ibrahim",
    category: "Fabric Care",
    status: "Draft",
    publishDate: "-",
    views: 0,
    comments: 0,
  },
  {
    id: "POST-004",
    title: "Eco-Friendly Laundry Practices for a Greener Home",
    author: "Tunde Bakare",
    category: "Eco-Friendly",
    status: "Published",
    publishDate: "2023-04-28",
    views: 876,
    comments: 18,
  },
  {
    id: "POST-005",
    title: "Laundry Hacks Every Nigerian Should Know",
    author: "Chioma Okafor",
    category: "Laundry Tips",
    status: "Scheduled",
    publishDate: "2023-05-25",
    views: 0,
    comments: 0,
  },
]

// Helper function to get status badge color
function getStatusColor(status: string) {
  switch (status) {
    case "Published":
      return "bg-green-100 text-green-800"
    case "Draft":
      return "bg-gray-100 text-gray-800"
    case "Scheduled":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function BlogPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Blog Management</h2>
        <div className="flex items-center gap-2">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search posts by title, author, or category..." className="pl-8" />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Blog Posts</CardTitle>
              <CardDescription>Showing {blogPosts.length} blog posts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Publish Date</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Comments</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.id}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{post.title}</TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>{post.category}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(post.status)}>{post.status}</Badge>
                      </TableCell>
                      <TableCell>{post.publishDate}</TableCell>
                      <TableCell>{post.views.toLocaleString()}</TableCell>
                      <TableCell>{post.comments}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <EditIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="published" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Published Posts</CardTitle>
              <CardDescription>Posts that are live on the website</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure for published posts */}
              <div className="text-center py-8 text-muted-foreground">Filtered published posts would appear here</div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="drafts" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Draft Posts</CardTitle>
              <CardDescription>Posts that are still being worked on</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure for draft posts */}
              <div className="text-center py-8 text-muted-foreground">Filtered draft posts would appear here</div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="scheduled" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Posts</CardTitle>
              <CardDescription>Posts scheduled for future publication</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure for scheduled posts */}
              <div className="text-center py-8 text-muted-foreground">Filtered scheduled posts would appear here</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
