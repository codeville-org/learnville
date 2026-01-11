import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { headers as getHeaders } from 'next/headers'

import { generateMeta } from '@/lib/seo/generateMetadata'
import { RenderPageBlocks } from '@/payloadcms/blocks/page-blocks-renderer'

type Props = {
  params: Promise<{ slug?: string }>
}

async function getPageBySlug(slug: string = '/') {
  const headers = await getHeaders()

  const payload = await getPayload({ config })

  const { user } = await payload.auth({ headers })

  const res = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      slug: { equals: slug },
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

export default async function Page({ params }: Props) {
  const { slug } = await params

  if (!slug) notFound()

  const page = await getPageBySlug(slug)

  if (!page) notFound()

  return <RenderPageBlocks blocks={page?.content?.sections} />
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  if (!slug) return {}

  const page = await getPageBySlug(slug)

  if (!page) return {}

  return generateMeta({ doc: page })
}
