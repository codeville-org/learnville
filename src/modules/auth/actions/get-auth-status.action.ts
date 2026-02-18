'use server'

import { cookies } from 'next/headers'

interface AuthStatusResponse {
  authenticated: boolean
  payload: Record<string, any> | null
}

function decodePayloadToken(token: string) {
  try {
    // JWT structure: header.payload.signature
    const base64Payload = token.split('.')[1]

    // Fix base64url encoding
    const base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/')

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    )

    return JSON.parse(jsonPayload)
  } catch (e) {
    console.error('Failed to decode token:', e)
    return null
  }
}

export async function getAuthStatusAction(): Promise<AuthStatusResponse> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-token')

    const tokenValue = token ? token.value : null

    const payload = tokenValue ? decodePayloadToken(tokenValue) : null

    return { authenticated: Boolean(token), payload }
  } catch (error) {
    console.error('Error during get user session:', error)
    return { authenticated: false, payload: null }
  }
}
