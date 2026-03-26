// src/components/admin/ui.tsx
// Reusable UI primitives for the admin dashboard

import React from 'react'

// ── Badge ────────────────────────────────────────────────────────────────────
const badgeStyles: Record<string, string> = {
  pending:    'bg-amber-50  text-amber-700  border-amber-200',
  reviewing:  'bg-blue-50   text-blue-700   border-blue-200',
  approved:   'bg-emerald-50 text-emerald-700 border-emerald-200',
  rejected:   'bg-red-50     text-red-700     border-red-200',
  active:     'bg-emerald-50 text-emerald-700 border-emerald-200',
  graduated:  'bg-sky-50    text-sky-700    border-sky-200',
  suspended:  'bg-slate-50  text-slate-700  border-slate-200',
  full:       'bg-emerald-50 text-emerald-700 border-emerald-200',
  partial:    'bg-amber-50  text-amber-700  border-amber-200',
  published:  'bg-emerald-50 text-emerald-700 border-emerald-200',
  draft:      'bg-slate-50  text-slate-500  border-slate-200',
}

export function Badge({ status }: { status: string }) {
  const s = status.toLowerCase()
  const cls = badgeStyles[s] ?? 'bg-gray-50 text-gray-600 border-gray-200'
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${cls}`}>
      {status}
    </span>
  )
}

// ── Stat Card ────────────────────────────────────────────────────────────────
const statColorMap: Record<string, { border: string; bg: string; value: string }> = {
  green:  { border: 'border-emerald-100', bg: 'bg-emerald-50',  value: 'text-emerald-700' },
  blue:   { border: 'border-blue-100',    bg: 'bg-blue-50',     value: 'text-blue-700'    },
  amber:  { border: 'border-amber-100',   bg: 'bg-amber-50',    value: 'text-amber-700'   },
  purple: { border: 'border-purple-100', bg: 'bg-purple-50',   value: 'text-purple-700'  },
}

export function StatCard({ label, value, sub, color = 'green' }: {
  label: string; value: string; sub?: string; color?: string
}) {
  const c = statColorMap[color] ?? statColorMap.blue
  return (
    <div className={`group rounded-[2.5rem] border ${c.border} bg-white p-8 transition-all hover:shadow-2xl hover:shadow-gray-200/60`}>
      <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-5">{label}</p>
      <div>
        <p className="text-4xl font-extrabold tracking-tight text-brand-navy">{value}</p>
        {sub && <p className="text-[13px] text-slate-500 mt-2.5 font-medium flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${c.bg} border ${c.border}`} />
          {sub}
        </p>}
      </div>
    </div>
  )
}

// ── Table Card ───────────────────────────────────────────────────────────────
export function TableCard({ title, action, children }: {
  title: string; action?: React.ReactNode; children: React.ReactNode
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-8 py-6 border-b border-gray-50">
        <h3 className="text-base font-black text-brand-navy tracking-tight">{title}</h3>
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
        <tr className="bg-slate-50/70">
          {headers.map(h => (
            <th key={h} className="text-left text-[11px] font-bold uppercase tracking-widest text-slate-400 px-8 py-5">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {children}
      </tbody>
    </table>
  )
}

export function TRow({ children }: { children: React.ReactNode }) {
  return <tr className="hover:bg-slate-50/40 transition-colors group">{children}</tr>
}

export function TCell({ children, mono, className = '' }: { children: React.ReactNode; mono?: boolean; className?: string }) {
  return (
    <td className={`px-8 py-6 text-[14px] text-slate-600 font-medium ${mono ? 'font-mono' : ''} ${className}`}>
      {children}
    </td>
  )
}

export function TCellPrimary({ primary, secondary }: { primary: string; secondary?: string }) {
  return (
    <td className="px-8 py-6">
      <p className="text-brand-navy text-[15px] font-bold tracking-tight">{primary}</p>
      {secondary && <p className="text-slate-400 text-[13px] font-medium mt-1">{secondary}</p>}
    </td>
  )
}

// ── Page Header ──────────────────────────────────────────────────────────────
export function PageHeader({ title, subtitle, action }: {
  title: string; subtitle?: string; action?: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between mb-10 gap-4 flex-wrap">
      <div>
        <h2 className="text-4xl font-extrabold tracking-tight text-brand-navy">{title}</h2>
        {subtitle && <p className="text-base text-slate-500 font-medium mt-1.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

// ── Toolbar ──────────────────────────────────────────────────────────────────
export function Toolbar({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-3 flex-wrap mb-6">{children}</div>
}

export function SearchInput({ placeholder }: { placeholder?: string }) {
  return (
    <input
      type="text"
      placeholder={placeholder ?? 'Search…'}
      className="bg-white border border-gray-200 rounded-[1.25rem] px-6 py-3.5 text-sm font-medium text-brand-navy placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue w-80 transition-all shadow-sm"
    />
  )
}

export function FilterBtn({ label, active }: { label: string; active?: boolean }) {
  return (
    <button className={`px-6 py-3.5 rounded-[1.25rem] text-[11px] font-bold uppercase tracking-widest transition-all ${
      active
        ? 'bg-brand-navy text-white shadow-xl shadow-brand-navy/20'
        : 'bg-white border border-gray-200 text-slate-500 hover:border-brand-navy/30 hover:text-brand-navy'
    }`}>
      {label}
    </button>
  )
}

export function AddButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="bg-brand-blue hover:bg-brand-navy text-white text-[10px] font-black uppercase tracking-[0.15em] px-8 py-4 rounded-2xl transition-all shadow-lg shadow-brand-blue/20 active:scale-95"
    >
      {label}
    </button>
  )
}

import Link from 'next/link'

export function ActionLink({ children, href }: { children: React.ReactNode; href?: string }) {
  const content = (
    <span className="text-[10px] font-black uppercase tracking-wider text-brand-blue hover:text-brand-navy transition-colors bg-brand-light px-4 py-2 rounded-xl border border-blue-100">
      {children}
    </span>
  )

  return (
    <td className="px-8 py-5 text-right">
      {href ? <Link href={href}>{content}</Link> : content}
    </td>
  )
}

export function Modal({ isOpen, onClose, title, children }: { 
  isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode 
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 pb-20 overflow-y-auto">
      <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
          <h3 className="text-xl font-black text-brand-navy tracking-tight">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-brand-navy font-bold text-xl transition-colors">✕</button>
        </div>
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
