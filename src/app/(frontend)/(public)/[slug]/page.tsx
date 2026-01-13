import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { headers as getHeaders } from 'next/headers'

import { generateMeta } from '@/lib/seo/generateMetadata'
import { RenderPageBlocks } from '@/payloadcms/blocks/page-blocks-renderer'
import { TextAnimate } from '@/components/ui/text-animate'
import { GridPattern } from '@/components/ui/grid-pattern'

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

  return (
    <div>
      {/* Slugified Page Header */}
      <div className="w-full overflow-hidden bg-linear-to-tr from-emerald-900 to-emerald-700">
        <div className="min-h-[200px] container px-4 mx-auto flex items-center justify-start">
          <div className="space-y-1">
            <TextAnimate
              as={'h1'}
              animation="blurIn"
              delay={0}
              className="text-4xl font-bold text-emerald-100"
            >
              {page?.title || page?.meta?.title || ''}
            </TextAnimate>
            <TextAnimate
              as={'p'}
              animation="blurIn"
              delay={0.5}
              className="text-lg text-emerald-100/80"
            >
              {page?.description || page?.meta?.description || ''}
            </TextAnimate>
          </div>
        </div>

        <GridPattern className="opacity-20 max-h-full" />
      </div>

      <RenderPageBlocks blocks={page?.content?.sections} />
    </div>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  if (!slug) return {}

  const page = await getPageBySlug(slug)

  if (!page) return {}

  return generateMeta({ doc: page })
}
