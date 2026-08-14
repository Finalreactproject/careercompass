import { Link } from "react-router-dom";

function Sidebar() {
  const name = localStorage.getItem("userName") || "Student";

  return (
    <aside className="sidebar">
      <h2>CareerCompass</h2>
      <small>FIND · GROW · GO</small>

      <h5>MAIN</h5>
      <a href="/dashboard">🏠 Dashboard</a>
      <a href="/jobs">🔍 Discover Jobs</a>

      <h5>APPLICATIONS</h5>
      <Link to="/applications">Applications</Link>
      <a href="/interviews">🎙 Interviews</a>

      <h5>DOCUMENTS</h5>
      <a href="/cv">📁 CV Center</a>

      <h5>ACCOUNT</h5>
      <a href="/profile">👤 Profile</a>

      <div className="sidebar-user">
        <strong>{name}</strong>
        <small>Student</small>
      </div>
    </aside>
  );
}

export default Sidebar;
