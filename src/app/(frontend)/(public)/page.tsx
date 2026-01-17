import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { headers as getHeaders } from 'next/headers'

import { generateMeta } from '@/lib/seo/generateMetadata'
import { RenderPageBlocks } from '@/payloadcms/blocks/page-blocks-renderer'
import { hydratePageBlocks } from '@/lib/hydrate-page-blocks'

type Props = {}

async function getHomepage() {
  const headers = await getHeaders()

  const payload = await getPayload({ config })

  const { user } = await payload.auth({ headers })

  const res = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      isHomepage: { equals: true },
    },
    depth: 1,
    overrideAccess: Boolean(user),
    pagination: false,
    draft: Boolean(user),
  })

  if (res.totalDocs === 0) return null

  const page = res.docs[0]

  // Hydrate all blocks with their required relationship data
  if (page.content?.sections) {
    page.content.sections = await hydratePageBlocks(page.content.sections)
  }

  return page
}

export default async function Homepage({}: Props) {
  const page = await getHomepage()

  if (!page) notFound()

  return <RenderPageBlocks blocks={page?.content?.sections} />
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomepage()

  if (!page) return {}

  return generateMeta({ doc: page })
}
