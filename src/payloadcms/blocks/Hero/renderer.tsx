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

const iconMap = {
  none: null,
  book: Book,
  users: Users,
  award: Award,
  star: Star,
  graduation: GraduationCap,
  target: Target,
}

const highlightColorMap: Record<string, string> = {
  orange: '#f97316',
  emerald: '#10b981',
  teal: '#14b8a6',
  purple: '#a855f7',
  blue: '#3b82f6',
}

function getCTAHref(cta: any): string {
  if (cta.linkType === 'external' && cta.externalLink) {
    return cta.externalLink
  }
  if (cta.linkType === 'internal' && cta.internalLink) {
    return `/${cta.internalLink.slug}`
  }
  return '#'
}

export function HeroBlockRenderer({ data }: BlockRendererProps<HeroBlock>) {
  const { content, image, statistics } = data

  const imageData = typeof image?.media === 'object' ? image.media : null
  const highlightColor =
    (content?.highlightColor && highlightColorMap[content.highlightColor]) || '#f97316'

  return (
    <div className="w-full overflow-hidden min-h-[600px] bg-linear-to-b from-emerald-200/10 to-orange-200/20 relative">
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[600px]">
          {/* Left Content Area - 2 columns */}
          <div className="col-span-1 lg:col-span-1 z-30 h-full flex flex-col items-start justify-center">
            <div className="space-y-4">
              <TextAnimate
                animation="blurIn"
                as="h2"
                className="text-emerald-950 font-medium font-heading text-6xl"
              >
                {`${content?.preHeading}`}
              </TextAnimate>
              <TextAnimate
                animation="blurIn"
                as="h2"
                className="text-emerald-950 font-medium font-heading text-6xl"
              >
                {`${content?.heading}`}
              </TextAnimate>
              <h2 className="text-white font-black font-heading text-[55px] whitespace-nowrap">
                <Highlighter animationDuration={2500} action="highlight" color={highlightColor}>
                  {content?.highlightedText}
                </Highlighter>
              </h2>
            </div>

            <div className="mt-6 pr-10">
              <TextAnimate as={'p'} animation="blurInUp" className="text-gray-500 text-base">
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
            <div className="relative z-20 h-[480px] w-[350px] md:h-[580px] md:w-[450px]">
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
                  'top-8 -left-3 md:top-12 md:-left-4',
                  'top-46 right-1 md:top-46 md:right-1',
                  'bottom-28 -left-12 md:bottom-36 md:-left-20',
                  'bottom-8 right-2 md:bottom-16 md:right-2',
                ]
                const delays = ['0s', '0.2s', '0.4s', '0.6s']

                return (
                  <div
                    key={index}
                    className={`absolute z-30 ${positions[index]} hidden lg:block`}
                    style={{
                      animation: `float 3s ease-in-out infinite`,
                      animationDelay: delays[index],
                    }}
                  >
                    <div
                      className={`bg-white rounded-xl shadow-lg p-4 flex items-center gap-3 min-w-[180px] ${
                        stat.highlighted ? 'ring-2 ring-emerald-500' : ''
                      }`}
                    >
                      {Icon && (
                        <div
                          className={`p-2 rounded-lg ${
                            stat.highlighted ? 'bg-emerald-100' : 'bg-gray-100'
                          }`}
                        >
                          <Icon
                            className={`h-6 w-6 ${
                              stat.highlighted ? 'text-emerald-600' : 'text-gray-600'
                            }`}
                          />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                        <span className="text-sm text-gray-500">{stat.label}</span>
                      </div>
                    </div>
                  </div>
                )
              })}

            <div className="absolute z-10 bottom-0 size-[110%] -translate-x-4 translate-y-24">
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
          className="absolute z-10 bottom-10 -left-25 size-52 object-cover"
          width={300}
          height={300}
        />
        <Image
          alt="element1"
          src={'/assets/strings_vector_1.png'}
          className="absolute z-10 top-10 left-40 w-12 object-cover"
          width={300}
          height={300}
        />
        <Image
          alt="element1"
          src={'/assets/strings_vector_2.png'}
          className="absolute z-10 bottom-15 left-110 w-12 object-cover"
          width={300}
          height={300}
        />
      </div>

      <GridPattern className="opacity-20" />
    </div>
  )
}
