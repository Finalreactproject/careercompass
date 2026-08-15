import { useState } from 'react'

// Modal form for recruiters to publish a new job listing
function PostJobModal({ isOpen, onClose, onPostJob }) {
  const [form, setForm] = useState({
    title: '',
    location: 'Nairobi',
    type: 'Full-time',
    salary: 'KES 120,000 – 160,000/mo',
  })

  if (!isOpen) return null

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) return
    onPostJob(form)
    setForm({ title: '', location: 'Nairobi', type: 'Full-time', salary: 'KES 120,000 – 160,000/mo' })
  }

  return (
    <div className="edit-overlay" onClick={onClose}>
      <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
        <div className="edit-header">
          <div>
            <h2>Post a Job Listing</h2>
            <p>Publish an open role to job seekers across Kenya.</p>
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Job Title *</label>
            <input
              required
              placeholder="e.g. Senior Frontend Developer"
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
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
                <option>Trainee</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Monthly Salary Range</label>
            <input
              value={form.salary}
              onChange={(e) => setForm({ ...form, salary: e.target.value })}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-profile-button">Publish Job</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostJobModal
