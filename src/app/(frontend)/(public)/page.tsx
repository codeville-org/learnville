import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { headers as getHeaders } from 'next/headers'

import { generateMeta } from '@/lib/seo/generateMetadata'
import { LivePreviewListener } from '@/components/live-preview-listener'
import { HeroBlockRenderer } from '@/payloadcms/blocks/Hero/renderer'

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

  return page
}

export default async function Homepage({}: Props) {
  const page = await getHomepage()

  if (!page) notFound()

  return (
    <div>
      {page?.content?.sections?.map((section) => {
        if (section.blockType === 'hero') return <HeroBlockRenderer data={section} />
      })}
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomepage()

  if (!page) return {}

  return generateMeta({ doc: page })
}
