import { useState } from 'react'

const STAGES = ['Saved', 'Applied', 'Screening', 'Interview', 'Offer', 'Accepted', 'Rejected']

// Detailed view for a single application
function ApplicationDetails({ app, onBack, onStatusChange, onViewOffer, onPracticeInterview }) {
  const [note, setNote] = useState(app?.notes || '')
  const [editingNote, setEditingNote] = useState(false)

  if (!app) {
    return (
      <main className="main-content">
        <p>Application not found. <button onClick={onBack}>Go back</button></p>
      </main>
    )
  }

  const isPlatformJob = app.source !== 'external_api'

  function handleSaveNote() {
    onStatusChange(app.id, app.status, note)
    setEditingNote(false)
  }

  return (
    <main className="main-content">
      <button className="btn-outline" style={{ marginBottom: 20 }} onClick={onBack}>
        ← Back to Applications
      </button>

      {/* Title & actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <h1 style={{ margin: 0, fontSize: 22 }}>{app.title}</h1>
            <span style={{ fontSize: 11, background: isPlatformJob ? '#f0e6ff' : '#e0f2fe', color: isPlatformJob ? '#6244a0' : '#0284c7', padding: '3px 8px', borderRadius: 8, fontWeight: 600 }}>
              {isPlatformJob ? '⚡ CareerCompass Verified' : '🌐 External Job'}
            </span>
          </div>
          <p style={{ margin: '4px 0 0', color: '#6244a0', fontWeight: 600 }}>
            {app.company} {app.location ? `· 📍 ${app.location}` : ''}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {(app.status === 'Offer' || app.status === 'Accepted') && onViewOffer && (
            <button onClick={() => onViewOffer(app)}>📜 View Offer Package</button>
          )}
          {app.status === 'Interview' && onPracticeInterview && (
            <button onClick={() => onPracticeInterview({ role: app.title, company: app.company })}>🎯 Practice Interview</button>
          )}
          <span className="status-badge">Stage: {app.status}</span>
        </div>
      </div>

      {/* Progress tracker */}
      <div className="stage-stepper" style={{ marginBottom: 24 }}>
        {['Applied', 'Screening', 'Interview', 'Offer', 'Accepted'].map((stage, i) => {
          const stages = ['Applied', 'Screening', 'Interview', 'Offer', 'Accepted']
          const isDone = i <= stages.indexOf(app.status)
          const isCurrent = app.status === stage

          return (
            <div key={stage} className={`stage-step ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}>
              <div className="stage-dot">{isDone && !isCurrent ? '✓' : i + 1}</div>
              <span>{stage}</span>
            </div>
          )
        })}
      </div>

      {/* Stage management status */}
      <div className="detail-card">
        <h3>Application Status</h3>
        {isPlatformJob ? (
          <div style={{ background: '#f8f8fc', border: '1px solid #eee', borderRadius: 8, padding: 14, fontSize: 13, color: '#555' }}>
            <strong>Employer-Managed Application:</strong>
            <div style={{ marginTop: 4 }}>
              The hiring team at <strong>{app.company}</strong> updates this status as your application advances.
            </div>
            {app.notes && (
              <div style={{ marginTop: 8, color: '#6244a0', fontWeight: 600 }}>Latest update: {app.notes}</div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <label style={{ fontSize: 13, color: '#555' }}>Update your progress:</label>
            <select
              value={app.status}
              onChange={(e) => onStatusChange(app.id, e.target.value, note)}
              style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd' }}
            >
              {STAGES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Notes section */}
      <div className="detail-card">
        <h3>My Notes</h3>
        {editingNote ? (
          <>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add your interview prep notes, contacts, follow-up dates..."
              style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', fontSize: 14 }}
            />
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button onClick={handleSaveNote}>Save Note</button>
              <button className="btn-outline" onClick={() => setEditingNote(false)}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <p style={{ color: note ? '#252b45' : '#888', fontSize: 14, margin: '0 0 10px' }}>
              {note || 'No notes added yet.'}
            </p>
            <button className="btn-outline" onClick={() => setEditingNote(true)}>
              {note ? 'Edit Note' : '+ Add Note'}
            </button>
          </>
        )}
      </div>

      {/* Application overview info */}
      <div className="detail-card">
        <h3>Application Info</h3>
        <div className="detail-fields">
          <div><label>Role</label><p>{app.title}</p></div>
          <div><label>Company</label><p>{app.company}</p></div>
          {app.location && <div><label>Location</label><p>{app.location}</p></div>}
          {app.date && <div><label>Applied Date</label><p>{app.date}</p></div>}
        </div>
      </div>
    </main>
  )
}

export default ApplicationDetails
