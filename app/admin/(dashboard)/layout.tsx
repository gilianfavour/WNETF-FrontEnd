'use client'

// app/admin/(dashboard)/layout.tsx

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, ClipboardList, GraduationCap, HeartHandshake,
  CalendarDays, BookOpen, Users, Handshake,
  LogOut, Menu, ExternalLink, type LucideIcon,
} from 'lucide-react'
import { CURRENT_USER } from '~/lib/staticData'

const NAV: { section: string; items: { href: string; label: string; icon: LucideIcon; badge: string | null }[] }[] = [
  {
    section: 'Main',
    items: [
      { href: '/admin',              label: 'Overview',     icon: LayoutDashboard, badge: null },
      { href: '/admin/applications', label: 'Applications', icon: ClipboardList,   badge: '8'  },
      { href: '/admin/students',     label: 'Students',     icon: GraduationCap,   badge: null },
      { href: '/admin/donations',    label: 'Donations',    icon: HeartHandshake,  badge: null },
    ],
  },
  {
    section: 'Content',
    items: [
      { href: '/admin/events',   label: 'Events',     icon: CalendarDays, badge: null },
      { href: '/admin/blog',     label: 'Blog Posts', icon: BookOpen,     badge: null },
      { href: '/admin/team',     label: 'Team',       icon: Users,        badge: null },
      { href: '/admin/partners', label: 'Partners',   icon: Handshake,    badge: null },
    ],
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Check for auth cookie on the client side
    const isLoggedIn = document.cookie
      .split(';')
      .some(c => c.trim() === 'wnetf_admin_auth=true')

    if (!isLoggedIn) {
      router.replace(`/admin/login?from=${pathname}`)
    } else {
      setChecking(false)
    }
  }, [pathname])

  // Show nothing while checking — prevents flash of dashboard
  if (checking) {
    return (
      <div className="min-h-screen bg-[#080d14] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#16a05a] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#080d14] flex font-sans">

      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[230px] bg-[#0f1623] border-r border-white/[0.07]
        flex flex-col transition-transform duration-200
        lg:static lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>

        {/* Brand */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/[0.07]">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #16a05a, #0d7a42)', boxShadow: '0 0 12px rgba(22,160,90,0.35)' }}
          >
            W
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-tight">WNETF</p>
            <p className="text-gray-500 text-[11px]">Admin Dashboard</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 overflow-y-auto">
          {NAV.map(group => (
            <div key={group.section} className="mb-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-600 px-3 py-2">
                {group.section}
              </p>
              {group.items.map(item => {
                const isActive = item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-0.5 ${
                      isActive
                        ? 'bg-[#16a05a]/15 text-[#16a05a] border border-[#16a05a]/20'
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <item.icon size={16} strokeWidth={1.75} className="flex-shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="bg-[#16a05a] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-white/[0.07]">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#16a05a]/20 border border-[#16a05a]/30 flex items-center justify-center text-[#16a05a] text-xs font-bold flex-shrink-0">
              {CURRENT_USER.initials}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">{CURRENT_USER.name}</p>
              <p className="text-gray-500 text-[11px]">{CURRENT_USER.role}</p>
            </div>
          </div>
          <button
            onClick={() => {
              document.cookie = 'wnetf_admin_auth=; path=/; max-age=0'
              window.location.href = '/admin/login'
            }}
            className="w-full flex items-center gap-2 text-xs text-gray-400 hover:text-red-400 border border-white/[0.07] hover:border-red-400/30 hover:bg-red-400/5 rounded-lg px-3 py-2 transition-all text-left cursor-pointer"
          >
            <LogOut size={13} strokeWidth={2} />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="h-14 bg-[#0f1623] border-b border-white/[0.07] flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <Menu size={20} />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white border border-white/[0.07] hover:border-white/20 px-3 py-1.5 rounded-lg transition-all"
            >
              View site <ExternalLink size={11} />
            </Link>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}