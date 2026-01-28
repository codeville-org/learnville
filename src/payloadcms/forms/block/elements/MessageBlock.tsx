'use client'

import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

import type { MessageFieldBlock } from '../../types'

type Props = MessageFieldBlock & {
  className?: string
}

export function MessageBlock({ message, className }: Props) {
  if (!message) return null

  return (
    <div className={className}>
      <RichText data={message} />
    </div>
  )
}
