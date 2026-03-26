'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LogOut, Menu, ExternalLink, X, Bell, ShieldCheck } from 'lucide-react'
import { fetchApi } from '~/lib/api'
import { canAccess, getAllowedPaths } from '~/lib/permissions'

function getCookie(name: string) {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
  return null
}

const NAV_ALL = [
  { section: 'Overview', items: [
    { href: '/admin',              label: 'Dashboard'    },
    { href: '/admin/applications', label: 'Applications' },
    { href: '/admin/students',     label: 'Students'     },
    { href: '/admin/donations',    label: 'Donations'    },
  ]},
  { section: 'Content', items: [
    { href: '/admin/events',   label: 'Events'   },
    { href: '/admin/blog',     label: 'Blog'     },
    { href: '/admin/team',     label: 'Team'     },
    { href: '/admin/partners', label: 'Partners' },
    { href: '/admin/impact',   label: 'Impact'   },
  ]},
  { section: 'Outreach', items: [
    { href: '/admin/volunteers',  label: 'Volunteers'  },
    { href: '/admin/subscribers', label: 'Subscribers' },
    { href: '/admin/messages',    label: 'Messages'    },
  ]},
]

type Notif = { id: string; type: string; title: string; body: string; time: string; read: boolean }

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router   = useRouter()
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [checking,     setChecking]     = useState(true)
  const [notifOpen,    setNotifOpen]    = useState(false)
  const [notifs,       setNotifs]       = useState<Notif[]>([])
  const [user, setUser] = useState({ name: 'Admin', role: 'Staff', initials: 'AD' })
  const notifRef = useRef<HTMLDivElement>(null)
  const isSuperAdmin = user.role === 'Super Admin'

  // ── Auth check ──────────────────────────────────────────────────────────
  useEffect(() => {
    const isLoggedIn = document.cookie.split(';').some(c => c.trim() === 'wnetf_admin_auth=true')
    if (!isLoggedIn) { router.replace(`/admin/login?from=${pathname}`); return }
    const name     = decodeURIComponent(getCookie('wnetf_user_name') || 'Administrator')
    const role     = decodeURIComponent(getCookie('wnetf_user_role') || 'Super Admin')
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    setUser({ name, role, initials })
    setChecking(false)
  }, [pathname])

  // ── Role-based access guard ──────────────────────────────────────────────
  useEffect(() => {
    if (!checking && !canAccess(user.role, pathname)) {
      router.replace('/admin')
    }
  }, [checking, user.role, pathname])

  // ── Notifications polling ────────────────────────────────────────────────
  const fetchNotifs = useCallback(async () => {
    try {
      const SEEN_KEY = 'wnetf_last_seen'
      const seen: Record<string, number> = JSON.parse(localStorage.getItem(SEEN_KEY) || '{}')

      const [apps, msgs, donations] = await Promise.allSettled([
        fetchApi('/applications/'),
        fetchApi('/contact/?admin=true'),
        fetchApi('/donate/'),
      ])

      const newNotifs: Notif[] = []

      if (apps.status === 'fulfilled') {
        const list = apps.value.results || apps.value
        const lastSeen = seen['applications'] || 0
        const fresh = list.filter((a: any) => new Date(a.created_at).getTime() > lastSeen)
        fresh.slice(0, 5).forEach((a: any) => newNotifs.push({
          id: `app-${a.id}`, type: 'application',
          title: 'New Application',
          body: `${a.full_name} applied for a scholarship`,
          time: a.created_at, read: false,
        }))
        if (list.length) seen['applications'] = Math.max(...list.map((a: any) => new Date(a.created_at).getTime()))
      }

      if (msgs.status === 'fulfilled') {
        const list = msgs.value.results || msgs.value
        const unread = list.filter((m: any) => !m.is_read)
        unread.slice(0, 5).forEach((m: any) => newNotifs.push({
          id: `msg-${m.id}`, type: 'message',
          title: 'New Message',
          body: `${m.name}: "${m.subject}"`,
          time: m.created_at, read: false,
        }))
      }

      if (donations.status === 'fulfilled') {
        const list = donations.value.results || donations.value
        const lastSeen = seen['donations'] || 0
        const fresh = list.filter((d: any) => new Date(d.created_at).getTime() > lastSeen)
        fresh.slice(0, 3).forEach((d: any) => newNotifs.push({
          id: `don-${d.id}`, type: 'donation',
          title: 'New Donation',
          body: `${d.first_name} ${d.last_name} donated UGX ${Number(d.amount).toLocaleString()}`,
          time: d.created_at, read: false,
        }))
        if (list.length) seen['donations'] = Math.max(...list.map((d: any) => new Date(d.created_at).getTime()))
      }

      localStorage.setItem(SEEN_KEY, JSON.stringify(seen))
      // Merge with existing read state
      setNotifs(prev => {
        const readIds = new Set(prev.filter(n => n.read).map(n => n.id))
        return newNotifs.map(n => ({ ...n, read: readIds.has(n.id) }))
          .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
          .slice(0, 20)
      })
    } catch (e) { /* silent */ }
  }, [])

  useEffect(() => {
    if (!checking) {
      fetchNotifs()
      const interval = setInterval(fetchNotifs, 30_000)
      return () => clearInterval(interval)
    }
  }, [checking, fetchNotifs])

  // Close notif dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function markAllRead() {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  }

  function logout() {
    document.cookie = 'wnetf_admin_auth=; path=/; max-age=0'
    document.cookie = 'wnetf_user_name=; path=/; max-age=0'
    document.cookie = 'wnetf_user_role=; path=/; max-age=0'
    window.location.href = '/admin/login'
  }

  const allowedSections = getAllowedPaths(user.role)
  const unreadCount = notifs.filter(n => !n.read).length

  const filteredNav = NAV_ALL.map(group => ({
    ...group,
    items: group.items.filter(item =>
      item.href === '/admin' || isSuperAdmin || allowedSections.includes(item.href)
    )
  })).filter(group => group.items.length > 0)

  const currentLabel = pathname === '/admin'
    ? 'Dashboard'
    : pathname.split('/').filter(Boolean).slice(1).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' / ')

  if (checking) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center">
        <div className="w-7 h-7 border-[3px] border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const SidebarContent = () => (
    <div className="w-[240px] bg-brand-navy flex flex-col h-full">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0 p-1 shadow-sm">
            <img src="/images/wnetf.png" alt="WNETF" className="w-full h-auto object-contain" />
          </div>
          <div>
            <p className="text-white text-sm font-bold leading-none">WNETF</p>
            <p className="text-white/40 text-xs mt-0.5">Admin Portal</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
        {filteredNav.map(group => (
          <div key={group.section}>
            <p className="text-xs font-semibold text-white/50 px-3 mb-1.5 uppercase tracking-wider">
              {group.section}
            </p>
            <div className="space-y-0.5">
              {group.items.map(item => {
                const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive ? 'bg-brand-blue text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}

        {/* Super Admin only: Users & Roles */}
        {isSuperAdmin && (
          <div>
            <p className="text-xs font-semibold text-white/50 px-3 mb-1.5 uppercase tracking-wider">Admin</p>
            <div className="space-y-0.5">
              {[
                { href: '/admin/users', label: 'User Accounts' },
                { href: '/admin/roles', label: 'Role Permissions' },
              ].map(item => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive ? 'bg-brand-blue text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <ShieldCheck size={13} className="flex-shrink-0 opacity-70" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-brand-accent flex items-center justify-center text-brand-navy text-xs font-bold flex-shrink-0">
            {user.initials}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold truncate">{user.name}</p>
            <p className="text-white/60 text-xs truncate">{user.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 text-sm text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-lg py-2.5 transition-all cursor-pointer"
        >
          <LogOut size={14} /> Sign out
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-brand-light flex font-sans text-brand-navy" style={{ fontSize: '15px' }}>
      {mobileOpen && <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />}

      <div className={`fixed inset-y-0 left-0 z-50 lg:hidden transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
        <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-[-40px] w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white">
          <X size={15} />
        </button>
      </div>

      <div className="hidden lg:flex h-screen sticky top-0 flex-shrink-0">
        <SidebarContent />
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen">
        {/* Topbar */}
        <header className="h-14 flex items-center justify-between px-7 bg-white border-b border-slate-200 flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden w-8 h-8 border border-slate-200 rounded-lg flex items-center justify-center text-slate-500">
              <Menu size={16} />
            </button>
            <div className="hidden lg:flex items-center gap-2 text-sm">
              <span className="text-slate-400">WNETF</span>
              <span className="text-slate-300">/</span>
              <span className="text-brand-navy font-semibold">{currentLabel}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notification bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen(v => !v)}
                className="relative w-9 h-9 border border-slate-200 rounded-lg flex items-center justify-center text-slate-500 hover:text-brand-navy hover:border-brand-navy/30 transition-colors"
              >
                <Bell size={16} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-11 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-semibold text-brand-navy">Notifications</p>
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-xs text-brand-blue hover:text-brand-navy font-medium transition-colors">
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                    {notifs.length === 0 ? (
                      <div className="py-10 text-center">
                        <Bell size={24} className="text-slate-200 mx-auto mb-2" />
                        <p className="text-sm text-slate-400">No notifications yet</p>
                      </div>
                    ) : notifs.map(n => (
                      <div key={n.id} className={`px-4 py-3 hover:bg-slate-50 transition-colors ${!n.read ? 'bg-blue-50/40' : ''}`}>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className={`text-sm ${!n.read ? 'font-semibold text-brand-navy' : 'font-medium text-slate-700'}`}>{n.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.body}</p>
                          </div>
                          {!n.read && <span className="w-2 h-2 bg-brand-blue rounded-full flex-shrink-0 mt-1" />}
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{timeAgo(n.time)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-brand-navy border border-slate-200 hover:border-brand-blue hover:text-brand-blue px-4 py-2 rounded-lg transition-all bg-white"
            >
              Live Site <ExternalLink size={13} strokeWidth={2} />
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-7">
          {children}
        </main>
      </div>
    </div>
  )
}
