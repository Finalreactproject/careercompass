function Sidebar({ currentPage, setCurrentPage, profile }) {
  const name =
    profile?.fullName || localStorage.getItem("userName") || "Student";

  return (
    <aside className="sidebar">
      <h2>CareerCompass</h2>
      <small>FIND · GROW · GO</small>

      <h5>MAIN</h5>
      <button onClick={() => setCurrentPage("discover")}>🏠 Dashboard</button>
      <button onClick={() => setCurrentPage("jobs")}>🔍 Discover Jobs</button>

      <h5>APPLICATIONS</h5>
      <button onClick={() => setCurrentPage("applications")}>
        Applications
      </button>
      <button onClick={() => setCurrentPage("interviews")}>
        🎤 Interviews
      </button>

      <h5>DOCUMENTS</h5>
      <button onClick={() => setCurrentPage("cv")}>📄 CV Center</button>

      <h5>ACCOUNT</h5>
      <button onClick={() => setCurrentPage("profile")}>👤 Profile</button>

      <div className="sidebar-user">
        <strong>{name}</strong>
        <small>Student</small>
      </div>
    </aside>
  );
}

export default Sidebar;
