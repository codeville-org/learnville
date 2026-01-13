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
