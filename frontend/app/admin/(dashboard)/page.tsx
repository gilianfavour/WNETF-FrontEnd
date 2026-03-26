'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight, Clock, ClipboardList, Plus } from 'lucide-react'
import { fetchApi } from '~/lib/api'
import { Badge } from '~/admin/ui'

const QUICK_ACTIONS = [
  { label: 'Student',     href: '/admin/students'  },
  { label: 'Donation',    href: '/admin/donations' },
  { label: 'Blog Post',   href: '/admin/blog'      },
  { label: 'Event',       href: '/admin/events'    },
  { label: 'Team Member', href: '/admin/team'      },
  { label: 'Partner',     href: '/admin/partners'  },
]

function getCookie(name: string) {
  if (typeof document === 'undefined') return ''
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || ''
  return ''
}

export default function AdminOverviewPage() {
  const [stats,        setStats]        = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])
  const [loading,      setLoading]      = useState(true)
  const [firstName,    setFirstName]    = useState('Admin')

  useEffect(() => {
    setFirstName(decodeURIComponent(getCookie('wnetf_user_name') || 'Admin').split(' ')[0])
    async function load() {
      try {
        const [s, a] = await Promise.all([fetchApi('/management/stats/'), fetchApi('/applications/')])
        setStats(s.overview || [])
        setApplications(a.results || a)
      } catch (e) { console.error(e) }
      finally { setLoading(false) }
    }
    load()
  }, [])

  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="max-w-6xl mx-auto space-y-7">

      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-slate-500 text-sm mb-0.5">{greeting}, <span className="font-semibold text-brand-navy">{firstName}</span></p>
          <h1 className="text-2xl font-bold text-brand-navy">Dashboard Overview</h1>
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 shadow-sm">
          <Clock size={14} className="text-brand-blue" />
          <span className="text-sm text-slate-600">
            {now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="bg-white rounded-xl border border-slate-200 h-32 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5 hover:border-brand-blue/40 hover:shadow-md transition-all">
              <p className="text-sm text-slate-500 mb-3">{s.label}</p>
              <p className="text-3xl font-bold text-brand-navy leading-none">{s.value}</p>
              {s.sub && <p className="text-xs text-slate-400 mt-2">{s.sub}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Quick actions */}
      <div>
        <p className="text-sm font-semibold text-slate-500 mb-3">Quick Actions</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_ACTIONS.map(a => (
            <Link
              key={a.label}
              href={a.href}
              className="group bg-white border border-slate-200 hover:border-brand-blue hover:bg-brand-light rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:text-brand-blue transition-all text-center shadow-sm flex items-center justify-center gap-1.5"
            >
              <Plus size={14} className="text-slate-400 group-hover:text-brand-blue transition-colors flex-shrink-0" />
              {a.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-semibold text-brand-navy">Recent Applications</h3>
            <p className="text-sm text-slate-400 mt-0.5">Latest scholarship submissions</p>
          </div>
          <Link href="/admin/applications" className="flex items-center gap-1.5 text-sm font-medium text-brand-blue hover:text-brand-navy transition-colors group">
            View all <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-10 bg-slate-50 rounded-lg animate-pulse" />)}</div>
        ) : applications.length === 0 ? (
          <div className="py-14 text-center">
            <ClipboardList size={28} className="text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400 text-base">No applications yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['Applicant', 'University', 'Course', 'Status', 'Date', ''].map(h => (
                    <th key={h} className="text-left text-sm font-semibold text-slate-600 px-6 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {applications.slice(0, 6).map(app => (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-brand-navy">{app.full_name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{app.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{app.university}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{app.course}</td>
                    <td className="px-6 py-4"><Badge status={app.status} /></td>
                    <td className="px-6 py-4 text-sm text-slate-400">{new Date(app.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/applications/${app.id}`} className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue hover:text-brand-navy bg-brand-light hover:bg-brand-blue/10 px-3 py-1.5 rounded-lg transition-all border border-brand-blue/20">
                        Review <ArrowRight size={11} strokeWidth={2.5} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
