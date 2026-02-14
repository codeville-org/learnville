import { CollectionAfterDeleteHook } from 'payload'

// Note: Run `pnpm generate:types` to generate the Review type
// import type { Review } from '@/payload-types'

export const afterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  // Recalculate course rating when a review is deleted
  try {
    const courseId = typeof doc.course === 'object' ? doc.course.id : doc.course

    // Fetch all remaining approved reviews for this course
    const reviews = await req.payload.find({
      collection: 'reviews' as const,
      where: {
        and: [{ course: { equals: courseId } }, { isApproved: { equals: true } }],
      },
      limit: 0,
      depth: 0,
      req,
    })

    // Calculate average rating
    let overallRating = 0

    if (reviews.docs.length > 0) {
      const totalRating = reviews.docs.reduce((sum, review: any) => sum + (review.rating || 0), 0)
      overallRating = Math.round((totalRating / reviews.docs.length) * 10) / 10
    }

    // Update course with new rating
    await req.payload.update({
      collection: 'courses',
      id: courseId,
      data: {
        overallRating,
      },
      req,
      context: { skipChapterRecalc: true },
    })
  } catch (error) {
    console.error('Error updating course rating after delete:', error)
  }

  return doc
}
