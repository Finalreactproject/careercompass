import { useState } from 'react'

const STAGES = ['Applied', 'Screening', 'Interview', 'Offer', 'Accepted']
const DOC_TABS = [
  { key: 'cv',             label: '📄 CV' },
  { key: 'cover',          label: '📜 Cover Letter' },
  { key: 'recommendation', label: '🎓 Recommendation' },
]

function buildDocs(c) {
  const isGladys = c.name.toLowerCase().includes('gladys')
  return {
    education: isGladys
      ? 'B.Sc. Computer Science, University of Nairobi (Expected 2027) · GPA: 3.8/4.0'
      : `${c.role} Candidate · ${c.university} (Class of 2026)`,
    experience: isGladys
      ? [
          { role: 'Frontend Engineering Intern', org: 'TechSavvy Hub', period: 'May–Aug 2025', desc: 'Built React dashboards and optimized API caching by 35%.' },
          { role: 'Open Source Contributor',     org: 'Nairobi Dev Club', period: '2024–Present', desc: 'Maintained UI component library used by 200+ student devs.' },
        ]
      : [{ role: `Junior ${c.role}`, org: 'Academic Project Lead', period: '2025–2026', desc: 'Led capstone software project and team deliverables.' }],
    coverLetter: isGladys
      ? `Dear Hiring Team,\n\nI am writing to express my enthusiasm for the ${c.role} position. My coursework at the University of Nairobi and hands-on React projects have prepared me well. I look forward to contributing to your mission.\n\nSincerely,\nGladys Wanjiku`
      : `Dear Hiring Manager,\n\nI am eager to apply for the ${c.role} opportunity. With experience in ${c.skills?.slice(0, 3).join(', ')}, I am ready to bring value to your team.\n\nBest regards,\n${c.name}`,
    recommendation: isGladys
      ? `RECOMMENDATION\n\nTo the Recruiting Committee,\n\nGladys Wanjiku ranks in the top 5% of her cohort at UoN, demonstrating excellent code quality and collaborative leadership.\n\nRecommended without reservation.\n\nDr. Peter Mwangi\nSenior Lecturer, School of Computing`
      : `RECOMMENDATION\n\n${c.name} has demonstrated exemplary dedication and strong mastery of core concepts at ${c.university}. They would be a valuable addition to your team.\n\nProf. J. Omondi\nFaculty of Computing`,
  }
}

export default function CandidateReviewModal({ candidate, onClose, onAdvanceStage }) {
  const [docTab, setDocTab] = useState('cv')
  const [notes, setNotes] = useState('')

  if (!candidate) return null

  const docs = buildDocs(candidate)

  function advance(stage) {
    onAdvanceStage(candidate.id, stage, notes)
    setNotes('')
  }

  return (
    <div className="edit-overlay" onClick={onClose}>
      <div className="edit-modal" style={{ maxWidth: 640 }} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="edit-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <h2 style={{ margin: 0 }}>{candidate.name}</h2>
              <span style={{ fontSize: 11, background: 'honeydew', color: 'darkgreen', padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>ATS {candidate.atsScore}%</span>
              <span style={{ fontSize: 11, background: 'lavender', color: 'darkblue', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>Stage: {candidate.stage}</span>
            </div>
            <p style={{ margin: '4px 0 0', color: 'gray', fontSize: 13 }}>
              Applying for: <strong>{candidate.role}</strong> · {candidate.university}
            </p>
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        {/* Doc Tabs */}
        <div style={{ display: 'flex', gap: 6, padding: '12px 24px 0', borderBottom: '1px solid lightgray' }}>
          {DOC_TABS.map((t) => (
            <button key={t.key} type="button" className={docTab === t.key ? '' : 'btn-outline'} style={{ fontSize: 12, padding: '6px 14px', borderRadius: '6px 6px 0 0' }} onClick={() => setDocTab(t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Doc Body */}
        <div style={{ padding: 20, maxHeight: '55vh', overflowY: 'auto' }}>
          {docTab === 'cv' && (
            <div>
              <div style={{ background: 'whitesmoke', borderRadius: 8, padding: 14, marginBottom: 14, fontSize: 13 }}>
                <div>📧 <strong>Email:</strong> {candidate.email} · 📞 <strong>Phone:</strong> {candidate.phone}</div>
                <div style={{ marginTop: 4 }}>🎓 <strong>Education:</strong> {docs.education}</div>
                <div style={{ marginTop: 6, display: 'flex', gap: 12, color: 'steelblue' }}>
                  <span>🔗 github.com/{candidate.name.toLowerCase().replace(' ', '')}</span>
                  <span>🔗 linkedin.com/in/{candidate.name.toLowerCase().replace(' ', '')}</span>
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <strong style={{ fontSize: 13 }}>Verified Skills:</strong>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                  {candidate.skills?.map((sk) => <span key={sk} style={{ background: 'lavender', color: 'darkblue', padding: '3px 8px', borderRadius: 6, fontSize: 12 }}>{sk}</span>)}
                </div>
              </div>

              <div>
                <strong style={{ fontSize: 13 }}>Experience & Projects:</strong>
                {docs.experience.map((exp, i) => (
                  <div key={i} style={{ marginTop: 8, background: 'white', border: '1px solid lightgray', padding: 10, borderRadius: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600 }}>
                      <span>{exp.role} · {exp.org}</span>
                      <span style={{ fontSize: 12, color: 'gray' }}>{exp.period}</span>
                    </div>
                    <p style={{ margin: '4px 0 0', fontSize: 12, color: 'dimgray' }}>{exp.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {docTab === 'cover' && (
            <div style={{ background: 'white', border: '1px solid lightgray', borderRadius: 8, padding: 16, fontSize: 13, lineHeight: 1.6, whiteSpace: 'pre-wrap', color: 'dimgray' }}>
              {docs.coverLetter}
            </div>
          )}

          {docTab === 'recommendation' && (
            <div style={{ background: 'whitesmoke', border: '1px solid lightgray', borderRadius: 8, padding: 16, fontSize: 13, lineHeight: 1.6, whiteSpace: 'pre-wrap', color: 'dimgray' }}>
              {docs.recommendation}
            </div>
          )}

          {/* Decision */}
          <div style={{ borderTop: '1px solid lightgray', paddingTop: 16, marginTop: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Recruiter Notes:</label>
            <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Advancing to interview — strong portfolio..." style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid lightgray', fontSize: 13, marginBottom: 12 }} />
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'gray' }}>Move to:</span>
              {STAGES.map((st) => (
                <button key={st} type="button" className={candidate.stage === st ? '' : 'btn-outline'} style={{ fontSize: 12, padding: '5px 10px', background: candidate.stage === st ? 'steelblue' : 'transparent', color: candidate.stage === st ? 'white' : 'steelblue', borderColor: 'steelblue' }} onClick={() => advance(st)}>
                  {candidate.stage === st ? `✓ ${st}` : st}
                </button>
              ))}
              <button type="button" className="btn-danger" style={{ fontSize: 12, padding: '5px 10px' }} onClick={() => advance('Not Selected')}>Not Selected</button>
            </div>
          </div>
        </div>

        <div className="form-actions" style={{ padding: '12px 20px', borderTop: '1px solid lightgray' }}>
          <button type="button" className="cancel-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
