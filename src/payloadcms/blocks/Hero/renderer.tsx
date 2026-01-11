import React from 'react'

import { Page } from '@/payload-types'

type Props = {
  data: any
}

export function HeroBlockRenderer({ data }: Props) {
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
