import { CollectionConfig } from 'payload'
import editor from '../Users/access/editor'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/payloadcms/fields/Slug/config'
import { checkRole } from '../Users/access/check-role'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    group: 'Content Management',
  },
  versions: {
    maxPerDoc: 100,
    drafts: {
      autosave: true,
      validate: false,
    },
  },
  access: {
    readVersions: () => true,
    read: ({ req: { user } }) => {
      // Admins can see everything (published and drafts)
      if (user?.collection === 'users' && checkRole(['admin', 'editor'], user)) {
        return true
      }

      // Public users only see published pages
      return {
        or: [
          {
            _status: { equals: 'published' },
          },
          {
            _status: { exists: false },
          },
        ],
      }
    },
    create: editor,
    update: editor,
    delete: editor,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page Details',
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            slugField('title'),
            {
              name: 'description',
              type: 'textarea',
            },
            // {
            //   name: 'content',
            //   type: 'blocks',
            //   blocks: [],
            // },
          ],
        },
        {
          label: 'SEO',
          name: 'meta',
          fields: [
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaDescriptionField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            PreviewField({
              hasGenerateFn: true,
            }),
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
          ],
        },
      ],
    },
  ],
}
