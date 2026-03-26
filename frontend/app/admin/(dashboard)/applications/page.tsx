'use client'

// app/admin/(dashboard)/applications/page.tsx

import { useState, useEffect } from 'react'
import { fetchApi } from '~/lib/api'
import { Badge, TableCard, Table, TRow, TCell, TCellPrimary, ActionLink, PageHeader, Toolbar, SearchInput, FilterBtn } from '~/admin/ui'

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchApi('/applications/')
        setApplications(data.results || data)
      } catch (err) {
        console.error('Failed to load applications:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title="Applications"
        subtitle="Review and manage student scholarship applications"
      />

      <Toolbar>
        <SearchInput placeholder="Search applicants…" />
        <FilterBtn label={`All (${applications.length})`} active />
        <FilterBtn label="Pending" />
        <FilterBtn label="Reviewing" />
        <FilterBtn label="Approved" />
        <FilterBtn label="Rejected" />
      </Toolbar>

      <TableCard title="All Submissions">
        <Table headers={['Applicant', 'University', 'Course', 'Location', 'Status', 'Submitted', '']}>
          {applications.map(app => (
            <TRow key={app.id}>
              <TCellPrimary primary={app.full_name} secondary={`${app.email} · ${app.phone}`} />
              <TCell>{app.university}</TCell>
              <TCell>{app.course}</TCell>
              <TCell>{app.district}</TCell>
              <TCell><Badge status={app.status} /></TCell>
              <TCell>{new Date(app.created_at).toLocaleDateString()}</TCell>
              <ActionLink href={`/admin/applications/${app.id}`}>Review →</ActionLink>
            </TRow>
          ))}
          {applications.length === 0 && (
             <TRow>
               <td colSpan={7} className="px-5 py-10 text-center text-gray-500 italic">No applications found.</td>
             </TRow>
          )}
        </Table>
      </TableCard>
    </div>
  )
}
