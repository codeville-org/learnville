import { Block } from 'payload'

export const SiteStatsBlock: Block = {
  slug: 'siteStatsBlock',
  labels: {
    singular: 'Site Stats Section',
    plural: 'Site Stats Sections',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: 'Variant',
      options: [
        { label: 'Secondary', value: 'secondary' },
        { label: 'Primary', value: 'primary' },
      ],
      defaultValue: 'secondary',
    },
  ],
}
