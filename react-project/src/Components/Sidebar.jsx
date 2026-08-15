// Main application sidebar navigation
function Sidebar({ currentPage, setCurrentPage, profile, userRole, onLogout }) {
  const isRecruiter = userRole === 'recruiter'
  const name = isRecruiter
    ? 'Recruiter HQ'
    : profile?.fullName || localStorage.getItem('userName') || 'Gladys Wanjiku'
  const subtitle = isRecruiter ? 'Verified Employer' : profile?.experienceLevel || 'Student'

  return (
    <aside className="sidebar">
      <h2>CareerCompass</h2>
      <small>FIND · GROW · GO</small>

      <h5>{isRecruiter ? 'RECRUITER HQ' : 'MAIN'}</h5>
      {isRecruiter ? (
        <button
          style={currentPage === 'recruiter' ? { background: '#1976d2', color: '#fff' } : {}}
          onClick={() => setCurrentPage('recruiter')}
        >
          💼 Recruiter Dashboard
        </button>
      ) : (
        <>
          <button
            style={currentPage === 'discover' ? { background: '#6244a0', color: '#fff' } : {}}
            onClick={() => setCurrentPage('discover')}
          >
            🏠 Dashboard
          </button>
          <button
            style={currentPage === 'jobs' ? { background: '#6244a0', color: '#fff' } : {}}
            onClick={() => setCurrentPage('jobs')}
          >
            🔍 Discover Jobs
          </button>
        </>
      )}

      <h5>JOB PIPELINE</h5>
      <button
        style={currentPage === 'applications' ? { background: isRecruiter ? '#1976d2' : '#6244a0', color: '#fff' } : {}}
        onClick={() => setCurrentPage('applications')}
      >
        📋 Applications
      </button>
      <button
        style={currentPage === 'interviews' ? { background: isRecruiter ? '#1976d2' : '#6244a0', color: '#fff' } : {}}
        onClick={() => setCurrentPage('interviews')}
      >
        🎤 Interviews & Prep
      </button>

      {!isRecruiter && (
        <>
          <h5>DOCUMENTS</h5>
          <button
            style={currentPage === 'cv' ? { background: '#6244a0', color: '#fff' } : {}}
            onClick={() => setCurrentPage('cv')}
          >
            📄 CV Center
          </button>
        </>
      )}

      <h5>ACCOUNT</h5>
      {!isRecruiter && (
        <button
          style={currentPage === 'profile' ? { background: '#6244a0', color: '#fff' } : {}}
          onClick={() => setCurrentPage('profile')}
        >
          👤 Profile
        </button>
      )}

      <button
        className="btn-outline"
        style={{ fontSize: 12, marginTop: 12, color: '#e53935', borderColor: '#ffcdd2' }}
        onClick={onLogout}
      >
        🚪 Log Out
      </button>

      <div className="sidebar-user">
        <strong>{name}</strong>
        <small>{subtitle}</small>
      </div>
    </aside>
  )
}

export default Sidebar
