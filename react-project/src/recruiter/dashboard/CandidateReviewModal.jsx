import { useState } from 'react'

// Modal for recruiter to inspect stage-specific candidate details and advance stage
function CandidateReviewModal({ candidate, onClose, onAdvanceStage }) {
  const [activeStageTab, setActiveStageTab] = useState(candidate?.stage || 'Applied')
  const [decisionNotes, setDecisionNotes] = useState('')

  if (!candidate) return null

  function handleStageAction(targetStage) {
    onAdvanceStage(candidate.id, targetStage, decisionNotes)
    setDecisionNotes('')
  }

  const stageTabs = ['Applied', 'Screening', 'Interview', 'Offer', 'Accepted']

  return (
    <div className="edit-overlay" onClick={onClose}>
      <div className="edit-modal" style={{ maxWidth: 580 }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="edit-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h2>{candidate.name}</h2>
              <span style={{ fontSize: 11, background: '#e8f5e9', color: '#2e7d32', padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>
                ATS {candidate.atsScore}%
              </span>
              <span style={{ fontSize: 11, background: '#f0e6ff', color: '#6244a0', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>
                Current: {candidate.stage}
              </span>
            </div>
            <p style={{ margin: '4px 0 0', color: '#888' }}>
              Role: <strong style={{ color: '#252b45' }}>{candidate.role}</strong> · {candidate.university}
            </p>
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        {/* Stage Inspection Tabs */}
        <div style={{ display: 'flex', gap: 6, padding: '12px 24px 0', borderBottom: '1px solid #eee', overflowX: 'auto' }}>
          {stageTabs.map((s) => (
            <button
              key={s}
              type="button"
              className={activeStageTab === s ? '' : 'btn-outline'}
              style={{
                fontSize: 12,
                padding: '6px 12px',
                borderRadius: '8px 8px 0 0',
                borderBottom: activeStageTab === s ? '2px solid #6244a0' : 'none',
              }}
              onClick={() => setActiveStageTab(s)}
            >
              {s} {candidate.stage === s ? '📍' : ''}
            </button>
          ))}
        </div>

        <div style={{ padding: 24, maxHeight: '65vh', overflowY: 'auto' }}>
          {/* 1. APPLIED STAGE DETAILS */}
          {activeStageTab === 'Applied' && (
            <div>
              <h4 style={{ margin: '0 0 10px', color: '#252b45', fontSize: 14 }}>Applicant Information & CV Profile</h4>
              <div style={{ background: '#f8f8fc', border: '1px solid #eee', borderRadius: 10, padding: 14, fontSize: 13, marginBottom: 14 }}>
                <div>📧 <strong>Email:</strong> {candidate.email}</div>
                <div style={{ marginTop: 4 }}>📞 <strong>Phone:</strong> {candidate.phone}</div>
                <div style={{ marginTop: 4 }}>🎓 <strong>University:</strong> {candidate.university}</div>
                <div style={{ marginTop: 4 }}>📅 <strong>Applied Date:</strong> {candidate.appliedDate}</div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <strong style={{ fontSize: 13 }}>Candidate Skills:</strong>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                  {candidate.skills?.map((skill) => (
                    <span key={skill} style={{ background: '#f0e6ff', color: '#6244a0', padding: '3px 8px', borderRadius: 6, fontSize: 12 }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <strong style={{ fontSize: 13 }}>Application Bio & Summary:</strong>
                <p style={{ margin: '6px 0 0', color: '#555', fontSize: 13, lineHeight: 1.5, background: '#fff', border: '1px solid #eee', padding: 10, borderRadius: 8 }}>
                  {candidate.notes || 'Strong candidate with practical project experience and solid technical grounding.'}
                </p>
              </div>
            </div>
          )}

          {/* 2. SCREENING STAGE DETAILS */}
          {activeStageTab === 'Screening' && (
            <div>
              <h4 style={{ margin: '0 0 10px', color: '#252b45', fontSize: 14 }}>Initial Screening & Phone Check</h4>
              <p style={{ fontSize: 13, color: '#666', margin: '0 0 12px' }}>
                Evaluate communication skills, work availability, and basic technical fit.
              </p>
              <div style={{ background: '#f8f8fc', border: '1px solid #eee', borderRadius: 10, padding: 14, fontSize: 13, marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span>✓</span> <span>Identity & KRA Registration Verified</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span>✓</span> <span>Location & Remote Readiness: Nairobi (Hybrid)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>✓</span> <span>ATS Resume Score Passed (Threshold: 80%+)</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. INTERVIEW STAGE DETAILS */}
          {activeStageTab === 'Interview' && (
            <div>
              <h4 style={{ margin: '0 0 10px', color: '#252b45', fontSize: 14 }}>Scheduled Technical & STAR Interview</h4>
              <div style={{ background: '#f8f8fc', border: '1px solid #eee', borderRadius: 10, padding: 14, fontSize: 13, marginBottom: 14 }}>
                <div>🎯 <strong>Interview Round:</strong> {candidate.interviewRound || 'Technical Round'}</div>
                <div style={{ marginTop: 4 }}>📅 <strong>Scheduled Date:</strong> {candidate.interviewDate || 'Aug 24, 2026 at 10:00 AM'}</div>
                <div style={{ marginTop: 4 }}>📹 <strong>Google Meet:</strong> https://meet.google.com/saf-interview</div>
              </div>
              <p style={{ fontSize: 12, color: '#6244a0', margin: 0 }}>
                💡 When moved to Interview, this automatically syncs to the candidate's Interviews & Prep Hub with role-specific AI practice questions.
              </p>
            </div>
          )}

          {/* 4. OFFER STAGE DETAILS */}
          {activeStageTab === 'Offer' && (
            <div>
              <h4 style={{ margin: '0 0 10px', color: '#252b45', fontSize: 14 }}>Official Job Offer Package</h4>
              <div style={{ background: '#e8f5e9', border: '1px solid #c8e6c9', borderRadius: 10, padding: 14, fontSize: 13, marginBottom: 14 }}>
                <div>💵 <strong>Compensation:</strong> KES 140,000 – 190,000 / month</div>
                <div style={{ marginTop: 4 }}>📅 <strong>Target Start Date:</strong> September 1, 2026</div>
                <div style={{ marginTop: 4 }}>🏥 <strong>Benefits:</strong> Comprehensive Health Cover + Hybrid Work</div>
              </div>
              <p style={{ fontSize: 12, color: '#2e7d32', margin: 0 }}>
                ✓ The candidate will receive a digital offer letter to review and sign on their portal.
              </p>
            </div>
          )}

          {/* 5. ACCEPTED STAGE DETAILS */}
          {activeStageTab === 'Accepted' && (
            <div>
              <h4 style={{ margin: '0 0 10px', color: '#2e7d32', fontSize: 14 }}>Candidate Accepted & Signed 🎉</h4>
              <div style={{ background: '#e8f5e9', border: '1px solid #c8e6c9', borderRadius: 10, padding: 14, fontSize: 13 }}>
                <div>✓ <strong>Employment Agreement Digitally Signed</strong></div>
                <div style={{ marginTop: 4, color: '#555' }}>Candidate confirmed start date and onboarding readiness.</div>
              </div>
            </div>
          )}

          {/* Decision Notes & Advance Stage Actions */}
          <div style={{ borderTop: '1px solid #eee', paddingTop: 16, marginTop: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#252b45', marginBottom: 6 }}>
              Recruiter Decision Notes (Sent with notification):
            </label>
            <input
              type="text"
              value={decisionNotes}
              onChange={(e) => setDecisionNotes(e.target.value)}
              placeholder="e.g. Great technical foundation, advancing to interview round..."
              style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 13, marginBottom: 12 }}
            />

            <div style={{ fontSize: 13, fontWeight: 600, color: '#252b45', marginBottom: 8 }}>
              Advance Candidate to Stage:
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {stageTabs.map((st) => (
                <button
                  key={st}
                  type="button"
                  className={candidate.stage === st ? '' : 'btn-outline'}
                  style={{
                    fontSize: 12,
                    padding: '6px 12px',
                    background: candidate.stage === st ? '#6244a0' : 'transparent',
                    color: candidate.stage === st ? '#fff' : '#6244a0',
                  }}
                  onClick={() => handleStageAction(st)}
                >
                  {candidate.stage === st ? `Current (${st})` : `Move to ${st} →`}
                </button>
              ))}
              <button
                type="button"
                className="btn-danger"
                style={{ fontSize: 12, padding: '6px 12px' }}
                onClick={() => handleStageAction('Rejected')}
              >
                Reject Application
              </button>
            </div>
          </div>

          <div className="form-actions" style={{ marginTop: 20 }}>
            <button type="button" className="cancel-button" onClick={onClose}>Close Profile</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateReviewModal
