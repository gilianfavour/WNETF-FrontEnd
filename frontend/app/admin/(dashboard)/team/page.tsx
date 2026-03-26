'use client'

// app/admin/(dashboard)/team/page.tsx

import { useState, useEffect } from 'react'
import { Edit2, Trash2, Eye, EyeOff } from 'lucide-react'
import { fetchApi } from '~/lib/api'
import { 
  Badge, 
  TableCard, 
  Table, 
  TRow, 
  TCell, 
  TCellPrimary, 
  PageHeader, 
  AddButton,
  Modal 
} from '~/admin/ui'

export default function TeamPage() {
  const [team, setTeam] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    full_name: '',
    role: '',
    email: '',
    bio: '',
    is_active: true
  })

  const loadData = async () => {
    try {
      const data = await fetchApi('/management/team/')
      setTeam(data.results || data)
    } catch (err) {
      console.error('Failed to load team:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const openAddModal = () => {
    setEditingMember(null)
    setFormData({ full_name: '', role: '', email: '', bio: '', is_active: true })
    setIsModalOpen(true)
  }

  const openEditModal = (member: any) => {
    setEditingMember(member)
    setFormData({
      full_name: member.full_name,
      role: member.role,
      email: member.email,
      bio: member.bio || '',
      is_active: member.is_active
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (editingMember) {
        await fetchApi(`/management/team/${editingMember.id}/`, {
          method: 'PATCH',
          body: JSON.stringify(formData)
        })
      } else {
        await fetchApi('/management/team/', {
          method: 'POST',
          body: JSON.stringify(formData)
        })
      }
      setIsModalOpen(false)
      loadData()
    } catch (err: any) {
      alert(`Save Failed: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this team member?')) return
    try {
      await fetchApi(`/management/team/${id}/`, { method: 'DELETE' })
      loadData()
    } catch (err: any) {
      alert(`Delete Failed: ${err.message}`)
    }
  }

  const toggleStatus = async (member: any) => {
    try {
      await fetchApi(`/management/team/${member.id}/`, {
        method: 'PATCH',
        body: JSON.stringify({ is_active: !member.is_active })
      })
      loadData()
    } catch (err: any) {
      alert(`Update Failed: ${err.message}`)
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
        title="Team"
        subtitle="Staff and team members responsible for WNETF operations"
        action={<AddButton label="+ Add Member" onClick={openAddModal} />}
      />

      <TableCard title="Team Members">
        <Table headers={['Member', 'Email', 'Visibility', 'Actions']}>
          {team.map(member => (
            <TRow key={member.id}>
              <TCellPrimary primary={member.full_name} secondary={member.role} />
              <TCell mono className="text-xs text-slate-500">{member.email}</TCell>
              <TCell>
                <button 
                  onClick={() => toggleStatus(member)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                    member.is_active 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                      : 'bg-slate-50 text-slate-400 border-slate-100'
                  }`}
                >
                  {member.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
                  <span className="text-[10px] font-black uppercase tracking-widest">{member.is_active ? 'Public' : 'Hidden'}</span>
                </button>
              </TCell>
              <TCell>
                <div className="flex items-center gap-2 justify-end">
                  <button 
                    onClick={() => openEditModal(member)}
                    className="p-2 text-brand-blue hover:bg-brand-light rounded-lg transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(member.id)}
                    className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </TCell>
            </TRow>
          ))}
          {team.length === 0 && (
             <TRow>
               <td colSpan={4} className="px-8 py-20 text-center text-slate-400 italic font-medium">No team members found.</td>
             </TRow>
          )}
        </Table>
      </TableCard>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingMember ? 'Edit Team Member' : 'Add Team Member'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm text-brand-navy focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all font-medium"
                value={formData.full_name}
                onChange={e => setFormData({ ...formData, full_name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Role / Designation</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm text-brand-navy focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all font-medium"
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm text-brand-navy focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all font-medium"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Bio (Optional)</label>
              <textarea 
                rows={3}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm text-brand-navy focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all font-medium"
                value={formData.bio}
                onChange={e => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input 
              type="checkbox"
              id="is_active_team"
              className="w-5 h-5 rounded-lg border-2 border-slate-200 text-emerald-500 focus:ring-0 cursor-pointer"
              checked={formData.is_active}
              onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
            />
            <label htmlFor="is_active_team" className="text-[11px] font-black uppercase tracking-widest text-slate-600 cursor-pointer">Live on Website</label>
          </div>

          <div className="flex gap-4 pt-4 border-t border-slate-50">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all underline decoration-slate-200 underline-offset-8"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={submitting}
              className="flex-[2] bg-brand-navy hover:bg-brand-blue text-white font-black text-[10px] uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl shadow-brand-navy/20 transition-all active:scale-95 disabled:opacity-50"
            >
              {submitting ? 'Saving...' : editingMember ? 'Update Member' : 'Save Member'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
