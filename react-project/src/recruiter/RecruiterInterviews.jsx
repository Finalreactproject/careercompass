import { useState } from 'react'

const INITIAL_RECRUITER_MEETINGS = [
  {
    id: 'rm-1',
    candidateName: 'Gladys Wanjiku',
    role: 'Frontend Developer',
    round: 'Technical Round (React Architecture)',
    date: 'Aug 24, 2026',
    time: '10:00 AM',
    status: 'Upcoming',
    meetingLink: 'https://meet.google.com/saf-fe-interview',
    reminderMinutes: 15,
  },
  {
    id: 'rm-2',
    candidateName: 'Kevin Otieno',
    role: 'Fullstack Engineer',
    round: 'System Design & Code Pairing',
    date: 'Aug 25, 2026',
    time: '2:30 PM',
    status: 'Upcoming',
    meetingLink: 'https://meet.google.com/mkopa-eng-round',
    reminderMinutes: 10,
  },
  {
    id: 'rm-3',
    candidateName: 'Amina Hassan',
    role: 'Junior Data Analyst',
    round: 'SQL & Analytics Evaluation',
    date: 'Aug 18, 2026',
    time: '11:00 AM',
    status: 'Completed',
    notes: 'Exceptional performance on live SQL join queries. Extended job offer package.',
    recordingUrl: 'https://storage.careercompass.io/recordings/amina-sql-eval.mp4',
    duration: '45 mins',
  },
]

