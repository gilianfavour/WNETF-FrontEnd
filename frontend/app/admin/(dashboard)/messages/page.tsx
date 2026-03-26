'use client'

import { useState, useEffect } from 'react'
import { Trash2, Mail, User, Clock, CheckCircle2 } from 'lucide-react'
import { fetchApi } from '~/lib/api'
import { TableCard, Table, TRow, TCell, TCellPrimary, EmptyRow, PageHeader, Modal } from '~/admin/ui'

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<any>(null)

  const loadData = async () => {
    try { const data = await fetchApi('/contact/?admin=true'); setMessages(data.results || data) }
    catch (err) { console.error(err) } finally { setLoading(false) }
  }

  useEffect(() => { loadData() }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this message?')) return
    try { await fetchApi(`/contact/${id}/?admin=true`, { method: 'DELETE' }); loadData() }
    catch (err: any) { alert(`Delete Failed: ${err.message}`) }
  }

  const markAsRead = async (id: number) => {
    try {
      await fetchApi(`/contact/${id}/?admin=true`, { method: 'PATCH', body: JSON.stringify({ is_read: true }) })
      loadData()
      if (selectedMessage?.id === id) setSelectedMessage({ ...selectedMessage, is_read: true })
    } catch (err: any) { alert(`Update Failed: ${err.message}`) }
  }

  if (loading) return <div className="min-h-[400px] flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-7 max-w-7xl mx-auto">
      <PageHeader title="Contact Messages" subtitle="Review and respond to inquiries from the public" />

      <TableCard title="Inbox">
        <Table headers={['Sender', 'Subject', 'Date', 'Status', 'Actions']}>
          {messages.map(m => (
            <TRow key={m.id}>
              <TCellPrimary primary={m.name} secondary={m.email} />
              <TCell>
                <span className={`text-sm truncate max-w-[200px] block ${!m.is_read ? 'font-semibold text-brand-navy' : 'text-slate-600'}`}>{m.subject}</span>
              </TCell>
              <TCell>{new Date(m.created_at).toLocaleDateString()}</TCell>
              <TCell>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${m.is_read ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                  {m.is_read ? 'Read' : 'New'}
                </span>
              </TCell>
              <TCell>
                <div className="flex items-center gap-1 justify-end">
                  <button onClick={() => setSelectedMessage(m)} className="p-2 text-brand-blue hover:bg-brand-light rounded-lg transition-colors"><Mail size={16} /></button>
                  <button onClick={() => handleDelete(m.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div>
              </TCell>
            </TRow>
          ))}
          {messages.length === 0 && <EmptyRow colSpan={5} message="No messages yet. Public contact form submissions will appear here." />}
        </Table>
      </TableCard>

      <Modal isOpen={!!selectedMessage} onClose={() => setSelectedMessage(null)} title="View Message">
        {selectedMessage && (
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-brand-light flex items-center justify-center text-brand-blue">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-base font-semibold text-brand-navy">{selectedMessage.name}</p>
                  <p className="text-sm text-slate-500">{selectedMessage.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-slate-400">
                <Clock size={13} /> {new Date(selectedMessage.created_at).toLocaleDateString()}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Subject</p>
              <p className="text-base font-semibold text-brand-navy mb-4">{selectedMessage.subject}</p>

              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Message</p>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
            </div>

            <div className="flex gap-3 pt-2 border-t border-slate-100">
              {!selectedMessage.is_read && (
                <button
                  onClick={() => markAsRead(selectedMessage.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-all shadow-md"
                >
                  <CheckCircle2 size={15} /> Mark as Read
                </button>
              )}
              <button
                onClick={() => setSelectedMessage(null)}
                className="flex-1 px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
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
