'use client'

import { useState, useEffect } from 'react'
import { Edit2, Trash2, KeyRound } from 'lucide-react'
import { fetchApi } from '~/lib/api'
import {
  TableCard, Table, TRow, TCell, TCellPrimary, EmptyRow,
  PageHeader, AddButton, Modal, StatusToggle, TypeChip,
  FormLabel, FormInput, FormTextarea, FormSelect, ModalFooter
} from '~/admin/ui'
import { PREDEFINED_ROLES } from '~/lib/permissions'

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '', role: 'Staff', email: '', bio: '', password: '', is_active: true
  })

  const loadData = async () => {
    try { const data = await fetchApi('/management/team/'); setUsers(data.results || data) }
    catch (err) { console.error(err) } finally { setLoading(false) }
  }

  useEffect(() => { loadData() }, [])

  const openAddModal = () => {
    setEditingUser(null)
    setFormData({ full_name: '', role: 'Staff', email: '', bio: '', password: '', is_active: true })
    setIsModalOpen(true)
  }

  const openEditModal = (u: any) => {
    setEditingUser(u)
    setFormData({ full_name: u.full_name, role: u.role, email: u.email, bio: u.bio || '', password: '', is_active: u.is_active })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitting(true)
    try {
      const payload: any = { full_name: formData.full_name, role: formData.role, email: formData.email, bio: formData.bio, is_active: formData.is_active }
      if (formData.password) payload.password = formData.password
      editingUser
        ? await fetchApi(`/management/team/${editingUser.id}/`, { method: 'PATCH', body: JSON.stringify(payload) })
        : await fetchApi('/management/team/', { method: 'POST', body: JSON.stringify(payload) })
      setIsModalOpen(false); loadData()
    } catch (err: any) { alert(`Save Failed: ${err.message}`) }
    finally { setSubmitting(false) }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this user account?')) return
    try { await fetchApi(`/management/team/${id}/`, { method: 'DELETE' }); loadData() }
    catch (err: any) { alert(`Delete Failed: ${err.message}`) }
  }

  const toggleStatus = async (u: any) => {
    try { await fetchApi(`/management/team/${u.id}/`, { method: 'PATCH', body: JSON.stringify({ is_active: !u.is_active }) }); loadData() }
    catch (err: any) { alert(`Update Failed: ${err.message}`) }
  }

  if (loading) return <div className="min-h-[400px] flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-7 max-w-5xl mx-auto">
      <PageHeader
        title="User Accounts"
        subtitle="Manage admin portal access — only active users can log in"
        action={<AddButton label="+ Add User" onClick={openAddModal} />}
      />

      <TableCard title={`All Users (${users.length})`}>
        <Table headers={['User', 'Email', 'Role', 'Login Access', 'Actions']}>
          {users.map(u => (
            <TRow key={u.id}>
              <TCellPrimary primary={u.full_name} secondary={u.bio ? u.bio.slice(0, 60) + (u.bio.length > 60 ? '…' : '') : undefined} />
              <TCell mono>{u.email}</TCell>
              <TCell><TypeChip label={u.role} /></TCell>
              <TCell><StatusToggle isActive={u.is_active} onToggle={() => toggleStatus(u)} /></TCell>
              <TCell>
                <div className="flex items-center gap-1 justify-end">
                  <button onClick={() => openEditModal(u)} className="p-2 text-brand-blue hover:bg-brand-light rounded-lg transition-colors" title="Edit user"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(u.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors" title="Delete user"><Trash2 size={16} /></button>
                </div>
              </TCell>
            </TRow>
          ))}
          {users.length === 0 && <EmptyRow colSpan={5} message="No users yet. Add your first admin user above." />}
        </Table>
      </TableCard>

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4">
        <p className="text-sm font-semibold text-brand-navy mb-1">How login works</p>
        <p className="text-sm text-slate-600 leading-relaxed">
          Users can log in using their <strong>full name</strong> or <strong>email address</strong> plus their password.
          Only users with <strong>Login Access</strong> set to Public can sign in.
          Passwords are stored as plain text — use the <strong>Role Permissions</strong> page to control what each role can see.
        </p>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingUser ? 'Edit User' : 'Add New User'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <FormLabel>Full Name</FormLabel>
              <FormInput required value={formData.full_name} onChange={e => setFormData({ ...formData, full_name: e.target.value })} placeholder="e.g. Jane Achola" />
            </div>
            <div className="col-span-2">
              <FormLabel>Email Address</FormLabel>
              <FormInput type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="jane@wnetf.org" />
            </div>
            <div>
              <FormLabel>Assigned Role</FormLabel>
              <FormSelect value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
                {PREDEFINED_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </FormSelect>
            </div>
            <div>
              <FormLabel>{editingUser ? 'New Password (leave blank to keep)' : 'Password'}</FormLabel>
              <div className="relative">
                <FormInput
                  type="password"
                  required={!editingUser}
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="pl-10"
                />
                <KeyRound size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
          <div>
            <FormLabel>Bio / Notes (Optional)</FormLabel>
            <FormTextarea rows={2} value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} placeholder="Short description or position…" />
          </div>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={formData.is_active} onChange={e => setFormData({ ...formData, is_active: e.target.checked })} className="w-4 h-4 rounded border-slate-300 text-emerald-600" />
            <span className="text-sm font-medium text-slate-700">Allow this user to log in</span>
          </label>
          <ModalFooter onCancel={() => setIsModalOpen(false)} submitLabel={editingUser ? 'Update User' : 'Create User'} submitting={submitting} />
        </form>
      </Modal>
    </div>
  )
}
