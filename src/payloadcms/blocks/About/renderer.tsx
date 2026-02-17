import React from 'react'

import { BlockRendererProps, AboutBlock } from '../types'
import Image from 'next/image'
import { cn, getNavigationLinkHref, highlightColorMap } from '@/lib/utils'
import { TextAnimate } from '@/components/ui/text-animate'
import { Highlighter } from '@/components/ui/highlighter'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRightIcon, BadgeCheckIcon, GraduationCap, Users2Icon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { fetchSiteStats } from '@/lib/actions/fetch-stats'

export async function AboutBlockRenderer({ data }: BlockRendererProps<AboutBlock>) {
  const { layout, content } = data

  const { stats, features } = await fetchSiteStats()

  const highlightColor =
    (content?.highlightColor && highlightColorMap[content.highlightColor]) || '#f97316'

  return (
    <div className="min-h-fit bg-white w-full overflow-hidden relative">
      <div
        className={cn(
          'container mx-auto py-16 md:py-24 px-4 flex items-center justify-center',
          layout === 'image-right' && 'flex-row-reverse',
        )}
      >
        {/* Column 1 */}
        <div className="flex-1 h-full hidden sm:flex sm:flex-1/2 relative items-center justify-center">
          {content.sectionImage && content.sectionImage instanceof Object && (
            <Image
              src={content?.sectionImage?.url || ''}
              width={content?.sectionImage?.width || 500}
              height={content?.sectionImage?.height || 600}
              alt={content?.sectionImage?.alt || 'About Section Image'}
              className="rounded-lg z-20 object-cover w-xs sm:w-sm h-full"
            />
          )}

          {/* Stats */}
          {stats && (
            <div className="">
              {stats.activeLearners && (
                <Card className="absolute z-30 top-[10%] right-11 animate-float-smooth delay-150 p-4 py-6 flex flex-col items-start justify-center shadow-none gap-4 border border-teal-300 bg-linear-to-tr from-teal-100 to-white">
                  <div className="p-2 rounded-xl bg-teal-400/10">
                    <GraduationCap className="size-12 text-teal-500" />
                  </div>

                  <div className="space-y-0">
                    <h1 className="text-4xl text-teal-950">{stats.activeLearners}</h1>
                    <h4 className="text-sm text-teal-950/60">{`Active Learners`}</h4>
                  </div>
                </Card>
              )}
              {stats.expertInstructors && (
                <Card className="absolute z-30 bottom-[5%] left-11 animate-float-smooth delay-500 p-4 py-6 flex flex-col items-start justify-center shadow-none gap-4 border border-teal-200 bg-linear-to-tr from-teal-700 to-teal-400">
                  <div className="p-2 rounded-xl bg-teal-200/10">
                    <Users2Icon className="size-12 text-teal-200" />
                  </div>

                  <div className="space-y-0">
                    <h1 className="text-4xl text-teal-50 font-semibold">
                      {stats.expertInstructors}
                    </h1>
                    <h4 className="text-sm text-teal-50/80">{`Expert Instructors`}</h4>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Background Elements */}
          <div>
            <Image
              src={'/assets/circle_teal.png'}
              alt="_"
              width={600}
              height={600}
              className="size-48 sm:size-56 object-cover absolute -top-[70px] left-11 z-10"
            />
            <Image
              src={'/assets/circle_purple.png'}
              alt="_"
              width={500}
              height={500}
              className="size-48 sm:size-40 object-cover absolute -bottom-[55px] right-16 z-10"
            />
          </div>
        </div>

        <div className="flex-1 h-full sm:flex-1/2 flex flex-col justify-center">
          {/* Content */}
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

            <div className="space-y-2">
              {content?.heading && (
                <TextAnimate
                  as={'h1'}
                  animation="slideRight"
                  className="text-3xl sm:text-4xl font-semibold text-emerald-950 font-heading"
                >
                  {content.heading}
                </TextAnimate>
              )}

              {content?.highlightedText && (
                <h2 className="text-emerald-950 font-black font-heading text-3xl sm:text-4xl whitespace-nowrap">
                  <Highlighter animationDuration={2500} action="underline" color={highlightColor}>
                    {content?.highlightedText}
                  </Highlighter>
                </h2>
              )}
            </div>

            {content?.description && (
              <p className="mt-4 text-emerald-950/60">{content.description}</p>
            )}

            {features && features.length > 0 && (
              <div className="py-8 flex flex-col">
                {features.map((feature, index) => (
                  <div
                    className={cn('flex items-start gap-6 border-b border-emerald-950/20 py-4', {
                      'border-none': index === (features as any)?.length - 1,
                    })}
                    key={feature.id}
                  >
                    <div>
                      <BadgeCheckIcon className="mt-1 size-6 text-emerald-600" />
                    </div>
                    <div className="flex flex-col text-left">
                      <h4 className="text-lg font-medium text-emerald-950">{feature.title}</h4>
                      {feature.description && (
                        <p className="text-emerald-950/70 text-sm">{feature.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="">
              {content?.cta && content?.cta?.enabled && (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
