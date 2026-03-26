'use client'

// app/admin/(dashboard)/students/page.tsx

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
  Toolbar, 
  SearchInput, 
  FilterBtn, 
  AddButton,
  Modal 
} from '~/admin/ui'

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    university: '',
    course: '',
    year: '',
    district: '',
    is_active: true,
    is_graduate: false
  })

  const loadData = async () => {
    try {
      const data = await fetchApi('/beneficiaries/?admin=true')
      setStudents(data.results || data)
    } catch (err) {
      console.error('Failed to load students:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const openAddModal = () => {
    setEditingStudent(null)
    setFormData({ name: '', university: '', course: '', year: '', district: '', is_active: true, is_graduate: false })
    setIsModalOpen(true)
  }

  const openEditModal = (student: any) => {
    setEditingStudent(student)
    setFormData({
      name: student.name,
      university: student.university,
      course: student.course,
      year: student.year,
      district: student.district,
      is_active: student.is_active,
      is_graduate: student.is_graduate
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (editingStudent) {
        await fetchApi(`/beneficiaries/${editingStudent.id}/?admin=true`, {
          method: 'PATCH',
          body: JSON.stringify(formData)
        })
      } else {
        await fetchApi('/beneficiaries/?admin=true', {
          method: 'POST',
          body: JSON.stringify(formData)
        })
      }
      setIsModalOpen(false)
      loadData()
    } catch (err: any) {
      alert(`Error saving student: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this student record?')) return
    try {
      await fetchApi(`/beneficiaries/${id}/?admin=true`, { method: 'DELETE' })
      loadData()
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`)
    }
  }

  const toggleStatus = async (student: any) => {
    try {
      await fetchApi(`/beneficiaries/${student.id}/?admin=true`, {
        method: 'PATCH',
        body: JSON.stringify({ is_active: !student.is_active })
      })
      loadData()
    } catch (err: any) {
      alert(`Status update failed: ${err.message}`)
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
        title="Students"
        subtitle="Scholarship beneficiaries currently supported by WNETF"
        action={<AddButton label="+ Add Student" onClick={openAddModal} />}
      />

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
              <TCellPrimary 
                primary={s.name} 
                secondary={s.year} 
              />
              <TCell>
                <div className="text-slate-600 font-medium">{s.university}</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{s.course}</div>
              </TCell>
              <TCell>
                <div className="text-slate-600 font-medium">{s.district}</div>
              </TCell>
              <TCell>
                <button 
                  onClick={() => toggleStatus(s)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                    s.is_active 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-100 px-3' 
                      : 'bg-slate-50 text-slate-400 border-slate-100 px-3'
                  }`}
                >
                  {s.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
                  <span className="text-[10px] font-black uppercase tracking-widest">{s.is_active ? 'Public' : 'Hidden'}</span>
                </button>
              </TCell>
              <TCell>
                <div className="flex items-center gap-2 justify-end">
                  {s.is_graduate && <Badge status="graduated" />}
                  <button 
                    onClick={() => openEditModal(s)}
                    className="p-2 text-brand-blue hover:bg-brand-light rounded-lg transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(s.id)}
                    className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </TCell>
            </TRow>
          ))}
          {students.length === 0 && (
             <TRow>
               <td colSpan={5} className="px-8 py-20 text-center text-slate-400 italic font-medium">No students found in the database.</td>
             </TRow>
          )}
        </Table>
      </TableCard>

      {/* Student Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingStudent ? 'Edit Beneficiary' : 'Add New Beneficiary'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm text-brand-navy focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all font-medium"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">University</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm text-brand-navy focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all font-medium"
                value={formData.university}
                onChange={e => setFormData({ ...formData, university: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Course</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm text-brand-navy focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all font-medium"
                value={formData.course}
                onChange={e => setFormData({ ...formData, course: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Year / Level</label>
              <input 
                type="text" 
                placeholder="e.g. 2nd Year"
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm text-brand-navy focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all font-medium"
                value={formData.year}
                onChange={e => setFormData({ ...formData, year: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">District</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm text-brand-navy focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all font-medium"
                value={formData.district}
                onChange={e => setFormData({ ...formData, district: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
            <label className="flex items-center gap-3 cursor-pointer group">
               <input 
                 type="checkbox" 
                 checked={formData.is_graduate}
                 onChange={e => setFormData({ ...formData, is_graduate: e.target.checked })}
                 className="w-5 h-5 rounded-lg border-2 border-slate-200 text-brand-blue focus:ring-0 focus:ring-offset-0 cursor-pointer"
               />
               <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 group-hover:text-brand-navy transition-colors">Graduated Student</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
               <input 
                 type="checkbox" 
                 checked={formData.is_active}
                 onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
                 className="w-5 h-5 rounded-lg border-2 border-slate-200 text-emerald-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
               />
               <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 group-hover:text-brand-navy transition-colors">Active Status</span>
            </label>
          </div>

          <div className="flex gap-4 pt-4">
             <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all underline decoration-slate-200 underline-offset-8"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={submitting}
                className="flex-[2] bg-brand-navy hover:bg-brand-blue text-white font-black text-[10px] uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl shadow-brand-navy/20 transition-all active:scale-95 disabled:opacity-50"
              >
                {submitting ? 'Saving...' : editingStudent ? 'Update Records' : 'Save Beneficiary'}
              </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
