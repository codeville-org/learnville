'use server'
import { getPayload } from 'payload'

import config from '@payload-config'

export async function fetchSiteStats() {
  const payload = await getPayload({ config })

  const siteStats = await payload.findGlobal({
    slug: 'site-stats',
    overrideAccess: true,
  })

  return siteStats
}
