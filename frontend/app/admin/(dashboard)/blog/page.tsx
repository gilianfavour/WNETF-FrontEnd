'use client'

// app/admin/(dashboard)/blog/page.tsx

import { useState, useEffect } from 'react'
import { Edit2, Trash2, Eye, EyeOff, Plus } from 'lucide-react'
import { fetchApi } from '~/lib/api'
import { Badge, TableCard, Table, TRow, TCell, TCellPrimary, PageHeader, AddButton, Modal } from '~/admin/ui'

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<any>(null)
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    author: '',
    excerpt: '',
    content: '',
    is_published: true
  })

  const loadData = async () => {
    setLoading(true)
    try {
      const data = await fetchApi('/blog/?admin=true')
      setPosts(data.results || data)
    } catch (err) {
      console.error('Failed to load blog posts:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const openAddModal = () => {
    setEditingPost(null)
    setFormData({
      title: '',
      category: '',
      author: '',
      excerpt: '',
      content: '',
      is_published: true
    })
    setIsModalOpen(true)
  }

  const openEditModal = (post: any) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      category: post.category,
      author: post.author,
      excerpt: post.excerpt,
      content: post.content,
      is_published: post.is_published
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingPost) {
        await fetchApi(`/blog/${editingPost.id}/?admin=true`, {
          method: 'PATCH',
          body: JSON.stringify(formData)
        })
      } else {
        await fetchApi('/blog/?admin=true', {
          method: 'POST',
          body: JSON.stringify(formData)
        })
      }
      setIsModalOpen(false)
      loadData()
    } catch (err: any) {
      alert(`Save Failed: ${err.message}`)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return
    try {
      await fetchApi(`/blog/${id}/?admin=true`, { method: 'DELETE' })
      loadData()
    } catch (err: any) {
      alert(`Delete Failed: ${err.message}`)
    }
  }

  const toggleStatus = async (post: any) => {
    try {
      await fetchApi(`/blog/${post.id}/?admin=true`, {
        method: 'PATCH',
        body: JSON.stringify({ is_published: !post.is_published })
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
    <div className="space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title="Blog & News"
        subtitle="Manage WNETF news, impact stories and updates"
        action={<AddButton label="+ New Post" onClick={openAddModal} />}
      />

      <TableCard title="Article Records">
        <Table headers={['Post Title', 'Category', 'Author', 'Visibility', 'Actions']}>
          {posts.map(p => (
            <TRow key={p.id}>
              <TCellPrimary
                primary={p.title}
                secondary={`Created on ${new Date(p.created_at).toLocaleDateString()}`}
              />
              <TCell>
                <span className="px-3 py-1 bg-brand-light text-brand-blue rounded-full text-[10px] font-black uppercase tracking-widest">{p.category || 'Opinion'}</span>
              </TCell>
              <TCell>
                <div className="text-slate-600 font-medium italic">{p.author}</div>
              </TCell>
              <TCell>
                <button 
                  onClick={() => toggleStatus(p)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                    p.is_published 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                      : 'bg-slate-50 text-slate-400 border-slate-100'
                  }`}
                >
                  {p.is_published ? <Eye size={14} /> : <EyeOff size={14} />}
                  <span className="text-[10px] font-black uppercase tracking-widest">{p.is_published ? 'Live' : 'Draft'}</span>
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
          {posts.length === 0 && (
             <TRow>
               <td colSpan={5} className="px-5 py-20 text-center text-slate-400 italic font-medium">No blog posts found.</td>
             </TRow>
          )}
        </Table>
      </TableCard>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingPost ? 'Edit Blog Post' : 'New Blog Post'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Post Title</label>
              <input
                type="text"
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-medium focus:ring-4 focus:ring-brand-blue/5 outline-none"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Impact of Scholarship Program"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Category</label>
              <input
                type="text"
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-medium focus:ring-4 focus:ring-brand-blue/5 outline-none"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. Success Stories"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Author Name</label>
              <input
                type="text"
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-medium focus:ring-4 focus:ring-brand-blue/5 outline-none"
                value={formData.author}
                onChange={e => setFormData({ ...formData, author: e.target.value })}
                placeholder="e.g. Communications Director"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Short Excerpt (Summary)</label>
            <textarea
              rows={2}
              required
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-medium focus:ring-4 focus:ring-brand-blue/5 outline-none"
              value={formData.excerpt}
              onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Full Content</label>
            <textarea
              rows={8}
              required
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-medium focus:ring-4 focus:ring-brand-blue/5 outline-none"
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input 
              type="checkbox"
              id="is_published"
              className="w-5 h-5 rounded-lg border-2 border-slate-200 text-emerald-500 focus:ring-0 cursor-pointer"
              checked={formData.is_published}
              onChange={e => setFormData({ ...formData, is_published: e.target.checked })}
            />
            <label htmlFor="is_published" className="text-[11px] font-black uppercase tracking-widest text-slate-600 cursor-pointer">Publish Immediately</label>
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
              className="flex-[2] bg-brand-navy hover:bg-brand-blue text-white text-[10px] font-black uppercase tracking-[0.2em] px-8 py-4 rounded-2xl transition-all shadow-xl shadow-brand-navy/20 active:scale-95"
            >
              {editingPost ? 'Update Post' : 'Save & Publish'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
