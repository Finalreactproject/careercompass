import { useState } from 'react'

const CHECKLIST = [
  'Research company background and products',
  'Review STAR stories for technical challenges',
  'Test microphone and camera setup',
  'Prepare 3 questions for the interviewer',
]

function InterviewDetails({ interview, onBack, onPractice, onUpdateInterview }) {
  const [checklist, setChecklist] = useState(
    () => interview?.checklist || CHECKLIST.map((text) => ({ text, checked: false }))
  )
  const [outcome, setOutcome] = useState(interview?.outcome || 'Pending')

  if (!interview) return <main className="main-content"><p>Not found. <button onClick={onBack}>Go back</button></p></main>

  function toggleCheck(idx) {
    const updated = checklist.map((item, i) => i === idx ? { ...item, checked: !item.checked } : item)
    setChecklist(updated)
    onUpdateInterview?.(interview.id, { ...interview, checklist: updated })
  }

  function setOutcomeStatus(value) {
    setOutcome(value)
    onUpdateInterview?.(interview.id, {
      ...interview,
      outcome: value,
      status: value === 'Pending' ? 'Upcoming' : 'Completed',
    })
  }

  const done = checklist.filter((c) => c.checked).length

  return (
    <main className="main-content">
      <button className="btn-outline" style={{ marginBottom: 16 }} onClick={onBack}>← Back to Interviews</button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22 }}>{interview.company}</h1>
          <p style={{ margin: '4px 0 0', color: 'slateblue', fontWeight: 600 }}>{interview.role} · {interview.round || 'Technical Round'}</p>
          <small style={{ color: 'gray' }}>📅 {interview.date} at {interview.time || '10:00 AM'}</small>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {interview.meetingLink && (
            <a href={interview.meetingLink} target="_blank" rel="noreferrer" style={{ background: 'steelblue', color: 'white', padding: '8px 14px', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
              📹 Launch Call
            </a>
          )}
          <button onClick={() => onPractice(interview)}>🎯 Practice Room</button>
        </div>
      </div>

      <div className="detail-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <h3 style={{ margin: 0 }}>Prep Checklist</h3>
          <span style={{ fontSize: 12, color: 'gray' }}>{done}/{checklist.length} done</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {checklist.map((item, idx) => (
            <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: item.checked ? 'lavender' : 'whitesmoke', borderRadius: 6, cursor: 'pointer', fontSize: 13, textDecoration: item.checked ? 'line-through' : 'none' }}>
              <input type="checkbox" checked={item.checked} onChange={() => toggleCheck(idx)} />
              {item.text}
            </label>
          ))}
        </div>
      </div>

      <div className="detail-card">
        <h3>Interview Outcome</h3>
        <p style={{ fontSize: 13, color: 'dimgray', margin: '0 0 10px' }}>Current: <strong>{outcome}</strong></p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['Pending', 'Passed to Next Round', 'Offer Received 🎉', 'Not Selected'].map((s) => (
            <button key={s} className={outcome === s ? '' : 'btn-outline'} style={{ fontSize: 12, padding: '6px 12px' }} onClick={() => setOutcomeStatus(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}

export default InterviewDetails
