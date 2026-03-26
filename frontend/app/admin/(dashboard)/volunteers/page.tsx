'use client'

// app/admin/(dashboard)/volunteers/page.tsx

import { useState, useEffect } from 'react'
import { Trash2, Mail, Phone, MapPin, Globe } from 'lucide-react'
import { fetchApi } from '~/lib/api'
import { Badge, TableCard, Table, TRow, TCell, TCellPrimary, PageHeader, Modal } from '~/admin/ui'

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    try {
      const data = await fetchApi('/volunteer/?admin=true')
      setVolunteers(data.results || data)
    } catch (err) {
      console.error('Failed to load volunteers:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this volunteer record?')) return
    try {
      await fetchApi(`/volunteer/${id}/?admin=true`, { method: 'DELETE' })
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
        title="Volunteers"
        subtitle="Manage individuals who have offered their time and skills"
      />

      <TableCard title="Volunteer Applications">
        <Table headers={['Volunteer', 'Location', 'Type', 'Date', 'Actions']}>
          {volunteers.map(v => (
            <TRow key={v.id}>
              <TCellPrimary 
                primary={`${v.first_name} ${v.last_name}`} 
                secondary={v.email} 
              />
              <TCell>
                <div className="flex flex-col text-xs text-slate-500">
                    <span className="font-bold text-slate-700">{v.district || 'N/A'}</span>
                    <span>{v.phone}</span>
                </div>
              </TCell>
              <TCell>
                <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border w-fit ${v.is_diaspora ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                    {v.is_diaspora ? 'Diaspora' : 'Local'}
                </div>
              </TCell>
              <TCell className="text-slate-500 font-medium">{new Date(v.created_at).toLocaleDateString()}</TCell>
              <TCell>
                <div className="flex items-center gap-2 justify-end">
                   <button 
                    onClick={() => handleDelete(v.id)}
                    className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </TCell>
            </TRow>
          ))}
          {volunteers.length === 0 && (
             <TRow>
               <td colSpan={5} className="px-8 py-20 text-center text-slate-400 italic font-medium">No volunteer applications found.</td>
             </TRow>
          )}
        </Table>
      </TableCard>
    </div>
  )
}
