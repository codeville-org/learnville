import React from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function AllBlogsSkeleton() {
  return (
    <>
      {/* Featured Articles Skeleton */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* First Featured Blog - Vertical Layout */}
        <Card className="shadow-none p-4 w-full">
          <div className="space-y-3">
            {/* Featured Image */}
            <div className="w-full aspect-video relative overflow-hidden rounded-md">
              <Skeleton className="w-full h-full" />
              {/* Badge skeleton */}
              <Skeleton className="absolute top-2 left-2 h-6 w-20 rounded-md" />
            </div>

            {/* Content */}
            <div className="space-y-1 px-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-4/5" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Date */}
            <div className="mt-4 px-2">
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </Card>

        {/* Second and Third Featured Blogs - Horizontal Layouts */}
        <Card className="shadow-none p-4 col-span-2 flex flex-col gap-4">
          {/* Second Blog */}
          <div className="flex gap-4 flex-1 items-center">
            <Skeleton className="w-1/3 aspect-video rounded-md flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          {/* Third Blog */}
          <div className="flex gap-4 flex-1 items-center">
            <Skeleton className="w-1/3 aspect-video rounded-md flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </Card>
      </div>

      {/* Rest Articles Skeleton */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="shadow-none p-4 w-full">
            <div className="space-y-3">
              {/* Image */}
              <div className="w-full aspect-video relative overflow-hidden rounded-md">
                <Skeleton className="w-full h-full" />
                <Skeleton className="absolute top-2 left-2 h-6 w-20 rounded-md" />
              </div>

              {/* Content */}
              <div className="space-y-1 px-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Date */}
              <div className="mt-4 px-2">
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="pb-6 mt-8 flex justify-center">
        <Skeleton className="h-10 w-64" />
      </div>
    </>
  )
}
