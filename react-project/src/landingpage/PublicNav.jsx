function PublicNav({ onLogin }) {
  return (
    <header className="public-nav">
      <div className="public-nav-inner">
        <div className="nav-brand">
          <span className="brand-name">CareerCompass</span>
          <small>Find · Grow · Go</small>
        </div>

        <nav className="nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>
          <a href="#audience">Who it's for</a>
        </nav>

        <div className="nav-actions">
          <button className="btn-outline" onClick={() => onLogin()}>Sign In</button>
          <button onClick={() => onLogin()}>Get Started</button>
        </div>
      </div>
    </header>
  )
}

export default PublicNav
