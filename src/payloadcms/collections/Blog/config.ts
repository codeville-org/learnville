import { CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import editor from '../Users/access/editor'
import { checkRole } from '../Users/access/check-role'
import { slugField } from '@/payloadcms/fields/Slug/config'

export const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'category', 'status', 'publishedAt'],
    group: 'Content Management',
    listSearchableFields: ['title', 'excerpt'],
  },
  versions: {
    maxPerDoc: 50,
    drafts: {
      autosave: true,
      validate: false,
    },
  },
  access: {
    readVersions: () => true,
    read: ({ req: { user } }) => {
      // Admins and editors can see everything (published and drafts)
      if (user?.collection === 'users' && checkRole(['admin', 'editor'], user)) {
        return true
      }

      // Public users only see published posts
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
          label: 'Post Details',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            slugField('title'),
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              admin: {
                description: 'A brief summary of the post (appears in listings and SEO)',
              },
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Main image for the blog post',
              },
            },
          ],
        },
        {
          label: 'Article Content',
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          label: 'Meta',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'author',
                  type: 'relationship',
                  relationTo: 'users',
                  required: true,
                  filterOptions: {
                    roles: { contains: 'editor' },
                  },
                  admin: {
                    width: '50%',
                    description: 'The author of this post',
                  },
                },
                {
                  name: 'category',
                  type: 'relationship',
                  relationTo: 'categories',
                  hasMany: false,
                  admin: {
                    width: '50%',
                    description: 'Primary category for this post',
                  },
                },
              ],
            },
            {
              name: 'tags',
              type: 'array',
              admin: {
                description: 'Tags help readers find related content',
              },
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'publishedAt',
              type: 'date',
              required: true,
              defaultValue: () => new Date().toISOString(),
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                },
                description: 'Schedule when this post should be published',
              },
            },
            {
              name: 'readTime',
              type: 'number',
              admin: {
                description: 'Estimated reading time in minutes',
              },
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
              descriptionPath: 'meta.excerpt',
              imagePath: 'meta.image',
            }),
          ],
        },
      ],
    },
    // Sidebar fields
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Feature this post on the homepage',
      },
    },
    {
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'blog',
      hasMany: true,
      maxRows: 3,
      admin: {
        position: 'sidebar',
        description: 'Select up to 3 related posts',
      },
    },
  ],
}
