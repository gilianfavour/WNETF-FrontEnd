'use client'

import { useState, useEffect } from 'react'
import { Edit2, Trash2 } from 'lucide-react'
import { fetchApi } from '~/lib/api'
import {
  TableCard, Table, TRow, TCell, TCellPrimary, EmptyRow,
  PageHeader, AddButton, Modal, StatusToggle,
  FormLabel, FormInput, FormTextarea, ModalFooter
} from '~/admin/ui'

export default function TeamPage() {
  const [team, setTeam] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({ full_name: '', role: '', email: '', bio: '', is_active: true })

  const loadData = async () => {
    try { const data = await fetchApi('/management/team/'); setTeam(data.results || data) }
    catch (err) { console.error(err) } finally { setLoading(false) }
  }

  useEffect(() => { loadData() }, [])

  const openAddModal = () => {
    setEditingMember(null)
    setFormData({ full_name: '', role: '', email: '', bio: '', is_active: true })
    setIsModalOpen(true)
  }

  const openEditModal = (m: any) => {
    setEditingMember(m)
    setFormData({ full_name: m.full_name, role: m.role, email: m.email, bio: m.bio || '', is_active: m.is_active })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitting(true)
    try {
      editingMember
        ? await fetchApi(`/management/team/${editingMember.id}/`, { method: 'PATCH', body: JSON.stringify(formData) })
        : await fetchApi('/management/team/', { method: 'POST', body: JSON.stringify(formData) })
      setIsModalOpen(false); loadData()
    } catch (err: any) { alert(`Save Failed: ${err.message}`) }
    finally { setSubmitting(false) }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this team member?')) return
    try { await fetchApi(`/management/team/${id}/`, { method: 'DELETE' }); loadData() }
    catch (err: any) { alert(`Delete Failed: ${err.message}`) }
  }

  const toggleStatus = async (m: any) => {
    try { await fetchApi(`/management/team/${m.id}/`, { method: 'PATCH', body: JSON.stringify({ is_active: !m.is_active }) }); loadData() }
    catch (err: any) { alert(`Update Failed: ${err.message}`) }
  }

  if (loading) return <div className="min-h-[400px] flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-7 max-w-7xl mx-auto">
      <PageHeader title="Team" subtitle="Staff and team members responsible for WNETF operations" action={<AddButton label="+ Add Member" onClick={openAddModal} />} />

      <TableCard title="Team Members">
        <Table headers={['Member', 'Email', 'Visibility', 'Actions']}>
          {team.map(m => (
            <TRow key={m.id}>
              <TCellPrimary primary={m.full_name} secondary={m.role} />
              <TCell mono>{m.email}</TCell>
              <TCell><StatusToggle isActive={m.is_active} onToggle={() => toggleStatus(m)} /></TCell>
              <TCell>
                <div className="flex items-center gap-1 justify-end">
                  <button onClick={() => openEditModal(m)} className="p-2 text-brand-blue hover:bg-brand-light rounded-lg transition-colors"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(m.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div>
              </TCell>
            </TRow>
          ))}
          {team.length === 0 && <EmptyRow colSpan={4} message="No team members found. Add your first team member above." />}
        </Table>
      </TableCard>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingMember ? 'Edit Team Member' : 'Add Team Member'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <FormLabel>Full Name</FormLabel>
            <FormInput required value={formData.full_name} onChange={e => setFormData({ ...formData, full_name: e.target.value })} />
          </div>
          <div>
            <FormLabel>Role / Designation</FormLabel>
            <FormInput required value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} placeholder="e.g. Executive Director" />
          </div>
          <div>
            <FormLabel>Email Address</FormLabel>
            <FormInput type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
          </div>
          <div>
            <FormLabel>Bio (Optional)</FormLabel>
            <FormTextarea rows={3} value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} placeholder="A short biography…" />
          </div>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" id="is_active_team" checked={formData.is_active} onChange={e => setFormData({ ...formData, is_active: e.target.checked })} className="w-4 h-4 rounded border-slate-300 text-emerald-600" />
            <span className="text-sm font-medium text-slate-700">Show publicly on website</span>
          </label>
          <ModalFooter onCancel={() => setIsModalOpen(false)} submitLabel={editingMember ? 'Update Member' : 'Save Member'} submitting={submitting} />
        </form>
      </Modal>
    </div>
  )
}
