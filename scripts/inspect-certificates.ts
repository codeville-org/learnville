/**
 * Inspect certificate_templates and _certificate_templates_v tables
 */

import { createRequire } from 'module'
import { config } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
config({ path: path.resolve(__dirname, '..', '.env') })

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

  console.log('=== certificate_templates (main table) ===')
  const main = await client.query(
    'SELECT id, name, "is_default", "_status", updated_at, created_at FROM certificate_templates ORDER BY id',
  )
  console.table(main.rows)

  console.log('\n=== _certificate_templates_v (versions table) ===')
  const versions = await client.query(
    'SELECT id, parent_id, version_name, version__status, latest, updated_at, created_at FROM _certificate_templates_v ORDER BY id',
  )
  console.table(versions.rows)

  console.log('\n=== Table columns ===')
  const cols = await client.query(`
    SELECT column_name, data_type, column_default 
    FROM information_schema.columns 
    WHERE table_name = 'certificate_templates' 
    ORDER BY ordinal_position
  `)
  console.table(cols.rows)

  await client.end()
  process.exit(0)
}

main()
