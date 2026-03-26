'use client'

// app/admin/login/page.tsx

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'
import Link from 'next/link'
import { fetchApi } from '~/lib/api'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/admin'

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleLogin(e?: React.FormEvent) {
    if (e) e.preventDefault()
    if (!identifier || !password) {
      setError('Please enter your credentials.')
      return
    }
    setLoading(true)
    setError('')

    // Authenticate against database
    setTimeout(async () => {
      let members = []
      let apiError = null

      try {
        const teamData = await fetchApi('/management/team/')
        members = teamData.results || teamData
      } catch (err: any) {
        console.error('Login API error:', err)
        apiError = err.message
      }
      
      // Search by email or full name AND validate password
      let user = members.find((m: any) => 
        (m.email.toLowerCase() === identifier.toLowerCase() || 
         m.full_name.toLowerCase() === identifier.toLowerCase()) &&
        String(m.password) === password
      )

      // Fallback for emergency if identifier is 'superadmin' and password matches 'admin123'
      if (!user && identifier.toLowerCase() === 'superadmin' && password === 'admin123') {
        user = {
          full_name: 'WNETF Super Admin',
          role: 'Super Admin',
          is_active: true
        }
      }

      if (!user || !user.is_active) {
        setError(apiError ? `Service Error: ${apiError}` : 'Access Denied. Invalid credentials or unauthorized account.')
        setLoading(false)
        return
      }

      // Set auth cookies from data
      document.cookie = 'wnetf_admin_auth=true; path=/; max-age=86400; SameSite=Lax'
      document.cookie = `wnetf_user_name=${encodeURIComponent(user.full_name)}; path=/; max-age=86400; SameSite=Lax`
      document.cookie = `wnetf_user_role=${encodeURIComponent(user.role)}; path=/; max-age=86400; SameSite=Lax`
      
      router.push(from)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 relative overflow-hidden font-sans">

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#032B53 1px, transparent 1px), linear-gradient(90deg, #032B53 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full max-w-[440px]">
        {/* Brand */}
        <div className="text-center mb-10">
          <div className="w-52 bg-white rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-gray-200/50 overflow-hidden p-6 border border-gray-50">
            <img src="/images/wnetf.png" alt="WNETF" className="w-full h-auto object-contain" />
          </div>
          <h1 className="text-3xl font-black text-brand-navy tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 font-medium mt-2">WNETF Administrator Portal</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Username or Email</label>
              <input
                type="text"
                required
                value={identifier}
                onChange={e => { setIdentifier(e.target.value); setError('') }}
                placeholder="Enter Name or Email"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm text-brand-navy placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm text-brand-navy placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all font-medium"
              />
            </div>

            {error && (
              <p className="text-[11px] font-bold text-red-500 bg-red-50 border border-red-100 rounded-2xl px-5 py-3">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-navy hover:bg-brand-blue text-white font-black text-[10px] uppercase tracking-[0.2em] py-5 rounded-2xl transition-all shadow-xl shadow-brand-navy/20 active:scale-95 disabled:opacity-50 mt-4"
            >
              {loading ? 'Authenticating…' : 'Sign In to Dashboard'}
            </button>
          </form>
          
          <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-10">
            Secure Administrator Access
          </p>
        </div>

        <div className="text-center mt-10">
           <Link href="/" className="text-slate-400 hover:text-brand-navy text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
             ← Return to Home
           </Link>
        </div>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
