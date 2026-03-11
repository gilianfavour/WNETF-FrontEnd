// app/admin/(dashboard)/students/page.tsx

import { STUDENTS } from '~/lib/staticData'
import { Badge, TableCard, Table, TRow, TCell, TCellPrimary, PageHeader, Toolbar, SearchInput, FilterBtn, AddButton } from '~/admin/ui'

export default function StudentsPage() {
  return (
    <div>
      <PageHeader
        title="Students"
        subtitle="Scholarship beneficiaries currently supported"
        action={<AddButton label="+ Add Student" />}
      />

      <Toolbar>
        <SearchInput placeholder="Search students…" />
        <FilterBtn label="All (27)"        active />
        <FilterBtn label="Active (20)"     />
        <FilterBtn label="Graduated (5)"   />
        <FilterBtn label="Suspended (2)"   />
      </Toolbar>

      <TableCard title="All Students">
        <Table headers={['Student', 'University', 'Course', 'Year', 'Type', 'Status']}>
          {STUDENTS.map(s => (
            <TRow key={s.id}>
              <TCellPrimary primary={s.full_name} secondary={`${s.email} · ${s.district}`} />
              <TCell>{s.university}</TCell>
              <TCell>{s.course}</TCell>
              <TCell>{s.year_of_study}</TCell>
              <TCell><Badge status={s.scholarship_type} /></TCell>
              <TCell><Badge status={s.scholarship_status} /></TCell>
            </TRow>
          ))}
        </Table>
      </TableCard>
    </div>
  )
}