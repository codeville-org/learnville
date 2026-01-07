import { Block } from 'payload'

export const LessonContentBlock: Block = {
  slug: 'lessonContent',
  labels: {
    singular: 'Lesson Content',
    plural: 'Lesson Contents',
  },
  fields: [
    {
      name: 'contentTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Main lesson content (text, images, code blocks, etc.)',
      },
    },
  ],
}
