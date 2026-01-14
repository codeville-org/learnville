import React from 'react'
import Image from 'next/image'
import { ArrowRightIcon } from 'lucide-react'

import { BlockRendererProps, TopCategoriesBlock } from '../types'
import { Highlighter } from '@/components/ui/highlighter'
import { getCTAHref, highlightColorMap } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { TextAnimate } from '@/components/ui/text-animate'
import { Card } from '@/components/ui/card'

export function TopCategoriesBlockRenderer({ data }: BlockRendererProps<TopCategoriesBlock>) {
  const { content, topCategories } = data

  const highlightColor =
    (content?.highlightColor && highlightColorMap[content.highlightColor]) || '#f97316'

  return (
    <div className="w-full overflow-hidden min-h-[400px] relative bg-emerald-50">
      <div className="container mx-auto px-4">
        <div className="py-16 md:py-16">
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
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-4 gap-4">
            {topCategories &&
              topCategories.length > 0 &&
              topCategories.map((category) => (
                <Link key={category.id} href={`/categories/${category.slug}`}>
                  <Card className="p-4 group cursor-pointer shadow-none flex flex-row items-center gap-2 bg-linear-to-t from-emerald-50/30 to-white hover:shadow-sm">
                    {category.icon && category.icon.url && (
                      <Image
                        alt={category.icon.alt || category.name}
                        src={category.icon.url}
                        className="size-11 object-cover"
                        width={96}
                        height={96}
                      />
                    )}

                    <div className="space-y-0">
                      <h3 className="text-lg group-hover:underline font-medium text-emerald-950">
                        {category.name}
                      </h3>
                      <p className="text-xs text-emerald-950/60 line-clamp-1">
                        {category.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
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
