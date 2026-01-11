import { GlobalConfig } from 'payload'
import { checkRole } from '../collections/Users/access/check-role'
import editor from '../collections/Users/access/editor'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Site Header',
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
    // Logo Section
    {
      name: 'logo',
      type: 'group',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          defaultValue: 'Learnville Logo',
        },
      ],
    },

    // Top Banner (Promotional Bar)
    {
      name: 'topBanner',
      type: 'group',
      label: 'Top Promotional Banner',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Banner',
        },
        {
          name: 'backgroundColor',
          type: 'select',
          defaultValue: 'teal',
          options: [
            { label: 'Teal', value: 'teal' },
            { label: 'Blue', value: 'blue' },
            { label: 'Purple', value: 'purple' },
            { label: 'Red', value: 'red' },
            { label: 'Orange', value: 'orange' },
          ],
        },
        {
          name: 'message',
          type: 'richText',
          required: true,
        },
        {
          name: 'closeable',
          type: 'checkbox',
          defaultValue: true,
          label: 'Allow users to close banner',
        },
      ],
    },

    {
      name: 'search',
      type: 'group',
      fields: [
        {
          name: 'placeholder',
          type: 'text',
          defaultValue: 'Search for anything',
        },
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },

    // Navigation Links
    {
      name: 'navigationLinks',
      type: 'array',
      label: 'Navigation Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'page',
          options: [
            { label: 'Internal Page', value: 'page' },
            { label: 'External Link', value: 'external' },
            { label: 'Custom Link', value: 'custom' },
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
          name: 'url',
          type: 'text',
          admin: {
            condition: (_, siblingData) =>
              siblingData?.type === 'external' || siblingData?.type === 'custom',
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },

    // Categories for Explore Dropdown
    {
      name: 'exploreMenu',
      type: 'group',
      label: 'Explore Menu Configuration',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Explore',
        },
        {
          name: 'categories',
          type: 'relationship',
          relationTo: 'categories',
          hasMany: true,
          admin: {
            description: 'Select categories to display in the Explore dropdown',
          },
        },
        {
          name: 'viewAllLink',
          type: 'group',
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'label',
              type: 'text',
              defaultValue: 'View All Categories',
            },
            {
              name: 'page',
              type: 'relationship',
              relationTo: 'pages',
            },
          ],
        },
      ],
    },

    // CTA Buttons
    {
      name: 'ctaButtons',
      type: 'group',
      label: 'Call-to-Action Buttons',
      fields: [
        {
          name: 'loginButton',
          type: 'group',
          fields: [
            {
              name: 'label',
              type: 'text',
              defaultValue: 'Log in',
            },
            {
              name: 'url',
              type: 'text',
              defaultValue: '/signin',
            },
          ],
        },
        {
          name: 'signupButton',
          type: 'group',
          fields: [
            {
              name: 'label',
              type: 'text',
              defaultValue: 'Sign up',
            },
            {
              name: 'url',
              type: 'text',
              defaultValue: '/signup',
            },
          ],
        },
        {
          name: 'myAccountButton',
          type: 'group',
          label: 'My Account Button (Authenticated)',
          fields: [
            {
              name: 'label',
              type: 'text',
              defaultValue: 'My Account',
            },
            {
              name: 'url',
              type: 'text',
              defaultValue: '/account',
            },
          ],
        },
      ],
    },

    // Mobile Menu Settings
    {
      name: 'mobileMenu',
      type: 'group',
      label: 'Mobile Menu Settings',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
  ],
}
