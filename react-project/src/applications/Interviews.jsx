import { useState, useEffect } from 'react'

const INITIAL_INTERVIEWS = [
  { id: 'iv-1', company: 'Safaricom PLC',       role: 'Frontend Developer',      round: 'Technical Round (React & System Architecture)', date: 'Aug 20, 2026', time: '10:00 AM', status: 'Upcoming',   location: 'Nairobi (Hybrid)',       meetingLink: 'https://meet.google.com/saf-interview-fe' },
  { id: 'iv-2', company: 'M-KOPA Africa',        role: 'Fullstack Engineer',       round: 'System Design & STAR Behavioral',               date: 'Aug 25, 2026', time: '2:30 PM',  status: 'Upcoming',   location: 'Nairobi HQ / Google Meet', meetingLink: 'https://meet.google.com/mkopa-eng-round' },
  { id: 'iv-3', company: 'Equity Group Holdings', role: 'Associate Data Analyst', round: 'SQL & Analytics Case Study',                    date: 'Aug 28, 2026', time: '11:00 AM', status: 'Upcoming',   location: 'Nairobi HQ',             meetingLink: 'https://meet.google.com/eq-data-round' },
]

function loadInterviewsFromStorage() {
  try {
    const stored = localStorage.getItem('interviews')
    return stored ? JSON.parse(stored) : INITIAL_INTERVIEWS
  } catch (error) {
    return INITIAL_INTERVIEWS
  }
}

