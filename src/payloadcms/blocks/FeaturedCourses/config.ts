import { Block } from 'payload'

export const FeaturedCourses: Block = {
  slug: 'featuredCourses',
  labels: {
    singular: 'Featured Courses Section',
    plural: 'Featured Courses Sections',
  },
  fields: [
    {
      name: 'content',
      type: 'group',
      label: 'Section Content',
      fields: [
        {
          name: 'preHeading',
          type: 'text',
          label: 'Pre-heading Text',
          admin: {
            description: 'Small text above the main heading (e.g., "Featured Courses")',
          },
          defaultValue: 'Featured Courses',
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Main Heading',
          admin: {
            description: 'Main hero heading (e.g., "Start Your Journey")',
          },
          defaultValue: 'Start Your Journey',
        },
        {
          name: 'highlightColor',
          type: 'select',
          defaultValue: 'orange',
          admin: {
            condition: (_, siblingData) => !!siblingData?.heading,
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
        {
          name: 'cta',
          type: 'group',
          label: 'Call to Action Button',
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'label',
              type: 'text',
              defaultValue: 'View All Courses',
              admin: {
                condition: (_, siblingData) => siblingData?.enabled,
              },
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
    },
    {
      name: 'featuredCourses',
      label: 'Featured Courses',
      type: 'relationship',
      relationTo: 'courses',
      hasMany: true,
      required: true,
      minRows: 1,
      maxRows: 10,
    },
  ],
}
