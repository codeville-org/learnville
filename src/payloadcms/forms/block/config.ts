import { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
  slug: 'formBlock',
  labels: {
    singular: 'Form Block',
    plural: 'Form Blocks',
  },
  fields: [
    {
      name: 'form',
      relationTo: 'forms',
      type: 'relationship',
      required: true,
    },
    {
      type: 'select',
      name: 'layout',
      label: 'Section Layout',
      options: [
        { label: 'Full Width', value: 'fullWidth' },
        { label: 'Constrained', value: 'constrained' },
        { label: 'Two Column', value: 'twoColumn' },
      ],
      defaultValue: 'constrained',
    },
  ],
}
