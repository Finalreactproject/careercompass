import { useState, useEffect } from 'react'

const STATUSES = ['Saved', 'Applied', 'Screening', 'Interview', 'Offer', 'Accepted', 'Rejected']

const DEFAULT_APPS = [
  {
    id: 'app-1',
    title: 'Frontend Developer',
    company: 'Safaricom PLC',
    location: 'Nairobi (Hybrid)',
    status: 'Interview',
    date: 'Aug 10, 2026',
    source: 'careercompass',
    notes: 'Passed initial screening. Technical interview scheduled for Aug 24.',
  },
  {
    id: 'app-2',
    title: 'Product Designer',
    company: 'M-KOPA Africa',
    location: 'Nairobi',
    status: 'Offer',
    date: 'Aug 4, 2026',
    source: 'careercompass',
    notes: 'Received official offer letter. Reviewing compensation package.',
  },
  {
    id: 'app-3',
    title: 'Associate Data Analyst',
    company: 'Equity Group',
    location: 'Nairobi HQ',
    status: 'Screening',
    date: 'Aug 12, 2026',
    source: 'careercompass',
    notes: 'Application submitted with ATS score 94%.',
  },
  {
    id: 'app-4',
    title: 'Junior Cloud Developer',
    company: 'AWS Community Kenya',
    location: 'Remote',
    status: 'Applied',
    date: 'Aug 14, 2026',
    source: 'external_api',
    notes: 'Applied online. Self-tracking progress.',
  },
]

