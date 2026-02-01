import { GlobalConfig } from 'payload'
import editor from '../collections/Users/access/editor'
import { checkRole } from '../collections/Users/access/check-role'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Site Footer',
  access: {
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
    update: editor,
  },
  versions: {
    max: 100,
    drafts: {
      autosave: true,
      validate: false,
    },
  },
  admin: {
    group: 'Content Management',
    livePreview: {
      url: `/`,
    },
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'tagline',
      type: 'textarea',
      required: true,
    },
    {
      name: 'socials',
      type: 'array',
      label: 'Social Media Links',
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'GitHub', value: 'github' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'newsletter',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Subscribe Our Newsletter',
        },
        {
          name: 'description',
          type: 'text',
          defaultValue: 'Get the latest courses, tips & stories delivered to your inbox.',
        },
        {
          name: 'placeholder',
          type: 'text',
          defaultValue: 'Enter your email address',
        },
        {
          name: 'buttonText',
          type: 'text',
          defaultValue: 'Subscribe',
        },
      ],
    },
    {
      name: 'linkColumns',
      type: 'array',
      label: 'Link Columns',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'type',
              type: 'select',
              defaultValue: 'page',
              options: [
                { label: 'Internal Page', value: 'page' },
                { label: 'External Link', value: 'external' },
                { label: 'Custom Link', value: 'custom' },
                { label: 'Category', value: 'category' },
              ],
            },
            {
              name: 'page',
              type: 'relationship',
              relationTo: 'pages',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'page',
              },
            },
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'category',
              },
            },
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: (_, siblingData) =>
                  siblingData?.type === 'external' || siblingData?.type === 'custom',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Get in Touch',
        },
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'address',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'copyright',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'All rights reserved.',
        },
        {
          name: 'designer',
          type: 'text',
          defaultValue: 'Developed by CodeVille',
        },
      ],
    },
  ],
}
