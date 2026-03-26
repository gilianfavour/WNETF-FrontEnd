// app/admin/(dashboard)/donations/page.tsx

import { DONATIONS } from '~/lib/staticData'
import { StatCard, Badge, TableCard, Table, TRow, TCell, TCellPrimary, PageHeader, Toolbar, SearchInput, AddButton } from '~/admin/ui'

const DONATION_STATS = [
  { label: 'Total Raised (UGX)', value: '18.4M',  sub: 'All time',      color: 'green'  },
  { label: 'Total Raised (USD)', value: '$4,200',  sub: 'All time',      color: 'blue'   },
  { label: 'Total Donations',    value: '34',      sub: 'Total records', color: 'amber'  },
  { label: 'Verified',           value: '28',      sub: '6 pending',     color: 'purple' },
]

export default function DonationsPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Donations"
        subtitle="Track all contributions and verify payments"
        action={<AddButton label="+ Record Donation" />}
      />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {DONATION_STATS.map(s => (
          <StatCard key={s.label} label={s.label} value={s.value} sub={s.sub} color={s.color} />
        ))}
      </div>

      <Toolbar>
        <SearchInput placeholder="Search donors…" />
      </Toolbar>

      <TableCard title="All Donations">
        <Table headers={['Donor', 'Amount', 'Method', 'Purpose', 'Date', 'Status']}>
          {DONATIONS.map(d => (
            <TRow key={d.id}>
              <TCellPrimary primary={d.donor_name} secondary={d.donor_email} />
              <TCell mono>
                <span className="text-green-400 font-semibold">
                  {d.currency} {Number(d.amount).toLocaleString()}
                </span>
              </TCell>
              <TCell>{d.payment_method}</TCell>
              <TCell>{d.purpose}</TCell>
              <TCell>{d.donated_at}</TCell>
              <TCell><Badge status={d.verified ? 'verified' : 'unverified'} /></TCell>
            </TRow>
          ))}
        </Table>
      </TableCard>
    </div>
  )
}