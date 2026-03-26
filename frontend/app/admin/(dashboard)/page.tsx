'use client'

// app/admin/(dashboard)/page.tsx

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { UserPlus, HeartHandshake, BookOpenText, CalendarPlus, ArrowRight, Users, Handshake } from 'lucide-react'
import { fetchApi } from '~/lib/api'
import { StatCard, Badge, TableCard, Table, TRow, TCell, TCellPrimary, ActionLink, PageHeader } from '~/admin/ui'

const QUICK_ACTIONS = [
  { label: 'Add Student',      icon: UserPlus,       href: '/admin/students'  },
  { label: 'Record Donation',  icon: HeartHandshake, href: '/admin/donations' },
  { label: 'New Blog Post',    icon: BookOpenText,   href: '/admin/blog'      },
  { label: 'Add Event',        icon: CalendarPlus,   href: '/admin/events'    },
  { label: 'Add Team Member',  icon: Users,          href: '/admin/team'      },
  { label: 'New Partner',      icon: Handshake,      href: '/admin/partners'  },
]

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, appsData] = await Promise.all([
          fetchApi('/management/stats/'),
          fetchApi('/applications/')
        ])
        setStats(statsData.overview)
        setApplications(appsData.results || appsData) 
      } catch (err) {
        console.error('Failed to load dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-10 max-w-7xl mx-auto">

      {/* Header */}
      <PageHeader 
        title="Dashboard" 
        subtitle="Empowering progress through education." 
      />

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map(s => (
          <StatCard key={s.label} label={s.label} value={s.value} sub={s.sub} color={s.color} />
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {QUICK_ACTIONS.map(a => (
          <Link
            key={a.label}
            href={a.href}
            className="group relative bg-white border border-gray-100 hover:border-brand-blue/30 rounded-[2rem] p-8 transition-all flex flex-col items-center justify-center gap-4 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-gray-200/50"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-light group-hover:bg-brand-blue text-brand-blue group-hover:text-white flex items-center justify-center transition-all shadow-sm">
              <a.icon size={26} strokeWidth={2.5} />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-brand-navy transition-colors">{a.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent applications */}
      <TableCard
        title="Recent Applications"
        action={
          <Link href="/admin/applications" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-blue hover:text-brand-navy transition-colors group">
            View all <ArrowRight size={14} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        }
      >
        <Table headers={['Applicant', 'University', 'Course', 'Status', 'Date', '']}>
          {applications.slice(0, 5).map(app => (
            <TRow key={app.id}>
              <TCellPrimary primary={app.full_name} secondary={app.email} />
              <TCell>{app.university}</TCell>
              <TCell>{app.course}</TCell>
              <TCell><Badge status={app.status} /></TCell>
              <TCell>{new Date(app.created_at).toLocaleDateString()}</TCell>
              <ActionLink href={`/admin/applications/${app.id}`}>Review →</ActionLink>
            </TRow>
          ))}
          {applications.length === 0 && (
             <TRow>
               <td colSpan={6} className="px-5 py-10 text-center text-gray-400 italic font-medium">No recent applications found.</td>
             </TRow>
          )}
        </Table>
      </TableCard>

    </div>
  )
}
