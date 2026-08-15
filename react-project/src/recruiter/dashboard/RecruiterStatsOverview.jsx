// KPI summary cards shown at the top of the Recruiter Dashboard
function RecruiterStatsOverview({ stats, onSelectTab }) {
  const cards = [
    { label: 'Active Jobs', val: stats.jobsCount, color: '#6244a0', tab: 'jobs' },
    { label: 'Total Applicants', val: stats.candidatesCount, color: '#1976d2', tab: 'pipeline' },
    { label: 'In Interview', val: stats.interviewCount, color: '#f57c00', tab: 'pipeline' },
    { label: 'Offers Extended', val: stats.offersCount, color: '#388e3c', tab: 'pipeline' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
      {cards.map((card) => (
        <div
          key={card.label}
          onClick={() => onSelectTab && onSelectTab(card.tab)}
          style={{
            background: '#fff',
            border: '1px solid #eee',
            borderRadius: 10,
            padding: 16,
            cursor: 'pointer',
            transition: 'box-shadow 0.2s',
          }}
        >
          <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', fontWeight: 600 }}>{card.label}</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: card.color, marginTop: 4 }}>{card.val}</div>
        </div>
      ))}
    </div>
  )
}

export default RecruiterStatsOverview
