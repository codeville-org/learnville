'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

import type { BlockRendererProps, FeaturedCoursesBlock } from '../types'
import { getNavigationLinkHref, highlightColorMap } from '@/lib/utils'
import { Highlighter } from '@/components/ui/highlighter'
import { TextAnimate } from '@/components/ui/text-animate'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { CourseCard } from '@/components/shared/course-card'
import { HydratedCourseData } from '@/lib/hydrate-page-blocks'

export function FeaturedCoursesBlockRenderer({ data }: BlockRendererProps<FeaturedCoursesBlock>) {
  const { content, featuredCourses } = data
  const [selectedCategory, setSelectedCategory] = useState<HydratedCourseData['category'] | 'all'>(
    'all',
  )

  const distinctCategories = React.useMemo(() => {
    const categoriesSet = new Set<HydratedCourseData['category']>()

    featuredCourses?.forEach((course) => {
      if (course.category) {
        categoriesSet.add(course.category)
      }
    })

    return Array.from(categoriesSet)
  }, [featuredCourses])

  const filteredCourses = React.useMemo(() => {
    if (selectedCategory === 'all') {
      return featuredCourses || []
    }
    return (featuredCourses || []).filter((course) => course.category === selectedCategory)
  }, [featuredCourses, selectedCategory])

  const highlightColor =
    (content?.highlightColor && highlightColorMap[content.highlightColor]) || '#f97316'

  const handleCategorySelect = (category: HydratedCourseData['category'] | 'all') => {
    setSelectedCategory(category)
  }

  return (
    <section className="py-16 md:py-20 bg-linear-to-b from-orange-200/10 to-green-200/10 from-25% to-75% ">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
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

        {/* Categories Bar */}
        {distinctCategories.length > 0 && (
          <div className="mb-10 w-full flex items-center justify-start sm:justify-center">
            <ScrollArea className="w-full sm:w-fit">
              <div className="flex items-center justify-center border-b border-gray-200/60">
                <button
                  onClick={() => handleCategorySelect('all')}
                  className={`relative px-4 py-3 text-sm cursor-pointer font-medium whitespace-nowrap transition-colors bg-transparent ${
                    selectedCategory === 'all'
                      ? 'text-emerald-700'
                      : 'text-gray-600 hover:text-emerald-800/60'
                  }`}
                >
                  All
                  {selectedCategory === 'all' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                  )}
                </button>
                {distinctCategories.map((category) => (
                  <button
                    key={category || 'uncategorized'}
                    onClick={() => handleCategorySelect(category)}
                    className={`relative px-4 py-3 text-sm cursor-pointer font-medium whitespace-nowrap transition-colors bg-transparent ${
                      selectedCategory === category
                        ? 'text-emerald-700'
                        : 'text-gray-600 hover:text-emerald-800/60'
                    }`}
                  >
                    {category || 'Uncategorized'}
                    {selectedCategory === category && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                    )}
                  </button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="h-1.5" />
            </ScrollArea>
          </div>
        )}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} data={course} />
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
              <Link href={getNavigationLinkHref(content.cta)}>
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
