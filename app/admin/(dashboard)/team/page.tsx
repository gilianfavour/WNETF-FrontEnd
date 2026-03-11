// app/admin/(dashboard)/team/page.tsx

import { TEAM_MEMBERS } from '~/lib/staticData'
import { Badge, TableCard, Table, TRow, TCell, TCellPrimary, ActionLink, PageHeader, AddButton } from '~/admin/ui'

export default function TeamPage() {
  return (
    <div>
      <PageHeader
        title="Team"
        subtitle="Staff and team members shown on the site"
        action={<AddButton label="+ Add Member" />}
      />

      <TableCard title="Team Members">
        <Table headers={['Member', 'Role', 'Email', 'Status', '']}>
          {TEAM_MEMBERS.map(member => (
            <TRow key={member.id}>
              <TCellPrimary primary={member.full_name} secondary={member.role} />
              <TCell>{member.role}</TCell>
              <TCell mono>{member.email}</TCell>
              <TCell><Badge status={member.is_active ? 'active' : 'suspended'} /></TCell>
              <ActionLink>Edit →</ActionLink>
            </TRow>
          ))}
        </Table>
      </TableCard>
    </div>
  )
}