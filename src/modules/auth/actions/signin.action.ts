'use server'
import { getPayload } from 'payload'
import config from '@payload-config'

import { SigninResponseSchema, SigninSchema } from '../types'
import { cookies } from 'next/headers'

export async function signin({ email, password }: SigninSchema): Promise<SigninResponseSchema> {
  const payload = await getPayload({ config })

  try {
    const result = await payload.login({
      collection: 'customers',
      data: { email, password },
    })

    if (result.token) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      })

      return { success: true }
    } else return { success: false, error: 'Invalid email or password' }
  } catch (error) {
    console.error(`[SIGNIN ACTION ERROR] \n ----- \n ${error} \n -----`)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred during signin',
    }
  }
}
