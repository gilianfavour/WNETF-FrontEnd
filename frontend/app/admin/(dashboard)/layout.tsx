'use client'

// app/admin/(dashboard)/layout.tsx

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, ClipboardList, GraduationCap, HeartHandshake,
  CalendarDays, BookOpen, Users, Handshake, BarChart3,
  LogOut, Menu, ExternalLink, type LucideIcon,
} from 'lucide-react'

function getCookie(name: string) {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
  return null
}

const NAV: { section: string; items: { href: string; label: string; icon: LucideIcon; badge: string | null }[] }[] = [
  {
    section: 'Main',
    items: [
      { href: '/admin',              label: 'Overview',     icon: LayoutDashboard, badge: null },
      { href: '/admin/applications', label: 'Applications', icon: ClipboardList,   badge: null },
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
      { href: '/admin/impact',   label: 'Impact',     icon: BarChart3,    badge: null },
    ],
  },
  {
    section: 'Outreach',
    items: [
      { href: '/admin/volunteers',  label: 'Volunteers',  icon: Users,          badge: null },
      { href: '/admin/subscribers', label: 'Subscribers', icon: BookOpen,       badge: null },
      { href: '/admin/messages',    label: 'Messages',    icon: ClipboardList,  badge: null },
    ],
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [checking, setChecking] = useState(true)
  const [user, setUser] = useState({ name: 'Admin', role: 'Staff', initials: 'AD' })

  useEffect(() => {
    // Check for auth cookie on the client side
    const isLoggedIn = document.cookie
      .split(';')
      .some(c => c.trim() === 'wnetf_admin_auth=true')

    if (!isLoggedIn) {
      router.replace(`/admin/login?from=${pathname}`)
    } else {
      const name = decodeURIComponent(getCookie('wnetf_user_name') || 'Administrator')
      const role = decodeURIComponent(getCookie('wnetf_user_role') || 'Super Admin')
      const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      setUser({ name, role, initials })
      setChecking(false)
    }
  }, [pathname])

  if (checking) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans selection:bg-brand-blue/30 text-slate-900">

      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[280px] bg-brand-navy shadow-2xl
        flex flex-col transition-all duration-300 ease-in-out
        lg:static lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>

        {/* Brand */}
        <div className="px-8 py-10">
          <Link href="/admin" className="flex justify-center transition-transform hover:scale-105">
            <div className="w-44 bg-white rounded-[2rem] p-4 shadow-xl shadow-black/20 flex items-center justify-center">
              <img src="/images/wnetf.png" alt="WNETF" className="w-full h-auto object-contain" />
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-5 py-4 overflow-y-auto space-y-8">
          {NAV.map(group => (
            <div key={group.section}>
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-white/20 px-4 py-2 mb-3">
                {group.section}
              </p>
              <div className="space-y-1.5">
                {group.items.map(item => {
                  const isActive = item.href === '/admin'
                    ? pathname === '/admin'
                    : pathname.startsWith(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`group flex items-center gap-4 px-5 py-3.5 rounded-2xl text-[14px] font-medium transition-all ${
                        isActive
                          ? 'bg-white/15 text-white shadow-xl shadow-black/10'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} className={`${isActive ? 'text-brand-accent' : 'text-white/30 group-hover:text-white/60'} transition-colors`} />
                      <span className="flex-1 tracking-tight">{item.label}</span>
                      {item.badge && (
                        <span className="bg-brand-blue text-white text-[10px] font-black px-2.5 py-1 rounded-lg">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User */}
        <div className="p-6">
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-brand-accent text-brand-navy flex items-center justify-center text-xs font-black flex-shrink-0 shadow-lg shadow-brand-accent/20">
                {user.initials}
              </div>
              <div className="min-w-0">
                <p className="text-white text-xs font-bold truncate">{user.name}</p>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-wider">{user.role}</p>
              </div>
            </div>
            <button
              onClick={() => {
                document.cookie = 'wnetf_admin_auth=; path=/; max-age=0'
                document.cookie = 'wnetf_user_name=; path=/; max-age=0'
                document.cookie = 'wnetf_user_role=; path=/; max-age=0'
                window.location.href = '/admin/login'
              }}
              className="w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-red-400 border border-white/10 hover:border-red-400/30 hover:bg-red-400/5 rounded-xl py-3 transition-all cursor-pointer"
            >
              <LogOut size={13} strokeWidth={3} />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">

        {/* Topbar */}
        <header className="h-28 flex items-center justify-between px-10 sticky top-0 z-10">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-slate-400 hover:text-brand-navy bg-white p-4 rounded-2xl border border-gray-100 shadow-sm"
          >
            <Menu size={22} />
          </button>
          <div className="hidden lg:block">
             <p className="text-slate-400 text-sm font-medium">Administrator Workspace</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-brand-navy border border-gray-200 hover:border-brand-navy/30 px-7 py-3.5 rounded-2xl transition-all bg-white shadow-sm"
            >
              Live Site <ExternalLink size={14} strokeWidth={2.5} />
            </Link>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 overflow-y-auto px-6 lg:px-10 pb-20 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  )
}
