// src/components/admin/ui.tsx
// Reusable UI primitives for the admin dashboard

import React from 'react'

// ── Badge ────────────────────────────────────────────────────────────────────
const badgeStyles: Record<string, string> = {
  pending:    'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20',
  reviewing:  'bg-blue-400/10  text-blue-400   border border-blue-400/20',
  approved:   'bg-green-400/10 text-green-400  border border-green-400/20',
  rejected:   'bg-red-400/10   text-red-400    border border-red-400/20',
  active:     'bg-green-400/10 text-green-400  border border-green-400/20',
  graduated:  'bg-blue-400/10  text-blue-400   border border-blue-400/20',
  suspended:  'bg-red-400/10   text-red-400    border border-red-400/20',
  full:       'bg-green-400/10 text-green-400  border border-green-400/20',
  partial:    'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20',
  published:  'bg-green-400/10 text-green-400  border border-green-400/20',
  draft:      'bg-white/5      text-gray-400   border border-white/10',
  verified:   'bg-green-400/10 text-green-400  border border-green-400/20',
  unverified: 'bg-white/5      text-gray-400   border border-white/10',
}

export function Badge({ status }: { status: string }) {
  const cls = badgeStyles[status.toLowerCase()] ?? 'bg-white/5 text-gray-400 border border-white/10'
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold font-mono capitalize ${cls}`}>
      {status}
    </span>
  )
}

// ── Stat Card ────────────────────────────────────────────────────────────────
const statColorMap: Record<string, { border: string; bg: string; value: string }> = {
  green:  { border: 'border-green-500/20',  bg: 'from-green-500/10',  value: 'text-green-400'  },
  blue:   { border: 'border-blue-500/20',   bg: 'from-blue-500/10',   value: 'text-blue-400'   },
  amber:  { border: 'border-amber-500/20',  bg: 'from-amber-500/10',  value: 'text-amber-400'  },
  purple: { border: 'border-purple-500/20', bg: 'from-purple-500/10', value: 'text-purple-400' },
}

export function StatCard({ label, value, sub, color = 'green' }: {
  label: string; value: string; sub?: string; color?: string
}) {
  const c = statColorMap[color] ?? statColorMap.green
  return (
    <div className={`rounded-2xl border ${c.border} bg-gradient-to-br ${c.bg} to-transparent p-5`}>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">{label}</p>
      <p className={`text-3xl font-bold font-mono tracking-tight ${c.value}`}>{value}</p>
      {sub && <p className="text-xs text-gray-500 mt-2">{sub}</p>}
    </div>
  )
}

// ── Table Card ───────────────────────────────────────────────────────────────
export function TableCard({ title, action, children }: {
  title: string; action?: React.ReactNode; children: React.ReactNode
}) {
  return (
    <div className="bg-[#0f1623] border border-white/[0.07] rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        {action}
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  )
}

// ── Table ────────────────────────────────────────────────────────────────────
export function Table({ headers, children, emptyMessage = 'No data found.' }: {
  headers: string[]; children: React.ReactNode; emptyMessage?: string
}) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-white/[0.07]">
          {headers.map(h => (
            <th key={h} className="text-left text-[11px] font-semibold uppercase tracking-widest text-gray-500 px-5 py-3">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-white/[0.04]">
        {children}
      </tbody>
    </table>
  )
}

export function TRow({ children }: { children: React.ReactNode }) {
  return <tr className="hover:bg-white/[0.02] transition-colors">{children}</tr>
}

export function TCell({ children, mono }: { children: React.ReactNode; mono?: boolean }) {
  return (
    <td className={`px-5 py-3.5 text-gray-300 ${mono ? 'font-mono' : ''}`}>
      {children}
    </td>
  )
}

export function TCellPrimary({ primary, secondary }: { primary: string; secondary?: string }) {
  return (
    <td className="px-5 py-3.5">
      <p className="text-white font-medium">{primary}</p>
      {secondary && <p className="text-gray-500 text-xs mt-0.5">{secondary}</p>}
    </td>
  )
}

// ── Page Header ──────────────────────────────────────────────────────────────
export function PageHeader({ title, subtitle, action }: {
  title: string; subtitle?: string; action?: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
        {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

// ── Toolbar ──────────────────────────────────────────────────────────────────
export function Toolbar({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2 flex-wrap mb-4">{children}</div>
}

export function SearchInput({ placeholder }: { placeholder?: string }) {
  return (
    <input
      type="text"
      placeholder={placeholder ?? 'Search…'}
      className="bg-[#0f1623] border border-white/[0.07] rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#16a05a] w-56 transition-colors"
    />
  )
}

export function FilterBtn({ label, active }: { label: string; active?: boolean }) {
  return (
    <button className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
      active
        ? 'bg-[#16a05a]/20 border border-[#16a05a]/40 text-[#16a05a]'
        : 'bg-[#0f1623] border border-white/[0.07] text-gray-400 hover:text-white'
    }`}>
      {label}
    </button>
  )
}

export function AddButton({ label }: { label: string }) {
  return (
    <button className="bg-[#16a05a] hover:bg-[#13a050] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all hover:shadow-[0_0_16px_rgba(22,160,90,0.4)]">
      {label}
    </button>
  )
}

export function ActionLink({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-5 py-3.5">
      <span className="text-xs text-[#16a05a] hover:opacity-70 cursor-pointer transition-opacity font-medium">
        {children}
      </span>
    </td>
  )
}