'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleLike(postId: number) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to like a post.' }
  }

  // Check if the user has already liked the post
  const { data: existingLike } = await supabase
    .from('likes')
    .select('user_id')
    .eq('post_id', postId)
    .eq('user_id', user.id)
    .single()

  if (existingLike) {
    // User has liked the post, so unlike it
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error unliking post:', error)
      return { error: 'Could not unlike post.' }
    }
  } else {
    // User has not liked the post, so like it
    const { error } = await supabase
      .from('likes')
      .insert({ post_id: postId, user_id: user.id })

    if (error) {
      console.error('Error liking post:', error)
      return { error: 'Could not like post.' }
    }
  }

  // Revalidate the path to show the updated like count
  revalidatePath(`/blog/${postId}`)
  revalidatePath('/blog')

  return { success: true }
}

export async function addComment(postId: number, content: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to comment.' }
  }

  if (!content.trim()) {
    return { error: 'Comment cannot be empty.' }
  }

  const { error } = await supabase.from('comments').insert({
    post_id: postId,
    user_id: user.id,
    content: content,
  })

  if (error) {
    console.error('Error adding comment:', error)
    return { error: 'Could not add comment.' }
  }

  revalidatePath(`/blog/${postId}`)

  return { success: true }
}
