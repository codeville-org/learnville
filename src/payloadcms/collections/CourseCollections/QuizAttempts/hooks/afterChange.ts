import { CollectionAfterChangeHook } from 'payload'

import type { QuizAttempt } from '@/payload-types'

export const afterChange: CollectionAfterChangeHook<QuizAttempt> = async ({
  data,
  req,
  doc,
  operation,
}) => {
  if (operation === 'create' && doc.passed) {
    try {
      const customerDoc =
        doc.customer instanceof Object
          ? doc.customer
          : await req.payload.findByID({
              collection: 'customers',
              id: doc.customer,
              req,
            })

      const customerId = customerDoc.id

      // Update customer's total XP
      const customer = await req.payload.findByID({
        collection: 'customers',
        id: customerId,
        req,
      })

      await req.payload.update({
        collection: 'customers',
        id: customer.id,
        data: {
          totalXP: (customer.totalXP || 0) + doc.xpEarned,
        },
        req,
      })

      // Update enrollment's course XP
      const enrollment = await req.payload.findByID({
        collection: 'course-enrollments',
        id: doc.enrollment instanceof Object ? doc.enrollment.id : doc.enrollment,
        req,
      })

      await req.payload.update({
        collection: 'course-enrollments',
        id: doc.enrollment instanceof Object ? doc.enrollment.id : doc.enrollment,
        data: {
          totalXPEarned: (enrollment.totalXPEarned || 0) + doc.xpEarned,
        },
        req,
      })
    } catch (error) {
      console.error('Error updating XP:', error)
    }
  }
}
