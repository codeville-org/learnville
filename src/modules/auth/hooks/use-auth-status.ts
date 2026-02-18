'use client'

import { useEffect, useState } from 'react'
import { getAuthStatusAction } from '../actions/get-auth-status.action'

/**
 * Client-side hook that checks auth status via a lightweight API call.
 * The payload-token cookie is httpOnly (not accessible via document.cookie),
 * so we hit a server endpoint that can read it from the request.
 */
export function useAuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [role, setRole] = useState<'user' | 'customer' | null>(null)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    setIsLoading(true)

    const { authenticated, payload } = await getAuthStatusAction()

    setIsAuthenticated(authenticated)

    if (payload) setRole(payload?.collection === 'customers' ? 'customer' : 'user')

    setIsLoading(false)
  }

  return { isAuthenticated, role, isLoading }
}
