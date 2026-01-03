'use server'
import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

import { Customer } from '@/payload-types'

export async function getUser(): Promise<Customer | null> {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  if (user && user.collection === 'customers') {
    return user as Customer
  }

  return null
}
