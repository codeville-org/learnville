import type { GlobalAfterChangeHook } from 'payload'

/**
 * After a global (header/footer) is updated, trigger on-demand revalidation
 * so the layout is refreshed across all pages.
 */
export const revalidateGlobal: GlobalAfterChangeHook = async ({
  doc,
  req,
  global: globalConfig,
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
        global: globalConfig.slug,
      }),
    })

    req.payload.logger.info(`Revalidated global: ${globalConfig.slug}`)
  } catch (error) {
    req.payload.logger.error(`Failed to revalidate global ${globalConfig.slug}: ${error}`)
  }

  return doc
}
