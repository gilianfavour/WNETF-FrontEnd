// app/admin/(dashboard)/page.tsx

import Link from 'next/link'
import { UserPlus, HeartHandshake, BookOpenText, CalendarPlus } from 'lucide-react'
import { OVERVIEW_STATS, RECENT_APPLICATIONS } from '~/lib/staticData'
import { StatCard, Badge, TableCard, Table, TRow, TCell, TCellPrimary, ActionLink } from '~/admin/ui'

const QUICK_ACTIONS = [
  { label: 'Add Student',     icon: UserPlus,       href: '/admin/students'  },
  { label: 'Record Donation', icon: HeartHandshake, href: '/admin/donations' },
  { label: 'New Blog Post',   icon: BookOpenText,   href: '/admin/blog'      },
  { label: 'Add Event',       icon: CalendarPlus,   href: '/admin/events'    },
]

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Good morning, Charles</h2>
        <p className="text-sm text-gray-400 mt-1">Here's what's happening at WNETF today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {OVERVIEW_STATS.map(s => (
          <StatCard key={s.label} label={s.label} value={s.value} sub={s.sub} color={s.color} />
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {QUICK_ACTIONS.map(a => (
          <Link
            key={a.label}
            href={a.href}
            className="bg-[#0f1623] border border-white/[0.07] hover:border-[#16a05a]/40 hover:bg-[#16a05a]/[0.07] rounded-2xl p-4 text-center transition-all group flex flex-col items-center"
          >
            <a.icon size={22} strokeWidth={1.5} className="text-gray-400 group-hover:text-[#16a05a] transition-colors mb-2" />
            <p className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">{a.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent applications */}
      <TableCard
        title="Recent Applications"
        action={
          <Link href="/admin/applications" className="text-xs text-[#16a05a] hover:opacity-70 font-medium transition-opacity">
            View all →
          </Link>
        }
      >
        <Table headers={['Applicant', 'University', 'Course', 'Status', 'Date']}>
          {RECENT_APPLICATIONS.map(app => (
            <TRow key={app.id}>
              <TCellPrimary primary={app.full_name} secondary={app.email} />
              <TCell>{app.university}</TCell>
              <TCell>{app.course}</TCell>
              <TCell><Badge status={app.status} /></TCell>
              <TCell>{app.submitted_at}</TCell>
            </TRow>
          ))}
        </Table>
      </TableCard>

    </div>
  )
}