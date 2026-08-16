import { useState } from 'react'

const STAGES = ['Saved', 'Applied', 'Interview', 'Offer', 'Accepted', 'Not Selected']

function ApplicationDetails({ application, onBack, onStatusChange, onViewOffer, onPracticeInterview }) {
  const [note, setNote] = useState(application?.notes || '')
  const [editing, setEditing] = useState(false)

  if (!application) {
    return (
      <main className="main-content">
        <p>
          Not found. <button onClick={onBack}>Go back</button>
        </p>
      </main>
    )
  }

  const isExternal = application.source === 'external_api'
  const progressStages = ['Applied', 'Interview', 'Offer', 'Accepted']

  function saveNote() {
    onStatusChange(application.id, application.status, note)
    setEditing(false)
  }

  function handleStageSelect(event) {
    const newStatus = event.target.value
    onStatusChange(application.id, newStatus, note)
  }

  return (
    <main className="main-content">
      <button className="btn-outline" style={{ marginBottom: 20 }} onClick={onBack}>
        ← Back to Applications
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <h1 style={{ margin: 0, fontSize: 22 }}>{application.title}</h1>
            <span
              style={{
                fontSize: 11,
                background: isExternal ? 'lightcyan' : 'lavender',
                color: isExternal ? 'steelblue' : 'darkblue',
                padding: '3px 8px',
                borderRadius: 8,
                fontWeight: 600,
              }}
            >
              {isExternal ? 'External' : 'Verified'}
            </span>
          </div>
          <p style={{ margin: '4px 0 0', color: 'slateblue', fontWeight: 600 }}>
            {application.company}{application.location ? ` · ${application.location}` : ''}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {(application.status === 'Offer' || application.status === 'Accepted') && onViewOffer && (
            <button onClick={() => onViewOffer(application)}>View Offer</button>
          )}
          {application.status === 'Interview' && onPracticeInterview && (
            <button onClick={() => onPracticeInterview({ role: application.title, company: application.company })}>
              Practice
            </button>
          )}
          <span className="status-badge">Stage: {application.status}</span>
        </div>
      </div>

      <div className="stage-stepper" style={{ marginBottom: 24 }}>
        {progressStages.map((stage, index) => {
          const currentIndex = progressStages.indexOf(application.status)
          const isDone = index <= currentIndex
          const isCurrent = application.status === stage

          return (
            <div key={stage} className={`stage-step ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}>
              <div className="stage-dot">{isDone && !isCurrent ? '✓' : index + 1}</div>
              <span>{stage}</span>
            </div>
          )
        })}
      </div>

      <div className="detail-card">
        <h3>Application Status</h3>
        {!isExternal ? (
          <div style={{ background: 'whitesmoke', borderRadius: 8, padding: 14, fontSize: 13, color: 'dimgray' }}>
            <strong>Employer-Managed:</strong> {application.company} updates this as your application moves forward.
            {application.notes && <div style={{ marginTop: 8, color: 'slateblue', fontWeight: 600 }}>Latest: {application.notes}</div>}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <label style={{ fontSize: 13, color: 'dimgray' }}>Update your progress:</label>
            <select
              value={application.status}
              onChange={handleStageSelect}
              style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid lightgray' }}
            >
              {STAGES.map((stageOption) => (
                <option key={stageOption} value={stageOption}>
                  {stageOption}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="detail-card">
        <h3>My Notes</h3>
        {editing ? (
          <>
            <textarea
              rows={3}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Add prep notes, contacts, follow-up dates..."
              style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid lightgray', fontSize: 14 }}
            />
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button onClick={saveNote}>Save</button>
              <button className="btn-outline" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p style={{ color: note ? 'black' : 'gray', fontSize: 14, margin: '0 0 10px' }}>
              {note || 'No notes yet.'}
            </p>
            <button className="btn-outline" onClick={() => setEditing(true)}>
              {note ? 'Edit Note' : '+ Add Note'}
            </button>
          </>
        )}
      </div>

      <div className="detail-card">
        <h3>Application Info</h3>
        <div className="detail-fields">
          <div>
            <label>Role</label>
            <p>{application.title}</p>
          </div>
          <div>
            <label>Company</label>
            <p>{application.company}</p>
          </div>
          {application.location && (
            <div>
              <label>Location</label>
              <p>{application.location}</p>
            </div>
          )}
          {application.date && (
            <div>
              <label>Applied Date</label>
              <p>{application.date}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default ApplicationDetails
