import React from 'react'

import type { BlockRendererProps, LessonContentBlock } from '../types'

export function LessonContentRenderer({ data }: BlockRendererProps<LessonContentBlock>) {
  return (
    <div className="space-y-4">
      {data.contentTitle && (
        <h2 className="text-2xl font-bold text-gray-900">{data.contentTitle}</h2>
      )}

      {data.content && (
        <div className="prose prose-lg max-w-none">
          {/* Rich text content - you'll need to render this with your Lexical rich text renderer */}
          {/* For now, showing JSON - replace with proper rich text renderer */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              Rich text content (implement with Lexical renderer):
            </p>
            <pre className="text-xs overflow-auto">{JSON.stringify(data.content, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
