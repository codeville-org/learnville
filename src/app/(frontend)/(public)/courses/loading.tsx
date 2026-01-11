import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function CoursesLoadingPage() {
  return (
    <div className="w-full grid grid-cols-2 gap-3">
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} className="w-full aspect-video" />
        ))}
    </div>
  )
}
