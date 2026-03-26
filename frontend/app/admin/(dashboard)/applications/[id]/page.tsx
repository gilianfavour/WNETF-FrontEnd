'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  User, 
  GraduationCap, 
  MapPin, 
  FileText, 
  Download,
  ExternalLink
} from 'lucide-react'
import { fetchApi } from '~/lib/api'
import { Badge, StatCard } from '~/admin/ui'

export default function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [application, setApplication] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    async function loadApplication() {
      try {
        const data = await fetchApi(`/applications/${id}/`)
        setApplication(data)
      } catch (err) {
        console.error('Failed to load application:', err)
      } finally {
        setLoading(false)
      }
    }
    loadApplication()
  }, [id])

  async function updateStatus(newStatus: string) {
    setUpdating(true)
    try {
      const updated = await fetchApi(`/applications/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      })
      setApplication(updated)
    } catch (err) {
      console.error('Failed to update status:', err)
      alert('Error updating status. Please try again.')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!application) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 mb-4">Application not found.</p>
        <button onClick={() => router.back()} className="text-primary-400 font-bold uppercase tracking-widest text-xs">← Go Back</button>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-slate-400 hover:text-brand-navy shadow-sm transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-3xl font-black text-brand-navy tracking-tight">{application.full_name}</h2>
            <p className="text-slate-500 text-sm font-medium">Applied on {new Date(application.created_at).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge status={application.status} />
          {application.status === 'pending' && (
            <button 
              disabled={updating}
              onClick={() => updateStatus('under_review')}
              className="bg-brand-blue hover:bg-brand-navy text-white text-[10px] font-black uppercase tracking-widest px-5 py-3 rounded-2xl shadow-lg shadow-brand-blue/20 transition-all disabled:opacity-50"
            >
              Start Review
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Info Sections */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section: Personal */}
          <section className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-blue mb-8 flex items-center gap-2">
              <User size={14} strokeWidth={3} /> Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Email</p>
                <p className="text-brand-navy font-bold">{application.email}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Phone</p>
                <p className="text-brand-navy font-bold">{application.phone}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Date of Birth</p>
                <p className="text-brand-navy font-bold">{application.dob}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Location</p>
                <p className="text-brand-navy font-bold">{application.district}{application.other_district ? `, ${application.other_district}` : ''}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Guardian Name & Address</p>
                <p className="text-brand-navy font-bold">{application.guardian_name} — {application.address}</p>
              </div>
            </div>
          </section>

          {/* Section: Academic */}
          <section className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-blue mb-8 flex items-center gap-2">
              <GraduationCap size={16} strokeWidth={3} /> Academic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <div className="md:col-span-2">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">University</p>
                <p className="text-brand-navy text-xl font-black tracking-tight">{application.university}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Course</p>
                <p className="text-brand-navy font-bold">{application.course}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Student / Reg Number</p>
                <p className="text-brand-navy font-mono font-bold text-sm tracking-tighter">{application.student_number} / {application.university_reg_number}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Academic Achievements</p>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mt-2">
                   <p className="text-slate-600 text-sm font-medium leading-relaxed whitespace-pre-wrap">{application.grades}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Personal Statement */}
          <section className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-blue mb-8 flex items-center gap-2">
              <FileText size={14} strokeWidth={3} /> Personal Statement
            </h3>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8">
              <p className="text-slate-600 text-sm font-medium leading-relaxed whitespace-pre-wrap">{application.personal_statement}</p>
            </div>
          </section>
        </div>

        {/* Right Col: Actions & Sidebar info */}
        <div className="space-y-6">
          
          {/* Status Controls */}
          <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm lg:sticky lg:top-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 items-center flex gap-2">Decision Actions</h4>
            
            <div className="space-y-4">
              <button 
                disabled={updating || application.status === 'approved'}
                onClick={() => updateStatus('approved')}
                className="w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-lg shadow-emerald-600/10 disabled:opacity-30"
              >
                <CheckCircle2 size={16} strokeWidth={3} /> Approve Scholarship
              </button>
              
              <button 
                disabled={updating || application.status === 'rejected'}
                onClick={() => updateStatus('rejected')}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-red-100 hover:bg-red-50 text-red-600 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all disabled:opacity-30"
              >
                <XCircle size={16} strokeWidth={3} /> Reject Application
              </button>

              <button 
                disabled={updating || application.status === 'pending'}
                onClick={() => updateStatus('pending')}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-amber-100 hover:bg-amber-50 text-amber-600 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all disabled:opacity-30"
              >
                <Clock size={16} strokeWidth={3} /> Revert to Pending
              </button>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-50">
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Supporting Document</h4>
               <a 
                 href={application.attachment} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-4 bg-brand-light border border-blue-100 hover:border-brand-blue/30 p-5 rounded-2xl transition-all group"
               >
                 <div className="w-12 h-12 rounded-2xl bg-white border border-blue-100 flex items-center justify-center text-brand-blue shadow-sm">
                    <Download size={20} />
                 </div>
                 <div className="flex-1 min-w-0">
                    <p className="text-brand-navy text-[11px] font-black">View Document</p>
                    <p className="text-slate-400 text-[10px] font-bold">PDF / Attachment</p>
                 </div>
                 <ExternalLink size={14} strokeWidth={3} className="text-slate-300 group-hover:text-brand-blue transition-colors" />
               </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
