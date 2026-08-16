import { useState } from 'react'

export const STAGES = ['All', 'Applied', 'Screening', 'Interview', 'Offer', 'Accepted']

function RecruiterPipelineView({ candidates, onInspectCandidate, onAdvanceStage }) {
  const [search, setSearch] = useState('')
  const [stageFilter, setStageFilter] = useState('All')

  const filteredCandidates = candidates.filter((candidate) => {
    const searchQuery = search.toLowerCase()
    const matchesSearch = !searchQuery || candidate.name.toLowerCase().includes(searchQuery) || candidate.role.toLowerCase().includes(searchQuery)
    const matchesStage = stageFilter === 'All' || candidate.stage === stageFilter
    return matchesSearch && matchesStage
  })

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
        <input
          className="search-input"
          style={{ flex: 1, minWidth: 220, margin: 0 }}
          placeholder="Search candidates by name or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {STAGES.map((stageName) => (
            <button
              key={stageName}
              className={stageFilter === stageName ? '' : 'btn-outline'}
              style={{ fontSize: 12, padding: '6px 12px' }}
              onClick={() => setStageFilter(stageName)}
            >
              {stageName} ({stageName === 'All' ? candidates.length : candidates.filter((candidate) => candidate.stage === stageName).length})
            </button>
          ))}
        </div>
      </div>

      {filteredCandidates.length === 0 ? (
        <div style={{ background: 'white', border: '1px solid lightgray', borderRadius: 10, padding: 30, textAlign: 'center', color: 'gray' }}>
          No candidates found for this filter.
        </div>
      ) : (
        <div className="apps-list">
          {filteredCandidates.map((candidate) => (
            <div key={candidate.id} className="app-row" style={{ alignItems: 'flex-start' }}>
              <div className="app-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <strong style={{ fontSize: 16 }}>{candidate.name}</strong>
                  <span style={{ fontSize: 11, background: 'honeydew', color: 'darkgreen', padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>
                    ATS {candidate.atsScore}%
                  </span>
                  <span style={{ fontSize: 11, background: 'lavender', color: 'darkblue', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>
                    {candidate.stage}
                  </span>
                </div>

                <span style={{ color: 'dimgray', fontSize: 13, marginTop: 2 }}>
                  Applying for: <strong>{candidate.role}</strong> · {candidate.university}
                </span>
                <small style={{ color: 'gray' }}>{candidate.email} | {candidate.phone}</small>

                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
                  {candidate.skills?.map((skill) => (
                    <span key={skill} style={{ background: 'whitesmoke', color: 'dimgray', fontSize: 10, padding: '2px 6px', borderRadius: 4 }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="app-actions" style={{ flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                <button
                  className="btn-outline"
                  style={{ fontSize: 12, padding: '6px 12px' }}
                  onClick={() => onInspectCandidate(candidate)}
                >
                  View Profile
                </button>

                <select
                  value={candidate.stage}
                  onChange={(e) => onAdvanceStage(candidate.id, e.target.value)}
                  style={{ fontSize: 12, padding: '5px 8px' }}
                >
                  {STAGES.filter((stageName) => stageName !== 'All').map((stageName) => (
                    <option key={stageName}>{stageName}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecruiterPipelineView

