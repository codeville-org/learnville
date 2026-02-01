import { GlobalConfig } from 'payload'
import editor from '../collections/Users/access/editor'
import { checkRole } from '../collections/Users/access/check-role'

export const CTA: GlobalConfig = {
  slug: 'cta',
  label: 'Site CTA',
  access: {
    read: ({ req: { user } }) => {
      // Admins can see everything (published and drafts)
      if (user?.collection === 'users' && checkRole(['admin', 'editor'], user)) {
        return true
      }

      // Public users only see published pages
      return {
        or: [
          {
            _status: { equals: 'published' },
          },
          {
            _status: { exists: false },
          },
        ],
      }
    },
    update: editor,
  },
  versions: {
    max: 100,
    drafts: {
      autosave: true,
      validate: false,
    },
  },
  admin: {
    group: 'Content Management',
    livePreview: {
      url: `/`,
    },
  },
  fields: [
    {
      name: 'content',
      type: 'group',
      label: 'Content',
      fields: [
        {
          name: 'preHeading',
          type: 'text',
          label: 'Pre-heading Text',
          defaultValue: 'Join Thousands of Learners',
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Main Heading',
          defaultValue: 'Unlock Your Potential with, One',
        },
        {
          name: 'highlightedText',
          type: 'text',
          label: 'Highlighted Text',
          defaultValue: 'Powerful Platform.',
        },
        {
          name: 'highlightColor',
          type: 'select',
          defaultValue: 'teal',
          admin: {
            condition: (_, siblingData) => !!siblingData?.highlightedText,
          },
          options: [
            { label: 'Orange', value: 'orange' },
            { label: 'Emerald', value: 'emerald' },
            { label: 'Teal', value: 'teal' },
            { label: 'Purple', value: 'purple' },
            { label: 'Blue', value: 'blue' },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
          admin: {
            description: 'Supporting text below the heading',
          },
        },
      ],
    },
    {
      name: 'info',
      type: 'array',
      label: 'CTA Info',
      minRows: 1,
      maxRows: 4,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
        },
      ],
      defaultValue: [
        {
          title: 'Learn with Experts',
          description: 'Connect with professionals and gain insights from their experiences.',
        },
        {
          title: 'Learn Anything',
          description:
            'Explore a diverse range of courses and examinations to sharpen your skills.',
        },
        {
          title: 'Get Online Certificate',
          description: 'Earn certificates upon course completion to showcase your achievements',
        },
        {
          title: 'Flexible Schedule',
          description: 'Suggested learning paths that fit your schedule, anytime and anywhere.',
        },
      ],
    },
    {
      name: 'instructorCTA',
      type: 'group',
      label: 'Become a Instructor CTA',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'CTA Image',
        },
        {
          name: 'title',
          type: 'text',
          label: 'CTA Title',
          defaultValue: 'Become an Instructor',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'CTA Description',
          defaultValue:
            'Join our community of expert instructors and share your knowledge with learners worldwide. Empower others while growing your personal brand and earning income.',
        },
        {
          name: 'buttonLabel',
          type: 'text',
          defaultValue: 'Start Teaching Today',
        },
        {
          name: 'type',
          type: 'select',
          defaultValue: 'page',
          options: [
            { label: 'Internal Page', value: 'page' },
            { label: 'External Link', value: 'external' },
            { label: 'Custom Link', value: 'custom' },
          ],
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'page',
          },
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            condition: (_, siblingData) =>
              siblingData?.type === 'external' || siblingData?.type === 'custom',
          },
        },
      ],
    },
    {
      name: 'studentCTA',
      type: 'group',
      label: 'Join as Student CTA',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'CTA Image',
        },
        {
          name: 'title',
          type: 'text',
          label: 'CTA Title',
          defaultValue: 'Join as a Student',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'CTA Description',
          defaultValue:
            'Join our community of learners and gain access to a wide range of courses designed to help you achieve your goals.',
        },
        {
          name: 'buttonLabel',
          type: 'text',
          defaultValue: 'Browse Courses',
        },
        {
          name: 'type',
          type: 'select',
          defaultValue: 'page',
          options: [
            { label: 'Internal Page', value: 'page' },
            { label: 'External Link', value: 'external' },
            { label: 'Custom Link', value: 'custom' },
          ],
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'page',
          },
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            condition: (_, siblingData) =>
              siblingData?.type === 'external' || siblingData?.type === 'custom',
          },
        },
      ],
    },
  ],
}
