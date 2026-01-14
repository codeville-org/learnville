import { s3Storage } from '@payloadcms/storage-s3'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { seoPlugin } from '@payloadcms/plugin-seo'

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
import { Footer } from './payloadcms/globals/Footer'
import { Header } from './payloadcms/globals/Header'
import { CTA } from './payloadcms/globals/CTA'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

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
  ],

  // --- Payload Gloabls ---
  globals: [Header, Footer, CTA],

  // --- Adapters ---
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  email: brevoAdapter(),

  // --- Plugins ---
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env?.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env?.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env?.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env?.S3_REGION || '',
      },
    }),
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
