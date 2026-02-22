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
import { bunnyStorage } from '@seshuk/payload-storage-bunny'

import { Users } from './payloadcms/collections/Users/config'
import { Media } from './payloadcms/collections/Media'
import { Videos } from './payloadcms/collections/Videos'
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
import { CertificateTemplates } from './payloadcms/collections/CourseCollections/CertificateTemplates/config'
import { Certificates } from './payloadcms/collections/CourseCollections/Certificates/config'
import { Footer } from './payloadcms/globals/Footer'
import { Header } from './payloadcms/globals/Header'
import { CTA } from './payloadcms/globals/CTA'
import { SiteStats } from './payloadcms/globals/Stats'
import editor from './payloadcms/collections/Users/access/editor'
import {
  placeholder,
  width,
  name,
  label,
  require,
  defaultValue,
  hidden,
} from './payloadcms/forms/fieldConfig'

import { FormSubmission } from '@/payload-types'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const beforeEmail: BeforeEmail<FormSubmission> = (emails, beforeChangeParams) => {
  // Default from address and name from environment variables
  const defaultFromName = process.env.BREVO_SENDER_NAME || 'Learnville'
  const defaultFromAddress = process.env.BREVO_SENDER_EMAIL || ''
  const defaultFrom = `"${defaultFromName}" <${defaultFromAddress}>`

  return emails.map((email) => ({
    ...email,
    // Ensure 'from' is always set to a valid Brevo verified sender
    from: email.from && email.from.trim() !== '' ? email.from : defaultFrom,
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
    meta: {
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/favicon.png',
        },
      ],
    },

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
    Videos,
    Customers,
    Categories,
    Lessons,
    Courses,
    CourseEnrollments,
    QuizAttempts,
    Reviews,
    CertificateTemplates,
    Certificates,
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
    push: false,
  }),
  email: brevoAdapter(),

  // --- Plugins ---
  plugins: [
    // Bunny Stream Plugin (for lesson videos)
    bunnyStorage({
      collections: {
        videos: {
          prefix: 'lesson-videos',
          disablePayloadAccessControl: true,
          // @ts-ignore
          storage: false, // Stream-only, no raw file storage
        },
      },
      stream: {
        apiKey: process.env.BUNNY_STREAM_API_KEY!,
        hostname: process.env.BUNNY_STREAM_HOSTNAME!,
        libraryId: Number(process.env.BUNNY_STREAM_LIBRARY_ID),
        tus: true, // Enable resumable uploads for large videos
        mp4Fallback: true, // Allow MP4 download fallback
      },
    }),

    // Vercel Blob Storage Plugin
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process?.env?.BLOB_READ_WRITE_TOKEN,
    }),

    // Payload Form Builder Plugin
    formBuilderPlugin({
      fields: {
        phone: {
          fields: [
            { type: 'row', fields: [name, label] },
            { type: 'row', fields: [placeholder, defaultValue] },
            { type: 'row', fields: [width] },
            { type: 'row', fields: [require, hidden] },
          ],
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
          {
            type: 'tabs',
            tabs: [
              {
                label: 'Form Setup',
                description: 'Configure basic form settings',
                fields: [
                  ...defaultFields.map((field) => {
                    if (field.type === 'radio' && field.name === 'confirmationType') {
                      return {
                        ...field,
                        hidden: true,
                      }
                    }

                    return field
                  }),
                ],
              },
              {
                label: 'Metadata',
                description: 'Additional metadata for the form',
                fields: [
                  {
                    type: 'group',
                    fields: [
                      {
                        type: 'text',
                        name: 'heading',
                        label: 'Form Heading',
                      },
                      {
                        type: 'text',
                        name: 'subheading',
                        label: 'Form Subheading',
                      },
                      {
                        name: 'description',
                        type: 'text',
                        label: 'Form Description',
                      },
                    ],
                  },
                  {
                    type: 'checkbox',
                    name: 'requireReCaptcha',
                    label: 'Require reCAPTCHA Verification',
                    defaultValue: false,
                  },
                ],
              },
            ],
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
