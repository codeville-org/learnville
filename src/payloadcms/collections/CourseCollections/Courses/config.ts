import { CollectionConfig } from 'payload'
import { slugField } from '@/payloadcms/fields/Slug/config'
import {
  MetaTitleField,
  MetaDescriptionField,
  MetaImageField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import instructor from '../../Users/access/instructor'
import { beforeChange } from './hooks/beforeChange'
import { checkRole } from '../../Users/access/check-role'
import instructorOwn from '../../Users/access/instructorOwn'
import { beforeValidate } from './hooks/beforeValidate'

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
    read: instructorOwn,
    create: instructor,
    update: instructorOwn,
    delete: instructorOwn,
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
              defaultValue: ({ user }) => {
                if (user && checkRole(['instructor'], user)) {
                  return user.id
                }

                return undefined
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
        {
          label: 'SEO',
          name: 'meta',
          fields: [
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaDescriptionField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            PreviewField({
              hasGenerateFn: true,
            }),
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [beforeChange],
    beforeValidate: [beforeValidate],
  },
}
