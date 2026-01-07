import { Block } from 'payload'

export const LessonQuizBlock: Block = {
  slug: 'lessonQuiz',
  labels: {
    singular: 'Lesson Quiz',
    plural: 'Lesson Quizzes',
  },
  fields: [
    {
      name: 'quizTitle',
      type: 'text',
      required: true,
      defaultValue: 'Knowledge Check',
    },
    {
      name: 'quizDescription',
      type: 'textarea',
      admin: {
        description: 'Instructions for the quiz',
      },
    },
    {
      name: 'passingScore',
      type: 'number',
      required: true,
      defaultValue: 70,
      min: 0,
      max: 100,
      admin: {
        description: 'Minimum score percentage to pass',
      },
    },
    {
      name: 'questions',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'richText',
          required: true,
        },
        {
          name: 'questionType',
          type: 'select',
          required: true,
          options: [
            { label: 'Multiple Choice', value: 'multiple-choice' },
            { label: 'True/False', value: 'true-false' },
            { label: 'Short Answer', value: 'short-answer' },
          ],
          defaultValue: 'multiple-choice',
        },
        {
          name: 'xpPoints',
          type: 'number',
          required: true,
          defaultValue: 10,
          admin: {
            description: 'XP points awarded for correct answer',
          },
        },
        {
          name: 'options',
          type: 'array',
          minRows: 2,
          fields: [
            {
              name: 'optionText',
              type: 'text',
              required: true,
            },
            {
              name: 'isCorrect',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
          admin: {
            condition: (data, siblingData) =>
              siblingData?.questionType === 'multiple-choice' ||
              siblingData?.questionType === 'true-false',
          },
        },
        {
          name: 'correctAnswer',
          type: 'textarea',
          admin: {
            condition: (data, siblingData) => siblingData?.questionType === 'short-answer',
            description: 'Sample correct answer (for reference)',
          },
        },
        {
          name: 'explanation',
          type: 'richText',
          admin: {
            description: 'Explanation shown after answering',
          },
        },
      ],
    },
  ],
}
