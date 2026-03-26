'use client'

import { useState, useEffect } from 'react'
import { ShieldCheck, Save, RotateCcw } from 'lucide-react'
import {
  ALL_SECTIONS, PREDEFINED_ROLES, CRUD_OPS, CrudOp,
  getPermissions, savePermissions, AllPerms, SectionPerms,
} from '~/lib/permissions'
import { PageHeader } from '~/admin/ui'

const ROLE_COLORS: Record<string, string> = {
  'Admin':           'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
  'Content Manager': 'bg-violet-50 text-violet-700 border-violet-200',
  'Staff':           'bg-amber-50 text-amber-700 border-amber-200',
  'Viewer':          'bg-slate-100 text-slate-600 border-slate-200',
}

const CRUD_LABELS: Record<CrudOp, string> = {
  view:   'View',
  create: 'Create',
  edit:   'Edit',
  delete: 'Delete',
}

function countEnabled(perms: AllPerms, role: string): number {
  const rp = perms[role]
  if (!rp) return 0
  return ALL_SECTIONS.filter(s => rp[s.key]?.view).length
}

function countCrudEnabled(perms: AllPerms, role: string): number {
  const rp = perms[role]
  if (!rp) return 0
  let n = 0
  ALL_SECTIONS.forEach(s => {
    CRUD_OPS.forEach(op => { if (rp[s.key]?.[op]) n++ })
  })
  return n
}

