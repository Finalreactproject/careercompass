import { useState } from 'react'

function ScheduleInterviewModal({ isOpen, candidates, onClose, onSchedule }) {
  const [candidateId, setCandidateId] = useState('')
  const [date, setDate] = useState('Aug 24, 2026')
  const [time, setTime] = useState('10:00 AM')
  const [round, setRound] = useState('Technical Round')

  if (!isOpen) return null

  // Validates that a candidate is selected, then hands the schedule data up to the parent
  function handleSubmit(formEvent) {
    formEvent.preventDefault()
    if (!candidateId) return
    onSchedule({ candidateId, date, time, round })
  }

  return (
    <div className="edit-overlay" onClick={onClose}>
      <div className="edit-modal" onClick={(clickEvent) => clickEvent.stopPropagation()}>
        <div className="edit-header">
          <div>
            <h2>Schedule Candidate Interview</h2>
            <p>Select candidate, interview round, date and time.</p>
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Candidate *</label>
            <select
              required
              value={candidateId}
              onChange={(changeEvent) => setCandidateId(changeEvent.target.value)}
            >
              <option value="">-- Choose Candidate --</option>
              {candidates.map((candidate) => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.name} ({candidate.role})
                </option>
              ))}
            </select>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Date</label>
              <input value={date} onChange={(changeEvent) => setDate(changeEvent.target.value)} />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input value={time} onChange={(changeEvent) => setTime(changeEvent.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label>Interview Round</label>
            <select value={round} onChange={(changeEvent) => setRound(changeEvent.target.value)}>
              <option>Technical Round</option>
              <option>System Architecture</option>
              <option>STAR Behavioral Interview</option>
              <option>Final Executive Review</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-profile-button">Confirm Schedule</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ScheduleInterviewModal
