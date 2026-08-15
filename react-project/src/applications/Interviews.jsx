/**
 * PAGE: Interviews Management & Prep Hub
 *
 * Displays all scheduled job interviews.
 * For each interview, the candidate can:
 *   1. Click "🎯 Practice Interview" to practice role-specific technical and STAR questions.
 *   2. View prep checklist, notes, and call details.
 *   3. Launch Google Meet / Zoom meeting directly.
 */

import { useState, useEffect } from 'react'

const INITIAL_INTERVIEWS = [
  {
    id: 'iv-1',
    company: 'Safaricom PLC',
    role: 'Frontend Developer',
    round: 'Technical Round (React & System Architecture)',
    date: 'Aug 20, 2026',
    time: '10:00 AM',
    status: 'Upcoming',
    location: 'Nairobi (Hybrid)',
    meetingLink: 'https://meet.google.com/saf-interview-fe',
  },
  {
    id: 'iv-2',
    company: 'M-KOPA Africa',
    role: 'Fullstack Engineer',
    round: 'System Design & STAR Behavioral',
    date: 'Aug 25, 2026',
    time: '2:30 PM',
    status: 'Upcoming',
    location: 'Nairobi HQ / Google Meet',
    meetingLink: 'https://meet.google.com/mkopa-eng-round',
  },
  {
    id: 'iv-3',
    company: 'Equity Group Holdings',
    role: 'Associate Data Analyst',
    round: 'SQL & Analytics Case Study',
    date: 'Aug 28, 2026',
    time: '11:00 AM',
    status: 'Upcoming',
    location: 'Nairobi HQ',
    meetingLink: 'https://meet.google.com/eq-data-round',
  },
]

function getStoredInterviews() {
  const stored = localStorage.getItem('interviews')
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return INITIAL_INTERVIEWS
    }
  }
  localStorage.setItem('interviews', JSON.stringify(INITIAL_INTERVIEWS))
  return INITIAL_INTERVIEWS
}

function Interviews({ onPractice, onViewDetails }) {
  const [interviews, setInterviews] = useState(getStoredInterviews)
  const [tab, setTab] = useState('Upcoming')
  const [roleFilter, setRoleFilter] = useState('All')

  useEffect(() => {
    // Also check if any applications in localStorage are in 'Interview' stage and not yet in interviews list
    const apps = JSON.parse(localStorage.getItem('applications')) || []
    const interviewApps = apps.filter((a) => a.status === 'Interview')
    const current = getStoredInterviews()

    let changed = false
    interviewApps.forEach((app) => {
      const exists = current.some((iv) => iv.company === app.company && iv.role === app.title)
      if (!exists) {
        current.push({
          id: 'iv-app-' + app.id,
          company: app.company,
          role: app.title,
          round: 'Technical Interview',
          date: 'Upcoming this week',
          time: '10:00 AM',
          status: 'Upcoming',
          location: app.location || 'Nairobi',
          meetingLink: 'https://meet.google.com/career-compass-call',
        })
        changed = true
      }
    })

    if (changed) {
      localStorage.setItem('interviews', JSON.stringify(current))
      setInterviews([...current])
    }
  }, [])

  const uniqueRoles = ['All', ...new Set(interviews.map((iv) => iv.role))]

  const filtered = interviews.filter((iv) => {
    const matchesTab = iv.status === tab
    const matchesRole = roleFilter === 'All' || iv.role === roleFilter
    return matchesTab && matchesRole
  })

  const upcomingCount = interviews.filter((i) => i.status === 'Upcoming').length
  const completedCount = interviews.filter((i) => i.status === 'Completed').length

  return (
    <main className="main-content">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <h1>My Interviews & Prep Hub 🎤</h1>
          <p>{upcomingCount} upcoming interviews · Practice and prepare for each specific role.</p>
        </div>
      </div>

      {/* Tabs & Role filter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className={tab === 'Upcoming' ? '' : 'btn-outline'}
            onClick={() => setTab('Upcoming')}
          >
            Upcoming ({upcomingCount})
          </button>
          <button
            className={tab === 'Completed' ? '' : 'btn-outline'}
            onClick={() => setTab('Completed')}
          >
            Completed ({completedCount})
          </button>
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontSize: 13 }}
        >
          {uniqueRoles.map((r) => (
            <option key={r} value={r}>
              {r === 'All' ? 'Filter by Role (All)' : r}
            </option>
          ))}
        </select>
      </div>

      {/* Interviews Grid */}
      {filtered.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 40, textAlign: 'center' }}>
          <p style={{ color: '#888', margin: 0 }}>No {tab.toLowerCase()} interviews found for this filter.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 18 }}>
          {filtered.map((iv) => (
            <div
              key={iv.id}
              style={{
                background: '#fff',
                border: '1px solid #eee',
                borderRadius: 14,
                padding: 22,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div>
                    <h3 style={{ margin: '0 0 4px', color: '#252b45', fontSize: 18 }}>{iv.company}</h3>
                    <div style={{ color: '#6244a0', fontWeight: 600, fontSize: 14 }}>{iv.role}</div>
                  </div>
                  <span style={{ fontSize: 11, background: '#f0e6ff', color: '#6244a0', padding: '4px 10px', borderRadius: 20, fontWeight: 600 }}>
                    {iv.status}
                  </span>
                </div>

                <div style={{ background: '#f8f8fc', border: '1px solid #eee', borderRadius: 8, padding: '10px 12px', fontSize: 13, marginBottom: 16 }}>
                  <div style={{ marginBottom: 4 }}>🎯 <strong>Round:</strong> {iv.round}</div>
                  <div>📅 <strong>Date:</strong> {iv.date} at {iv.time}</div>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, borderTop: '1px solid #f0f0f0', paddingTop: 14 }}>
                <button
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                  onClick={() => onPractice(iv)}
                >
                  🎯 Practice Role Interview
                </button>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    className="btn-outline"
                    style={{ flex: 1, fontSize: 13, padding: '8px' }}
                    onClick={() => onViewDetails(iv)}
                  >
                    Prep & Details
                  </button>

                  {iv.meetingLink && (
                    <a
                      href={iv.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        flex: 1,
                        background: '#1976d2',
                        color: '#fff',
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                      }}
                    >
                      📹 Launch Call
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default Interviews
