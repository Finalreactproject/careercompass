import { useState } from 'react'

export default function CandidateReviewModal({ candidate, onClose, onAdvanceStage }) {
  const [docTab, setDocTab] = useState('cv') // 'cv' | 'cover' | 'recommendation'
  const [decisionNotes, setDecisionNotes] = useState('')

  if (!candidate) return null

  const isGladys = candidate.name.toLowerCase().includes('gladys')

  const candidateData = {
    ...candidate,
    bio: candidate.notes || 'Passionate Computer Science student with practical full-stack development experience.',
    education: isGladys
      ? 'B.Sc. in Computer Science, University of Nairobi (Expected 2027) · GPA: 3.8/4.0'
      : `${candidate.role} Candidate · ${candidate.university} (Class of 2026)`,
    experience: isGladys
      ? [
          { role: 'Frontend Engineering Intern', org: 'TechSavvy Hub', period: 'May 2025 – Aug 2025', desc: 'Built responsive React dashboards and optimized API payload caching by 35%.' },
          { role: 'Open Source Contributor', org: 'Nairobi Dev Club', period: '2024 – Present', desc: 'Maintained UI component library used by 200+ student developers.' },
        ]
      : [
          { role: `Junior ${candidate.role}`, org: 'Academic Project Lead', period: '2025 – 2026', desc: 'Led capstone software project development and team deliverables.' },
        ],
    coverLetter: isGladys
      ? `Dear Hiring Team,\n\nI am writing to express my strong enthusiasm for the ${candidate.role} position at your organization. Having closely followed your technological impact across the region, I am inspired by your commitment to innovation.\n\nThrough my coursework at the University of Nairobi and hands-on projects in React and modern web architectures, I have built practical skills in creating performant user interfaces. I look forward to contributing to your team's mission.\n\nSincerely,\nGladys Wanjiku`
      : `Dear Hiring Manager,\n\nI am eager to apply for the ${candidate.role} opportunity. With a solid foundation from ${candidate.university} and hands-on experience in ${candidate.skills?.slice(0, 3).join(', ')}, I am excited to bring value to your engineering team.\n\nBest regards,\n${candidate.name}`,
    recommendation: isGladys
      ? `ACADEMIC & PROFESSIONAL RECOMMENDATION\n\nTo the Recruiting Committee,\n\nI am pleased to write this recommendation for Gladys Wanjiku. As her Department Lecturer at the University of Nairobi, I have witnessed her exceptional analytical abilities and problem-solving drive.\n\nGladys ranks in the top 5% of her cohort, demonstrating rigorous attention to code quality and collaborative leadership during group software engineering labs.\n\nRecommended without reservation.\n\nDr. Peter Mwangi\nSenior Lecturer, School of Computing\nUniversity of Nairobi`
      : `RECOMMENDATION LETTER\n\nTo Whom It May Concern,\n\n${candidate.name} has demonstrated exemplary dedication and strong mastery of core concepts at ${candidate.university}. They would be a valuable addition to your team.\n\nProf. J. Omondi\nFaculty of Computing & Informatics`,
  }

  function handleStageAction(targetStage) {
    onAdvanceStage(candidate.id, targetStage, decisionNotes)
    setDecisionNotes('')
  }

  const stages = ['Applied', 'Screening', 'Interview', 'Offer', 'Accepted']

  return (
    <div className="edit-overlay" onClick={onClose}>
      <div className="edit-modal" style={{ maxWidth: 640 }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="edit-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <h2 style={{ margin: 0 }}>{candidate.name}</h2>
              <span style={{ fontSize: 11, background: '#e8f5e9', color: '#2e7d32', padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>
                ATS Match {candidate.atsScore}%
              </span>
              <span style={{ fontSize: 11, background: '#f0e6ff', color: '#6244a0', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>
                Stage: {candidate.stage}
              </span>
            </div>
            <p style={{ margin: '4px 0 0', color: '#666', fontSize: 13 }}>
              Applying for: <strong style={{ color: '#252b45' }}>{candidate.role}</strong> · {candidate.university}
            </p>
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        {/* Document Tabs */}
        <div style={{ display: 'flex', gap: 6, padding: '12px 24px 0', borderBottom: '1px solid #eee' }}>
          <button
            type="button"
            className={docTab === 'cv' ? '' : 'btn-outline'}
            style={{ fontSize: 12, padding: '6px 14px', borderRadius: '6px 6px 0 0' }}
            onClick={() => setDocTab('cv')}
          >
            📄 Curriculum Vitae (CV)
          </button>
          <button
            type="button"
            className={docTab === 'cover' ? '' : 'btn-outline'}
            style={{ fontSize: 12, padding: '6px 14px', borderRadius: '6px 6px 0 0' }}
            onClick={() => setDocTab('cover')}
          >
            📜 Cover Letter
          </button>
          <button
            type="button"
            className={docTab === 'recommendation' ? '' : 'btn-outline'}
            style={{ fontSize: 12, padding: '6px 14px', borderRadius: '6px 6px 0 0' }}
            onClick={() => setDocTab('recommendation')}
          >
            🎓 Recommendation Letter
          </button>
        </div>

        {/* Document Body */}
        <div style={{ padding: 20, maxHeight: '55vh', overflowY: 'auto' }}>
          {docTab === 'cv' && (
            <div>
              <div style={{ background: '#f8f9fc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 14, marginBottom: 14, fontSize: 13 }}>
                <div>📧 <strong>Email:</strong> {candidate.email} · 📞 <strong>Phone:</strong> {candidate.phone}</div>
                <div style={{ marginTop: 4 }}>🎓 <strong>Education:</strong> {candidateData.education}</div>
                <div style={{ marginTop: 6, display: 'flex', gap: 12, color: '#1976d2' }}>
                  <span>🔗 github.com/{candidate.name.toLowerCase().replace(' ', '')}</span>
                  <span>🔗 linkedin.com/in/{candidate.name.toLowerCase().replace(' ', '')}</span>
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <strong style={{ fontSize: 13, color: '#1a1d2e' }}>Verified Skills:</strong>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                  {candidate.skills?.map((sk) => (
                    <span key={sk} style={{ background: '#f0ecf9', color: '#6244a0', padding: '3px 8px', borderRadius: 6, fontSize: 12 }}>
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <strong style={{ fontSize: 13, color: '#1a1d2e' }}>Experience & Projects:</strong>
                {candidateData.experience.map((exp, i) => (
                  <div key={i} style={{ marginTop: 8, background: '#fff', border: '1px solid #eee', padding: 10, borderRadius: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600 }}>
                      <span>{exp.role} · {exp.org}</span>
                      <span style={{ fontSize: 12, color: '#888' }}>{exp.period}</span>
                    </div>
                    <p style={{ margin: '4px 0 0', fontSize: 12.5, color: '#555' }}>{exp.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {docTab === 'cover' && (
            <div style={{ background: '#fdfdfe', border: '1px solid #eee', borderRadius: 8, padding: 16, fontSize: 13, lineHeight: 1.6, whiteSpace: 'pre-wrap', color: '#333' }}>
              {candidateData.coverLetter}
            </div>
          )}

          {docTab === 'recommendation' && (
            <div style={{ background: '#fafafc', border: '1px solid #e0e4ec', borderRadius: 8, padding: 16, fontSize: 13, lineHeight: 1.6, whiteSpace: 'pre-wrap', color: '#333' }}>
              {candidateData.recommendation}
            </div>
          )}

          {/* Decision Notes & Stage Progression */}
          <div style={{ borderTop: '1px solid #eee', paddingTop: 16, marginTop: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#252b45', marginBottom: 6 }}>
              Recruiter Decision Notes:
            </label>
            <input
              type="text"
              value={decisionNotes}
              onChange={(e) => setDecisionNotes(e.target.value)}
              placeholder="e.g. Reviewed portfolio documents, advancing to interview..."
              style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 13, marginBottom: 12 }}
            />

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#666' }}>Move Stage:</span>
              {stages.map((st) => (
                <button
                  key={st}
                  type="button"
                  className={candidate.stage === st ? '' : 'btn-outline'}
                  style={{
                    fontSize: 12,
                    padding: '5px 10px',
                    background: candidate.stage === st ? '#1976d2' : 'transparent',
                    color: candidate.stage === st ? '#fff' : '#1976d2',
                    borderColor: '#1976d2',
                  }}
                  onClick={() => handleStageAction(st)}
                >
                  {candidate.stage === st ? `✓ ${st}` : st}
                </button>
              ))}
              <button
                type="button"
                className="btn-danger"
                style={{ fontSize: 12, padding: '5px 10px' }}
                onClick={() => handleStageAction('Rejected')}
              >
                Reject
              </button>
            </div>
          </div>
        </div>

        <div className="form-actions" style={{ padding: '12px 20px', borderTop: '1px solid #eee' }}>
          <button type="button" className="cancel-button" onClick={onClose}>Close Dossier</button>
        </div>
      </div>
    </div>
  )
}
