'use client';

import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string | null;
  is_upcoming: boolean;
  registration_link: string;
}

function EventCard({ event }: { event: Event }) {
  const dateObj = new Date(event.date);
  const dateStr = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const timeStr = dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <article style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.09)', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      {event.image ? (
        <img src={`${API_BASE}${event.image}`} alt={event.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      ) : (
        <div style={{ width: '100%', height: 200, background: 'linear-gradient(135deg,#1a3c5e,#2d6a4f)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}>📅</div>
      )}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ display: 'inline-block', background: event.is_upcoming ? '#2d6a4f' : '#64748b', color: '#fff', fontSize: '0.72rem', fontWeight: 700, padding: '2px 10px', borderRadius: 20, width: 'fit-content' }}>
          {event.is_upcoming ? 'Upcoming' : 'Past Event'}
        </span>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1a3c5e', margin: 0 }}>{event.title}</h3>
        <p style={{ fontSize: '0.85rem', color: '#2d6a4f', fontWeight: 600, margin: 0 }}>{dateStr} &middot; {timeStr}</p>
        <p style={{ fontSize: '0.84rem', color: '#666', margin: 0 }}>📍 {event.location}</p>
        <p style={{ fontSize: '0.9rem', color: '#444', lineHeight: 1.6, flex: 1 }}>
          {event.description.length > 180 ? event.description.slice(0, 180) + '…' : event.description}
        </p>
        {event.is_upcoming && event.registration_link && (
          <a href={event.registration_link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 8, padding: '8px 22px', background: '#1a3c5e', color: '#fff', borderRadius: 8, fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none', width: 'fit-content' }}>
            Register Now →
          </a>
        )}
      </div>
    </article>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    fetch(`${API_BASE}/events/`)
      .then(r => r.json())
      .then(data => setEvents(data.results || data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const upcoming = events.filter(e => e.is_upcoming);
  const past = events.filter(e => !e.is_upcoming);
  const displayed = tab === 'upcoming' ? upcoming : past;

  return (
    <main style={{ fontFamily: 'inherit', color: '#1a1a1a' }}>

      {/* Hero with image + overlay */}
      <section style={{ position: 'relative', minHeight: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img
          src="/beneficiaries/dinner.jpg"
          alt=""
          aria-hidden
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(3,43,83,0.80) 0%, rgba(45,106,79,0.75) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff', padding: '180px 24px 80px' }}>
          <p style={{ fontSize: '0.85rem', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.75, marginBottom: 12 }}>West Nile Education Trust Fund</p>
          <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 800, marginBottom: 20, lineHeight: 1.15 }}>Events</h1>
          <p style={{ fontSize: '1.15rem', maxWidth: 600, margin: '0 auto', opacity: 0.9, lineHeight: 1.7 }}>
            Stay connected. Join us at our upcoming events or revisit the milestones we have shared together.
          </p>
        </div>
      </section>

      {/* Tabs + Cards */}
      <section style={{ padding: '56px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
            {(['upcoming', 'past'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ padding: '10px 28px', borderRadius: 999, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', background: tab === t ? '#1a3c5e' : '#e2e8f0', color: tab === t ? '#fff' : '#1a3c5e', transition: 'background 0.2s' }}>
                {t === 'upcoming' ? `Upcoming (${upcoming.length})` : `Past (${past.length})`}
              </button>
            ))}
          </div>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#666' }}>Loading events…</p>
          ) : displayed.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666' }}>No {tab} events at the moment.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 28 }}>
              {displayed.map(event => <EventCard key={event.id} event={event} />)}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
