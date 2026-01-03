'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ForgotPasswordResponseSchema, ForgotPasswordSchema } from '../types'

export async function forgotPassword({
  email,
}: ForgotPasswordSchema): Promise<ForgotPasswordResponseSchema> {
  const payload = await getPayload({ config: configPromise })

  try {
    await payload.forgotPassword({
      collection: 'customers',
      data: { email },
    })

    return { success: true }
  } catch (error) {
    console.error('Forgot Password Error:', error)
    return { success: false, error: (error as Error)?.message || 'An unknown error occurred' }
  }
}
