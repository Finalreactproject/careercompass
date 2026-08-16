import { useState, useEffect } from 'react'

function RecentApplications({ onNavigateToApplications }) {
  const [applications, setApplications] = useState(() => {
    return JSON.parse(localStorage.getItem('applications')) || []
  })

  useEffect(() => {
    function updateList() {
      setApplications(JSON.parse(localStorage.getItem('applications')) || [])
    }
    window.addEventListener('applicationsUpdated', updateList)
    return () => window.removeEventListener('applicationsUpdated', updateList)
  }, [])

  const recent = applications.slice(0, 4)

  const stageColors = {
    Applied: { bg: '#eef2ff', text: '#3730a3' },
    Interview: { bg: '#f0fdf4', text: '#15803d' },
    Offer: { bg: '#fdf4ff', text: '#86198f' },
    Accepted: { bg: '#ecfdf5', text: '#047857' },
    Rejected: { bg: '#fef2f2', text: '#b91c1c' },
  }

  return (
    <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: 17, color: '#252b45' }}>Recent Applications</h3>
        {applications.length > 0 && onNavigateToApplications && (
          <button
            className="btn-outline"
            style={{ fontSize: 12, padding: '5px 10px' }}
            onClick={onNavigateToApplications}
          >
            View All ({applications.length}) →
          </button>
        )}
      </div>

      {recent.length === 0 ? (
        <p style={{ color: '#888', fontSize: 14, margin: 0 }}>No applications tracked yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {recent.map((app) => {
            const badge = stageColors[app.status] || { bg: '#f3f4f6', text: '#374151' }

            return (
              <div
                key={app.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  background: '#fafafc',
                  border: '1px solid #f0f0f4',
                  borderRadius: 8,
                }}
              >
                <div>
                  <strong style={{ fontSize: 14, color: '#252b45', display: 'block' }}>{app.title}</strong>
                  <span style={{ fontSize: 13, color: '#666' }}>{app.company} {app.location ? `· ${app.location}` : ''}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: 20,
                      background: badge.bg,
                      color: badge.text,
                    }}
                  >
                    {app.status}
                  </span>
                  {app.date && <small style={{ color: '#999', fontSize: 12 }}>{app.date}</small>}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default RecentApplications
