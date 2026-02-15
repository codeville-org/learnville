import { APIError, CollectionBeforeValidateHook } from 'payload'
import type { CourseEnrollment } from '@/payload-types'

/**
 * Validates enrollment uniqueness: prevents duplicate active enrollments
 * for the same customer + course combination.
 */
export const beforeValidate: CollectionBeforeValidateHook<CourseEnrollment> = async ({
  data,
  req,
  operation,
}) => {
  if (operation !== 'create') return data

  if (!data?.customer || !data?.course) return data

  const customerId = typeof data.customer === 'object' ? data.customer.id : data.customer
  const courseId = typeof data.course === 'object' ? data.course.id : data.course

  // Check for existing active/paused enrollment for same customer + course
  const existing = await req.payload.find({
    collection: 'course-enrollments',
    where: {
      and: [
        { customer: { equals: customerId } },
        { course: { equals: courseId } },
        {
          status: {
            in: ['active', 'paused'],
          },
        },
      ],
    },
    limit: 1,
    depth: 0,
    req,
  })

  if (existing.totalDocs > 0) {
    throw new APIError(
      'An active enrollment already exists for this customer and course. Please resume the existing enrollment instead.',
      409,
    )
  }

  return data
}
