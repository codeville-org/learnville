import type { CollectionBeforeChangeHook } from 'payload'
import type { User } from '@/payload-types'

export const calculateInstructorStats: CollectionBeforeChangeHook<User> = async ({
  data,
  req,
  operation,
}) => {
  // Only calculate stats for users with instructor role
  if (!data?.roles?.includes('instructor')) {
    return data
  }

  // Skip if this is a create operation (no courses yet)
  if (operation === 'create') {
    return data
  }

  try {
    const instructorId = data.id

    // Get all courses by this instructor
    const courses = await req.payload.find({
      collection: 'courses',
      where: {
        instructor: {
          equals: instructorId,
        },
      },
      depth: 0,
      limit: 1000,
      req,
      overrideAccess: true,
    })

    const courseIds = courses.docs.map((course) => course.id)

    // Initialize stats
    let totalStudents = 0
    let totalReviews = 0
    let weightedRatingSum = 0

    if (courseIds.length > 0) {
      // Get unique students enrolled across all instructor's courses
      const enrollments = await req.payload.find({
        collection: 'course-enrollments',
        where: {
          course: {
            in: courseIds,
          },
        },
        depth: 0,
        limit: 10000,
        req,
        overrideAccess: true,
      })

      // Count unique students
      const uniqueStudents = new Set(
        enrollments.docs.map((enrollment) =>
          enrollment.customer instanceof Object ? enrollment.customer.id : enrollment.customer,
        ),
      )
      totalStudents = uniqueStudents.size

      // Fetch all approved reviews for instructor's courses
      const reviews = await req.payload.find({
        collection: 'reviews',
        where: {
          and: [{ course: { in: courseIds } }, { isApproved: { equals: true } }],
        },
        depth: 0,
        limit: 0, // Get all reviews
        req,
        overrideAccess: true,
      })

      totalReviews = reviews.totalDocs
      weightedRatingSum = reviews.docs.reduce((sum, review) => sum + (review.rating || 0), 0)
    }

    // Update instructor stats
    if (!data.instructorStats) {
      data.instructorStats = {}
    }

    data.instructorStats.totalCourses = courses.totalDocs
    data.instructorStats.totalStudents = totalStudents
    data.instructorStats.averageRating =
      totalReviews > 0 ? Math.round((weightedRatingSum / totalReviews) * 10) / 10 : 0
    data.instructorStats.totalReviews = totalReviews
  } catch (error) {
    // Log error but don't fail the save operation
    console.error('Error calculating instructor stats:', error)
  }

  return data
}
