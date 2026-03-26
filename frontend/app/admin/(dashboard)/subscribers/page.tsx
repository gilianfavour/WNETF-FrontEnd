'use client'

// app/admin/(dashboard)/subscribers/page.tsx

import { useState, useEffect } from 'react'
import { Trash2, Mail, Download } from 'lucide-react'
import { fetchApi } from '~/lib/api'
import { Badge, TableCard, Table, TRow, TCell, TCellPrimary, PageHeader } from '~/admin/ui'

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    try {
      const data = await fetchApi('/subscribe/?admin=true')
      setSubscribers(data.results || data)
    } catch (err) {
      console.error('Failed to load subscribers:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Remove this subscriber?')) return
    try {
      await fetchApi(`/subscribe/${id}/?admin=true`, { method: 'DELETE' })
      loadData()
    } catch (err: any) {
      alert(`Delete Failed: ${err.message}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      <PageHeader
        title="Email Subscribers"
        subtitle="Manage newsletter and update subscriptions"
        action={
            <button className="flex items-center gap-2 bg-brand-navy hover:bg-brand-blue text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                <Download size={14} /> Export CSV
            </button>
        }
      />

      <TableCard title="Subscriber List">
        <Table headers={['Email Address', 'Date Joined', 'Status', 'Actions']}>
          {subscribers.map(s => (
            <TRow key={s.id}>
              <TCellPrimary primary={s.email} />
              <TCell className="text-slate-500 font-medium">{new Date(s.created_at).toLocaleDateString()}</TCell>
              <TCell>
                <Badge status={s.is_active ? 'active' : 'suspended'} />
              </TCell>
              <TCell>
                <div className="flex items-center gap-2 justify-end">
                   <button 
                    onClick={() => handleDelete(s.id)}
                    className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </TCell>
            </TRow>
          ))}
          {subscribers.length === 0 && (
             <TRow>
               <td colSpan={4} className="px-8 py-20 text-center text-slate-400 italic font-medium">No subscribers found.</td>
             </TRow>
          )}
        </Table>
      </TableCard>
    </div>
  )
}
