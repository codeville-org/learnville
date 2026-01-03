import SigninForm from '@/modules/auth/components/signin.form'
import React from 'react'

interface SearchParams {
  [key: string]: string | undefined
}

type Props = {
  searchParams: Promise<SearchParams>
}

export default async function SigninPage({ searchParams }: Props) {
  const { message } = await searchParams

  return <SigninForm message={message} />
}
