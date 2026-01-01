import { getServerSideURL } from '@/lib/get-url'
import type { CollectionConfig } from 'payload'

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
    cookies: {
      secure: true,
      sameSite: 'None',
      domain: process.env.COOKIE_DOMAIN,
    },
  },
  admin: {
    useAsTitle: 'firstName',
  },
  access: {
    create: () => true,
    admin: () => false,
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
  ],
}
