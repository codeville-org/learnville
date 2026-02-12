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
      name: 'videoType',
      type: 'select',
      options: [
        { label: 'YouTube', value: 'youtube' },
        { label: 'Bunny Stream', value: 'bunnyStream' },
      ],
    },
    {
      name: 'youtubeEmbed',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.videoType === 'youtube',
      },
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'videos',
      required: true,
      admin: {
        description: 'Upload a lesson video (streamed via Bunny Stream)',
        condition: (_, siblingData) => siblingData?.videoType === 'bunnyStream',
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
