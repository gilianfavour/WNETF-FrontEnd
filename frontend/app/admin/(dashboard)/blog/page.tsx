'use client'

import { useState, useEffect } from 'react'
import { Edit2, Trash2 } from 'lucide-react'
import { fetchApi } from '~/lib/api'
import {
  TableCard, Table, TRow, TCell, TCellPrimary, EmptyRow,
  PageHeader, AddButton, Modal, StatusToggle, TypeChip,
  FormLabel, FormInput, FormTextarea, ModalFooter
} from '~/admin/ui'

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<any>(null)
  const [formData, setFormData] = useState({ title: '', category: '', author: '', excerpt: '', content: '', is_published: true })

  const loadData = async () => {
    setLoading(true)
    try { const data = await fetchApi('/blog/?admin=true'); setPosts(data.results || data) }
    catch (err) { console.error(err) } finally { setLoading(false) }
  }

  useEffect(() => { loadData() }, [])

  const openAddModal = () => {
    setEditingPost(null)
    setFormData({ title: '', category: '', author: '', excerpt: '', content: '', is_published: true })
    setIsModalOpen(true)
  }

  const openEditModal = (p: any) => {
    setEditingPost(p)
    setFormData({ title: p.title, category: p.category, author: p.author, excerpt: p.excerpt, content: p.content, is_published: p.is_published })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      editingPost
        ? await fetchApi(`/blog/${editingPost.id}/?admin=true`, { method: 'PATCH', body: JSON.stringify(formData) })
        : await fetchApi('/blog/?admin=true', { method: 'POST', body: JSON.stringify(formData) })
      setIsModalOpen(false); loadData()
    } catch (err: any) { alert(`Save Failed: ${err.message}`) }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this blog post?')) return
    try { await fetchApi(`/blog/${id}/?admin=true`, { method: 'DELETE' }); loadData() }
    catch (err: any) { alert(`Delete Failed: ${err.message}`) }
  }

  const toggleStatus = async (p: any) => {
    try { await fetchApi(`/blog/${p.id}/?admin=true`, { method: 'PATCH', body: JSON.stringify({ is_published: !p.is_published }) }); loadData() }
    catch (err: any) { alert(`Update Failed: ${err.message}`) }
  }

  if (loading) return <div className="min-h-[400px] flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-7 max-w-7xl mx-auto">
      <PageHeader title="Blog & News" subtitle="Manage WNETF news, impact stories and updates" action={<AddButton label="+ New Post" onClick={openAddModal} />} />

      <TableCard title="Article Records">
        <Table headers={['Post Title', 'Category', 'Author', 'Visibility', 'Actions']}>
          {posts.map(p => (
            <TRow key={p.id}>
              <TCellPrimary primary={p.title} secondary={`Created ${new Date(p.created_at).toLocaleDateString()}`} />
              <TCell><TypeChip label={p.category || 'General'} /></TCell>
              <TCell>{p.author}</TCell>
              <TCell><StatusToggle isActive={p.is_published} onToggle={() => toggleStatus(p)} /></TCell>
              <TCell>
                <div className="flex items-center gap-1 justify-end">
                  <button onClick={() => openEditModal(p)} className="p-2 text-brand-blue hover:bg-brand-light rounded-lg transition-colors"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(p.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div>
              </TCell>
            </TRow>
          ))}
          {posts.length === 0 && <EmptyRow colSpan={5} message="No blog posts yet. Create your first post above." />}
        </Table>
      </TableCard>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingPost ? 'Edit Blog Post' : 'New Blog Post'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <FormLabel>Post Title</FormLabel>
              <FormInput required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Impact of Scholarship Program" />
            </div>
            <div>
              <FormLabel>Category</FormLabel>
              <FormInput required value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} placeholder="e.g. Success Stories" />
            </div>
            <div>
              <FormLabel>Author Name</FormLabel>
              <FormInput required value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} placeholder="e.g. Communications Director" />
            </div>
          </div>
          <div>
            <FormLabel>Short Excerpt</FormLabel>
            <FormTextarea rows={2} required value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} placeholder="A brief summary of the article…" />
          </div>
          <div>
            <FormLabel>Full Content</FormLabel>
            <FormTextarea rows={8} required value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} placeholder="Write the full article here…" />
          </div>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" id="is_published" checked={formData.is_published} onChange={e => setFormData({ ...formData, is_published: e.target.checked })} className="w-4 h-4 rounded border-slate-300 text-emerald-600" />
            <span className="text-sm font-medium text-slate-700">Publish immediately</span>
          </label>
          <ModalFooter onCancel={() => setIsModalOpen(false)} submitLabel={editingPost ? 'Update Post' : 'Save & Publish'} />
        </form>
      </Modal>
    </div>
  )
}
