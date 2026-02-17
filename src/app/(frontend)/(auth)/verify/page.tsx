import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { redirect } from 'next/navigation'

interface SearchParams {
  [key: string]: string
}

type Props = {
  searchParams: Promise<SearchParams>
}

export default async function VerifyPage({ searchParams }: Props) {
  const { token } = await searchParams

  const payload = await getPayload({ config })

  if (!token) redirect(`/signin?message=${encodeURIComponent('Verification token is missing.')}`)

  const result = await payload.verifyEmail({
    collection: 'customers',
    token,
  })

  if (result)
    redirect(
      `/signin?message=${encodeURIComponent('Email verified successfully. You can now sign in.')}`,
    )

  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-cafe-noir/10 bg-white/60 backdrop-blur-sm p-8">
      <h1 className="text-xl font-semibold font-heading text-dark-green">There was a problem</h1>
      <p className="text-sm text-cafe-noir/60">Please contact an administrator</p>
    </div>
  )
}
