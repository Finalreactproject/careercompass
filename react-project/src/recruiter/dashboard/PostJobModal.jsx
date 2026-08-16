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

  // Submits the form — splits the comma-separated skills string into an array before passing up
  function handleSubmit(formEvent) {
    formEvent.preventDefault()
    if (!form.title.trim()) return
    onPostJob({
      ...form,
      skills: form.skills.split(',').map((skillText) => skillText.trim()).filter(Boolean),
    })
    onClose()
  }

  return (
    <div className="edit-overlay" onClick={onClose}>
      <div className="edit-modal" style={{ maxWidth: 520 }} onClick={(clickEvent) => clickEvent.stopPropagation()}>
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
              onChange={(changeEvent) => setForm({ ...form, title: changeEvent.target.value })}
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Location</label>
              <input
                value={form.location}
                onChange={(changeEvent) => setForm({ ...form, location: changeEvent.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Employment Type</label>
              <select value={form.type} onChange={(changeEvent) => setForm({ ...form, type: changeEvent.target.value })}>
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
                onChange={(changeEvent) => setForm({ ...form, salary: changeEvent.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Experience Level</label>
              <select value={form.experience} onChange={(changeEvent) => setForm({ ...form, experience: changeEvent.target.value })}>
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
              onChange={(changeEvent) => setForm({ ...form, skills: changeEvent.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Role Description & Responsibilities</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(changeEvent) => setForm({ ...form, description: changeEvent.target.value })}
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

