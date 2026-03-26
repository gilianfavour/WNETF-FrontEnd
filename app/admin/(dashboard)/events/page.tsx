// app/admin/(dashboard)/events/page.tsx

import { EVENTS } from '~/lib/staticData'
import { Badge, TableCard, Table, TRow, TCell, TCellPrimary, ActionLink, PageHeader, AddButton } from '~/admin/ui'

export default function EventsPage() {
  return (
    <div>
      <PageHeader
        title="Events"
        subtitle="Manage WNETF events and registrations"
        action={<AddButton label="+ Add Event" />}
      />

      <TableCard title="All Events">
        <Table headers={['Event', 'Type', 'Date', 'Location', 'Registrations', 'Status', '']}>
          {EVENTS.map(e => (
            <TRow key={e.id}>
              <TCellPrimary
                primary={e.title}
                secondary={e.kit_available ? 'Kit available' : undefined}
              />
              <TCell>{e.event_type}</TCell>
              <TCell>{e.event_date}</TCell>
              <TCell>{e.location}</TCell>
              <TCell mono>{e.registrations} registered</TCell>
              <TCell><Badge status={e.is_published ? 'published' : 'draft'} /></TCell>
              <ActionLink>Edit →</ActionLink>
            </TRow>
          ))}
        </Table>
      </TableCard>
    </div>
  )
}