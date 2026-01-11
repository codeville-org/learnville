import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function SingleCourseLoadingPage() {
  return (
    <div className="w-full space-y-4">
      <Skeleton className="w-full aspect-video rounded-md" />

      <div className="space-y-1">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  )
}
