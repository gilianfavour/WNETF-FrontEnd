'use client'

// src/components/SiteShell.tsx
// Wraps navbar + footer but hides them on /admin routes

import { usePathname } from 'next/navigation'

export default function SiteShell({ 
  children,
  navbar,
  footer,
}: { 
  children: React.ReactNode
  navbar: React.ReactNode
  footer: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      {navbar}
      {children}
      {footer}
    </>
  )
}