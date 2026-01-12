import { Block } from 'payload'

export const TopCategories: Block = {
  slug: 'topCategories',
  labels: {
    singular: 'Top Categories Section',
    plural: 'Top Categories Sections',
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
            description: 'Small text above the main heading (e.g., "Popular Categories,")',
          },
          defaultValue: 'Popular Categories,',
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Main Heading',
          admin: {
            description: 'Main hero heading (e.g., "Explore Our Most-Loved")',
          },
          defaultValue: 'Explore Our Most-Loved',
        },
        {
          name: 'highlightedText',
          type: 'text',
          label: 'Highlighted Text',
          admin: {
            description: 'Text to highlight in different color (e.g., "Learning Paths.")',
          },
          defaultValue: 'Learning Paths.',
        },
        {
          name: 'highlightColor',
          type: 'select',
          defaultValue: 'orange',
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
              defaultValue: 'View All Categories',
              admin: {
                condition: (_, siblingData) => siblingData?.enabled,
              },
            },
            {
              name: 'linkType',
              type: 'select',
              defaultValue: 'internal',
              admin: {
                condition: (_, siblingData) => siblingData?.enabled,
              },
              options: [
                { label: 'Internal Page', value: 'internal' },
                { label: 'External URL', value: 'external' },
              ],
            },
            {
              name: 'internalLink',
              type: 'relationship',
              relationTo: 'pages',
              admin: {
                condition: (_, siblingData) =>
                  siblingData?.enabled && siblingData?.linkType === 'internal',
              },
            },
            {
              name: 'externalLink',
              type: 'text',
              admin: {
                condition: (_, siblingData) =>
                  siblingData?.enabled && siblingData?.linkType === 'external',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'topCategories',
      label: 'Top Categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      required: true,
      minRows: 1,
      maxRows: 10,
    },
  ],
}
