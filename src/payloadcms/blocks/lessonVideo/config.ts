import { Block } from 'payload'

export const LessonVideoBlock: Block = {
  slug: 'lessonVideo',
  labels: {
    singular: 'Lesson Video',
    plural: 'Lesson Videos',
  },
  fields: [
    {
      name: 'videoTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'videoURL',
      type: 'text',
      required: true,
      admin: {
        description: 'Bunny.net embedded video URL',
        placeholder: 'https://iframe.mediadelivery.net/embed/...',
      },
    },
    {
      name: 'videoDuration',
      type: 'number',
      admin: {
        description: 'Video duration in minutes',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Video thumbnail (optional)',
      },
    },
    {
      name: 'transcript',
      type: 'richText',
      admin: {
        description: 'Video transcript for accessibility',
      },
    },
  ],
}
