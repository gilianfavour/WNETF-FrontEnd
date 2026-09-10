'use client';

import { useEffect, useRef, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface ImpactStat {
  id: number;
  stat_value: string;
  stat_label: string;
  description: string;
  order: number;
}

interface ImpactStory {
  id: number;
  title: string;
  content: string;
  image: string | null;
  beneficiary_name: string;
  is_featured: boolean;
}

function AnimatedNumber({ value }: { value: string }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ''));
    const suffix = value.replace(/[0-9.]/g, '');
    if (isNaN(numeric)) { setDisplay(value); return; }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        const duration = 1800;
        const steps = 60;
        const increment = numeric / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= numeric) { current = numeric; clearInterval(timer); }
          setDisplay((Number.isInteger(numeric) ? Math.round(current) : current.toFixed(1)) + suffix);
        }, duration / steps);
      }
    }, { threshold: 0.3 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

export default function ImpactPage() {
  const [stats, setStats] = useState<ImpactStat[]>([]);
  const [stories, setStories] = useState<ImpactStory[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingStories, setLoadingStories] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/impact/stats/`).then(r => r.json()).then(setStats).catch(() => {}).finally(() => setLoadingStats(false));
    fetch(`${API_BASE}/api/impact/stories/`).then(r => r.json()).then(setStories).catch(() => {}).finally(() => setLoadingStories(false));
  }, []);

  return (
    <main style={{ fontFamily: 'inherit', color: '#1a1a1a' }}>

      {/* Hero with image + overlay */}
      <section style={{ position: 'relative', minHeight: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* Background image */}
        <img
          src="/beneficiaries/wnetfhero.jpg"
          alt=""
          aria-hidden
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Dark gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(3,43,83,0.88) 0%, rgba(28,182,205,0.55) 100%)' }} />
        {/* Content – pushed down to clear navbar (banner ~40px + navbar ~68px) */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff', padding: '180px 24px 80px' }}>
          <p style={{ fontSize: '0.85rem', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.75, marginBottom: 12 }}>West Nile Education Trust Fund</p>
          <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 800, marginBottom: 20, lineHeight: 1.15 }}>
            Our Impact
          </h1>
          <p style={{ fontSize: '1.15rem', maxWidth: 620, margin: '0 auto', opacity: 0.9, lineHeight: 1.7 }}>
            Every scholarship changes a life. Every life changes a community.<br />Here is the story of our journey so far.
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <section style={{ padding: '72px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: 700, marginBottom: 48, color: '#1a3c5e' }}>By the Numbers</h2>
          {loadingStats ? (
            <p style={{ textAlign: 'center', color: '#666' }}>Loading stats…</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
              {stats.map(stat => (
                <div key={stat.id} style={{ background: '#fff', borderRadius: 16, padding: '36px 24px', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', borderTop: '4px solid #2d6a4f' }}>
                  <div style={{ fontSize: '3rem', fontWeight: 800, color: '#2d6a4f' }}>
                    <AnimatedNumber value={stat.stat_value} />
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1a3c5e', marginTop: 8 }}>{stat.stat_label}</div>
                  {stat.description && <div style={{ fontSize: '0.82rem', color: '#666', marginTop: 6, lineHeight: 1.5 }}>{stat.description}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stories */}
      <section style={{ padding: '72px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: 700, marginBottom: 48, color: '#1a3c5e' }}>Stories of Change</h2>
          {loadingStories ? (
            <p style={{ textAlign: 'center', color: '#666' }}>Loading stories…</p>
          ) : stories.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666' }}>No stories available yet.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
              {stories.map(story => (
                <article key={story.id} style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.09)', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
                  {story.image ? (
                    <img src={`${API_BASE}${story.image}`} alt={story.title} style={{ width: '100%', height: 210, objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  ) : (
                    <div style={{ width: '100%', height: 210, background: 'linear-gradient(135deg,#1a3c5e,#2d6a4f)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}>✨</div>
                  )}
                  <div style={{ padding: '24px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {story.is_featured && (
                      <span style={{ display: 'inline-block', background: '#2d6a4f', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '2px 10px', borderRadius: 20, marginBottom: 10, width: 'fit-content' }}>Featured</span>
                    )}
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a3c5e', marginBottom: 10 }}>{story.title}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#444', lineHeight: 1.65, flex: 1 }}>
                      {story.content.length > 240 ? story.content.slice(0, 240) + '…' : story.content}
                    </p>
                    {story.beneficiary_name && (
                      <p style={{ marginTop: 14, fontSize: '0.82rem', color: '#2d6a4f', fontWeight: 600 }}>— {story.beneficiary_name}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
