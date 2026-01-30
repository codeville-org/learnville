import React from 'react'
import { headers as getHeaders } from 'next/headers'
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

async function getGlobalsData() {
  try {
    const headers = await getHeaders()

    const payload = await getPayload({ config })

    const { user } = await payload.auth({ headers })

    const footerRes = await payload.findGlobal({
      slug: 'footer',
      overrideAccess: Boolean(user),
      draft: Boolean(user),
    })

    const headerRes = await payload.findGlobal({
      slug: 'header',
      overrideAccess: Boolean(user),
      draft: Boolean(user),
    })

    return { footer: footerRes as FooterType, header: headerRes as HeaderType, user }
  } catch (error) {
    return { footer: null, header: null, user: null }
  }
}

export default async function PagesLayout({ children }: Props) {
  const { footer, header, user } = await getGlobalsData()

  return (
    <div>
      <Toaster position="top-center" />

      {user && <LivePreviewListener />}

      {header && <Header data={header} user={user} />}

      {children}

      {footer && <Footer data={footer} />}
    </div>
  )
}
