import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define your route patterns
const AUTH_ROUTES = ['/signin', '/signup', '/forgot-password', '/verify', '/reset-password']
const AUTHENTICATED_ROUTES = ['/portal']
const AUTHENTICATED_REDIRECT = '/portal'
const UNAUTHENTICATED_REDIRECT = '/signin'
const ACCESS_DENIED_REDIRECT = '/access-denied'
const PAYLOAD_ADMIN_ROUTE = '/admin'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get authentication token from cookies
  const token = request.cookies.get('payload-token')?.value
  const isAuthenticated = !!token

  // === Payload Admin Protection ===
  if (pathname.startsWith(PAYLOAD_ADMIN_ROUTE)) {
    // Let Payload CMS handle its own authentication
    // Optionally add additional checks here
    return NextResponse.next()
  }

  // === Auth Routes ===
  if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(AUTHENTICATED_REDIRECT, request.url))
    }

    return NextResponse.next()
  }

  // === Protected Routes ===
  if (AUTHENTICATED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const redirectUrl = new URL(UNAUTHENTICATED_REDIRECT, request.url)
      redirectUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Check user status
    try {
      const response = await fetch(`${request.nextUrl.origin}/api/customers/me`, {
        headers: request.headers,
      })

      if (!response.ok) throw new Error('Failed to fetch user data')

      const data = await response.json()

      if (!data?.user) throw new Error('User not found')
    } catch (error) {
      const redirectUrl = new URL(ACCESS_DENIED_REDIRECT, request.url)
      return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - admin routes (Payload CMS)
     */
    '/((?!_next/static|_next/image|favicon.ico|admin|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
