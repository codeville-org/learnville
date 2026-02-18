import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'

import { generateMeta } from '@/lib/seo/generateMetadata'
import { RenderPageBlocks } from '@/payloadcms/blocks/page-blocks-renderer'
import { hydratePageBlocks } from '@/lib/hydrate-page-blocks'
import { TextAnimate } from '@/components/ui/text-animate'
import { GridPattern } from '@/components/ui/grid-pattern'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { SearchParams } from 'nuqs/server'

type Props = {
  params: Promise<{ slug?: string }>
  searchParams: Promise<SearchParams>
}

// NextJS Incremental Static Regeneration (ISR) revalidation time
export const revalidate = 3600

async function getPageBySlug(slug: string = '/', isDraftMode: boolean) {
  const payload = await getPayload({ config })

  // ------------------------
  let depth = 1
  if (slug === 'categories' || slug.startsWith('/categories')) {
    depth = 2
  }
  // ------------------------

  const res = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      slug: { equals: slug },
    },
    depth,
    draft: isDraftMode,
    pagination: false,
  })

  if (res.totalDocs === 0) return null

  const page = res.docs[0]

  // Hydrate all blocks with their required relationship data
  if (page.content?.sections) {
    page.content.sections = await hydratePageBlocks(page.content.sections)
  }

  return page
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const pages = await payload.find({
    collection: 'pages',
    limit: 100,
    where: {
      isHomepage: { not_equals: true },
      slug: { exists: true },
    },
    select: { slug: true },
    pagination: false,
  })

  return pages.docs
    .filter((page) => page.slug)
    .map((page) => ({
      slug: page.slug!,
    }))
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params

  if (!slug) notFound()

  const { isEnabled: isDraftMode } = await draftMode()
  const page = await getPageBySlug(slug, isDraftMode)

  if (!page) notFound()

  return (
    <div>
      {/* Slugified Page Header */}
      <div className="w-full overflow-hidden relative bg-linear-to-tr from-emerald-900 to-emerald-700">
        <div className="min-h-fit sm:min-h-[200px]  overflow-hidden container px-4 py-12 sm:py-0 mx-auto flex items-center justify-between">
          <div className="space-y-1">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/" className="text-white/80 hover:text-white/80 hover:underline">
                      Home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/80" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">
                    {page?.title || page?.meta?.title || ''}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

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

        <GridPattern className=" opacity-20 max-h-full" />
      </div>

      <RenderPageBlocks blocks={page?.content?.sections} searchParams={searchParams} />
    </div>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  if (!slug) return {}

  const { isEnabled: isDraftMode } = await draftMode()
  const page = await getPageBySlug(slug, isDraftMode)

  if (!page) return {}

  return generateMeta({ doc: page })
}
