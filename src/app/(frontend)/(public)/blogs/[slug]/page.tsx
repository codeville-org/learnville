import React from 'react'
import config from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { BlogsBreadcrumb } from '../components/blogs-breadcrumb'
import { Calendar, ClockIcon } from 'lucide-react'
import { RichTextComponent } from '@/payloadcms/blocks/RichTextContent/renderer'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Props = {
  params: Promise<{ slug?: string }>
}

// NextJS Incremental Static Regeneration (ISR) revalidation time - 1 Day
export const revalidate = 86400

async function fetchBlogPost(slug?: string) {
  try {
    if (!slug) throw Error('SLUG_NOT_FOUND')

    const payload = await getPayload({ config })

    const res = await payload.find({
      collection: 'blog',
      limit: 1,
      where: {
        slug: { equals: slug },
      },
      depth: 1,
      overrideAccess: true,
    })

    if (res.docs.length < 1 || !res?.docs[0]) throw new Error('BLOG_NOT_FOUND')

    return { data: res.docs[0], error: null }
  } catch (error) {
    const err = error as Error

    if (err.message === 'BLOG_NOT_FOUND' || err.message === 'SLUG_NOT_FOUND') return notFound()

    return { data: null, error: (error as Error).message }
  }
}

export default async function SingleBlogPage({ params }: Props) {
  const { slug } = await params

  const { data, error } = await fetchBlogPost(slug)

  if (!data || error) return <></>

  return (
    <div className={cn('pb-16 md:pb-24')}>
      <div className="container mx-auto px-4 pt-8">
        {/* BreadCrumb */}
        <div className="mb-4 hidden sm:flex items-center justify-between">
          <BlogsBreadcrumb title={data?.title} />

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <ClockIcon className="size-4 text-emerald-600" />
              <p className="text-sm text-emerald-900/70">{data.readTime} min</p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-emerald-600" />
              <p className="text-sm text-emerald-900/70">
                {new Date(data?.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-lg">
          {typeof data.featuredImage !== 'number' && (
            <Image
              alt={data?.title}
              src={data?.featuredImage?.url || ''}
              width={data?.featuredImage?.width || 1080}
              height={data?.featuredImage?.height || 500}
              className="w-full h-full object-cover"
              priority
            />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

          {/* Title overlay */}
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-8 md:pb-12">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">
                {data.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {data.content && <RichTextComponent content={data.content} />}

          <Separator className="my-6" />

          <div className="flex items-center">
            {/* Author */}
            <div className="flex items-center gap-2">
              <Avatar className="size-9">
                <AvatarImage
                  src={
                    data?.author instanceof Object
                      ? data?.author?.avatar instanceof Object
                        ? data?.author?.avatar?.url
                          ? data?.author?.avatar?.url
                          : ''
                        : ''
                      : ''
                  }
                  alt={data?.author instanceof Object ? data?.author?.email || '' : ''}
                />
                <AvatarFallback>
                  {data?.author instanceof Object
                    ? data?.author?.email?.charAt(0).toUpperCase()
                    : ''}
                </AvatarFallback>
              </Avatar>

              <div className="">
                <p className="text-xs text-foreground/70">Written By,</p>
                <p>{data?.author instanceof Object ? data?.author?.email : ''}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
