import { Link } from "react-router-dom";

function Sidebar() {
  const name = localStorage.getItem("userName") || "Student";

  return (
    <aside className="sidebar">
      <h2>CareerCompass</h2>
      <small>FIND · GROW · GO</small>

      <h5>MAIN</h5>
      <Link to="/dashboard">🏠 Dashboard</Link>
      <Link to="/jobs">🔍 Discover Jobs</Link>

      <h5>APPLICATIONS</h5>
      <Link to="/applications">Applications</Link>
      <Link to="/interviews">🎤 Interviews</Link>

      <h5>DOCUMENTS</h5>
      <Link to="/cv-center">📄 CV Center</Link>

      <h5>ACCOUNT</h5>
      <Link to="/profile">👤 Profile</Link>

      <div className="sidebar-user">
        <strong>{name}</strong>
        <small>Student</small>
      </div>
    </aside>
  );
}

export default Sidebar;
