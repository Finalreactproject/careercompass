function RecruiterStatsOverview({ stats, onSelectTab }) {
  const cards = [
    { label: 'Active Jobs', val: stats.jobsCount, color: 'slateblue', tab: 'jobs' },
    { label: 'Total Applicants', val: stats.candidatesCount, color: 'steelblue', tab: 'pipeline' },
    { label: 'In Interview', val: stats.interviewCount, color: 'darkorange', tab: 'pipeline' },
    { label: 'Offers Extended', val: stats.offersCount, color: 'forestgreen', tab: 'pipeline' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
      {cards.map((card) => (
        <div
          key={card.label}
          onClick={() => onSelectTab && onSelectTab(card.tab)}
          style={{
            background: 'white',
            border: '1px solid lightgray',
            borderRadius: 10,
            padding: 16,
            cursor: 'pointer',
            transition: 'box-shadow 0.2s',
          }}
        >
          <div style={{ fontSize: 11, color: 'gray', textTransform: 'uppercase', fontWeight: 600 }}>{card.label}</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: card.color, marginTop: 4 }}>{card.val}</div>
        </div>
      ))}
    </div>
  )
}

export default RecruiterStatsOverview
