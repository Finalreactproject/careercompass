function RecruiterJobsList({ jobs, candidates, onOpenPostModal }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16, color: 'midnightblue' }}>Your Active Job Listings</h3>
          <p style={{ margin: 0, fontSize: 13, color: 'gray' }}>Roles currently published to job seekers.</p>
        </div>
        <button onClick={onOpenPostModal}>+ Post New Job</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {jobs.map((job) => {
          const applicantCount = candidates.filter((c) =>
            c.role.toLowerCase().includes(job.title.toLowerCase())
          ).length

          return (
            <div key={job.id} style={{ background: 'white', border: '1px solid lightgray', borderRadius: 10, padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, background: 'honeydew', color: 'darkgreen', padding: '2px 8px', borderRadius: 8, fontWeight: 600 }}>
                  {job.status || 'Active'}
                </span>
                <span style={{ fontSize: 12, color: 'gray' }}>{job.type}</span>
              </div>

              <h3 style={{ margin: '4px 0', fontSize: 16, color: 'midnightblue' }}>{job.title}</h3>
              <p style={{ margin: '0 0 10px', fontSize: 13, color: 'dimgray' }}>📍 {job.location} · 💵 {job.salary}</p>

              <div style={{ fontSize: 12, color: 'darkslateblue', fontWeight: 600, borderTop: '1px solid whitesmoke', paddingTop: 10 }}>
                👥 {applicantCount} Applicants in Pipeline
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RecruiterJobsList
