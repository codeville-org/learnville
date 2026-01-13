import { CollectionAfterChangeHook } from 'payload'

// Note: Run `pnpm generate:types` to generate the Review type
// import type { Review } from '@/payload-types'

export const afterChange: CollectionAfterChangeHook = async ({
  doc,
  req,
  operation,
  previousDoc,
}) => {
  // Recalculate course rating when a review is created or updated
  // Also handle when rating changes or when isApproved status changes
  const shouldRecalculate =
    operation === 'create' ||
    (operation === 'update' &&
      (previousDoc?.rating !== doc.rating || previousDoc?.isApproved !== doc.isApproved))

  if (shouldRecalculate) {
    try {
      const courseId = typeof doc.course === 'object' ? doc.course.id : doc.course

      await updateCourseRating(req, courseId)
    } catch (error) {
      console.error('Error updating course rating:', error)
    }
  }

  return doc
}

async function updateCourseRating(
  req: Parameters<CollectionAfterChangeHook>[0]['req'],
  courseId: string,
) {
  // Fetch all approved reviews for this course
  const reviews = await req.payload.find({
    collection: 'reviews' as const,
    where: {
      and: [{ course: { equals: courseId } }, { isApproved: { equals: true } }],
    },
    limit: 0, // Get all reviews
    depth: 0,
    req,
  })

  // Calculate average rating
  let overallRating = 0

  if (reviews.docs.length > 0) {
    const totalRating = reviews.docs.reduce((sum, review: any) => sum + (review.rating || 0), 0)
    overallRating = Math.round((totalRating / reviews.docs.length) * 10) / 10 // Round to 1 decimal
  }

  // Update course with new rating
  await req.payload.update({
    collection: 'courses',
    id: courseId,
    data: {
      overallRating,
    },
    req,
  })
}
