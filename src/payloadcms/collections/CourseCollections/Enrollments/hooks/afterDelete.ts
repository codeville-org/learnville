import { CollectionAfterDeleteHook } from 'payload'
import type { CourseEnrollment } from '@/payload-types'

/**
 * After an enrollment is deleted, remove it from the customer's
 * `enrolledCourses` relationship field.
 */
export const afterDelete: CollectionAfterDeleteHook<CourseEnrollment> = async ({ doc, req }) => {
  try {
    const customerId = typeof doc.customer === 'object' ? doc.customer.id : doc.customer

    const customer = await req.payload.findByID({
      collection: 'customers',
      id: customerId,
      req,
      depth: 0,
    })

    const existingEnrollments = (customer.enrolledCourses || []).map((e) =>
      typeof e === 'object' ? e.id : e,
    )

    const updatedEnrollments = existingEnrollments.filter((id) => id !== doc.id)

    if (updatedEnrollments.length !== existingEnrollments.length) {
      await req.payload.update({
        collection: 'customers',
        id: customerId,
        data: {
          enrolledCourses: updatedEnrollments,
        },
        req,
      })
    }
  } catch (error) {
    console.error('Error syncing enrolledCourses on delete:', error)
  }

  return doc
}
