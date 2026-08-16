function Sidebar({ currentPage, setCurrentPage, profile, userRole, onLogout }) {
  const isRecruiter = userRole === 'recruiter'
  const recruiterData = JSON.parse(localStorage.getItem('recruiter_profile') || '{}')
  const name = isRecruiter
    ? recruiterData.companyName || 'Recruiter HQ'
    : profile?.fullName || 'Gladys Wanjiku'
  const subtitle = isRecruiter
    ? (recruiterData.recruiterName ? `${recruiterData.recruiterName} · Recruiter` : 'Verified Employer')
    : profile?.experienceLevel || 'Student'

  const activeStyle = { background: isRecruiter ? 'steelblue' : 'darkslateblue', color: 'white' }

  return (
    <aside className="sidebar">
      <h2>CareerCompass</h2>
      <small>FIND · GROW · GO</small>

      <h5>{isRecruiter ? 'HIRING HQ' : 'MAIN'}</h5>
      {isRecruiter ? (
        <>
          <button
            style={currentPage === 'recruiter' ? activeStyle : {}}
            onClick={() => setCurrentPage('recruiter')}
          >
            Candidate Pipeline
          </button>
          <button
            style={currentPage === 'recruiter-interviews' ? activeStyle : {}}
            onClick={() => setCurrentPage('recruiter-interviews')}
          >
            Interviews & Meetings
          </button>
        </>
      ) : (
        <>
          <button
            style={currentPage === 'discover' ? activeStyle : {}}
            onClick={() => setCurrentPage('discover')}
          >
            Dashboard
          </button>
          <button
            style={currentPage === 'jobs' ? activeStyle : {}}
            onClick={() => setCurrentPage('jobs')}
          >
            Discover Jobs
          </button>
        </>
      )}

      {!isRecruiter && (
        <>
          <h5>JOB PIPELINE</h5>
          <button
            style={currentPage === 'applications' ? activeStyle : {}}
            onClick={() => setCurrentPage('applications')}
          >
            Applications
          </button>
          <button
            style={currentPage === 'interviews' ? activeStyle : {}}
            onClick={() => setCurrentPage('interviews')}
          >
            Interviews & Prep
          </button>

          <h5>DOCUMENTS</h5>
          <button
            style={currentPage === 'cv' ? activeStyle : {}}
            onClick={() => setCurrentPage('cv')}
          >
            CV Center
          </button>
        </>
      )}

      <h5>ACCOUNT</h5>
      {isRecruiter ? (
        <button
          style={currentPage === 'recruiter-profile' ? activeStyle : {}}
          onClick={() => setCurrentPage('recruiter-profile')}
        >
          Company Profile
        </button>
      ) : (
        <button
          style={currentPage === 'profile' ? activeStyle : {}}
          onClick={() => setCurrentPage('profile')}
        >
          Profile
        </button>
      )}

      <button
        className="btn-outline"
        style={{ fontSize: 12, marginTop: 12, color: 'crimson', borderColor: 'lightpink' }}
        onClick={onLogout}
      >
        Log Out
      </button>

      <div className="sidebar-user">
        <strong>{name}</strong>
        <small>{subtitle}</small>
      </div>
    </aside>
  )
}

export default Sidebar
