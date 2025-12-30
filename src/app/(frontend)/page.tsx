import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'
import { Button } from '@/components/ui/button'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="w-full h-screen gap-3 flex items-center justify-center">
      <p className="font-semibold text-3xl">LearnVille</p>

      <Button>Dashboard</Button>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
