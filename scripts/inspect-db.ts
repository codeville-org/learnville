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

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})
await client.connect()

console.log('=== Media ===')
const media = await client.query('SELECT id, filename, alt FROM media ORDER BY id LIMIT 30')
console.table(media.rows)

console.log('\n=== Courses ===')
const courses = await client.query('SELECT id, title, slug FROM courses ORDER BY id LIMIT 10')
console.table(courses.rows)

console.log('\n=== Lessons ===')
const lessons = await client.query('SELECT id, lesson_name FROM lessons ORDER BY id LIMIT 10')
console.table(lessons.rows)

await client.end()
process.exit(0)
