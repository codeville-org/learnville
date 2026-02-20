'use client'

import React from 'react'
import { useQueryStates, parseAsString, parseAsInteger } from 'nuqs'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

interface CategoryOption {
  name: string
  slug: string
}

interface CategoryFilterProps {
  categories: CategoryOption[]
  activeCategory: string | null
}

export function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  const [, setSearchParams] = useQueryStates(
    {
      category: parseAsString,
      page: parseAsInteger.withDefault(1),
    },
    { shallow: false }, // Trigger server-side re-render so the RSC picks up new params
  )

  const handleCategorySelect = async (slug: string) => {
    // Reset page to 1 when changing category
    await setSearchParams({
      category: slug || null,
      page: 1,
    })
  }

  return (
    <div className="px-14 sm:px-12">
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          <CarouselItem className="basis-auto">
            <Button
              onClick={() => handleCategorySelect('')}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                !activeCategory
                  ? 'bg-emerald-950 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              )}
            >
              All Courses
            </Button>
          </CarouselItem>

          {categories.map((category) => (
            <CarouselItem className="basis-auto" key={category.slug}>
              <Button
                key={category.slug}
                onClick={() => handleCategorySelect(category.slug)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  activeCategory === category.slug
                    ? 'bg-emerald-950 text-white hover:bg-emerald-900 hover:text-emerald-100'
                    : 'bg-emerald-950/5 text-gray-700 hover:bg-emerald-950/10',
                )}
              >
                {category.name}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
