'use client'

import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

import type { MessageFieldBlock } from '../../types'
import { cn } from '@/lib/utils'

type Props = MessageFieldBlock & {
  className?: string
}

export function MessageBlock({ message, className }: Props) {
  if (!message) return null

  return (
    <div className={cn(className, 'w-full')}>
      <RichText data={message} className="text-sm text-foreground/80" />
    </div>
  )
}
