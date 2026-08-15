const FEATURES = [
  {
    icon: '🛡️',
    title: 'Anti-Scam Verified Listings',
    body: 'Every employer is verified with KRA PIN and company registration checks before posting a job.',
  },
  {
    icon: '🤖',
    title: 'AI Resume & ATS Matcher',
    body: 'Upload your CV to get a real-time ATS match score and targeted cover letter suggestions.',
  },
  {
    icon: '📊',
    title: 'Application Pipeline Tracker',
    body: 'Track every application from Applied → Screening → Interview → Offer in a Kanban board.',
  },
  {
    icon: '🎤',
    title: 'AI Mock Interviews',
    body: 'Practice with AI-powered mock interviews using the STAR framework — no coaching fees.',
  },
  {
    icon: '📄',
    title: 'CV Center',
    body: 'Pick from role-specific CV templates for Frontend, Backend, Full Stack, and General positions.',
  },
  {
    icon: '⚡',
    title: 'Compass AI Copilot',
    body: 'Your AI career assistant that guides you through every stage of your job search.',
  },
]

function FeatureGrid() {
  return (
    <section id="features" className="feature-grid-section">
      <div className="section-heading">
        <h2>Everything you need to get hired.</h2>
        <p>Built for job seekers — not recruiters, not job boards.</p>
      </div>

      <div className="feature-grid">
        {FEATURES.map((f) => (
          <div key={f.title} className="feature-card">
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeatureGrid
