import { CollectionConfig } from 'payload'
import customer from '../../Users/access/customer'
import admin from '../../Users/access/admin'
import { afterChange } from './hooks/afterChange'
import { beforeValidate } from './hooks/beforeValidate'

export const QuizAttempts: CollectionConfig = {
  slug: 'quiz-attempts',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['customer', 'lesson', 'score', 'xpEarned', 'attemptedAt'],
    group: 'Learning',
  },
  access: {
    read: customer,
    create: customer,
    update: customer,
    delete: admin,
  },
  fields: [
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
    },
    {
      name: 'enrollment',
      type: 'relationship',
      relationTo: 'course-enrollments',
      required: true,
    },
    {
      name: 'lesson',
      type: 'relationship',
      relationTo: 'lessons',
      required: true,
    },
    {
      name: 'quizBlockId',
      type: 'text',
      required: true,
      admin: {
        description: 'ID of the quiz block within the lesson',
      },
    },
    {
      name: 'answers',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'questionIndex',
          type: 'number',
          required: true,
        },
        {
          name: 'answer',
          type: 'json',
          required: true,
        },
        {
          name: 'isCorrect',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'xpAwarded',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
    {
      name: 'score',
      type: 'number',
      required: true,
      admin: {
        description: 'Score percentage',
      },
    },
    {
      name: 'xpEarned',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'passed',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'attemptedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  hooks: {
    beforeValidate: [beforeValidate],
    afterChange: [afterChange],
  },
}
