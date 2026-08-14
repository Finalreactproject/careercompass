function JobCard({ job, onSelect, isSaved, onSave }) {
  return (
    <article className="job-card">
      <h2 className="job-card-title">{job.title}</h2>
      <p className="job-card-company">{job.company_name}</p>
      <p className="job-card-location">{job.candidate_required_location}</p>

      <div className="job-card-actions">
        <button onClick={() => onSelect(job)}>View Details</button>

        <button onClick={onSave}>{isSaved ? "Saved" : "Save Job"}</button>
      </div>
    </article>
  );
}

export default JobCard;
