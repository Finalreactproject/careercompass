const STEPS = [
  {
    number: '01',
    title: 'Discover verified roles',
    body: 'Search and filter by location, job type, and salary. Every listing carries a mandatory anti-scam employer badge.',
  },
  {
    number: '02',
    title: 'Apply & track your pipeline',
    body: 'Every application has one journey: Applied → Screening → Interview → Offer — all in a visual Kanban board.',
  },
  {
    number: '03',
    title: 'Prepare & land the offer',
    body: 'Use mock interviews and ATS resume scoring to walk into every interview with confidence.',
  },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works">
      <div className="section-heading">
        <h2>From first search to signed offer.</h2>
        <p>Three steps. One platform. Zero spreadsheets.</p>
      </div>

      <div className="steps-grid">
        {STEPS.map((step) => (
          <div key={step.number} className="step-card">
            <div className="step-number">{step.number}</div>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks
