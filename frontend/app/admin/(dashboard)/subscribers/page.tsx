'use client'

import { useState, useEffect } from 'react'
import { Trash2, Download } from 'lucide-react'
import { fetchApi } from '~/lib/api'
import { Badge, TableCard, Table, TRow, TCell, TCellPrimary, EmptyRow, PageHeader, AddButton } from '~/admin/ui'

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    try { const data = await fetchApi('/subscribe/?admin=true'); setSubscribers(data.results || data) }
    catch (err) { console.error(err) } finally { setLoading(false) }
  }

  useEffect(() => { loadData() }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Remove this subscriber?')) return
    try { await fetchApi(`/subscribe/${id}/?admin=true`, { method: 'DELETE' }); loadData() }
    catch (err: any) { alert(`Delete Failed: ${err.message}`) }
  }

  if (loading) return <div className="min-h-[400px] flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-7 max-w-7xl mx-auto">
      <PageHeader
        title="Email Subscribers"
        subtitle="Manage newsletter and update subscriptions"
        action={
          <button className="flex items-center gap-2 bg-brand-navy hover:bg-brand-blue text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all shadow-md">
            <Download size={15} /> Export CSV
          </button>
        }
      />

      <TableCard title={`Subscriber List (${subscribers.length})`}>
        <Table headers={['Email Address', 'Date Joined', 'Status', 'Actions']}>
          {subscribers.map(s => (
            <TRow key={s.id}>
              <TCellPrimary primary={s.email} />
              <TCell>{new Date(s.created_at).toLocaleDateString()}</TCell>
              <TCell><Badge status={s.is_active ? 'active' : 'suspended'} /></TCell>
              <TCell>
                <div className="flex items-center gap-1 justify-end">
                  <button onClick={() => handleDelete(s.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div>
              </TCell>
            </TRow>
          ))}
          {subscribers.length === 0 && <EmptyRow colSpan={4} message="No subscribers found." />}
        </Table>
      </TableCard>
    </div>
  )
}
