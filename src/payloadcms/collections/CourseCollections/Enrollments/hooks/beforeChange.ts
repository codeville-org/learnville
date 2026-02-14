import { CollectionBeforeChangeHook } from 'payload'

import type { CourseEnrollment } from '@/payload-types'

export const beforeChange: CollectionBeforeChangeHook<CourseEnrollment> = async ({ data, req }) => {
  // Update progress based on completed lessons
  if (data.completedLessons && data.course) {
    try {
      const id = data.course instanceof Object ? data.course.id : data.course

      const course = await req.payload.findByID({
        collection: 'courses',
        id,
        req,
        draft: true,
      })

      // Count total lessons in course
      let totalLessons = 0
      if (course.chapters) {
        course.chapters.forEach((chapter) => {
          totalLessons += chapter.lessons?.length || 0
        })
      }

      const completedCount = data.completedLessons.length
      data.progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

      // Mark as completed if 100%
      if (data.progress === 100 && data.status !== 'completed') {
        data.status = 'completed'
        data.completedAt = new Date().toISOString()
      }
    } catch (error) {
      console.error('Error calculating progress:', error)
    }
  }

  return data
}
