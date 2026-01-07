import type { CollectionConfig } from 'payload'
import { protectRoles } from './hooks/protectRoles'
import { calculateInstructorStats } from './hooks/calculateInstructorStats'
import editor from './access/editor'
import user from './access/user'
import admin from './access/admin'
import { checkRole } from './access/check-role'
import { User } from '@/payload-types'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: editor,
    read: user,
    update: user,
    delete: admin,
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  hooks: {
    beforeChange: [calculateInstructorStats],
  },
  fields: [
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Instructor', value: 'instructor' },
        { label: 'User', value: 'user' },
      ],
      hooks: {
        beforeChange: [protectRoles],
      },
      access: {
        update: ({ req: { user } }) => checkRole(['admin'], user as User),
      },
    },
    {
      name: 'instructorProfile',
      type: 'group',
      admin: {
        condition: (data) => data?.roles?.includes('instructor'),
        description: 'Profile information for instructors',
      },
      fields: [
        {
          name: 'displayName',
          type: 'text',
          maxLength: 100,
          admin: {
            description: 'Public display name (defaults to email if not set)',
          },
        },
        {
          name: 'tagline',
          type: 'text',
          maxLength: 150,
          admin: {
            description: 'Short professional tagline or title',
            placeholder: 'e.g., Senior Web Developer & Course Creator',
          },
        },
        {
          name: 'bio',
          type: 'textarea',
          maxLength: 1000,
          admin: {
            description: 'Instructor biography (max 1000 characters)',
          },
        },
        {
          name: 'expertise',
          type: 'relationship',
          hasMany: true,
          relationTo: 'categories',
          admin: {
            description: 'Areas of expertise',
          },
        },
        {
          name: 'yearsExperience',
          type: 'number',
          min: 0,
          max: 50,
          admin: {
            description: 'Years of professional experience',
          },
        },
        {
          name: 'socialLinks',
          type: 'group',
          admin: {
            description: 'Social media and professional profiles',
          },
          fields: [
            {
              name: 'website',
              type: 'text',
              admin: {
                placeholder: 'https://yourwebsite.com',
              },
            },
            {
              name: 'linkedin',
              type: 'text',
              admin: {
                placeholder: 'https://linkedin.com/in/username',
              },
            },
            {
              name: 'twitter',
              type: 'text',
              admin: {
                placeholder: 'https://twitter.com/username',
              },
            },
            {
              name: 'github',
              type: 'text',
              admin: {
                placeholder: 'https://github.com/username',
              },
            },
            {
              name: 'youtube',
              type: 'text',
              admin: {
                placeholder: 'https://youtube.com/@username',
              },
            },
          ],
        },
        {
          name: 'qualifications',
          type: 'array',
          admin: {
            description: 'Educational qualifications and certifications',
            initCollapsed: true,
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'e.g., Master of Computer Science',
              },
            },
            {
              name: 'institution',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'e.g., Stanford University',
              },
            },
            {
              name: 'year',
              type: 'number',
              admin: {
                placeholder: 'e.g., 2020',
              },
            },
            {
              name: 'type',
              type: 'select',
              options: [
                { label: 'Degree', value: 'degree' },
                { label: 'Certification', value: 'certification' },
                { label: 'Diploma', value: 'diploma' },
                { label: 'Course', value: 'course' },
              ],
              defaultValue: 'degree',
            },
            {
              name: 'verificationUrl',
              type: 'text',
              admin: {
                description: 'Link to credential verification (optional)',
                placeholder: 'https://...',
              },
            },
          ],
        },
        {
          name: 'isPublicProfile',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Make profile visible on instructor directory',
          },
        },
      ],
    },
    {
      name: 'instructorStats',
      type: 'group',
      admin: {
        condition: (data) => data?.roles?.includes('instructor'),
        description: 'Auto-calculated instructor statistics',
      },
      fields: [
        {
          name: 'totalCourses',
          type: 'number',
          defaultValue: 0,
          admin: {
            readOnly: true,
            description: 'Total number of courses created',
          },
        },
        {
          name: 'totalStudents',
          type: 'number',
          defaultValue: 0,
          admin: {
            readOnly: true,
            description: 'Total unique students enrolled across all courses',
          },
        },
        {
          name: 'averageRating',
          type: 'number',
          defaultValue: 0,
          admin: {
            readOnly: true,
            description: 'Average rating across all courses (0-5)',
          },
        },
        {
          name: 'totalReviews',
          type: 'number',
          defaultValue: 0,
          admin: {
            readOnly: true,
            description: 'Total number of reviews received',
          },
        },
      ],
    },
  ],
}
