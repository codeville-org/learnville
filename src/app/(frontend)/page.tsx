import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { LogOutIcon } from 'lucide-react'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="w-full h-screen gap-3 flex flex-col items-center justify-center">
      <p className="font-bold text-4xl font-heading">LearnVille</p>
    </div>
  )
}
