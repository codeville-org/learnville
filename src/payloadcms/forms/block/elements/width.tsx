import React from 'react'

type Props = {
  children: React.ReactNode
  width?: string | number
}

export function FieldWidth({ children, width }: Props) {
  let calcWidth: string = typeof width === 'number' ? `${width}%` : width || '100%'

  return <div style={{ flexBasis: calcWidth }}>{children}</div>
}
