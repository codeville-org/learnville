import React from 'react'
import { getPayload, Where } from 'payload'
import config from '@payload-config'
import type { SearchParams } from 'nuqs/server'

import { parseSearchParams } from '@/lib/seachparams'
import { Pagination } from '@/components/ui/pagination'
import { transformCoursesToHydrated } from '@/lib/hydrate-page-blocks'
import { CategoryFilter } from './_components/category-filter'
import { CourseCard } from '@/components/shared/course-card'
import { BookOpenIcon } from 'lucide-react'

interface Props {
  searchParams: Promise<SearchParams>
}

/** Select only the fields needed for HydratedCourseData */
const COURSE_SELECT = {
  title: true,
  slug: true,
  shortDescription: true,
  thumbnail: true,
  overallRating: true,
  level: true,
  pricingType: true,
  price: true,
  instructor: true,
  chapters: { lessons: true },
  estimatedDuration: true,
  category: true,
} as const

export async function AllCoursesRendererClient({ searchParams }: Props) {
  const { category, page, limit } = parseSearchParams(await searchParams)

  const payload = await getPayload({ config })

  // Build where clause: only published courses + optional category filter
  const where: Where = {
    _status: { equals: 'published' },
  }

  if (category) {
    where['category.slug'] = { equals: category }
  }

  // Fetch courses and categories in parallel for performance
  const [coursesResult, categoriesResult] = await Promise.all([
    payload.find({
      collection: 'courses',
      where,
      page,
      limit,
      depth: 2, // Populate thumbnail (Media), instructor (User → avatar), category
      sort: '-createdAt',
      select: COURSE_SELECT,
      overrideAccess: true, // Required: courses read access blocks unauthenticated users
      pagination: true,
    }),
    payload.find({
      collection: 'categories',
      depth: 0,
      limit: 50,
      sort: 'name',
      select: { name: true, slug: true },
      overrideAccess: true,
    }),
  ])

  // Transform raw Course docs → HydratedCourseData for CourseCard
  const courses = transformCoursesToHydrated(coursesResult.docs)

  const categories = categoriesResult.docs.map((cat) => ({
    name: cat.name,
    slug: cat.slug,
  }))

  return (
    <div className="w-full space-y-8 pb-8">
      {/* Category Filter Bar */}
      <CategoryFilter categories={categories} activeCategory={category} />

      {/* Courses Grid */}
      {courses.length > 0 ? (
        <div className="w-full px-0 space-y-8 sm:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} data={course} />
            ))}
          </div>

          {/* Results Summary */}
          <p className="text-sm text-gray-500">
            Showing {courses.length} of {coursesResult.totalDocs} course
            {coursesResult.totalDocs !== 1 ? 's' : ''}
          </p>

          {/* Pagination */}
          <Pagination
            totalPages={coursesResult.totalPages}
            currentPage={page}
            hasNextPage={coursesResult.hasNextPage}
            hasPrevPage={coursesResult.hasPrevPage}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="p-4 rounded-full bg-gray-100 mb-4">
            <BookOpenIcon className="size-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No courses found</h3>
          <p className="text-sm text-gray-500 mt-1">
            {category
              ? 'Try selecting a different category or browse all courses.'
              : 'Check back soon for new courses.'}
          </p>
        </div>
      )}
    </div>
  )
}
