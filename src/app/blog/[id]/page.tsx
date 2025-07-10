import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, Clock, Facebook, MessageCircle, Share2, Twitter } from "lucide-react";
import { LikeButton } from '@/components/blog/like-button';
import { Comments } from '@/components/blog/comments';

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const postId = parseInt(params.id, 10);

  if (isNaN(postId)) {
    notFound();
  }

  const supabase = await createClient();
  const { data: userResponse } = await supabase.auth.getUser();
  const user = userResponse.user;

  const { data: post, error: postError } = await supabase
    .from('posts')
    .select('*, profiles(*), categories(name)')
    .eq('id', postId)
    .single();

  if (postError || !post) {
    notFound();
  }

  const { data: comments, error: commentsError } = await supabase
    .from('comments')
    .select('*, profiles(*)')
    .eq('post_id', postId)
    .order('created_at', { ascending: false });

  const { data: likes, error: likesError } = await supabase
    .from('likes')
    .select('*', { count: 'exact' })
    .eq('post_id', postId);

  const { data: userLike } = user ? await supabase
    .from('likes')
    .select('*')
    .eq('post_id', postId)
    .eq('user_id', user.id)
    .single() : { data: null };

  return (
    <div className="bg-background text-foreground">
      <section className="relative py-20 md:py-32 hero-gradient">
        <div className="absolute inset-0 dot-pattern opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {post.categories && (
              <Badge variant="secondary" className="mb-4">
                {post.categories.name}
              </Badge>
            )}
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">{post.title}</h1>
            <div className="flex items-center justify-center space-x-4 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5" />
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-4">
              <Avatar>
                <AvatarImage src={post.profiles?.avatar_url ?? ''} alt={post.profiles?.full_name ?? ''} />
                <AvatarFallback>{post.profiles?.full_name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{post.profiles?.full_name}</p>
                <p className="text-sm text-muted-foreground">Author</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-8">
                <Image
                  src={post.image_url ?? '/placeholder.svg'}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <article
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
              />
              
              <div className="mt-12 py-6 border-t border-b border-border/50 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                                    <LikeButton postId={post.id} likes={likes?.length ?? 0} isLiked={!!userLike} user={user} />
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5" />
                    <span>{comments?.length ?? 0}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Share:</span>
                  <Button variant="ghost" size="icon">
                    <Twitter className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Facebook className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="mt-12">
                <Comments postId={post.id} initialComments={comments ?? []} user={user} />
              </div>
            </div>

            {/* Sidebar could be a separate component and fetch its own data */}
            <div className="lg:col-span-1">
              {/* Placeholder for related posts, categories, newsletter */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
