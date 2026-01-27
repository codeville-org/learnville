import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  width?: number | null
  fieldWidth?: '100' | '75' | '66' | '50' | '33' | '25' | null
  hidden?: boolean | null
  className?: string
}

// Gap size in pixels (matches gap-4 = 1rem = 16px)
const GAP_SIZE = 16

/**
 * Calculate the effective width percentage from width or fieldWidth props
 */
export function getEffectiveWidth(width?: number | null, fieldWidth?: string | null): number {
  if (width) return width
  if (fieldWidth) return parseInt(fieldWidth, 10)
  return 50 // Default to 50% for inline fields
}

/**
 * Check if a field should take full width
 */
export function isFullWidth(width?: number | null, fieldWidth?: string | null): boolean {
  const effectiveWidth = getEffectiveWidth(width, fieldWidth)
  return effectiveWidth >= 100
}

/**
 * Wrapper component to apply width styling to form fields
 * Supports both numeric width (from standard fields) and fieldWidth (from phone field)
 * Fields without width default to 50% and render inline
 * Only 100% width fields take the full row
 */
export function FieldWrapper({ children, width, fieldWidth, hidden, className }: Props) {
  const effectiveWidth = getEffectiveWidth(width, fieldWidth)
  const fullWidth = effectiveWidth >= 100

  if (hidden) {
    return <div className="sr-only">{children}</div>
  }

  // Full width fields take 100%
  if (fullWidth) {
    return <div className={cn('w-full', className)}>{children}</div>
  }

  // Partial width fields: calculate width accounting for gap
  // Use calc() to subtract half the gap from each side
  const calcWidth = `calc(${effectiveWidth}% - ${GAP_SIZE / 2}px)`

  return (
    <div
      className={cn('flex-shrink-0 flex-grow-0', className)}
      style={{ flexBasis: calcWidth, maxWidth: calcWidth }}
    >
      {children}
    </div>
  )
}
