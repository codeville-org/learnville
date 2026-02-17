import { Block } from 'payload'

export const FeaturedBlogs: Block = {
  slug: 'featuredBlogs',
  labels: {
    singular: 'Featured Blogs Section',
    plural: 'Featured Blogs Sections',
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
            description: 'Small text above the main heading (e.g., "Our Blog")',
          },
          defaultValue: 'Our Blog',
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Main Heading',
          admin: {
            description: 'Main section heading (e.g., "Insights & Ideas From")',
          },
          defaultValue: 'Insights & Ideas From',
        },
        {
          name: 'highlightedText',
          type: 'text',
          label: 'Highlighted Text',
          admin: {
            description: 'Text to highlight in different color (e.g., "The land of Learning.")',
          },
          defaultValue: 'The Land of Learning.',
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
          defaultValue:
            'See what are the latest updates in your interested areas and explore more learning stuff beyond the courses & examinations',
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
              defaultValue: 'Explore Blogs',
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
      name: 'featuredBlogs',
      label: 'Featured Blogs',
      type: 'relationship',
      relationTo: 'blog',
      hasMany: true,
      required: true,
      minRows: 1,
      maxRows: 3,
      filterOptions: {
        isFeatured: { equals: true },
      },
    },
  ],
}
