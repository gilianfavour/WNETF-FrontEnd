'use client'

// app/admin/(dashboard)/messages/page.tsx

import { useState, useEffect } from 'react'
import { Trash2, Mail, User, Clock, CheckCircle2 } from 'lucide-react'
import { fetchApi } from '~/lib/api'
import { Badge, TableCard, Table, TRow, TCell, TCellPrimary, PageHeader, Modal } from '~/admin/ui'

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<any>(null)

  const loadData = async () => {
    try {
      const data = await fetchApi('/contact/?admin=true')
      setMessages(data.results || data)
    } catch (err) {
      console.error('Failed to load messages:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this message?')) return
    try {
      await fetchApi(`/contact/${id}/?admin=true`, { method: 'DELETE' })
      loadData()
    } catch (err: any) {
      alert(`Delete Failed: ${err.message}`)
    }
  }

  const markAsRead = async (id: number) => {
    try {
      await fetchApi(`/contact/${id}/?admin=true`, {
        method: 'PATCH',
        body: JSON.stringify({ is_read: true })
      })
      loadData()
      if (selectedMessage?.id === id) setSelectedMessage({...selectedMessage, is_read: true})
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
        title="Contact Messages"
        subtitle="Review and respond to inquiries from the public"
      />

      <TableCard title="Inbox">
        <Table headers={['Sender', 'Subject', 'Date', 'Status', 'Actions']}>
          {messages.map(m => (
            <TRow key={m.id} className={m.is_read ? 'opacity-60' : 'bg-blue-50/30'}>
              <TCellPrimary primary={m.name} secondary={m.email} />
              <TCell>
                <div className="text-sm font-bold text-slate-700 truncate max-w-[200px]">{m.subject}</div>
              </TCell>
              <TCell className="text-slate-500 font-medium">{new Date(m.created_at).toLocaleDateString()}</TCell>
              <TCell>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border w-fit ${m.is_read ? 'bg-slate-50 text-slate-400 border-slate-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                    {m.is_read ? 'Read' : 'New'}
                </div>
              </TCell>
              <TCell>
                <div className="flex items-center gap-2 justify-end">
                   <button 
                    onClick={() => setSelectedMessage(m)}
                    className="p-2 text-brand-blue hover:bg-brand-light rounded-lg transition-colors"
                  >
                    <Mail size={18} />
                   </button>
                   <button 
                    onClick={() => handleDelete(m.id)}
                    className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </TCell>
            </TRow>
          ))}
          {messages.length === 0 && (
             <TRow>
               <td colSpan={5} className="px-8 py-20 text-center text-slate-400 italic font-medium">No messages found.</td>
             </TRow>
          )}
        </Table>
      </TableCard>

      <Modal 
        isOpen={!!selectedMessage} 
        onClose={() => setSelectedMessage(null)} 
        title="View Message"
      >
        {selectedMessage && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand-blue shadow-sm">
                        <User size={20} />
                    </div>
                    <div>
                        <h4 className="text-lg font-black text-brand-navy">{selectedMessage.name}</h4>
                        <p className="text-xs text-slate-500 font-medium">{selectedMessage.email}</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">
                        <Clock size={12} /> {new Date(selectedMessage.created_at).toLocaleDateString()}
                    </div>
                    <Badge status={selectedMessage.is_read ? 'read' : 'unread'} />
                </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Subject</p>
                <p className="text-brand-navy font-bold text-lg mb-6">{selectedMessage.subject}</p>
                
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Message Body</p>
                <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
            </div>

            <div className="flex gap-4 pt-4 border-t border-slate-50">
                {!selectedMessage.is_read && (
                    <button 
                        onClick={() => markAsRead(selectedMessage.id)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-widest py-4 rounded-2xl transition-all shadow-lg shadow-emerald-600/10 flex items-center justify-center gap-2"
                    >
                        <CheckCircle2 size={16} /> Mark as Read
                    </button>
                )}
                <button 
                  onClick={() => setSelectedMessage(null)}
                  className="flex-1 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all underline decoration-slate-200 underline-offset-8"
                >
                  Close
                </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