// Applications board: shows tracked jobs, live employer status, and notifications
function Applications({ onViewDetails, onNavigateToJobs }) {
  const [apps, setApps] = useState(() => {
    const saved = localStorage.getItem('applications')
    return saved ? JSON.parse(saved) : DEFAULT_APPS
  })
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState(() => {
    return JSON.parse(localStorage.getItem('applicant_notifications')) || [
      {
        id: 'notif-1',
        title: 'Interview Scheduled: Frontend Developer',
        message: 'Safaricom scheduled your Technical Interview for Aug 24 at 10:00 AM.',
        date: 'Today',
        unread: true,
      },
    ]
  })

  // Listen for real-time status updates from recruiters
  useEffect(() => {
    function loadFreshData() {
      const stored = localStorage.getItem('applications')
      if (stored) setApps(JSON.parse(stored))
      const notifs = localStorage.getItem('applicant_notifications')
      if (notifs) setNotifications(JSON.parse(notifs))
    }
    window.addEventListener('applicationsUpdated', loadFreshData)
    window.addEventListener('notificationsUpdated', loadFreshData)
    return () => {
      window.removeEventListener('applicationsUpdated', loadFreshData)
      window.removeEventListener('notificationsUpdated', loadFreshData)
    }
  }, [])

  // Manually update stage (for external jobs)
  function handleStatusChange(id, newStatus) {
    const updated = apps.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    setApps(updated)
    localStorage.setItem('applications', JSON.stringify(updated))
    window.dispatchEvent(new Event('applicationsUpdated'))
  }

  // Delete an application
  function handleDelete(id) {
    const updated = apps.filter((a) => a.id !== id)
    setApps(updated)
    localStorage.setItem('applications', JSON.stringify(updated))
    window.dispatchEvent(new Event('applicationsUpdated'))
  }

  // Mark all notifications as read
  function handleOpenNotifications() {
    setShowNotifications(!showNotifications)
    if (!showNotifications) {
      const read = notifications.map((n) => ({ ...n, unread: false }))
      setNotifications(read)
      localStorage.setItem('applicant_notifications', JSON.stringify(read))
    }
  }

  const unreadCount = notifications.filter((n) => n.unread).length

  const filteredApps = apps.filter((a) => {
    const q = search.toLowerCase()
    const matchesQuery = !q || a.title?.toLowerCase().includes(q) || a.company?.toLowerCase().includes(q)
    const matchesStage = statusFilter === 'All' || a.status === statusFilter
    return matchesQuery && matchesStage
  })

  return (
    <main className="main-content">
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h1 style={{ margin: 0 }}>My Applications 📋</h1>
            <button
              className="btn-outline"
              style={{ padding: '4px 10px', fontSize: 13 }}
              onClick={handleOpenNotifications}
            >
              🔔 {unreadCount > 0 ? `${unreadCount} New Alerts` : 'Notifications'}
            </button>
          </div>
          <p style={{ margin: '4px 0 0', color: '#888' }}>
            {apps.length} total applications · Platform roles are updated live by employers.
          </p>
        </div>

        {/* Redirects to discover jobs page */}
        <button onClick={onNavigateToJobs}>
          + Add Application (Discover Jobs)
        </button>
      </div>

      {/* Notifications Drawer */}
      {showNotifications && (
        <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 10, padding: 16, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <strong>Recent Application Alerts</strong>
            <button className="btn-outline" style={{ fontSize: 11, padding: '2px 8px' }} onClick={() => setShowNotifications(false)}>Close</button>
          </div>
          {notifications.length === 0 ? (
            <p style={{ color: '#888', margin: 0, fontSize: 13 }}>No alerts yet.</p>
          ) : (
            notifications.slice(0, 4).map((n) => (
              <div key={n.id} style={{ background: n.unread ? '#f0f4ff' : '#fafafa', padding: 10, borderRadius: 8, marginBottom: 6, fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                  <span>{n.title}</span>
                  <span style={{ fontSize: 11, color: '#888' }}>{n.date}</span>
                </div>
                <div style={{ color: '#555', marginTop: 2 }}>{n.message}</div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
        <input
          className="search-input"
          style={{ flex: 1, minWidth: 220, margin: 0 }}
          placeholder="Search by company or title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontSize: 13 }}
        >
          <option value="All">All Stages ({apps.length})</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s} ({apps.filter((a) => a.status === s).length})</option>
          ))}
        </select>
      </div>

      {/* Applications list */}
      {filteredApps.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 40, textAlign: 'center' }}>
          <p style={{ color: '#888', margin: '0 0 14px' }}>No applications match this filter.</p>
          <button onClick={onNavigateToJobs}>Discover Jobs</button>
        </div>
      ) : (
        <div className="apps-list">
          {filteredApps.map((app) => {
            const isPlatform = app.source !== 'external_api'

            return (
              <div key={app.id} className="app-row">
                <div className="app-info">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <strong style={{ fontSize: 16 }}>{app.title}</strong>
                    <span style={{ fontSize: 11, background: isPlatform ? '#f0e6ff' : '#e0f2fe', color: isPlatform ? '#6244a0' : '#0284c7', padding: '2px 8px', borderRadius: 8, fontWeight: 600 }}>
                      {isPlatform ? '⚡ CareerCompass Verified' : '🌐 External Job'}
                    </span>
                    <span style={{ fontSize: 11, background: '#f8f8fc', color: '#252b45', padding: '2px 8px', borderRadius: 8, fontWeight: 600, border: '1px solid #eee' }}>
                      {app.status}
                    </span>
                  </div>
                  <span>🏢 {app.company} {app.location ? `· 📍 ${app.location}` : ''}</span>
                  <small style={{ color: '#666' }}>{app.notes || 'No recent notes'}</small>
                </div>

                <div className="app-actions">
                  {/* External jobs allow manual stage selection */}
                  {!isPlatform ? (
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  ) : (
                    <span style={{ fontSize: 12, color: '#6244a0', background: '#f8f6ff', padding: '6px 10px', borderRadius: 8 }}>
                      Recruiter Managed
                    </span>
                  )}

                  {onViewDetails && (
                    <button className="btn-outline" onClick={() => onViewDetails(app)}>
                      View Details
                    </button>
                  )}

                  <button className="btn-danger" onClick={() => handleDelete(app.id)}>
                    Remove
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}

export default Applications
