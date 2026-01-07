import { CollectionConfig } from 'payload'
import { anyone } from '../../Users/access/anyone'
import instructor from '../../Users/access/instructor'
import { slugField } from '@/payloadcms/fields/Slug/config'

import { beforeChange } from './hooks/beforeChange'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'instructor', 'status'],
    group: 'Learning',
  },
  versions: {
    drafts: true,
  },
  access: {
    read: anyone,
    create: instructor,
    update: instructor,
    delete: instructor,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Information',
          description: 'Essential course information and branding',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Course Title',
            },
            slugField('title'),
            {
              name: 'shortDescription',
              type: 'textarea',
              maxLength: 300,
              admin: {
                description: 'Brief description for course listings (max 300 characters)',
              },
            },
            {
              name: 'thumbnail',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'description',
              type: 'richText',
              label: 'Course Description',
            },
          ],
        },
        {
          label: 'Course Details',
          description: 'Configure instructor, category, level, and pricing',
          fields: [
            {
              name: 'instructor',
              type: 'relationship',
              relationTo: 'users',
              required: true,
              filterOptions: {
                roles: { contains: 'instructor' },
              },
              admin: {
                description: 'Course instructor / author',
              },
            },
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
            },
            {
              name: 'level',
              type: 'select',
              required: true,
              options: [
                { label: 'Beginner', value: 'beginner' },
                { label: 'Intermediate', value: 'intermediate' },
                { label: 'Advanced', value: 'advanced' },
              ],
            },
            {
              name: 'pricingType',
              type: 'select',
              required: true,
              options: [
                { label: 'Free', value: 'free' },
                { label: 'Premium', value: 'premium' },
              ],
              defaultValue: 'premium',
            },
            {
              name: 'price',
              type: 'number',
              required: true,
              defaultValue: 0,
              admin: {
                description: 'Set to 0 for free courses.',
                condition: (data, siblingData) => siblingData?.pricingType === 'premium',
              },
            },
            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
        {
          label: 'Curriculum',
          description: 'Organize chapters and lessons',
          fields: [
            {
              name: 'chapters',
              type: 'array',
              required: true,
              minRows: 1,
              fields: [
                {
                  name: 'chapterTitle',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'chapterDescription',
                  type: 'textarea',
                },
                {
                  name: 'order',
                  type: 'number',
                  required: true,
                  defaultValue: 1,
                },
                {
                  name: 'lessons',
                  type: 'relationship',
                  relationTo: 'lessons',
                  hasMany: true,
                  required: true,
                },
              ],
              admin: {
                description: 'Course chapters containing lessons',
              },
            },
          ],
        },
        {
          label: 'Learning Objectives',
          description: 'Define learning outcomes and prerequisites',
          fields: [
            {
              name: 'learningOutcomes',
              type: 'array',
              fields: [
                {
                  name: 'outcome',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'prerequisites',
              type: 'array',
              fields: [
                {
                  name: 'prerequisite',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Metadata',
          description: 'Auto-calculated and additional course metrics',
          fields: [
            {
              name: 'totalXP',
              type: 'number',
              defaultValue: 0,
              admin: {
                readOnly: true,
                description: 'Total XP available in this course, Auto-calculated from its lessons.',
              },
            },
            {
              name: 'estimatedDuration',
              type: 'number',
              admin: {
                description: 'Estimated duration to complete the course in hours.',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [beforeChange],
  },
}
