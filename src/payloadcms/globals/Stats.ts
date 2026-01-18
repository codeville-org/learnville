import { GlobalConfig } from 'payload'
import { checkRole } from '../collections/Users/access/check-role'
import editor from '../collections/Users/access/editor'

export const SiteStats: GlobalConfig = {
  slug: 'site-stats',
  label: 'Site Stats',
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
  admin: {
    group: 'Content Management',
  },
  fields: [
    {
      name: 'stats',
      type: 'group',
      label: 'Statistics',
      fields: [
        {
          name: 'activeLearners',
          type: 'text',
          label: 'Active Learners',
          defaultValue: '60K',
        },
        {
          name: 'expertInstructors',
          type: 'text',
          label: 'Expert Instructors',
          defaultValue: '500+',
        },
        {
          name: 'coursesAvailable',
          type: 'text',
          label: 'Courses Available',
          defaultValue: '1,200+',
        },
        {
          name: 'certificatesIssued',
          type: 'text',
          label: 'Certificates Issued',
          defaultValue: '30K',
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features List',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Feature Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Feature Description',
        },
      ],
      minRows: 1,
      maxRows: 3,
      defaultValue: [
        {
          title: 'Learn from Anywhere',
          description: 'Access your courses anytime, on any device at home, at work, or on the go.',
        },
        {
          title: 'Teach with Confidence',
          description:
            'All the tools you need to build, launch, and scale your courses-stress-free.',
        },
        {
          title: 'Earn Real Certificates',
          description:
            'Complete courses and receive professional certificates to boost your career.',
        },
      ],
    },
  ],
}
