import React, { Suspense } from 'react'
import { AllBlogsBlock, BlockRendererProps } from '../types'
import { AllBlogsRendererClient } from './renderer-client'
import { AllBlogsSkeleton } from './skeleton'

export function AllBlogsBlockRenderer({ data, searchParams }: BlockRendererProps<AllBlogsBlock>) {
  const {} = data

  return (
    <div className="w-full overflow-hidden min-h-[400px] relative">
      <div className="container mx-auto px-4">
        <div className="py-2">
          <Suspense fallback={<AllBlogsSkeleton />}>
            <AllBlogsRendererClient searchParams={searchParams!} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
