import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, BookIcon, ImageIcon, StarIcon } from 'lucide-react'

import type { BlockRendererProps, FeaturedCoursesBlock } from '../types'
import { getCTAHref, highlightColorMap } from '@/lib/utils'
import { Highlighter } from '@/components/ui/highlighter'
import { TextAnimate } from '@/components/ui/text-animate'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

export function FeaturedCoursesBlockRenderer({ data }: BlockRendererProps<FeaturedCoursesBlock>) {
  const { content, featuredCourses } = data

  const highlightColor =
    (content?.highlightColor && highlightColorMap[content.highlightColor]) || '#f97316'

  const ctaLink =
    content?.cta?.linkType === 'internal'
      ? typeof content.cta.internalLink === 'object'
        ? `/${content.cta.internalLink?.slug}`
        : '/courses'
      : content?.cta?.externalLink || '/courses'

  return (
    <section className="py-16 md:py-24 bg-linear-to-b from-orange-200/10 to-green-200/10 from-25% to-75% ">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
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
            <h2 className="text-emerald-950 font-black font-heading text-4xl whitespace-nowrap">
              <Highlighter animationDuration={2500} action="underline" color={highlightColor}>
                {content?.heading}
              </Highlighter>
            </h2>
          )}
          {content?.description && (
            <TextAnimate
              as="p"
              animation="blurIn"
              className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
            >
              {content.description}
            </TextAnimate>
          )}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {featuredCourses?.map((course) => (
            <Link key={course.id} href={`/courses/${course.slug}`}>
              <Card className="group rounded-xl p-2 shadow-none hover:shadow-sm transition-shadow duration-300 overflow-hidden flex flex-col space-0 gap-0">
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  {course.thumbnail?.url ? (
                    <Image
                      src={course.thumbnail.url}
                      alt={course.thumbnail.alt || course.title}
                      fill
                      className="object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <ImageIcon className="text-gray-400 size-8" />
                    </div>
                  )}
                  {/* Price Badge */}
                  <div className="absolute top-3 right-3">
                    {course.pricingType === 'free' ? (
                      <span className="bg-emerald-500 text-emerald-50 text-sm font-semibold px-2 py-1 rounded-md">
                        Free
                      </span>
                    ) : (
                      <span className="bg-amber-500 text-amber-50 text-sm font-semibold px-2 py-1 rounded-md">
                        ${course.price}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 pb-0">
                  <div className="mb-2 flex items-center justify-between w-full">
                    {/* Level Badge */}
                    <Badge className="text-xs font-medium bg-emerald-500/10 text-emerald-600 uppercase tracking-wide">
                      {course.level}
                    </Badge>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <StarIcon className="fill-yellow-400 text-yellow-300 size-4" />
                      <p className="text-sm font-medium tracking-wide text-yellow-900/70">
                        {course.overallRating.toFixed(1)}
                      </p>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  {/* Description */}
                  {course.shortDescription && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {course.shortDescription}
                    </p>
                  )}

                  {/* Meta */}
                  <Separator className="mt-4 mb-1" />

                  <div className="min-h-9 h-11 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex flex-1 items-center gap-4">
                      {/* Lessons Count */}
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-600">
                          <BookIcon className="size-4" />
                        </div>

                        <div className="flex flex-col">
                          <span>{course.lessonCount}</span>
                          <span className="text-xs">{`Lessons`}</span>
                        </div>
                      </div>
                    </div>

                    <Separator orientation="vertical" className="h-full" />

                    {/* Instructor */}
                    {course.instructor && (
                      <div className="flex flex-1 items-center justify-end gap-2">
                        {course.instructor.avatarUrl && (
                          <Image
                            src={course.instructor.avatarUrl}
                            alt={course?.instructor?.displayName || ''}
                            className="size-7 sm:size-6 rounded-full object-cover"
                            width={16}
                            height={16}
                          />
                        )}
                        <div className="flex flex-col space-y-0 max-w-fit">
                          <span className="text-xs">{`Instructor`}</span>
                          <span className="text-sm line-clamp-1">{`${course.instructor.displayName}`}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        {content?.cta?.enabled && (
          <div className="mt-12 w-full flex items-center justify-center">
            <Button
              asChild
              size="lg"
              className="bg-teal-950 hover:bg-teal-900 text-white hover:text-white"
            >
              <Link href={getCTAHref(content.cta)}>
                {content.cta?.label}

                <ArrowRightIcon />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
