import { useState } from 'react'

const DEFAULT = {
  companyName: 'Safaricom PLC',
  recruiterName: 'Sarah Kamau',
  recruiterRole: 'Lead Talent Acquisition Partner',
  email: 'skamau@safaricom.co.ke',
  phone: '+254 722 000 123',
  industry: 'Telecommunications & Tech',
  companySize: '5,000+ Employees',
  location: 'HQ Waiyaki Way, Nairobi',
  website: 'https://www.safaricom.co.ke/careers',
  bio: 'We recruit top student and graduate software engineers, product managers, and data specialists across East Africa.',
  perks: ['Hybrid Work', 'Mentorship & Trainee Tracks', 'Comprehensive Medical Cover', 'Annual Hackathons'],
}

const FIELDS = [
  ['companyName', 'Company Name', 'text', true],
  ['industry', 'Industry', 'text'],
  ['recruiterName', 'Recruiter Name', 'text'],
  ['recruiterRole', 'Recruiter Role', 'text'],
  ['email', 'Email', 'email'],
  ['phone', 'Phone', 'text'],
  ['location', 'Location', 'text'],
  ['companySize', 'Company Size', 'text'],
]

export default function RecruiterProfile() {
  const [profile, setProfile] = useState(() => JSON.parse(localStorage.getItem('recruiter_profile')) || DEFAULT)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(profile)

  function save(e) {
    e.preventDefault()
    setProfile(form)
    localStorage.setItem('recruiter_profile', JSON.stringify(form))
    setEditing(false)
  }

  function field(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <main className="main-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        <div>
          <h1>Company & Recruiter Profile 🏢</h1>
          <p>Manage your employer branding and contact details.</p>
        </div>
        <button onClick={() => { setForm(profile); setEditing(true) }}>✏️ Edit Profile</button>
      </div>

      <div style={{ background: 'white', border: '1px solid lightgray', borderRadius: 14, padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 14, background: 'aliceblue', fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🏢</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h2 style={{ margin: 0, fontSize: 22 }}>{profile.companyName}</h2>
              <span style={{ fontSize: 11, background: 'honeydew', color: 'darkgreen', padding: '3px 8px', borderRadius: 12, fontWeight: 700 }}>✓ Verified</span>
            </div>
            <div style={{ fontSize: 13, color: 'dimgray', marginTop: 4 }}>{profile.industry} · {profile.location}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, background: 'whitesmoke', padding: 18, borderRadius: 10 }}>
          <div>
            <div style={{ fontSize: 12, color: 'gray', textTransform: 'uppercase' }}>Recruiter Contact</div>
            <strong style={{ fontSize: 14 }}>{profile.recruiterName}</strong>
            <div style={{ fontSize: 12, color: 'dimgray' }}>{profile.recruiterRole}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'gray', textTransform: 'uppercase' }}>Email & Phone</div>
            <div style={{ fontSize: 13 }}>📧 {profile.email}</div>
            <div style={{ fontSize: 13, marginTop: 2 }}>📞 {profile.phone}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'gray', textTransform: 'uppercase' }}>Scale & Portal</div>
            <div style={{ fontSize: 13 }}>👥 {profile.companySize}</div>
            <a href={profile.website} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: 'steelblue', textDecoration: 'none' }}>🌐 Career Portal</a>
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <h3 style={{ fontSize: 16, margin: '0 0 8px' }}>About & Hiring Culture</h3>
          <p style={{ fontSize: 14, color: 'dimgray', lineHeight: 1.6, margin: 0 }}>{profile.bio}</p>
        </div>

        <div style={{ marginTop: 24 }}>
          <h3 style={{ fontSize: 16, margin: '0 0 10px' }}>Perks & Offerings</h3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {profile.perks?.map((perk, i) => (
              <span key={i} style={{ background: 'aliceblue', color: 'steelblue', padding: '6px 12px', borderRadius: 8, fontSize: 13, fontWeight: 500 }}>✨ {perk}</span>
            ))}
          </div>
        </div>
      </div>

      {editing && (
        <div className="edit-overlay" onClick={() => setEditing(false)}>
          <div className="edit-modal" style={{ maxWidth: 540 }} onClick={(e) => e.stopPropagation()}>
            <div className="edit-header">
              <div><h2>Edit Profile</h2><p>Update employer details and contact info.</p></div>
              <button className="close-button" onClick={() => setEditing(false)}>×</button>
            </div>
            <form onSubmit={save} style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              <div className="form-grid">
                {FIELDS.map(([key, label, type, required]) => (
                  <div key={key} className="form-group">
                    <label>{label}</label>
                    <input type={type} required={!!required} value={form[key]} onChange={(e) => field(key, e.target.value)} />
                  </div>
                ))}
              </div>
              <div className="form-group">
                <label>Company Bio & Hiring Culture</label>
                <textarea rows={3} value={form.bio} onChange={(e) => field('bio', e.target.value)} />
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setEditing(false)}>Cancel</button>
                <button type="submit" className="save-profile-button">Save Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
