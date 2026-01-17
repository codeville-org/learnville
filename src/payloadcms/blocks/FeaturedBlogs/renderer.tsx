import React from 'react'
import { BlockRendererProps, FeaturedBlogsBlock } from '../types'
import { TextAnimate } from '@/components/ui/text-animate'
import { Highlighter } from '@/components/ui/highlighter'
import { getCTAHref, highlightColorMap } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRightIcon, CalendarIcon, ClockIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

export function FeaturedBlogsRenderer({ data }: BlockRendererProps<FeaturedBlogsBlock>) {
  const { content, featuredBlogs } = data

  const highlightColor =
    (content?.highlightColor && highlightColorMap[content.highlightColor]) || '#f97316'

  if (!featuredBlogs || featuredBlogs?.length === 0) return null

  const [firstBlog, secondBlog, thirdBlog] = featuredBlogs

  return (
    <div className="w-full overflow-hidden min-h-[400px] relative bg-emerald-50">
      <div className="container mx-auto px-4">
        <div className="py-16 md:pt-28 md:pb-16">
          <div className="w-full flex items-center justify-between">
            <div className="text-center sm:text-left">
              {content?.preHeading && (
                <TextAnimate
                  as="h3"
                  animation="slideRight"
                  className="text-emerald-800 font-medium font-heading text-lg mb-2"
                >
                  {content.preHeading}
                </TextAnimate>
              )}

              {content?.heading && (
                <TextAnimate
                  as={'h1'}
                  animation="slideRight"
                  className="text-4xl font-semibold text-emerald-950 font-heading"
                >
                  {content.heading}
                </TextAnimate>
              )}

              {content?.highlightedText && (
                <h2 className="text-emerald-950 font-black font-heading text-4xl whitespace-nowrap">
                  <Highlighter animationDuration={2500} action="underline" color={highlightColor}>
                    {content?.highlightedText}
                  </Highlighter>
                </h2>
              )}
            </div>

            <div className="hidden sm:flex">
              {content?.cta && (
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-950 hover:bg-emerald-900 text-white hover:text-white"
                >
                  <Link href={getCTAHref(content.cta)}>
                    {content.cta?.label}

                    <ArrowRightIcon />
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Categories Section */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            {firstBlog && (
              <Card className="shadow-none p-4">
                <Link href={`/blog/${firstBlog.slug}`} className="space-y-3 w-full h-full group">
                  <div className="w-full aspect-video relative overflow-hidden rounded-md">
                    <Badge className="absolute top-2 left-2 z-10 text-sm py-1 px-2 rounded-md font-semibold bg-amber-500 text-emerald-900">
                      <ClockIcon /> {firstBlog.readTimeMinutes}
                      <span className="text-xs font-medium">min read</span>
                    </Badge>
                    <Image
                      src={firstBlog.featuredImage?.url || ''}
                      alt={firstBlog.featuredImage?.alt || firstBlog.title}
                      fill
                      className="object-cover rounded-md group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="space-y-1 px-2">
                    <h2 className="text-xl font-semibold text-emerald-950 font-heading group-hover:underline">
                      {firstBlog.title}
                    </h2>
                    <p className="text-emerald-950/60 text-sm line-clamp-3">{firstBlog.excerpt}</p>
                  </div>

                  <div className="mt-4 px-2 flex items-center gap-3">
                    <p className="flex text-sm items-center gap-1 text-emerald-950/70">
                      <CalendarIcon className="size-4" />
                      {firstBlog.publishedAt &&
                        new Date(firstBlog.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                    </p>
                  </div>
                </Link>
              </Card>
            )}

            {secondBlog && thirdBlog && (
              <Card className="shadow-none p-4 col-span-2 flex flex-col gap-4">
                {/* Second Blog - Row Layout */}
                <Link
                  href={`/blog/${secondBlog.slug}`}
                  className="flex gap-4 group flex-1 items-center"
                >
                  <div className="w-1/3 h-full relative overflow-hidden rounded-md flex-shrink-0">
                    <Badge className="absolute top-2 left-2 z-10 text-xs py-1 px-2 rounded-md font-semibold bg-amber-500 text-emerald-900">
                      <ClockIcon className="size-3" /> {secondBlog.readTimeMinutes}
                      <span className="text-xs font-medium">min</span>
                    </Badge>
                    <Image
                      src={secondBlog.featuredImage?.url || ''}
                      alt={secondBlog.featuredImage?.alt || secondBlog.title}
                      fill
                      className="object-cover rounded-md group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 space-y-3">
                    <h2 className="text-lg font-semibold text-emerald-950 font-heading group-hover:underline line-clamp-2">
                      {secondBlog.title}
                    </h2>
                    <p className="text-emerald-950/60 text-sm line-clamp-2">{secondBlog.excerpt}</p>
                    <p className="flex text-sm items-center gap-1 text-emerald-950/70">
                      <CalendarIcon className="size-4" />
                      {secondBlog.publishedAt &&
                        new Date(secondBlog.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                    </p>
                  </div>
                </Link>

                {/* Third Blog - Row Layout */}
                <Link
                  href={`/blog/${thirdBlog.slug}`}
                  className="flex gap-4 group flex-1 items-center"
                >
                  <div className="w-1/3 h-full relative overflow-hidden rounded-md flex-shrink-0">
                    <Badge className="absolute top-2 left-2 z-10 text-xs py-1 px-2 rounded-md font-semibold bg-amber-500 text-emerald-900">
                      <ClockIcon className="size-3" /> {thirdBlog.readTimeMinutes}
                      <span className="text-xs font-medium">min</span>
                    </Badge>
                    <Image
                      src={thirdBlog.featuredImage?.url || ''}
                      alt={thirdBlog.featuredImage?.alt || thirdBlog.title}
                      fill
                      className="object-cover rounded-md group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 space-y-3">
                    <h2 className="text-lg font-semibold text-emerald-950 font-heading group-hover:underline line-clamp-2">
                      {thirdBlog.title}
                    </h2>
                    <p className="text-emerald-950/60 text-sm line-clamp-2">{thirdBlog.excerpt}</p>
                    <p className="flex text-sm items-center gap-1 text-emerald-950/70">
                      <CalendarIcon className="size-4" />
                      {thirdBlog.publishedAt &&
                        new Date(thirdBlog.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                    </p>
                  </div>
                </Link>
              </Card>
            )}
          </div>

          <div className="flex sm:hidden mt-8 justify-center">
            {content?.cta && (
              <Button
                asChild
                size="lg"
                className="bg-emerald-950 hover:bg-emerald-900 text-white hover:text-white"
              >
                <Link href={getCTAHref(content.cta)}>
                  {content.cta?.label}

                  <ArrowRightIcon />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
