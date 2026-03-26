'use client';

import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  image: string | null;
  category: string;
  created_at: string;
  is_published: boolean;
}

function PostCard({ post, onClick }: { post: BlogPost; onClick: () => void }) {
  const dateStr = new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <article
      onClick={onClick}
      style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.09)', background: '#fff', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.14)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.09)'; }}
    >
      {post.image ? (
        <img src={`${API_BASE}${post.image}`} alt={post.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      ) : (
        <div style={{ width: '100%', height: 200, background: 'linear-gradient(135deg,#1a3c5e,#2d6a4f)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}>📰</div>
      )}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {post.category && (
          <span style={{ display: 'inline-block', background: '#e8f4ea', color: '#2d6a4f', fontSize: '0.72rem', fontWeight: 700, padding: '2px 10px', borderRadius: 20, width: 'fit-content' }}>{post.category}</span>
        )}
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1a3c5e', margin: 0, lineHeight: 1.4 }}>{post.title}</h3>
        <p style={{ fontSize: '0.82rem', color: '#888', margin: 0 }}>By {post.author} &middot; {dateStr}</p>
        <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.6, flex: 1 }}>
          {post.excerpt || (post.content.length > 150 ? post.content.slice(0, 150) + '…' : post.content)}
        </p>
        <span style={{ color: '#2d6a4f', fontWeight: 600, fontSize: '0.88rem' }}>Read more →</span>
      </div>
    </article>
  );
}

function PostDetail({ post, onBack }: { post: BlogPost; onBack: () => void }) {
  const dateStr = new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#2d6a4f', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', marginBottom: 24, padding: 0 }}>
        ← Back to Blog
      </button>
      {post.image && (
        <img src={`${API_BASE}${post.image}`} alt={post.title} style={{ width: '100%', borderRadius: 16, marginBottom: 32, maxHeight: 420, objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      )}
      {post.category && (
        <span style={{ display: 'inline-block', background: '#e8f4ea', color: '#2d6a4f', fontSize: '0.75rem', fontWeight: 700, padding: '3px 12px', borderRadius: 20, marginBottom: 12 }}>{post.category}</span>
      )}
      <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', fontWeight: 800, color: '#1a3c5e', marginBottom: 12 }}>{post.title}</h1>
      <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: 28 }}>By {post.author} &middot; {dateStr}</p>
      <div style={{ fontSize: '1rem', color: '#333', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{post.content}</div>
    </div>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/blog/`)
      .then(r => r.json())
      .then(data => setPosts(data.results || data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = posts.filter(p => {
    const q = search.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.author.toLowerCase().includes(q);
  });

  return (
    <main style={{ fontFamily: 'inherit', color: '#1a1a1a' }}>

      {/* Hero with image + overlay */}
      <section style={{ position: 'relative', minHeight: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img
          src="/images/EducationAdvocacy.jpg"
          alt=""
          aria-hidden
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(3,43,83,0.82) 0%, rgba(45,106,79,0.76) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff', padding: '160px 24px 80px' }}>
          <p style={{ fontSize: '0.85rem', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.75, marginBottom: 12 }}>West Nile Education Trust Fund</p>
          <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 800, marginBottom: 20, lineHeight: 1.15 }}>Blog & News</h1>
          <p style={{ fontSize: '1.15rem', maxWidth: 600, margin: '0 auto', opacity: 0.9, lineHeight: 1.7 }}>
            Updates, stories, and insights from our scholars, donors, and community.
          </p>
        </div>
      </section>

      {selected ? (
        <PostDetail post={selected} onBack={() => setSelected(null)} />
      ) : (
        <section style={{ padding: '56px 24px', background: '#f8fafc' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 40, display: 'flex', justifyContent: 'center' }}>
              <input
                type="text"
                placeholder="Search posts by title, category, author…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', maxWidth: 520, padding: '12px 20px', borderRadius: 999, border: '1.5px solid #cbd5e1', fontSize: '0.95rem', outline: 'none', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
              />
            </div>
            {loading ? (
              <p style={{ textAlign: 'center', color: '#666' }}>Loading posts…</p>
            ) : filtered.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666' }}>{search ? 'No posts match your search.' : 'No blog posts published yet.'}</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 28 }}>
                {filtered.map(post => <PostCard key={post.id} post={post} onClick={() => setSelected(post)} />)}
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
