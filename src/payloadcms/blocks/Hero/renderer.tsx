'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Book,
  Users,
  Award,
  Star,
  GraduationCap,
  Target,
  ArrowRight,
  ArrowRightIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { BlockRendererProps, HeroBlock } from '../types'
import { GridPattern } from '@/components/ui/grid-pattern'
import { TextAnimate } from '@/components/ui/text-animate'
import { Highlighter } from '@/components/ui/highlighter'
import { cn, getCTAHref, highlightColorMap } from '@/lib/utils'

const iconMap = {
  none: null,
  book: Book,
  users: Users,
  award: Award,
  star: Star,
  graduation: GraduationCap,
  target: Target,
}

export function HeroBlockRenderer({ data }: BlockRendererProps<HeroBlock>) {
  const { content, image, statistics } = data

  const imageData = typeof image?.media === 'object' ? image.media : null
  const highlightColor =
    (content?.highlightColor && highlightColorMap[content.highlightColor]) || '#f97316'

  return (
    <div className="w-full overflow-hidden min-h-[600px]  bg-linear-to-b from-emerald-200/10 to-orange-200/20 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-0 items-center min-h-[600px]">
          {/* Left Content Area - 2 columns */}
          <div className="col-span-1 lg:col-span-1 pt-12 sm:pt-0 z-30 h-full flex flex-col items-center sm:items-start justify-center">
            <div className="space-y-4 text-center sm:text-left">
              <TextAnimate
                animation="blurIn"
                as="h2"
                className="text-emerald-950 font-medium font-heading text-4xl sm:text-6xl"
              >
                {`${content?.preHeading}`}
              </TextAnimate>
              <TextAnimate
                animation="blurIn"
                as="h2"
                className="text-emerald-950 font-medium font-heading text-4xl sm:text-6xl"
              >
                {`${content?.heading}`}
              </TextAnimate>
              <h2 className="text-white font-black font-heading text-4xl sm:text-[55px] whitespace-nowrap">
                <Highlighter animationDuration={2500} action="highlight" color={highlightColor}>
                  {content?.highlightedText}
                </Highlighter>
              </h2>
            </div>

            <div className="mt-6 pr-0 sm:pr-10">
              <TextAnimate
                as={'p'}
                animation="blurInUp"
                className="text-gray-500 text-sm sm:text-base text-center sm:text-left"
              >
                {content.description}
              </TextAnimate>
            </div>

            <div className="mt-9">
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
            </div>
          </div>

          {/* Right Image Area - 3 columns */}
          <div className="col-span-1 lg:col-span-1 relative min-h-full flex items-end justify-center">
            <div className="relative z-40 sm:z-20 h-[380px] w-[350px] md:h-[580px] md:w-[450px]">
              <Image
                src={imageData?.url || ''}
                alt={imageData?.alt || 'Hero Image'}
                fill
                priority
                className="object-contain"
              />
            </div>

            {statistics &&
              statistics.enabled &&
              statistics.stats?.map((stat, index) => {
                const Icon = iconMap[stat.icon as keyof typeof iconMap]
                const positions = [
                  'top-11 left-3 md:top-18 md:-left-4',
                  'top-38 right-1 z-40 md:top-46 md:right-1',
                  'bottom-8 -left-1 z-40 md:bottom-36 md:-left-20',
                  'bottom-8 right-2 md:bottom-16 md:right-2',
                ]
                const delays = ['0s', '0.2s', '0.4s', '0.6s']

                return (
                  <div
                    key={index}
                    className={`absolute z-30 ${positions[index]} animate-float delay-[${delays[index]}]`}
                  >
                    <div
                      className={cn(
                        `rounded-xl p-2 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-fit sm:min-w-[180px]`,
                        'bg-linear-to-t from-white to-white/40 backdrop-blur-md ring-1 ring-emerald-400  shadow-2xl shadow-emerald-200',
                        {
                          'ring-2 ring-orange-500 bg-linear-to-t from-orange-100 to-orange-100/40 shadow-2xl shadow-orange-300':
                            stat.highlighted,
                        },
                      )}
                    >
                      {Icon && (
                        <div
                          className={`p-2 rounded-lg ${
                            stat.highlighted ? 'bg-orange-500' : 'bg-emerald-600'
                          }`}
                        >
                          <Icon
                            className={`h-6 w-6 ${
                              stat.highlighted ? 'text-orange-200' : 'text-emerald-100'
                            }`}
                          />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span
                          className={cn(
                            'text-base sm:text-2xl font-heading font-bold',
                            'text-emerald-600',
                            {
                              'text-orange-500': stat.highlighted,
                            },
                          )}
                        >
                          {stat.value}
                        </span>
                        <span
                          className={cn('text-[10px] sm:text-sm', 'text-emerald-950/70', {
                            'text-orange-950/90': stat.highlighted,
                          })}
                        >
                          {stat.label}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}

            <div className="absolute z-10 bottom-0 size-[115%] sm:size-[110%] translate-x-4 sm:-translate-x-4 translate-y-20 sm:translate-y-24">
              <Image
                src={'/assets/gradient_effect.png'}
                alt={'Gradient Blob'}
                fill
                priority
                className="object-contain opacity-80"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Elements */}
      <div className="">
        <Image
          alt="element1"
          src={'/assets/circle_teal.png'}
          className="absolute z-10 top-10 -right-25 size-48 object-cover"
          width={300}
          height={300}
        />
        <Image
          alt="element1"
          src={'/assets/circle_purple.png'}
          className="absolute z-10 bottom-52 sm:bottom-10 -left-25 size-48 sm:size-52 object-cover"
          width={300}
          height={300}
        />
        <Image
          alt="element1"
          src={'/assets/strings_vector_1.png'}
          className="absolute z-10 top-6 sm:top-10 left-10 sm:left-40 w-12 object-cover animate-float-smooth delay-[0.8s]"
          width={300}
          height={300}
        />
        <Image
          alt="element1"
          src={'/assets/strings_vector_2.png'}
          className="absolute z-10 bottom-3/5 sm:bottom-15 left-4/5 sm:left-110 w-12 object-cover animate-float-smooth delay-[0.6s]"
          width={300}
          height={300}
        />
      </div>

      <GridPattern className="opacity-20" />
    </div>
  )
}
