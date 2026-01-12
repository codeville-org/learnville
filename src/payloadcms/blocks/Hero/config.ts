import { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    // Left Side Content
    {
      name: 'content',
      type: 'group',
      label: 'Hero Content',
      fields: [
        {
          name: 'preHeading',
          type: 'text',
          label: 'Pre-heading Text',
          admin: {
            description: 'Small text above the main heading (e.g., "Every Course,")',
          },
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Main Heading',
          admin: {
            description: 'Main hero heading (e.g., "Every Skill — One")',
          },
        },
        {
          name: 'highlightedText',
          type: 'text',
          label: 'Highlighted Text',
          admin: {
            description: 'Text to highlight in different color (e.g., "Powerful Platform.")',
          },
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
              defaultValue: 'Explore Courses',
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

    // Hero Section Image
    {
      name: 'image',
      type: 'group',
      label: 'Hero Image',
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Main Image',
          admin: {
            description: 'Upload the hero image (recommended: 800x900px)',
          },
        },
      ],
    },

    // Statistics
    {
      name: 'statistics',
      type: 'group',
      label: 'Floating Statistics Card',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable Statistics Card',
          defaultValue: true,
        },
        {
          name: 'stats',
          type: 'array',
          label: 'Statistics',
          minRows: 1,
          maxRows: 4,
          admin: {
            condition: (_, siblingData) => siblingData?.enabled,
            initCollapsed: true,
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Stat Label',
              admin: {
                placeholder: 'e.g., Online Courses',
              },
            },
            {
              name: 'value',
              type: 'text',
              required: true,
              label: 'Stat Value',
              admin: {
                placeholder: 'e.g., 5,000+',
                description: 'You can use numbers with + suffix or any format',
              },
            },
            {
              name: 'icon',
              type: 'select',
              defaultValue: 'none',
              options: [
                { label: 'No Icon', value: 'none' },
                { label: 'Book', value: 'book' },
                { label: 'Users', value: 'users' },
                { label: 'Award', value: 'award' },
                { label: 'Star', value: 'star' },
                { label: 'Graduation Cap', value: 'graduation' },
                { label: 'Target', value: 'target' },
              ],
            },
            {
              name: 'highlighted',
              type: 'checkbox',
              defaultValue: false,
              label: 'Highlight this stat',
              admin: {
                description: 'Make this stat stand out with different styling',
              },
            },
          ],
          defaultValue: [
            {
              label: 'Online Courses',
              value: '5,000+',
              icon: 'book',
            },
            {
              label: 'Active Students',
              value: '50,000+',
              icon: 'users',
            },
            {
              label: 'Expert Instructors',
              value: '500+',
              icon: 'graduation',
            },
          ],
        },
      ],
    },
  ],
}
