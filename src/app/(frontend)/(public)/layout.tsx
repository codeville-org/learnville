import React from 'react'
import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

import { Footer } from '@/components/global/footer'
import type { Footer as FooterType } from '@/payload-types'
import { LivePreviewListener } from '@/components/live-preview-listener'

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

    return { footer: footerRes as FooterType, user }
  } catch (error) {
    return { footer: null }
  }
}

export default async function PagesLayout({ children }: Props) {
  const { footer, user } = await getGlobalsData()

  return (
    <div>
      {user && <LivePreviewListener />}

      {children}

      {footer && <Footer data={footer} />}
    </div>
  )
}
