import React from 'react'
import './styles.css'
import { cn } from '@/lib/utils'
import { fontClass } from '@/lib/fonts'
import { Toaster } from 'sonner'
import { Providers } from '@/components/providers'

import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={cn('', fontClass)}>
      <body>
        <Providers>
          <main>{children}</main>

          <SpeedInsights />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
