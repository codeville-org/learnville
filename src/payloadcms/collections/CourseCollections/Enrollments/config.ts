import { CollectionConfig } from 'payload'
import customer from '../../Users/access/customer'
import admin from '../../Users/access/admin'
import { beforeChange } from './hooks/beforeChange'
import { beforeValidate } from './hooks/beforeValidate'
import { afterChange } from './hooks/afterChange'
import { afterDelete } from './hooks/afterDelete'
import { completeLessonEndpoint } from './endpoints/completeLesson'

export const CourseEnrollments: CollectionConfig = {
  slug: 'course-enrollments',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['customer', 'course', 'status', 'progress', 'enrolledAt'],
    group: 'Learning',
  },
  access: {
    read: customer,
    create: customer,
    update: customer,
    delete: admin,
  },
  endpoints: [completeLessonEndpoint],
  fields: [
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
      hasMany: false,
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
      hasMany: false,
    },
    {
      name: 'enrolledAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' },
        { label: 'Paused', value: 'paused' },
        { label: 'Dropped', value: 'dropped' },
      ],
      defaultValue: 'active',
    },
    {
      name: 'progress',
      type: 'number',
      defaultValue: 0,
      min: 0,
      max: 100,
      admin: {
        description: 'Course completion percentage',
      },
    },
    {
      name: 'totalXPEarned',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Total XP earned in this course',
      },
    },
    {
      name: 'lastAccessedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'completedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        condition: (data) => data.status === 'completed',
      },
    },
    {
      name: 'completedLessons',
      type: 'relationship',
      relationTo: 'lessons',
      hasMany: true,
      admin: {
        description: 'Lessons marked as completed',
      },
    },
  ],
  hooks: {
    beforeValidate: [beforeValidate],
    beforeChange: [beforeChange],
    afterChange: [afterChange],
    afterDelete: [afterDelete],
  },
}
