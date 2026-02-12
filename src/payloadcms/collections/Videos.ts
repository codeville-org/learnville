import type { CollectionConfig } from 'payload'
import instructor from './Users/access/instructor'

export const Videos: CollectionConfig = {
  slug: 'videos',
  admin: {
    group: 'Content Management',
    description: 'Upload and manage lesson videos via Bunny Stream',
  },
  access: {
    // Anyone can read (stream URLs are needed on the frontend)
    read: () => true,
    // Only admins and instructors can upload videos
    create: instructor,
    update: instructor,
    delete: instructor,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Description',
      admin: {
        description: 'Brief description of the video content (for accessibility)',
      },
    },
  ],
  upload: {
    disableLocalStorage: true,
    mimeTypes: ['video/*'],
    adminThumbnail: 'thumbnail',
  },
}
