import { CollectionAfterChangeHook } from 'payload'
import type { CourseEnrollment } from '@/payload-types'

/**
 * After an enrollment is created or updated, sync the customer's
 * `enrolledCourses` relationship field to keep it in sync.
 */
export const afterChange: CollectionAfterChangeHook<CourseEnrollment> = async ({
  doc,
  req,
  operation,
  context,
}) => {
  // Prevent infinite loops if this hook triggers itself
  if (context.skipEnrollmentSync) return doc

  if (operation === 'create') {
    try {
      const customerId = typeof doc.customer === 'object' ? doc.customer.id : doc.customer

      const customer = await req.payload.findByID({
        collection: 'customers',
        id: customerId,
        req,
        depth: 0,
      })

      // Get existing enrollment IDs
      const existingEnrollments = (customer.enrolledCourses || []).map((e) =>
        typeof e === 'object' ? e.id : e,
      )

      // Add the new enrollment if not already present
      if (!existingEnrollments.includes(doc.id)) {
        await req.payload.update({
          collection: 'customers',
          id: customerId,
          data: {
            enrolledCourses: [...existingEnrollments, doc.id],
          },
          req,
          context: { skipEnrollmentSync: true },
        })
      }
    } catch (error) {
      console.error('Error syncing enrolledCourses on create:', error)
    }
  }

  return doc
}
