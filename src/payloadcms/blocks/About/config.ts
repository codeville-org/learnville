import { Block } from 'payload'

export const About: Block = {
  slug: 'about',
  labels: {
    singular: 'About Section',
    plural: 'About Sections',
  },
  fields: [
    {
      name: 'content',
      type: 'group',
      label: 'Section Content',
      fields: [
        {
          name: 'sectionImage',
          type: 'upload',
          relationTo: 'media',
          label: 'About Image',
          admin: {
            description: 'Hero image showing on the About section',
          },
        },
        {
          name: 'preHeading',
          type: 'text',
          label: 'Pre-heading Text',
          admin: {
            description: 'Small text above the main heading (e.g., "About Learnville")',
          },
          defaultValue: 'About Learnville',
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Main Heading',
          admin: {
            description: 'Main hero heading (e.g., "One Platform. Infinite")',
          },
          defaultValue: 'One Platform. Infinite',
        },
        {
          name: 'highlightedText',
          type: 'text',
          label: 'Highlighted Text',
          admin: {
            description: 'Text to highlight in different color (e.g., "Learning Possibilities")',
          },
          defaultValue: 'Learning Possibilities',
        },
        {
          name: 'highlightColor',
          type: 'select',
          defaultValue: 'emerald',
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
            'At Learnville, we believe quality education should be accessible, engaging, and empowering-for everyone, everywhere.',
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
              defaultValue: 'Learn More About Us',
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
      name: 'layout',
      type: 'select',
      label: 'Layout Style',
      options: [
        { label: 'Image Left', value: 'image-left' },
        { label: 'Image Right', value: 'image-right' },
      ],
      defaultValue: 'image-left',
    },
  ],
}
