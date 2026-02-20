import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function CoursesLoadingPage() {
  return (
    <div className="w-full space-y-8 pb-8">
      {/* Category Filter Skeleton */}
      <div className="flex items-center gap-2 flex-wrap">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-9 w-24 rounded-full" />
          ))}
      </div>

      {/* Courses Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="rounded-xl border p-2 space-y-3">
              <Skeleton className="w-full aspect-video rounded-xl" />
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-4 w-10" />
                </div>
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-px w-full mt-4" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
