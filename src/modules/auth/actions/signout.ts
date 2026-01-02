'use server'

import { cookies } from 'next/headers'
import { type LogoutResponseSchema } from '../types'

export async function logout(): Promise<LogoutResponseSchema> {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('payload-token')

    return { success: true }
  } catch (error) {
    console.error('Error during sign out:', error)
    return { success: false, error: 'Sign out failed. Please try again.' }
  }
}
