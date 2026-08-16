function Hero({ onLogin }) {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <span className="hero-badge">Built for Kenyan Job Seekers</span>
          <h1>Find verified jobs.<br />Track every step.<br /><span className="highlight-text">Land the offer.</span></h1>
          <p>
            CareerCompass matches you to scam-free, verified roles across Kenya —
            then helps you apply, track your pipeline, and prep for interviews, all in one place.
          </p>
          <div className="hero-buttons">
            <button onClick={() => onLogin()}>Start for Free</button>
            <button className="btn-outline" onClick={() => onLogin()}>Sign In</button>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-header">
            <span>CareerCompass</span>
            <span className="verified-badge">Live Demo</span>
          </div>

          <div className="hero-apps">
            {[
              { role: 'Frontend Developer', company: 'Safaricom PLC', stage: 'Interview', bg: 'aliceblue', color: 'royalblue' },
              { role: 'Product Designer', company: 'M-KOPA Africa', stage: 'Offer', bg: 'lavender', color: 'darkslateblue' },
              { role: 'Data Analyst', company: 'Equity Group', stage: 'Screening', bg: 'papayawhip', color: 'darkgoldenrod' },
            ].map((app) => (
              <div key={app.role} className="hero-app-row">
                <div>
                  <strong>{app.role}</strong>
                  <p>{app.company}</p>
                </div>
                <span style={{ background: app.bg, color: app.color }} className="stage-pill">
                  {app.stage}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-stats">
        {[
          { label: 'Verified Listings', value: '2,400+' },
          { label: 'Job Seekers', value: '47,000+' },
          { label: 'Offers Accepted', value: '3,100+' },
          { label: 'Scam Rate', value: '0%' },
        ].map((stat) => (
          <div key={stat.label} className="stat-box">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Hero
