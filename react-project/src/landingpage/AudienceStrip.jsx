import { useState } from 'react'

const STAGES = [
  {
    id: 'students',
    icon: '🎓',
    title: 'Students & Interns',
    body: 'Find attachments, industrial training, and internships filtered by location and skill level.',
    samples: [
      { title: 'Frontend Developer Intern', company: 'Safaricom PLC', location: 'Nairobi (Hybrid)', pay: 'KES 35,000/mo' },
      { title: 'UX Research Attachment', company: 'Cellulant', location: 'Remote', pay: 'KES 30,000/mo' },
    ],
  },
  {
    id: 'graduates',
    icon: '🚀',
    title: 'New Graduates',
    body: 'Your first full-time role. We know "no experience yet" is a starting point, not a flaw.',
    samples: [
      { title: 'Graduate Software Trainee', company: 'Equity Group', location: 'Nairobi HQ', pay: 'KES 85,000/mo' },
      { title: 'Associate Data Analyst', company: 'Andela Kenya', location: 'Global Remote', pay: 'KES 110,000/mo' },
    ],
  },
  {
    id: 'pros',
    icon: '💼',
    title: 'Early-Career Pros',
    body: '1–3 years in? Track every application, prep for interviews, and keep your momentum.',
    samples: [
      { title: 'Fullstack Engineer (React/Node)', company: 'M-KOPA Africa', location: 'Nairobi', pay: 'KES 160,000/mo' },
      { title: 'Growth Marketing Specialist', company: 'Jumia Kenya', location: 'Nairobi', pay: 'KES 130,000/mo' },
    ],
  },
]

const EMPLOYERS = [
  'Safaricom', 'Andela', 'M-KOPA', 'Equity Bank', 'Cellulant',
  "Africa's Talking", 'Flutterwave', 'Jumia', 'KCB Group', 'Twiga Foods',
]

function AudienceStrip() {
  const [selected, setSelected] = useState('graduates')
  const active = STAGES.find((s) => s.id === selected)

  return (
    <section id="audience" className="audience-strip">
      <div className="section-heading">
        <h2>Who is CareerCompass for?</h2>
        <p>Pick your career stage and see what's waiting for you.</p>
      </div>

      <div className="stage-tabs">
        {STAGES.map((s) => (
          <button
            key={s.id}
            className={selected === s.id ? 'stage-tab active' : 'stage-tab'}
            onClick={() => setSelected(s.id)}
          >
            {s.icon} {s.title}
          </button>
        ))}
      </div>

      {active && (
        <div className="stage-content">
          <p>{active.body}</p>
          <div className="sample-jobs">
            {active.samples.map((job) => (
              <div key={job.title} className="sample-job">
                <strong>{job.title}</strong>
                <span>{job.company}</span>
                <span>{job.location}</span>
                <span className="job-pay">{job.pay}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="employer-strip">
        <p>Employers on the platform</p>
        <div className="employer-scroll">
          {[...EMPLOYERS, ...EMPLOYERS].map((name, i) => (
            <span key={i}>{name}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AudienceStrip
