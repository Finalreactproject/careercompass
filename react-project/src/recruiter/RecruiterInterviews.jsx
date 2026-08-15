import { useState } from 'react'

const INITIAL = [
  { id: 'rm-1', candidateName: 'Gladys Wanjiku', role: 'Frontend Developer',  round: 'Technical Round (React Architecture)',  date: 'Aug 24, 2026', time: '10:00 AM', status: 'Upcoming',  meetingLink: 'https://meet.google.com/saf-fe-interview',   reminderMinutes: 15 },
  { id: 'rm-2', candidateName: 'Kevin Otieno',   role: 'Fullstack Engineer',   round: 'System Design & Code Pairing',          date: 'Aug 25, 2026', time: '2:30 PM',  status: 'Upcoming',  meetingLink: 'https://meet.google.com/mkopa-eng-round',    reminderMinutes: 10 },
  { id: 'rm-3', candidateName: 'Amina Hassan',   role: 'Junior Data Analyst',  round: 'SQL & Analytics Evaluation',            date: 'Aug 18, 2026', time: '11:00 AM', status: 'Completed', notes: 'Exceptional SQL performance. Extended offer.', recordingUrl: 'https://storage.careercompass.io/recordings/amina-sql-eval.mp4', duration: '45 mins' },
]

export default function RecruiterInterviews() {
  const [meetings, setMeetings] = useState(() => JSON.parse(localStorage.getItem('recruiter_meetings')) || INITIAL)
  const [tab, setTab] = useState('Upcoming')
  const [recording, setRecording] = useState(null)
  const [reminderFor, setReminderFor] = useState(null)
  const [completingFor, setCompletingFor] = useState(null)
  const [completionNotes, setCompletionNotes] = useState('')

  function save(updated) {
    setMeetings(updated)
    localStorage.setItem('recruiter_meetings', JSON.stringify(updated))
  }

  function setReminder(mins) {
    save(meetings.map((m) => m.id === reminderFor.id ? { ...m, reminderMinutes: mins } : m))
    setReminderFor(null)
  }

  function complete() {
    const updated = meetings.map((m) =>
      m.id === completingFor.id ? { ...m, status: 'Completed', notes: completionNotes || 'Interview completed.', recordingUrl: 'https://storage.careercompass.io/recordings/interview-replay.mp4', duration: '40 mins' } : m
    )
    save(updated)
    const candInterviews = JSON.parse(localStorage.getItem('interviews') || '[]')
    localStorage.setItem('interviews', JSON.stringify(candInterviews.map((iv) => iv.role === completingFor.role ? { ...iv, status: 'Completed' } : iv)))
    window.dispatchEvent(new Event('applicationsUpdated'))
    setCompletingFor(null)
    setCompletionNotes('')
  }

  const list = meetings.filter((m) => m.status === tab)
  const upcomingCount = meetings.filter((m) => m.status === 'Upcoming').length
  const completedCount = meetings.filter((m) => m.status === 'Completed').length

  return (
    <main className="main-content">
      <div style={{ marginBottom: 20 }}>
        <h1>Interviews & Meetings 📅</h1>
        <p>Schedule calls, set reminders, and revisit completed recordings.</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['Upcoming', 'Completed'].map((t) => (
          <button key={t} className={tab === t ? '' : 'btn-outline'} style={tab === t ? { background: 'steelblue', color: 'white', borderColor: 'steelblue' } : {}} onClick={() => setTab(t)}>
            {t} ({t === 'Upcoming' ? upcomingCount : completedCount})
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div style={{ background: 'white', border: '1px solid lightgray', borderRadius: 12, padding: 40, textAlign: 'center' }}>
          <p style={{ color: 'gray', margin: 0 }}>No {tab.toLowerCase()} meetings.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
          {list.map((m) => (
            <div key={m.id} style={{ background: 'white', border: '1px solid lightgray', borderRadius: 14, padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div>
                    <h3 style={{ margin: '0 0 2px', fontSize: 18 }}>{m.candidateName}</h3>
                    <div style={{ fontSize: 13, color: 'steelblue', fontWeight: 600 }}>{m.role}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, background: m.status === 'Completed' ? 'honeydew' : 'aliceblue', color: m.status === 'Completed' ? 'darkgreen' : 'steelblue', padding: '3px 8px', borderRadius: 12 }}>
                    {m.status}
                  </span>
                </div>

                <div style={{ background: 'whitesmoke', borderRadius: 8, padding: '10px 12px', fontSize: 13, marginBottom: 14 }}>
                  <div>🎯 <strong>Round:</strong> {m.round}</div>
                  <div style={{ marginTop: 4 }}>📅 <strong>Date:</strong> {m.date} at {m.time}</div>
                  {m.duration && <div style={{ marginTop: 4 }}>⏱️ <strong>Duration:</strong> {m.duration}</div>}
                </div>

                {m.reminderMinutes && m.status === 'Upcoming' && (
                  <div style={{ display: 'inline-flex', gap: 6, fontSize: 12, background: 'lemonchiffon', color: 'darkorange', border: '1px solid peachpuff', padding: '3px 10px', borderRadius: 14, marginBottom: 14 }}>
                    🔔 {m.reminderMinutes} mins before
                  </div>
                )}
                {m.notes && (
                  <div style={{ fontSize: 12, color: 'dimgray', background: 'whitesmoke', border: '1px solid lightgray', padding: 10, borderRadius: 8, marginBottom: 14 }}>
                    <strong>Notes:</strong> {m.notes}
                  </div>
                )}
              </div>

              <div style={{ borderTop: '1px solid lightgray', paddingTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {m.status === 'Upcoming' ? (
                  <>
                    <button className="btn-outline" style={{ flex: 1, fontSize: 12 }} onClick={() => setReminderFor(m)}>🔔 Reminder</button>
                    <a href={m.meetingLink} target="_blank" rel="noreferrer" style={{ flex: 1, background: 'steelblue', color: 'white', borderRadius: 8, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', padding: 8 }}>📹 Join</a>
                    <button style={{ width: '100%', background: 'darkgreen', color: 'white', fontSize: 12, marginTop: 4 }} onClick={() => setCompletingFor(m)}>✓ Mark Completed</button>
                  </>
                ) : (
                  <button style={{ width: '100%', background: 'steelblue', color: 'white', fontSize: 13 }} onClick={() => setRecording(m)}>▶ Watch Recording</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reminder Modal */}
      {reminderFor && (
        <div className="edit-overlay" onClick={() => setReminderFor(null)}>
          <div className="edit-modal" style={{ maxWidth: 380 }} onClick={(e) => e.stopPropagation()}>
            <div className="edit-header">
              <div><h2>Set Reminder</h2><p>Alert before {reminderFor.candidateName}'s interview.</p></div>
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

      {/* Complete Modal */}
      {completingFor && (
        <div className="edit-overlay" onClick={() => setCompletingFor(null)}>
          <div className="edit-modal" style={{ maxWidth: 440 }} onClick={(e) => e.stopPropagation()}>
            <div className="edit-header">
              <div><h2>Complete Interview</h2><p>Add notes for {completingFor.candidateName}.</p></div>
              <button className="close-button" onClick={() => setCompletingFor(null)}>×</button>
            </div>
            <div style={{ padding: 20 }}>
              <div className="form-group">
                <label>Evaluation Notes</label>
                <textarea rows={3} placeholder="e.g. Strong communication, answered architecture questions well..." value={completionNotes} onChange={(e) => setCompletionNotes(e.target.value)} />
              </div>
              <div className="form-actions">
                <button className="cancel-button" onClick={() => setCompletingFor(null)}>Cancel</button>
                <button className="save-profile-button" onClick={complete}>Save & Complete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recording Modal */}
      {recording && (
        <div className="edit-overlay" onClick={() => setRecording(null)}>
          <div className="edit-modal" style={{ maxWidth: 580 }} onClick={(e) => e.stopPropagation()}>
            <div className="edit-header">
              <div><h2>Recording Replay 🎥</h2><p>{recording.candidateName} · {recording.role}</p></div>
              <button className="close-button" onClick={() => setRecording(null)}>×</button>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ width: '100%', height: 260, background: 'black', borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <div style={{ fontSize: 48, marginBottom: 8 }}>▶️</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>Session ({recording.duration || '45 mins'})</div>
                <div style={{ fontSize: 12, color: 'lightgray', marginTop: 4 }}>{recording.date}</div>
              </div>
              {recording.notes && (
                <div style={{ marginTop: 16, background: 'whitesmoke', borderRadius: 8, padding: 12, fontSize: 13 }}>
                  <strong>Archived Notes:</strong>
                  <p style={{ margin: '4px 0 0', color: 'dimgray' }}>{recording.notes}</p>
                </div>
              )}
              <div className="form-actions" style={{ marginTop: 16 }}>
                <button className="save-profile-button" onClick={() => setRecording(null)}>Done</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
