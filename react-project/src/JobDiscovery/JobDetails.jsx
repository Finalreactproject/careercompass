function JobDetails({ job, onClose, isSaved, onSave }) {
  return (
    <section className="job-details">
      <button className="job-back-button" onClick={onClose}>
        ← Back to Jobs
      </button>

      <div className="job-details-card">
        <h1 className="job-details-title">{job.title}</h1>

        <h2 className="job-details-company">{job.company_name}</h2>

        <p className="job-details-location">
          Location: {job.candidate_required_location}
        </p>

        <p className="job-details-description">{job.description}</p>

        <div className="job-details-actions">
          <a
            className="job-apply-button"
            href={job.url}
            target="_blank"
            rel="noreferrer"
          >
            Apply for this job
          </a>

          <button className="job-save-button" onClick={onSave}>
            {isSaved ? "Saved" : "Save Job"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default JobDetails;
