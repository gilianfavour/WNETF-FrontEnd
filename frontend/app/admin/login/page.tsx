'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'
import Link from 'next/link'
import { fetchApi } from '~/lib/api'
import { Mail, Lock, ArrowRight, Shield } from 'lucide-react'

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

    setTimeout(async () => {
      try {
        const result = await fetchApi('/management/login/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, password }),
        })

        document.cookie = 'wnetf_admin_auth=true; path=/; max-age=86400; SameSite=Lax'
        document.cookie = `wnetf_user_name=${encodeURIComponent(result.full_name)}; path=/; max-age=86400; SameSite=Lax`
        document.cookie = `wnetf_user_role=${encodeURIComponent(result.role)}; path=/; max-age=86400; SameSite=Lax`

        router.push(from)
      } catch (err: any) {
        const msg = err?.message || ''
        setError(msg.includes('error:') ? msg.replace('error: ', '') : 'Invalid credentials or unauthorized account.')
        setLoading(false)
      }
    }, 500)
  }

  return (
    <div className="min-h-screen flex font-sans">

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex w-[52%] bg-brand-navy flex-col justify-between p-14 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/[0.03] pointer-events-none" />
        <div className="absolute -bottom-40 -right-20 w-[600px] h-[600px] rounded-full bg-white/[0.03] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-blue/5 pointer-events-none" />

        {/* Logo */}
        <div>
          <div className="w-36 bg-white rounded-2xl p-4 shadow-lg flex items-center justify-center">
            <img src="/images/wnetf.png" alt="WNETF" className="w-full h-auto object-contain" />
          </div>
        </div>

        {/* Center copy */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-1.5 mb-7">
            <Shield size={12} className="text-brand-accent" />
            <span className="text-white/70 text-[10px] font-semibold uppercase tracking-widest">Admin Portal</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-5">
            Manage. <span className="text-brand-accent">Empower.</span> Impact.
          </h1>
          <p className="text-white/70 text-[13px] font-normal leading-relaxed max-w-xs">
            Central hub for managing WNETF scholars, programs, and community initiatives.
          </p>
        </div>

        {/* Bottom stats strip */}
        <div className="flex items-center gap-8 border-t border-white/10 pt-8">
          {[
            { value: '500+', label: 'Scholars Supported' },
            { value: '12+', label: 'Years of Impact' },
            { value: '4', label: 'Districts Covered' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-white text-xl font-black">{s.value}</p>
              <p className="text-white/60 text-[11px] font-medium mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 bg-slate-50 flex flex-col items-center justify-center px-6 py-16 relative">
        {/* Mobile logo */}
        <div className="lg:hidden mb-10">
          <div className="w-36 bg-white rounded-3xl p-4 shadow-xl mx-auto">
            <img src="/images/wnetf.png" alt="WNETF" className="w-full h-auto" />
          </div>
        </div>

        <div className="w-full max-w-[420px]">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-brand-navy tracking-tight">Welcome back</h2>
            <p className="text-slate-400 text-[13px] font-normal mt-1.5">Sign in to your administrator account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">

            {/* Identifier */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-[0.18em] text-slate-400 mb-2 ml-1">
                Username or Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={e => { setIdentifier(e.target.value); setError('') }}
                  placeholder="superadmin or admin@wnetf.org"
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-sm text-brand-navy placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all font-medium shadow-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-[0.18em] text-slate-400 mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  placeholder="••••••••••"
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-sm text-brand-navy placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all font-medium shadow-sm"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl px-5 py-4">
                <span className="text-red-400 mt-0.5 text-base leading-none">⚠</span>
                <p className="text-[12px] font-semibold text-red-600">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-navy hover:bg-brand-blue text-white font-black text-[11px] uppercase tracking-[0.2em] py-5 rounded-2xl transition-all shadow-xl shadow-brand-navy/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating…
                </>
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight size={15} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

          {/* Back link */}
          <div className="mt-10 text-center">
            <Link
              href="/"
              className="text-slate-400 hover:text-brand-navy text-[11px] font-bold uppercase tracking-widest transition-colors inline-flex items-center gap-2"
            >
              ← Return to Website
            </Link>
          </div>
        </div>

        {/* Bottom badge */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-300">
            <Shield size={11} />
            Secured Administrator Access
          </span>
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