export default function RolesPage() {
  const editableRoles = PREDEFINED_ROLES.filter(r => r !== 'Super Admin')

  const [permissions, setPermissions] = useState<AllPerms>({})
  const [activeRole,  setActiveRole]  = useState(editableRoles[0])
  const [saved,       setSaved]       = useState(false)

  useEffect(() => { setPermissions(getPermissions()) }, [])

  function toggle(sectionKey: string, op: CrudOp) {
    setPermissions(prev => {
      const current = prev[activeRole]?.[sectionKey] ?? { view: false, create: false, edit: false, delete: false }
      const updated  = { ...current, [op]: !current[op] }
      // if turning off 'view', turn off everything else too
      if (op === 'view' && !current.view === false) {
        updated.create = false; updated.edit = false; updated.delete = false
      }
      // if enabling create/edit/delete, auto-enable view
      if (op !== 'view' && updated[op]) updated.view = true
      return {
        ...prev,
        [activeRole]: { ...prev[activeRole], [sectionKey]: updated },
      }
    })
    setSaved(false)
  }

  function setAll(enable: boolean) {
    setPermissions(prev => {
      const allOn:  SectionPerms = { view: true,  create: true,  edit: true,  delete: true  }
      const allOff: SectionPerms = { view: false, create: false, edit: false, delete: false }
      const sections = Object.fromEntries(ALL_SECTIONS.map(s => [s.key, enable ? { ...allOn } : { ...allOff }]))
      return { ...prev, [activeRole]: sections }
    })
    setSaved(false)
  }

  function setViewOnly() {
    setPermissions(prev => {
      const sections = Object.fromEntries(
        ALL_SECTIONS.map(s => [s.key, { view: true, create: false, edit: false, delete: false }])
      )
      return { ...prev, [activeRole]: sections }
    })
    setSaved(false)
  }

  function handleSave() {
    savePermissions(permissions)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  function handleReset() {
    if (!confirm('Reset all permissions to defaults?')) return
    localStorage.removeItem('wnetf_role_permissions_v2')
    setPermissions(getPermissions())
    setSaved(false)
  }

  const rp = permissions[activeRole] ?? {}
  const totalCrud = ALL_SECTIONS.length * CRUD_OPS.length

  return (
    <div className="max-w-5xl mx-auto space-y-7">
      <PageHeader
        title="Role Permissions"
        subtitle="Configure CRUD access for each role across all admin sections"
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-brand-navy border border-slate-200 px-4 py-2.5 rounded-lg transition-all bg-white hover:border-slate-300"
            >
              <RotateCcw size={14} /> Reset defaults
            </button>
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg transition-all shadow-md ${
                saved ? 'bg-emerald-600 text-white shadow-emerald-600/20' : 'bg-brand-navy hover:bg-brand-blue text-white shadow-brand-navy/20'
              }`}
            >
              <Save size={14} /> {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        }
      />

      {/* Super Admin note */}
      <div className="flex items-start gap-3 bg-brand-light border border-brand-blue/20 rounded-xl px-5 py-4">
        <ShieldCheck size={18} className="text-brand-blue flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-brand-navy">Super Admin always has full access</p>
          <p className="text-sm text-slate-600 mt-0.5">Configure access for all other roles below. Changes take effect immediately on next navigation.</p>
        </div>
      </div>

      {/* Summary cards — TOP */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {editableRoles.map(role => {
          const sections = countEnabled(permissions, role)
          const ops      = countCrudEnabled(permissions, role)
          const isActive = role === activeRole
          return (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`text-left bg-white border rounded-xl p-4 transition-all hover:shadow-md ${
                isActive ? 'border-brand-blue ring-2 ring-brand-blue/20 shadow-md' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full border mb-3 ${ROLE_COLORS[role] ?? 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                {role}
              </span>
              <p className="text-2xl font-bold text-brand-navy leading-none">{sections}</p>
              <p className="text-xs text-slate-400 mt-1">of {ALL_SECTIONS.length} sections (view)</p>
              <p className="text-xs text-slate-500 mt-2 font-medium">{ops} / {totalCrud} operations on</p>
            </button>
          )
        })}
      </div>

      {/* Role tabs */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {/* Tab bar */}
        <div className="flex border-b border-slate-200 overflow-x-auto">
          {editableRoles.map(role => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`flex-1 min-w-[120px] px-5 py-3 text-sm font-semibold transition-colors whitespace-nowrap ${
                role === activeRole
                  ? 'text-brand-blue border-b-2 border-brand-blue bg-brand-light'
                  : 'text-slate-500 hover:text-brand-navy hover:bg-slate-50 border-b-2 border-transparent'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Quick-set bar */}
        <div className="flex items-center gap-3 px-6 py-3 bg-slate-50 border-b border-slate-200">
          <span className="text-sm text-slate-500 font-medium">Quick set for <strong className="text-brand-navy">{activeRole}</strong>:</span>
          <button onClick={() => setAll(true)}  className="text-sm font-semibold text-brand-blue hover:text-brand-navy transition-colors">Full Access</button>
          <span className="text-slate-300">·</span>
          <button onClick={setViewOnly}         className="text-sm font-semibold text-violet-600 hover:text-violet-800 transition-colors">View Only</button>
          <span className="text-slate-300">·</span>
          <button onClick={() => setAll(false)} className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors">No Access</button>
        </div>

        {/* CRUD matrix */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left text-sm font-semibold text-slate-600 px-6 py-3 min-w-[180px]">Section</th>
                {CRUD_OPS.map(op => (
                  <th key={op} className="text-center text-sm font-semibold text-slate-600 px-4 py-3 min-w-[90px]">
                    {CRUD_LABELS[op]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ALL_SECTIONS.map(section => {
                const sp = rp[section.key] ?? { view: false, create: false, edit: false, delete: false }
                return (
                  <tr key={section.key} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-3 text-sm font-medium text-brand-navy">{section.label}</td>
                    {CRUD_OPS.map(op => {
                      const on = sp[op]
                      return (
                        <td key={op} className="px-4 py-3 text-center">
                          <button
                            onClick={() => toggle(section.key, op)}
                            className={`w-10 h-5 rounded-full transition-all relative inline-flex flex-shrink-0 ${
                              on ? 'bg-brand-blue' : 'bg-slate-200'
                            }`}
                            title={`${on ? 'Disable' : 'Enable'} ${CRUD_LABELS[op]} for ${section.label}`}
                          >
                            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${on ? 'left-5' : 'left-0.5'}`} />
                          </button>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
