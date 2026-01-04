import { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  fields: [
    {
      type: 'array',
      name: 'headerLinks',
      fields: [
        // { name: 'destination', type: 'relationship', relationTo: 'courses' }
      ],
    },
  ],
}
