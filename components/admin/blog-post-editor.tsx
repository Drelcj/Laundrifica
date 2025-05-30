"use client"

import type React from "react"

import { useState } from "react"
import { Bold, Italic, Link, List, ListOrdered, ImageIcon, Code, Heading1, Heading2, Heading3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function BlogPostEditor() {
  const [content, setContent] = useState("")
  const [preview, setPreview] = useState("")

  // This would be replaced with a real markdown parser in a production app
  const generatePreview = (markdown: string) => {
    // Simple markdown to HTML conversion for preview
    return markdown
      .replace(/# (.*?)$/gm, "<h1>$1</h1>")
      .replace(/## (.*?)$/gm, "<h2>$1</h2>")
      .replace(/### (.*?)$/gm, "<h3>$1</h3>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2">$1</a>')
      .replace(/```(.*?)```/gs, "<pre><code>$1</code></pre>")
      .replace(/`(.*?)`/g, "<code>$1</code>")
      .replace(/!\[(.*?)\]$$(.*?)$$/g, '<img alt="$1" src="$2" />')
      .replace(/^\* (.*?)$/gm, "<li>$1</li>")
      .replace(/^\d+\. (.*?)$/gm, "<li>$1</li>")
      .replace(/<\/li>\n<li>/g, "</li><li>")
      .replace(/^\n+|\n+$/g, "")
      .replace(/\n\n/g, "<br/><br/>")
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setContent(newContent)
    setPreview(generatePreview(newContent))
  }

  const insertMarkdown = (markdownSyntax: string) => {
    setContent((prevContent) => {
      const newContent = prevContent + markdownSyntax
      setPreview(generatePreview(newContent))
      return newContent
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-muted/50">
        <Button variant="ghost" size="sm" onClick={() => insertMarkdown("# Heading 1\n")}>
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => insertMarkdown("## Heading 2\n")}>
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => insertMarkdown("### Heading 3\n")}>
          <Heading3 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => insertMarkdown("**Bold text**")}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => insertMarkdown("*Italic text*")}>
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => insertMarkdown("[Link text](https://example.com)")}>
          <Link className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => insertMarkdown("\n* List item\n* List item\n* List item\n")}>
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown("\n1. First item\n2. Second item\n3. Third item\n")}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertMarkdown("![Image description](/placeholder.svg?height=300&width=500)")}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => insertMarkdown("\n```\ncode block\n```\n")}>
          <Code className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="write" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="write" className="mt-0 border rounded-lg p-4">
          <textarea
            value={content}
            onChange={handleContentChange}
            className="w-full min-h-[400px] p-4 border-0 focus:outline-none resize-y bg-transparent"
            placeholder="Write your blog post content here using Markdown..."
          />
        </TabsContent>
        <TabsContent value="preview" className="mt-0 border rounded-lg p-4">
          <div className="prose max-w-none min-h-[400px] p-4">
            {preview ? (
              <div dangerouslySetInnerHTML={{ __html: preview }} />
            ) : (
              <p className="text-muted-foreground">Preview will appear here...</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
