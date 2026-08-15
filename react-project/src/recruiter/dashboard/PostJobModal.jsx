import { useState } from 'react'

export default function PostJobModal({ isOpen, onClose, onPostJob }) {
  const [form, setForm] = useState({
    title: '',
    location: 'Nairobi (Hybrid)',
    type: 'Full-time',
    salary: 'KES 120,000 – 160,000/mo',
    skills: 'React, TypeScript, CSS',
    experience: 'Entry level / Junior',
    description: 'We are seeking a proactive developer to build and maintain high quality user-facing features.',
  })

  if (!isOpen) return null

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) return
    onPostJob({
      ...form,
      skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
    })
    onClose()
  }

  return (
    <div className="edit-overlay" onClick={onClose}>
      <div className="edit-modal" style={{ maxWidth: 520 }} onClick={(e) => e.stopPropagation()}>
        <div className="edit-header">
          <div>
            <h2>Post a Job Listing</h2>
            <p>Publish an open role for candidates across CareerCompass.</p>
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <div className="form-group">
            <label>Job Title *</label>
            <input
              required
              placeholder="e.g. Junior Frontend Developer"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Location</label>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Employment Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option>Full-time</option>
                <option>Internship</option>
                <option>Attachment</option>
                <option>Contract</option>
                <option>Part-time</option>
              </select>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Monthly Salary Range</label>
              <input
                value={form.salary}
                onChange={(e) => setForm({ ...form, salary: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Experience Level</label>
              <select value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })}>
                <option>Student / Attachment</option>
                <option>Entry level / Junior</option>
                <option>Mid-Level (1-3 yrs)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Required Skills (comma separated)</label>
            <input
              placeholder="e.g. React, JavaScript, Git, CSS"
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Role Description & Responsibilities</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-profile-button">Publish Job Listing</button>
          </div>
        </form>
      </div>
    </div>
  )
}

