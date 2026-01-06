import { CollectionConfig } from 'payload'
import { anyone } from '../../Users/access/anyone'
import instructor from '../../Users/access/instructor'
import { LessonVideoBlock } from '@/payloadcms/blocks/lessonVideo/config'
import { LessonContentBlock } from '@/payloadcms/blocks/lessonContent/config'
import { LessonMaterialsBlock } from '@/payloadcms/blocks/lessonMaterials/config'
import { LessonQuizBlock } from '@/payloadcms/blocks/lessonQuiz/config'

import { beforeChange } from './hooks/beforeChange'

export const Lessons: CollectionConfig = {
  slug: 'lessons',
  admin: {
    useAsTitle: 'lessonName',
    defaultColumns: ['lessonName', 'duration', 'totalLessonXP', 'order'],
    group: 'Learning',
  },
  access: {
    read: anyone,
    create: instructor,
    update: instructor,
    delete: instructor,
  },
  fields: [
    {
      name: 'lessonName',
      type: 'text',
      required: true,
    },
    {
      name: 'duration',
      type: 'number',
      required: true,
      admin: {
        description: 'Lesson duration in minutes',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 1,
      admin: {
        description: 'Order within the chapter',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Brief lesson description',
      },
    },
    {
      name: 'isPreview',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Allow non-enrolled users to preview this lesson',
      },
    },
    {
      name: 'curriculum',
      type: 'blocks',
      required: true,
      minRows: 1,
      blocks: [LessonVideoBlock, LessonContentBlock, LessonMaterialsBlock, LessonQuizBlock],
    },
    {
      name: 'totalLessonXP',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        description: 'Total XP available in this lesson (auto-calculated)',
      },
    },
  ],
  hooks: {
    beforeChange: [beforeChange],
  },
}
