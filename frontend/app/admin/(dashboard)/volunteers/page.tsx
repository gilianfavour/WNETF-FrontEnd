'use client'

import { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import { fetchApi } from '~/lib/api'
import { TableCard, Table, TRow, TCell, TCellPrimary, EmptyRow, PageHeader, TypeChip } from '~/admin/ui'

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    try { const data = await fetchApi('/volunteer/?admin=true'); setVolunteers(data.results || data) }
    catch (err) { console.error(err) } finally { setLoading(false) }
  }

  useEffect(() => { loadData() }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this volunteer record?')) return
    try { await fetchApi(`/volunteer/${id}/?admin=true`, { method: 'DELETE' }); loadData() }
    catch (err: any) { alert(`Delete Failed: ${err.message}`) }
  }

  if (loading) return <div className="min-h-[400px] flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-7 max-w-7xl mx-auto">
      <PageHeader title="Volunteers" subtitle="Individuals who have offered their time and skills to WNETF" />

      <TableCard title="Volunteer Applications">
        <Table headers={['Volunteer', 'District', 'Phone', 'Type', 'Date Joined', 'Actions']}>
          {volunteers.map(v => (
            <TRow key={v.id}>
              <TCellPrimary primary={`${v.first_name} ${v.last_name}`} secondary={v.email} />
              <TCell>{v.district || '—'}</TCell>
              <TCell>{v.phone || '—'}</TCell>
              <TCell><TypeChip label={v.is_diaspora ? 'Diaspora' : 'Local'} /></TCell>
              <TCell>{new Date(v.created_at).toLocaleDateString()}</TCell>
              <TCell>
                <div className="flex items-center gap-1 justify-end">
                  <button onClick={() => handleDelete(v.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div>
              </TCell>
            </TRow>
          ))}
          {volunteers.length === 0 && <EmptyRow colSpan={6} message="No volunteer applications yet." />}
        </Table>
      </TableCard>
    </div>
  )
}
