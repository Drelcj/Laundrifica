'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toggleLike } from '@/app/blog/actions'
import type { User } from '@supabase/supabase-js'

interface LikeButtonProps {
  postId: number
  likes: number
  isLiked: boolean
  user: User | null
}

export function LikeButton({ postId, likes, isLiked, user }: LikeButtonProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    if (!user) {
      router.push('/login')
      return
    }

    startTransition(() => {
      toggleLike(postId)
    })
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleClick} disabled={isPending}>
      <Heart
        className={`w-5 h-5 transition-colors ${isLiked ? 'text-red-500 fill-current' : 'text-gray-500'}`}
      />
      <span className="ml-2 text-sm tabular-nums">{likes}</span>
    </Button>
  )
}
