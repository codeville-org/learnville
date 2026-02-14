import { CollectionConfig } from 'payload'
import instructor from '../../Users/access/instructor'
import { LessonVideoBlock } from '@/payloadcms/blocks/lessonVideo/config'
import { LessonContentBlock } from '@/payloadcms/blocks/lessonContent/config'
import { LessonMaterialsBlock } from '@/payloadcms/blocks/lessonMaterials/config'
import { LessonQuizBlock } from '@/payloadcms/blocks/lessonQuiz/config'

import { beforeChange } from './hooks/beforeChange'
import instructorOwn from '../../Users/access/instructorOwn'
import { beforeValidate } from './hooks/beforeValidate'

export const Lessons: CollectionConfig = {
  slug: 'lessons',
  admin: {
    useAsTitle: 'lessonName',
    defaultColumns: ['lessonName', 'duration', 'totalLessonXP', 'course', 'order'],
    group: 'Learning',
    listSearchableFields: ['lessonName', 'description'],
    groupBy: true,
  },
  lockDocuments: {
    duration: 300,
  },
  versions: {
    drafts: true,
  },
  access: {
    read: instructorOwn,
    create: instructor,
    update: instructorOwn,
    delete: instructorOwn,
  },
  fields: [
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
      hasMany: false,
      admin: {
        description: 'Associate this lesson with a course',
        position: 'sidebar',
      },
    },
    {
      name: 'instructor',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      hasMany: false,
      filterOptions: {
        roles: { contains: 'instructor' },
      },
      admin: {
        position: 'sidebar',
        readOnly: true, // Make it read-only since it's auto-populated
        description: 'Auto-populated from the selected course',
      },
    },
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
      admin: {
        initCollapsed: true,
      },
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
    beforeValidate: [beforeValidate],
    beforeChange: [beforeChange],
  },
}
