import { CollectionBeforeChangeHook } from 'payload'

import type { Lesson } from '@/payload-types'

export const beforeChange: CollectionBeforeChangeHook<Lesson> = async ({ data }) => {
  let totalXP = 0

  if (data.curriculum) {
    data.curriculum.forEach((block) => {
      if (block.blockType === 'lessonQuiz' && block.questions) {
        block.questions.forEach((question) => {
          totalXP += question.xpPoints || 0
        })
      }
    })
  }

  data.totalLessonXP = totalXP
  return data
}
