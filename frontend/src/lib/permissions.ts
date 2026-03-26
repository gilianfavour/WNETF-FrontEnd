// src/lib/permissions.ts — CRUD role-based access control

export const ALL_SECTIONS = [
  { key: 'applications', label: 'Applications', path: '/admin/applications' },
  { key: 'students',     label: 'Students',     path: '/admin/students'     },
  { key: 'donations',    label: 'Donations',    path: '/admin/donations'    },
  { key: 'events',       label: 'Events',       path: '/admin/events'       },
  { key: 'blog',         label: 'Blog',         path: '/admin/blog'         },
  { key: 'team',         label: 'Team',         path: '/admin/team'         },
  { key: 'partners',     label: 'Partners',     path: '/admin/partners'     },
  { key: 'impact',       label: 'Impact',       path: '/admin/impact'       },
  { key: 'volunteers',   label: 'Volunteers',   path: '/admin/volunteers'   },
  { key: 'subscribers',  label: 'Subscribers',  path: '/admin/subscribers'  },
  { key: 'messages',     label: 'Messages',     path: '/admin/messages'     },
]

export const CRUD_OPS = ['view', 'create', 'edit', 'delete'] as const
export type CrudOp = typeof CRUD_OPS[number]

export type SectionPerms = { view: boolean; create: boolean; edit: boolean; delete: boolean }
export type RolePerms = Record<string, SectionPerms>
export type AllPerms = Record<string, RolePerms>

export const PREDEFINED_ROLES = ['Super Admin', 'Admin', 'Content Manager', 'Staff', 'Viewer']

const FULL: SectionPerms    = { view: true,  create: true,  edit: true,  delete: true  }
const VIEW_ONLY: SectionPerms = { view: true,  create: false, edit: false, delete: false }
const VIEW_EDIT: SectionPerms = { view: true,  create: true,  edit: true,  delete: false }

function allSections(perms: SectionPerms): RolePerms {
  return Object.fromEntries(ALL_SECTIONS.map(s => [s.key, { ...perms }]))
}

const DEFAULT_PERMISSIONS: AllPerms = {
  'Super Admin': allSections(FULL),
  'Admin': allSections(FULL),
  'Content Manager': {
    applications: VIEW_ONLY,
    students:     VIEW_ONLY,
    donations:    { view: false, create: false, edit: false, delete: false },
    events:       FULL,
    blog:         FULL,
    team:         VIEW_EDIT,
    partners:     VIEW_EDIT,
    impact:       FULL,
    volunteers:   VIEW_ONLY,
    subscribers:  VIEW_ONLY,
    messages:     VIEW_ONLY,
  },
  'Staff': {
    applications: VIEW_EDIT,
    students:     VIEW_EDIT,
    donations:    { view: false, create: false, edit: false, delete: false },
    events:       VIEW_ONLY,
    blog:         VIEW_ONLY,
    team:         { view: false, create: false, edit: false, delete: false },
    partners:     { view: false, create: false, edit: false, delete: false },
    impact:       VIEW_ONLY,
    volunteers:   VIEW_ONLY,
    subscribers:  { view: false, create: false, edit: false, delete: false },
    messages:     VIEW_EDIT,
  },
  'Viewer': {
    applications: VIEW_ONLY,
    students:     VIEW_ONLY,
    donations:    { view: false, create: false, edit: false, delete: false },
    events:       VIEW_ONLY,
    blog:         VIEW_ONLY,
    team:         { view: false, create: false, edit: false, delete: false },
    partners:     { view: false, create: false, edit: false, delete: false },
    impact:       VIEW_ONLY,
    volunteers:   VIEW_ONLY,
    subscribers:  { view: false, create: false, edit: false, delete: false },
    messages:     VIEW_ONLY,
  },
}

const STORAGE_KEY = 'wnetf_role_permissions_v2'

export function getPermissions(): AllPerms {
  if (typeof window === 'undefined') return DEFAULT_PERMISSIONS
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : DEFAULT_PERMISSIONS
  } catch {
    return DEFAULT_PERMISSIONS
  }
}

export function savePermissions(perms: AllPerms) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(perms))
}

export function canAccess(role: string, path: string): boolean {
  if (role === 'Super Admin') return true
  if (path === '/admin') return true
  const perms = getPermissions()
  const section = ALL_SECTIONS.find(s => path.startsWith(s.path))
  if (!section) return true
  return perms[role]?.[section.key]?.view ?? false
}

export function canDo(role: string, sectionKey: string, op: CrudOp): boolean {
  if (role === 'Super Admin') return true
  const perms = getPermissions()
  return perms[role]?.[sectionKey]?.[op] ?? false
}

export function getAllowedPaths(role: string): string[] {
  if (role === 'Super Admin') return ALL_SECTIONS.map(s => s.path)
  const perms = getPermissions()
  return ALL_SECTIONS.filter(s => perms[role]?.[s.key]?.view).map(s => s.path)
}
