import { useState } from 'react'

const DEFAULT_RECRUITER_PROFILE = {
  companyName: 'Safaricom PLC',
  recruiterName: 'Sarah Kamau',
  recruiterRole: 'Lead Talent Acquisition Partner',
  email: 'skamau@safaricom.co.ke',
  phone: '+254 722 000 123',
  industry: 'Telecommunications & Tech',
  companySize: '5,000+ Employees',
  location: 'HQ Waiyaki Way, Nairobi',
  website: 'https://www.safaricom.co.ke/careers',
  bio: 'Transforming lives through connectivity and innovation. We recruit top student and graduate software engineers, product managers, and data specialists across East Africa.',
  verified: true,
  perks: ['Hybrid Work Environment', 'Mentorship & Graduate Trainee Tracks', 'Comprehensive Medical Cover', 'Annual Innovation Hackathons'],
}

export default function RecruiterProfile() {
  const [profile, setProfile] = useState(() => {
    const stored = localStorage.getItem('recruiter_profile')
    return stored ? JSON.parse(stored) : DEFAULT_RECRUITER_PROFILE
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState(profile)

  function handleSave(e) {
    e.preventDefault()
    setProfile(editForm)
    localStorage.setItem('recruiter_profile', JSON.stringify(editForm))
    setIsEditing(false)
  }

  return (
    <main className="main-content">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        <div>
          <h1>Company & Recruiter Profile 🏢</h1>
          <p>Manage your employer branding and hiring organization details.</p>
        </div>
        <button onClick={() => { setEditForm(profile); setIsEditing(true) }}>
          ✏️ Edit Profile
        </button>
      </div>

      {/* Main Profile Card */}
      <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 14, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.02)', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: 14, background: '#eef2ff', color: '#1976d2', fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
              🏢
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h2 style={{ margin: 0, fontSize: 22, color: '#1a1d2e' }}>{profile.companyName}</h2>
                <span style={{ fontSize: 11, background: '#e8f5e9', color: '#2e7d32', padding: '3px 8px', borderRadius: 12, fontWeight: 700 }}>
                  ✓ Verified Employer
                </span>
              </div>
              <div style={{ fontSize: 13.5, color: '#666', marginTop: 4 }}>
                {profile.industry} · {profile.location}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 24, background: '#f8f9fc', padding: 18, borderRadius: 10 }}>
          <div>
            <div style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5 }}>Recruiter Contact</div>
            <strong style={{ fontSize: 14, color: '#252b45' }}>{profile.recruiterName}</strong>
            <div style={{ fontSize: 12.5, color: '#555' }}>{profile.recruiterRole}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5 }}>Email & Phone</div>
            <div style={{ fontSize: 13, color: '#252b45' }}>📧 {profile.email}</div>
            <div style={{ fontSize: 13, color: '#252b45', marginTop: 2 }}>📞 {profile.phone}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5 }}>Company Scale</div>
            <div style={{ fontSize: 13, color: '#252b45' }}>👥 {profile.companySize}</div>
            <div style={{ fontSize: 13, color: '#1976d2', marginTop: 2 }}>
              <a href={profile.website} target="_blank" rel="noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>🌐 Career Portal</a>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <h3 style={{ fontSize: 16, margin: '0 0 8px', color: '#1a1d2e' }}>About Company & Hiring Culture</h3>
          <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, margin: 0 }}>
            {profile.bio}
          </p>
        </div>

        <div style={{ marginTop: 24 }}>
          <h3 style={{ fontSize: 16, margin: '0 0 10px', color: '#1a1d2e' }}>Company Perks & Offerings</h3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {profile.perks?.map((perk, i) => (
              <span key={i} style={{ background: '#f0f4ff', color: '#1976d2', padding: '6px 12px', borderRadius: 8, fontSize: 13, fontWeight: 500 }}>
                ✨ {perk}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="edit-overlay" onClick={() => setIsEditing(false)}>
          <div className="edit-modal" style={{ maxWidth: 540 }} onClick={(e) => e.stopPropagation()}>
            <div className="edit-header">
              <div>
                <h2>Edit Company Profile</h2>
                <p>Update employer details and contact information.</p>
              </div>
              <button className="close-button" onClick={() => setIsEditing(false)}>×</button>
            </div>

            <form onSubmit={handleSave} style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    required
                    value={editForm.companyName}
                    onChange={(e) => setEditForm({ ...editForm, companyName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Industry</label>
                  <input
                    value={editForm.industry}
                    onChange={(e) => setEditForm({ ...editForm, industry: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Recruiter Name</label>
                  <input
                    value={editForm.recruiterName}
                    onChange={(e) => setEditForm({ ...editForm, recruiterName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Recruiter Role</label>
                  <input
                    value={editForm.recruiterRole}
                    onChange={(e) => setEditForm({ ...editForm, recruiterRole: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Location</label>
                  <input
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Company Size</label>
                  <input
                    value={editForm.companySize}
                    onChange={(e) => setEditForm({ ...editForm, companySize: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Company Bio & Hiring Culture</label>
                <textarea
                  rows={3}
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
                <button type="submit" className="save-profile-button">Save Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
