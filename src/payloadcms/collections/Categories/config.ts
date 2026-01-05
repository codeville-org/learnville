import { CollectionConfig } from 'payload'
import { anyone } from '../Users/access/anyone'
import editor from '../Users/access/editor'
import { slugField } from '@/payloadcms/fields/Slug/config'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: anyone,
    create: editor,
    update: editor,
    delete: editor,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    slugField('name'),
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
