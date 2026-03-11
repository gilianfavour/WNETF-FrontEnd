'use client'

// app/admin/login/page.tsx

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleLogin() {
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    setLoading(true)
    setError('')

    // TODO: replace with real Django API call:
    // const res = await fetch('/api/auth/login/', { ... })
    // if (!res.ok) { setError(...); setLoading(false); return }

    // Set cookie to mark as logged in, then redirect
    document.cookie = 'wnetf_admin_auth=true; path=/; max-age=86400; SameSite=Lax'
    router.push(from)
  }

  return (
    <div className="min-h-screen bg-[#080d14] flex items-center justify-center px-4 relative overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[400px] bg-[#16a05a]/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-[#16a05a]/05 rounded-full blur-[80px]" />
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[400px]">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl text-white font-bold text-xl mb-4"
            style={{ background: 'linear-gradient(135deg, #16a05a, #0d7a42)', boxShadow: '0 0 32px rgba(22,160,90,0.4)' }}
          >
            W
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">WNETF Admin</h1>
          <p className="text-sm text-gray-400 mt-1">West Nile Education Trust Fund</p>
        </div>

        <div className="bg-[#0f1623] border border-white/[0.07] rounded-2xl p-8 shadow-2xl">
          <div className="space-y-5">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder="admin@wnetf.com"
                className="w-full bg-[#161f2e] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#16a05a] transition-colors font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="••••••••"
                className="w-full bg-[#161f2e] border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#16a05a] transition-colors"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-2.5">{error}</p>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#16a05a] hover:bg-[#13a050] text-white font-semibold py-3 rounded-xl text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              style={{ boxShadow: loading ? 'none' : '0 0 20px rgba(22,160,90,0.3)' }}
            >
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">WNETF © {new Date().getFullYear()} · Empowering Dreams</p>
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