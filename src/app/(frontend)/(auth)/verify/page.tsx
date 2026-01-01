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
    <div className="flex flex-col items-center justify-center">
      <h1>There was a problem</h1>
      <p>Please contact an administrator</p>
    </div>
  )
}
