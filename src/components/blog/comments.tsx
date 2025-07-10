'use client'

import { useTransition, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { addComment } from '@/app/blog/actions'
import type { User } from '@supabase/supabase-js'
import type { Profile } from '@/types/app'

interface Comment {
  id: number
  content: string
  created_at: string
  profiles: Profile | null
}

interface CommentsProps {
  postId: number
  initialComments: Comment[]
  user: User | null
}

export function Comments({ postId, initialComments, user }: CommentsProps) {
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)

  const handleFormAction = async (formData: FormData) => {
    const content = formData.get('content') as string
    if (!content.trim()) return

    startTransition(async () => {
      const result = await addComment(postId, content)
      if (result?.error) {
        // TODO: Add user-facing error handling (e.g., toast notification)
        console.error(result.error)
      } else {
        formRef.current?.reset()
      }
    })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Comments ({initialComments.length})</h3>
      {user ? (
        <form ref={formRef} action={handleFormAction} className="space-y-4">
          <Textarea
            placeholder="Write a comment..."
            name="content"
            rows={4}
            required
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Posting...' : 'Post Comment'}
          </Button>
        </form>
      ) : (
        <p>
          <a href="/login" className="underline">
            Log in
          </a>{' '}
          to post a comment.
        </p>
      )}

      <div className="space-y-4">
        {initialComments.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <div className="flex-shrink-0">
              <img
                src={comment.profiles?.avatar_url ?? '/default-avatar.png'}
                alt={comment.profiles?.full_name ?? 'User'}
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div>
              <p className="font-semibold">{comment.profiles?.full_name ?? 'Anonymous'}</p>
              <p className="text-sm text-gray-500">{new Date(comment.created_at).toLocaleDateString()}</p>
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

