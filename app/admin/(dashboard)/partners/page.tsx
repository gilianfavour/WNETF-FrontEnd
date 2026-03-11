// app/admin/(dashboard)/partners/page.tsx

import { PARTNERS } from '~/lib/staticData'
import { Badge, TableCard, Table, TRow, TCell, TCellPrimary, ActionLink, PageHeader, AddButton } from '~/admin/ui'

export default function PartnersPage() {
  return (
    <div>
      <PageHeader
        title="Partners"
        subtitle="Organizations supporting WNETF"
        action={<AddButton label="+ Add Partner" />}
      />

      <TableCard title="All Partners">
        <Table headers={['Partner', 'Type', 'Website', 'Status', '']}>
          {PARTNERS.map(p => (
            <TRow key={p.id}>
              <TCellPrimary primary={p.name} />
              <TCell>{p.partnership_type}</TCell>
              <TCell mono>{p.website_url}</TCell>
              <TCell><Badge status={p.is_active ? 'active' : 'suspended'} /></TCell>
              <ActionLink>Edit →</ActionLink>
            </TRow>
          ))}
        </Table>
      </TableCard>
    </div>
  )
}