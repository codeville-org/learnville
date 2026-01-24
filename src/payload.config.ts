import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { formBuilderPlugin, fields } from '@payloadcms/plugin-form-builder'
import type { BeforeEmail } from '@payloadcms/plugin-form-builder/types'

import { Users } from './payloadcms/collections/Users/config'
import { Media } from './payloadcms/collections/Media'
import brevoAdapter from './lib/adapters/brevo'
import { Customers } from './payloadcms/collections/Customers/config'
import { Categories } from './payloadcms/collections/Categories/config'
import { Lessons } from './payloadcms/collections/CourseCollections/Lessons/config'
import { Courses } from './payloadcms/collections/CourseCollections/Courses/config'
import { CourseEnrollments } from './payloadcms/collections/CourseCollections/Enrollments/config'
import { QuizAttempts } from './payloadcms/collections/CourseCollections/QuizAttempts/config'
import { Reviews } from './payloadcms/collections/CourseCollections/Reviews/config'
import { Pages } from './payloadcms/collections/Pages/config'
import { Blog } from './payloadcms/collections/Blog/config'
import { Footer } from './payloadcms/globals/Footer'
import { Header } from './payloadcms/globals/Header'
import { CTA } from './payloadcms/globals/CTA'
import { SiteStats } from './payloadcms/globals/Stats'

import { FormSubmission } from '@/payload-types'
import editor from './payloadcms/collections/Users/access/editor'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const beforeEmail: BeforeEmail<FormSubmission> = (emails, beforeChangeParams) => {
  return emails.map((email) => ({
    ...email,
    html: `
      <div>
        <style>
          h1 { font-size: 3rem }
          p { font-size: 1rem; font-weight: bold; padding: 1rem; border: 1px solid darkgreen; border-radius: 0.5rem; }
        </style>

        <div>
          ${email.html}
        </div>
      </div>
    `,
  }))
}

export default buildConfig({
  // --- Admin Configurations ---
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    // autoLogin:
    //   process.env.NEXT_PUBLIC_PAYLOAD_AUTO_LOGIN === 'true'
    //     ? {
    //         email: `vihanga+editor@codeville.dev`,
    //         password: `vihanga123`,
    //       }
    //     : false,

    // Live Preview
    livePreview: {
      collections: ['pages'],
      globals: ['footer'],
      breakpoints: [
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 1080,
        },
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
      ],
      url: ({ data, collectionConfig }) => {
        // return `/${collectionConfig?.slug === "pages" ? data?.slug !== "homepage" ? data.slug : ""}`
        return `/${data?.slug}`
      },
    },
  },

  // --- Database Collection Injections ---
  collections: [
    Users,
    Media,
    Customers,
    Categories,
    Lessons,
    Courses,
    CourseEnrollments,
    QuizAttempts,
    Reviews,
    Pages,
    Blog,
  ],

  // --- Payload Gloabls ---
  globals: [Header, Footer, CTA, SiteStats],

  // --- Adapters ---
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  email: brevoAdapter(),

  // --- Plugins ---
  plugins: [
    // ------- Storage Adapters -------
    // s3Storage({
    //   collections: {
    //     media: true,
    //   },
    //   bucket: process.env?.R2_BUCKET || '',
    //   config: {
    //     credentials: {
    //       accessKeyId: process.env?.R2_ACCESS_KEY_ID || '',
    //       secretAccessKey: process.env?.R2_SECRET_ACCESS_KEY || '',
    //     },
    //     region: 'auto',
    //     endpoint: process.env?.S3_ENDPOINT || '',
    //   },
    //   acl: 'public-read',
    //   disableLocalStorage: true,
    // }),

    formBuilderPlugin({
      fields: {
        phone: {
          ...fields.text,
          // @ts-ignore
          slug: 'phone',
          labels: {
            singular: 'Phone Number',
            plural: 'Phone Numbers',
          },
        },
      },
      redirectRelationships: ['pages'],
      beforeEmail: beforeEmail,
      defaultToEmail: process?.env?.DEFAULT_TO_EMAIL || '',
      formOverrides: {
        slug: `forms`,
        admin: {
          group: 'Forms',
        },
        access: {
          update: editor,
        },
        fields: ({ defaultFields }) => [
          ...defaultFields.map((field) => {
            if (field.type === 'radio' && field.name === 'confirmationType') {
              return {
                ...field,
                hidden: true,
              }
            }

            return field
          }),
          // Any additional field goes here
          {
            type: 'checkbox',
            name: 'requireReCaptcha',
            label: 'Require reCAPTCHA Verification',
            defaultValue: false,
            admin: {
              position: 'sidebar',
            },
          },
        ],
      },
      formSubmissionOverrides: {
        slug: 'form-submissions',
        admin: {
          group: 'Forms',
        },
      },
    }),

    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process?.env?.BLOB_READ_WRITE_TOKEN,
    }),
    // ----------------------------------

    seoPlugin({
      generateTitle: ({ doc }) => doc.title,
      generateDescription: ({ doc, collectionSlug }) => {
        if (collectionSlug === 'courses') {
          return doc.shortDescription
        }
        return doc.description
      },
      generateURL: ({ doc, collectionSlug }) => `/${collectionSlug}/${doc.slug}`,
    }),
  ],

  sharp,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // Hooks
  // onInit: async (payload) => {
  //   await payload.update({
  //     collection: 'pages',
  //     where: {},
  //     data: { _status: 'published' },
  //   })
  // },
})
