'use client'

import { useState, useEffect } from 'react'
import { Trash2, Receipt } from 'lucide-react'
import { fetchApi } from '~/lib/api'
import {
  StatCard, Badge, TableCard, Table, TRow, TCell, TCellPrimary, EmptyRow,
  PageHeader, Toolbar, SearchInput, AddButton, Modal, TypeChip,
  FormLabel, FormInput, FormTextarea, FormSelect, ModalFooter
} from '~/admin/ui'

export default function DonationsPage() {
  const [donations, setDonations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', amount: '', frequency: 'one-time', message: '' })

  const loadData = async () => {
    try { const data = await fetchApi('/donate/'); setDonations(data.results || data) }
    catch (err) { console.error(err) } finally { setLoading(false) }
  }

  useEffect(() => { loadData() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitting(true)
    try {
      await fetchApi('/donate/', { method: 'POST', body: JSON.stringify(formData) })
      setIsModalOpen(false)
      setFormData({ first_name: '', last_name: '', email: '', amount: '', frequency: 'one-time', message: '' })
      loadData()
    } catch (err: any) { alert(`Save Failed: ${err.message}`) }
    finally { setSubmitting(false) }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this donation record?')) return
    try { await fetchApi(`/donate/${id}/`, { method: 'DELETE' }); loadData() }
    catch (err: any) { alert(`Delete Failed: ${err.message}`) }
  }

  const totalRaised = donations.reduce((sum, d) => sum + Number(d.amount), 0)

  if (loading) return <div className="min-h-[400px] flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-7 max-w-7xl mx-auto">
      <PageHeader title="Donations" subtitle="Track all contributions and verify payments to WNETF" action={<AddButton label="+ Record Donation" onClick={() => setIsModalOpen(true)} />} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard label="Total Raised" value={`UGX ${(totalRaised / 1_000_000).toFixed(2)}M`} sub="All-time contributions" />
        <StatCard label="Total Donors" value={donations.length.toString()} sub="Unique contributions" />
        <StatCard label="Average Gift" value={`UGX ${donations.length ? Math.round(totalRaised / donations.length).toLocaleString() : 0}`} sub="Per contribution" />
        <StatCard label="Monthly Target" value="UGX 1.2M" sub="Goal: UGX 5M" />
      </div>

      <Toolbar>
        <SearchInput placeholder="Search donors…" />
      </Toolbar>

      <TableCard title="All Donations">
        <Table headers={['Donor', 'Amount (UGX)', 'Frequency', 'Date', 'Actions']}>
          {donations.map(d => (
            <TRow key={d.id}>
              <TCellPrimary primary={`${d.first_name} ${d.last_name}`} secondary={d.email} />
              <TCell>
                <span className="text-base font-bold text-emerald-700">{Number(d.amount).toLocaleString()}</span>
                <span className="text-xs text-slate-500 ml-1">UGX</span>
              </TCell>
              <TCell><TypeChip label={d.frequency} /></TCell>
              <TCell className="text-slate-500">{new Date(d.created_at).toLocaleDateString()}</TCell>
              <TCell>
                <div className="flex items-center gap-2 justify-end">
                  <Badge status="verified" />
                  <button onClick={() => handleDelete(d.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div>
              </TCell>
            </TRow>
          ))}
          {donations.length === 0 && <EmptyRow colSpan={5} message="No donation records found." />}
        </Table>
      </TableCard>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Record New Donation">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormLabel>First Name</FormLabel>
              <FormInput required value={formData.first_name} onChange={e => setFormData({ ...formData, first_name: e.target.value })} />
            </div>
            <div>
              <FormLabel>Last Name</FormLabel>
              <FormInput required value={formData.last_name} onChange={e => setFormData({ ...formData, last_name: e.target.value })} />
            </div>
            <div className="col-span-2">
              <FormLabel>Email Address</FormLabel>
              <FormInput type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div>
              <FormLabel>Amount (UGX)</FormLabel>
              <FormInput type="number" required placeholder="50000" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} />
            </div>
            <div>
              <FormLabel>Frequency</FormLabel>
              <FormSelect value={formData.frequency} onChange={e => setFormData({ ...formData, frequency: e.target.value })}>
                <option value="one-time">One-time</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </FormSelect>
            </div>
          </div>
          <div>
            <FormLabel>Donor Message (Optional)</FormLabel>
            <FormTextarea rows={2} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
          </div>
          <ModalFooter onCancel={() => setIsModalOpen(false)} submitLabel="Finalize Record" submitting={submitting} icon={<Receipt size={15} />} />
        </form>
      </Modal>
    </div>
  )
}
