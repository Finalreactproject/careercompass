import { useState, useEffect } from 'react'

const INITIAL = [
  { id: 'iv-1', company: 'Safaricom PLC',       role: 'Frontend Developer',      round: 'Technical Round (React & System Architecture)', date: 'Aug 20, 2026', time: '10:00 AM', status: 'Upcoming',   location: 'Nairobi (Hybrid)',       meetingLink: 'https://meet.google.com/saf-interview-fe' },
  { id: 'iv-2', company: 'M-KOPA Africa',        role: 'Fullstack Engineer',       round: 'System Design & STAR Behavioral',               date: 'Aug 25, 2026', time: '2:30 PM',  status: 'Upcoming',   location: 'Nairobi HQ / Google Meet', meetingLink: 'https://meet.google.com/mkopa-eng-round' },
  { id: 'iv-3', company: 'Equity Group Holdings', role: 'Associate Data Analyst', round: 'SQL & Analytics Case Study',                    date: 'Aug 28, 2026', time: '11:00 AM', status: 'Upcoming',   location: 'Nairobi HQ',             meetingLink: 'https://meet.google.com/eq-data-round' },
]

function loadInterviews() {
  try { return JSON.parse(localStorage.getItem('interviews')) || INITIAL }
  catch { return INITIAL }
}

function Interviews({ onPractice, onViewDetails }) {
  const [interviews, setInterviews] = useState(loadInterviews)
  const [tab, setTab] = useState('Upcoming')
  const [roleFilter, setRoleFilter] = useState('All')
  const [reminderFor, setReminderFor] = useState(null)

  useEffect(() => {
    const apps = JSON.parse(localStorage.getItem('applications')) || []
    const current = loadInterviews()
    let changed = false

    apps.filter((a) => a.status === 'Interview').forEach((app) => {
      if (!current.some((iv) => iv.company === app.company && iv.role === app.title)) {
        current.push({ id: 'iv-app-' + app.id, company: app.company, role: app.title, round: 'Technical Interview', date: 'Aug 24, 2026', time: '10:00 AM', status: 'Upcoming', location: app.location || 'Nairobi', meetingLink: 'https://meet.google.com/career-compass-call' })
        changed = true
      }
    })

    if (changed) { localStorage.setItem('interviews', JSON.stringify(current)); setInterviews([...current]) }
  }, [])

  function setReminder(mins) {
    const updated = interviews.map((iv) => iv.id === reminderFor.id ? { ...iv, reminderMinutes: mins } : iv)
    localStorage.setItem('interviews', JSON.stringify(updated))
    setInterviews(updated)
    setReminderFor(null)
  }

  const roles = ['All', ...new Set(interviews.map((iv) => iv.role))]
  const visible = interviews.filter((iv) => iv.status === tab && (roleFilter === 'All' || iv.role === roleFilter))
  const upcomingCount = interviews.filter((i) => i.status === 'Upcoming').length
  const completedCount = interviews.filter((i) => i.status === 'Completed').length

  return (
    <main className="main-content">
      <div style={{ marginBottom: 20 }}>
        <h1>My Interviews & Prep Hub 🎤</h1>
        <p>{upcomingCount} upcoming · Practice and prepare for each role.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Upcoming', 'Completed'].map((t) => (
            <button key={t} className={tab === t ? '' : 'btn-outline'} onClick={() => setTab(t)}>
              {t} ({t === 'Upcoming' ? upcomingCount : completedCount})
            </button>
          ))}
        </div>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid lightgray', fontSize: 13 }}>
          {roles.map((r) => <option key={r}>{r === 'All' ? 'All Roles' : r}</option>)}
        </select>
      </div>

      {visible.length === 0 ? (
        <div style={{ background: 'white', border: '1px solid lightgray', borderRadius: 12, padding: 40, textAlign: 'center' }}>
          <p style={{ color: 'gray', margin: 0 }}>No {tab.toLowerCase()} interviews found.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 18 }}>
          {visible.map((iv) => (
            <div key={iv.id} style={{ background: 'white', border: '1px solid lightgray', borderRadius: 14, padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div>
                    <h3 style={{ margin: '0 0 4px', fontSize: 18 }}>{iv.company}</h3>
                    <div style={{ color: 'slateblue', fontWeight: 600, fontSize: 14 }}>{iv.role}</div>
                  </div>
                  <span style={{ fontSize: 11, background: 'lavender', color: 'darkblue', padding: '4px 10px', borderRadius: 20, fontWeight: 600 }}>{iv.status}</span>
                </div>

                <div style={{ background: 'whitesmoke', borderRadius: 8, padding: '10px 12px', fontSize: 13, marginBottom: 14 }}>
                  <div>🎯 <strong>Round:</strong> {iv.round}</div>
                  <div>📅 <strong>Date:</strong> {iv.date} at {iv.time}</div>
                </div>

                {iv.reminderMinutes && (
                  <div style={{ display: 'inline-flex', gap: 6, fontSize: 12, background: 'lemonchiffon', color: 'darkorange', border: '1px solid peachpuff', padding: '3px 10px', borderRadius: 14, marginBottom: 14 }}>
                    🔔 Reminder: {iv.reminderMinutes} mins before
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, borderTop: '1px solid lightgray', paddingTop: 14 }}>
                {iv.status === 'Upcoming' ? (
                  <>
                    <button style={{ width: '100%' }} onClick={() => onPractice(iv)}>🎯 Practice Role Interview</button>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn-outline" style={{ flex: 1, fontSize: 13 }} onClick={() => onViewDetails(iv)}>Prep & Details</button>
                      <button className="btn-outline" style={{ flex: 1, fontSize: 13 }} onClick={() => setReminderFor(iv)}>🔔 Reminder</button>
                      {iv.meetingLink && (
                        <a href={iv.meetingLink} target="_blank" rel="noreferrer" style={{ flex: 1, background: 'steelblue', color: 'white', borderRadius: 8, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                          📹 Join
                        </a>
                      )}
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize: 13, color: 'darkgreen', background: 'honeydew', padding: '10px 12px', borderRadius: 8, textAlign: 'center' }}>✓ Interview Completed</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {reminderFor && (
        <div className="edit-overlay" onClick={() => setReminderFor(null)}>
          <div className="edit-modal" style={{ maxWidth: 380 }} onClick={(e) => e.stopPropagation()}>
            <div className="edit-header">
              <div><h2>Set Reminder</h2><p>Alert before {reminderFor.company}'s interview.</p></div>
              <button className="close-button" onClick={() => setReminderFor(null)}>×</button>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                {[5, 10, 15, 30].map((mins) => (
                  <button key={mins} className={reminderFor.reminderMinutes === mins ? '' : 'btn-outline'} style={{ padding: '12px 8px', fontSize: 13 }} onClick={() => setReminder(mins)}>
                    🔔 {mins} Mins Before
                  </button>
                ))}
              </div>
              <button className="cancel-button" style={{ width: '100%' }} onClick={() => setReminderFor(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Interviews
