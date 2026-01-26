import type { BlockRendererProps, FormBlock } from '@/payloadcms/blocks/types'
import React from 'react'

export function FormBlockRenderer({ data }: BlockRendererProps<FormBlock>) {
  return <div>{JSON.stringify(data, null, 2)}</div>
}
