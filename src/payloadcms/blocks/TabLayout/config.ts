import { Block } from 'payload'

export const TabLayoutBlock: Block = {
  slug: 'tabLayoutBlock',
  labels: {
    singular: 'Tab Layout Block',
    plural: 'Tab Layout Blocks',
  },
  fields: [
    {
      name: 'preHeading',
      type: 'text',
      label: 'Pre-heading Text',
      admin: {
        description: 'Small text above the main heading (e.g., "How to Get Started")',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Main Heading',
      admin: {
        description: 'Main hero heading (e.g., "Explore Our Learning Paths")',
      },
    },
    {
      name: 'highlightedText',
      type: 'text',
      label: 'Highlighted Text',
      admin: {
        description: 'Text to highlight in different color',
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
      name: 'tabs',
      type: 'array',
      label: 'Tabs',
      fields: [
        {
          name: 'tabLabel',
          label: 'Tab Label',
          type: 'text',
        },
        {
          name: 'content',
          label: 'Content',
          type: 'richText',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
        },
        {
          name: 'layout',
          label: 'Layout',
          type: 'select',
          options: [
            { label: 'Image Left', value: 'imageLeft' },
            { label: 'Image Right', value: 'imageRight' },
          ],
          defaultValue: 'imageLeft',
        },
      ],
    },
  ],
}
