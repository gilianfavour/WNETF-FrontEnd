'use client'

// app/admin/(dashboard)/partners/page.tsx

import { useState, useEffect } from 'react'
import { Edit2, Trash2, Eye, EyeOff, Globe } from 'lucide-react'
import { fetchApi } from '~/lib/api'
import { Badge, TableCard, Table, TRow, TCell, TCellPrimary, PageHeader, AddButton, Modal } from '~/admin/ui'

export default function PartnersPage() {
  const [partners, setPartners] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPartner, setEditingPartner] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    partnership_type: '',
    website_url: '',
    description: '',
    logo: null,
    is_active: true
  })

  const loadData = async () => {
    try {
      const data = await fetchApi('/management/partners/')
      setPartners(data.results || data)
    } catch (err) {
      console.error('Failed to load partners:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const openAddModal = () => {
    setEditingPartner(null)
    setFormData({ name: '', partnership_type: '', website_url: '', description: '', logo: null, is_active: true })
    setIsModalOpen(true)
  }

  const openEditModal = (partner: any) => {
    setEditingPartner(partner)
    setFormData({
      name: partner.name,
      partnership_type: partner.partnership_type,
      website_url: partner.website_url || '',
      description: partner.description || '',
      logo: null, // logos usually handled separately or not at all in this simple form
      is_active: partner.is_active
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (editingPartner) {
        await fetchApi(`/management/partners/${editingPartner.id}/`, {
          method: 'PATCH',
          body: JSON.stringify(formData)
        })
      } else {
        await fetchApi('/management/partners/', {
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
    if (!confirm('Are you sure you want to delete this partner?')) return
    try {
      await fetchApi(`/management/partners/${id}/`, { method: 'DELETE' })
      loadData()
    } catch (err: any) {
      alert(`Delete Failed: ${err.message}`)
    }
  }

  const toggleStatus = async (partner: any) => {
    try {
      await fetchApi(`/management/partners/${partner.id}/`, {
        method: 'PATCH',
        body: JSON.stringify({ is_active: !partner.is_active })
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
        title="Partners"
        subtitle="Organizations supporting WNETF operations and outreach"
        action={<AddButton label="+ Add Partner" onClick={openAddModal} />}
      />

      <TableCard title="Official Partners">
        <Table headers={['Partner', 'Type', 'Website', 'Visibility', 'Actions']}>
          {partners.map(p => (
            <TRow key={p.id}>
              <TCellPrimary primary={p.name} />
              <TCell>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1 rounded-lg w-fit">
                  {p.partnership_type}
                </div>
              </TCell>
              <TCell mono className="text-xs text-brand-blue truncate max-w-[200px]">
                {p.website_url ? (
                  <a href={p.website_url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2">
                    <Globe size={12} /> {new URL(p.website_url).hostname}
                  </a>
                ) : '—'}
              </TCell>
              <TCell>
                <button 
                  onClick={() => toggleStatus(p)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                    p.is_active 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                      : 'bg-slate-50 text-slate-400 border-slate-100'
                  }`}
                >
                  {p.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
                  <span className="text-[10px] font-black uppercase tracking-widest">{p.is_active ? 'Public' : 'Hidden'}</span>
                </button>
              </TCell>
              <TCell>
                <div className="flex items-center gap-2 justify-end">
                  <button 
                    onClick={() => openEditModal(p)}
                    className="p-2 text-brand-blue hover:bg-brand-light rounded-lg transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(p.id)}
                    className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </TCell>
            </TRow>
          ))}
          {partners.length === 0 && (
             <TRow>
               <td colSpan={5} className="px-8 py-20 text-center text-slate-400 italic font-medium">No partners found.</td>
             </TRow>
          )}
        </Table>
      </TableCard>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingPartner ? 'Edit Partner' : 'Add New Partner'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Partner Name</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm text-brand-navy focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all font-medium"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Partnership Type</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm text-brand-navy focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all font-medium"
                value={formData.partnership_type}
                onChange={e => setFormData({ ...formData, partnership_type: e.target.value })}
                placeholder="e.g. Funding / Academic"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Website URL (Optional)</label>
              <input 
                type="url" 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm text-brand-navy focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all font-medium"
                value={formData.website_url}
                onChange={e => setFormData({ ...formData, website_url: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Description (Optional)</label>
              <textarea 
                rows={3}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm text-brand-navy focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all font-medium"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input 
              type="checkbox"
              id="is_active_partner"
              className="w-5 h-5 rounded-lg border-2 border-slate-200 text-emerald-500 focus:ring-0 cursor-pointer"
              checked={formData.is_active}
              onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
            />
            <label htmlFor="is_active_partner" className="text-[11px] font-black uppercase tracking-widest text-slate-600 cursor-pointer">Live on Website</label>
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
              {submitting ? 'Saving...' : editingPartner ? 'Update Partner' : 'Save Partner'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
