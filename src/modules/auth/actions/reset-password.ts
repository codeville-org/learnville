'use server'
import { getPayload } from 'payload'
import config from '@payload-config'

import { type ResetPasswordResponseSchema, type ResetPasswordSchema } from '../types'

export async function resetPassword({
  password,
  token,
}: ResetPasswordSchema): Promise<ResetPasswordResponseSchema> {
  const payload = await getPayload({ config })

  try {
    await payload.resetPassword({
      collection: 'customers',
      data: { token, password },
      overrideAccess: true,
    })

    return { success: true }
  } catch (error) {
    console.error('Error resetting password:', error)
    return { success: false, error: 'Failed to reset password. Please try again.' }
  }
}
