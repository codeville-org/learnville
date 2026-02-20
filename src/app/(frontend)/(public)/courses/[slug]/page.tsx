import React from 'react'
import { notFound } from 'next/navigation'

import config from '@payload-config'
import { getPayload } from 'payload'
import Image from 'next/image'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Link from 'next/link'

import { generateMeta } from '@/lib/seo/generateMetadata'
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

type Props = {
  params: Promise<{ slug?: string }>
}

// NextJS Incremental Static Regeneration (ISR) revalidation time
export const revalidate = 3600

async function getCourseBySlug(slug: string, isDraftMode: boolean) {
  const payload = await getPayload({ config })

  const res = await payload.find({
    collection: 'courses',
    limit: 1,
    where: {
      slug: { equals: slug },
    },
    depth: 2,
    draft: isDraftMode,
    overrideAccess: true,
    pagination: false,
  })

  if (res.totalDocs === 0) return null

  return res.docs[0]
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const courses = await payload.find({
    collection: 'courses',
    limit: 100,
    where: {
      slug: { exists: true },
      _status: { equals: 'published' },
    },
    select: { slug: true },
    pagination: false,
  })

  return courses.docs
    .filter((course) => course.slug)
    .map((course) => ({
      slug: course.slug!,
    }))
}

export default async function SingleCoursePage({ params }: Props) {
  const { slug } = await params

  if (!slug) notFound()

  const { isEnabled: isDraftMode } = await draftMode()
  const course = await getCourseBySlug(slug, isDraftMode)

  if (!course) notFound()

  return (
    <div>
      {/* Course Page Header */}
      <div className="w-full overflow-hidden relative bg-linear-to-tr from-emerald-900 to-emerald-700">
        <div className="min-h-fit sm:min-h-[200px] overflow-hidden container px-4 py-12 sm:py-0 mx-auto flex items-center justify-between">
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
                  <BreadcrumbLink asChild>
                    <Link
                      href="/courses"
                      className="text-white/80 hover:text-white/80 hover:underline"
                    >
                      Courses
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/80" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">{course.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <TextAnimate
              as={'h1'}
              animation="blurIn"
              delay={0}
              className="text-4xl font-bold text-emerald-100"
            >
              {course.title}
            </TextAnimate>
            <TextAnimate
              as={'p'}
              animation="blurIn"
              delay={0.5}
              className="text-lg text-emerald-100/80"
            >
              {course.shortDescription || course?.meta?.description || ''}
            </TextAnimate>
          </div>
        </div>

        <GridPattern className=" opacity-20 max-h-full" />
      </div>

      {/* Course Content */}
      <div className="container px-4 py-8 mx-auto space-y-6">
        <Image
          src={course.thumbnail instanceof Object ? course?.thumbnail?.url || '' : '#'}
          alt={course.title}
          className="w-full h-full object-cover rounded-md aspect-video"
          width={900}
          height={500}
        />

        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{course.title}</h2>
          <p className="text-sm text-foreground/60">{course.shortDescription}</p>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  if (!slug) return {}

  const { isEnabled: isDraftMode } = await draftMode()
  const course = await getCourseBySlug(slug, isDraftMode)

  if (!course) return {}

  return generateMeta({ doc: course })
}
