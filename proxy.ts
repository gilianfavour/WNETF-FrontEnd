import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin routes
  if (!pathname.startsWith('/admin')) return NextResponse.next()

  // Allow the login page through — otherwise we'd get an infinite redirect
  if (pathname.startsWith('/admin/login')) return NextResponse.next()

  // Check for auth cookie
  const isLoggedIn = request.cookies.get('wnetf_admin_auth')?.value === 'true'

  if (!isLoggedIn) {
    const loginUrl = new URL('/admin/login', request.url)
    // Pass the original URL so we can redirect back after login
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}