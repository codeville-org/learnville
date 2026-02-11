import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { BlogsBreadcrumb } from '../components/blogs-breadcrumb'

type Props = {}

export default function BlogPageLoading({}: Props) {
  return (
    <div className={cn('pb-16 md:pb-24')}>
      <div className="container mx-auto px-4 pt-8">
        {/* BreadCrumb Skeleton */}
        <div className="mb-4 hidden sm:flex items-center justify-between">
          <BlogsBreadcrumb loading={true} />

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Skeleton className="size-4" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="size-4" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>

        {/* Featured Image Skeleton */}
        <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-lg">
          <Skeleton className="w-full h-full" />

          {/* Title Skeleton Overlay */}
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-8 md:pb-12">
              <Skeleton className="h-8 md:h-10 lg:h-12 w-3/4 bg-white/20" />
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="max-w-4xl mx-auto">
          <div className="mt-8 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />

            <div className="pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <div className="pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>

          <Separator className="my-6" />

          {/* Author Skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="size-9 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
