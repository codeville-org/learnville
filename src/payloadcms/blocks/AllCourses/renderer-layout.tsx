import React, { Suspense } from 'react'
import { BlockRendererProps, AllCoursesBlock } from '../types'
import { AllCoursesRendererClient } from './renderer-client'
import { AllCoursesSkeleton } from './skeleton'

export function AllCoursesBlockRenderer({
  data,
  searchParams,
}: BlockRendererProps<AllCoursesBlock>) {
  const {} = data

  return (
    <div className="w-full h-full bg-secondary/10">
      <div className="container mx-auto pt-8">
        {/* Suspense Boundary With Course Listing Client */}
        <Suspense fallback={<AllCoursesSkeleton />}>
          <AllCoursesRendererClient searchParams={searchParams!} />
        </Suspense>
      </div>
    </div>
  )
}
