import type { CollectionAfterChangeHook } from 'payload'
import type { Page } from '@/payload-types'

/**
 * After a page is created/updated, trigger on-demand revalidation
 * so the statically rendered page is refreshed with new content.
 */
export const revalidatePage: CollectionAfterChangeHook<Page> = async ({
  doc,
  req,
  operation,
  previousDoc,
}) => {
  // Only revalidate when publishing (not on draft saves)
  if (doc._status === 'draft') return doc

  const secret = process.env.REVALIDATION_SECRET
  if (!secret) {
    req.payload.logger.warn('REVALIDATION_SECRET not set — skipping revalidation')
    return doc
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

    await fetch(`${baseUrl}/api/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret,
        collection: 'pages',
        slug: doc.isHomepage ? undefined : doc.slug,
      }),
    })

    req.payload.logger.info(`Revalidated page: ${doc.isHomepage ? '/ (homepage)' : `/${doc.slug}`}`)
  } catch (error) {
    req.payload.logger.error(`Failed to revalidate page: ${error}`)
  }

  return doc
}
