import type { Access, Where } from 'payload'
import { checkRole } from '@/payloadcms/collections/Users/access/check-role'
import type { User } from '@/payload-types'

/**
 * Lesson read access control:
 * - Admin/Editor: all lessons
 * - Instructor: own course lessons (via instructor field)
 * - Customer (students): preview lessons + lessons from enrolled courses
 * - Public (no user): only preview lessons
 */
export const lessonRead: Access = async ({ req }) => {
  const { user } = req

  // Public access: only preview lessons
  if (!user) {
    return {
      isPreview: { equals: true },
    } as Where
  }

  // Admin users collection: admins and editors see all, instructors see own
  if (user.collection === 'users') {
    if (checkRole(['admin', 'editor'], user as User)) {
      return true
    }

    if (checkRole(['instructor'], user as User)) {
      return {
        instructor: { equals: user.id },
      } as Where
    }

    return false
  }

  // Customer collection: preview lessons + lessons from enrolled courses
  if (user.collection === 'customers') {
    // Fetch active/completed enrollments for this customer
    const enrollments = await req.payload.find({
      collection: 'course-enrollments',
      where: {
        and: [
          { customer: { equals: user.id } },
          {
            status: {
              in: ['active', 'completed'],
            },
          },
        ],
      },
      depth: 0,
      limit: 0, // Get all enrollments
      req,
    })

    const enrolledCourseIds = enrollments.docs.map((enrollment) =>
      typeof enrollment.course === 'object' ? enrollment.course.id : enrollment.course,
    )

    // If student has no enrollments, only show preview lessons
    if (enrolledCourseIds.length === 0) {
      return {
        isPreview: { equals: true },
      } as Where
    }

    // Show preview lessons OR lessons from enrolled courses
    return {
      or: [{ isPreview: { equals: true } }, { course: { in: enrolledCourseIds } }],
    } as Where
  }

  return false
}
