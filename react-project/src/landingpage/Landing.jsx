import { useState } from 'react'
import PublicNav from './PublicNav'
import Hero from './Hero'
import AudienceStrip from './AudienceStrip'
import HowItWorks from './HowItWorks'
import FeatureGrid from './FeatureGrid'
import DifferenceSection from './DifferenceSection'
import CTASection from './CTASection'
import Footer from './Footer'
import Signup from '../Components/signup'

export default function Landing({ onLogin }) {
  const [showSignup, setShowSignup] = useState(false)

  return (
    <div className="landing-page">
      <PublicNav onLogin={() => setShowSignup(true)} />
      <Hero onLogin={() => setShowSignup(true)} />
      <AudienceStrip />
      <HowItWorks />
      <FeatureGrid />
      <DifferenceSection />
      <CTASection onLogin={() => setShowSignup(true)} />
      <Footer />

      {showSignup && (
        <Signup
          onLogin={onLogin}
          onClose={() => setShowSignup(false)}
        />
      )}
    </div>
  )
}