function Interviews({ onPractice, onViewDetails }) {
  const [interviews, setInterviews] = useState(loadInterviewsFromStorage)
  const [tab, setTab] = useState('Upcoming')
  const [roleFilter, setRoleFilter] = useState('All')
  const [reminderFor, setReminderFor] = useState(null)

  useEffect(() => {
    const applications = JSON.parse(localStorage.getItem('applications')) || []
    const currentInterviews = loadInterviewsFromStorage()
    let updated = false

    const interviewApps = applications.filter((app) => app.status === 'Interview')

    interviewApps.forEach((app) => {
      const exists = currentInterviews.some(
        (interviewItem) => interviewItem.company === app.company && interviewItem.role === app.title
      )

      if (!exists) {
        currentInterviews.push({
          id: 'iv-app-' + app.id,
          company: app.company,
          role: app.title,
          round: 'Technical Interview',
          date: 'Aug 24, 2026',
          time: '10:00 AM',
          status: 'Upcoming',
          location: app.location || 'Nairobi',
          meetingLink: 'https://meet.google.com/career-compass-call',
        })
        updated = true
      }
    })

    if (updated) {
      localStorage.setItem('interviews', JSON.stringify(currentInterviews))
      setInterviews([...currentInterviews])
    }
  }, [])

  function setReminderMinutes(minutes) {
    const updatedInterviews = interviews.map((interviewItem) => {
      if (interviewItem.id === reminderFor.id) {
        return { ...interviewItem, reminderMinutes: minutes }
      }
      return interviewItem
    })

    localStorage.setItem('interviews', JSON.stringify(updatedInterviews))
    setInterviews(updatedInterviews)
    setReminderFor(null)
  }

  const uniqueRoles = ['All', ...new Set(interviews.map((interviewItem) => interviewItem.role))]

  const visibleInterviews = interviews.filter((interviewItem) => {
    const matchesTab = interviewItem.status === tab
    const matchesRole = roleFilter === 'All' || interviewItem.role === roleFilter
    return matchesTab && matchesRole
  })

  const upcomingCount = interviews.filter((interviewItem) => interviewItem.status === 'Upcoming').length
  const completedCount = interviews.filter((interviewItem) => interviewItem.status === 'Completed').length

  return (
    <main className="main-content">
      <div style={{ marginBottom: 20 }}>
        <h1>My Interviews & Prep Hub 🎤</h1>
        <p>{upcomingCount} upcoming · Practice and prepare for each role.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Upcoming', 'Completed'].map((tabName) => (
            <button
              key={tabName}
              className={tab === tabName ? '' : 'btn-outline'}
              onClick={() => setTab(tabName)}
            >
              {tabName} ({tabName === 'Upcoming' ? upcomingCount : completedCount})
            </button>
          ))}
        </div>
        
        <select
          value={roleFilter}
          onChange={(event) => setRoleFilter(event.target.value)}
          style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid lightgray', fontSize: 13 }}
        >
          {uniqueRoles.map((roleName) => (
            <option key={roleName} value={roleName}>
              {roleName === 'All' ? 'All Roles' : roleName}
            </option>
          ))}
        </select>
      </div>

      {visibleInterviews.length === 0 ? (
        <div style={{ background: 'white', border: '1px solid lightgray', borderRadius: 12, padding: 40, textAlign: 'center' }}>
          <p style={{ color: 'gray', margin: 0 }}>No {tab.toLowerCase()} interviews found.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 18 }}>
          {visibleInterviews.map((interviewItem) => (
            <div key={interviewItem.id} style={{ background: 'white', border: '1px solid lightgray', borderRadius: 14, padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div>
                    <h3 style={{ margin: '0 0 4px', fontSize: 18 }}>{interviewItem.company}</h3>
                    <div style={{ color: 'slateblue', fontWeight: 600, fontSize: 14 }}>{interviewItem.role}</div>
                  </div>
                  <span style={{ fontSize: 11, background: 'lavender', color: 'darkblue', padding: '4px 10px', borderRadius: 20, fontWeight: 600 }}>{interviewItem.status}</span>
                </div>

                <div style={{ background: 'whitesmoke', borderRadius: 8, padding: '10px 12px', fontSize: 13, marginBottom: 14 }}>
                  <div>🎯 <strong>Round:</strong> {interviewItem.round}</div>
                  <div>📅 <strong>Date:</strong> {interviewItem.date} at {interviewItem.time}</div>
                </div>

                {interviewItem.reminderMinutes && (
                  <div style={{ display: 'inline-flex', gap: 6, fontSize: 12, background: 'lemonchiffon', color: 'darkorange', border: '1px solid peachpuff', padding: '3px 10px', borderRadius: 14, marginBottom: 14 }}>
                    🔔 Reminder: {interviewItem.reminderMinutes} mins before
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, borderTop: '1px solid lightgray', paddingTop: 14 }}>
                {interviewItem.status === 'Upcoming' ? (
                  <>
                    <button style={{ width: '100%' }} onClick={() => onPractice(interviewItem)}>
                      🎯 Practice Role Interview
                    </button>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn-outline" style={{ flex: 1, fontSize: 13 }} onClick={() => onViewDetails(interviewItem)}>
                        Prep & Details
                      </button>
                      <button className="btn-outline" style={{ flex: 1, fontSize: 13 }} onClick={() => setReminderFor(interviewItem)}>
                        🔔 Reminder
                      </button>
                      {interviewItem.meetingLink && (
                        <a
                          href={interviewItem.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            flex: 1,
                            background: 'steelblue',
                            color: 'white',
                            borderRadius: 8,
                            fontSize: 13,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none',
                          }}
                        >
                          📹 Join
                        </a>
                      )}
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize: 13, color: 'darkgreen', background: 'honeydew', padding: '10px 12px', borderRadius: 8, textAlign: 'center' }}>
                    ✓ Interview Completed
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {reminderFor && (
        <div className="edit-overlay" onClick={() => setReminderFor(null)}>
          <div className="edit-modal" style={{ maxWidth: 380 }} onClick={(event) => event.stopPropagation()}>
            <div className="edit-header">
              <div>
                <h2>Set Reminder</h2>
                <p>Alert before {reminderFor.company}'s interview.</p>
              </div>
              <button className="close-button" onClick={() => setReminderFor(null)}>
                ×
              </button>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                {[5, 10, 15, 30].map((minutes) => (
                  <button
                    key={minutes}
                    className={reminderFor.reminderMinutes === minutes ? '' : 'btn-outline'}
                    style={{ padding: '12px 8px', fontSize: 13 }}
                    onClick={() => setReminderMinutes(minutes)}
                  >
                    🔔 {minutes} Mins Before
                  </button>
                ))}
              </div>
              <button className="cancel-button" style={{ width: '100%' }} onClick={() => setReminderFor(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Interviews
