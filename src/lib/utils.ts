import { Media } from '@/payload-types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const highlightColorMap: Record<string, string> = {
  orange: '#f97316',
  emerald: '#10b981',
  teal: '#14b8a6',
  purple: '#a855f7',
  blue: '#3b82f6',
}

export function getCTAHref(cta: any): string {
  if (cta.linkType === 'external' && cta.externalLink) {
    return cta.externalLink
  }
  if (cta.linkType === 'internal' && cta.internalLink) {
    return `/${cta.internalLink.slug}`
  }
  return '#'
}

export function getNavigationLinkHref(link: any): string {
  if (link.type === 'page' && link.page) {
    return `/${link.page.slug}`
  }
  if ((link.type === 'external' || link.type === 'custom') && link.url) {
    return link.url
  }
  return '#'
}

export function fetchMediaImageUrl(media: Media | number): { url: string; alt?: string } {
  if (media instanceof Object) {
    return { url: media?.url || '', alt: media?.alt }
  } else return { url: '', alt: '' }
}
