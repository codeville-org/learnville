/**
 * Fix script: Drop certificate tables so Payload can recreate them cleanly.
 *
 * The DB schema got into an inconsistent state after manually altering columns.
 * Since there is no data in these tables, we drop them and let Payload's
 * Drizzle push recreate them on the next dev server start.
 *
 * Usage:
 *   proxychains npx tsx scripts/fix-certificate-schema.ts
 */

import { createRequire } from 'module'
import { config } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
config({ path: path.resolve(__dirname, '..', '.env') })

// Resolve pg from the pnpm store
const _require = createRequire(import.meta.url)
const pg = _require(
  path.resolve(__dirname, '..', 'node_modules', '.pnpm', 'pg@8.16.3', 'node_modules', 'pg'),
)

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  console.error('DATABASE_URL environment variable is required')
  process.exit(1)
}

async function main() {
  const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } })
  await client.connect()
  console.log('Connected to database')

  try {
    // Drop foreign key constraints from other tables that reference certificate_templates
    console.log('Dropping foreign key constraints...')

    const fkQueries = [
      `ALTER TABLE IF EXISTS "courses" DROP CONSTRAINT IF EXISTS "courses_certificate_template_id_certificate_templates_id_fk"`,
      `ALTER TABLE IF EXISTS "_courses_v" DROP CONSTRAINT IF EXISTS "_courses_v_version_certificate_template_id_certificate_templates_id_fk"`,
      `ALTER TABLE IF EXISTS "certificates" DROP CONSTRAINT IF EXISTS "certificates_template_id_certificate_templates_id_fk"`,
      `ALTER TABLE IF EXISTS "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_certificate_templates_fk"`,
      `ALTER TABLE IF EXISTS "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_certificates_fk"`,
    ]

    for (const q of fkQueries) {
      await client.query(q)
    }
    console.log('Foreign key constraints dropped')

    // Drop the certificate tables
    console.log('Dropping certificate tables...')
    await client.query(`DROP TABLE IF EXISTS "_certificate_templates_v" CASCADE`)
    await client.query(`DROP TABLE IF EXISTS "certificates" CASCADE`)
    await client.query(`DROP TABLE IF EXISTS "certificate_templates" CASCADE`)
    console.log('Certificate tables dropped')

    // Drop the enum types
    console.log('Dropping enum types...')
    await client.query(`DROP TYPE IF EXISTS "enum_certificate_templates_status"`)
    await client.query(`DROP TYPE IF EXISTS "enum__certificate_templates_v_version_status"`)
    console.log('Enum types dropped')

    // Clean up locked_documents_rels columns that reference these tables
    console.log('Cleaning up locked_documents_rels columns...')
    await client.query(
      `ALTER TABLE IF EXISTS "payload_locked_documents_rels" DROP COLUMN IF EXISTS "certificate_templates_id"`,
    )
    await client.query(
      `ALTER TABLE IF EXISTS "payload_locked_documents_rels" DROP COLUMN IF EXISTS "certificates_id"`,
    )
    console.log('Locked documents columns cleaned up')

    console.log(
      '\n✅ Done! Now run `pnpm dev` and Payload will recreate the tables with the correct schema.',
    )
  } catch (err) {
    console.error('Error:', err)
    process.exit(1)
  } finally {
    await client.end()
    process.exit(0)
  }
}

main()
