// app/admin/(dashboard)/applications/page.tsx

import { APPLICATIONS } from '~/lib/staticData'
import { Badge, TableCard, Table, TRow, TCell, TCellPrimary, ActionLink, PageHeader, Toolbar, SearchInput, FilterBtn, AddButton } from '~/admin/ui'

export default function ApplicationsPage() {
  return (
    <div>
      <PageHeader
        title="Applications"
        subtitle="Review and manage scholarship applications"
      />

      <Toolbar>
        <SearchInput placeholder="Search applicants…" />
        <FilterBtn label="All (42)"        active />
        <FilterBtn label="Pending (8)"     />
        <FilterBtn label="Reviewing (12)"  />
        <FilterBtn label="Approved (18)"   />
        <FilterBtn label="Rejected (4)"    />
      </Toolbar>

      <TableCard title="All Applications">
        <Table headers={['Applicant', 'University', 'Course', 'District', 'Status', 'Submitted', '']}>
          {APPLICATIONS.map(app => (
            <TRow key={app.id}>
              <TCellPrimary primary={app.full_name} secondary={`${app.email} · ${app.phone}`} />
              <TCell>{app.university}</TCell>
              <TCell>{app.course}</TCell>
              <TCell>{app.district}</TCell>
              <TCell><Badge status={app.status} /></TCell>
              <TCell>{app.submitted_at}</TCell>
              <ActionLink>View →</ActionLink>
            </TRow>
          ))}
        </Table>
      </TableCard>
    </div>
  )
}