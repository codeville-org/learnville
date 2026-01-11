'use client'

import React from 'react'
import { getClientSideURL } from '@/lib/get-url'
import { useRouter } from 'next/navigation'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'

type Props = {}

export function LivePreviewListener({}: Props) {
  const router = useRouter()

  return <PayloadLivePreview refresh={router.refresh} serverURL={getClientSideURL()} />
}
