'use client'

// app/admin/(dashboard)/events/page.tsx

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Eye, EyeOff, Calendar, MapPin, Link as LinkIcon } from 'lucide-react'
import { fetchApi } from '~/lib/api'
import { Badge, TableCard, Table, TRow, TCell, TCellPrimary, PageHeader, AddButton, Modal, ActionLink } from '~/admin/ui'

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<any>(null)
  const [viewingEvent, setViewingEvent] = useState<any>(null)
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    is_upcoming: true,
    is_active: true,
    registration_link: ''
  })

  const loadData = async () => {
    setLoading(true)
    try {
      const data = await fetchApi('/events/?admin=true')
      setEvents(data.results || data)
    } catch (err) {
      console.error('Failed to load events:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const openAddModal = () => {
    setEditingEvent(null)
    setFormData({
      title: '',
      description: '',
      date: '',
      location: '',
      is_upcoming: true,
      is_active: true,
      registration_link: ''
    })
    setIsModalOpen(true)
  }

  const openEditModal = (event: any) => {
    setEditingEvent(event)
    // Format date for datetime-local input (YYYY-MM-DDTHH:mm)
    const dateObj = new Date(event.date);
    const formattedDate = dateObj.toISOString().slice(0, 16);
    
    setFormData({
      title: event.title,
      description: event.description,
      date: formattedDate,
      location: event.location,
      is_upcoming: event.is_upcoming,
      is_active: event.is_active,
      registration_link: event.registration_link || ''
    })
    setIsModalOpen(true)
  }

  const openViewModal = (event: any) => {
    setViewingEvent(event)
    setIsDetailsOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Validate date
      if (!formData.date) {
        alert('Please select a date and time for the event.')
        return
      }

      const dateObj = new Date(formData.date);
      if (isNaN(dateObj.getTime())) {
        alert('The selected date is invalid.')
        return
      }

      // Format date correctly for Django (ISO 8601)
      const dateIso = dateObj.toISOString();
      
      // Clean registration_link: trim and only keep if it's a valid URL
      let cleanLink = (formData.registration_link || '').trim();
      if (cleanLink && !cleanLink.startsWith('http://') && !cleanLink.startsWith('https://')) {
        cleanLink = ''; // Not a valid URL, discard it
      }

      const payload: any = { 
        ...formData, 
        date: dateIso,
        registration_link: cleanLink
      };
      
      if (editingEvent) {
        await fetchApi(`/events/${editingEvent.id}/?admin=true`, {
          method: 'PATCH',
          body: JSON.stringify(payload)
        })
      } else {
        await fetchApi('/events/?admin=true', {
          method: 'POST',
          body: JSON.stringify(payload)
        })
      }
      setIsModalOpen(false)
      loadData()
    } catch (err: any) {
      console.error('Failed to save event:', err)
      alert(`Save Failed: ${err.message}`)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this event?')) return
    try {
      await fetchApi(`/events/${id}/?admin=true`, { method: 'DELETE' })
      loadData()
    } catch (err: any) {
      console.error('Failed to delete event:', err)
      alert(`Delete Failed: ${err.message}`)
    }
  }

  const toggleStatus = async (event: any) => {
    try {
      await fetchApi(`/events/${event.id}/?admin=true`, {
        method: 'PATCH',
        body: JSON.stringify({ is_active: !event.is_active })
      })
      loadData()
    } catch (err: any) {
      console.error('Failed to update status:', err)
      alert(`Failed to update status: ${err.message}`)
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
        title="Events"
        subtitle="Manage WNETF events, webinars and community gatherings"
        action={<AddButton label="+ Add Event" onClick={openAddModal} />}
      />

      <TableCard title="Event Records">
        <Table headers={['Event Details', 'Date & Time', 'Location', 'Visibility', 'Actions']}>
          {events.map(e => (
            <TRow key={e.id}>
              <TCellPrimary
                primary={e.title}
                secondary={e.is_upcoming ? 'Upcoming' : 'Past Event'}
              />
              <TCell>
                <div className="text-slate-600 font-medium">
                  {new Date(e.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                </div>
              </TCell>
              <TCell>
                <div className="text-slate-600 font-medium">
                  {e.location}
                </div>
              </TCell>
              <TCell>
                <button 
                  onClick={() => toggleStatus(e)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                    e.is_active 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100' 
                      : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100'
                  }`}
                >
                  {e.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
                  <span className="text-[10px] font-bold uppercase tracking-widest">{e.is_active ? 'Live' : 'Hidden'}</span>
                </button>
              </TCell>
              <TCell>
                <div className="flex items-center gap-2 justify-end">
                  <button 
                    onClick={() => openViewModal(e)}
                    className="p-2 text-slate-400 hover:text-brand-blue hover:bg-brand-light rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye size={18} />
                  </button>
                  <button 
                    onClick={() => openEditModal(e)}
                    className="p-2 text-brand-blue hover:bg-brand-light rounded-lg transition-colors"
                    title="Edit Event"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(e.id)}
                    className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Event"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </TCell>
            </TRow>
          ))}
          {events.length === 0 && (
             <TRow>
               <td colSpan={5} className="px-5 py-10 text-center text-gray-400 italic font-medium">No events found.</td>
             </TRow>
          )}
        </Table>
      </TableCard>

      {/* Details Popup */}
      <Modal 
        isOpen={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)} 
        title="Event Details"
      >
        {viewingEvent && (
          <div className="space-y-6">
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Title</h4>
              <p className="text-lg font-bold text-brand-navy">{viewingEvent.title}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Date & Time</h4>
                <p className="text-sm font-semibold text-slate-700">
                  {new Date(viewingEvent.date).toLocaleString([], { dateStyle: 'long', timeStyle: 'short' })}
                </p>
              </div>
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Location</h4>
                <p className="text-sm font-semibold text-slate-700">{viewingEvent.location}</p>
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Description</h4>
              <div className="bg-slate-50 rounded-2xl p-5 text-sm text-slate-600 leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap">
                {viewingEvent.description}
              </div>
            </div>

            {viewingEvent.registration_link && (
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Registration Link</h4>
                <a 
                  href={viewingEvent.registration_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-blue font-bold text-sm hover:underline break-all"
                >
                  {viewingEvent.registration_link}
                </a>
              </div>
            )}

            <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
               <button 
                  onClick={() => { setIsDetailsOpen(false); openEditModal(viewingEvent); }}
                  className="bg-brand-light text-brand-blue px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-50 hover:bg-blue-100 transition-colors"
               >
                 Edit Instead
               </button>
               <button 
                  onClick={() => setIsDetailsOpen(false)}
                  className="bg-brand-navy text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand-navy/20 active:scale-95 transition-all"
               >
                 Close
               </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit/Add Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingEvent ? 'Edit Event' : 'Add New Event'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Event Title</label>
            <input
              type="text"
              required
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue outline-none transition-all font-medium"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. West Nile Night 2024"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Date & Time</label>
              <input
                type="datetime-local"
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue outline-none transition-all font-medium"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Location</label>
              <input
                type="text"
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue outline-none transition-all font-medium"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Kampala Serena Hotel"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Registration Link (Optional)</label>
            <div className="relative">
              <LinkIcon size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="url"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 py-3 text-sm focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue outline-none transition-all font-medium"
                value={formData.registration_link}
                onChange={e => setFormData({ ...formData, registration_link: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Description</label>
            <textarea
              rows={4}
              required
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue outline-none transition-all font-medium"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Tell us about the event..."
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox"
                className="w-5 h-5 rounded-lg border-2 border-slate-200 text-brand-blue focus:ring-offset-0 focus:ring-0 cursor-pointer"
                checked={formData.is_upcoming}
                onChange={e => setFormData({ ...formData, is_upcoming: e.target.checked })}
              />
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600 group-hover:text-brand-navy">Upcoming Event</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox"
                className="w-5 h-5 rounded-lg border-2 border-slate-200 text-emerald-500 focus:ring-offset-0 focus:ring-0 cursor-pointer"
                checked={formData.is_active}
                onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
              />
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600 group-hover:text-brand-navy">Publicly Visible</span>
            </label>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-50">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all underline decoration-slate-200 underline-offset-8"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-[2] bg-brand-blue hover:bg-brand-navy text-white text-[10px] font-black uppercase tracking-[0.2em] px-8 py-4 rounded-2xl transition-all shadow-xl shadow-brand-blue/20 active:scale-95"
            >
              {editingEvent ? 'Save Changes' : 'Create Event'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
