'use client'

import { useState, useEffect } from 'react'
import { Edit2, Trash2, Globe } from 'lucide-react'
import { fetchApi } from '~/lib/api'
import {
  TableCard, Table, TRow, TCell, TCellPrimary, EmptyRow,
  PageHeader, AddButton, Modal, StatusToggle, TypeChip,
  FormLabel, FormInput, FormTextarea, ModalFooter
} from '~/admin/ui'

export default function PartnersPage() {
  const [partners, setPartners] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPartner, setEditingPartner] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({ name: '', partnership_type: '', website_url: '', description: '', is_active: true })

  const loadData = async () => {
    try { const data = await fetchApi('/management/partners/'); setPartners(data.results || data) }
    catch (err) { console.error(err) } finally { setLoading(false) }
  }

  useEffect(() => { loadData() }, [])

  const openAddModal = () => {
    setEditingPartner(null)
    setFormData({ name: '', partnership_type: '', website_url: '', description: '', is_active: true })
    setIsModalOpen(true)
  }

  const openEditModal = (p: any) => {
    setEditingPartner(p)
    setFormData({ name: p.name, partnership_type: p.partnership_type, website_url: p.website_url || '', description: p.description || '', is_active: p.is_active })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitting(true)
    try {
      editingPartner
        ? await fetchApi(`/management/partners/${editingPartner.id}/`, { method: 'PATCH', body: JSON.stringify(formData) })
        : await fetchApi('/management/partners/', { method: 'POST', body: JSON.stringify(formData) })
      setIsModalOpen(false); loadData()
    } catch (err: any) { alert(`Save Failed: ${err.message}`) }
    finally { setSubmitting(false) }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this partner?')) return
    try { await fetchApi(`/management/partners/${id}/`, { method: 'DELETE' }); loadData() }
    catch (err: any) { alert(`Delete Failed: ${err.message}`) }
  }

  const toggleStatus = async (p: any) => {
    try { await fetchApi(`/management/partners/${p.id}/`, { method: 'PATCH', body: JSON.stringify({ is_active: !p.is_active }) }); loadData() }
    catch (err: any) { alert(`Update Failed: ${err.message}`) }
  }

  if (loading) return <div className="min-h-[400px] flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-7 max-w-7xl mx-auto">
      <PageHeader title="Partners" subtitle="Organizations supporting WNETF operations and outreach" action={<AddButton label="+ Add Partner" onClick={openAddModal} />} />

      <TableCard title="Official Partners">
        <Table headers={['Partner', 'Type', 'Website', 'Visibility', 'Actions']}>
          {partners.map(p => (
            <TRow key={p.id}>
              <TCellPrimary primary={p.name} />
              <TCell><TypeChip label={p.partnership_type} /></TCell>
              <TCell>
                {p.website_url ? (
                  <a href={p.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-brand-blue hover:underline text-sm">
                    <Globe size={13} /> {new URL(p.website_url).hostname}
                  </a>
                ) : <span className="text-slate-400">—</span>}
              </TCell>
              <TCell><StatusToggle isActive={p.is_active} onToggle={() => toggleStatus(p)} /></TCell>
              <TCell>
                <div className="flex items-center gap-1 justify-end">
                  <button onClick={() => openEditModal(p)} className="p-2 text-brand-blue hover:bg-brand-light rounded-lg transition-colors"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(p.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div>
              </TCell>
            </TRow>
          ))}
          {partners.length === 0 && <EmptyRow colSpan={5} message="No partners found. Add your first partner above." />}
        </Table>
      </TableCard>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingPartner ? 'Edit Partner' : 'Add New Partner'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <FormLabel>Partner Name</FormLabel>
              <FormInput required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Makerere University" />
            </div>
            <div>
              <FormLabel>Partnership Type</FormLabel>
              <FormInput required value={formData.partnership_type} onChange={e => setFormData({ ...formData, partnership_type: e.target.value })} placeholder="e.g. Sponsor, Academic" />
            </div>
            <div>
              <FormLabel>Website URL (Optional)</FormLabel>
              <FormInput type="url" value={formData.website_url} onChange={e => setFormData({ ...formData, website_url: e.target.value })} placeholder="https://example.com" />
            </div>
            <div className="md:col-span-2">
              <FormLabel>Description (Optional)</FormLabel>
              <FormTextarea rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
            </div>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={formData.is_active} onChange={e => setFormData({ ...formData, is_active: e.target.checked })} className="w-4 h-4 rounded border-slate-300 text-brand-blue" />
            <span className="text-sm font-medium text-slate-700">Show publicly on website</span>
          </label>
          <ModalFooter onCancel={() => setIsModalOpen(false)} submitLabel={editingPartner ? 'Update Partner' : 'Save Partner'} submitting={submitting} />
        </form>
      </Modal>
    </div>
  )
}
