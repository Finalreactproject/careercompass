import { useState, useEffect } from 'react'

function OverviewCards() {
  const [counts, setCounts] = useState({
    total: 0,
    interviews: 0,
    pending: 0,
    offers: 0,
  })

  useEffect(() => {
    function calculateCounts() {
      const apps = JSON.parse(localStorage.getItem('applications')) || []
      const total = apps.length
      const interviews = apps.filter((a) => a.status === 'Interview').length
      const offers = apps.filter((a) => a.status === 'Offer' || a.status === 'Accepted').length
      const pending = apps.filter((a) => a.status === 'Applied' || a.status === 'Screening').length

      setCounts({ total, interviews, pending, offers })
    }

    calculateCounts()
    window.addEventListener('applicationsUpdated', calculateCounts)
    return () => window.removeEventListener('applicationsUpdated', calculateCounts)
  }, [])

  const cards = [
    { label: 'Applications', count: counts.total, color: '#6244a0', bg: '#f8f4ff' },
    { label: 'Interviews', count: counts.interviews, color: '#1976d2', bg: '#eef6fc' },
    { label: 'In Review', count: counts.pending, color: '#f57c00', bg: '#fff8f0' },
    { label: 'Offers', count: counts.offers, color: '#2e7d32', bg: '#f0f9f1' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 24 }}>
      {cards.map((c) => (
        <div
          key={c.label}
          style={{
            background: '#fff',
            border: '1px solid #eee',
            borderRadius: 12,
            padding: '18px 20px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ fontSize: 13, color: '#777', fontWeight: 500 }}>{c.label}</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: c.color, marginTop: 4 }}>
            {c.count}
          </div>
        </div>
      ))}
    </div>
  )
}

export default OverviewCards
