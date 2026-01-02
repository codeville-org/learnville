import { ResetPasswordForm } from '@/modules/auth/components/reset-password.form'
import React from 'react'

interface SearchParams {
  [key: string]: string | undefined
}

type Props = {
  searchParams: Promise<SearchParams>
}

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token } = await searchParams

  return <ResetPasswordForm token={token} />
}
