import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="w-full h-screen gap-3 flex flex-col items-center justify-center">
      <p className="font-bold text-4xl font-heading">LearnVille</p>

      {!user ? (
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/signin">Login</Link>
          </Button>
          <Button asChild variant={'outline'}>
            <Link href={`/signup`}>Signup</Link>
          </Button>
        </div>
      ) : user.collection === 'users' ? (
        <Button asChild>
          <Link href="/admin">Go to Payload Dashboard</Link>
        </Button>
      ) : (
        <div className="text-center space-y-2">
          <p>Hello, {user?.firstName || user.email} !</p>
          <Button variant={'destructive'}>Logout</Button>
        </div>
      )}
    </div>
  )
}
