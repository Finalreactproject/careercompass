import { useState } from 'react'

export default function LoginModal({ onClose, onLogin }) {
  const [role, setRole] = useState('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isRecruiter = role === 'recruiter'

  function handleSubmit(e) {
    e.preventDefault()
    onLogin(role)
  }

  return (
    <div className="edit-overlay" onClick={onClose}>
      <div className="edit-modal" style={{ maxWidth: 440 }} onClick={(e) => e.stopPropagation()}>
        <div className="edit-header">
          <div>
            <h2>{isRecruiter ? 'Recruiter Login' : 'Job Seeker Login'}</h2>
            <p>Welcome to CareerCompass. Enter your credentials to continue.</p>
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: 24 }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            <button
              type="button"
              className={!isRecruiter ? '' : 'btn-outline'}
              style={{ flex: 1, fontSize: 13 }}
              onClick={() => setRole('student')}
            >
              Student / Job Seeker
            </button>
            <button
              type="button"
              className={isRecruiter ? '' : 'btn-outline'}
              style={{ flex: 1, fontSize: 13 }}
              onClick={() => setRole('recruiter')}
            >
              Recruiter
            </button>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              required
              type="email"
              placeholder={isRecruiter ? 'recruiter@company.com' : 'student@example.com'}
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

          <button type="submit" className="save-profile-button" style={{ width: '100%', marginTop: 10 }}>
            Login as {isRecruiter ? 'Recruiter' : 'Job Seeker'} →
          </button>
        </form>
      </div>
    </div>
  )
}

