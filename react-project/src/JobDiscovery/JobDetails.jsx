import { useState } from 'react'

function JobDetails({ job, onClose, isSaved, onSave }) {
  const [applied, setApplied] = useState(() => {
    const apps = JSON.parse(localStorage.getItem('applications') || '[]')
    return apps.some((a) => a.title.toLowerCase() === job.title.toLowerCase())
  })

  function handleApply() {
    const apps = JSON.parse(localStorage.getItem('applications') || '[]')
    const alreadyApplied = apps.some((a) => a.title.toLowerCase() === job.title.toLowerCase())
    if (!alreadyApplied) {
      const newApp = {
        id: 'app-' + Date.now(),
        company: job.company_name,
        title: job.title,
        location: job.candidate_required_location || 'Remote',
        type: job.job_type ? job.job_type.replace('_', ' ') : 'Full-time',
        status: 'Applied',
        appliedDate: 'Just now',
        notes: `Applied via Job Discovery. ${job.url && job.url !== '#' ? `URL: ${job.url}` : ''}`,
      }
      localStorage.setItem('applications', JSON.stringify([newApp, ...apps]))
      window.dispatchEvent(new Event('applicationsUpdated'))
    }
    setApplied(true)
  }

  return (
    <section className="job-details">
      <button className="job-back-button" onClick={onClose}>
        ← Back to Jobs
      </button>

      <div className="job-details-card">
        <h1 className="job-details-title">{job.title}</h1>
        <h2 className="job-details-company">{job.company_name}</h2>
        <p className="job-details-location">
          📍 Location: {job.candidate_required_location}
        </p>

        <p className="job-details-description">{job.description}</p>

        <div className="job-details-actions">
          {job.url && job.url !== '#' ? (
            <a
              className="job-apply-button"
              href={job.url}
              target="_blank"
              rel="noreferrer"
              onClick={handleApply}
            >
              {applied ? '✓ Applied (Open External Link)' : 'Apply for this job →'}
            </a>
          ) : (
            <button className="job-apply-button" onClick={handleApply}>
              {applied ? '✓ Applied' : 'Apply for this job →'}
            </button>
          )}

          <button className="job-save-button" onClick={onSave}>
            {isSaved ? '★ Saved' : '☆ Save Job'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default JobDetails

