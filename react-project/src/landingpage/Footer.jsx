const LINKS = {
  Product: ['Job Discovery', 'ATS Resume Matcher', 'Pipeline Tracker', 'AI Mock Interviews'],
  Platform: ['For Students', 'For Graduates', 'For Recruiters', 'Anti-Scam Policy'],
  Company: ['How It Works', 'Why CareerCompass?', 'Moringa School', 'Contact'],
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <strong>CareerCompass</strong>
          <small>Find · Grow · Go</small>
          <p>Built for Kenyan job seekers. Powered by Moringa School.</p>
        </div>

        <div className="footer-links">
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group} className="footer-col">
              <h4>{group}</h4>
              {items.map((item) => (
                <a key={item} href="#">{item}</a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 CareerCompass — Moringa School Group 3</span>
        <span>Anti-Scam Verified Platform</span>
      </div>
    </footer>
  )
}

export default Footer
