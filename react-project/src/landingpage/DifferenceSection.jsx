const ROWS = [
  {
    feature: 'Employer Verification',
    oldWay: 'Anyone can post — no identity or company checks',
    ourWay: '100% verified with KRA PIN & organization check',
  },
  {
    feature: 'ATS Resume Scoring',
    oldWay: 'Paid add-on or requires third-party tools',
    ourWay: 'Free built-in ATS matching & keyword optimizer',
  },
  {
    feature: 'Application Tracking',
    oldWay: 'Manual spreadsheets or messy email threads',
    ourWay: 'Visual Kanban board with automated stage updates',
  },
  {
    feature: 'Interview Practice',
    oldWay: 'Expensive coaching sessions ($50+/hr)',
    ourWay: 'Built-in AI mock interviews with STAR scoring',
  },
]

function DifferenceSection() {
  return (
    <section className="difference-section">
      <div className="section-heading">
        <h2>Built different. On purpose.</h2>
        <p>Designed around what Kenyan job seekers actually need.</p>
      </div>

      <div className="comparison-table">
        <div className="comparison-header">
          <span>Feature</span>
          <span>❌ Traditional Job Boards</span>
          <span>✅ CareerCompass</span>
        </div>

        {ROWS.map((row) => (
          <div key={row.feature} className="comparison-row">
            <strong>{row.feature}</strong>
            <span className="old-way">{row.oldWay}</span>
            <span className="our-way">{row.ourWay}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DifferenceSection
