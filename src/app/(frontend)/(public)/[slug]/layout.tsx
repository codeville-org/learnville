import { Footer } from '@/components/global/footer'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function PagesLayout({ children }: Props) {
  return (
    <div>
      {children}

      <Footer />
    </div>
  )
}
