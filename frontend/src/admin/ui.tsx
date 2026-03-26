// src/admin/ui.tsx — Shared admin UI primitives

import React from 'react'
import Link from 'next/link'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'

// ─── Typography scale used across the dashboard ───────────────────────────
// Page title:    text-2xl font-bold text-brand-navy
// Section title: text-lg font-semibold text-brand-navy
// Table header:  text-sm font-semibold text-slate-600
// Body text:     text-base text-slate-700
// Secondary:     text-sm text-slate-500
// Labels:        text-sm font-semibold text-slate-700
// Tiny meta:     text-xs text-slate-500

// ── Badge ─────────────────────────────────────────────────────────────────
const badgeStyles: Record<string, string> = {
  pending:    'bg-amber-50   text-amber-800   border-amber-200',
  reviewing:  'bg-blue-50    text-blue-800    border-blue-200',
  approved:   'bg-emerald-50 text-emerald-800 border-emerald-200',
  rejected:   'bg-red-50     text-red-800     border-red-200',
  active:     'bg-emerald-50 text-emerald-800 border-emerald-200',
  graduated:  'bg-sky-50     text-sky-800     border-sky-200',
  suspended:  'bg-slate-100  text-slate-700   border-slate-200',
  full:       'bg-emerald-50 text-emerald-800 border-emerald-200',
  partial:    'bg-amber-50   text-amber-800   border-amber-200',
  published:  'bg-emerald-50 text-emerald-800 border-emerald-200',
  draft:      'bg-slate-100  text-slate-600   border-slate-200',
  verified:   'bg-emerald-50 text-emerald-800 border-emerald-200',
}

export function Badge({ status }: { status: string }) {
  const s = status.toLowerCase()
  const cls = badgeStyles[s] ?? 'bg-slate-100 text-slate-700 border-slate-200'
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cls}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 flex-shrink-0" />
      {status}
    </span>
  )
}

// ── Status toggle button ────────────────────────────────────────────────────
export function StatusToggle({ isActive, onToggle }: { isActive: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
        isActive
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
          : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
      }`}
    >
      {isActive ? <Eye size={14} /> : <EyeOff size={14} />}
      {isActive ? 'Public' : 'Hidden'}
    </button>
  )
}

// ── Type/Category chip ──────────────────────────────────────────────────────
export function TypeChip({ label }: { label: string }) {
  return (
    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold capitalize">
      {label}
    </span>
  )
}

// ── Stat Card ──────────────────────────────────────────────────────────────
export function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:border-brand-blue/40 hover:shadow-md transition-all">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">{label}</p>
      <p className="text-2xl font-bold text-brand-navy">{value}</p>
      {sub && <p className="text-sm text-slate-500 mt-1">{sub}</p>}
    </div>
  )
}

// ── Table Card ─────────────────────────────────────────────────────────────
export function TableCard({ title, subtitle, action, children }: {
  title: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-semibold text-brand-navy">{title}</h3>
          {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  )
}

// ── Table ──────────────────────────────────────────────────────────────────
export function Table({ headers, children }: { headers: string[]; children: React.ReactNode }) {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-slate-50 border-b border-slate-100">
          {headers.map(h => (
            <th key={h} className="text-left text-sm font-semibold text-slate-600 px-6 py-3 whitespace-nowrap">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">{children}</tbody>
    </table>
  )
}

export function TRow({ children }: { children: React.ReactNode }) {
  return <tr className="hover:bg-slate-50 transition-colors">{children}</tr>
}

export function TCell({ children, mono, className = '' }: {
  children: React.ReactNode; mono?: boolean; className?: string
}) {
  return (
    <td className={`px-6 py-4 text-sm text-slate-700 ${mono ? 'font-mono text-xs' : ''} ${className}`}>
      {children}
    </td>
  )
}

export function TCellPrimary({ primary, secondary }: { primary: string; secondary?: string }) {
  return (
    <td className="px-6 py-4">
      <p className="text-sm font-semibold text-brand-navy">{primary}</p>
      {secondary && <p className="text-xs text-slate-500 mt-0.5">{secondary}</p>}
    </td>
  )
}

// ── Empty table row ────────────────────────────────────────────────────────
export function EmptyRow({ colSpan, message }: { colSpan: number; message: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-6 py-16 text-center text-base text-slate-500">
        {message}
      </td>
    </tr>
  )
}

// ── Page Header ────────────────────────────────────────────────────────────
export function PageHeader({ title, subtitle, action }: {
  title: string; subtitle?: string; action?: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
      <div>
        <h1 className="text-2xl font-bold text-brand-navy">{title}</h1>
        {subtitle && <p className="text-base text-slate-500 mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

// ── Toolbar ────────────────────────────────────────────────────────────────
export function Toolbar({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2.5 flex-wrap mb-5">{children}</div>
}

export function SearchInput({ placeholder, value, onChange }: {
  placeholder?: string; value?: string; onChange?: (v: string) => void
}) {
  return (
    <input
      type="text"
      placeholder={placeholder ?? 'Search…'}
      value={value}
      onChange={e => onChange?.(e.target.value)}
      className="bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue w-72 transition-all shadow-sm"
    />
  )
}

export function FilterBtn({ label, active, onClick }: {
  label: string; active?: boolean; onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
        active
          ? 'bg-brand-navy text-white shadow-md shadow-brand-navy/20'
          : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-blue/40 hover:text-brand-navy'
      }`}
    >
      {label}
    </button>
  )
}

export function AddButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-brand-navy hover:bg-brand-blue text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all shadow-md shadow-brand-navy/20 active:scale-95"
    >
      {label}
    </button>
  )
}

export function ActionLink({ children, href }: { children: React.ReactNode; href?: string }) {
  const content = (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue hover:text-brand-navy bg-brand-light hover:bg-brand-blue/10 px-3 py-1.5 rounded-lg transition-all border border-brand-blue/20 cursor-pointer">
      {children}
    </span>
  )
  return (
    <td className="px-6 py-4 text-right">
      {href ? <Link href={href}>{content}</Link> : content}
    </td>
  )
}

// ── Form primitives ────────────────────────────────────────────────────────
export function FormLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-slate-700 mb-1.5">
      {children}
    </label>
  )
}

export function FormInput({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-brand-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all ${className}`}
    />
  )
}

export function FormTextarea({ className = '', ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-brand-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all resize-none ${className}`}
    />
  )
}

export function FormSelect({ className = '', children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) {
  return (
    <select
      {...props}
      className={`w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all cursor-pointer ${className}`}
    >
      {children}
    </select>
  )
}

// ── Modal footer: cancel + submit buttons ──────────────────────────────────
export function ModalFooter({
  onCancel, submitLabel = 'Save', submitting = false, icon
}: {
  onCancel: () => void; submitLabel?: string; submitting?: boolean; icon?: React.ReactNode
}) {
  return (
    <div className="flex gap-3 pt-5 border-t border-slate-100 mt-2">
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={submitting}
        className="flex-[2] flex items-center justify-center gap-2 bg-brand-navy hover:bg-brand-blue text-white text-sm font-semibold py-2.5 rounded-lg transition-all shadow-md shadow-brand-navy/20 active:scale-95 disabled:opacity-50"
      >
        {icon}
        {submitting ? 'Saving…' : submitLabel}
      </button>
    </div>
  )
}

// ── Modal ──────────────────────────────────────────────────────────────────
export function Modal({ isOpen, onClose, title, children }: {
  isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode
}) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-6 pt-16 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl w-full max-w-lg shadow-2xl shadow-slate-900/20 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-brand-navy">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-all"
          >
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
