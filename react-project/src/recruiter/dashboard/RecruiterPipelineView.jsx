import { useState } from 'react'

export const STAGES = ['All', 'Applied', 'Screening', 'Interview', 'Offer', 'Accepted']

// Candidate pipeline table with search, stage filters, and stage advancement
function RecruiterPipelineView({ candidates, onInspectCandidate, onAdvanceStage }) {
  const [search, setSearch] = useState('')
  const [stageFilter, setStageFilter] = useState('All')

  const filtered = candidates.filter((c) => {
    const q = search.toLowerCase()
    const matchesSearch = !q || c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q)
    const matchesStage = stageFilter === 'All' || c.stage === stageFilter
    return matchesSearch && matchesStage
  })

  return (
    <div>
      {/* Search & Stage Filters */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
        <input
          className="search-input"
          style={{ flex: 1, minWidth: 220, margin: 0 }}
          placeholder="Search candidates by name or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {STAGES.map((st) => (
            <button
              key={st}
              className={stageFilter === st ? '' : 'btn-outline'}
              style={{ fontSize: 12, padding: '6px 12px' }}
              onClick={() => setStageFilter(st)}
            >
              {st} ({st === 'All' ? candidates.length : candidates.filter((c) => c.stage === st).length})
            </button>
          ))}
        </div>
      </div>

      {/* Candidate Rows */}
      {filtered.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 10, padding: 30, textAlign: 'center', color: '#888' }}>
          No candidates found for this filter.
        </div>
      ) : (
        <div className="apps-list">
          {filtered.map((c) => (
            <div key={c.id} className="app-row" style={{ alignItems: 'flex-start' }}>
              <div className="app-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <strong style={{ fontSize: 16 }}>{c.name}</strong>
                  <span style={{ fontSize: 11, background: '#e8f5e9', color: '#2e7d32', padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>
                    ATS {c.atsScore}%
                  </span>
                  <span style={{ fontSize: 11, background: '#f0e6ff', color: '#6244a0', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>
                    {c.stage}
                  </span>
                </div>

                <span style={{ color: '#555', fontSize: 13, marginTop: 2 }}>
                  Applying for: <strong>{c.role}</strong> · 🎓 {c.university}
                </span>
                <small style={{ color: '#888' }}>📧 {c.email} | 📞 {c.phone}</small>

                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
                  {c.skills?.map((s) => (
                    <span key={s} style={{ background: '#f0f0f0', color: '#555', fontSize: 10, padding: '2px 6px', borderRadius: 4 }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="app-actions" style={{ flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                <button
                  className="btn-outline"
                  style={{ fontSize: 12, padding: '6px 12px' }}
                  onClick={() => onInspectCandidate(c)}
                >
                  🔍 View Profile
                </button>
                <select
                  value={c.stage}
                  onChange={(e) => onAdvanceStage(c.id, e.target.value)}
                  style={{ fontSize: 12, padding: '5px 8px' }}
                >
                  {STAGES.filter((s) => s !== 'All').map((s) => (
                    <option key={s}>{s}</option>
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
