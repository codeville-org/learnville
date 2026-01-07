import { getServerSideURL } from '@/lib/get-url'
import type { CollectionConfig } from 'payload'
import admin from '../Users/access/admin'
import { checkRole } from '../Users/access/check-role'
import { User } from '@/payload-types'

export const Customers: CollectionConfig = {
  slug: 'customers',
  auth: {
    tokenExpiration: 12 * 60 * 60, // 12 hours
    verify: {
      generateEmailSubject: (args) => {
        return `Hey ${args.user?.firstName ? args.user?.firstName : args.user?.email}, please verify your email address`
      },
      generateEmailHTML: (args) => {
        return `
          <div>
            <h1>Hey ${args?.user?.firstName ? args?.user?.firstName : args?.user?.email}</h1>
            <br />
            <p>Thanks for signing up! Please verify your email address by clicking the link below:</p>
            <a href="${getServerSideURL()}/verify?token=${args.token}">Verify my email</a>
          </div>
        `
      },
    },
    forgotPassword: {
      generateEmailSubject: (args) => {
        return `Hey ${args?.user?.firstName ? args?.user?.firstName : args?.user?.email}, Change your password`
      },
      generateEmailHTML: (args) => {
        return `
          <div>
            <h1>Hey ${args?.user?.firstName ? args?.user?.firstName : args?.user?.email}</h1>
            <br />
            <p>You (or someone) requested to reset your account password. If this wasn't you, you can safely ignore this email. Otherwise follow this link to reset your password :</p>
            <a href="${getServerSideURL()}/reset-password?token=${args?.token}">Reset my Password</a>
          </div>
        `
      },
    },
    cookies: {
      secure: true,
      sameSite: 'None',
      domain: process.env.COOKIE_DOMAIN,
    },
  },
  admin: {
    useAsTitle: 'firstName',
    hidden: ({ user }) => {
      if (checkRole(['admin'], user as any)) return false

      return true
    },
  },
  access: {
    create: () => true,
    admin: ({ req }) => {
      if (req.user && req.user.collection === 'users') {
        if (checkRole(['admin'], req.user)) return true
      }

      return false
    },
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          type: 'text',
          name: 'firstName',
        },
        {
          type: 'text',
          name: 'lastName',
        },
      ],
    },
    {
      name: 'tier',
      type: 'radio',
      interfaceName: 'tierProps',
      options: ['Free', 'Basic', 'Pro', 'Enterprise'],
    },
    {
      name: 'totalXP',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        description: 'Total XP earned across all courses',
      },
    },
    {
      name: 'level',
      type: 'number',
      defaultValue: 1,
      admin: {
        readOnly: true,
        description: 'User level based on total XP',
      },
    },
    {
      name: 'enrolledCourses',
      type: 'relationship',
      relationTo: 'course-enrollments',
      hasMany: true,
      admin: {
        readOnly: true,
      },
    },
  ],
}
