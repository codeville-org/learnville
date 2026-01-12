import { CollectionConfig } from 'payload'
import editor from '../Users/access/editor'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { checkRole } from '../Users/access/check-role'
import { ensureSingleHomepage } from './hooks/ensureSingleHomepage'
import { Hero } from '@/payloadcms/blocks/Hero/config'
import { TopCategories } from '@/payloadcms/blocks/TopCategories/config'

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
  hooks: {
    beforeChange: [ensureSingleHomepage],
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
            {
              name: 'isHomepage',
              type: 'checkbox',
              label: 'Set as Homepage',
              defaultValue: false,
              admin: {
                description:
                  'If checked, this page will be set as the homepage of the website. Only one page can be the homepage at a time.',
              },
            },
            {
              name: 'slug',
              type: 'text',
              unique: true,
              required: true,
              admin: {
                condition: (_, siblingData) => !siblingData?.isHomepage,
              },
            },
            {
              name: 'description',
              type: 'textarea',
            },
          ],
        },
        {
          label: 'Content',
          name: 'content',
          fields: [
            {
              name: 'sections',
              type: 'blocks',
              blocks: [Hero, TopCategories],
            },
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
