'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Book, Users, Award, Star, GraduationCap, Target, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { BlockRendererProps, HeroBlock } from '../types'

const iconMap = {
  none: null,
  book: Book,
  users: Users,
  award: Award,
  star: Star,
  graduation: GraduationCap,
  target: Target,
}

const highlightColorMap = {
  orange: 'text-orange-500',
  emerald: 'text-emerald-500',
  teal: 'text-teal-500',
  purple: 'text-purple-500',
  blue: 'text-blue-500',
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
    highlightColorMap[content?.highlightColor as keyof typeof highlightColorMap] ||
    'text-orange-500'

  // Positions for floating stat cards (relative to image container)
  const statPositions = [
    { top: '15%', right: '-10%', animation: 'float-1' },
    { bottom: '30%', left: '-15%', animation: 'float-2' },
    { top: '50%', right: '-8%', animation: 'float-3' },
  ]

  return (
    <div className="">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
