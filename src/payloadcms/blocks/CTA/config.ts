import { Block } from 'payload'

export const CTABlock: Block = {
  slug: 'ctaBlock',
  labels: {
    singular: 'CTA Section',
    plural: 'CTA Sections',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      label: 'CTA Type',
      options: [
        { label: 'Buttons', value: 'buttons' },
        { label: 'Cards', value: 'cards' },
      ],
    },
  ],
}
