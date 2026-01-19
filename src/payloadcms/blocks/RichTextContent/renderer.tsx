import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { BlockRendererProps, type RichTextContentBlock } from '../types'

import './styles.css'

interface RichTextContentBlockRendererProps extends BlockRendererProps<RichTextContentBlock> {
  className?: string
}

export function RichTextContentBlockRenderer({ data }: RichTextContentBlockRendererProps) {
  const { content } = data

  if (!content) {
    return null
  }

  return (
    <section className="relative w-full bg-white">
      <div className="container px-4 mx-auto py-8">
        <RichText className="richtext-content" data={content as SerializedEditorState} />
      </div>
    </section>
  )
}
