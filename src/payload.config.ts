import { s3Storage } from '@payloadcms/storage-s3'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users/config'
import { Media } from './collections/Media'
import brevoAdapter from './lib/adapters/brevo'
import { Customers } from './collections/Customers/config'
import { Header } from './globals/Header/config'

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
  },

  // --- Database Collection Injections ---
  collections: [Users, Media, Customers],

  // --- Payload Gloabls ---
  globals: [Header],

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
  ],

  sharp,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
