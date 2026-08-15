/**
 * PAGE: Landing Page (Public Homepage)
 *
 * Renders marketing landing page + the existing Login/Signin Form
 * for Job Seeker and Recruiter.
 */

import { useState } from 'react'
import PublicNav from './PublicNav'
import Hero from './Hero'
import AudienceStrip from './AudienceStrip'
import HowItWorks from './HowItWorks'
import FeatureGrid from './FeatureGrid'
import DifferenceSection from './DifferenceSection'
import CTASection from './CTASection'
import Footer from './Footer'

export default function Landing({ onLogin }) {
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [role, setRole] = useState('jobSeeker')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleFormSubmit(e) {
    e.preventDefault()
    setShowLoginForm(false)
    if (onLogin) {
      onLogin(role === 'recruiter' ? 'recruiter' : 'student')
    }
  }

  function openLoginWithRole(selectedRole = 'jobSeeker') {
    setRole(selectedRole)
    setShowLoginForm(true)
  }

  return (
    <div className="landing-page">
      <PublicNav onLogin={() => openLoginWithRole('jobSeeker')} />
      <Hero onLogin={() => openLoginWithRole('jobSeeker')} />
      <AudienceStrip />
      <HowItWorks />
      <FeatureGrid />
      <DifferenceSection />
      <CTASection onLogin={() => openLoginWithRole('jobSeeker')} />
      <Footer />

      {/* Login / Sign In Form Modal */}
      {showLoginForm && (
        <div className="edit-overlay" onClick={() => setShowLoginForm(false)}>
          <div className="edit-modal" style={{ maxWidth: 440 }} onClick={(e) => e.stopPropagation()}>
            <div className="edit-header">
              <div>
                <h2>{role === 'jobSeeker' ? 'Job Seeker Login' : 'Recruiter Login'}</h2>
                <p>Welcome to CareerCompass. Enter your credentials to continue.</p>
              </div>
              <button className="close-button" onClick={() => setShowLoginForm(false)}>×</button>
            </div>

            <form onSubmit={handleFormSubmit} style={{ padding: 24 }}>
              {/* Role Toggle Buttons */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                <button
                  type="button"
                  className={role === 'jobSeeker' ? '' : 'btn-outline'}
                  style={{ flex: 1, fontSize: 13, padding: '10px 8px' }}
                  onClick={() => setRole('jobSeeker')}
                >
                  🎓 Student / Job Seeker
                </button>
                <button
                  type="button"
                  className={role === 'recruiter' ? '' : 'btn-outline'}
                  style={{ flex: 1, fontSize: 13, padding: '10px 8px' }}
                  onClick={() => setRole('recruiter')}
                >
                  💼 Recruiter
                </button>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  required
                  type="email"
                  placeholder={role === 'jobSeeker' ? 'student@example.com' : 'recruiter@company.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-actions" style={{ borderTop: 0, padding: 0, marginTop: 10 }}>
                <button type="submit" className="save-profile-button" style={{ width: '100%' }}>
                  Login as {role === 'jobSeeker' ? 'Job Seeker' : 'Recruiter'} →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
