// app/admin/(dashboard)/blog/page.tsx

import { BLOG_POSTS } from '~/lib/staticData'
import { Badge, TableCard, Table, TRow, TCell, TCellPrimary, ActionLink, PageHeader, AddButton } from '~/admin/ui'

export default function BlogPage() {
  return (
    <div>
      <PageHeader
        title="Blog Posts"
        subtitle="Manage news and impact stories"
        action={<AddButton label="+ New Post" />}
      />

      <TableCard title="All Posts">
        <Table headers={['Post', 'Tags', 'Published', 'Status', '']}>
          {BLOG_POSTS.map(post => (
            <TRow key={post.id}>
              <TCellPrimary primary={post.title} secondary={`By ${post.author}`} />
              <TCell>{post.tags.join(', ')}</TCell>
              <TCell>{post.published_at}</TCell>
              <TCell><Badge status={post.is_published ? 'published' : 'draft'} /></TCell>
              <ActionLink>Edit →</ActionLink>
            </TRow>
          ))}
        </Table>
      </TableCard>
    </div>
  )
}