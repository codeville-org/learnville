'use client'

import { useEffect, useState } from 'react'

/**
 * Client-side hook that checks for the presence of the `payload-token` cookie
 * to determine if the user is authenticated. This avoids server-side `headers()`
 * calls that would force dynamic rendering.
 *
 * Note: This only checks cookie presence, not validity. The middleware and
 * Payload's auth system handle actual token validation.
 */
export function useAuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const hasToken = document.cookie.split(';').some((c) => c.trim().startsWith('payload-token='))
    setIsAuthenticated(hasToken)
    setIsLoading(false)
  }, [])

  return { isAuthenticated, isLoading }
}
