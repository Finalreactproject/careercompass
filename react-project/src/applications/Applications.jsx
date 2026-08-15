import { useState, useEffect } from 'react'

const STAGES = ['All', 'Saved', 'Applied', 'Interview', 'Offer', 'Not Selected']

const COLORS = {
  Saved:          { bg: 'lavender',       color: 'darkblue' },
  Applied:        { bg: 'lemonchiffon',   color: 'darkorange' },
  Interview:      { bg: 'lightcyan',      color: 'steelblue' },
  Offer:          { bg: 'honeydew',       color: 'darkgreen' },
  'Not Selected': { bg: 'whitesmoke',     color: 'gray' },
}

const DEFAULT_APPS = [
  { id: 'app-1', title: 'Frontend Developer',    company: 'Safaricom PLC',       location: 'Nairobi (Hybrid)', status: 'Interview', date: 'Aug 10, 2026', source: 'careercompass', notes: 'Technical interview scheduled for Aug 24.' },
  { id: 'app-2', title: 'Product Designer',       company: 'M-KOPA Africa',       location: 'Nairobi',          status: 'Offer',      date: 'Aug 4, 2026',  source: 'careercompass', notes: 'Received offer letter. Reviewing package.' },
  { id: 'app-3', title: 'Associate Data Analyst', company: 'Equity Group',        location: 'Nairobi HQ',       status: 'Applied',    date: 'Aug 12, 2026', source: 'careercompass', notes: 'ATS score 94%.' },
  { id: 'app-4', title: 'Junior Cloud Developer', company: 'AWS Community Kenya', location: 'Remote',           status: 'Saved',      date: 'Aug 14, 2026', source: 'external_api', notes: 'Saved for later.' },
]

function Tag({ status }) {
  const c = COLORS[status] || { bg: 'whitesmoke', color: 'gray' }
  return <span style={{ fontSize: 11, padding: '2px 10px', borderRadius: 20, fontWeight: 700, background: c.bg, color: c.color }}>{status}</span>
}

