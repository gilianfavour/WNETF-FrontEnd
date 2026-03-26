'use client'

// app/admin/(dashboard)/donations/page.tsx

import { useState, useEffect } from 'react'
import { Trash2, Plus, Receipt } from 'lucide-react'
import { fetchApi } from '~/lib/api'
import { StatCard, Badge, TableCard, Table, TRow, TCell, TCellPrimary, PageHeader, Toolbar, SearchInput, AddButton, Modal } from '~/admin/ui'

export default function DonationsPage() {
  const [donations, setDonations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    amount: '',
    frequency: 'one-time',
    message: ''
  })

  const loadData = async () => {
    try {
      const data = await fetchApi('/donate/')
      setDonations(data.results || data)
    } catch (err) {
      console.error('Failed to load donations:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetchApi('/donate/', {
        method: 'POST',
        body: JSON.stringify(formData)
      })
      setIsModalOpen(false)
      setFormData({ first_name: '', last_name: '', email: '', amount: '', frequency: 'one-time', message: '' })
      loadData()
    } catch (err: any) {
      alert(`Save Failed: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to void/delete this donation record?')) return
    try {
      await fetchApi(`/donate/${id}/`, { method: 'DELETE' })
      loadData()
    } catch (err: any) {
      alert(`Delete Failed: ${err.message}`)
    }
  }

  const totalRaised = donations.reduce((sum, d) => sum + Number(d.amount), 0)

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
        title="Donations"
        subtitle="Track all contributions and verify payments to WNETF"
        action={<AddButton label="+ Record Donation" onClick={() => setIsModalOpen(true)} />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard label="Total Raised" value={`UGX ${(totalRaised/1000000).toFixed(2)}M`} sub="Direct impact" color="green" />
        <StatCard label="Count" value={donations.length.toString()} sub="Unique donors" color="blue" />
        <StatCard label="Avg. Gift" value={`UGX ${donations.length ? Math.round(totalRaised/donations.length).toLocaleString() : 0}`} sub="Per contribution" color="amber" />
        <StatCard label="Monthly" value="UGX 1.2M" sub="Target: 5M" color="purple" />
      </div>

      <Toolbar>
        <SearchInput placeholder="Search donors…" />
      </Toolbar>

      <TableCard title="All Donations">
        <Table headers={['Donor', 'Amount', 'Type', 'Date', 'Actions']}>
          {donations.map(d => (
            <TRow key={d.id}>
              <TCellPrimary primary={d.first_name + ' ' + d.last_name} secondary={d.email} />
              <TCell mono className="font-extrabold text-emerald-600">
                {Number(d.amount).toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">UGX</span>
              </TCell>
              <TCell>
                <div className="capitalize text-[11px] font-black uppercase tracking-widest text-slate-500 py-1 px-3 bg-slate-50 rounded-lg w-fit border border-slate-100">
                  {d.frequency}
                </div>
              </TCell>
              <TCell className="text-slate-500 font-medium">{new Date(d.created_at).toLocaleDateString()}</TCell>
              <TCell>
                <div className="flex items-center gap-2 justify-end">
                   <Badge status="verified" />
                   <button 
                    onClick={() => handleDelete(d.id)}
                    className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </TCell>
            </TRow>
          ))}
          {donations.length === 0 && (
             <TRow>
               <td colSpan={5} className="px-8 py-20 text-center text-slate-400 italic font-medium">No donation records found.</td>
             </TRow>
          )}
        </Table>
      </TableCard>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Record New Donation"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">First Name</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-medium focus:ring-4 focus:ring-brand-blue/5 outline-none"
                value={formData.first_name}
                onChange={e => setFormData({ ...formData, first_name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Last Name</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-medium focus:ring-4 focus:ring-brand-blue/5 outline-none"
                value={formData.last_name}
                onChange={e => setFormData({ ...formData, last_name: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-medium focus:ring-4 focus:ring-brand-blue/5 outline-none"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Amount (UGX)</label>
              <input 
                type="number" 
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-bold text-emerald-600 focus:ring-4 focus:ring-emerald-500/5 outline-none"
                value={formData.amount}
                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                placeholder="50000"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Frequency</label>
              <select 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-medium focus:ring-4 focus:ring-brand-blue/5 outline-none appearance-none cursor-pointer"
                value={formData.frequency}
                onChange={e => setFormData({ ...formData, frequency: e.target.value })}
              >
                <option value="one-time">One-time</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Donor Message (Optional)</label>
            <textarea 
              rows={2}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-medium focus:ring-4 focus:ring-brand-blue/5 outline-none"
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <button 
            type="submit"
            disabled={submitting}
            className="w-full bg-brand-navy hover:bg-brand-blue text-white font-black text-[10px] uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl shadow-brand-navy/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            <Receipt size={16} strokeWidth={3} />
            {submitting ? 'Recording...' : 'Finalize Record'}
          </button>
        </form>
      </Modal>
    </div>
  )
}
