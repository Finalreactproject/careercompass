import { useState } from 'react'

const DEFAULT_CHECKLIST = [
  'Research company background and products',
  'Review STAR stories for technical challenges',
  'Test microphone and camera setup',
  'Prepare 3 questions for the interviewer',
]

function InterviewDetails({ interview, onBack, onPractice, onUpdateInterview }) {
  const [checklist, setChecklist] = useState(() => {
    return interview?.checklist || DEFAULT_CHECKLIST.map((text) => ({ text, checked: false }))
  })
  const [outcome, setOutcome] = useState(interview?.outcome || 'Pending')

  if (!interview) {
    return <main className="main-content"><p>Interview not found. <button onClick={onBack}>Go back</button></p></main>
  }

  function toggleCheck(idx) {
    const updated = checklist.map((item, i) => (i === idx ? { ...item, checked: !item.checked } : item))
    setChecklist(updated)
    if (onUpdateInterview) onUpdateInterview(interview.id, { ...interview, checklist: updated })
  }

  function handleSetOutcome(newOutcome) {
    setOutcome(newOutcome)
    if (onUpdateInterview) {
      onUpdateInterview(interview.id, { ...interview, outcome: newOutcome, status: newOutcome === 'Pending' ? 'Upcoming' : 'Completed' })
    }
  }

  const completedCount = checklist.filter((c) => c.checked).length

  return (
    <main className="main-content">
      <button className="btn-outline" style={{ marginBottom: 16 }} onClick={onBack}>
        ← Back to Interviews
      </button>

      {/* Header */}
      <div className="app-detail-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22 }}>{interview.company}</h1>
          <p style={{ margin: '4px 0 0', color: '#6244a0', fontWeight: 600 }}>{interview.role} · {interview.round || 'Technical Round'}</p>
          <small style={{ color: '#888' }}>📅 {interview.date} at {interview.time || '10:00 AM'}</small>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {interview.meetingLink && (
            <a
              href={interview.meetingLink}
              target="_blank"
              rel="noreferrer"
              style={{ background: '#1976d2', color: '#fff', padding: '8px 14px', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}
            >
              📹 Launch Call
            </a>
          )}
          <button onClick={() => onPractice(interview)}>🎯 Practice Room</button>
        </div>
      </div>

      {/* Prep Checklist */}
      <div className="detail-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <h3 style={{ margin: 0 }}>Prep Checklist</h3>
          <span style={{ fontSize: 12, color: '#888' }}>{completedCount}/{checklist.length} done</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {checklist.map((item, idx) => (
            <label
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 12px',
                background: item.checked ? '#f9f6ff' : '#fafafa',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 13,
                textDecoration: item.checked ? 'line-through' : 'none',
              }}
            >
              <input type="checkbox" checked={item.checked} onChange={() => toggleCheck(idx)} />
              <span>{item.text}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Outcome */}
      <div className="detail-card">
        <h3>Interview Outcome</h3>
        <p style={{ fontSize: 13, color: '#666', margin: '0 0 10px' }}>Current status: <strong>{outcome}</strong></p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['Pending', 'Passed to Next Round', 'Offer Received 🎉', 'Not Selected'].map((status) => (
            <button
              key={status}
              className={outcome === status ? '' : 'btn-outline'}
              style={{ fontSize: 12, padding: '6px 12px' }}
              onClick={() => handleSetOutcome(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}

export default InterviewDetails
