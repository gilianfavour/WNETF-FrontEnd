'use client'

import { useState, useEffect } from 'react'
import { Edit2, Trash2 } from 'lucide-react'
import { fetchApi } from '~/lib/api'
import {
  Badge, TableCard, Table, TRow, TCell, TCellPrimary, EmptyRow,
  PageHeader, Toolbar, SearchInput, FilterBtn, AddButton, Modal,
  StatusToggle, FormLabel, FormInput, ModalFooter
} from '~/admin/ui'

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({ name: '', university: '', course: '', year: '', district: '', is_active: true, is_graduate: false })

  const loadData = async () => {
    try { const data = await fetchApi('/beneficiaries/?admin=true'); setStudents(data.results || data) }
    catch (err) { console.error(err) } finally { setLoading(false) }
  }

  useEffect(() => { loadData() }, [])

  const openAddModal = () => {
    setEditingStudent(null)
    setFormData({ name: '', university: '', course: '', year: '', district: '', is_active: true, is_graduate: false })
    setIsModalOpen(true)
  }

  const openEditModal = (s: any) => {
    setEditingStudent(s)
    setFormData({ name: s.name, university: s.university, course: s.course, year: s.year, district: s.district, is_active: s.is_active, is_graduate: s.is_graduate })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitting(true)
    try {
      editingStudent
        ? await fetchApi(`/beneficiaries/${editingStudent.id}/?admin=true`, { method: 'PATCH', body: JSON.stringify(formData) })
        : await fetchApi('/beneficiaries/?admin=true', { method: 'POST', body: JSON.stringify(formData) })
      setIsModalOpen(false); loadData()
    } catch (err: any) { alert(`Error: ${err.message}`) }
    finally { setSubmitting(false) }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this student record?')) return
    try { await fetchApi(`/beneficiaries/${id}/?admin=true`, { method: 'DELETE' }); loadData() }
    catch (err: any) { alert(`Delete failed: ${err.message}`) }
  }

  const toggleStatus = async (s: any) => {
    try { await fetchApi(`/beneficiaries/${s.id}/?admin=true`, { method: 'PATCH', body: JSON.stringify({ is_active: !s.is_active }) }); loadData() }
    catch (err: any) { alert(`Update failed: ${err.message}`) }
  }

  if (loading) return <div className="min-h-[400px] flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-7 max-w-7xl mx-auto">
      <PageHeader title="Students" subtitle="Scholarship beneficiaries currently supported by WNETF" action={<AddButton label="+ Add Student" onClick={openAddModal} />} />

      <Toolbar>
        <SearchInput placeholder="Search students…" />
        <FilterBtn label={`All (${students.length})`} active />
        <FilterBtn label="Active" />
        <FilterBtn label="Graduated" />
      </Toolbar>

      <TableCard title="All Beneficiaries">
        <Table headers={['Student', 'University / Course', 'District', 'Visibility', 'Actions']}>
          {students.map(s => (
            <TRow key={s.id}>
              <TCellPrimary primary={s.name} secondary={s.year} />
              <TCell>
                <p className="text-sm font-medium text-slate-700">{s.university}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.course}</p>
              </TCell>
              <TCell>{s.district}</TCell>
              <TCell><StatusToggle isActive={s.is_active} onToggle={() => toggleStatus(s)} /></TCell>
              <TCell>
                <div className="flex items-center gap-1 justify-end">
                  {s.is_graduate && <Badge status="graduated" />}
                  <button onClick={() => openEditModal(s)} className="p-2 text-brand-blue hover:bg-brand-light rounded-lg transition-colors"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(s.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div>
              </TCell>
            </TRow>
          ))}
          {students.length === 0 && <EmptyRow colSpan={5} message="No students found. Add your first beneficiary above." />}
        </Table>
      </TableCard>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingStudent ? 'Edit Beneficiary' : 'Add New Beneficiary'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <FormLabel>Full Name</FormLabel>
              <FormInput required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div>
              <FormLabel>University</FormLabel>
              <FormInput required value={formData.university} onChange={e => setFormData({ ...formData, university: e.target.value })} />
            </div>
            <div>
              <FormLabel>Course</FormLabel>
              <FormInput required value={formData.course} onChange={e => setFormData({ ...formData, course: e.target.value })} />
            </div>
            <div>
              <FormLabel>Year / Level</FormLabel>
              <FormInput required placeholder="e.g. 2nd Year" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} />
            </div>
            <div>
              <FormLabel>District</FormLabel>
              <FormInput required value={formData.district} onChange={e => setFormData({ ...formData, district: e.target.value })} />
            </div>
          </div>
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={formData.is_graduate} onChange={e => setFormData({ ...formData, is_graduate: e.target.checked })} className="w-4 h-4 rounded border-slate-300 text-brand-blue" />
              <span className="text-sm font-medium text-slate-700">Graduated</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={formData.is_active} onChange={e => setFormData({ ...formData, is_active: e.target.checked })} className="w-4 h-4 rounded border-slate-300 text-emerald-600" />
              <span className="text-sm font-medium text-slate-700">Active student</span>
            </label>
          </div>
          <ModalFooter onCancel={() => setIsModalOpen(false)} submitLabel={editingStudent ? 'Update Records' : 'Save Beneficiary'} submitting={submitting} />
        </form>
      </Modal>
    </div>
  )
}
