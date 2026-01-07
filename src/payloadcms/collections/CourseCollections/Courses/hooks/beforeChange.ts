import { CollectionBeforeChangeHook } from 'payload'

import type { Course } from '@/payload-types'

export const beforeChange: CollectionBeforeChangeHook<Course> = async ({ data, req }) => {
  // Calculate totalXP from all lessons in chapters
  if (data.chapters && data.chapters.length > 0) {
    let totalXP = 0

    for (const chapter of data.chapters) {
      if (chapter.lessons && chapter.lessons.length > 0) {
        for (const lessonId of chapter.lessons) {
          try {
            const id = lessonId instanceof Object ? lessonId.id : lessonId

            const lesson = await req.payload.findByID({
              collection: 'lessons',
              id,
            })

            totalXP += lesson?.totalLessonXP || 0
          } catch (error) {
            console.error('Error fetching lesson:', error)
          }
        }
      }
    }

    data.totalXP = totalXP
  }

  return data
}
