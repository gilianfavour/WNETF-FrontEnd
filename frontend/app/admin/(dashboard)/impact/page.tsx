'use client'

// app/admin/(dashboard)/impact/page.tsx

import { useState, useEffect } from 'react'
import { Edit2, Trash2, Eye, EyeOff, BarChart3, Quote } from 'lucide-react'
import { fetchApi } from '~/lib/api'
import { 
  Badge, 
  TableCard, 
  Table, 
  TRow, 
  TCell, 
  TCellPrimary, 
  PageHeader, 
  AddButton,
  Modal 
} from '~/admin/ui'

export default function ImpactManagementPage() {
  const [stats, setStats] = useState<any[]>([])
  const [stories, setStories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  const [isStatModalOpen, setIsStatModalOpen] = useState(false)
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false)
  
  const [editingStat, setEditingStat] = useState<any>(null)
  const [editingStory, setEditingStory] = useState<any>(null)

  const [statForm, setStatForm] = useState({
    stat_label: '',
    stat_value: '',
    description: '',
    is_active: true
  })

  const [storyForm, setStoryForm] = useState({
    title: '',
    content: '',
    beneficiary_name: '',
    is_featured: false,
    image: null
  })

  const loadData = async () => {
    try {
      const [statsData, storiesData] = await Promise.all([
        fetchApi('/impact/stats/?admin=true'),
        fetchApi('/impact/stories/?admin=true')
      ])
      setStats(statsData.results || statsData)
      setStories(storiesData.results || storiesData)
    } catch (err) {
      console.error('Failed to load impact data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Stats CRUD
  const openAddStat = () => {
    setEditingStat(null)
    setStatForm({ stat_label: '', stat_value: '', description: '', is_active: true })
    setIsStatModalOpen(true)
  }

  const openEditStat = (stat: any) => {
    setEditingStat(stat)
    setStatForm({
      stat_label: stat.stat_label,
      stat_value: stat.stat_value,
      description: stat.description || '',
      is_active: stat.is_active
    })
    setIsStatModalOpen(true)
  }

  const handleStatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingStat) {
        await fetchApi(`/impact/stats/${editingStat.id}/?admin=true`, {
          method: 'PATCH',
          body: JSON.stringify(statForm)
        })
      } else {
        await fetchApi('/impact/stats/?admin=true', {
          method: 'POST',
          body: JSON.stringify(statForm)
        })
      }
      setIsStatModalOpen(false)
      loadData()
    } catch (err: any) {
      alert(`Stat Save Failed: ${err.message}`)
    }
  }

  const deleteStat = async (id: number) => {
    if (!confirm('Delete this metric?')) return
    try {
      await fetchApi(`/impact/stats/${id}/?admin=true`, { method: 'DELETE' })
      loadData()
    } catch (err: any) {
      alert(`Delete Failed: ${err.message}`)
    }
  }

  // Stories CRUD
  const openAddStory = () => {
    setEditingStory(null)
    setStoryForm({ title: '', content: '', beneficiary_name: '', is_featured: false, image: null })
    setIsStoryModalOpen(true)
  }

  const openEditStory = (story: any) => {
    setEditingStory(story)
    setStoryForm({
      title: story.title,
      content: story.content,
      beneficiary_name: story.beneficiary_name || '',
      is_featured: story.is_featured,
      image: null
    })
    setIsStoryModalOpen(true)
  }

  const handleStorySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingStory) {
        await fetchApi(`/impact/stories/${editingStory.id}/`, {
          method: 'PATCH',
          body: JSON.stringify(storyForm)
        })
      } else {
        await fetchApi('/impact/stories/', {
          method: 'POST',
          body: JSON.stringify(storyForm)
        })
      }
      setIsStoryModalOpen(false)
      loadData()
    } catch (err: any) {
      alert(`Story Save Failed: ${err.message}`)
    }
  }

  const deleteStory = async (id: number) => {
    if (!confirm('Delete this story?')) return
    try {
      await fetchApi(`/impact/stories/${id}/`, { method: 'DELETE' })
      loadData()
    } catch (err: any) {
      alert(`Delete Failed: ${err.message}`)
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
    <div className="space-y-12 max-w-7xl mx-auto font-sans">
      <PageHeader
        title="Impact & Results"
        subtitle="Numbers and stories that demonstrate WNETF effectiveness"
      />

      {/* Metrics Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-brand-navy flex items-center gap-3">
                <BarChart3 size={18} className="text-brand-blue" /> Impact Metrics
            </h3>
            <button 
                onClick={openAddStat}
                className="text-[10px] font-black uppercase tracking-widest text-brand-blue bg-brand-light px-4 py-2 rounded-xl border border-brand-blue/10 hover:bg-brand-blue hover:text-white transition-all"
            >
                + New Metric
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map(s => (
                <div key={s.id} className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm group hover:shadow-xl hover:shadow-gray-200/50 transition-all relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{s.stat_label}</p>
                        <h4 className="text-3xl font-black text-brand-navy mb-1">{s.stat_value}</h4>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter line-clamp-1">{s.description}</p>
                        
                        <div className="mt-6 flex items-center gap-2 pt-6 border-t border-slate-50">
                            <button onClick={() => openEditStat(s)} className="p-2 text-slate-300 hover:text-brand-blue transition-colors"><Edit2 size={16} /></button>
                            <button onClick={() => deleteStat(s.id)} className="p-2 text-slate-300 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                            {!s.is_active && <Badge status="hidden" />}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Stories Section */}
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-brand-navy flex items-center gap-3">
                <Quote size={18} className="text-brand-blue" /> Scholar Stories
            </h3>
            <button 
                onClick={openAddStory}
                className="text-[10px] font-black uppercase tracking-widest text-brand-blue bg-brand-light px-4 py-2 rounded-xl border border-brand-blue/10 hover:bg-brand-blue hover:text-white transition-all"
            >
                + Add Story
            </button>
        </div>

        <TableCard title="Impact Stories">
            <Table headers={['Story Title', 'Beneficiary', 'Content Snippet', 'Actions']}>
                {stories.map(story => (
                    <TRow key={story.id}>
                        <TCellPrimary primary={story.title} />
                        <TCell>{story.beneficiary_name}</TCell>
                        <TCell>
                            <div className="text-sm text-slate-500 line-clamp-1 max-w-md">{story.content}</div>
                        </TCell>
                        <TCell>
                            <div className="flex items-center gap-2 justify-end">
                                <button onClick={() => openEditStory(story)} className="p-2 text-brand-blue hover:bg-brand-light rounded-lg transition-colors"><Edit2 size={16} /></button>
                                <button onClick={() => deleteStory(story.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                            </div>
                        </TCell>
                    </TRow>
                ))}
            </Table>
        </TableCard>
      </div>

      {/* Stat Modal */}
      <Modal isOpen={isStatModalOpen} onClose={() => setIsStatModalOpen(false)} title={editingStat ? 'Edit Metric' : 'New Metric'}>
          <form onSubmit={handleStatSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Metric Label</label>
                    <input type="text" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-medium" value={statForm.stat_label} onChange={e => setStatForm({...statForm, stat_label: e.target.value})} placeholder="e.g. Students Supported" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Value (Textual)</label>
                    <input type="text" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-black text-brand-blue" value={statForm.stat_value} onChange={e => setStatForm({...statForm, stat_value: e.target.value})} placeholder="e.g. 50+" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Description</label>
                    <textarea rows={2} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-medium" value={statForm.description} onChange={e => setStatForm({...statForm, description: e.target.value})} placeholder="Extra details about this metric..." />
                  </div>
              </div>
              <button type="submit" className="w-full bg-brand-navy hover:bg-brand-blue text-white font-black text-[10px] uppercase tracking-widest py-5 rounded-2xl transition-all shadow-xl shadow-brand-navy/10">Save Metric</button>
          </form>
      </Modal>

      {/* Story Modal */}
      <Modal isOpen={isStoryModalOpen} onClose={() => setIsStoryModalOpen(false)} title={editingStory ? 'Edit Story' : 'New Scholar Story'}>
          <form onSubmit={handleStorySubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Story Title</label>
                    <input type="text" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-medium" value={storyForm.title} onChange={e => setStoryForm({...storyForm, title: e.target.value})} />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Beneficiary Name</label>
                    <input type="text" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-medium" value={storyForm.beneficiary_name} onChange={e => setStoryForm({...storyForm, beneficiary_name: e.target.value})} />
                  </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Story Content</label>
                <textarea rows={8} required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-medium" value={storyForm.content} onChange={e => setStoryForm({...storyForm, content: e.target.value})} />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="is_featured" checked={storyForm.is_featured} onChange={e => setStoryForm({...storyForm, is_featured: e.target.checked})} className="w-4 h-4" />
                <label htmlFor="is_featured" className="text-[10px] font-black uppercase tracking-widest text-slate-600">Featured Story</label>
              </div>
              <button type="submit" className="w-full bg-brand-navy hover:bg-brand-blue text-white font-black text-[10px] uppercase tracking-widest py-5 rounded-2xl transition-all shadow-xl shadow-brand-navy/10">Save Story</button>
          </form>
      </Modal>

    </div>
  )
}
