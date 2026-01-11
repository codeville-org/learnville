import React from 'react'
import { notFound } from 'next/navigation'

import config from '@payload-config'
import { getPayload } from 'payload'
import Image from 'next/image'
import { Metadata } from 'next'
import { generateMeta } from '@/lib/seo/generateMetadata'

type Props = {
  params: Promise<{ slug?: string }>
}

async function fetchCourseBySlug(slug: string) {
  try {
    const payload = await getPayload({ config })

    const res = await payload.find({
      collection: 'courses',
      limit: 1,
      where: {
        slug: { equals: slug },
      },
      depth: 1,
      overrideAccess: true,
    })

    if (res.totalDocs === 0) notFound()

    const course = res.docs[0]

    return course
  } catch (error) {
    return null
  }
}

export default async function SingleCoursePage({ params }: Props) {
  const { slug } = await params

  if (!slug) notFound()

  const course = await fetchCourseBySlug(slug)

  if (!course) notFound()

  return (
    <div className="w-full space-y-4">
      <Image
        src={course.thumbnail instanceof Object ? course?.thumbnail?.url || '' : '#'}
        alt={course.title}
        className="w-full h-full object-cover rounded-md aspect-video"
        width={900}
        height={500}
      />

      <div className="space-y-1">
        <h1 className="text-2xl font-bold">{course.title}</h1>
        <p className="text-sm text-foreground/60">{course.shortDescription}</p>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  if (!slug) return {}

  const course = await fetchCourseBySlug(slug)

  if (!course) return {}

  return generateMeta({ doc: course })
}
