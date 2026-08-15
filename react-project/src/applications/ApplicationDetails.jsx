import { useState } from 'react'

const STAGES = ['Saved', 'Applied', 'Screening', 'Interview', 'Offer', 'Accepted', 'Not Selected']

function ApplicationDetails({ app, onBack, onStatusChange, onViewOffer, onPracticeInterview }) {
  const [note, setNote] = useState(app?.notes || '')
  const [editing, setEditing] = useState(false)

  if (!app) return <main className="main-content"><p>Not found. <button onClick={onBack}>Go back</button></p></main>

  const isExternal = app.source === 'external_api'
  const progressStages = ['Applied', 'Screening', 'Interview', 'Offer', 'Accepted']

  function saveNote() {
    onStatusChange(app.id, app.status, note)
    setEditing(false)
  }

  return (
    <main className="main-content">
      <button className="btn-outline" style={{ marginBottom: 20 }} onClick={onBack}>← Back to Applications</button>

      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <h1 style={{ margin: 0, fontSize: 22 }}>{app.title}</h1>
            <span style={{ fontSize: 11, background: isExternal ? 'lightcyan' : 'lavender', color: isExternal ? 'steelblue' : 'darkblue', padding: '3px 8px', borderRadius: 8, fontWeight: 600 }}>
              {isExternal ? '🌐 External' : '⚡ Verified'}
            </span>
          </div>
          <p style={{ margin: '4px 0 0', color: 'slateblue', fontWeight: 600 }}>{app.company}{app.location ? ` · 📍 ${app.location}` : ''}</p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {(app.status === 'Offer' || app.status === 'Accepted') && onViewOffer && (
            <button onClick={() => onViewOffer(app)}>📜 View Offer</button>
          )}
          {app.status === 'Interview' && onPracticeInterview && (
            <button onClick={() => onPracticeInterview({ role: app.title, company: app.company })}>🎯 Practice</button>
          )}
          <span className="status-badge">Stage: {app.status}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="stage-stepper" style={{ marginBottom: 24 }}>
        {progressStages.map((stage, i) => {
          const done = i <= progressStages.indexOf(app.status)
          const current = app.status === stage
          return (
            <div key={stage} className={`stage-step ${done ? 'done' : ''} ${current ? 'current' : ''}`}>
              <div className="stage-dot">{done && !current ? '✓' : i + 1}</div>
              <span>{stage}</span>
            </div>
          )
        })}
      </div>

      {/* Status */}
      <div className="detail-card">
        <h3>Application Status</h3>
        {!isExternal ? (
          <div style={{ background: 'whitesmoke', borderRadius: 8, padding: 14, fontSize: 13, color: 'dimgray' }}>
            <strong>Employer-Managed:</strong> {app.company} updates this as your application moves forward.
            {app.notes && <div style={{ marginTop: 8, color: 'slateblue', fontWeight: 600 }}>Latest: {app.notes}</div>}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <label style={{ fontSize: 13, color: 'dimgray' }}>Update your progress:</label>
            <select value={app.status} onChange={(e) => onStatusChange(app.id, e.target.value, note)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid lightgray' }}>
              {STAGES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="detail-card">
        <h3>My Notes</h3>
        {editing ? (
          <>
            <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add prep notes, contacts, follow-up dates..." style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid lightgray', fontSize: 14 }} />
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button onClick={saveNote}>Save</button>
              <button className="btn-outline" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <p style={{ color: note ? 'black' : 'gray', fontSize: 14, margin: '0 0 10px' }}>{note || 'No notes yet.'}</p>
            <button className="btn-outline" onClick={() => setEditing(true)}>{note ? 'Edit Note' : '+ Add Note'}</button>
          </>
        )}
      </div>

      {/* Info */}
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
