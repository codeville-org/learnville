import React from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function AllCategoriesSkeleton() {
  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <Card
          key={index}
          className="p-4 shadow-none flex flex-row items-center gap-2 bg-linear-to-t from-emerald-50/30 to-white"
        >
          {/* Icon skeleton */}
          <Skeleton className="size-11 rounded-md flex-shrink-0" />

          {/* Content skeleton */}
          <div className="space-y-2 flex-1">
            {/* Category name */}
            <Skeleton className="h-5 w-3/4" />
            {/* Category description */}
            <Skeleton className="h-3 w-full" />
          </div>
        </Card>
      ))}
    </div>
  )
}
