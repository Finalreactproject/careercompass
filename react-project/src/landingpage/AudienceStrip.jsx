const AUDIENCES = [
  {
    title: 'Students & Interns',
    tag: 'Entry Level',
    desc: 'Find attachments and entry-level roles tailored for first-time applicants.',
    perks: ['Beginner-friendly CV builder', 'Attachment & internship filters', 'Practice interview questions'],
  },
  {
    title: 'Graduates & Job Seekers',
    tag: 'Early Career',
    desc: 'Organize your job search and stand out to hiring managers.',
    perks: ['Application status tracker', 'Instant CV score against job posts', 'Interview prep & feedback'],
  },
  {
    title: 'Recruiters & Companies',
    tag: 'Hiring Teams',
    desc: 'Discover and shortlist verified student talent with required skills.',
    perks: ['Post jobs & internship openings', 'Skill-matched candidate search', 'Direct pipeline management'],
  },
]

const PARTNERS = [
  'Safaricom', 'Andela', 'M-KOPA', 'Equity Bank', 'Cellulant',
  "Africa's Talking", 'Flutterwave', 'Jumia', 'KCB Group', 'Twiga Foods',
]

function AudienceStrip() {
  return (
    <section id="audience" className="audience-strip">
      <div className="section-heading">
        <h2>Who CareerCompass is for</h2>
        <p>Whether you're starting your career or hiring fresh talent, we have you covered.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginTop: 28 }}>
        {AUDIENCES.map((item) => (
          <div
            key={item.title}
            style={{
              background: 'white',
              border: '1px solid lightgray',
              borderRadius: 12,
              padding: 22,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <h3 style={{ margin: 0, fontSize: 17, color: 'midnightblue' }}>{item.title}</h3>
              <span style={{ fontSize: 11, fontWeight: 600, background: 'lavender', color: 'darkslateblue', padding: '2px 8px', borderRadius: 12 }}>
                {item.tag}
              </span>
            </div>
            <p style={{ fontSize: 13.5, color: 'dimgray', lineHeight: 1.5, margin: '0 0 14px' }}>
              {item.desc}
            </p>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'dimgray', lineHeight: 1.7 }}>
              {item.perks.map((perk, i) => (
                <li key={i}>{perk}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="employer-strip" style={{ marginTop: 40 }}>
        <p style={{ textAlign: 'center', fontSize: 13, color: 'gray', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 14 }}>
          Trusted by talent aiming for top companies
        </p>
        <div className="employer-scroll">
          {[...PARTNERS, ...PARTNERS].map((name, i) => (
            <span key={i}>{name}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AudienceStrip