export default function RecruiterInterviews() {
  const [meetings, setMeetings] = useState(() => {
    const stored = localStorage.getItem('recruiter_meetings')
    return stored ? JSON.parse(stored) : INITIAL_RECRUITER_MEETINGS
  })
  const [tab, setTab] = useState('Upcoming') // 'Upcoming' | 'Completed'
  const [activeRecording, setActiveRecording] = useState(null)
  const [reminderModalMeeting, setReminderModalMeeting] = useState(null)
  const [completionModalMeeting, setCompletionModalMeeting] = useState(null)
  const [completionNotes, setCompletionNotes] = useState('')

  function saveMeetings(updated) {
    setMeetings(updated)
    localStorage.setItem('recruiter_meetings', JSON.stringify(updated))
  }

  function handleSetReminder(minutes) {
    const updated = meetings.map((m) =>
      m.id === reminderModalMeeting.id ? { ...m, reminderMinutes: minutes } : m
    )
    saveMeetings(updated)
    setReminderModalMeeting(null)
  }

  function handleCompleteMeeting() {
    if (!completionModalMeeting) return
    const updated = meetings.map((m) =>
      m.id === completionModalMeeting.id
        ? {
            ...m,
            status: 'Completed',
            notes: completionNotes || 'Interview completed. Performance notes recorded.',
            recordingUrl: 'https://storage.careercompass.io/recordings/interview-replay.mp4',
            duration: '40 mins',
          }
        : m
    )
    saveMeetings(updated)

    // Also mirror to candidate's interviews list
    const candInterviews = JSON.parse(localStorage.getItem('interviews') || '[]')
    const synced = candInterviews.map((iv) =>
      iv.role === completionModalMeeting.role ? { ...iv, status: 'Completed' } : iv
    )
    localStorage.setItem('interviews', JSON.stringify(synced))
    window.dispatchEvent(new Event('applicationsUpdated'))

    setCompletionModalMeeting(null)
    setCompletionNotes('')
  }

  const upcomingList = meetings.filter((m) => m.status === 'Upcoming')
  const completedList = meetings.filter((m) => m.status === 'Completed')

  return (
    <main className="main-content">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <h1>Interviews & Meetings 📅</h1>
          <p>Schedule candidate calls, configure timely reminders, and revisit completed session recordings.</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button
          className={tab === 'Upcoming' ? '' : 'btn-outline'}
          style={tab === 'Upcoming' ? { background: '#1976d2', color: '#fff', borderColor: '#1976d2' } : {}}
          onClick={() => setTab('Upcoming')}
        >
          Upcoming ({upcomingList.length})
        </button>
        <button
          className={tab === 'Completed' ? '' : 'btn-outline'}
          style={tab === 'Completed' ? { background: '#1976d2', color: '#fff', borderColor: '#1976d2' } : {}}
          onClick={() => setTab('Completed')}
        >
          Completed ({completedList.length})
        </button>
      </div>

      {/* List */}
      {(tab === 'Upcoming' ? upcomingList : completedList).length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 40, textAlign: 'center' }}>
          <p style={{ color: '#888', margin: 0 }}>No {tab.toLowerCase()} meetings found.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
          {(tab === 'Upcoming' ? upcomingList : completedList).map((m) => (
            <div
              key={m.id}
              style={{
                background: '#fff',
                border: '1px solid #eee',
                borderRadius: 14,
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <h3 style={{ margin: '0 0 2px', fontSize: 18, color: '#1a1d2e' }}>{m.candidateName}</h3>
                    <div style={{ fontSize: 13.5, color: '#1976d2', fontWeight: 600 }}>{m.role}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, background: m.status === 'Completed' ? '#e8f5e9' : '#eef2ff', color: m.status === 'Completed' ? '#2e7d32' : '#1976d2', padding: '3px 8px', borderRadius: 12 }}>
                    {m.status}
                  </span>
                </div>

                <div style={{ background: '#f8f9fc', border: '1px solid #e8eaf2', borderRadius: 8, padding: '10px 12px', fontSize: 13, marginBottom: 14 }}>
                  <div>🎯 <strong>Round:</strong> {m.round}</div>
                  <div style={{ marginTop: 4 }}>📅 <strong>Date:</strong> {m.date} at {m.time}</div>
                  {m.duration && <div style={{ marginTop: 4 }}>⏱️ <strong>Duration:</strong> {m.duration}</div>}
                </div>

                {m.reminderMinutes && m.status === 'Upcoming' && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, background: '#fff8e1', color: '#f57f17', border: '1px solid #ffe082', padding: '3px 10px', borderRadius: 14, marginBottom: 14 }}>
                    🔔 Reminder set for {m.reminderMinutes} mins before
                  </div>
                )}

                {m.notes && (
                  <div style={{ fontSize: 12.5, color: '#555', background: '#fdfdfe', border: '1px solid #eee', padding: 10, borderRadius: 8, marginBottom: 14 }}>
                    <strong>Evaluation Notes:</strong> {m.notes}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {m.status === 'Upcoming' ? (
                  <>
                    <button
                      className="btn-outline"
                      style={{ flex: 1, fontSize: 12.5, padding: '8px' }}
                      onClick={() => setReminderModalMeeting(m)}
                    >
                      🔔 Set Reminder
                    </button>
                    <a
                      href={m.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        flex: 1,
                        background: '#1976d2',
                        color: '#fff',
                        borderRadius: 8,
                        fontSize: 12.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        padding: '8px',
                      }}
                    >
                      📹 Join Call
                    </a>
                    <button
                      style={{ width: '100%', background: '#2e7d32', color: '#fff', fontSize: 12.5, marginTop: 4 }}
                      onClick={() => setCompletionModalMeeting(m)}
                    >
                      ✓ Mark as Completed
                    </button>
                  </>
                ) : (
                  <button
                    style={{ width: '100%', background: '#1976d2', color: '#fff', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                    onClick={() => setActiveRecording(m)}
                  >
                    ▶ Watch Interview Recording
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reminder Picker Modal */}
      {reminderModalMeeting && (
        <div className="edit-overlay" onClick={() => setReminderModalMeeting(null)}>
          <div className="edit-modal" style={{ maxWidth: 380 }} onClick={(e) => e.stopPropagation()}>
            <div className="edit-header">
              <div>
                <h2>Set Meeting Reminder</h2>
                <p>Choose when to be alerted before {reminderModalMeeting.candidateName}'s interview.</p>
              </div>
              <button className="close-button" onClick={() => setReminderModalMeeting(null)}>×</button>
            </div>

            <div style={{ padding: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                {[5, 10, 15, 30].map((mins) => (
                  <button
                    key={mins}
                    className={reminderModalMeeting.reminderMinutes === mins ? '' : 'btn-outline'}
                    style={{ padding: '12px 8px', fontSize: 13 }}
                    onClick={() => handleSetReminder(mins)}
                  >
                    🔔 {mins} Minutes Before
                  </button>
                ))}
              </div>
              <button className="cancel-button" style={{ width: '100%' }} onClick={() => setReminderModalMeeting(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Complete Meeting Modal */}
      {completionModalMeeting && (
        <div className="edit-overlay" onClick={() => setCompletionModalMeeting(null)}>
          <div className="edit-modal" style={{ maxWidth: 440 }} onClick={(e) => e.stopPropagation()}>
            <div className="edit-header">
              <div>
                <h2>Complete Interview</h2>
                <p>Record notes and archive session for {completionModalMeeting.candidateName}.</p>
              </div>
              <button className="close-button" onClick={() => setCompletionModalMeeting(null)}>×</button>
            </div>

            <div style={{ padding: 20 }}>
              <div className="form-group">
                <label>Recruiter Evaluation & Feedback Notes</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Strong communication, answered all architecture questions accurately..."
                  value={completionNotes}
                  onChange={(e) => setCompletionNotes(e.target.value)}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setCompletionModalMeeting(null)}>Cancel</button>
                <button type="button" className="save-profile-button" onClick={handleCompleteMeeting}>Save & Move to Completed</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recording Player Modal */}
      {activeRecording && (
        <div className="edit-overlay" onClick={() => setActiveRecording(null)}>
          <div className="edit-modal" style={{ maxWidth: 580 }} onClick={(e) => e.stopPropagation()}>
            <div className="edit-header">
              <div>
                <h2>Interview Recording Replay 🎥</h2>
                <p>{activeRecording.candidateName} · {activeRecording.role} ({activeRecording.round})</p>
              </div>
              <button className="close-button" onClick={() => setActiveRecording(null)}>×</button>
            </div>

            <div style={{ padding: 20 }}>
              <div style={{ width: '100%', height: 260, background: '#111', borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <div style={{ fontSize: 48, marginBottom: 8 }}>▶️</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>Recorded Session ({activeRecording.duration || '45 mins'})</div>
                <div style={{ fontSize: 12, color: '#aaa', marginTop: 4 }}>Date: {activeRecording.date}</div>
              </div>

              <div style={{ marginTop: 16, background: '#f8f9fc', border: '1px solid #e8eaf2', borderRadius: 8, padding: 12, fontSize: 13 }}>
                <strong>Archived Recruiter Notes:</strong>
                <p style={{ margin: '4px 0 0', color: '#555' }}>{activeRecording.notes}</p>
              </div>

              <div className="form-actions" style={{ marginTop: 16 }}>
                <button type="button" className="save-profile-button" onClick={() => setActiveRecording(null)}>Done Watching</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
