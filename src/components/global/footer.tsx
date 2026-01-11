import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { headers as getHeaders } from 'next/headers'

import { LivePreviewListener } from '@/components/live-preview-listener'

interface Props {}

async function getFooterData() {
  const headers = await getHeaders()

  const payload = await getPayload({ config })

  const { user } = await payload.auth({ headers })

  const res = await payload.findGlobal({
    slug: 'footer',
    overrideAccess: Boolean(user),
    draft: Boolean(user),
  })

  return { footer: res, user }
}

export async function Footer({}: Props) {
  const res = await getFooterData()
  const footer = res.footer
  const user = res.user

  return (
    <>
      {user && <LivePreviewListener />}
      <footer>
        <pre>{JSON.stringify(footer, null, 2)}</pre>
      </footer>
    </>
  )
}
