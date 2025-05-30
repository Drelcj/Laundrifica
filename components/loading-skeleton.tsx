import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
}

export function ProductCardSkeleton() {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <Skeleton className="aspect-square w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-8 flex-1" />
        <Skeleton className="h-8 flex-1" />
      </div>
    </div>
  )
}

export function HeroSectionSkeleton() {
  return (
    <div className="relative h-[600px] md:h-[700px] w-full bg-gray-200 animate-pulse">
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-6 w-48 mx-auto" />
          <Skeleton className="h-16 w-full max-w-3xl mx-auto" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
          <Skeleton className="h-12 w-32 mx-auto" />
        </div>
      </div>
    </div>
  )
}
