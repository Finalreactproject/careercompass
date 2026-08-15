function CTASection({ onLogin }) {
  return (
    <section className="cta-section">
      <div className="cta-card">
        <h2>Your next career move <span className="highlight">starts here.</span></h2>
        <p>
          Join thousands of professionals across Nairobi and East Africa who found
          scam-free, well-matched opportunities with CareerCompass.
        </p>
        <button onClick={() => onLogin()}>Start for Free — No Credit Card</button>
        <small>🛡️ 100% verified listings · 0% scam rate</small>
      </div>
    </section>
  )
}

export default CTASection
