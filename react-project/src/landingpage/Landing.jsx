import { useState } from 'react'
import PublicNav from './PublicNav'
import Hero from './Hero'
import AudienceStrip from './AudienceStrip'
import HowItWorks from './HowItWorks'
import FeatureGrid from './FeatureGrid'
import DifferenceSection from './DifferenceSection'
import CTASection from './CTASection'
import Footer from './Footer'
import LoginModal from './LoginModal'

export default function Landing({ onLogin }) {
  const [showLogin, setShowLogin] = useState(false)

  const openLogin = () => setShowLogin(true)

  return (
    <div className="landing-page">
      <PublicNav onLogin={openLogin} />
      <Hero onLogin={openLogin} />
      <AudienceStrip />
      <HowItWorks />
      <FeatureGrid />
      <DifferenceSection />
      <CTASection onLogin={openLogin} />
      <Footer />

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={onLogin}
        />
      )}
    </div>
  )
}

