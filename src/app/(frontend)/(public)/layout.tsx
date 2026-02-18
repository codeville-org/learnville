import React from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

import { Footer } from '@/components/global/footer'
import type { Footer as FooterType, Header as HeaderType } from '@/payload-types'
import { LivePreviewListener } from '@/components/live-preview-listener'
import { Header } from '@/components/global/header'
import { Toaster } from 'sonner'

type Props = {
  children: React.ReactNode
}

async function getGlobalsData(isDraftMode: boolean) {
  try {
    const payload = await getPayload({ config })

    const footerRes = await payload.findGlobal({
      slug: 'footer',
      draft: isDraftMode,
    })

    const headerRes = await payload.findGlobal({
      slug: 'header',
      draft: isDraftMode,
    })

    return { footer: footerRes as FooterType, header: headerRes as HeaderType }
  } catch (error) {
    return { footer: null, header: null }
  }
}

export default async function PagesLayout({ children }: Props) {
  const { isEnabled: isDraftMode } = await draftMode()
  const { footer, header } = await getGlobalsData(isDraftMode)

  return (
    <div>
      <Toaster position="top-center" />

      {isDraftMode && <LivePreviewListener />}

      {header && <Header data={header} />}

      {children}

      {footer && <Footer data={footer} />}
    </div>
  )
}
