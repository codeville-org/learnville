import type { Access, Where } from 'payload'
import { checkRole } from '@/payloadcms/collections/Users/access/check-role'
import { User } from '@/payload-types'

/**
 * Access control for Reviews collection
 * - Admins can see all reviews
 * - Instructors can only see reviews for courses they created
 * - Customers can only see their own reviews
 * - For public frontend access, use overrideAccess: true in Local API
 */
export const reviewsRead: Access = async ({ req }) => {
  const { user, payload } = req

  if (!user) return false

  // Admins can see all reviews
  if (checkRole(['admin', 'editor'], user as User)) {
    return true
  }

  // Instructors can only see reviews for their courses
  if (checkRole(['instructor'], user as User)) {
    // Find all courses owned by this instructor
    const instructorCourses = await payload.find({
      collection: 'courses',
      where: {
        instructor: { equals: user.id },
      },
      depth: 0,
      limit: 0, // Get all courses
    })

    const courseIds = instructorCourses.docs.map((course) => course.id)

    if (courseIds.length === 0) {
      return false // No courses, no reviews to show
    }

    return {
      course: {
        in: courseIds,
      },
    } as Where
  }

  // Customers can only see their own reviews
  if (user.collection === 'customers') {
    return {
      customer: {
        equals: user.id,
      },
    } as Where
  }

  return false
}