function Applications({ onViewDetails, onNavigateToJobs }) {
  const [apps, setApps] = useState(() => JSON.parse(localStorage.getItem('applications')) || DEFAULT_APPS)
  const [search, setSearch] = useState('')
  const [stage, setStage] = useState('All')
  const [showAlerts, setShowAlerts] = useState(false)
  const [alerts, setAlerts] = useState(() =>
    JSON.parse(localStorage.getItem('applicant_notifications')) || [
      { id: 'n1', title: 'Interview Scheduled: Frontend Developer', message: 'Safaricom scheduled your Technical Interview for Aug 24 at 10:00 AM.', date: 'Today', unread: true },
    ]
  )

  useEffect(() => {
    function refresh() {
      const stored = localStorage.getItem('applications')
      if (stored) setApps(JSON.parse(stored))
      const notifs = localStorage.getItem('applicant_notifications')
      if (notifs) setAlerts(JSON.parse(notifs))
    }
    window.addEventListener('applicationsUpdated', refresh)
    window.addEventListener('notificationsUpdated', refresh)
    return () => {
      window.removeEventListener('applicationsUpdated', refresh)
      window.removeEventListener('notificationsUpdated', refresh)
    }
  }, [])

  function moveStage(id, newStage) {
    const updated = apps.map((a) => a.id === id ? { ...a, status: newStage } : a)
    setApps(updated)
    localStorage.setItem('applications', JSON.stringify(updated))
    window.dispatchEvent(new Event('applicationsUpdated'))
  }

  function remove(id) {
    const updated = apps.filter((a) => a.id !== id)
    setApps(updated)
    localStorage.setItem('applications', JSON.stringify(updated))
    window.dispatchEvent(new Event('applicationsUpdated'))
  }

  function toggleAlerts() {
    setShowAlerts((prev) => !prev)
    const read = alerts.map((a) => ({ ...a, unread: false }))
    setAlerts(read)
    localStorage.setItem('applicant_notifications', JSON.stringify(read))
  }

  const unread = alerts.filter((a) => a.unread).length

  const visible = apps.filter((a) => {
    const q = search.toLowerCase()
    const matchSearch = !q || a.title?.toLowerCase().includes(q) || a.company?.toLowerCase().includes(q)
    const matchStage = stage === 'All' || a.status === stage
    return matchSearch && matchStage
  })

  return (
    <main className="main-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h1 style={{ margin: 0 }}>My Applications 📋</h1>
            <button className="btn-outline" style={{ padding: '4px 10px', fontSize: 13 }} onClick={toggleAlerts}>
              🔔 {unread > 0 ? `${unread} New` : 'Alerts'}
            </button>
          </div>
          <p style={{ margin: '4px 0 0', color: 'gray' }}>{apps.length} tracked applications</p>
        </div>
        <button onClick={onNavigateToJobs}>+ Discover Jobs</button>
      </div>

      {showAlerts && (
        <div style={{ background: 'white', border: '1px solid lightgray', borderRadius: 10, padding: 16, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <strong>Recent Alerts</strong>
            <button className="btn-outline" style={{ fontSize: 11, padding: '2px 8px' }} onClick={() => setShowAlerts(false)}>Close</button>
          </div>
          {alerts.length === 0
            ? <p style={{ color: 'gray', margin: 0, fontSize: 13 }}>No alerts yet.</p>
            : alerts.slice(0, 4).map((n) => (
              <div key={n.id} style={{ background: n.unread ? 'lavender' : 'whitesmoke', padding: 10, borderRadius: 8, marginBottom: 6, fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                  <span>{n.title}</span>
                  <span style={{ fontSize: 11, color: 'gray' }}>{n.date}</span>
                </div>
                <div style={{ color: 'dimgray', marginTop: 2 }}>{n.message}</div>
              </div>
            ))
          }
        </div>
      )}

      <input
        className="search-input"
        style={{ width: '100%', marginBottom: 16, boxSizing: 'border-box' }}
        placeholder="Search by job title or company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Stage filter pills */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {STAGES.map((s) => {
          const count = s === 'All' ? apps.length : apps.filter((a) => a.status === s).length
          const active = stage === s
          const c = COLORS[s] || { bg: 'lavender', color: 'darkblue' }
          return (
            <button
              key={s}
              onClick={() => setStage(s)}
              style={{
                padding: '6px 14px', borderRadius: 20, fontSize: 13, cursor: 'pointer',
                border: active ? '2px solid currentColor' : '1px solid lightgray',
                background: active ? c.bg : 'white',
                color: active ? c.color : 'dimgray',
                fontWeight: active ? 700 : 400,
              }}
            >
              {s} ({count})
            </button>
          )
        })}
      </div>

      {visible.length === 0 ? (
        <div style={{ background: 'white', border: '1px solid lightgray', borderRadius: 12, padding: 40, textAlign: 'center' }}>
          <p style={{ color: 'gray', margin: '0 0 14px' }}>No applications here yet.</p>
          <button onClick={onNavigateToJobs}>Discover Jobs</button>
        </div>
      ) : (
        <div className="apps-list">
          {visible.map((app) => (
            <div key={app.id} className="app-row">
              <div className="app-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                  <strong style={{ fontSize: 15 }}>{app.title}</strong>
                  <Tag status={app.status} />
                </div>
                <span style={{ fontSize: 13, color: 'dimgray' }}>🏢 {app.company}{app.location ? ` · 📍 ${app.location}` : ''}</span>
                {app.notes && <small style={{ display: 'block', color: 'gray', marginTop: 4 }}>{app.notes}</small>}
              </div>

              <div className="app-actions">
                <select
                  value={app.status}
                  onChange={(e) => moveStage(app.id, e.target.value)}
                  style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid lightgray', fontSize: 13 }}
                >
                  {STAGES.filter((s) => s !== 'All').map((s) => <option key={s}>{s}</option>)}
                </select>
                {onViewDetails && <button className="btn-outline" onClick={() => onViewDetails(app)}>View Details</button>}
                <button className="btn-danger" onClick={() => remove(app.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default Applications
